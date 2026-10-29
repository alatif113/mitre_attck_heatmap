"""Download MITRE ATT&CK / D3FEND data and convert it into the matrix format
the heatmap visualization renders.

Standard library only, so it also runs under the Python that ships with
Splunk. Used by bin/import_matrices.py (the scripted input) and by
bin/enterpriseAttack2json.py (the offline fallback that writes the bundled
data modules).
"""

# Version of the matrix document format: {tactics, techniques, sub_techniques}
# plus the metadata keys version, modified, source and schema.
SCHEMA = 1

SOURCES = {
    'enterprise': 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack.json',
    'ics': 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/ics-attack/ics-attack.json',
    'mobile': 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/mobile-attack/mobile-attack.json',
}
D3FEND_URL = 'https://d3fend.mitre.org/ontologies/d3fend.json'

# Names of the bundled data modules in the visualization's build/ directory.
MODULE_NAMES = {
    'enterprise': 'enterpriseAttack',
    'ics': 'icsAttack',
    'mobile': 'mobileAttack',
    'd3fend': 'd3fend',
}
