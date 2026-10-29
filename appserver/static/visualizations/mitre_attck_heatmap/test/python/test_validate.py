import copy
import unittest

from common import bundle
from mitre_attck import attck, validate


class ValidateTests(unittest.TestCase):
    def setUp(self):
        self.matrix, _ = attck.convert(bundle())

    def test_a_good_matrix_has_no_problems(self):
        self.assertEqual(validate.problems_in(self.matrix), [])
        validate.check(self.matrix)

    def test_counts(self):
        self.assertEqual(validate.counts(self.matrix), {'tactics': 3, 'techniques': 3, 'sub_techniques': 2})

    def test_empty_data_is_rejected(self):
        problems = validate.problems_in({'tactics': [], 'techniques': [], 'sub_techniques': []})
        self.assertIn('no tactics', problems)
        self.assertIn('no techniques', problems)

    def test_a_technique_in_no_column_is_reported(self):
        broken = copy.deepcopy(self.matrix)
        broken['techniques'][0]['tactics'] = ['nowhere']
        self.assertTrue(any('belong to no tactic column' in p for p in validate.problems_in(broken)))

    def test_a_sub_technique_without_a_parent_is_reported(self):
        broken = copy.deepcopy(self.matrix)
        broken['sub_techniques'][0]['technique'] = 'T9999'
        self.assertTrue(any('no parent technique' in p for p in validate.problems_in(broken)))

    def test_duplicate_ids_are_reported(self):
        broken = copy.deepcopy(self.matrix)
        broken['techniques'].append(copy.deepcopy(broken['techniques'][0]))
        self.assertIn('duplicate ids', validate.problems_in(broken))

    def test_a_large_drop_in_size_is_reported(self):
        previous = {'tactics': 3, 'techniques': 10, 'sub_techniques': 2}
        problems = validate.problems_in(self.matrix, previous, 0.8)
        self.assertEqual(problems, ['techniques dropped from 10 to 3'])

    def test_growth_and_small_changes_are_fine(self):
        self.assertEqual(validate.problems_in(self.matrix, {'tactics': 3, 'techniques': 3, 'sub_techniques': 2}), [])
        self.assertEqual(validate.problems_in(self.matrix, {'tactics': 4, 'techniques': 3, 'sub_techniques': 2}, 0.7), [])

    def test_check_raises_with_all_the_problems(self):
        with self.assertRaises(validate.ValidationError) as caught:
            validate.check({'tactics': [], 'techniques': [], 'sub_techniques': []})
        self.assertEqual(caught.exception.problems, ['no tactics', 'no techniques'])


if __name__ == '__main__':
    unittest.main()
