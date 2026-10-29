"""Shared fixtures for the importer tests: small STIX bundles built in code."""
import os
import sys

BIN = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', '..', '..', 'bin'))
if BIN not in sys.path:
    sys.path.insert(0, BIN)


def tactic(ref, name, short, ext, **extra):
    obj = {
        'type': 'x-mitre-tactic', 'id': ref, 'name': name, 'x_mitre_shortname': short,
        'external_references': [{'source_name': 'mitre-attack', 'external_id': ext}],
    }
    obj.update(extra)
    return obj


def pattern(ext, name, phases=(), sub=False, platforms=None, source='mitre-attack', **extra):
    obj = {
        'type': 'attack-pattern', 'id': 'attack-pattern--' + ext, 'name': name,
        'x_mitre_is_subtechnique': sub,
        'external_references': [
            {'source_name': source, 'external_id': ext, 'url': 'https://attack.mitre.org/techniques/' + ext.replace('.', '/')},
            {'source_name': 'capec', 'external_id': 'CAPEC-1'},
        ],
    }
    if phases:
        obj['kill_chain_phases'] = [{'kill_chain_name': 'mitre-attack', 'phase_name': p} for p in phases]
    if platforms is not None:
        obj['x_mitre_platforms'] = platforms
    obj.update(extra)
    return obj


def bundle(extra_objects=(), with_matrix=True):
    """A small Enterprise-like bundle whose tactic order is not alphabetical, with a
    deprecated tactic and a second matrix that only references it."""
    objects = [
        {'type': 'x-mitre-collection', 'id': 'x-mitre-collection--1', 'x_mitre_version': '20.0', 'modified': '2026-10-13T17:53:10.145Z'},
        tactic('t-exec', 'Execution', 'execution', 'TA0002'),
        tactic('t-stealth', 'Stealth', 'stealth', 'TA0005'),
        tactic('t-impact', 'Impact', 'impact', 'TA0040'),
        tactic('t-old', 'Old Effects', 'old-effects', 'TA9999', x_mitre_deprecated=True),
        pattern('T1059', 'Command and Scripting Interpreter', ['execution'], platforms=['Windows', 'Linux']),
        pattern('T1059.001', 'PowerShell', sub=True, platforms=['Windows']),
        pattern('T1059.003', 'Windows Command Shell', sub=True, platforms=['Windows']),
        pattern('T1027', 'Obfuscated Files', ['stealth', 'impact'], platforms=['Windows']),
        pattern('T1486', 'Data Encrypted for Impact', ['impact'], platforms=[]),
        pattern('T0001', 'Gone', ['execution'], x_mitre_deprecated=True),
        pattern('T0002', 'Revoked', ['execution'], revoked=True),
    ]
    if with_matrix:
        objects += [
            {'type': 'x-mitre-matrix', 'id': 'm-old', 'name': 'Other', 'tactic_refs': ['t-old']},
            {'type': 'x-mitre-matrix', 'id': 'm-main', 'name': 'Main', 'tactic_refs': ['t-exec', 't-stealth', 't-impact', 't-old']},
        ]
    objects += list(extra_objects)
    return {'type': 'bundle', 'id': 'bundle--1', 'objects': objects}


def big_bundle(n=100):
    """A bundle with n techniques, for the size checks."""
    extra = [pattern('T%04d' % (2000 + i), 'Technique %d' % i, ['execution']) for i in range(n)]
    return bundle(extra)
