import unittest

import common  # noqa: F401
from mitre_attck import d3fend


def node(id_, label, types, d3_id=None, parent=None):
    result = {'@id': id_, '@type': types, 'rdfs:label': label}
    if d3_id:
        result['d3f:d3fend-id'] = d3_id
    if parent is not None:
        result['rdfs:subClassOf'] = parent
    return result


ONTOLOGY = {'@graph': [
    {'@id': 'd3f:DefensiveTechnique', 'rdfs:label': 'Defensive'},                                    # no @type: ignored
    node('d3f:AssetInventory', 'Asset Inventory', ['d3f:AssetInventory', 'owl:Class'], 'D3-AI',
         {'@id': 'd3f:DefensiveTechnique'}),                                                         # dict parent
    node('d3f:CredentialHardening', 'Credential Hardening', ['d3f:CredentialHardening', 'owl:Class'], 'D3-CH',
         [{'@id': '_:b1'}, {'@id': 'd3f:DefensiveTechnique'}]),                                      # list parent
    node('d3f:Brand', 'Brand New Category', ['d3f:Brand'], 'D3-BN', {'@id': 'd3f:DefensiveTechnique'}),   # not in the order list
    node('d3f:NotACategory', 'Other', ['owl:Class'], 'D3-X', {'@id': 'd3f:Something'}),               # other parent: ignored
    node('d3f:HostInventory', 'Host Inventory', ['d3f:AssetInventory'], 'D3-HI'),                     # technique of AssetInventory
    node('d3f:StringTyped', 'String typed', 'd3f:AssetInventory', 'D3-ST'),                           # @type not a list: ignored
    node('d3f:Leaf', 'Leaf', ['d3f:HostInventory'], 'D3-LF'),                                         # sub-technique
]}


class D3fendTests(unittest.TestCase):
    def setUp(self):
        self.matrix = d3fend.convert(ONTOLOGY)

    def test_categories_become_columns_in_the_known_order_then_the_rest(self):
        self.assertEqual([(t['id'], t['sort_order']) for t in self.matrix['tactics']],
                         [('D3-AI', 0), ('D3-CH', 5), ('D3-BN', 100)])
        self.assertEqual(self.matrix['tactics'][0]['short_name'], 'd3f:AssetInventory')

    def test_techniques_are_the_nodes_typed_with_a_category(self):
        ids = [t['id'] for t in self.matrix['techniques']]
        self.assertEqual(ids, ['D3-AI', 'D3-CH', 'D3-BN', 'D3-HI'])
        self.assertEqual(self.matrix['techniques'][3]['tactics'], ['d3f:AssetInventory'])
        self.assertEqual(self.matrix['techniques'][0]['url'], 'https://d3fend.mitre.org/technique/d3f:AssetInventory')

    def test_sub_techniques_are_the_nodes_typed_with_a_technique(self):
        # Categories are typed with themselves, so they and their techniques all count here (the original behavior).
        self.assertEqual([s['id'] for s in self.matrix['sub_techniques']], ['D3-AI', 'D3-BN', 'D3-CH', 'D3-HI', 'D3-LF'])
        leaf = next(s for s in self.matrix['sub_techniques'] if s['id'] == 'D3-LF')
        self.assertEqual(leaf['technique'], ['d3f:HostInventory'])

    def test_string_typed_nodes_are_ignored_as_before(self):
        self.assertNotIn('D3-ST', [t['id'] for t in self.matrix['techniques']])

    def test_empty_input(self):
        self.assertEqual(d3fend.convert({}), {'tactics': [], 'techniques': [], 'sub_techniques': []})
        self.assertEqual(d3fend.problems_in(d3fend.convert({})), ['no tactics', 'no techniques'])
        self.assertEqual(d3fend.problems_in(self.matrix), [])


if __name__ == '__main__':
    unittest.main()
