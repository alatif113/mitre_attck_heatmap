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
const { NAMESPACE, buildConfig, createViz, render, renderAnimated, summarize, loadFixture } = require('./support/render');
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
    const band = (viz, index) => viz.el.querySelector('.mtr-band[data-band="' + index + '"]');

    test('focus changes in one visualization do not touch another', () => {
        const a = render(Viz, loadFixture('typical.json'));
        const b = render(Viz, loadFixture('typical.json'));
        $(band(a, 0)).trigger('mouseenter');
        expect(states(a).defocused).toBeGreaterThan(0);
        expect(states(b)).toEqual({ focused: 0, defocused: 0, tooltips: 0 });
    });

    test('leaving a band clears focus only in its own visualization', () => {
        const a = render(Viz, loadFixture('typical.json'));
        const b = render(Viz, loadFixture('typical.json'));
        $(band(a, 0)).trigger('mouseenter');
        $(band(b, 0)).trigger('mouseenter');
        $(band(a, 0)).trigger('mouseleave');
        expect(states(a)).toMatchObject({ focused: 0, defocused: 0 });
        expect(states(b).defocused).toBeGreaterThan(0);
    });

    test('closing a tooltip does not remove the tooltip of another visualization', () => {
        jest.useFakeTimers();
        try {
            const a = render(Viz, loadFixture('typical.json'));
            const b = render(Viz, loadFixture('typical.json'));
            const cell = viz => viz.el.querySelector('.mtr-technique[data-id="T1059"]');
            $(cell(a)).trigger('mouseenter');
            $(cell(b)).trigger('mouseenter');
            $(cell(a)).trigger('mouseleave');
            jest.advanceTimersByTime(700);
            expect(states(a).tooltips).toBe(0);
            expect(states(b).tooltips).toBe(1);
        } finally {
            jest.useRealTimers();
        }
    });
});

describe('legend scale (audit P2-5)', () => {
    const edges = viz => Array.from(viz.el.querySelectorAll('.mtr-band-col:not(.mtr-band-col-nodata) > .mtr-band-edge:not(.mtr-band-edge-end)')).map(s => s.textContent)
        .concat(Array.from(viz.el.querySelectorAll('.mtr-band-edge-end')).map(s => s.textContent));

    test('five even bands run from the lower bound to the upper bound', () => {
        expect(edges(render(Viz, loadFixture('single-row.json'), { startVal: '50', endVal: '150' }))).toEqual(['50', '70', '90', '110', '130', '150']);
    });

    test('default edges are 0 to 100 in steps of 20', () => {
        expect(edges(render(Viz, loadFixture('single-row.json')))).toEqual(['0', '20', '40', '60', '80', '100']);
    });

    test('there is a band per color, and a separate entry for techniques with no data', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        expect(viz.el.querySelectorAll('.mtr-band:not(.mtr-nodata-swatch)').length).toBe(5);
        expect(viz.el.querySelectorAll('.mtr-nodata-swatch').length).toBe(1);
        expect(render(Viz, loadFixture('typical.json'), { colorBands: '9' }).el.querySelectorAll('.mtr-band:not(.mtr-nodata-swatch)').length).toBe(9);
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
        expect(execution.querySelector('.mtr-count .mtr-stats-val').textContent).toBe('0 of 1 (0%)');
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

describe('status-based coloring (feature 5)', () => {
    const fields = ['id', 'Detection Count', 'description', 'state'].map(name => ({ name }));
    const data = {
        fields,
        rows: [
            ['T1059', '42', 'covered here', 'Covered'],
            ['T1059.001', '5', 'sub', 'gap'],
            ['T1566', '10', '', 'partial'],
            ['T1003', '', 'status only', 'gap'],
            ['T1078', '7', 'value only', ''],
            ['T1110', '3', '', 'Mystery']
        ]
    };
    const options = { statusField: 'state', statusColors: 'gap=#d93f3c, covered=#53a051, partial=#f1813f', statusDefaultColor: '#808080' };
    const cell = (viz, id) => viz.el.querySelector('.mtr-technique[data-id="' + id + '"], .mtr-sub-technique[data-id="' + id + '"]');
    const color = (viz, id) => cell(viz, id).style.background;

    test('cells take the color of their status, ignoring case', () => {
        const viz = render(Viz, data, options);
        expect(color(viz, 'T1059')).toBe('rgb(83, 160, 81)');
        expect(color(viz, 'T1566')).toBe('rgb(241, 129, 63)');
        expect(color(viz, 'T1059.001')).toBe('rgb(217, 63, 60)');
        expect(cell(viz, 'T1059').getAttribute('data-status')).toBe('Covered');
        expect(cell(viz, 'T1059').style.color).toBe('rgb(14, 17, 20)');
    });

    test('unlisted statuses use the default color', () => {
        expect(color(render(Viz, data, options), 'T1110')).toBe('rgb(128, 128, 128)');
    });

    test('the number does not change the color', () => {
        const other = { fields, rows: [['T1059', '1', '', 'covered']] };
        expect(color(render(Viz, other, options), 'T1059')).toBe(color(render(Viz, data, options), 'T1059'));
    });

    test('a row with a status but no number is colored and has no value', () => {
        const viz = render(Viz, data, options);
        expect(color(viz, 'T1003')).toBe('rgb(217, 63, 60)');
        expect(cell(viz, 'T1003').hasAttribute('data-value')).toBe(false);
        expect(cell(viz, 'T1003').getAttribute('data-desc')).toBe('status only');
    });

    test('a number without a status is left uncolored but keeps its value', () => {
        const viz = render(Viz, data, options);
        expect(cell(viz, 'T1078').style.background).toBe('');
        expect(cell(viz, 'T1078').getAttribute('data-value')).toBe('7');
    });

    test('with no status field nothing changes: the status column is just ignored', () => {
        const viz = render(Viz, data, {});
        expect(viz.el.querySelectorAll('[data-status]').length).toBe(0);
        expect(viz.el.querySelector('.mtr-legend-status')).toBeNull();
        expect(viz.el.querySelectorAll('.mtr-legend-bands').length).toBe(1);
    });

    test('with a status field but no color list every status uses the default color', () => {
        const viz = render(Viz, data, { statusField: 'state', statusDefaultColor: '#808080' });
        expect([color(viz, 'T1059'), color(viz, 'T1566')]).toEqual(['rgb(128, 128, 128)', 'rgb(128, 128, 128)']);
    });

    describe('legend', () => {
        const items = viz => Array.from(viz.el.querySelectorAll('.mtr-status-item')).map(i => [
            i.querySelector('.mtr-status-label').textContent, i.querySelector('.mtr-status-count').textContent
        ]);

        test('replaces the gradient with one swatch per status, in list order, with counts', () => {
            const viz = render(Viz, data, options);
            expect(viz.el.querySelector('.mtr-legend-bands')).toBeNull();
            expect(items(viz)).toEqual([['gap', '2'], ['covered', '1'], ['partial', '1'], ['Mystery', '1']]);
            expect(viz.el.querySelector('.mtr-legend-title').textContent).toBe('state');
        });

        test('hovering a swatch dims the cells with another status', () => {
            const viz = render(Viz, data, options);
            const gap = viz.el.querySelector('.mtr-status-item[data-status-key="gap"]');
            $(gap).trigger('mouseenter');
            const dimmed = Array.from(viz.el.querySelectorAll('.mtr-technique.defocused')).map(c => c.getAttribute('data-id'));
            expect(dimmed).toContain('T1059');
            expect(dimmed).not.toContain('T1003');
            $(gap).trigger('mouseleave');
            expect(viz.el.querySelectorAll('.focused, .defocused').length).toBe(0);
        });

        test('status names are text, not markup', () => {
            const viz = render(Viz, { fields, rows: [['T1059', '1', '', '<img src=x onerror=alert(1)>']] }, options);
            expect(viz.el.querySelector('.mtr-legend img')).toBeNull();
            expect(viz.el.querySelector('.mtr-status-item:last-child .mtr-status-label').textContent).toBe('<img src=x onerror=alert(1)>');
        });
    });

    test('a tactic header shows a count and a bar segment per status', () => {
        const viz = render(Viz, data, options);
        const column = viz.el.querySelector('.mtr-tactic-col[data-name="Credential Access"]');
        const stats = Array.from(column.querySelectorAll('.mtr-stat')).map(s => [s.querySelector('.mtr-stats-label').textContent, s.querySelector('.mtr-stats-val').textContent]);
        expect(stats).toEqual([['gap', '1'], ['Mystery', '1']]);
        expect(column.querySelector('.mtr-meter-fill').style.width).toBe('100%');
    });

    test('the tooltip shows a status badge and no meter', () => {
        const viz = render(Viz, data, options);
        $(cell(viz, 'T1059')).trigger('mouseenter');
        const tooltip = viz.el.querySelector('.mtr-technique-tooltip');
        expect(tooltip.querySelector('.mtr-status-text').textContent).toBe('Covered');
        expect(tooltip.querySelector('.mtr-val').textContent).toBe('42');
        expect(tooltip.querySelector('.mtr-label').textContent).toBe('Detection Count');
        expect(tooltip.querySelector('.mtr-meter-container').style.display).toBe('none');
    });

    test('the drilldown adds status tokens', () => {
        const viz = render(Viz, data, options);
        $(cell(viz, 'T1059')).trigger('click');
        expect(viz.drilldowns[0].data).toMatchObject({ mtr_technique_status: 'Covered' });
        expect(viz.drilldowns[0].data).not.toHaveProperty('mtr_sub-technique_status');
        // A sub-technique is clicked in the technique's tooltip.
        $(viz.el.querySelector('.mtr-sub-row')).trigger('click');
        expect(viz.drilldowns[1].data).toMatchObject({ 'mtr_sub-technique_status': 'gap', mtr_technique_status: 'Covered' });
    });

    test('sorting by status follows the list order and puts cells without a status last', () => {
        const order = sortOrder => {
            const viz = render(Viz, data, Object.assign({ sortKey: 'data-status', sortOrder }, options));
            const column = viz.el.querySelector('.mtr-tactic-col[data-name="Initial Access"]');
            return Array.from(column.querySelectorAll('.mtr-technique-container:not(.mtr-placeholder) > .mtr-technique'))
                .map(c => c.getAttribute('data-id')).filter(id => ['T1566', 'T1078'].includes(id));
        };
        expect(order('asc')).toEqual(['T1566', 'T1078']);
        expect(order('desc')).toEqual(['T1078', 'T1566']);
    });

    test('hide null keeps cells that have a status but no number', () => {
        const viz = render(Viz, data, Object.assign({ hideNull: 'yes' }, options));
        expect(cell(viz, 'T1003')).not.toBeNull();
        expect(cell(viz, 'T1190')).toBeNull();
    });

    test('roll-up gives a parent the highest-priority status among its sub-techniques', () => {
        const sub = { fields, rows: [['T1059.001', '5', '', 'covered'], ['T1059.003', '8', '', 'gap']] };
        const viz = render(Viz, sub, Object.assign({ rollup: 'sum' }, options));
        expect(cell(viz, 'T1059').getAttribute('data-status')).toBe('gap');
        expect(cell(viz, 'T1059').getAttribute('data-value')).toBe('13');
        expect(color(viz, 'T1059')).toBe('rgb(217, 63, 60)');
    });

    test('automatic bounds and bands do nothing in status mode', () => {
        const viz = render(Viz, data, Object.assign({ scaleMode: 'auto' }, options));
        expect(viz.el.querySelector('.mtr-legend-status')).not.toBeNull();
        expect(viz.el.querySelector('.mtr-legend-bands')).toBeNull();
        expect(viz.el.querySelectorAll('[data-band]').length).toBe(0);
    });
});

describe('automatic color bounds (feature 3)', () => {
    const fields = [{ name: 'id' }, { name: 'count' }, { name: 'description' }];
    const rows = [['T1059', '10', ''], ['T1566', '50', ''], ['T1003', '90', ''], ['T9999', '5000', 'unknown id']];
    const data = { fields, rows };
    // The lowest and highest edge of the legend.
    const range = viz => [viz.el.querySelector('.mtr-band-col:not(.mtr-band-col-nodata) .mtr-band-edge').textContent, viz.el.querySelector('.mtr-band-edge-end').textContent];
    const band = (viz, id) => viz.el.querySelector('.mtr-technique[data-id="' + id + '"]').getAttribute('data-band');
    const colors = { startColor: '#000000', midColor: '#808080', endColor: '#ffffff' };

    test('the legend runs from zero to the highest value, ignoring ids that are not in the matrix', () => {
        expect(range(render(Viz, data, { scaleMode: 'auto' }))).toEqual(['0', '90']);
    });

    test('the lowest value can be the lower bound', () => {
        expect(range(render(Viz, data, { scaleMode: 'auto', autoLowerBound: 'min' }))).toEqual(['10', '90']);
    });

    test('cells fall in bands of the computed range: the highest value is in the top band', () => {
        const viz = render(Viz, data, Object.assign({ scaleMode: 'auto' }, colors));
        expect(band(viz, 'T1003')).toBe('4');
        expect(Number(band(viz, 'T1059'))).toBeLessThan(Number(band(viz, 'T1003')));
        expect(Number(band(viz, 'T1059'))).toBeLessThanOrEqual(Number(band(viz, 'T1566')));
        const top = viz.el.querySelector('.mtr-band[data-band="4"]').style.background;
        expect(viz.el.querySelector('.mtr-technique[data-id="T1003"]').style.background).toBe(top);
    });

    test('a single value uses the full range, so it is not stuck at the start color', () => {
        const viz = render(Viz, loadFixture('single-row.json'), Object.assign({ scaleMode: 'auto' }, colors));
        expect(range(viz)).toEqual(['0', '42']);
        expect(band(viz, 'T1059')).toBe('4');
    });

    test('without usable values the manual bounds are used', () => {
        const none = { fields, rows: [['T1059', 'n/a', ''], ['T9999', '7', '']] };
        expect(range(render(Viz, none, { scaleMode: 'auto', startVal: '20', endVal: '40' }))).toEqual(['20', '40']);
    });

    test('the tactic header gauge fills to the share of techniques with a value, in the color of their average', () => {
        const viz = render(Viz, { fields, rows: [['T1059', '10', ''], ['T1203', '10', '']] }, { scaleMode: 'auto' });
        const column = viz.el.querySelector('.mtr-tactic-col[data-name="Execution"]');
        const total = column.querySelectorAll('.mtr-technique').length;
        const coverage = Math.round(2 / total * 100);
        expect(column.querySelector('.mtr-fig-pct').textContent).toBe(coverage + '%');
        expect(column.querySelector('.mtr-fig-count').textContent).toBe('2/' + total);
        // The Execution mean is 10 against bounds [0, 10]: the top band's color.
        expect(column.querySelector('.mtr-meter-fill').style.background).toBe(viz.el.querySelector('.mtr-band[data-band="4"]').style.background);
    });

    test('values from roll-up count toward the bounds', () => {
        const viz = render(Viz, { fields, rows: [['T1059.001', '30', ''], ['T1059.003', '30', ''], ['T1566', '40', '']] }, { scaleMode: 'auto', rollup: 'sum' });
        expect(range(viz)).toEqual(['0', '60']);
    });

    test('manual mode ignores the data', () => {
        expect(range(render(Viz, data, { scaleMode: 'manual', startVal: '0', endVal: '100' }))).toEqual(['0', '100']);
    });

    test('bands follow the data when the bounds come from it, and are even when set by hand', () => {
        const skewed = { fields, rows: [['T1059', '1', ''], ['T1566', '2', ''], ['T1003', '3', ''], ['T1078', '4', ''], ['T1110', '1000', '']] };
        const edgesOf = viz => Array.from(viz.el.querySelectorAll('.mtr-band-col:not(.mtr-band-col-nodata) > .mtr-band-edge:not(.mtr-band-edge-end)')).map(e => Number(e.textContent));
        const manual = edgesOf(render(Viz, skewed, { scaleMode: 'manual', startVal: '0', endVal: '1000' }));
        const auto = edgesOf(render(Viz, skewed, { scaleMode: 'auto' }));
        expect(manual).toEqual([0, 200, 400, 600, 800]);
        expect(auto[1]).toBeLessThan(10);
    });
});

describe('sub-technique roll-up (feature 4)', () => {
    const data = {
        fields: [{ name: 'id' }, { name: 'count' }, { name: 'description' }],
        rows: [['T1059.001', '17', 'ps'], ['T1059.003', '8', 'cmd'], ['T1003.001', '5', 'lsass'], ['T1566', '40', 'phish']]
    };
    const cell = (viz, id) => viz.el.querySelector('.mtr-technique[data-id="' + id + '"]');

    test('a parent without a value gets the aggregate of its sub-techniques', () => {
        const viz = render(Viz, data, { rollup: 'sum' });
        expect(cell(viz, 'T1059').getAttribute('data-value')).toBe('25');
        expect(cell(viz, 'T1059').getAttribute('data-rollup')).toBe('2');
        expect(cell(viz, 'T1059').classList.contains('mtr-rolled-up')).toBe(true);
        expect(cell(viz, 'T1003').getAttribute('data-value')).toBe('5');
    });

    test('the other aggregations', () => {
        const value = rollup => cell(render(Viz, data, { rollup }), 'T1059').getAttribute('data-value');
        expect([value('max'), value('avg'), value('count')]).toEqual(['17', '13', '2']);
    });

    test('a parent with its own value keeps it unless include is chosen', () => {
        const withOwn = { fields: data.fields, rows: data.rows.concat([['T1059', '100', 'own']]) };
        expect(cell(render(Viz, withOwn, { rollup: 'sum' }), 'T1059').getAttribute('data-value')).toBe('100');
        expect(cell(render(Viz, withOwn, { rollup: 'sum', rollupParent: 'include' }), 'T1059').getAttribute('data-value')).toBe('125');
    });

    test('rolled-up cells are colored like any other value', () => {
        const rolled = cell(render(Viz, data, { rollup: 'sum', startVal: '0', endVal: '100' }), 'T1059').style.background;
        const plain = cell(render(Viz, { fields: data.fields, rows: [['T1059', '25', '']] }, { startVal: '0', endVal: '100' }), 'T1059').style.background;
        expect(rolled).toBe(plain);
    });

    test('it works with the sub-technique display turned off', () => {
        const viz = render(Viz, data, { rollup: 'sum', showSubTechniques: 'no' });
        expect(viz.el.querySelectorAll('.mtr-sub-technique').length).toBe(0);
        expect(cell(viz, 'T1059').getAttribute('data-value')).toBe('25');
    });

    test('tactic statistics count the rolled-up technique', () => {
        const stats = options => {
            const viz = render(Viz, data, options);
            return viz.el.querySelector('.mtr-tactic-col[data-name="Execution"] .mtr-count .mtr-stats-val').textContent;
        };
        expect(stats({})).toMatch(/^0 of \d+ \(0%\)$/);
        expect(stats({ rollup: 'sum' })).toMatch(/^1 of \d+ \(/);
    });

    test('hide null keeps the rolled-up technique and its sub-techniques', () => {
        const viz = render(Viz, data, { rollup: 'sum', hideNull: 'yes' });
        expect(cell(viz, 'T1059')).not.toBeNull();
        expect(viz.el.querySelector('.mtr-sub-technique[data-id="T1059.001"]')).not.toBeNull();
    });

    test('the drilldown reports the rolled-up value', () => {
        const viz = render(Viz, data, { rollup: 'sum' });
        $(cell(viz, 'T1059')).trigger('click');
        expect(viz.drilldowns[0].data.mtr_technique_value).toBe('25');
    });

    test('the tooltip says where the value came from', () => {
        const viz = render(Viz, data, { rollup: 'sum' });
        $(cell(viz, 'T1059')).trigger('mouseenter');
        expect(viz.el.querySelector('.mtr-rollup-note').textContent).toBe('Rolled up from 2 sub-techniques (sum)');
        $(cell(viz, 'T1059')).trigger('mouseleave');
        $(cell(viz, 'T1003')).trigger('mouseenter');
        expect(viz.el.querySelector('.mtr-rollup-note').textContent).toBe('Rolled up from 1 sub-technique (sum)');
    });

    test('with roll-up off nothing is rolled up', () => {
        const viz = render(Viz, data);
        expect(cell(viz, 'T1059').hasAttribute('data-value')).toBe(false);
        expect(viz.el.querySelectorAll('[data-rollup]').length).toBe(0);
    });

    test('matrices without sub-technique parents are unaffected', () => {
        const viz = render(Viz, { fields: data.fields, rows: [['D3-CH', '5', '']] }, { rollup: 'sum', matrix: 'd3fend::' });
        expect(viz.el.querySelectorAll('[data-rollup]').length).toBe(0);
    });
});

describe('field mapping (feature 2)', () => {
    const fields = names => names.map(name => ({ name }));
    // The same results as the typical fixture's first rows, with the columns shuffled.
    const positional = {
        fields: fields(['id', 'Detection Count', 'description']),
        rows: [['T1059', '42', 'first'], ['T1566', '100', 'second'], ['T1003', '7', 'third']]
    };
    const shuffled = {
        fields: fields(['description', 'owner', 'Detection Count', 'id', 'extra']),
        rows: positional.rows.map(([id, count, description]) => [description, 'someone', count, id, 'x'])
    };
    const mapping = { idField: 'id', valueField: 'Detection Count', descriptionField: 'description' };

    test('named fields render exactly what the positional columns render', () => {
        const expected = render(Viz, positional).el.innerHTML;
        document.body.innerHTML = '';
        expect(render(Viz, shuffled, mapping).el.innerHTML).toBe(expected);
    });

    test('unnamed fields still use the first three columns', () => {
        const viz = render(Viz, loadFixture('wide.json'));
        expect(viz.el.querySelector('.mtr-sub-technique[data-id="T1059.001"]').getAttribute('data-value')).toBe('30');
    });

    test('the legend title and tooltip label follow the mapped value field', () => {
        const viz = render(Viz, shuffled, Object.assign({}, mapping, { legendTitle: '' }));
        expect(viz.el.querySelector('.mtr-legend-title').textContent).toBe('Detection Count');
    });

    test('the tooltip label follows the mapped value field', () => {
        const viz = render(Viz, shuffled, mapping);
        $(viz.el.querySelector('.mtr-technique[data-id="T1059"]')).trigger('mouseenter');
        expect(viz.el.querySelector('.mtr-technique-tooltip .mtr-label').textContent).toBe('Detection Count');
    });

    test('a field name that is not in the results is reported with the available fields', () => {
        const viz = createViz(Viz);
        const config = buildConfig({ valueField: 'risk' });
        expect(() => viz.formatData(positional, config)).toThrow(SplunkVisualizationBase.VisualizationError);
        expect(() => viz.formatData(positional, config)).toThrow('Available fields: id, Detection Count, description.');
        expect(() => viz.updateView(positional, config)).toThrow(SplunkVisualizationBase.VisualizationError);
    });

    test('using one column as both id and value is reported', () => {
        const viz = createViz(Viz);
        expect(() => viz.formatData(positional, buildConfig({ idField: 'id', valueField: 'id' }))).toThrow('same column');
    });

    test('without a config, formatData behaves as before', () => {
        const viz = createViz(Viz);
        expect(viz.formatData(positional)).toBe(positional);
    });
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
    test('marks an empty result set, so that updateView can say so', () => {
        const viz = createViz(Viz);
        expect(viz.formatData(loadFixture('empty.json'))).toMatchObject({ empty: true, rows: [] });
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
    test('empty results replace the previous render with a message (audit P2-4)', () => {
        const viz = render(Viz, loadFixture('single-row.json'));
        viz.updateView(viz.formatData(loadFixture('empty.json')), buildConfig());
        expect(viz.el.querySelector('.mtr-viz-container')).toBeNull();
        expect(viz.el.querySelector('.mtr-message b').textContent).toBe('No results');
        expect(viz.el.querySelector('.mtr-message').getAttribute('role')).toBe('status');
    });

    test('results with no id in the matrix say so, and name the ids that did not match', () => {
        const data = { fields: [{ name: 'id' }, { name: 'count' }], rows: [['1059', '3'], ['Phishing', '4'], ['TA0001', '5'], ['T0000', '6']] };
        const viz = render(Viz, data);
        const message = viz.el.querySelector('.mtr-message');
        expect(message.querySelector('b').textContent).toBe('None of the 4 result ids matched this matrix');
        expect(message.textContent).toContain('Unmatched ids: 1059, Phishing, TA0001');
        expect(message.textContent).not.toContain('T0000');
    });

    test('results with no usable value say what a row needs', () => {
        const viz = render(Viz, { fields: [{ name: 'id' }, { name: 'count' }], rows: [['T1059', 'n/a'], ['T1566', '']] });
        expect(viz.el.querySelector('.mtr-message b').textContent).toBe('No usable rows');
        expect(viz.el.querySelector('.mtr-message').textContent).toContain('numeric value');
    });

    test('some matching ids are enough: the matrix is drawn without a message', () => {
        const viz = render(Viz, { fields: [{ name: 'id' }, { name: 'count' }], rows: [['T1059', '3'], ['nonsense', '4']] });
        expect(viz.el.querySelector('.mtr-message')).toBeNull();
        expect(viz.el.querySelector('.mtr-viz-container')).not.toBeNull();
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
        expect(viz.el.className).toBe('dark mtr-viz mtr-display-id');
    });

    test('colors cells along the configured gradient', () => {
        const viz = render(Viz, loadFixture('typical.json'), {
            startColor: '#000000', midColor: '#808080', endColor: '#ffffff', startVal: '0', endVal: '100'
        });
        const cell = id => viz.el.querySelector(`.mtr-technique[data-id="${id}"]`);
        const bandColor = index => viz.el.querySelector(`.mtr-band[data-band="${index}"]`).style.background;
        // 100 is in the top band and 0 in the bottom one, each in its band's color.
        expect(cell('T1566').style.background).toBe(bandColor(4));
        expect(cell('T1003').style.background).toBe(bandColor(0));
        expect(cell('T1003').style.color).toBe('rgb(255, 255, 255)');
        expect(cell('T1566').style.color).toBe('rgb(14, 17, 20)');
    });

    test('clones a multi-tactic technique into every tactic column', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        const columns = Array.from(viz.el.querySelectorAll('.mtr-technique[data-id="T1078"]'))
            .map(el => el.closest('.mtr-tactic-col').getAttribute('data-name'));
        // ATT&CK v20 replaced Defense Evasion with Stealth and Defense Impairment.
        expect(columns.sort()).toEqual(['Initial Access', 'Persistence', 'Privilege Escalation', 'Stealth']);
    });

    test('platform filter drops techniques that are not on the platform', () => {
        const viz = render(Viz, loadFixture('typical.json'), { matrix: 'enterprise::Containers' });
        expect(viz.el.querySelector('.mtr-technique[data-id="T1566"]')).toBeNull();
        expect(viz.el.querySelector('.mtr-technique[data-id="T1078"]')).not.toBeNull();
    });

    test('escapes HTML in result values', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        $(viz.el.querySelector('.mtr-technique[data-id="T1486"]')).trigger('mouseenter');
        expect(viz.el.querySelector('.mtr-technique-tooltip b')).toBeNull();
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
        expect(viz.el.querySelector('.mtr-band-col .mtr-band-edge').textContent).toBe('0');
        expect(viz.el.querySelector('.mtr-band-edge-end').textContent).toBe('100');
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
        // Sub-techniques are listed in the technique's tooltip; the highest value comes first.
        $(viz.el.querySelector('.mtr-technique[data-id="T1059"]')).trigger('mouseenter');
        $(viz.el.querySelector('.mtr-sub-row')).trigger('click');
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
            mtr_tactic_name: 'Reconnaissance'
        });
        expect(viz.drilldowns[0].data).not.toHaveProperty('mtr_technique_id');
        expect(viz.drilldowns[0].data).not.toHaveProperty('mtr_sub-technique_id');
    });

    test('technique clicks do not add mtr_tactic', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        $(viz.el.querySelector('.mtr-technique[data-id="T1059"]')).trigger('click');
        expect(viz.drilldowns[0].data).not.toHaveProperty('mtr_tactic');
    });
});

describe('drilldown payloads (also as Dashboard Studio sees them)', () => {
    const { studioFieldValueTokens } = require('./support/studioBridge');
    const clicks = {
        'a tactic': viz => $(viz.el.querySelector('.mtr-tactic-title')).trigger('click'),
        'a technique': viz => $(viz.el.querySelector('.mtr-technique[data-value]')).trigger('click'),
        'a sub-technique': viz => {
            $(viz.el.querySelector('.mtr-technique[data-id="T1059"]')).trigger('mouseenter');
            $(viz.el.querySelector('.mtr-sub-row')).trigger('click');
        }
    };

    test.each(Object.keys(clicks))('clicking %s sends only values that exist', label => {
        const viz = render(Viz, loadFixture('typical.json'));
        clicks[label](viz);
        const data = viz.drilldowns[0].data;
        expect(Object.keys(data).length).toBeGreaterThan(2);
        Object.keys(data).forEach(key => expect(data[key]).toBeDefined());
    });

    test.each(Object.keys(clicks))('clicking %s gives Studio no "undefined" tokens', label => {
        const viz = render(Viz, loadFixture('typical.json'));
        clicks[label](viz);
        const tokens = studioFieldValueTokens(viz.drilldowns[0]);
        expect(tokens).not.toBeNull();
        Object.keys(tokens).forEach(name => {
            expect(tokens[name]).not.toBe('undefined');
            expect(tokens[name]).not.toBe('null');
        });
    });

    test('a sub-technique click gives Studio the row tokens for the technique, the sub-technique and the tactic', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        clicks['a sub-technique'](viz);
        const tokens = studioFieldValueTokens(viz.drilldowns[0]);
        expect(Object.keys(tokens)).toEqual(expect.arrayContaining([
            'row.mtr_sub-technique_id.value', 'row.mtr_technique_id.value', 'row.mtr_tactic_id.value'
        ]));
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
        expect(tooltip.querySelector('.mtr-val').textContent).toBe('No data');
        expect(tooltip.querySelector('.mtr-meter-container').style.display).toBe('none');
        expect(tooltip.querySelector('.mtr-band-line')).toBeNull();
    });

    test('is removed on mouse leave', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        const cell = viz.el.querySelector('.mtr-technique[data-id="T1059"]');
        jest.useFakeTimers();
        try {
            $(cell).trigger('mouseenter');
            $(cell).trigger('mouseleave');
            // It lingers a moment, so the pointer can move onto it.
            expect(viz.el.querySelector('.mtr-technique-tooltip')).not.toBeNull();
            jest.advanceTimersByTime(700);
            expect(viz.el.querySelector('.mtr-technique-tooltip')).toBeNull();
        } finally {
            jest.useRealTimers();
        }
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

    const fill = (viz, name) => viz.el.querySelector('.mtr-tactic-col[data-name="' + name + '"] .mtr-meter-fill');

    test('the first render fades in and fills the gauges after a frame; the sweep of old is gone', () => {
        const viz = renderAnimated(Viz, loadFixture('typical.json'));
        expect(viz.el.classList.contains('mtr-enter')).toBe(true);
        expect(fill(viz, 'Execution').style.width).toBe('0%');
        frames.forEach(frame => frame(1000));
        expect(fill(viz, 'Execution').style.width).not.toBe('0%');
        expect(viz.el.querySelectorAll('.focused, .defocused').length).toBe(0);
    });

    test('the percentages count up to their final value', () => {
        const viz = renderAnimated(Viz, loadFixture('typical.json'));
        const column = '.mtr-tactic-col[data-name="Execution"]';
        const pct = () => viz.el.querySelector(column + ' .mtr-fig-pct').textContent;
        const final = Math.round(viz.el.querySelectorAll(column + ' .mtr-technique[data-value]').length / viz.el.querySelectorAll(column + ' .mtr-technique').length * 100) + '%';
        let now = 0;
        let guard = 0;
        while (frames.length && guard++ < 50) {
            const frame = frames.shift();
            frame(now);
            now += 1000;
        }
        expect(pct()).toBe(final);
    });

    test('later renders (a refresh of the search) do not fade or count up again', () => {
        const viz = renderAnimated(Viz, loadFixture('typical.json'));
        frames.length = 0;
        viz.updateView(viz.formatData(loadFixture('typical.json')), buildConfig());
        expect(viz.el.classList.contains('mtr-enter')).toBe(false);
        expect(fill(viz, 'Execution').style.width).not.toBe('0%');
        expect(frames).toHaveLength(0);
    });

    test('the browser asking for less motion skips the count-up: the figures are final at once', () => {
        window.matchMedia = () => ({ matches: true });
        try {
            const viz = renderAnimated(Viz, loadFixture('typical.json'));
            const final = Math.round(viz.el.querySelectorAll('.mtr-tactic-col[data-name="Execution"] .mtr-technique[data-value]').length / viz.el.querySelectorAll('.mtr-tactic-col[data-name="Execution"] .mtr-technique').length * 100) + '%';
            expect(viz.el.querySelector('.mtr-tactic-col[data-name="Execution"] .mtr-fig-pct').textContent).toBe(final);
        } finally {
            delete window.matchMedia;
        }
    });

    test('the animation is always on: there is no option for it', () => {
        const viz = renderAnimated(Viz, loadFixture('typical.json'), { animate: 'no' });
        expect(viz.el.classList.contains('mtr-enter')).toBe(true);
    });

    test('re-rendering during the count-up stops the old count (audit P1-4)', () => {
        const pending = new Map();
        let nextId = 1;
        window.requestAnimationFrame.mockImplementation(cb => { pending.set(nextId, cb); return nextId++; });
        jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => pending.delete(id));
        const viz = renderAnimated(Viz, loadFixture('typical.json'));
        const before = pending.size;
        for (let i = 0; i < 3; i++) {
            viz.updateView(viz.formatData(loadFixture('typical.json')), buildConfig());
        }
        expect(pending.size).toBeLessThanOrEqual(before);
        window.cancelAnimationFrame.mockRestore();
    });
});

test('requests row-major output', () => {
    expect(createViz(Viz).getInitialDataParams()).toEqual({ outputMode: SplunkVisualizationBase.ROW_MAJOR_OUTPUT_MODE });
});

test('mock namespace matches savedsearches.conf keys', () => {
    expect(Object.keys(buildConfig()).every(key => key.startsWith(NAMESPACE))).toBe(true);
});


describe('D3FEND (audit P1-1)', () => {
    const cell = (viz, id) => viz.el.querySelector('.mtr-technique[data-id="' + id + '"]');
    const rows = [['D3-AI', '10'], ['D3-HCI', '30'], ['D3-CH', '5'], ['D3-ABPI', '8']];
    const draw = options => render(Viz, { fields: [{ name: 'id' }, { name: 'count' }], rows }, Object.assign({ matrix: 'd3fend::' }, options));

    test('shows seven tactic columns with the techniques in them', () => {
        const viz = draw();
        const columns = Array.from(viz.el.querySelectorAll('.mtr-tactic-col')).map(c => c.getAttribute('data-name'));
        expect(columns).toEqual(['Model', 'Harden', 'Detect', 'Isolate', 'Deceive', 'Evict', 'Restore']);
        expect(viz.el.querySelector('.mtr-tactic-col[data-name="Model"] .mtr-technique[data-id="D3-AI"]')).not.toBeNull();
        expect(viz.el.querySelector('.mtr-tactic-col[data-name="Harden"] .mtr-technique[data-id="D3-CH"]')).not.toBeNull();
        expect(viz.el.querySelectorAll('.mtr-technique').length).toBe(30);
    });

    test('a sub-technique attaches to its technique and is listed in its tooltip with its own id', () => {
        const viz = draw();
        expect(viz.el.querySelector('.mtr-technique-container[data-id="D3-AI"] .mtr-sub-technique[data-id="D3-HCI"]')).not.toBeNull();
        $(cell(viz, 'D3-AI')).trigger('mouseenter');
        const first = viz.el.querySelector('.mtr-sub-row');
        expect(first.querySelector('.mtr-sub-id').textContent).toBe('D3-HCI');
        expect(first.querySelector('.mtr-sub-val').textContent).toBe('30');
        expect(viz.el.querySelector('.mtr-corner, .mtr-technique[data-id="D3-AI"]').classList.contains('mtr-has-subs')).toBe(true);
        $(first).trigger('click');
        expect(viz.drilldowns[0].data).toMatchObject({ 'mtr_sub-technique_id': 'D3-HCI', mtr_technique_id: 'D3-AI', mtr_tactic_name: 'Model' });
    });

    test('a sub-technique deeper in the ontology still reaches its technique', () => {
        const viz = draw();
        expect(viz.el.querySelector('.mtr-technique-container[data-id="D3-EI"] .mtr-sub-technique[data-id="D3-ABPI"]')).not.toBeNull();
    });

    test('roll-up works: sub-technique values reach their technique', () => {
        const viz = draw({ rollup: 'sum' });
        const rows2 = [['D3-HCI', '30'], ['D3-ALLM', '12']];
        const rolled = render(Viz, { fields: [{ name: 'id' }, { name: 'count' }], rows: rows2 }, { matrix: 'd3fend::', rollup: 'sum' });
        expect(cell(rolled, 'D3-AI').getAttribute('data-value')).toBe('30');
        expect(viz).toBeDefined();
    });

    test('ID display shows full D3FEND ids in the cells', () => {
        const viz = draw();
        expect(cell(viz, 'D3-CH').querySelector('.mtr-cell-id').textContent).toBe('D3-CH');
    });
});
