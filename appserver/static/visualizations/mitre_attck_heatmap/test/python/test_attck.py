import copy
import random
import unittest

from common import bundle, pattern, tactic
from mitre_attck import attck, output


class ConvertTests(unittest.TestCase):
    def setUp(self):
        self.matrix, self.warnings = attck.convert(bundle(), 'https://example.test/enterprise.json')

    def test_columns_follow_the_matrix_definition_not_a_hardcoded_list(self):
        self.assertEqual([t['name'] for t in self.matrix['tactics']], ['Execution', 'Stealth', 'Impact'])
        self.assertEqual([t['sort_order'] for t in self.matrix['tactics']], [0, 1, 2])

    def test_tactic_fields(self):
        self.assertEqual(self.matrix['tactics'][1], {'id': 'TA0005', 'name': 'Stealth', 'short_name': 'stealth', 'sort_order': 1})

    def test_deprecated_tactics_and_tactics_of_other_matrices_are_not_columns(self):
        self.assertNotIn('Old Effects', [t['name'] for t in self.matrix['tactics']])

    def test_metadata(self):
        self.assertEqual(self.matrix['version'], '20.0')
        self.assertEqual(self.matrix['modified'], '2026-10-13T17:53:10.145Z')
        self.assertEqual(self.matrix['source'], 'https://example.test/enterprise.json')
        self.assertEqual(self.matrix['schema'], 1)

    def test_techniques_are_sorted_and_carry_their_tactics(self):
        self.assertEqual([t['id'] for t in self.matrix['techniques']], ['T1027', 'T1059', 'T1486'])
        self.assertEqual(self.matrix['techniques'][0]['tactics'], ['stealth', 'impact'])
        self.assertEqual(self.matrix['techniques'][1]['url'], 'https://attack.mitre.org/techniques/T1059')

    def test_sub_techniques_know_their_parent(self):
        self.assertEqual(self.matrix['sub_techniques'][0], {
            'id': 'T1059.001', 'short_id': '.001', 'name': 'PowerShell', 'technique': 'T1059',
            'url': 'https://attack.mitre.org/techniques/T1059/001', 'platform': ['Windows']})
        self.assertEqual([s['id'] for s in self.matrix['sub_techniques']], ['T1059.001', 'T1059.003'])

    def test_platform_is_left_out_when_missing_or_empty(self):
        by_id = {t['id']: t for t in self.matrix['techniques']}
        self.assertEqual(by_id['T1059']['platform'], ['Windows', 'Linux'])
        self.assertNotIn('platform', by_id['T1486'])
        missing, _ = attck.convert(bundle([pattern('T1500', 'No platform key', ['execution'])]))
        self.assertNotIn('platform', next(t for t in missing['techniques'] if t['id'] == 'T1500'))

    def test_deprecated_and_revoked_techniques_are_skipped(self):
        ids = [t['id'] for t in self.matrix['techniques']]
        self.assertNotIn('T0001', ids)
        self.assertNotIn('T0002', ids)

    def test_any_mitre_source_name_is_accepted(self):
        matrix, _ = attck.convert(bundle([
            pattern('T0803', 'ICS thing', ['execution'], source='mitre-ics-attack'),
            pattern('T1476', 'Mobile thing', ['execution'], source='mitre-mobile-attack'),
        ]))
        ids = [t['id'] for t in matrix['techniques']]
        self.assertIn('T0803', ids)
        self.assertIn('T1476', ids)

    def test_patterns_without_an_attack_id_are_skipped_with_a_warning(self):
        orphan = pattern('X', 'NIST thing', ['execution'], source='NIST Mobile Threat Catalogue')
        matrix, warnings = attck.convert(bundle([orphan]))
        self.assertNotIn('X', [t['id'] for t in matrix['techniques']])
        self.assertTrue(any('without an ATT&CK id' in w for w in warnings))

    def test_missing_optional_keys_do_not_crash(self):
        bare = pattern('T1600', 'Bare', ['execution'])
        del bare['x_mitre_is_subtechnique']
        no_phases = pattern('T1601', 'No phases')
        no_refs = {'type': 'attack-pattern', 'id': 'attack-pattern--x', 'name': 'No refs'}
        matrix, _ = attck.convert(bundle([bare, no_phases, no_refs]))
        by_id = {t['id']: t for t in matrix['techniques']}
        self.assertEqual(by_id['T1600']['tactics'], ['execution'])
        self.assertEqual(by_id['T1601']['tactics'], [])

    def test_only_mitre_kill_chain_phases_count(self):
        odd = pattern('T1602', 'Odd chain', ['execution'])
        odd['kill_chain_phases'].append({'kill_chain_name': 'lockheed-martin', 'phase_name': 'delivery'})
        matrix, _ = attck.convert(bundle([odd]))
        self.assertEqual(next(t for t in matrix['techniques'] if t['id'] == 'T1602')['tactics'], ['execution'])

    def test_without_a_matrix_definition_every_current_tactic_is_used_with_a_warning(self):
        matrix, warnings = attck.convert(bundle(with_matrix=False))
        self.assertEqual({t['name'] for t in matrix['tactics']}, {'Execution', 'Stealth', 'Impact'})
        self.assertTrue(any('no matrix definition' in w for w in warnings))

    def test_first_of_a_repeated_id_wins(self):
        matrix, _ = attck.convert(bundle([pattern('T1059', 'Duplicate', ['execution'])]))
        self.assertEqual(next(t for t in matrix['techniques'] if t['id'] == 'T1059')['name'], 'Command and Scripting Interpreter')

    def test_output_does_not_depend_on_the_order_of_the_bundle(self):
        shuffled = copy.deepcopy(bundle())
        random.Random(7).shuffle(shuffled['objects'])
        first = output.dumps(attck.convert(bundle(), 'u')[0])
        second = output.dumps(attck.convert(shuffled, 'u')[0])
        # The matrix definition is unaffected by shuffling, so only list order could differ.
        self.assertEqual(first, second)

    def test_empty_input_gives_empty_lists(self):
        matrix, _ = attck.convert({})
        self.assertEqual((matrix['tactics'], matrix['techniques'], matrix['sub_techniques']), ([], [], []))


if __name__ == '__main__':
    unittest.main()
