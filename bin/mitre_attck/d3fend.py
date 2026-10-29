"""Convert the MITRE D3FEND ontology into the heatmap's matrix document.

This keeps the original converter's interpretation unchanged on purpose:
the data model it produces is the subject of an open decision (audit item
P1-1), so only the implementation was tidied (set lookups instead of list
scans), not the result.
"""

# Column order for the categories treated as tactics; anything else sorts last.
SORT_ORDER = [
    'Asset Inventory', 'Network Mapping', 'Operational Activity Mapping', 'System Mapping',
    'Application Hardening', 'Credential Hardening', 'Message Hardening', 'Platform Hardening',
    'File Analysis', 'Identifier Analysis', 'Message Analysis', 'Network Traffic Analysis',
    'Platform Monitoring', 'Process Analysis', 'User Behavior Analysis', 'Execution Isolation',
    'Network Isolation', 'Decoy Environment', 'Decoy Object', 'Credential Eviction',
    'File Eviction', 'Process Eviction', 'Restore Access', 'Restore Object',
]


def _types(node):
    """The node's @type values. As in the original converter, a node whose @type is
    not a list (a single string) is treated as having no types."""
    value = node['@type']
    return value if isinstance(value, list) else []


def _is_defensive_technique_child(node):
    """True when the node's rdfs:subClassOf names d3f:DefensiveTechnique."""
    parents = node.get('rdfs:subClassOf')
    if parents is None:
        return None
    if isinstance(parents, list):
        return any(isinstance(p, dict) and p.get('@id') == 'd3f:DefensiveTechnique' for p in parents)
    return isinstance(parents, dict) and parents.get('@id') == 'd3f:DefensiveTechnique'


def convert(ontology):
    """Return the matrix document for a parsed d3fend.json."""
    graph = [n for n in (ontology.get('@graph') or []) if isinstance(n, dict) and '@type' in n]

    matrix = {'tactics': [], 'techniques': [], 'sub_techniques': []}
    tactic_ids = set()

    for node in graph:
        if 'rdfs:subClassOf' not in node:
            continue
        if not _is_defensive_technique_child(node):
            continue
        tactic_ids.add(node['@id'])
        label = node['rdfs:label']
        matrix['tactics'].append({
            'id': node['d3f:d3fend-id'],
            'name': label,
            'short_name': node['@id'],
            'sort_order': SORT_ORDER.index(label) if label in SORT_ORDER else 100,
        })

    technique_ids = set()
    for node in graph:
        types = _types(node)
        if 'd3f:d3fend-id' in node and any(t in tactic_ids for t in types):
            technique_ids.add(node['@id'])
            matrix['techniques'].append({
                'id': node['d3f:d3fend-id'],
                'name': node['rdfs:label'],
                'tactics': [t for t in types if t in tactic_ids],
                'url': 'https://d3fend.mitre.org/technique/' + node['@id'],
            })

    for node in graph:
        types = _types(node)
        if 'd3f:d3fend-id' in node and any(t in technique_ids for t in types):
            matrix['sub_techniques'].append({
                'id': node['d3f:d3fend-id'],
                'name': node['rdfs:label'],
                'technique': [t for t in types if t in technique_ids],
                'url': 'https://d3fend.mitre.org/technique/' + node['@id'],
            })

    matrix['tactics'].sort(key=lambda t: t['sort_order'])
    matrix['sub_techniques'].sort(key=lambda t: t['id'])
    return matrix


def problems_in(matrix):
    """Minimal sanity check; the D3FEND model is not validated further."""
    problems = []
    if not matrix.get('tactics'):
        problems.append('no tactics')
    if not matrix.get('techniques'):
        problems.append('no techniques')
    return problems
