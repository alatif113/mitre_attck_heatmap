/*
 * The compact layout (feature 7): below a fixed width the matrix is replaced by
 * one tile per tactic. There are no options; the width limit is built in.
 * jsdom does no layout, so sizes are supplied by stubbing the element's
 * width() and height().
 */
const $ = require('jquery');
const logic = require('heatmapLogic');
const Viz = require('../build/visualization_source.js');
const vizUtils = require('api/SplunkVisualizationUtils');
const { buildConfig, createViz, loadFixture } = require('./support/render');

beforeAll(() => {
    $.fx.off = true;
});

afterEach(() => {
    document.body.innerHTML = '';
    delete global.ResizeObserver;
    vizUtils.setTheme('light');
});

describe('layoutMode', () => {
    const mode = (width, height, current) => logic.layoutMode(width, height, current);

    test('the limit is 640px', () => {
        expect(logic.COMPACT_BELOW_WIDTH).toBe(640);
        expect(mode(639, 800).compact).toBe(true);
        expect(mode(640, 800).compact).toBe(false);
        expect(mode(1200, 800).compact).toBe(false);
        expect(mode(120, 800).compact).toBe(true);
    });

    test('once compact, it stays compact until clearly wider', () => {
        const compact = { compact: true, short: false };
        expect(mode(640, 800, compact).compact).toBe(true);
        expect(mode(663, 800, compact).compact).toBe(true);
        expect(mode(664, 800, compact).compact).toBe(false);
    });

    test('once full, it stays full until the limit is crossed', () => {
        const full = { compact: false, short: false };
        expect(mode(641, 800, full).compact).toBe(false);
        expect(mode(639, 800, full).compact).toBe(true);
    });

    test('a very short panel is marked short, with the same margin', () => {
        expect(mode(500, 139).short).toBe(true);
        expect(mode(500, 140).short).toBe(false);
        expect(mode(500, 150, { compact: true, short: true }).short).toBe(true);
        expect(mode(500, 164, { compact: true, short: true }).short).toBe(false);
    });

    test('an unknown size (0, not laid out or hidden) changes nothing', () => {
        expect(mode(0, 0)).toEqual({ compact: false, short: false });
        expect(mode(0, 0, { compact: true, short: true })).toEqual({ compact: true, short: true });
        expect(mode(undefined, undefined, { compact: true, short: false })).toEqual({ compact: true, short: false });
        expect(mode(500, 0, { compact: false, short: true })).toEqual({ compact: true, short: true });
    });
});

describe('tileTitle', () => {
    test('lists the tactic\'s statistics', () => {
        expect(logic.tileTitle('Execution', [{ label: 'Total', value: '25' }, { label: 'Unique Techniques', value: '1 (4%)' }]))
            .toBe('Execution: Total 25; Unique Techniques 1 (4%)');
    });

    test('is just the name when there are no statistics', () => {
        expect(logic.tileTitle('Impact', [])).toBe('Impact');
        expect(logic.tileTitle('Impact', [{ label: '', value: '' }])).toBe('Impact');
    });
});

describe('the compact layout', () => {
    const data = loadFixture('typical.json');
    const sized = (width, height) => {
        const viz = createViz(Viz);
        viz.$el.width = () => width;
        viz.$el.height = () => height;
        return viz;
    };
    const draw = (viz, options, rows) => {
        const config = buildConfig(options);
        viz.updateView(viz.formatData(rows || data, config), config);
        return viz;
    };
    const resize = (viz, width, height) => {
        viz.$el.width = () => width;
        viz.$el.height = () => height === undefined ? 800 : height;
        viz.reflow();
    };

    test('a panel at least 640px wide is drawn as before', () => {
        const wide = draw(sized(900, 800));
        expect(wide.el.classList.contains('mtr-compact')).toBe(false);
        expect(wide.el.querySelectorAll('.mtr-tactic[title]').length).toBe(0);
        document.body.innerHTML = '';
        const unknown = draw(sized(0, 0));
        expect(wide.el.innerHTML).toBe(unknown.el.innerHTML);
    });

    test('a narrower panel is compact, and still has the matrix\'s markup', () => {
        const viz = draw(sized(500, 800));
        expect(viz.el.classList.contains('mtr-compact')).toBe(true);
        expect(viz.el.classList.contains('light')).toBe(true);
        expect(viz.el.querySelectorAll('.mtr-technique[data-value]').length).toBeGreaterThan(5);
    });

    test('each tactic tile has a tooltip made from its statistics', () => {
        const viz = draw(sized(500, 800));
        const execution = viz.el.querySelector('.mtr-tactic-col[data-name="Execution"] .mtr-tactic');
        expect(execution.getAttribute('title')).toMatch(/^Execution: Total \d+; Unique Techniques \d+ \(\d+%\); Average per Technique \d+$/);
        expect(viz.el.querySelectorAll('.mtr-tactic[title]').length).toBe(viz.el.querySelectorAll('.mtr-tactic').length);
    });

    test('in status mode the tooltip lists the statuses', () => {
        const rows = {
            fields: ['id', 'count', 'description', 'state'].map(name => ({ name })),
            rows: [['T1059', '1', '', 'gap'], ['T1059.001', '2', '', 'gap'], ['T1203', '3', '', 'covered']]
        };
        const viz = draw(sized(500, 800), { statusField: 'state', statusColors: 'gap=#d93f3c, covered=#53a051' }, rows);
        const execution = viz.el.querySelector('.mtr-tactic-col[data-name="Execution"] .mtr-tactic');
        expect(execution.getAttribute('title')).toBe('Execution: gap 1; covered 1');
    });

    test('clicking a tile sends the tactic drilldown, once', () => {
        const viz = draw(sized(500, 800));
        $(viz.el.querySelector('.mtr-tactic-col[data-name="Execution"] .mtr-tactic-title')).trigger('click');
        expect(viz.drilldowns).toHaveLength(1);
        expect(viz.drilldowns[0].data).toMatchObject({ mtr_tactic: 'Execution', mtr_tactic_name: 'Execution', mtr_tactic_id: 'TA0002' });
    });

    test('resizing switches the layout without redrawing', () => {
        const viz = draw(sized(900, 800));
        const column = viz.el.querySelector('.mtr-tactic-col');
        const cell = viz.el.querySelector('.mtr-technique[data-value]');

        resize(viz, 500);
        expect(viz.el.classList.contains('mtr-compact')).toBe(true);
        expect(viz.el.querySelectorAll('.mtr-tactic[title]').length).toBeGreaterThan(0);
        expect(viz.el.querySelector('.mtr-tactic-col')).toBe(column);
        expect(viz.el.querySelector('.mtr-technique[data-value]')).toBe(cell);

        resize(viz, 1000);
        expect(viz.el.classList.contains('mtr-compact')).toBe(false);
        expect(viz.el.querySelectorAll('.mtr-tactic[title]').length).toBe(0);
        expect(viz.el.querySelector('.mtr-tactic-col')).toBe(column);
    });

    test('a panel dragged around the limit does not flicker', () => {
        const viz = draw(sized(900, 800));
        const history = [630, 645, 660, 650, 668, 645].map(width => {
            resize(viz, width);
            return viz.el.classList.contains('mtr-compact');
        });
        expect(history).toEqual([true, true, true, true, false, false]);
    });

    test('the layout survives a redraw with new data', () => {
        const viz = draw(sized(500, 800));
        draw(viz, { hideNull: 'yes' });
        expect(viz.el.classList.contains('mtr-compact')).toBe(true);
        expect(viz.el.classList.contains('light')).toBe(true);
        expect(viz.el.querySelectorAll('.mtr-tactic[title]').length).toBe(viz.el.querySelectorAll('.mtr-tactic').length);
    });

    test('the theme class is kept in both layouts', () => {
        vizUtils.setTheme('dark');
        expect(draw(sized(500, 800)).el.className.split(' ').sort()).toEqual(['dark', 'mtr-compact']);
        document.body.innerHTML = '';
        expect(draw(sized(900, 800)).el.className).toBe('dark');
    });

    test('a very short compact panel is marked short, so its legend can be hidden', () => {
        expect(draw(sized(500, 100)).el.classList.contains('mtr-short')).toBe(true);
        document.body.innerHTML = '';
        expect(draw(sized(500, 400)).el.classList.contains('mtr-short')).toBe(false);
        document.body.innerHTML = '';
        // A wide panel is not compact, so short does not apply.
        expect(draw(sized(900, 100)).el.classList.contains('mtr-short')).toBe(false);
    });

    test('the export button stays available', () => {
        const viz = draw(sized(500, 800), { showExportButton: 'yes' });
        expect(viz.el.querySelector('.mtr-export-button')).not.toBeNull();
    });

    test('a hidden panel (size 0) keeps whatever layout it had', () => {
        const viz = draw(sized(500, 800));
        resize(viz, 0, 0);
        expect(viz.el.classList.contains('mtr-compact')).toBe(true);
    });

    test('reflow before anything is drawn is harmless', () => {
        const viz = sized(500, 800);
        expect(() => viz.reflow()).not.toThrow();
        expect(viz.el.classList.contains('mtr-compact')).toBe(true);
    });
});

describe('resize observer', () => {
    test('a resize reported by the browser applies the layout, and removing the view stops watching', () => {
        const callbacks = [];
        const observed = [];
        const disconnect = jest.fn();
        global.ResizeObserver = class {
            constructor(callback) { callbacks.push(callback); }
            observe(element) { observed.push(element); }
            disconnect() { disconnect(); }
        };
        const viz = createViz(Viz);
        viz.$el.width = () => 500;
        viz.$el.height = () => 800;
        expect(observed).toEqual([viz.el]);

        callbacks[0]();
        expect(viz.el.classList.contains('mtr-compact')).toBe(true);

        viz.remove();
        expect(disconnect).toHaveBeenCalledTimes(1);
    });

    test('without ResizeObserver everything still works', () => {
        const viz = createViz(Viz);
        expect(viz._resizeObserver).toBeUndefined();
        expect(() => viz.remove()).not.toThrow();
    });
});
