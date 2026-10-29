"""Convert a MITRE ATT&CK STIX bundle into the heatmap's matrix document.

Output shape (the same one the visualization renders):

    {"tactics": [{id, name, short_name, sort_order}],
     "techniques": [{id, name, tactics: [short_name], url, platform?}],
     "sub_techniques": [{id, short_id, name, technique, url, platform?}],
     "version": "20.0", "modified": "...", "source": url, "schema": 1}

Unlike the original converter, the column order comes from the bundle's own
matrix definition rather than a hardcoded list, so tactics MITRE adds or
renames land in the right place.
"""
from . import SCHEMA


def _is_dead(obj):
    return bool(obj.get('x_mitre_deprecated') or obj.get('revoked'))


def _mitre_ref(obj):
    """The external reference that carries the ATT&CK id (any 'mitre-*' source)."""
    for ref in obj.get('external_references') or []:
        if str(ref.get('source_name', '')).startswith('mitre-') and ref.get('external_id'):
            return ref
    return None


def _tactics(objects, warnings):
    by_ref = {o['id']: o for o in objects if o.get('type') == 'x-mitre-tactic' and 'id' in o}
    ordered = []
    seen = set()

    for matrix in (o for o in objects if o.get('type') == 'x-mitre-matrix'):
        for ref in matrix.get('tactic_refs') or []:
            tactic = by_ref.get(ref)
            if tactic is None or _is_dead(tactic) or ref in seen:
                continue
            seen.add(ref)
            ordered.append(tactic)

    if not ordered:
        warnings.append('no matrix definition found; using every current tactic in file order')
        ordered = [t for t in by_ref.values() if not _is_dead(t)]

    result = []
    for position, tactic in enumerate(ordered):
        ref = _mitre_ref(tactic)
        if ref is None or not tactic.get('x_mitre_shortname') or not tactic.get('name'):
            warnings.append('skipped a tactic with missing fields: %s' % tactic.get('name', tactic.get('id')))
            continue
        result.append({
            'id': ref['external_id'],
            'name': tactic['name'],
            'short_name': tactic['x_mitre_shortname'],
            'sort_order': position,
        })
    return result


def convert(bundle, source_url=''):
    """Return (matrix, warnings) for a STIX bundle (a parsed JSON document)."""
    objects = [o for o in (bundle.get('objects') or []) if isinstance(o, dict)]
    warnings = []

    collection = next((o for o in objects if o.get('type') == 'x-mitre-collection'), {})
    tactics = _tactics(objects, warnings)

    techniques = {}
    sub_techniques = {}
    skipped = 0
    for obj in objects:
        if obj.get('type') != 'attack-pattern' or _is_dead(obj):
            continue
        ref = _mitre_ref(obj)
        if ref is None:
            skipped += 1
            continue
        attack_id = ref['external_id']
        platforms = obj.get('x_mitre_platforms')
        extra = {'platform': list(platforms)} if isinstance(platforms, list) and platforms else {}

        if obj.get('x_mitre_is_subtechnique'):
            parent, _, rest = attack_id.partition('.')
            sub_techniques.setdefault(attack_id, dict({
                'id': attack_id,
                'short_id': '.' + rest if rest else None,
                'name': obj.get('name', ''),
                'technique': parent or None,
                'url': ref.get('url', ''),
            }, **extra))
        else:
            phases = [
                p['phase_name'] for p in obj.get('kill_chain_phases') or []
                if str(p.get('kill_chain_name', '')).startswith('mitre-') and p.get('phase_name')
            ]
            techniques.setdefault(attack_id, dict({
                'id': attack_id,
                'name': obj.get('name', ''),
                'tactics': phases,
                'url': ref.get('url', ''),
            }, **extra))

    if skipped:
        warnings.append('skipped %d techniques without an ATT&CK id' % skipped)

    matrix = {
        'tactics': tactics,
        'techniques': sorted(techniques.values(), key=lambda t: t['id']),
        'sub_techniques': sorted(sub_techniques.values(), key=lambda t: t['id']),
        'version': str(collection.get('x_mitre_version', '')),
        'modified': str(collection.get('modified', '')),
        'source': source_url,
        'schema': SCHEMA,
    }
    return matrix, warnings
