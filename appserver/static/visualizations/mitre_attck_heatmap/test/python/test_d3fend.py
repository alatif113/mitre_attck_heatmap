import unittest

import common  # noqa: F401
from mitre_attck import d3fend


def node(id_, label, types, d3_id=None, parent=None, **extra):
    result = {'@id': id_, '@type': types, 'rdfs:label': label}
    if d3_id:
        result['d3f:d3fend-id'] = d3_id
    if parent is not None:
        result['rdfs:subClassOf'] = parent
    result.update(extra)
    return result


def tactic(id_, label, order):
    return node(id_, label, ['d3f:DefensiveTactic', 'owl:Class', 'owl:NamedIndividual'], None,
                {'@id': 'd3f:DefensiveTactic'}, **{'d3f:display-order': order})


def technique(id_, label, d3_id, enables, parent=None):
    return node(id_, label, [id_, 'owl:Class'], d3_id,
                parent if parent is not None else [{'@id': '_:b1'}, {'@id': 'd3f:DefensiveTechnique'}],
                **{'d3f:enables': enables})


ONTOLOGY = {'@graph': [
    {'@id': 'd3f:DefensiveTechnique', 'rdfs:label': 'Defensive Technique'},
    tactic('d3f:Harden', 'Harden', 0),
    tactic('d3f:Model', 'Model', -1),
    tactic('d3f:Detect', 'Detect', 1),
    node('d3f:Elsewhere', 'Not a tactic', ['owl:Class'], None, {'@id': 'd3f:Something'}),
    technique('d3f:AssetInventory', 'Asset Inventory', 'D3-AI', {'@id': 'd3f:Model'}, {'@id': 'd3f:DefensiveTechnique'}),
    technique('d3f:CredentialHardening', 'Credential Hardening', 'D3-CH', {'@id': 'd3f:Harden'}),
    technique('d3f:Both', 'Analysis In Two Places', 'D3-BO', [{'@id': 'd3f:Detect'}, {'@id': 'd3f:Model'}]),
    technique('d3f:Orphan', 'No Tactic', 'D3-OR', None),
    node('d3f:Unnamed', 'No D3FEND id', ['owl:Class'], None, {'@id': 'd3f:DefensiveTechnique'}),
    node('d3f:HardwareInventory', 'Hardware Inventory', ['owl:Class'], 'D3-HI', [{'@id': '_:b2'}, {'@id': 'd3f:AssetInventory'}]),
    node('d3f:Deeper', 'Deeper Still', ['owl:Class'], 'D3-DS', {'@id': 'd3f:HardwareInventory'}),
    node('d3f:NoIdBetween', 'Link With No Id', ['owl:Class'], None, {'@id': 'd3f:AssetInventory'}),
    node('d3f:BelowLink', 'Below The Link', ['owl:Class'], 'D3-BL', {'@id': 'd3f:NoIdBetween'}),
    node('d3f:PasswordRules', 'Password Rules', ['owl:Class'], 'D3-PR', {'@id': 'd3f:CredentialHardening'}),
]}


def big_ontology():
    """A complete-looking ontology: 7 tactics, 30 techniques, a few sub-techniques each."""
    graph = [{'@id': 'd3f:DefensiveTechnique', 'rdfs:label': 'Defensive Technique'}]
    for i in range(7):
        graph.append(tactic('d3f:Tactic%d' % i, 'Tactic %d' % i, i - 1))
    for i in range(30):
        graph.append(technique('d3f:Tech%d' % i, 'Technique %d' % i, 'D3-T%d' % i, {'@id': 'd3f:Tactic%d' % (i % 7)},
                               {'@id': 'd3f:DefensiveTechnique'}))
        for j in range(3):
            graph.append(node('d3f:Sub%d_%d' % (i, j), 'Sub %d %d' % (i, j), ['owl:Class'], 'D3-S%d-%d' % (i, j), {'@id': 'd3f:Tech%d' % i}))
    return {'@graph': graph}


BIG_ONTOLOGY = big_ontology()


class D3fendTests(unittest.TestCase):
    def setUp(self):
        self.matrix = d3fend.convert(ONTOLOGY)

    def test_tactics_are_the_defensive_tactics_in_display_order(self):
        self.assertEqual([(t['name'], t['sort_order']) for t in self.matrix['tactics']],
                         [('Model', 0), ('Harden', 1), ('Detect', 2)])
        self.assertEqual(self.matrix['tactics'][0], {'id': 'd3f:Model', 'name': 'Model', 'short_name': 'd3f:Model', 'sort_order': 0})

    def test_techniques_are_the_direct_children_of_defensive_technique_with_an_id(self):
        self.assertEqual([t['id'] for t in self.matrix['techniques']], ['D3-BO', 'D3-AI', 'D3-CH', 'D3-OR'])
        self.assertNotIn('d3f:Unnamed', [t['url'].rsplit('/', 1)[-1] for t in self.matrix['techniques']])
        self.assertEqual(self.matrix['techniques'][1]['url'], 'https://d3fend.mitre.org/technique/d3f:AssetInventory')

    def test_a_technique_is_placed_in_the_tactics_it_enables(self):
        by_id = {t['id']: t for t in self.matrix['techniques']}
        self.assertEqual(by_id['D3-AI']['tactics'], ['d3f:Model'])
        self.assertEqual(sorted(by_id['D3-BO']['tactics']), ['d3f:Detect', 'd3f:Model'])
        self.assertEqual(by_id['D3-OR']['tactics'], [])

    def test_a_technique_is_never_a_tactic(self):
        tactic_names = {t['short_name'] for t in self.matrix['tactics']}
        for technique_record in self.matrix['techniques']:
            self.assertFalse(set(technique_record['tactics']) - tactic_names)
            self.assertNotIn(technique_record['id'], [t['id'] for t in self.matrix['tactics']])

    def test_everything_below_a_technique_is_its_sub_technique_at_any_depth(self):
        subs = {s['id']: s for s in self.matrix['sub_techniques']}
        self.assertEqual(sorted(subs), ['D3-BL', 'D3-DS', 'D3-HI', 'D3-PR'])
        self.assertEqual(subs['D3-HI']['technique'], 'D3-AI')
        self.assertEqual(subs['D3-DS']['technique'], 'D3-AI')
        self.assertEqual(subs['D3-BL']['technique'], 'D3-AI')       # through a class with no D3FEND id
        self.assertEqual(subs['D3-PR']['technique'], 'D3-CH')

    def test_a_sub_technique_shows_its_own_id_and_names_one_technique_by_id(self):
        sub = next(s for s in self.matrix['sub_techniques'] if s['id'] == 'D3-HI')
        self.assertEqual(sub['short_id'], 'D3-HI')
        self.assertIsInstance(sub['technique'], str)
        self.assertEqual(sub['url'], 'https://d3fend.mitre.org/technique/d3f:HardwareInventory')

    def test_techniques_are_not_sub_techniques(self):
        self.assertFalse({t['id'] for t in self.matrix['techniques']} & {s['id'] for s in self.matrix['sub_techniques']})

    def test_blank_nodes_and_odd_shapes_are_ignored(self):
        graph = [{'@id': 'd3f:Odd', '@type': 'owl:Class', 'rdfs:subClassOf': 'not a dict'}, 'text', {'no': 'id'}] + ONTOLOGY['@graph']
        self.assertEqual(d3fend.convert({'@graph': graph}), self.matrix)

    def test_empty_input(self):
        self.assertEqual(d3fend.convert({}), {'tactics': [], 'techniques': [], 'sub_techniques': []})
        self.assertEqual(d3fend.problems_in(d3fend.convert({})), ['no tactics', 'no techniques'])


class D3fendProblemTests(unittest.TestCase):
    def good(self):
        tactics = [{'id': 'd3f:T%d' % i, 'name': 'T%d' % i, 'short_name': 'd3f:T%d' % i, 'sort_order': i} for i in range(7)]
        techniques = [{'id': 'D3-%d' % i, 'name': 'Tech %d' % i, 'tactics': ['d3f:T%d' % (i % 7)], 'url': 'u'} for i in range(30)]
        subs = [{'id': 'D3-S%d' % i, 'name': 'Sub', 'short_id': 'D3-S%d' % i, 'technique': 'D3-%d' % (i % 30), 'url': 'u'} for i in range(60)]
        return {'tactics': tactics, 'techniques': techniques, 'sub_techniques': subs}

    def test_a_sound_matrix_has_no_problems(self):
        self.assertEqual(d3fend.problems_in(self.good()), [])
        self.assertEqual(d3fend.problems_in(d3fend.convert(BIG_ONTOLOGY)), [])

    def test_too_few_tactics_or_techniques(self):
        matrix = self.good()
        matrix['tactics'] = matrix['tactics'][:2]
        matrix['techniques'] = matrix['techniques'][:3]
        matrix['sub_techniques'] = []
        problems = d3fend.problems_in(matrix)
        self.assertIn('only 2 tactics (expected at least 5)', problems)
        self.assertIn('only 3 techniques (expected at least 20)', problems)

    def test_a_technique_in_no_tactic_or_an_unknown_one(self):
        matrix = self.good()
        matrix['techniques'][0]['tactics'] = []
        matrix['techniques'][1]['tactics'] = ['d3f:Nowhere']
        problems = d3fend.problems_in(matrix)
        self.assertIn('technique D3-0 is in no tactic', problems)
        self.assertIn('technique D3-1 names an unknown tactic', problems)

    def test_a_sub_technique_without_a_technique_or_a_short_id(self):
        matrix = self.good()
        matrix['sub_techniques'][0]['technique'] = ['d3f:Something']
        matrix['sub_techniques'][1]['short_id'] = ''
        problems = d3fend.problems_in(matrix)
        self.assertIn('sub-technique D3-S0 has no technique', problems)
        self.assertIn('sub-technique D3-S1 has no short id', problems)

    def test_duplicate_ids(self):
        matrix = self.good()
        matrix['techniques'][1]['id'] = matrix['techniques'][0]['id']
        matrix['sub_techniques'][0]['id'] = 'D3-5'
        problems = d3fend.problems_in(matrix)
        self.assertIn('duplicate technique ids', problems)
        self.assertIn('an id is used twice', problems)


if __name__ == '__main__':
    unittest.main()
