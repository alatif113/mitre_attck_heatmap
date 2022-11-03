import requests
import json

url = 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack-12.0.json'
sort_order = ['Reconnaissance', 'Resource Development', 'Initial Access', 'Execution', 'Persistence', 'Privilege Escalation', 'Defense Evasion', 'Credential Access', 'Discovery', 'Lateral Movement', 'Collection', 'Command and Control', 'Exfiltration', 'Impact']

response = requests.get(url)

if response.status_code == 200:
    output_json = {'tactics': [], 'techniques': []}
    attack_json = response.json()

    for obj in attack_json['objects']:
        if obj['type'] == 'attack-pattern' and obj['x_mitre_is_subtechnique'] == False:
            for ref in obj['external_references']:
                if ref['source_name'] == 'mitre-attack':
                    output_json['techniques'].append({
                        'id': ref['external_id'], 
                        'name': obj['name'], 
                        'tactics': [phase['phase_name'] for phase in obj['kill_chain_phases']]
                    })
        elif obj['type'] == 'x-mitre-tactic':
            output_json['tactics'].append({
                'id': obj['external_references'][0]['external_id'],
                'name': obj['name'],
                'short_name': obj['x_mitre_shortname'],
                'sort_order': sort_order.index(obj['name']) if obj['name'] in sort_order else 100
            })

output_json['tactics'] = sorted(output_json['tactics'], key=lambda tactic: tactic['sort_order']) 

with open('enterpriseAttack.json', 'w') as fp:
    fp.write(json.dumps(output_json))
