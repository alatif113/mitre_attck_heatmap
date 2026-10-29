import contextlib
import io
import json
import os
import shutil
import tempfile
import unittest
from unittest import mock

from common import BIN, bundle, big_bundle
import import_matrices
from mitre_attck import fetch, output, validate

ETAG = 'W/"v1"'


class FakeFetcher(object):
    """Stands in for fetch.fetch_json: serves bundles by URL and records the calls."""

    def __init__(self, documents):
        self.documents = documents
        self.calls = []

    def __call__(self, url, **kwargs):
        self.calls.append(dict(kwargs, url=url))
        document = self.documents[url]
        if isinstance(document, Exception):
            raise document
        if document is None:
            return None, kwargs.get('etag')
        return document, ETAG


def settings(**overrides):
    base = {
        'matrices': ['enterprise', 'ics'],
        'urls': {'enterprise': 'https://x.test/enterprise.json', 'ics': 'https://x.test/ics.json'},
        'timeout': 5, 'max_bytes': 1000000, 'verify_tls': True, 'proxy': '', 'min_count_ratio': 0.8,
    }
    base.update(overrides)
    return base


class RunTests(unittest.TestCase):
    def test_a_first_run_emits_every_matrix_then_a_status(self):
        fetcher = FakeFetcher({'https://x.test/enterprise.json': bundle(), 'https://x.test/ics.json': bundle()})
        events, state = import_matrices.run(settings(), {}, fetcher)
        self.assertEqual([e['kind'] for e in events], ['matrix', 'matrix', 'status'])
        first = events[0]
        self.assertEqual((first['matrix'], first['version'], first['schema']), ('enterprise', '20.0', 1))
        self.assertEqual(json.loads(first['data_json'])['techniques'][0]['id'], 'T1027')
        self.assertEqual(len(first['sha256']), 64)
        self.assertRegex(first['imported_at'], r'^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$')
        self.assertEqual(events[2]['status'], 'ok')
        self.assertEqual(events[2]['matrices'], {'enterprise': '20.0', 'ics': '20.0'})
        self.assertEqual(state['enterprise']['etag'], ETAG)
        self.assertEqual(state['enterprise']['counts'], {'tactics': 3, 'techniques': 3, 'sub_techniques': 2})

    def test_the_stored_etag_is_sent_and_unchanged_matrices_emit_nothing(self):
        fetcher = FakeFetcher({'https://x.test/enterprise.json': None, 'https://x.test/ics.json': None})
        old_state = {'enterprise': {'etag': ETAG}, 'ics': {'etag': ETAG}}
        events, state = import_matrices.run(settings(), old_state, fetcher)
        self.assertEqual([e['kind'] for e in events], ['status'])
        self.assertEqual(events[0]['status'], 'unchanged')
        self.assertEqual([c['etag'] for c in fetcher.calls], [ETAG, ETAG])
        self.assertEqual(state, old_state)

    def test_the_download_settings_are_passed_on(self):
        fetcher = FakeFetcher({'https://x.test/enterprise.json': bundle()})
        import_matrices.run(settings(matrices=['enterprise'], proxy='http://proxy:3128', verify_tls=False), {}, fetcher)
        call = fetcher.calls[0]
        self.assertEqual((call['timeout'], call['max_bytes'], call['proxy'], call['verify_tls']), (5, 1000000, 'http://proxy:3128', False))

    def test_a_failing_matrix_does_not_stop_the_others(self):
        fetcher = FakeFetcher({
            'https://x.test/enterprise.json': fetch.FetchError('https://x.test/enterprise.json returned HTTP 503'),
            'https://x.test/ics.json': bundle(),
        })
        old_state = {'enterprise': {'etag': 'old', 'counts': {'techniques': 3}}}
        events, state = import_matrices.run(settings(), old_state, fetcher)
        self.assertEqual([(e['kind'], e.get('matrix')) for e in events], [('matrix', 'ics'), ('status', None)])
        status = events[-1]
        self.assertEqual(status['status'], 'error')
        self.assertEqual(status['errors'], [{'matrix': 'enterprise', 'message': 'https://x.test/enterprise.json returned HTTP 503'}])
        self.assertEqual(state['enterprise'], {'etag': 'old', 'counts': {'techniques': 3}})
        self.assertIn('ics', state)

    def test_data_that_shrinks_too_much_is_not_emitted_and_the_state_is_kept(self):
        fetcher = FakeFetcher({'https://x.test/enterprise.json': bundle()})
        old_state = {'enterprise': {'etag': 'old', 'counts': {'tactics': 3, 'techniques': 200, 'sub_techniques': 2}}}
        events, state = import_matrices.run(settings(matrices=['enterprise']), old_state, fetcher)
        self.assertEqual([e['kind'] for e in events], ['status'])
        self.assertIn('techniques dropped from 200 to 3', events[0]['errors'][0]['message'])
        self.assertEqual(state, old_state)

    def test_broken_data_is_rejected(self):
        fetcher = FakeFetcher({'https://x.test/enterprise.json': {'objects': []}})
        events, _ = import_matrices.run(settings(matrices=['enterprise']), {}, fetcher)
        self.assertEqual(events[0]['status'], 'error')
        self.assertIn('no tactics', events[0]['errors'][0]['message'])

    def test_the_input_state_is_not_modified(self):
        fetcher = FakeFetcher({'https://x.test/enterprise.json': bundle()})
        old_state = {'enterprise': {'etag': 'old'}}
        import_matrices.run(settings(matrices=['enterprise']), old_state, fetcher)
        self.assertEqual(old_state, {'enterprise': {'etag': 'old'}})

    def test_a_large_matrix_is_emitted_as_one_event(self):
        fetcher = FakeFetcher({'https://x.test/enterprise.json': big_bundle(2000)})
        events, _ = import_matrices.run(settings(matrices=['enterprise']), {}, fetcher)
        self.assertGreater(len(events[0]['data_json']), 100000)
        self.assertEqual(len(json.loads(events[0]['data_json'])['techniques']), 2003)


class SettingsTests(unittest.TestCase):
    def setUp(self):
        self.root = tempfile.mkdtemp()
        for layer in ('default', 'local'):
            os.makedirs(os.path.join(self.root, layer))

    def tearDown(self):
        shutil.rmtree(self.root)

    def write(self, layer, text):
        with open(os.path.join(self.root, layer, 'mitre_attck_import.conf'), 'w') as handle:
            handle.write(text)

    def test_defaults_without_any_file(self):
        loaded = import_matrices.load_settings(self.root)
        self.assertEqual(loaded['matrices'], ['enterprise', 'ics', 'mobile'])
        self.assertTrue(loaded['urls']['enterprise'].startswith('https://raw.githubusercontent.com/mitre-attack/'))
        self.assertEqual((loaded['timeout'], loaded['verify_tls'], loaded['proxy'], loaded['min_count_ratio']), (120, True, '', 0.8))

    def test_local_overrides_default(self):
        self.write('default', '[import]\nmatrices = enterprise,ics\ntimeout = 60\nverify_tls = true\n')
        self.write('local', '[import]\ntimeout = 30\nverify_tls = false\nproxy = http://proxy:3128\n[source:ics]\nurl = https://mirror.test/ics.json\n')
        loaded = import_matrices.load_settings(self.root)
        self.assertEqual(loaded['matrices'], ['enterprise', 'ics'])
        self.assertEqual((loaded['timeout'], loaded['verify_tls'], loaded['proxy']), (30, False, 'http://proxy:3128'))
        self.assertEqual(loaded['urls']['ics'], 'https://mirror.test/ics.json')

    def test_bad_numbers_fall_back_to_defaults(self):
        self.write('local', '[import]\ntimeout = soon\nmax_bytes = lots\nmin_count_ratio = most\n')
        loaded = import_matrices.load_settings(self.root)
        self.assertEqual((loaded['timeout'], loaded['max_bytes'], loaded['min_count_ratio']), (120, 150 * 1024 * 1024, 0.8))

    def test_matrices_without_a_url_are_dropped(self):
        self.write('local', '[import]\nmatrices = enterprise,nonsense\n')
        self.assertEqual(import_matrices.load_settings(self.root)['matrices'], ['enterprise'])

    def test_the_shipped_defaults_parse(self):
        loaded = import_matrices.load_settings(os.path.dirname(BIN))
        self.assertEqual(loaded['matrices'], ['enterprise', 'ics', 'mobile'])
        self.assertTrue(loaded['verify_tls'])


class MainTests(unittest.TestCase):
    def setUp(self):
        self.state_dir = tempfile.mkdtemp()
        patcher = mock.patch.dict(os.environ, {'MITRE_ATTCK_STATE_DIR': self.state_dir})
        patcher.start()
        self.addCleanup(patcher.stop)
        self.addCleanup(shutil.rmtree, self.state_dir)

    def test_stdout_carries_only_json_events_and_the_state_is_saved(self):
        real_run = import_matrices.run
        fake = FakeFetcher({'https://x.test/enterprise.json': bundle()})
        loaded = settings(matrices=['enterprise'])
        stdout = io.StringIO()
        with mock.patch.object(import_matrices, 'load_settings', return_value=loaded), \
                mock.patch.object(import_matrices, 'run', lambda s, st: real_run(s, st, fake)), \
                contextlib.redirect_stdout(stdout):
            with self.assertRaises(SystemExit) as exit_info:
                import_matrices.main()
        self.assertEqual(exit_info.exception.code, 0)
        lines = stdout.getvalue().strip().split('\n')
        events = [json.loads(line) for line in lines]
        self.assertEqual([e['kind'] for e in events], ['matrix', 'status'])
        with open(os.path.join(self.state_dir, 'import_state.json')) as handle:
            self.assertEqual(json.load(handle)['enterprise']['etag'], ETAG)

    def test_the_exit_code_is_nonzero_only_when_every_matrix_failed(self):
        real_run = import_matrices.run

        def attempt(documents, matrices):
            fake = FakeFetcher(documents)
            loaded = settings(matrices=matrices)
            with mock.patch.object(import_matrices, 'load_settings', return_value=loaded), \
                    mock.patch.object(import_matrices, 'run', lambda s, st: real_run(s, st, fake)), \
                    contextlib.redirect_stdout(io.StringIO()):
                with self.assertRaises(SystemExit) as exit_info:
                    import_matrices.main()
            return exit_info.exception.code

        down = fetch.FetchError('down')
        self.assertEqual(attempt({'https://x.test/enterprise.json': down, 'https://x.test/ics.json': down}, ['enterprise', 'ics']), 1)
        self.assertEqual(attempt({'https://x.test/enterprise.json': down, 'https://x.test/ics.json': bundle()}, ['enterprise', 'ics']), 0)


if __name__ == '__main__':
    unittest.main()
