#!/usr/bin/env python3
"""Regenerate the bundled matrix data modules in build/ from MITRE's data.

This is the offline fallback to the scripted input (bin/import_matrices.py):
it downloads the same sources with the same code (the mitre_attck package),
validates them, and writes build/enterpriseAttack.js, icsAttack.js,
mobileAttack.js and d3fend.js. Either all requested modules are written or
none are.

    python3 bin/enterpriseAttack2json.py                  # download and write
    python3 bin/enterpriseAttack2json.py --from-dir DIR   # read local files instead
    python3 bin/enterpriseAttack2json.py --matrices ics   # only some matrices

With --from-dir, DIR must contain enterprise-attack.json, ics-attack.json,
mobile-attack.json and d3fend.json (whichever are requested).
"""
import argparse
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from mitre_attck import D3FEND_URL, MODULE_NAMES, SOURCES, attck, d3fend, fetch, output, validate  # noqa: E402

DEFAULT_OUT = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), '..', 'appserver', 'static', 'visualizations',
    'mitre_attck_heatmap', 'build')
LOCAL_FILES = {
    'enterprise': 'enterprise-attack.json',
    'ics': 'ics-attack.json',
    'mobile': 'mobile-attack.json',
    'd3fend': 'd3fend.json',
}


def load(name, from_dir):
    """The parsed source document and where it came from."""
    if from_dir:
        path = os.path.join(from_dir, LOCAL_FILES[name])
        with open(path, encoding='utf-8') as handle:
            return json.load(handle), path
    url = D3FEND_URL if name == 'd3fend' else SOURCES[name]
    data, _ = fetch.fetch_json(url)
    return data, url


def previous_counts(path):
    """Sizes of the data being replaced, or None if there is none to compare with."""
    try:
        return validate.counts(output.read_module(path))
    except (OSError, ValueError):
        return None


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--out', default=DEFAULT_OUT, help='directory for the .js modules (default: build/ in the app)')
    parser.add_argument('--from-dir', help='read the source files from this directory instead of downloading')
    parser.add_argument('--matrices', default='enterprise,ics,mobile,d3fend',
                        help='comma-separated subset of: ' + ', '.join(LOCAL_FILES))
    args = parser.parse_args(argv)

    names = [n.strip() for n in args.matrices.split(',') if n.strip()]
    unknown = [n for n in names if n not in LOCAL_FILES]
    if unknown:
        sys.exit('error: unknown matrix: ' + ', '.join(unknown))

    out_dir = os.path.abspath(args.out)
    files = {}
    for name in names:
        path = os.path.join(out_dir, MODULE_NAMES[name] + '.js')
        try:
            document, source = load(name, args.from_dir)
            if name == 'd3fend':
                matrix = d3fend.convert(document)
                problems = d3fend.problems_in(matrix)
            else:
                matrix, warnings = attck.convert(document, source)
                for warning in warnings:
                    sys.stderr.write('warning: %s: %s\n' % (name, warning))
                problems = validate.problems_in(matrix, previous_counts(path))
        except (fetch.FetchError, OSError, ValueError) as error:
            sys.exit('error: %s: %s' % (name, error))
        if problems:
            sys.exit('error: %s data was not written: %s' % (name, '; '.join(problems)))
        files[path] = output.js_module(matrix)
        sys.stderr.write('%s: %s\n' % (name, matrix.get('version') or 'ok'))

    output.write_all(files)
    sys.stderr.write('wrote %d module(s) to %s\n' % (len(files), out_dir))


if __name__ == '__main__':
    main()
