/*
 * The scripted input's Splunk configuration: the files must agree with each
 * other and with the script, because nothing here can be exercised without a
 * running Splunk.
 */
const fs = require('fs');
const path = require('path');

const APP_ROOT = path.resolve(__dirname, '../../../../..');
const read = file => fs.readFileSync(path.join(APP_ROOT, file), 'utf8');

// Minimal .conf parser: { stanza: { key: value } }. A trailing backslash joins
// the next line, as Splunk does.
function parseConf(text) {
    const stanzas = {};
    let current = null;
    text.replace(/\\\n/g, '').split('\n').forEach(line => {
        const header = line.match(/^\[(.*)\]\s*$/);
        if (header) {
            current = stanzas[header[1]] = {};
            return;
        }
        const pair = line.match(/^([^#=\s][^=]*?)\s*=\s*(.*?)\s*$/);
        if (pair && current) current[pair[1]] = pair[2];
    });
    return stanzas;
}

const SEARCH_NAME = 'MITRE ATT&CK - update matrix collection';
const SOURCETYPE = 'mitre:attck:matrix';
const EVENT_KEYS = ['kind', 'matrix', 'version', 'modified', 'imported_at', 'sha256', 'schema', 'data_json'];

describe('scripted input', () => {
    const inputs = parseConf(read('default/inputs.conf'));
    const stanza = inputs['script://./bin/import_matrices.py'];

    test('runs a script that exists, with Python 3, and is off until enabled', () => {
        expect(stanza).toBeDefined();
        expect(fs.existsSync(path.join(APP_ROOT, 'bin/import_matrices.py'))).toBe(true);
        expect(stanza).toMatchObject({ disabled: '1', 'python.version': 'python3', sourcetype: SOURCETYPE });
        expect(stanza.interval).toMatch(/^[0-9*/, -]+( [0-9*/, -]+){4}$|^\d+$/);
    });

    test('its sourcetype keeps whole matrices in one event', () => {
        const props = parseConf(read('default/props.conf'));
        expect(props[SOURCETYPE]).toMatchObject({ TRUNCATE: '0', SHOULD_LINEMERGE: 'false' });
    });

    test('the script prints every field the scheduled search reads', () => {
        const script = read('bin/import_matrices.py');
        EVENT_KEYS.forEach(key => expect(script).toContain("'" + key + "'"));
    });
});

describe('matrix collection', () => {
    const collections = parseConf(read('default/collections.conf'));
    const transforms = parseConf(read('default/transforms.conf'));
    const searches = parseConf(read('default/savedsearches.conf'));
    const search = searches[SEARCH_NAME];
    const tabled = search.search.match(/\| table ([^|]*?)\s*(?=\|)/)[1].split(/\s+/);

    test('the collection stores every field the search writes', () => {
        const declared = Object.keys(collections.mitre_matrix).map(k => k.replace(/^field\./, ''));
        tabled.filter(f => f != '_key').forEach(field => expect(declared).toContain(field));
    });

    test('the lookup definition points at the collection and lists the same fields', () => {
        expect(transforms.mitre_matrix).toMatchObject({ external_type: 'kvstore', collection: 'mitre_matrix' });
        expect(transforms.mitre_matrix.fields_list.split(/,\s*/)).toEqual(tabled);
    });

    test('everyone can read the collection, and only admins write it', () => {
        const meta = parseConf(read('metadata/default.meta'));
        expect(meta['collections/mitre_matrix'].access).toBe('read : [ * ], write : [ admin, sc_admin ]');
        expect(meta['lookups/mitre_matrix'].access).toBe('read : [ * ], write : [ admin, sc_admin ]');
    });
});

describe('scheduled search', () => {
    const searches = parseConf(read('default/savedsearches.conf'));
    const macros = parseConf(read('default/macros.conf'));
    const search = searches[SEARCH_NAME];

    test('is an unscheduled, disabled report until the admin enables it (a scheduled one has no Edit in Splunk Web)', () => {
        expect(search).toMatchObject({ disabled: '1', enableSched: '0' });
        expect(search.cron_schedule).toMatch(/^([0-9*/,-]+ ){4}[0-9*/,-]+$/);
    });

    test('reads the input\'s events through a defined macro and sourcetype', () => {
        expect(search.search).toContain('`mitre_attck_matrix_index`');
        expect(macros.mitre_attck_matrix_index.definition).toMatch(/^index=/);
        expect(search.search).toContain('sourcetype="' + SOURCETYPE + '"');
    });

    test('extracts every event field explicitly, because automatic extraction is capped', () => {
        EVENT_KEYS.forEach(key => expect(search.search).toContain('path=' + key + ' output=' + key));
        expect(search.search).not.toMatch(/spath input=_raw(\s*\||\s*$)/);
    });

    test('keeps the collection when no events are found', () => {
        // outputlookup without append would empty the collection once events age out of the search window.
        expect(search.search).toMatch(/outputlookup append=true mitre_matrix\s*$/);
    });

    test('the visualization stanza still declares no schedule', () => {
        expect(searches.default.enableSched).toBeUndefined();
    });
});

describe('import settings', () => {
    const defaults = parseConf(read('default/mitre_attck_import.conf'));
    const spec = read('README/mitre_attck_import.conf.spec');

    test('every default setting is documented in the spec', () => {
        Object.keys(defaults.import).forEach(key => expect(spec).toMatch(new RegExp('^' + key + ' = ', 'm')));
        expect(spec).toContain('[source:<matrix>]');
    });

    test('verification is on and the limits are sane', () => {
        expect(defaults.import.verify_tls).toBe('true');
        expect(Number(defaults.import.max_bytes)).toBeGreaterThan(60 * 1024 * 1024);
        expect(Number(defaults.import.min_count_ratio)).toBeGreaterThan(0.5);
    });

    test('imports the three ATT&CK matrices only (D3FEND stays bundled)', () => {
        expect(defaults.import.matrices).toBe('enterprise,ics,mobile');
    });
});
