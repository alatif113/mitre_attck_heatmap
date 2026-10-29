#!/usr/bin/env python3
"""Scripted input: download MITRE ATT&CK matrices and print them as Splunk events.

For every matrix that changed since the last run this prints one JSON event
(kind "matrix") carrying the converted matrix document, then one summary
event (kind "status"). A scheduled search ("MITRE ATT&CK - update matrix
collection") copies the events into the mitre_matrix KV Store collection that
the visualization reads when "Matrix data" is set to Imported.

Settings come from default/mitre_attck_import.conf, overridden by
local/mitre_attck_import.conf. Nothing here uses credentials. A matrix that
fails to download or validate is skipped and reported in the status event;
the others still import.
"""
import configparser
import hashlib
import json
import logging
import os
import sys
import tempfile
import time
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from mitre_attck import SCHEMA, SOURCES, attck, fetch, output, validate  # noqa: E402

APP = 'mitre_attck_heatmap'
LOG = logging.getLogger('mitre_attck_heatmap.importer')


def app_root():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _number(parser, key, default, kind=int):
    try:
        return kind(parser.get('import', key))
    except (configparser.Error, ValueError):
        return default


def load_settings(root=None):
    """Read default/ then local/ mitre_attck_import.conf into a plain dict."""
    root = root or app_root()
    parser = configparser.RawConfigParser(strict=False)
    for layer in ('default', 'local'):
        parser.read(os.path.join(root, layer, 'mitre_attck_import.conf'), encoding='utf-8')

    def text(key, default=''):
        try:
            return parser.get('import', key).strip()
        except configparser.Error:
            return default

    matrices = [m.strip() for m in text('matrices', 'enterprise,ics,mobile').split(',') if m.strip()]
    urls = {}
    for name in matrices:
        section = 'source:' + name
        urls[name] = (parser.get(section, 'url').strip() if parser.has_option(section, 'url') else SOURCES.get(name, ''))

    return {
        'matrices': [m for m in matrices if urls.get(m)],
        'urls': urls,
        'timeout': _number(parser, 'timeout', 120),
        'max_bytes': _number(parser, 'max_bytes', 150 * 1024 * 1024),
        'verify_tls': text('verify_tls', 'true').lower() not in ('0', 'false', 'no', 'off'),
        'proxy': text('proxy'),
        'min_count_ratio': _number(parser, 'min_count_ratio', 0.8, float),
    }


def state_path():
    """Where the importer remembers ETags and sizes between runs."""
    folder = os.environ.get('MITRE_ATTCK_STATE_DIR')
    if not folder:
        home = os.environ.get('SPLUNK_HOME')
        folder = os.path.join(home, 'var', 'lib', 'splunk', APP) if home else os.path.join(tempfile.gettempdir(), APP)
    return os.path.join(folder, 'import_state.json')


def load_state(path):
    try:
        with open(path, encoding='utf-8') as handle:
            state = json.load(handle)
        return state if isinstance(state, dict) else {}
    except (OSError, ValueError):
        return {}


def save_state(path, state):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    output.write_all({path: json.dumps(state, sort_keys=True)})


def _now():
    return datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')


def run(settings, state, fetcher=fetch.fetch_json):
    """Download and convert every configured matrix.

    Returns (events, new_state). `state` is not modified; a matrix's entry in
    the new state only changes when that matrix imported successfully.
    """
    started = time.time()
    events = []
    new_state = {k: dict(v) if isinstance(v, dict) else v for k, v in state.items()}
    results = {}
    errors = []

    for name in settings['matrices']:
        url = settings['urls'][name]
        previous = state.get(name) if isinstance(state.get(name), dict) else {}
        try:
            document, etag = fetcher(
                url, timeout=settings['timeout'], max_bytes=settings['max_bytes'],
                etag=previous.get('etag'), proxy=settings['proxy'] or None, verify_tls=settings['verify_tls'])
            if document is None:
                results[name] = 'unchanged'
                LOG.info('%s: unchanged', name)
                continue

            matrix, warnings = attck.convert(document, url)
            for warning in warnings:
                LOG.warning('%s: %s', name, warning)
            validate.check(matrix, previous.get('counts'), settings['min_count_ratio'])

            data_json = output.dumps(matrix)
            events.append({
                'kind': 'matrix',
                'matrix': name,
                'version': matrix['version'],
                'modified': matrix['modified'],
                'imported_at': _now(),
                'sha256': hashlib.sha256(data_json.encode('utf-8')).hexdigest(),
                'schema': SCHEMA,
                'data_json': data_json,
            })
            new_state[name] = {
                'etag': etag, 'counts': validate.counts(matrix),
                'version': matrix['version'], 'modified': matrix['modified'],
            }
            results[name] = matrix['version'] or 'imported'
            LOG.info('%s: imported version %s', name, results[name])
        except (fetch.FetchError, validate.ValidationError) as error:
            errors.append({'matrix': name, 'message': str(error)})
            LOG.error('%s: %s', name, error)

    if errors:
        status = 'error'
    elif results and all(v == 'unchanged' for v in results.values()):
        status = 'unchanged'
    else:
        status = 'ok'

    events.append({
        'kind': 'status',
        'status': status,
        'matrices': results,
        'errors': errors,
        'duration_s': round(time.time() - started, 2),
        'imported_at': _now(),
    })
    return events, new_state


def main():
    logging.basicConfig(stream=sys.stderr, level=logging.INFO, format='%(levelname)s %(name)s: %(message)s')
    settings = load_settings()
    path = state_path()
    events, new_state = run(settings, load_state(path))

    for event in events:
        sys.stdout.write(json.dumps(event, separators=(',', ':'), sort_keys=True) + '\n')
    sys.stdout.flush()

    if new_state != load_state(path):
        try:
            save_state(path, new_state)
        except OSError as error:
            LOG.warning('could not save state to %s: %s', path, error)

    status = events[-1]
    failed = len(status['errors'])
    sys.exit(1 if failed and failed == len(settings['matrices']) else 0)


if __name__ == '__main__':
    main()
