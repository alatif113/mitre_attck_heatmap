"""Serialize matrix documents and write them without leaving partial files."""
import json
import os


def dumps(matrix):
    """Compact JSON with sorted keys, so unchanged data produces identical bytes."""
    return json.dumps(matrix, separators=(',', ':'), sort_keys=True)


def js_module(matrix):
    """The AMD module the visualization's build loads."""
    return 'define(function() { return ' + dumps(matrix) + ' })'


def read_module(path):
    """Parse a js_module() file (or an older one from the original converter)."""
    with open(path, encoding='utf-8') as handle:
        text = handle.read()
    return json.loads(text[text.index('return') + len('return'):text.rindex('}')].strip())


def write_all(files):
    """Write {path: text} so that either every file is replaced or none is.

    Everything is written to temporary names first; only then are the files
    renamed into place, so a failure while writing leaves the old data intact.
    """
    staged = []
    try:
        for path, text in files.items():
            temporary = path + '.tmp'
            with open(temporary, 'w', encoding='utf-8') as handle:
                handle.write(text)
            staged.append((temporary, path))
        for temporary, path in staged:
            os.replace(temporary, path)
        staged = []
    finally:
        for temporary, _ in staged:
            if os.path.exists(temporary):
                os.remove(temporary)
