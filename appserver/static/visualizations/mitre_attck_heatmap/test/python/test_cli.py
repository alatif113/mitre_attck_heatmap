import contextlib
import io
import json
import os
import shutil
import tempfile
import unittest

from common import bundle
import enterpriseAttack2json as cli
from mitre_attck import output
from test_d3fend import BIG_ONTOLOGY as ONTOLOGY

MODULES = ['enterpriseAttack.js', 'icsAttack.js', 'mobileAttack.js', 'd3fend.js']


class CliTests(unittest.TestCase):
    def setUp(self):
        self.src = tempfile.mkdtemp()
        self.out = tempfile.mkdtemp()
        self.addCleanup(shutil.rmtree, self.src)
        self.addCleanup(shutil.rmtree, self.out)
        for name in ('enterprise-attack.json', 'ics-attack.json', 'mobile-attack.json'):
            self.write_source(name, bundle())
        self.write_source('d3fend.json', ONTOLOGY)

    def write_source(self, name, document):
        with open(os.path.join(self.src, name), 'w') as handle:
            json.dump(document, handle)

    def run_cli(self, *extra):
        stderr = io.StringIO()
        with contextlib.redirect_stderr(stderr):
            try:
                cli.main(['--from-dir', self.src, '--out', self.out] + list(extra))
                code = 0
            except SystemExit as exit_info:
                code = exit_info.code
        return code, stderr.getvalue()

    def written(self):
        return sorted(f for f in os.listdir(self.out))

    def test_writes_every_module_as_loadable_data(self):
        code, log = self.run_cli()
        self.assertEqual(code, 0)
        self.assertEqual(self.written(), sorted(MODULES))
        enterprise = output.read_module(os.path.join(self.out, 'enterpriseAttack.js'))
        self.assertEqual([t['name'] for t in enterprise['tactics']], ['Execution', 'Stealth', 'Impact'])
        self.assertEqual(enterprise['version'], '20.0')
        self.assertTrue(output.read_module(os.path.join(self.out, 'd3fend.js'))['tactics'])
        self.assertIn('wrote 4 module(s)', log)

    def test_the_modules_are_amd_wrappers_with_compact_sorted_json(self):
        self.run_cli()
        with open(os.path.join(self.out, 'icsAttack.js')) as handle:
            text = handle.read()
        self.assertTrue(text.startswith('define(function() { return {"'))
        self.assertTrue(text.endswith('} })'))
        self.assertNotIn('\n', text)
        self.assertNotIn(', "', text)

    def test_a_subset_can_be_requested(self):
        self.assertEqual(self.run_cli('--matrices', 'ics,d3fend')[0], 0)
        self.assertEqual(self.written(), ['d3fend.js', 'icsAttack.js'])

    def test_an_unknown_matrix_is_an_error(self):
        code, _ = self.run_cli('--matrices', 'enterprise,bogus')
        self.assertEqual(code, 'error: unknown matrix: bogus')
        self.assertEqual(self.written(), [])

    def test_nothing_is_written_when_one_source_is_bad(self):
        self.write_source('mobile-attack.json', {'objects': []})
        code, _ = self.run_cli()
        self.assertIn('mobile data was not written: no tactics; no techniques', str(code))
        self.assertEqual(self.written(), [])

    def test_a_missing_source_file_is_an_error_and_writes_nothing(self):
        os.remove(os.path.join(self.src, 'd3fend.json'))
        code, _ = self.run_cli()
        self.assertIn('error: d3fend', str(code))
        self.assertEqual(self.written(), [])

    def test_existing_data_is_replaced_only_by_data_of_similar_size(self):
        self.assertEqual(self.run_cli('--matrices', 'enterprise')[0], 0)
        path = os.path.join(self.out, 'enterpriseAttack.js')
        # Pretend the data on disk is much bigger than what MITRE now serves.
        big = output.read_module(path)
        big['sub_techniques'] = [dict(s, id='T9%03d.001' % i) for i, s in enumerate(big['sub_techniques'] * 50)]
        bigger = output.js_module(big)
        with open(path, 'w') as handle:
            handle.write(bigger)
        code, _ = self.run_cli('--matrices', 'enterprise')
        self.assertIn('sub_techniques dropped from 100 to 2', str(code))
        self.assertEqual(open(path).read(), bigger)

    def test_a_failed_run_leaves_no_temporary_files(self):
        self.write_source('ics-attack.json', {'objects': []})
        self.run_cli()
        self.assertEqual([f for f in os.listdir(self.out) if f.endswith('.tmp')], [])

    def test_a_second_run_produces_identical_files(self):
        self.run_cli()
        first = {f: open(os.path.join(self.out, f)).read() for f in self.written()}
        self.run_cli()
        self.assertEqual(first, {f: open(os.path.join(self.out, f)).read() for f in self.written()})


class WriteAllTests(unittest.TestCase):
    def test_either_all_files_are_replaced_or_none(self):
        folder = tempfile.mkdtemp()
        self.addCleanup(shutil.rmtree, folder)
        good = os.path.join(folder, 'a.js')
        bad = os.path.join(folder, 'missing-directory', 'b.js')
        with open(good, 'w') as handle:
            handle.write('old')
        with self.assertRaises(OSError):
            output.write_all({good: 'new', bad: 'new'})
        self.assertEqual(open(good).read(), 'old')
        self.assertEqual(os.listdir(folder), ['a.js'])


if __name__ == '__main__':
    unittest.main()
