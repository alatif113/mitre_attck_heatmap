"""Convert the MITRE D3FEND ontology into the heatmap's matrix document.

The matrix follows the current ontology, as the D3FEND website draws it:

* tactics are the nodes typed d3f:DefensiveTactic (Model, Harden, Detect, Isolate, Deceive,
  Evict, Restore), in their d3f:display-order;
* techniques are the classes that are direct subclasses of d3f:DefensiveTechnique, each placed in
  the tactic(s) named by d3f:enables;
* sub-techniques are every class below a technique, at any depth, attached to the technique they
  descend from. They are listed flat, each with its own D3FEND id as its short id (D3FEND ids
  are not hierarchical the way ATT&CK's T1059.001 is).
"""

TACTIC_TYPE = 'd3f:DefensiveTactic'
TECHNIQUE_ROOT = 'd3f:DefensiveTechnique'
D3FEND_ID = 'd3f:d3fend-id'
URL = 'https://d3fend.mitre.org/technique/'
MIN_TACTICS = 5
MIN_TECHNIQUES = 20


def _as_list(value):
    if value is None:
        return []
    return value if isinstance(value, list) else [value]


def _types(node):
    return [t for t in _as_list(node.get('@type')) if isinstance(t, str)]


def _parents(node):
    """The named classes the node is a subclass of (blank nodes, such as restrictions, are skipped)."""
    result = []
    for parent in _as_list(node.get('rdfs:subClassOf')):
        if isinstance(parent, dict):
            name = parent.get('@id')
            if isinstance(name, str) and not name.startswith('_:'):
                result.append(name)
    return result


def _ids(value):
    return [v['@id'] for v in _as_list(value) if isinstance(v, dict) and isinstance(v.get('@id'), str)]


def convert(ontology):
    """Return the matrix document for a parsed d3fend.json."""
    graph = [n for n in (ontology.get('@graph') or []) if isinstance(n, dict) and isinstance(n.get('@id'), str)]

    tactic_nodes = sorted(
        (n for n in graph if TACTIC_TYPE in _types(n) and 'rdfs:label' in n),
        key=lambda n: (n.get('d3f:display-order', 1000), n['rdfs:label']))
    matrix = {'tactics': [], 'techniques': [], 'sub_techniques': []}
    for order, node in enumerate(tactic_nodes):
        matrix['tactics'].append({
            'id': node['@id'],
            'name': node['rdfs:label'],
            'short_name': node['@id'],
            'sort_order': order,
        })
    tactic_ids = {t['short_name'] for t in matrix['tactics']}

    technique_nodes = sorted(
        (n for n in graph if TECHNIQUE_ROOT in _parents(n) and D3FEND_ID in n and 'rdfs:label' in n),
        key=lambda n: n['rdfs:label'])
    for node in technique_nodes:
        matrix['techniques'].append({
            'id': node[D3FEND_ID],
            'name': node['rdfs:label'],
            'tactics': [t for t in _ids(node.get('d3f:enables')) if t in tactic_ids],
            'url': URL + node['@id'],
        })

    # Everything below a technique, at any depth, belongs to the technique it comes from.
    children = {}
    for node in graph:
        for parent in _parents(node):
            children.setdefault(parent, []).append(node)
    claimed = {n['@id'] for n in technique_nodes}
    for technique in technique_nodes:
        stack = list(children.get(technique['@id'], []))
        while stack:
            node = stack.pop()
            if node['@id'] in claimed:
                continue
            claimed.add(node['@id'])
            stack.extend(children.get(node['@id'], []))
            if D3FEND_ID in node and 'rdfs:label' in node:
                matrix['sub_techniques'].append({
                    'id': node[D3FEND_ID],
                    'name': node['rdfs:label'],
                    'short_id': node[D3FEND_ID],
                    'technique': technique[D3FEND_ID],
                    'url': URL + node['@id'],
                })

    matrix['sub_techniques'].sort(key=lambda s: s['id'])
    return matrix


def problems_in(matrix):
    """Reasons the converted matrix should not be used."""
    problems = []
    tactics = matrix.get('tactics') or []
    techniques = matrix.get('techniques') or []
    subs = matrix.get('sub_techniques') or []
    if not tactics:
        problems.append('no tactics')
    if not techniques:
        problems.append('no techniques')
    if problems:
        return problems

    if len(tactics) < MIN_TACTICS:
        problems.append('only %d tactics (expected at least %d)' % (len(tactics), MIN_TACTICS))
    if len(techniques) < MIN_TECHNIQUES:
        problems.append('only %d techniques (expected at least %d)' % (len(techniques), MIN_TECHNIQUES))

    tactic_names = {t['short_name'] for t in tactics}
    technique_ids = [t['id'] for t in techniques]
    if len(set(technique_ids)) != len(technique_ids):
        problems.append('duplicate technique ids')
    # A column must not be one of the techniques: the old converter made every technique a tactic.
    if tactic_names & {t['short_name'] for t in techniques if 'short_name' in t}:
        problems.append('a technique is also a tactic')
    for technique in techniques:
        if not technique['tactics']:
            problems.append('technique %s is in no tactic' % technique['id'])
        elif any(t not in tactic_names for t in technique['tactics']):
            problems.append('technique %s names an unknown tactic' % technique['id'])
    known = set(technique_ids)
    for sub in subs:
        # A list here would be the old shape (ontology IRIs), which the page cannot attach.
        if not isinstance(sub.get('technique'), str) or sub['technique'] not in known:
            problems.append('sub-technique %s has no technique' % sub['id'])
        if not sub.get('short_id'):
            problems.append('sub-technique %s has no short id' % sub['id'])
    all_ids = technique_ids + [s['id'] for s in subs]
    if len(set(all_ids)) != len(all_ids):
        problems.append('an id is used twice')
    return problems
