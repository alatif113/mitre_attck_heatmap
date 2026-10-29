import argparse
import json
import os
import re
import sys

import requests

# Regenerates the matrix data modules in build/ from MITRE's published data.
# Run it from anywhere; every download must succeed before any file is written.
default_out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'appserver', 'static', 'visualizations', 'mitre_attck_heatmap', 'build')
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--out", default=default_out, help="directory to write the .js data modules to (default: build/ in the app)")
path_prefix = os.path.join(parser.parse_args().out, '')


def fetch(url):
    try:
        response = requests.get(url, timeout=120)
    except requests.RequestException as error:
        sys.exit('error: could not download ' + url + ': ' + str(error))
    if response.status_code != 200:
        sys.exit('error: ' + url + ' returned HTTP ' + str(response.status_code))
    return response


sources = [
    {
        'name': 'enterpriseAttack',
        'url': 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack.json',
        'sort_order': ['Reconnaissance', 'Resource Development', 'Initial Access', 'Execution', 'Persistence', 'Privilege Escalation', 'Defense Evasion', 'Credential Access', 'Discovery', 'Lateral Movement', 'Collection', 'Command and Control', 'Exfiltration', 'Impact']
    },
    {
        'name': 'icsAttack',
        'url': 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/ics-attack/ics-attack.json',
        'sort_order': ['Initial Access', 'Execution', 'Persistence', 'Privilege Escalation', 'Evasion', 'Discovery', 'Lateral Movement', 'Collection', 'Command and Control', 'Inhibit Response Function', 'Impair Process Control', 'Impact']
    },
    {
        'name': 'mobileAttack',
        'url': 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/mobile-attack/mobile-attack.json',
        'sort_order': ['Initial Access', 'Execution', 'Persistence', 'Privilege Escalation', 'Defense Evasion', 'Credential Access', 'Discovery', 'Lateral Movement', 'Collection', 'Command and Control', 'Exfiltration', 'Impact']
    }
]

d3fend_url = 'https://d3fend.mitre.org/ontologies/d3fend.json'

# Download everything first so a failure cannot leave a mix of new and old files.
downloads = {source['name']: fetch(source['url']) for source in sources}
downloads['d3fend'] = fetch(d3fend_url)

for source in sources:
    url = source['url']
    name = source['name']
    sort_order = source['sort_order']

    response = downloads[name]

    output_json = {'tactics': [], 'techniques': [], 'sub_techniques': []}
    attack_json = response.json()

    for obj in attack_json['objects']:
        if obj['type'] == 'attack-pattern':
            if 'x_mitre_deprecated' in obj:
                if obj['x_mitre_deprecated']: continue
            if 'revoked' in obj:
                if obj['revoked']: continue 
        
            for ref in obj['external_references']:
                if ref['source_name'] == 'mitre-attack' and 'external_id' in ref:
                    # Techniques
                    if not obj['x_mitre_is_subtechnique']:
                        output_json['techniques'].append({
                            'id': ref['external_id'], 
                            'name': obj.get('name', ""), 
                            'tactics': [phase['phase_name'] for phase in obj['kill_chain_phases']],
                            'url': ref.get('url', ""),
                            'platform': obj.get('x_mitre_platforms', "")
                        })
                    # Sub-techniques
                    else:
                        technique = re.search(r"T\d{4}", ref['external_id'])
                        sub_id = re.search(r"\.\d+", ref['external_id'])
                        output_json['sub_techniques'].append({
                            'id': ref['external_id'],
                            'short_id': None if sub_id is None else sub_id.group(), 
                            'name': obj.get('name', ""), 
                            'technique': None if technique is None else technique.group(),
                            'url': ref.get('url', ""),
                            'platform': obj.get('x_mitre_platforms', "")
                        })     
        elif obj['type'] == 'x-mitre-tactic' and 'external_references' in obj and 'external_id' in obj['external_references'][0]:
            output_json['tactics'].append({
                'id': obj['external_references'][0]['external_id'],
                'name': obj['name'],
                'short_name': obj['x_mitre_shortname'],
                'sort_order': sort_order.index(obj['name']) if obj['name'] in sort_order else 100
            })

    output_json['tactics'] = sorted(output_json['tactics'], key=lambda tactic: tactic['sort_order']) 
    output_json['sub_techniques'] = sorted(output_json['sub_techniques'], key=lambda sub_techniques: sub_techniques['id']) 

    with open(path_prefix + name + '.js', 'w') as fp:
        fp.write('define(function() { return ' + json.dumps(output_json) + ' })')

# MITRE D3FEND

url = d3fend_url
name = 'd3fend'
sort_order = ['Asset Inventory', 'Network Mapping', 'Operational Activity Mapping', 'System Mapping', 'Application Hardening', 'Credential Hardening', 'Message Hardening', 'Platform Hardening', 'File Analysis', 'Identifier Analysis', 'Message Analysis', 'Network Traffic Analysis', 'Platform Monitoring', 'Process Analysis', 'User Behavior Analysis', 'Execution Isolation', 'Network Isolation', 'Decoy Environment', 'Decoy Object', 'Credential Eviction', 'File Eviction', 'Process Eviction', 'Restore Access', 'Restore Object']

response = downloads[name]

output_json = {'tactics': [], 'techniques': [], 'sub_techniques': []}
attack_json = response.json()
tactics = []
techniques = []

for obj in attack_json['@graph']:
    if '@type' not in obj:
        continue

    if 'rdfs:subClassOf' in obj:
        if isinstance(obj['rdfs:subClassOf'], list) and not any(o['@id'] == 'd3f:DefensiveTechnique' for o in obj['rdfs:subClassOf']):
            continue
        if '@id' in obj['rdfs:subClassOf'] and not obj['rdfs:subClassOf']['@id'] == 'd3f:DefensiveTechnique':
            continue
        tactics.append(obj['@id'])
        output_json['tactics'].append({
            'id': obj['d3f:d3fend-id'],
            'name': obj['rdfs:label'],
            'short_name': obj['@id'],
            'sort_order': sort_order.index(obj['rdfs:label']) if obj['rdfs:label'] in sort_order else 100
        })

for obj in attack_json['@graph']:
    if '@type' not in obj:
        continue

    if 'd3f:d3fend-id' in obj and any(t in tactics for t in obj['@type']):
        techniques.append(obj['@id'])
        output_json['techniques'].append({
            'id': obj['d3f:d3fend-id'],
            'name': obj['rdfs:label'],
            'tactics': [t for t in obj['@type'] if t in tactics],
            'url': 'https://d3fend.mitre.org/technique/' + obj['@id'],
        })
        
for obj in attack_json['@graph']:
    if '@type' not in obj:
        continue

    if 'd3f:d3fend-id' in obj and any(t in techniques for t in obj['@type']):
        output_json['sub_techniques'].append({
            'id': obj['d3f:d3fend-id'],
            'name': obj['rdfs:label'],
            'technique': [t for t in obj['@type'] if t in techniques],
            'url': 'https://d3fend.mitre.org/technique/' + obj['@id'],
        })
        

output_json['tactics'] = sorted(output_json['tactics'], key=lambda tactic: tactic['sort_order']) 
output_json['sub_techniques'] = sorted(output_json['sub_techniques'], key=lambda sub_techniques: sub_techniques['id']) 

with open(path_prefix + name + '.js', 'w') as fp:
    fp.write('define(function() { return ' + json.dumps(output_json) + ' })')









