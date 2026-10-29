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

    test('ignores columns beyond the third', () => {
        const viz = render(Viz, loadFixture('wide.json'));
        expect(viz.el.innerHTML).not.toContain('10.0.0.1');
        expect(viz.el.querySelector('.mtr-sub-technique[data-id="T1059.001"]').getAttribute('data-desc')).toBe('PowerShell');
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

    test('tactic title click currently fires one drilldown per handler bound in the loop (audit P1-5)', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        const titles = viz.el.querySelectorAll('.mtr-tactic-title');
        $(titles[0]).trigger('click');
        // One handler per tactic column bound to the first title, plus the generic .mtr-tactic handler.
        expect(viz.drilldowns).toHaveLength(titles.length + 1);
        expect(viz.drilldowns[0].data).toEqual({ mtr_tactic: 'Reconnaissance' });
        expect(viz.drilldowns[titles.length].data.mtr_tactic_name).toBe('Reconnaissance');
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

    test('truncates long descriptions behind "Show more"', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        hover(viz, '.mtr-technique[data-id="T1105"]');
        const tooltip = viz.el.querySelector('.mtr-technique-tooltip');
        expect(tooltip.querySelector('.more-link')).not.toBeNull();
        $(tooltip.querySelector('.more-link')).trigger('click');
        expect(tooltip.querySelector('.more-link').style.display).toBe('none');
    });

    test('shows a zero value as blank (audit P2-6)', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        hover(viz, '.mtr-technique[data-id="T1003"]');
        expect(viz.el.querySelector('.mtr-technique-tooltip .mtr-val').textContent).toBe('');
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
