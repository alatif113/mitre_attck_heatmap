/*
 * Scrolling: when the matrix is bigger than its panel it scrolls, both ways,
 * instead of being squeezed or replaced. Layout itself (min/max widths) is CSS
 * and is checked in css.test.js and by eye; jsdom does no layout.
 */
const $ = require('jquery');
const Viz = require('../build/visualization_source.js');
const { buildConfig, createViz, loadFixture, render } = require('./support/render');

beforeAll(() => {
    $.fx.off = true;
});

afterEach(() => {
    document.body.innerHTML = '';
});

describe('the scrolling container', () => {
    test('the visualization element scrolls in both directions', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        expect(viz.el.style.overflow).toBe('auto');
    });

    test('it becomes a positioning context, for the legend', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        expect(viz.el.style.position).toBe('relative');
    });

    test.each(['absolute', 'relative', 'fixed', 'sticky'])('an element that is already %s keeps its positioning', position => {
        const viz = createViz(Viz);
        viz.el.style.position = position;
        const config = buildConfig();
        viz.updateView(viz.formatData(loadFixture('typical.json'), config), config);
        expect(viz.el.style.position).toBe(position);
    });

    test('redrawing does not stack styles or change the theme class', () => {
        const viz = render(Viz, loadFixture('typical.json'));
        const config = buildConfig({ hideNull: 'yes' });
        viz.updateView(viz.formatData(loadFixture('typical.json'), config), config);
        expect(viz.el.style.overflow).toBe('auto');
        expect(viz.el.className).toBe('light mtr-viz mtr-display-id mtr-matrix-enterprise');
    });
});

describe('the tile layout is gone', () => {
    test('there is no layout class, resize observer or tile tooltip', () => {
        global.ResizeObserver = class { observe() { throw new Error('should not be used'); } };
        try {
            const viz = render(Viz, loadFixture('typical.json'));
            viz.reflow();
            expect(viz.el.className).toBe('light mtr-viz mtr-display-id mtr-matrix-enterprise');
            expect(viz.el.querySelectorAll('.mtr-tactic[title]').length).toBe(0);
        } finally {
            delete global.ResizeObserver;
        }
    });
});
