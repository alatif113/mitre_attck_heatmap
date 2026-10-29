/*
 * ATT&CK Navigator export (feature 6): the pure layer-building functions, and
 * the button in the rendered visualization. Every exported layer is checked
 * against the layer format 4.5 rules in support/navigatorLayer.js.
 */
const $ = require('jquery');
const logic = require('heatmapLogic');
const Viz = require('../build/visualization_source.js');
const { render, loadFixture } = require('./support/render');
const { validateLayer } = require('./support/navigatorLayer');

beforeAll(() => {
    $.fx.off = true;
});

afterEach(() => {
    document.body.innerHTML = '';
});

describe('helpers', () => {
    test.each([['enterprise', 'enterprise-attack'], ['mobile', 'mobile-attack'], ['ics', 'ics-attack'], ['d3fend', null], ['x', null], ['constructor', null]])(
        'domain of %p is %p', (matrix, domain) => expect(logic.navigatorDomain(matrix)).toBe(domain));

    test.each([['20.1', '20'], ['18', '18'], [' 7.0 ', '7'], ['', ''], [undefined, ''], ['v20', '']])('major of %p is %p', (version, major) => {
        expect(logic.attackMajor(version)).toBe(major);
    });

    test('hex colors are expanded to six digits', () => {
        expect(logic.normalizeHex('#abc')).toBe('#aabbcc');
        expect(logic.normalizeHex(' #53a051 ')).toBe('#53a051');
    });

    test('unescapes what the results escaping produces', () => {
        expect(logic.unescapeHtml('a &amp; b &lt;c&gt; &quot;d&quot; &#x27;e&#39; &#96;')).toBe('a & b <c> "d" \'e\' `');
        expect(logic.unescapeHtml(undefined)).toBe('');
        expect(logic.unescapeHtml('&bogus; &#xZZ;')).toBe('&bogus; &#xZZ;');
    });

    test('file names are slugged', () => {
        expect(logic.navigatorFileName('Detection coverage / Q4')).toBe('Detection-coverage-Q4.json');
        expect(logic.navigatorFileName('  ')).toBe('mitre-attack-heatmap.json');
        expect(logic.navigatorFileName('../../etc')).toBe('..-..-etc.json');
    });
});

describe('navigatorTechniques', () => {
    const entry = (id, count, extra) => Object.assign({ id, count: String(count), description: '', status: '' }, extra);
    const entries = (...list) => new Map(list.map(e => [e.id, e]));
    const shown = ids => id => ids.includes(id);
    const colorOf = status => (status == 'gap' ? '#d93f3c' : '#abc');

    test('exports scores and descriptions, sorted, for ids that have a cell', () => {
        const list = logic.navigatorTechniques(
            entries(entry('T1566', 40, { description: 'a &amp; b' }), entry('T1059', 7), entry('T9999', 5)),
            shown(['T1566', 'T1059']), new Map(), colorOf);
        expect(list).toEqual([
            { techniqueID: 'T1059', score: 7, enabled: true },
            { techniqueID: 'T1566', score: 40, comment: 'a & b', enabled: true }
        ]);
    });

    test('rows with no number and no status are left out; a status-only row is kept with its color', () => {
        const list = logic.navigatorTechniques(
            entries(entry('T1059', 'n/a'), entry('T1003', '', { status: 'gap' }), entry('T1566', '', { status: 'other' })),
            shown(['T1059', 'T1003', 'T1566']), new Map(), colorOf);
        expect(list).toEqual([
            { techniqueID: 'T1003', color: '#d93f3c', enabled: true },
            { techniqueID: 'T1566', color: '#aabbcc', enabled: true }
        ]);
    });

    test('a parent with scored sub-techniques is expanded, and added when it has no entry', () => {
        const parents = new Map([['T1059.001', 'T1059'], ['T1059.003', 'T1059'], ['T1003.001', 'T1003']]);
        const list = logic.navigatorTechniques(
            entries(entry('T1059', 25, { rolledFrom: 2, description: 'x' }), entry('T1059.001', 17), entry('T1003.001', 5)),
            shown(['T1059', 'T1059.001', 'T1003', 'T1003.001']), parents, colorOf);
        expect(list.map(t => [t.techniqueID, t.showSubtechniques === true])).toEqual([
            ['T1003', true], ['T1003.001', false], ['T1059', true], ['T1059.001', false]
        ]);
        expect(list.find(t => t.techniqueID == 'T1059').comment).toBe('x (rolled up from 2 sub-techniques)');
        expect(list.find(t => t.techniqueID == 'T1003')).toEqual({ techniqueID: 'T1003', enabled: true, showSubtechniques: true });
    });

    test('comments are capped', () => {
        const list = logic.navigatorTechniques(entries(entry('T1059', 1, { description: 'x'.repeat(5000) })), shown(['T1059']), new Map(), colorOf);
        expect(list[0].comment).toHaveLength(2000);
    });
});

describe('buildNavigatorLayer', () => {
    const base = { name: 'Coverage', domain: 'enterprise-attack', attackVersion: '20', platforms: ['Windows'], techniques: [{ techniqueID: 'T1059', score: 5 }] };

    test('builds a valid layer with a gradient', () => {
        const layer = logic.buildNavigatorLayer(Object.assign({}, base, { gradient: { colors: ['#abc', '#808080', '#ffffff'], minValue: 0, maxValue: 100 } }));
        expect(layer).toEqual({
            name: 'Coverage',
            versions: { attack: '20', navigator: '4.9.0', layer: '4.5' },
            domain: 'enterprise-attack',
            filters: { platforms: ['Windows'] },
            techniques: [{ techniqueID: 'T1059', score: 5 }],
            gradient: { colors: ['#aabbcc', '#808080', '#ffffff'], minValue: 0, maxValue: 100 }
        });
        expect(validateLayer(layer)).toEqual([]);
    });

    test('leaves out the attack version, filters, gradient and legend when there are none', () => {
        const layer = logic.buildNavigatorLayer({ name: 'x', domain: 'ics-attack', attackVersion: '', platforms: [], techniques: [], gradient: null, legendItems: [] });
        expect(layer).toEqual({ name: 'x', versions: { navigator: '4.9.0', layer: '4.5' }, domain: 'ics-attack', techniques: [] });
        expect(validateLayer(layer)).toEqual([]);
    });

    test('equal gradient bounds are widened because the layer needs min < max', () => {
        const layer = logic.buildNavigatorLayer(Object.assign({}, base, { gradient: { colors: ['#000', '#fff'], minValue: 5, maxValue: 5 } }));
        expect(layer.gradient).toMatchObject({ minValue: 5, maxValue: 6 });
        expect(validateLayer(layer)).toEqual([]);
    });

    test('status legends become legendItems', () => {
        const layer = logic.buildNavigatorLayer(Object.assign({}, base, { legendItems: [{ label: 'gap', color: '#d93f3c' }] }));
        expect(layer.legendItems).toEqual([{ label: 'gap', color: '#d93f3c' }]);
        expect(validateLayer(layer)).toEqual([]);
    });

    test('the validator itself rejects bad layers', () => {
        expect(validateLayer({ name: '', domain: 'x', versions: { navigator: '4.8.0', layer: '4.4' }, techniques: [{ techniqueID: 'bad' }] }).length).toBeGreaterThanOrEqual(5);
    });
});

describe('the export button', () => {
    const fields = ['id', 'Detection Count', 'description', 'state'].map(name => ({ name }));
    const data = {
        fields,
        rows: [
            ['T1059', '42', 'Scripting & more', 'covered'],
            ['T1059.001', '17', 'PowerShell', 'gap'],
            ['T1566', '100', '', 'partial'],
            ['T9999', '5', 'not in the matrix', 'gap']
        ]
    };
    const button = viz => viz.el.querySelector('.mtr-export-button');

    // Renders with the button on, clicks it, and returns what would be downloaded.
    const exported = (rows, options, matrixData) => {
        const viz = render(Viz, rows || data, Object.assign({ showExportButton: 'yes' }, options));
        viz._download = jest.fn();
        $(button(viz)).trigger('click');
        expect(viz._download).toHaveBeenCalledTimes(1);
        const [filename, text] = viz._download.mock.calls[0];
        return { filename, layer: JSON.parse(text), text };
    };

    test('is not shown by default, and the markup is then unchanged', () => {
        const viz = render(Viz, data);
        expect(button(viz)).toBeNull();
        expect(viz.el.querySelector('.mtr-toolbar')).toBeNull();
    });

    test('is shown when enabled, even with the search bar hidden', () => {
        expect(button(render(Viz, data, { showExportButton: 'yes' })).textContent).toBe('Export to ATT&CK Navigator');
        expect(button(render(Viz, data, { showExportButton: 'yes', showSearchBar: 'no' }))).not.toBeNull();
    });

    test('is not shown for D3FEND, which Navigator does not know', () => {
        expect(button(render(Viz, data, { showExportButton: 'yes', matrix: 'd3fend::' }))).toBeNull();
    });

    test('downloads a valid layer named after the legend title', () => {
        const { filename, layer, text } = exported(loadFixture('typical.json'));
        expect(validateLayer(layer)).toEqual([]);
        expect(filename).toBe('Detection-Count.json');
        expect(layer).toMatchObject({ name: 'Detection Count', domain: 'enterprise-attack' });
        expect(text).toContain('\n  "versions"');
    });

    test('exports scores, descriptions and the gradient with the effective bounds', () => {
        const { layer } = exported(data, { scaleMode: 'auto', startColor: '#000', midColor: '#808080', endColor: '#fff' });
        expect(layer.gradient).toEqual({ colors: ['#000000', '#808080', '#ffffff'], minValue: 0, maxValue: 100 });
        const t1059 = layer.techniques.find(t => t.techniqueID == 'T1059');
        expect(t1059).toMatchObject({ score: 42, comment: 'Scripting & more', showSubtechniques: true });
        expect(layer.techniques.find(t => t.techniqueID == 'T1059.001').score).toBe(17);
        expect(layer.techniques.map(t => t.techniqueID)).not.toContain('T9999');
    });

    test('uses the layer name, attack version and platform selection from the options', () => {
        const { filename, layer } = exported(data, { navigatorLayerName: 'Q4 review', navigatorAttackVersion: '19', matrix: 'enterprise::Windows,Linux' });
        expect(filename).toBe('Q4-review.json');
        expect(layer).toMatchObject({ name: 'Q4 review', versions: { attack: '19', navigator: '4.9.0', layer: '4.5' }, filters: { platforms: ['Windows', 'Linux'] } });
    });

    test('exports other matrices under their own domain', () => {
        expect(exported(data, { matrix: 'ics::' }).layer.domain).toBe('ics-attack');
        expect(exported(data, { matrix: 'mobile::' }).layer.domain).toBe('mobile-attack');
    });

    test('in status mode techniques carry the status color and the legend is exported', () => {
        const { layer } = exported(data, { statusField: 'state', statusColors: 'gap=#d93f3c,covered=#53a051,partial=#f1813f' });
        expect(validateLayer(layer)).toEqual([]);
        expect(layer.gradient).toBeUndefined();
        expect(layer.techniques.find(t => t.techniqueID == 'T1059')).toMatchObject({ color: '#53a051', score: 42 });
        expect(layer.legendItems).toEqual([
            { label: 'gap', color: '#d93f3c' }, { label: 'covered', color: '#53a051' }, { label: 'partial', color: '#f1813f' }
        ]);
    });

    test('rolled-up parents are exported with the aggregate and a note', () => {
        const rows = { fields, rows: [['T1059.001', '17', '', ''], ['T1059.003', '8', '', '']] };
        const { layer } = exported(rows, { rollup: 'sum' });
        expect(validateLayer(layer)).toEqual([]);
        expect(layer.techniques.find(t => t.techniqueID == 'T1059')).toMatchObject({
            score: 25, comment: '(rolled up from 2 sub-techniques)', showSubtechniques: true
        });
    });

    test('exports every technique of a large result as a valid layer', () => {
        const { layer } = exported(loadFixture('large.js'));
        expect(validateLayer(layer)).toEqual([]);
        expect(layer.techniques.length).toBeGreaterThan(600);
    });

    test('the download is a JSON file saved through the browser, with no network request', () => {
        const create = jest.fn(() => 'blob:test');
        const revoke = jest.fn();
        URL.createObjectURL = create;
        URL.revokeObjectURL = revoke;
        const click = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function() {
            expect(this.download).toBe('Detection-Count.json');
            expect(this.href).toBe('blob:test');
        });
        const viz = render(Viz, data, { showExportButton: 'yes' });
        $(button(viz)).trigger('click');
        expect(create).toHaveBeenCalledTimes(1);
        expect(create.mock.calls[0][0].type).toBe('application/json');
        expect(click).toHaveBeenCalledTimes(1);
        expect(document.querySelector('a[download]')).toBeNull();
        click.mockRestore();
        delete URL.createObjectURL;
        delete URL.revokeObjectURL;
    });
});
