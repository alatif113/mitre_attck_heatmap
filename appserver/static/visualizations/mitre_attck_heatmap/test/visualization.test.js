/*
 * Render tests for build/visualization_source.js running in jsdom against
 * mocked Splunk APIs.
 *
 * The snapshots are characterization tests: they pin today's rendered markup
 * (including known defects listed in docs/audit.md) so refactors can prove
 * they change nothing. If a change is meant to alter output, update the
 * snapshot deliberately with `npm test -- -u` and review the diff.
 */
const $ = require('jquery');
const SplunkVisualizationBase = require('api/SplunkVisualizationBase');
const vizUtils = require('api/SplunkVisualizationUtils');
const Viz = require('../build/visualization_source.js');
const { NAMESPACE, buildConfig, createViz, render, summarize, loadFixture } = require('./support/render');
const { scenarios } = require('./support/scenarios');

beforeAll(() => {
    // Tooltip meters use jQuery animations; complete them synchronously.
    $.fx.off = true;
});

afterEach(() => {
    document.body.innerHTML = '';
    vizUtils.setTheme('light');
});

describe('render snapshots', () => {
    test.each(scenarios())('$fixture with $name', ({ fixture, options }) => {
        const viz = render(Viz, loadFixture(fixture), options);
        expect(summarize(viz)).toMatchSnapshot();
    });
});

describe('several instances on one page (audit P2-2)', () => {
    const states = viz => ({
        focused: viz.el.querySelectorAll('.focused').length,
        defocused: viz.el.querySelectorAll('.defocused').length,
        tooltips: viz.el.querySelectorAll('.mtr-technique-tooltip').length
    });

    test('focus changes in one visualization do not touch another', () => {
        const a = render(Viz, loadFixture('typical.json'));
        const b = render(Viz, loadFixture('typical.json'));
        a._setAnimationClass(0, 10);
        expect(states(a).defocused).toBeGreaterThan(0);
        expect(states(b)).toEqual({ focused: 0, defocused: 0, tooltips: 0 });
    });

    test('leaving the legend clears focus only in its own visualization', () => {
        const a = render(Viz, loadFixture('typical.json'));
        const b = render(Viz, loadFixture('typical.json'));
        a._setAnimationClass(0, 10);
        b._setAnimationClass(0, 10);
        $(a.el.querySelector('.mtr-legend')).trigger('mouseenter').trigger('mouseleave');
        expect(states(a)).toMatchObject({ focused: 0, defocused: 0 });
        expect(states(b).defocused).toBeGreaterThan(0);
    });

    test('closing a tooltip does not remove the tooltip of another visualization', () => {
        const a = render(Viz, loadFixture('typical.json'));
        const b = render(Viz, loadFixture('typical.json'));
        const cell = viz => viz.el.querySelector('.mtr-technique[data-id="T1059"]');
        $(cell(a)).trigger('mouseenter');
        $(cell(b)).trigger('mouseenter');
        $(cell(a)).trigger('mouseleave');
        expect(states(a).tooltips).toBe(0);
        expect(states(b).tooltips).toBe(1);
    });
});

describe('legend scale (audit P2-5)', () => {
    const labels = viz => Array.from(viz.el.querySelectorAll('.mtr-legend-val span')).map(s => s.textContent);

    test('labels run from the lower bound through the midpoint to the upper bound', () => {
        expect(labels(render(Viz, loadFixture('single-row.json'), { startVal: '50', endVal: '150' }))).toEqual(['50', '100', '150']);
    });

    test('default labels are 0, 50, 100', () => {
        expect(labels(render(Viz, loadFixture('single-row.json')))).toEqual(['0', '50', '100']);
    });
});

describe('hide null (audit P2-3)', () => {
    const data = {
        fields: [{ name: 'id' }, { name: 'count' }],
        rows: [['T1059.001', '17'], ['T1566', '40']]
    };

    test('keeps a technique without a value while it has sub-techniques with values', () => {
        const viz = render(Viz, data, { hideNull: 'yes' });
        const sub = viz.el.querySelector('.mtr-sub-technique[data-id="T1059.001"]');
        expect(sub).not.toBeNull();
        expect(sub.getAttribute('data-value')).toBe('17');
        expect(viz.el.querySelector('.mtr-technique[data-id="T1059"]')).not.toBeNull();
    });

    test('still removes techniques and sub-techniques that have nothing', () => {
        const viz = render(Viz, data, { hideNull: 'yes' });
        expect(viz.el.querySelector('.mtr-technique[data-id="T1003"]')).toBeNull();
        expect(viz.el.querySelector('.mtr-sub-technique[data-id="T1059.003"]')).toBeNull();
        expect(viz.el.querySelector('.mtr-technique[data-id="T1566"]')).not.toBeNull();
    });

    test('counts the kept technique as having no value in the tactic stats', () => {
        const viz = render(Viz, data, { hideNull: 'yes' });
        const execution = viz.el.querySelector('.mtr-tactic-col[data-name="Execution"]');
        expect(execution.querySelector('.mtr-count .mtr-stats-val').textContent).toBe('0 (0%)');
    });

    test('is unchanged when hide null is off', () => {
        const viz = render(Viz, data, { hideNull: 'no' });
        expect(viz.el.querySelector('.mtr-technique[data-id="T1003"]')).not.toBeNull();
    });
});

describe('render time (audit P2-9)', () => {
    test('rendering about 20,000 rows stays well under the old cost', () => {
        // Row application used to run a selector over the whole matrix per row
        // (about 50 s for this input in jsdom); with an id index it takes well under a second.
        const big = loadFixture('large.js');
        const rows = [];
        for (let i = 0; i < 25; i++) rows.push(...big.rows);
        const start = Date.now();
        const viz = render(Viz, { fields: big.fields, rows });
        expect(Date.now() - start).toBeLessThan(15000);
        expect(viz.el.querySelectorAll('[data-value]').length).toBeGreaterThan(600);
    }, 60000);
});

describe('globals', () => {
    test('rendering and interacting does not create global variables (audit P2-8)', () => {
        const before = new Set(Object.getOwnPropertyNames(window));
        const viz = render(Viz, loadFixture('typical.json'), { sortKey: 'data-value' });
        const cell = viz.el.querySelector('.mtr-technique[data-id="T1059"]');
        $(cell).trigger('mouseenter').trigger('click').trigger('mouseleave');
        $(viz.el.querySelector('.mtr-tactic-title')).trigger('click');
        const input = viz.el.querySelector('.mtr-search-input');
        input.value = 'phishing';
        $(input).trigger('change');
        render(Viz, loadFixture('typical.json'), { sortKey: 'data-name', sortOrder: 'desc' });
        // jsdom (like browsers) exposes elements with an id as window properties; those are not variables.
        const leaked = Object.getOwnPropertyNames(window).filter(name => !before.has(name) && !document.getElementById(name));
        expect(leaked).toEqual([]);
    });
});

describe('formatData', () => {
    test('returns false for an empty result set', () => {
        const viz = createViz(Viz);
        expect(viz.formatData(loadFixture('empty.json'))).toBe(false);
    });

    test('rejects results with fewer than 2 fields', () => {
        const viz = createViz(Viz);
        const data = { fields: [{ name: 'id' }], rows: [['T1059']] };
        expect(() => viz.formatData(data)).toThrow(SplunkVisualizationBase.VisualizationError);
    });

    test('passes valid data through unchanged', () => {
        const viz = createViz(Viz);
        const data = loadFixture('single-row.json');
        expect(viz.formatData(data)).toBe(data);
    });
});

describe('updateView', () => {
    test('empty results leave the previous render in place (audit P2-4)', () => {
        const viz = render(Viz, loadFixture('single-row.json'));
        const before = viz.el.innerHTML;
        viz.updateView(viz.formatData(loadFixture('empty.json')), buildConfig());
        expect(viz.el.innerHTML).toBe(before);
    });

    test('re-rendering replaces the previous output', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        viz.updateView(viz.formatData(loadFixture('single-row.json')), buildConfig());
        expect(viz.el.querySelectorAll('.mtr-viz-container').length).toBe(1);
        expect(viz.el.querySelectorAll('.mtr-technique[data-value]').length).toBe(1);
    });

    test('applies the current Splunk theme as the root class', () => {
        vizUtils.setTheme('dark');
        const viz = render(Viz, loadFixture('single-row.json'));
        expect(viz.el.className).toBe('dark');
    });

    test('colors cells along the configured gradient', () => {
        const viz = render(Viz, loadFixture('typical.json'), {
            startColor: '#000000', midColor: '#808080', endColor: '#ffffff', startVal: '0', endVal: '100'
        });
        const cell = id => viz.el.querySelector(`.mtr-technique[data-id="${id}"]`);
        expect(cell('T1566').style.background).toBe('rgb(255, 255, 255)');
        expect(cell('T1003').style.background).toBe('rgb(0, 0, 0)');
        expect(cell('T1003').style.color).toBe('rgb(255, 255, 255)');
        expect(cell('T1566').style.color).toBe('rgb(0, 0, 0)');
    });

    test('clones a multi-tactic technique into every tactic column', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        const columns = Array.from(viz.el.querySelectorAll('.mtr-technique[data-id="T1078"]'))
            .map(el => el.closest('.mtr-tactic-col').getAttribute('data-name'));
        expect(columns.sort()).toEqual(['Defense Evasion', 'Initial Access', 'Persistence', 'Privilege Escalation']);
    });

    test('platform filter drops techniques that are not on the platform', () => {
        const viz = render(Viz, loadFixture('typical.json'), { matrix: 'enterprise::Containers' });
        expect(viz.el.querySelector('.mtr-technique[data-id="T1566"]')).toBeNull();
        expect(viz.el.querySelector('.mtr-technique[data-id="T1078"]')).not.toBeNull();
    });

    test('escapes HTML in result values', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        expect(viz.el.querySelector('b')).toBeNull();
        expect(viz.el.querySelector('.mtr-technique[data-id="T1486"]').getAttribute('data-desc'))
            .toBe('&lt;b&gt;HTML&lt;/b&gt; &amp; &quot;quotes&quot; must be escaped');
    });

    test('legend title falls back to the value field name', () => {
        const viz = render(Viz, loadFixture('wide.json'), { legendTitle: '' });
        expect(viz.el.querySelector('.mtr-legend-title').textContent).toBe('Alert Count');
    });

    test('escapes the field name used as the legend title (audit P2-1)', () => {
        const data = { fields: [{ name: 'id' }, { name: '<img src=x onerror=alert(1)>' }], rows: [['T1059', '5']] };
        const viz = render(Viz, data, { legendTitle: '' });
        expect(viz.el.querySelector('.mtr-legend img')).toBeNull();
        expect(viz.el.querySelector('.mtr-legend-title').textContent).toBe('<img src=x onerror=alert(1)>');
    });

    test('markup in the legend bounds cannot reach the legend (audit P2-1)', () => {
        const viz = render(Viz, loadFixture('single-row.json'), { startVal: '<b>1</b>', endVal: '<i>2</i>' });
        expect(viz.el.querySelector('.mtr-legend b, .mtr-legend i')).toBeNull();
        // Not numbers, so the defaults are used.
        expect(Array.from(viz.el.querySelectorAll('.mtr-legend-val span')).map(s => s.textContent)).toEqual(['0', '50', '100']);
    });

    test('ignores columns beyond the third', () => {
        const viz = render(Viz, loadFixture('wide.json'));
        expect(viz.el.innerHTML).not.toContain('10.0.0.1');
        expect(viz.el.querySelector('.mtr-sub-technique[data-id="T1059.001"]').getAttribute('data-desc')).toBe('PowerShell');
    });

    test('renders null ids, values and descriptions without error (test bench "Null values" panel)', () => {
        const ids = ['T1059', 'T1566', 'T1003', 'T1078', 'T1110', 'T1486'];
        const data = {
            fields: [{ name: 'id' }, { name: 'Detection Count' }, { name: 'description' }],
            rows: [
                [ids[0], '10', 'ok'],
                [ids[1], null, null],
                [ids[2], '', 'blank value'],
                [ids[3], 'N/A', 'not a number'],
                [null, '50', 'null id'],
                [ids[4], '0', null],
                [ids[5], '99', 'ok']
            ]
        };
        const viz = render(Viz, data);
        const valued = Array.from(viz.el.querySelectorAll('.mtr-technique[data-value]')).map(el => el.getAttribute('data-id'));
        expect(new Set(valued)).toEqual(new Set(['T1059', 'T1110', 'T1486']));
    });

    test('renders the large fixture with every known id valued', () => {
        const data = loadFixture('large.js');
        const viz = render(Viz, data);
        const knownIds = new Set(data.rows.map(r => r[0]).filter(id => !/^T9\d{3}$/.test(id)));
        const valued = new Set(Array.from(viz.el.querySelectorAll('[data-value]'))
            .filter(el => !el.classList.contains('mtr-tactic-col'))
            .map(el => el.getAttribute('data-id')));
        expect(valued).toEqual(knownIds);
    });
});

describe('drilldown', () => {
    const clickOn = (viz, selector) => $(viz.el.querySelector(selector)).trigger('click');

    test('technique click sends technique and tactic tokens', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        clickOn(viz, '.mtr-tactic-col[data-name="Execution"] .mtr-technique[data-id="T1059"]');
        expect(viz.drilldowns).toEqual([{
            action: SplunkVisualizationBase.FIELD_VALUE_DRILLDOWN,
            data: {
                'mtr_sub-technique_id': undefined,
                'mtr_technique_id': 'T1059',
                'mtr_tactic_id': 'TA0002',
                'mtr_sub-technique_name': undefined,
                'mtr_technique_name': 'Command and Scripting Interpreter',
                'mtr_tactic_name': 'Execution',
                'mtr_sub-technique_value': undefined,
                'mtr_technique_value': '42',
                'mtr_tactic_value': viz.el.querySelector('.mtr-tactic-col[data-name="Execution"]').getAttribute('data-value')
            }
        }]);
    });

    test('sub-technique click also sends its parent technique', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        clickOn(viz, '.mtr-sub-technique[data-id="T1059.001"]');
        expect(viz.drilldowns).toHaveLength(1);
        expect(viz.drilldowns[0].data).toMatchObject({
            'mtr_sub-technique_id': 'T1059.001',
            'mtr_sub-technique_name': 'PowerShell',
            'mtr_sub-technique_value': '17',
            'mtr_technique_id': 'T1059',
            'mtr_technique_value': '42'
        });
    });

    test('tactic title click fires exactly one drilldown (audit P1-5)', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        $(viz.el.querySelectorAll('.mtr-tactic-title')[0]).trigger('click');
        expect(viz.drilldowns).toHaveLength(1);
    });

    test('tactic click supplies the tactic tokens and the legacy mtr_tactic name', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        $(viz.el.querySelectorAll('.mtr-tactic-title')[0]).trigger('click');
        expect(viz.drilldowns[0].data).toMatchObject({
            mtr_tactic: 'Reconnaissance',
            mtr_tactic_id: 'TA0043',
            mtr_tactic_name: 'Reconnaissance',
            mtr_technique_id: undefined,
            'mtr_sub-technique_id': undefined
        });
    });

    test('technique clicks do not add mtr_tactic', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        $(viz.el.querySelector('.mtr-technique[data-id="T1059"]')).trigger('click');
        expect(viz.drilldowns[0].data).not.toHaveProperty('mtr_tactic');
    });
});

describe('tooltip', () => {
    const hover = (viz, selector) => $(viz.el.querySelector(selector)).trigger('mouseenter');

    test('shows id, name, value and escaped description', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        hover(viz, '.mtr-technique[data-id="T1486"]');
        const tooltip = viz.el.querySelector('.mtr-technique-tooltip');
        expect(tooltip.querySelector('.mtr-id').textContent).toBe('T1486');
        expect(tooltip.querySelector('.mtr-name').textContent).toBe('Data Encrypted for Impact');
        expect(tooltip.querySelector('.mtr-val').textContent).toBe('77');
        expect(tooltip.querySelector('.mtr-label').textContent).toBe('Detection Count');
        expect(tooltip.querySelector('.mtr-desc').textContent).toBe('<b>HTML</b> & "quotes" must be escaped');
        expect(tooltip.querySelector('a').getAttribute('href')).toBe('https://attack.mitre.org/techniques/T1486');
    });

    test('the reference link opens in a new tab without access to this page (audit P3-7)', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        hover(viz, '.mtr-technique[data-id="T1486"]');
        const link = viz.el.querySelector('.mtr-technique-tooltip a');
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    test('truncates long descriptions behind "Show more"', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        hover(viz, '.mtr-technique[data-id="T1105"]');
        const tooltip = viz.el.querySelector('.mtr-technique-tooltip');
        expect(tooltip.querySelector('.more-link')).not.toBeNull();
        $(tooltip.querySelector('.more-link')).trigger('click');
        expect(tooltip.querySelector('.more-link').style.display).toBe('none');
    });

    test('shows a zero value, with its label (audit P2-6)', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        hover(viz, '.mtr-technique[data-id="T1003"]');
        const tooltip = viz.el.querySelector('.mtr-technique-tooltip');
        expect(tooltip.querySelector('.mtr-val').textContent).toBe('0');
        expect(tooltip.querySelector('.mtr-label').textContent).toBe('Detection Count');
    });

    test('shows decimals without truncating them (audit P2-6)', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        hover(viz, '.mtr-technique[data-id="T1110"]');
        expect(viz.el.querySelector('.mtr-technique-tooltip .mtr-val').textContent).toBe('12.5');
    });

    test('shows nothing for a technique without a value', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        hover(viz, '.mtr-technique[data-id="T1190"]');
        const tooltip = viz.el.querySelector('.mtr-technique-tooltip');
        expect(tooltip.querySelector('.mtr-val').textContent).toBe('');
        expect(tooltip.querySelector('.mtr-label').textContent).toBe('');
    });

    test('is removed on mouse leave', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        const cell = viz.el.querySelector('.mtr-technique[data-id="T1059"]');
        $(cell).trigger('mouseenter');
        $(cell).trigger('mouseleave');
        expect(viz.el.querySelector('.mtr-technique-tooltip')).toBeNull();
    });
});

describe('search bar', () => {
    const search = (viz, value) => {
        const input = viz.el.querySelector('.mtr-search-input');
        input.value = value;
        $(input).trigger('change');
    };

    test('focuses techniques matching an id or name, case-insensitively', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        search(viz, 'phishing');
        const focused = Array.from(viz.el.querySelectorAll('.mtr-technique.focused')).map(el => el.getAttribute('data-id'));
        // Phishing, Phishing for Information, Internal Spearphishing.
        expect(new Set(focused)).toEqual(new Set(['T1566', 'T1598', 'T1534']));
        expect(viz.el.querySelectorAll('.mtr-technique.defocused').length).toBeGreaterThan(100);
    });

    test('finds names containing characters that HTML escaping would change (audit P2-7)', () => {
        const viz = render(Viz, loadFixture('single-row.json'), { matrix: 'ics::' });
        search(viz, 'Point & Tag');
        const focused = Array.from(viz.el.querySelectorAll('.mtr-technique.focused')).map(el => el.getAttribute('data-name'));
        expect(focused).toEqual(['Point & Tag Identification']);
    });

    test('clearing the search removes focus classes', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        search(viz, 'T1059');
        search(viz, '');
        expect(viz.el.querySelectorAll('.focused, .defocused').length).toBe(0);
    });
});

describe('animation', () => {
    let frames;

    beforeEach(() => {
        frames = [];
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => frames.push(cb));
    });

    afterEach(() => {
        window.requestAnimationFrame.mockRestore();
    });

    test('sweeps focus from the lower bound upward each frame', () => {
        const viz = render(Viz, loadFixture('typical.json'), { animate: 'yes', duration: '1' });
        expect(frames).toHaveLength(1);
        frames.shift()();
        // First window covers [0, stepSize + 10% of the range].
        const focused = Array.from(viz.el.querySelectorAll('.mtr-technique.focused')).map(el => el.getAttribute('data-id'));
        expect(new Set(focused)).toEqual(new Set(['T1003']));
        expect(frames).toHaveLength(1);
    });

    test('re-rendering does not stack animation loops (audit P1-4)', () => {
        // Track which scheduled frames are still pending, honoring cancelAnimationFrame.
        const pending = new Map();
        let nextId = 1;
        window.requestAnimationFrame.mockImplementation(cb => { pending.set(nextId, cb); return nextId++; });
        jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => pending.delete(id));

        const viz = render(Viz, loadFixture('typical.json'), { animate: 'yes' });
        for (let i = 0; i < 3; i++) {
            viz.updateView(viz.formatData(loadFixture('typical.json')), buildConfig({ animate: 'yes' }));
        }
        expect(pending.size).toBe(1);

        // Each frame schedules exactly one successor, so the loop count stays at 1.
        for (let i = 0; i < 5; i++) {
            const callbacks = Array.from(pending.entries());
            pending.clear();
            callbacks.forEach(([, cb]) => cb());
            expect(pending.size).toBe(1);
        }
        window.cancelAnimationFrame.mockRestore();
    });

    test('stops scheduling frames once animate is cleared', () => {
        const viz = render(Viz, loadFixture('typical.json'), { animate: 'yes' });
        viz.animate = false;
        frames.shift()();
        expect(frames).toHaveLength(0);
        expect(viz.el.querySelectorAll('.focused, .defocused').length).toBe(0);
    });
});

test('requests row-major output', () => {
    expect(createViz(Viz).getInitialDataParams()).toEqual({ outputMode: SplunkVisualizationBase.ROW_MAJOR_OUTPUT_MODE });
});

test('mock namespace matches savedsearches.conf keys', () => {
    expect(Object.keys(buildConfig()).every(key => key.startsWith(NAMESPACE))).toBe(true);
});
