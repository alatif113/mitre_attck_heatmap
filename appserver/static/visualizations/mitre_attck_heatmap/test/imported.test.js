/*
 * Imported ATT&CK data (feature 1): choosing between the bundled matrix and the
 * one the scripted input stores in the KV Store, and falling back safely.
 * Nothing here talks to Splunk; the fetch is stubbed.
 */
const $ = require('jquery');
const logic = require('heatmapLogic');
const Viz = require('../build/visualization_source.js');
const { buildConfig, createViz, loadFixture } = require('./support/render');
const { validateLayer } = require('./support/navigatorLayer');

const flush = () => new Promise(resolve => setTimeout(resolve, 0));

const tiny = (version, names) => ({
    tactics: [
        { id: 'TA1', name: (names || ['Alpha', 'Beta'])[0], short_name: 'alpha', sort_order: 0 },
        { id: 'TA2', name: (names || ['Alpha', 'Beta'])[1], short_name: 'beta', sort_order: 1 }
    ],
    techniques: [
        { id: 'T1059', name: 'Scripting', tactics: ['alpha'], url: 'https://x.test/T1059' },
        { id: 'T1566', name: 'Phishing', tactics: ['beta'], url: 'https://x.test/T1566' }
    ],
    sub_techniques: [{ id: 'T1059.001', short_id: '.001', name: 'PowerShell', technique: 'T1059', url: 'https://x.test/T1059/001' }],
    version: version,
    schema: 1
});
const record = (version, matrix, name) => ({ _key: (name || 'enterprise') + '-' + version, matrix: name || 'enterprise', version: version, data_json: JSON.stringify(matrix || tiny(version)) });

beforeAll(() => {
    $.fx.off = true;
});

beforeEach(() => {
    createViz(Viz)._clearMatrixCache();
});

afterEach(() => {
    document.body.innerHTML = '';
});

describe('kvStoreUrl', () => {
    const query = '?query=%7B%22matrix%22%3A%22enterprise%22%7D';
    const base = '/servicesNS/nobody/mitre_attck_heatmap/storage/collections/data/mitre_matrix';

    test.each([
        ['/en-US/app/search/dashboard', '/en-US'],
        ['/en-US/app/mitre_attck_heatmap/mitre_heatmap_testbench', '/en-US'],
        ['/splunk/de-DE/app/search/search', '/splunk/de-DE'],
        ['/deep/root/zh-CN/manager/launcher/apps', '/deep/root/zh-CN'],
        ['/pt-BR/dashboards/abc123', '/pt-BR'],
        ['/fr/app/search', '/fr'],
        ['/', '/en-US'],
        ['', '/en-US'],
        [undefined, '/en-US'],
        ['/something/else', '/en-US']
    ])('page %p goes through %p', (pathname, prefix) => {
        expect(logic.kvStoreUrl(pathname, 'enterprise')).toBe(prefix + '/splunkd/__raw' + base + query);
    });

    test('the matrix name is encoded into the query', () => {
        expect(logic.kvStoreUrl('/en-US/app/x', 'a"b')).toContain(encodeURIComponent('{"matrix":"a\\"b"}'));
    });
});

describe('versions and records', () => {
    test.each([
        ['20.0', '19.1', 1], ['19.1', '20.0', -1], ['20.0', '20.0', 0], ['20', '20.0', 0],
        ['20.10', '20.9', 1], ['9.2', '10.0', -1], ['x', '1', -1], ['', '0', 0]
    ])('compare %p with %p -> %p', (a, b, expected) => expect(logic.compareVersions(a, b)).toBe(expected));

    const records = [record('18.1'), record('20.0'), record('19.1'), record('19.0'), record('20.0', tiny('20.0'), 'ics')];

    test('the highest version of the right matrix is used', () => {
        expect(logic.pickMatrixRecord(records, 'enterprise', '').version).toBe('20.0');
        expect(logic.pickMatrixRecord(records, 'ics', '').matrix).toBe('ics');
        expect(logic.pickMatrixRecord(records, 'mobile', '')).toBeNull();
    });

    test('a pin selects that version, or the newest within a major version', () => {
        expect(logic.pickMatrixRecord(records, 'enterprise', '19.0').version).toBe('19.0');
        expect(logic.pickMatrixRecord(records, 'enterprise', '19').version).toBe('19.1');
        expect(logic.pickMatrixRecord(records, 'enterprise', ' 18 ').version).toBe('18.1');
        expect(logic.pickMatrixRecord(records, 'enterprise', '17')).toBeNull();
        expect(logic.pickMatrixRecord(records, 'enterprise', '19.5')).toBeNull();
        expect(logic.pickMatrixRecord(records, 'enterprise', '1')).toBeNull();
    });

    test('unusable record lists give null', () => {
        [undefined, null, 'x', {}, [], [null], [{ matrix: 'enterprise' }], [{ matrix: 'enterprise', version: '1', data_json: 5 }]].forEach(list => {
            expect(logic.pickMatrixRecord(list, 'enterprise', '')).toBeNull();
        });
    });
});

describe('parseMatrixRecord', () => {
    test('accepts a well-formed matrix and fills in the version from the record', () => {
        const matrix = tiny('');
        delete matrix.version;
        const parsed = logic.parseMatrixRecord(record('20.0', matrix));
        expect(parsed.version).toBe('20.0');
        expect(parsed.tactics).toHaveLength(2);
    });

    test.each([
        ['not JSON', { data_json: '{oops' }],
        ['null', { data_json: 'null' }],
        ['a list', { data_json: '[]' }],
        ['no tactics', { data_json: JSON.stringify(Object.assign(tiny('1'), { tactics: [] })) }],
        ['no techniques', { data_json: JSON.stringify(Object.assign(tiny('1'), { techniques: [] })) }],
        ['a tactic without a short name', { data_json: JSON.stringify(Object.assign(tiny('1'), { tactics: [{ id: 'TA1', name: 'A' }] })) }],
        ['a technique without tactics', { data_json: JSON.stringify(Object.assign(tiny('1'), { techniques: [{ id: 'T1', name: 'x' }] })) }],
        ['a sub-technique with a list parent', { data_json: JSON.stringify(Object.assign(tiny('1'), { sub_techniques: [{ id: 'T1.001', name: 'x', technique: ['T1'] }] })) }],
        ['sub_techniques missing', { data_json: JSON.stringify({ tactics: tiny('1').tactics, techniques: tiny('1').techniques }) }]
    ])('rejects %s', (label, partial) => {
        expect(logic.parseMatrixRecord(partial)).toBeNull();
    });
});

describe('fallbackNotice', () => {
    test('says what happened', () => {
        expect(logic.fallbackNotice('')).toBe('Imported ATT&CK data is not available; showing the bundled data.');
        expect(logic.fallbackNotice(' 19 ')).toBe('ATT&CK version 19 has not been imported; showing the bundled data.');
    });
});

describe('options', () => {
    const parse = options => logic.parseConfig(
        Object.keys(options).reduce((c, k) => { c['ns.' + k] = options[k]; return c; }, {}), 'ns.',
        require('api/SplunkVisualizationUtils'), [{ name: 'id' }, { name: 'count' }]);

    test('the bundled data is the default', () => {
        expect(parse({})).toMatchObject({ matrixSource: 'bundled', attackVersion: '' });
        expect(parse({ matrixSource: 'nonsense' }).matrixSource).toBe('bundled');
        expect(parse({ matrixSource: 'splunk', attackVersion: ' 19.1 ' })).toMatchObject({ matrixSource: 'splunk', attackVersion: '19.1' });
    });
});

describe('rendering', () => {
    const data = loadFixture('single-row.json');
    const names = viz => Array.from(viz.el.querySelectorAll('.mtr-tactic-col')).map(c => c.getAttribute('data-name'));

    // Renders with a stubbed fetch and waits for the result.
    const draw = async (records, options, data0) => {
        const viz = createViz(Viz);
        viz._fetchRecords = jest.fn(() => (records instanceof Error ? Promise.reject(records) : Promise.resolve(records)));
        const config = buildConfig(Object.assign({ matrixSource: 'splunk' }, options));
        viz.updateView(viz.formatData(data0 || data, config), config);
        await flush();
        return viz;
    };

    test('by default nothing is fetched and the render is immediate', () => {
        const viz = createViz(Viz);
        viz._fetchRecords = jest.fn();
        const config = buildConfig();
        viz.updateView(viz.formatData(data, config), config);
        expect(viz._fetchRecords).not.toHaveBeenCalled();
        expect(names(viz)).toContain('Reconnaissance');
    });

    test('imported data replaces the bundled matrix', async () => {
        const viz = await draw([record('19.0'), record('20.0', tiny('20.0', ['Alpha', 'Beta']))]);
        expect(names(viz)).toEqual(['Alpha', 'Beta']);
        expect(viz.el.querySelector('.mtr-notice')).toBeNull();
    });

    test('the request asks for the right matrix through Splunk Web', async () => {
        const viz = await draw([record('20.0')], { matrix: 'ics::' });
        expect(viz._fetchRecords).toHaveBeenCalledTimes(1);
        expect(viz._fetchRecords.mock.calls[0][0]).toBe(logic.kvStoreUrl(window.location.pathname, 'ics'));
        expect(viz._fetchRecords.mock.calls[0][0]).toContain('/splunkd/__raw/servicesNS/nobody/mitre_attck_heatmap/storage/collections/data/mitre_matrix');
    });

    test('data is placed into the imported matrix like any other', async () => {
        const viz = await draw([record('20.0')], {}, { fields: [{ name: 'id' }, { name: 'count' }], rows: [['T1059.001', '17'], ['T1566', '40'], ['T9999', '1']] });
        expect(viz.el.querySelector('.mtr-sub-technique[data-id="T1059.001"]').getAttribute('data-value')).toBe('17');
        expect(viz.el.querySelector('.mtr-technique[data-id="T1566"]').getAttribute('data-value')).toBe('40');
    });

    test('a pinned version is used', async () => {
        const records = [record('19.0', tiny('19.0', ['Old A', 'Old B'])), record('20.0', tiny('20.0', ['New A', 'New B']))];
        expect(names(await draw(records, { attackVersion: '19' }))).toEqual(['Old A', 'Old B']);
        expect(names(await draw(records, { attackVersion: '20.0' }))).toEqual(['New A', 'New B']);
    });

    test('a version that was not imported falls back to the bundled data with a notice', async () => {
        const viz = await draw([record('20.0')], { attackVersion: '17' });
        expect(names(viz)).toContain('Reconnaissance');
        expect(viz.el.querySelector('.mtr-notice').textContent).toBe('ATT&CK version 17 has not been imported; showing the bundled data.');
    });

    test.each([
        ['nothing imported yet', []],
        ['the collection is not readable', new Error('403')],
        ['a record with broken data', [{ matrix: 'enterprise', version: '20.0', data_json: '{broken' }]],
        ['a record with the wrong shape', [record('20.0', { tactics: [], techniques: [], sub_techniques: [] })]]
    ])('falls back to the bundled data with a notice when %s', async (label, records) => {
        const viz = await draw(records);
        expect(names(viz)).toContain('Reconnaissance');
        expect(viz.el.querySelector('.mtr-notice').textContent).toBe('Imported ATT&CK data is not available; showing the bundled data.');
    });

    test('D3FEND is never imported', async () => {
        const viz = await draw([record('20.0')], { matrix: 'd3fend::' });
        expect(viz._fetchRecords).not.toHaveBeenCalled();
        expect(viz.el.querySelector('.mtr-notice')).toBeNull();
        expect(viz.el.querySelectorAll('.mtr-tactic-col').length).toBeGreaterThan(10);
    });

    test('panels on one page share a single request, and a failure is retried', async () => {
        const first = await draw([record('20.0')]);
        const second = createViz(Viz);
        second._fetchRecords = jest.fn(() => Promise.resolve([record('20.0')]));
        const config = buildConfig({ matrixSource: 'splunk' });
        second.updateView(second.formatData(data, config), config);
        await flush();
        expect(first._fetchRecords).toHaveBeenCalledTimes(1);
        expect(second._fetchRecords).not.toHaveBeenCalled();
        expect(names(second)).toEqual(['Alpha', 'Beta']);

        first._clearMatrixCache();
        const failing = await draw(new Error('down'));
        expect(failing._fetchRecords).toHaveBeenCalledTimes(1);
        const retry = await draw([record('20.0')]);
        expect(retry._fetchRecords).toHaveBeenCalledTimes(1);
        expect(names(retry)).toEqual(['Alpha', 'Beta']);
    });

    test('a slow earlier request cannot overwrite a newer render', async () => {
        const viz = createViz(Viz);
        let releaseOld;
        viz._fetchRecords = jest.fn(url => new Promise(resolve => { releaseOld = () => resolve([record('19.0', tiny('19.0', ['Old A', 'Old B']))]); }));
        const oldConfig = buildConfig({ matrixSource: 'splunk', attackVersion: '19' });
        viz.updateView(viz.formatData(data, oldConfig), oldConfig);

        viz._fetchRecords = jest.fn(() => Promise.resolve([record('20.0', tiny('20.0', ['New A', 'New B']))]));
        const newConfig = buildConfig({ matrixSource: 'splunk', attackVersion: '20' });
        viz.updateView(viz.formatData(data, newConfig), newConfig);
        await flush();
        expect(names(viz)).toEqual(['New A', 'New B']);

        releaseOld();
        await flush();
        expect(names(viz)).toEqual(['New A', 'New B']);
    });

    test('switching back to the bundled data cancels a pending request', async () => {
        const viz = createViz(Viz);
        let release;
        viz._fetchRecords = jest.fn(() => new Promise(resolve => { release = () => resolve([record('20.0')]); }));
        const imported = buildConfig({ matrixSource: 'splunk' });
        viz.updateView(viz.formatData(data, imported), imported);
        const bundled = buildConfig();
        viz.updateView(viz.formatData(data, bundled), bundled);
        expect(names(viz)).toContain('Reconnaissance');
        release();
        await flush();
        expect(names(viz)).toContain('Reconnaissance');
    });

    test('the export uses the imported matrix\'s version and domain', async () => {
        const viz = await draw([record('20.1')], { showExportButton: 'yes' });
        viz._download = jest.fn();
        $(viz.el.querySelector('.mtr-export-button')).trigger('click');
        const layer = JSON.parse(viz._download.mock.calls[0][1]);
        expect(layer.versions.attack).toBe('20');
        expect(layer.domain).toBe('enterprise-attack');
        expect(validateLayer(layer)).toEqual([]);
    });
});
