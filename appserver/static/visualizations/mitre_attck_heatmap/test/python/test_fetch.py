import gzip
import json
import threading
import time
import unittest
from http.server import BaseHTTPRequestHandler, HTTPServer

import common  # noqa: F401  (puts bin/ on the path)
from mitre_attck import fetch

DOCUMENT = {'objects': [{'type': 'x', 'n': i} for i in range(200)]}
ETAG = 'W/"abc"'


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_GET(self):
        seen = self.server.seen
        seen.append({'path': self.path, 'headers': dict(self.headers)})
        mode = self.path.strip('/')
        if mode == 'error':
            return self._send(500, b'boom')
        if mode == 'slow':
            time.sleep(1.5)
            return self._send(200, b'{}')
        if mode == 'bad-json':
            return self._send(200, b'{not json')
        if mode == 'bad-gzip':
            return self._send(200, b'this is not gzip', {'Content-Encoding': 'gzip'})
        if mode == 'bomb':
            return self._send(200, gzip.compress(b'0' * 5_000_000), {'Content-Encoding': 'gzip'})
        if self.headers.get('If-None-Match') == ETAG and mode in ('plain', 'gz'):
            return self._send(304, b'', {'ETag': ETAG})
        body = json.dumps(DOCUMENT).encode()
        if mode == 'gz':
            return self._send(200, gzip.compress(body), {'Content-Encoding': 'gzip', 'ETag': ETAG})
        return self._send(200, body, {'ETag': ETAG})

    def _send(self, status, body, headers=None):
        self.send_response(status)
        for key, value in (headers or {}).items():
            self.send_header(key, value)
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)


class FetchTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = HTTPServer(('127.0.0.1', 0), Handler)
        cls.server.seen = []
        cls.url = 'http://127.0.0.1:%d/' % cls.server.server_address[1]
        threading.Thread(target=cls.server.serve_forever, daemon=True).start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()

    def get(self, mode, **kwargs):
        return fetch.fetch_json(self.url + mode, **kwargs)

    def test_plain_json_and_its_etag(self):
        data, etag = self.get('plain')
        self.assertEqual(data, DOCUMENT)
        self.assertEqual(etag, ETAG)

    def test_gzip_is_asked_for_and_decoded(self):
        data, _ = self.get('gz')
        self.assertEqual(data, DOCUMENT)
        self.assertEqual(self.server.seen[-1]['headers'].get('Accept-Encoding'), 'gzip')
        self.assertIn('mitre_attck_heatmap', self.server.seen[-1]['headers'].get('User-Agent', ''))

    def test_a_matching_etag_gives_no_data(self):
        data, etag = self.get('gz', etag=ETAG)
        self.assertIsNone(data)
        self.assertEqual(etag, ETAG)
        self.assertEqual(self.server.seen[-1]['headers'].get('If-None-Match'), ETAG)

    def test_a_different_etag_downloads_again(self):
        data, _ = self.get('plain', etag='W/"other"')
        self.assertEqual(data, DOCUMENT)

    def test_http_errors_are_reported(self):
        with self.assertRaisesRegex(fetch.FetchError, 'HTTP 500'):
            self.get('error')

    def test_invalid_json_is_reported(self):
        with self.assertRaisesRegex(fetch.FetchError, 'not valid JSON'):
            self.get('bad-json')

    def test_invalid_gzip_is_reported(self):
        with self.assertRaisesRegex(fetch.FetchError, 'gzip'):
            self.get('bad-gzip')

    def test_the_size_limit_applies_to_the_download(self):
        with self.assertRaisesRegex(fetch.FetchError, 'larger than the limit'):
            self.get('plain', max_bytes=100)

    def test_the_size_limit_applies_after_decompression(self):
        with self.assertRaisesRegex(fetch.FetchError, 'larger than the limit'):
            self.get('bomb', max_bytes=1_000_000)

    def test_a_slow_server_times_out(self):
        with self.assertRaises(fetch.FetchError):
            self.get('slow', timeout=0.3)

    def test_nothing_listening_is_reported(self):
        with self.assertRaisesRegex(fetch.FetchError, 'could not download'):
            fetch.fetch_json('http://127.0.0.1:9/', timeout=2)

    def test_plain_http_to_another_host_is_refused(self):
        with self.assertRaisesRegex(fetch.FetchError, 'only https'):
            fetch.fetch_json('http://example.com/data.json')
        with self.assertRaisesRegex(fetch.FetchError, 'only https'):
            fetch.fetch_json('ftp://example.com/data.json')


if __name__ == '__main__':
    unittest.main()
