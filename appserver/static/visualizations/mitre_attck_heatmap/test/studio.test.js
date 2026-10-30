/*
 * Running inside Dashboard Studio (phase A). Studio hosts a classic custom
 * visualization in an iframe with sandbox="allow-scripts": no origin of its
 * own, no downloads, no new windows, and a replacement fetch() that goes
 * through the dashboard page. These tests cover what the visualization does
 * about that. The behavior of Studio itself was read from its shipped source;
 * see docs/ARCHITECTURE.md.
 */
const $ = require('jquery');
const logic = require('heatmapLogic');
const Viz = require('../build/visualization_source.js');
const { buildConfig, createViz, loadFixture, render } = require('./support/render');
const { validateLayer } = require('./support/navigatorLayer');

const flush = () => new Promise(resolve => setTimeout(resolve, 0));

beforeAll(() => {
    $.fx.off = true;
});

beforeEach(() => {
    createViz(Viz)._clearMatrixCache();
});

afterEach(() => {
    document.body.innerHTML = '';
    delete global.fetch;
    delete document.execCommand;
});

const tiny = version => ({
    tactics: [{ id: 'TA1', name: 'Alpha', short_name: 'alpha', sort_order: 0 }],
    techniques: [{ id: 'T1059', name: 'Scripting', tactics: ['alpha'], url: 'https://x.test/T1059' }],
    sub_techniques: [],
    version: version
});
const record = version => ({ matrix: 'enterprise', version: version, data_json: JSON.stringify(tiny(version)) });

describe('the KV Store address', () => {
    const tail = '/splunkd/__raw/servicesNS/nobody/mitre_attck_heatmap/storage/collections/data/mitre_matrix?query=%7B%22matrix%22%3A%22ics%22%7D';

    test('the first candidate path that looks like a Splunk Web page is used', () => {
        expect(logic.kvStoreUrl(['/srcdoc', '/de-DE/app/search/x'], 'ics')).toBe('/de-DE' + tail);
        expect(logic.kvStoreUrl(['/splunk/fr-FR/dashboards/abc', '/en-US/app/x'], 'ics')).toBe('/splunk/fr-FR' + tail);
        expect(logic.kvStoreUrl(['srcdoc', ''], 'ics')).toBe('/en-US' + tail);
        expect(logic.kvStoreUrl([], 'ics')).toBe('/en-US' + tail);
    });

    test('the viz tries the document base URL (the dashboard page in a Studio iframe) before its own path', () => {
        const viz = createViz(Viz);
        const spy = jest.spyOn(document, 'baseURI', 'get').mockReturnValue('https://splunk.example:8000/ja-JP/dashboards/abc123');
        try {
            expect(viz._matrixUrl('ics')).toBe('/ja-JP' + tail);
        } finally {
            spy.mockRestore();
        }
    });
});

describe('reading the imported matrix with fetch', () => {
    const draw = async () => {
        const viz = createViz(Viz);
        const config = buildConfig({ matrixSource: 'splunk' });
        viz.updateView(viz.formatData(loadFixture('single-row.json'), config), config);
        await flush();
        return viz;
    };

    test('asks for the matrix with the page\'s credentials and draws it', async () => {
        global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([record('20.0')]) }));
        const viz = await draw();
        expect(global.fetch).toHaveBeenCalledTimes(1);
        const [url, options] = global.fetch.mock.calls[0];
        expect(url).toContain('/splunkd/__raw/servicesNS/nobody/mitre_attck_heatmap/storage/collections/data/mitre_matrix');
        expect(options).toMatchObject({ credentials: 'same-origin' });
        expect(Array.from(viz.el.querySelectorAll('.mtr-tactic-col')).map(c => c.getAttribute('data-name'))).toEqual(['Alpha']);
    });

    test('an HTTP error falls back to the bundled data with the notice', async () => {
        global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 403, json: () => Promise.resolve({}) }));
        const viz = await draw();
        expect(viz.el.querySelector('.mtr-notice').textContent).toBe('Imported ATT&CK data is not available; showing the bundled data.');
        expect(viz.el.querySelectorAll('.mtr-tactic-col').length).toBeGreaterThan(10);
    });

    test('a network failure falls back too', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('offline')));
        const viz = await draw();
        expect(viz.el.querySelector('.mtr-notice')).not.toBeNull();
    });
});

describe('detecting the sandbox', () => {
    test('an ordinary page is not sandboxed', () => {
        expect(createViz(Viz)._isSandboxed()).toBe(false);
    });

    test('a document with no origin of its own is', () => {
        const original = Object.getOwnPropertyDescriptor(window, 'origin');
        Object.defineProperty(window, 'origin', { configurable: true, value: 'null' });
        try {
            expect(createViz(Viz)._isSandboxed()).toBe(true);
        } finally {
            if (original) Object.defineProperty(window, 'origin', original); else delete window.origin;
        }
    });
});

describe('inside a sandbox', () => {
    const sandboxed = (options, data) => {
        const viz = createViz(Viz);
        viz._isSandboxed = () => true;
        const config = buildConfig(options);
        viz.updateView(viz.formatData(data || loadFixture('typical.json'), config), config);
        return viz;
    };
    const dialog = viz => viz.el.querySelector('.mtr-export-dialog');

    test('a tooltip shows the technique address as text, because a new window cannot be opened', () => {
        const viz = sandboxed({});
        $(viz.el.querySelector('.mtr-technique[data-id="T1486"]')).trigger('mouseenter');
        const reference = viz.el.querySelector('.mtr-technique-tooltip .mtr-ref');
        expect(reference.querySelector('a')).toBeNull();
        expect(reference.textContent).toBe('https://attack.mitre.org/techniques/T1486');
    });

    test('outside a sandbox the tooltip keeps its link', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        $(viz.el.querySelector('.mtr-technique[data-id="T1486"]')).trigger('mouseenter');
        expect(viz.el.querySelector('.mtr-technique-tooltip .mtr-ref a').getAttribute('href')).toBe('https://attack.mitre.org/techniques/T1486');
    });

    test('the export shows the layer to copy instead of downloading it', () => {
        URL.createObjectURL = jest.fn();
        const viz = sandboxed({ showExportButton: 'yes' });
        $(viz.el.querySelector('.mtr-export-button')).trigger('click');
        expect(URL.createObjectURL).not.toHaveBeenCalled();
        delete URL.createObjectURL;

        expect(dialog(viz)).not.toBeNull();
        expect(dialog(viz).querySelector('.mtr-export-note').textContent).toContain('save it as Detection-Count.json');
        const layer = JSON.parse(dialog(viz).querySelector('.mtr-export-text').value);
        expect(validateLayer(layer)).toEqual([]);
        expect(layer.techniques.length).toBeGreaterThan(5);
    });

    test('Copy copies the text and says so; when copying is refused it says what to do', () => {
        const viz = sandboxed({ showExportButton: 'yes' });
        $(viz.el.querySelector('.mtr-export-button')).trigger('click');
        document.execCommand = jest.fn(() => true);
        $(dialog(viz).querySelector('.mtr-export-copy')).trigger('click');
        expect(document.execCommand).toHaveBeenCalledWith('copy');
        expect(dialog(viz).querySelector('.mtr-export-copy').textContent).toBe('Copied');

        document.execCommand = jest.fn(() => { throw new Error('blocked'); });
        $(dialog(viz).querySelector('.mtr-export-copy')).trigger('click');
        expect(dialog(viz).querySelector('.mtr-export-copy').textContent).toBe('Press Ctrl+C to copy');
    });

    test('Close removes the panel, and exporting again shows one panel, not two', () => {
        const viz = sandboxed({ showExportButton: 'yes' });
        const button = viz.el.querySelector('.mtr-export-button');
        $(button).trigger('click');
        $(button).trigger('click');
        expect(viz.el.querySelectorAll('.mtr-export-dialog').length).toBe(1);
        $(dialog(viz).querySelector('.mtr-export-close')).trigger('click');
        expect(dialog(viz)).toBeNull();
    });

    test('the text in the panel is not interpreted as markup', () => {
        const viz = sandboxed({ showExportButton: 'yes', navigatorLayerName: '<img src=x onerror=alert(1)>' });
        $(viz.el.querySelector('.mtr-export-button')).trigger('click');
        expect(dialog(viz).querySelector('img')).toBeNull();
        expect(dialog(viz).querySelector('.mtr-export-text').value).toContain('<img src=x onerror=alert(1)>');
    });
});

describe('CSS that must not depend on classic dashboards', () => {
    const css = require('fs').readFileSync(require('path').join(__dirname, '../visualization.css'), 'utf8');

    test('tooltip paragraphs are reset without needing the classic panel structure', () => {
        expect(css).toMatch(/\n\.mtr-technique-tooltip \.mtr-desc p \{/);
    });

    test('the copy panel uses the page\'s own colors, so it follows the dashboard theme', () => {
        const rule = css.match(/\.mtr-export-panel \{[^}]*\}/)[0];
        expect(rule).toContain('background: Canvas');
        expect(rule).toContain('color: CanvasText');
    });
});
