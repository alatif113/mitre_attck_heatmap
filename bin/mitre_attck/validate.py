"""Sanity checks run before new matrix data replaces good data."""


class ValidationError(Exception):
    """The converted data looks wrong, so it must not be written."""

    def __init__(self, problems):
        Exception.__init__(self, '; '.join(problems))
        self.problems = problems


def counts(matrix):
    return {
        'tactics': len(matrix.get('tactics', [])),
        'techniques': len(matrix.get('techniques', [])),
        'sub_techniques': len(matrix.get('sub_techniques', [])),
    }


def problems_in(matrix, previous_counts=None, min_ratio=0.8):
    """List what is wrong with `matrix`; an empty list means it is acceptable.

    previous_counts is the result of counts() for the data being replaced.
    The size check only applies when a previous size is known.
    """
    problems = []
    tactics = matrix.get('tactics', [])
    techniques = matrix.get('techniques', [])
    subs = matrix.get('sub_techniques', [])

    if not tactics:
        problems.append('no tactics')
    if not techniques:
        problems.append('no techniques')

    columns = {t.get('short_name') for t in tactics}
    ids = [t['id'] for t in techniques] + [s['id'] for s in subs]
    if len(ids) != len(set(ids)):
        problems.append('duplicate ids')

    orphans = [t['id'] for t in techniques if not set(t.get('tactics', [])) & columns]
    if orphans:
        problems.append('%d techniques belong to no tactic column (for example %s)' % (len(orphans), orphans[0]))

    parent_ids = {t['id'] for t in techniques}
    lost = [s['id'] for s in subs if s.get('technique') not in parent_ids]
    if lost:
        problems.append('%d sub-techniques have no parent technique (for example %s)' % (len(lost), lost[0]))

    if previous_counts:
        now = counts(matrix)
        for key, before in previous_counts.items():
            if before and now.get(key, 0) < before * min_ratio:
                problems.append('%s dropped from %d to %d' % (key, before, now.get(key, 0)))

    return problems


def check(matrix, previous_counts=None, min_ratio=0.8):
    problems = problems_in(matrix, previous_counts, min_ratio)
    if problems:
        raise ValidationError(problems)
