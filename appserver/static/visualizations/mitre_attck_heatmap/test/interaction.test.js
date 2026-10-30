/*
 * The refreshed interface: tactic headers, cells, tooltips, the legend's bands, search and
 * the data filter, keyboard use, and what survives a refresh of the search results.
 */
const $ = require('jquery');
const logic = require('heatmapLogic');
const vizUtils = require('api/SplunkVisualizationUtils');
const Viz = require('../build/visualization_source.js');
const { buildConfig, render, createViz, loadFixture } = require('./support/render');

afterEach(() => {
    document.body.innerHTML = '';
    vizUtils.setTheme('light');
});

const q = (viz, selector) => viz.el.querySelector(selector);
const qa = (viz, selector) => Array.from(viz.el.querySelectorAll(selector));
const cell = (viz, id, tactic) => q(viz, (tactic ? '.mtr-tactic-col[data-name="' + tactic + '"] ' : '') + '.mtr-technique[data-id="' + id + '"]');
const hover = (viz, id) => $(cell(viz, id)).trigger('mouseenter');
const typical = options => render(Viz, loadFixture('typical.json'), options);
const search = (viz, value) => {
    const input = q(viz, '.mtr-search-input');
    input.value = value;
    $(input).trigger('input');
};
const key = (target, name, extra) => $(target).trigger($.Event('keydown', Object.assign({ key: name }, extra)));

describe('tactic headers', () => {
    test('every header shows its name (with syllable breaks), the share with a value, and a count', () => {
        const viz = typical();
        const column = q(viz, '.mtr-tactic-col[data-name="Reconnaissance"]');
        expect(column.getAttribute('data-name')).toBe('Reconnaissance');
        expect(column.querySelector('.mtr-tactic-title').textContent).toBe('Recon­nais­sance');
        expect(column.querySelector('.mtr-tactic-title').getAttribute('lang')).toBe('en');
        expect(column.querySelector('.mtr-fig-pct').textContent).toMatch(/^\d+%$/);
        expect(column.querySelector('.mtr-fig-count').textContent).toMatch(/^\d+\/\d+$/);
    });

    test('the details card lists the five figures', () => {
        const viz = typical();
        const labels = qa(viz, '.mtr-tactic-col[data-name="Execution"] .mtr-stats-label').map(l => l.textContent);
        expect(labels).toEqual(['Techniques with a value', 'Sub-techniques with a value', 'Sum of values', 'Average value', 'Highest']);
        expect(q(viz, '.mtr-tactic-col[data-name="Execution"] .mtr-top .mtr-stats-val').textContent).toBe('T1059 · 42');
        expect(q(viz, '.mtr-tactic-col[data-name="Execution"] .mtr-subs .mtr-stats-val').textContent).toMatch(/^2 of \d+$/);
    });

    test('a tactic is a keyboard stop and opens its details on focus', () => {
        const viz = typical();
        expect(qa(viz, '.mtr-tactic').every(t => t.getAttribute('tabindex') === '0')).toBe(true);
    });

    test('clicking a tactic focuses it, clicking again lets it go, and either way the drilldown is sent', () => {
        const viz = typical();
        const title = q(viz, '.mtr-tactic-col[data-name="Execution"] .mtr-tactic-title');
        $(title).trigger('click');
        expect(q(viz, '.mtr-tactic-col[data-name="Execution"] .mtr-tactic').classList.contains('mtr-tactic-selected')).toBe(true);
        expect(cell(viz, 'T1566', 'Initial Access').classList.contains('defocused')).toBe(true);
        expect(cell(viz, 'T1059', 'Execution').classList.contains('defocused')).toBe(false);
        $(title).trigger('click');
        expect(qa(viz, '.defocused').length).toBe(0);
        expect(viz.drilldowns).toHaveLength(2);
    });
});

describe('cells', () => {
    test('ID display shows the id only; ID + name adds the name', () => {
        const id = typical();
        expect(cell(id, 'T1059').querySelector('.mtr-cell-id').textContent).toBe('T1059');
        expect(cell(id, 'T1059').querySelector('.mtr-cell-name')).toBeNull();
        const name = typical({ display: 'name' });
        expect(cell(name, 'T1059').querySelector('.mtr-cell-id').textContent).toBe('T1059');
        expect(cell(name, 'T1059').querySelector('.mtr-cell-name').textContent).toBe('Command and Scripting Interpreter');
        expect(name.el.classList.contains('mtr-display-name')).toBe(true);
    });

    test('cells with no value carry no color of their own, so the hatching shows', () => {
        const viz = typical();
        expect(cell(viz, 'T1190').style.background).toBe('');
        expect(cell(viz, 'T1059').style.background).not.toBe('');
    });

    test('a technique with sub-techniques that have a value gets the corner marker', () => {
        const viz = typical();
        expect(cell(viz, 'T1059', 'Execution').classList.contains('mtr-has-subs')).toBe(true);
        expect(cell(viz, 'T1190').classList.contains('mtr-has-subs')).toBe(false);
    });

    test('sub-technique cells are not drawn, but still carry the data', () => {
        const viz = typical();
        expect(qa(viz, '.mtr-sub-technique').length).toBeGreaterThan(100);
        expect(q(viz, '.mtr-sub-technique[data-id="T1059.001"]').getAttribute('data-value')).toBe('17');
    });

    test('the text of every colored cell has at least 4.5:1 contrast, whatever the palette and number of bands', () => {
        const luminance = ([r, g, b]) => [r, g, b].map(c => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); })
            .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
        ['default', 'risk', 'blues', 'viridis'].forEach(palette => ['3', '9'].forEach(colorBands => {
            const viz = typical({ palette, colorBands });
            qa(viz, '.mtr-technique[data-value]').forEach(c => {
                const background = c.style.background.match(/\d+/g).map(Number);
                const text = c.style.color.match(/\d+/g).map(Number);
                const a = luminance(background), b = luminance(text);
                expect((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toBeGreaterThanOrEqual(4.5);
            });
        }));
    });

    test('the default sort puts the highest values first', () => {
        const viz = typical();
        const order = qa(viz, '.mtr-tactic-col[data-name="Impact"] .mtr-technique[data-value]').map(c => Number(c.getAttribute('data-value')));
        expect(order).toEqual(order.slice().sort((a, b) => b - a));
        const first = q(viz, '.mtr-tactic-col[data-name="Impact"] .mtr-technique');
        expect(first.hasAttribute('data-value')).toBe(true);
    });
});

describe('bands and palettes', () => {
    const bandColors = viz => qa(viz, '.mtr-band:not(.mtr-nodata-swatch)').map(b => b.style.background);

    test('the number of color bands is the colorBands option', () => {
        [3, 5, 7, 9].forEach(n => expect(bandColors(typical({ colorBands: String(n) }))).toHaveLength(n));
        expect(bandColors(typical({ colorBands: '4' }))).toHaveLength(5);
    });

    test('a cell is colored with the color of the band its value is in', () => {
        const viz = typical();
        qa(viz, '.mtr-technique[data-band]').forEach(c => {
            expect(c.style.background).toBe(bandColors(viz)[Number(c.getAttribute('data-band'))]);
        });
    });

    test('risk is the default the other way round', () => {
        const normal = bandColors(typical());
        const risk = bandColors(typical({ palette: 'risk' }));
        expect(risk[0]).toBe(normal[4]);
        expect(risk[4]).toBe(normal[0]);
    });

    test('blues and viridis have their own colors', () => {
        const colors = ['default', 'blues', 'viridis'].map(palette => bandColors(typical({ palette })).join('|'));
        expect(new Set(colors).size).toBe(3);
    });

    test('bands get lighter or darker steadily along a palette', () => {
        const bands = bandColors(typical({ palette: 'blues', colorBands: '9' })).map(c => c.match(/\d+/g).map(Number));
        const brightness = bands.map(([r, g, b]) => r + g + b);
        expect(brightness).toEqual(brightness.slice().sort((a, b) => b - a));
    });
});

describe('tooltip', () => {
    test('says which band a value is in and how it ranks', () => {
        const viz = typical();
        hover(viz, 'T1486');
        const line = q(viz, '.mtr-technique-tooltip .mtr-band-line').textContent;
        expect(line).toMatch(/^Band \d of 5 \(.+–.+\) · rank \d+ of \d+$/);
    });

    test('lists the other tactics a technique is in', () => {
        const viz = typical();
        hover(viz, 'T1078');
        expect(q(viz, '.mtr-also').textContent).toMatch(/^Also in .*Persistence/);
        expect(q(viz, '.mtr-tooltip-tactic').textContent).toBe(cell(viz, 'T1078').closest('.mtr-tactic-col').getAttribute('data-name'));
    });

    test('lists every sub-technique, highest value first, each one clickable', () => {
        const viz = typical();
        hover(viz, 'T1059');
        const rows = qa(viz, '.mtr-sub-row');
        expect(rows.length).toBe(qa(viz, '.mtr-tactic-col[data-name="Execution"] .mtr-technique[data-id="T1059"]')[0].parentNode.querySelectorAll('.mtr-sub-technique').length);
        expect(rows[0].querySelector('.mtr-sub-id').textContent).toBe('.001');
        expect(rows[0].querySelector('.mtr-sub-val').textContent).toBe('17');
        expect(q(viz, '.mtr-subs-title').textContent).toMatch(/^Sub-techniques · 2 of \d+ with a value$/);
        $(rows[0]).trigger('click');
        expect(viz.drilldowns[0].data).toMatchObject({ 'mtr_sub-technique_id': 'T1059.001' });
    });

    test('is placed inside the panel, never wider than it', () => {
        const viz = typical();
        hover(viz, 'T1059');
        expect(q(viz, '.mtr-technique-tooltip').parentNode).toBe(viz.el);
        expect(parseInt(q(viz, '.mtr-technique-tooltip').style.width)).toBeLessThanOrEqual(310);
    });

    test('a hover tooltip has no close button; a pinned one does', () => {
        const viz = typical();
        hover(viz, 'T1059');
        expect(q(viz, '.mtr-tooltip-close')).toBeNull();
        $(cell(viz, 'T1059')).trigger('click');
        expect(q(viz, '.mtr-tooltip-close')).not.toBeNull();
    });

    test('opens when the keyboard focuses a cell', () => {
        const viz = typical();
        $(cell(viz, 'T1486')).trigger('focus');
        expect(q(viz, '.mtr-technique-tooltip .mtr-id').textContent).toBe('T1486');
    });
});

describe('pinning a tooltip', () => {
    test('clicking a technique pins its tooltip and selects the cell; it stays when the pointer leaves', () => {
        jest.useFakeTimers();
        try {
            const viz = typical();
            $(cell(viz, 'T1059', 'Execution')).trigger('click');
            expect(q(viz, '.mtr-technique-tooltip').classList.contains('mtr-pinned')).toBe(true);
            expect(cell(viz, 'T1059', 'Execution').classList.contains('mtr-selected')).toBe(true);
            $(cell(viz, 'T1059', 'Execution')).trigger('mouseleave');
            jest.advanceTimersByTime(1000);
            expect(q(viz, '.mtr-technique-tooltip')).not.toBeNull();
        } finally {
            jest.useRealTimers();
        }
    });

    test('clicking it again, its close button, or Escape lets it go', () => {
        const viz = typical();
        const target = cell(viz, 'T1059', 'Execution');
        $(target).trigger('click');
        $(target).trigger('click');
        expect(q(viz, '.mtr-technique-tooltip')).toBeNull();
        $(target).trigger('click');
        $(q(viz, '.mtr-tooltip-close')).trigger('click');
        expect(q(viz, '.mtr-technique-tooltip')).toBeNull();
        $(target).trigger('click');
        key(viz.el, 'Escape');
        expect(q(viz, '.mtr-technique-tooltip')).toBeNull();
        expect(qa(viz, '.mtr-selected').length).toBe(0);
    });

    test('hovering another cell does not replace a pinned tooltip', () => {
        const viz = typical();
        $(cell(viz, 'T1059', 'Execution')).trigger('click');
        hover(viz, 'T1486');
        expect(q(viz, '.mtr-technique-tooltip .mtr-id').textContent).toBe('T1059');
    });
});

describe('a tooltip does not fade in twice', () => {
    test('pinning the tooltip that is already open does not replay the fade', () => {
        const viz = typical();
        hover(viz, 'T1059');
        expect(q(viz, '.mtr-technique-tooltip').classList.contains('mtr-instant')).toBe(false);
        $(cell(viz, 'T1059')).trigger('click');
        expect(q(viz, '.mtr-technique-tooltip').classList.contains('mtr-instant')).toBe(true);
    });

    test('a tooltip for another cell does fade in', () => {
        const viz = typical();
        hover(viz, 'T1059');
        hover(viz, 'T1486');
        expect(q(viz, '.mtr-technique-tooltip').classList.contains('mtr-instant')).toBe(false);
    });

    test('clicking a sub-technique leaves the tooltip as it is', () => {
        const viz = typical();
        $(cell(viz, 'T1059', 'Execution')).trigger('click');
        const tooltip = q(viz, '.mtr-technique-tooltip');
        $(q(viz, '.mtr-sub-row')).trigger('click');
        // The same element, not a rebuilt one: nothing to fade in again.
        expect(q(viz, '.mtr-technique-tooltip')).toBe(tooltip);
        expect(qa(viz, '.mtr-technique-tooltip')).toHaveLength(1);
    });

    test('a tooltip pinned across a refresh comes back without fading', () => {
        const viz = typical();
        $(cell(viz, 'T1059', 'Execution')).trigger('click');
        viz.updateView(viz.formatData(loadFixture('typical.json'), buildConfig()), buildConfig());
        expect(q(viz, '.mtr-technique-tooltip.mtr-pinned').classList.contains('mtr-instant')).toBe(true);
    });
});

describe('search', () => {
    test('shows how many cells match, and in which part of the technique', () => {
        const viz = typical();
        search(viz, 'phish');
        const status = q(viz, '.mtr-search-status').textContent;
        expect(status).toMatch(/^– of \d+ · /);
        expect(status).toContain('name');
        expect(qa(viz, '.mtr-technique.focused').length).toBeGreaterThan(0);
    });

    test('matches sub-technique names, descriptions and tactic names too', () => {
        const viz = typical();
        search(viz, 'powershell');
        expect(cell(viz, 'T1059', 'Execution').classList.contains('focused')).toBe(true);
        expect(q(viz, '.mtr-search-status').textContent).toContain('sub-technique');
        search(viz, 'second paragraph');
        expect(cell(viz, 'T1566', 'Initial Access').classList.contains('focused')).toBe(true);
        expect(q(viz, '.mtr-search-status').textContent).toContain('description');
        search(viz, 'exfil');
        expect(q(viz, '.mtr-tactic-col[data-name="Exfiltration"] .mtr-tactic').classList.contains('mtr-match')).toBe(true);
        expect(q(viz, '.mtr-search-status').textContent).toContain('tactic name');
    });

    test('the matched text is underlined', () => {
        const viz = typical();
        search(viz, 't1059');
        expect(cell(viz, 'T1059', 'Execution').querySelector('.mtr-hl').textContent).toBe('T1059');
        search(viz, '');
        expect(cell(viz, 'T1059', 'Execution').querySelector('.mtr-hl')).toBeNull();
        expect(cell(viz, 'T1059', 'Execution').querySelector('.mtr-cell-id').textContent).toBe('T1059');
    });

    test('no matches say so', () => {
        const viz = typical();
        search(viz, 'zzzz');
        expect(q(viz, '.mtr-search-status').textContent).toBe('No matches');
        expect(q(viz, '.mtr-search-next').disabled).toBe(true);
    });

    test('next and previous step through the matches, wrapping round', () => {
        const viz = typical();
        search(viz, 'phishing');
        const total = qa(viz, '.mtr-technique.focused').length;
        expect(total).toBeGreaterThan(1);
        const current = () => qa(viz, '.mtr-current').map(c => c.getAttribute('data-id') + '@' + c.closest('.mtr-tactic-col').getAttribute('data-id'));
        $(q(viz, '.mtr-search-next')).trigger('click');
        const first = current();
        expect(first).toHaveLength(1);
        expect(q(viz, '.mtr-search-status').textContent).toMatch(new RegExp('^1 of ' + total));
        $(q(viz, '.mtr-search-next')).trigger('click');
        expect(current()).not.toEqual(first);
        $(q(viz, '.mtr-search-prev')).trigger('click');
        expect(current()).toEqual(first);
        $(q(viz, '.mtr-search-prev')).trigger('click');
        expect(q(viz, '.mtr-search-status').textContent).toMatch(new RegExp('^' + total + ' of ' + total));
    });

    test('Enter steps to the next match, Shift+Enter to the previous', () => {
        const viz = typical();
        search(viz, 'phishing');
        key(q(viz, '.mtr-search-input'), 'Enter');
        expect(q(viz, '.mtr-search-status').textContent).toMatch(/^1 of /);
        key(q(viz, '.mtr-search-input'), 'Enter', { shiftKey: true });
        expect(q(viz, '.mtr-search-status').textContent).toMatch(/^\d+ of \d+/);
    });

    test('the clear button empties the search and the focus', () => {
        const viz = typical();
        search(viz, 'phishing');
        expect(q(viz, '.mtr-search-container').classList.contains('mtr-has-query')).toBe(true);
        $(q(viz, '.mtr-search-clear')).trigger('click');
        expect(q(viz, '.mtr-search-input').value).toBe('');
        expect(qa(viz, '.focused, .defocused').length).toBe(0);
        expect(q(viz, '.mtr-search-status').textContent).toBe('');
    });

    test('"/" moves to the search box', () => {
        const viz = typical();
        key(cell(viz, 'T1059'), '/');
        expect(document.activeElement).toBe(q(viz, '.mtr-search-input'));
    });

    test('without a search bar there is no search, filter or shortcut', () => {
        const viz = typical({ showSearchBar: 'no' });
        expect(q(viz, '.mtr-search-container')).toBeNull();
        expect(q(viz, '.mtr-filter')).toBeNull();
    });
});

describe('All / With data / Gaps', () => {
    const gone = viz => qa(viz, '.mtr-technique-container.mtr-gone').map(c => c.querySelector('.mtr-technique'));
    const choose = (viz, show) => $(q(viz, '.mtr-filter [data-show="' + show + '"]')).trigger('click');

    test('All shows everything and is selected at first', () => {
        const viz = typical();
        expect(gone(viz)).toHaveLength(0);
        expect(q(viz, '.mtr-filter [data-show="all"]').classList.contains('mtr-on')).toBe(true);
    });

    test('With data hides the cells with no value, Gaps hides the ones with a value', () => {
        const viz = typical();
        choose(viz, 'data');
        expect(gone(viz).length).toBeGreaterThan(100);
        expect(gone(viz).every(c => !c.hasAttribute('data-value'))).toBe(true);
        choose(viz, 'gaps');
        expect(gone(viz).length).toBeGreaterThan(0);
        expect(gone(viz).every(c => c.hasAttribute('data-value'))).toBe(true);
        expect(q(viz, '.mtr-filter [data-show="gaps"]').getAttribute('aria-pressed')).toBe('true');
        choose(viz, 'all');
        expect(gone(viz)).toHaveLength(0);
    });
});

describe("the legend's bands", () => {
    const band = (viz, n) => q(viz, '.mtr-band[data-band="' + n + '"]');

    test('hovering a band dims the cells outside it, and leaving restores them', () => {
        const viz = typical();
        $(band(viz, 4)).trigger('mouseenter');
        const inBand = qa(viz, '.mtr-technique[data-band="4"]');
        expect(inBand.length).toBeGreaterThan(0);
        expect(inBand.every(c => !c.classList.contains('defocused'))).toBe(true);
        expect(cell(viz, 'T1190').classList.contains('defocused')).toBe(true);
        expect(q(viz, '.mtr-legend-hint').textContent).toMatch(/techniques$/);
        $(band(viz, 4)).trigger('mouseleave');
        expect(qa(viz, '.defocused').length).toBe(0);
        expect(q(viz, '.mtr-legend-hint').textContent).toBe('');
    });

    test('clicking a band pins it until it is clicked again or Escape is pressed', () => {
        const viz = typical();
        $(band(viz, 0)).trigger('click');
        $(band(viz, 0)).trigger('mouseleave');
        expect(band(viz, 0).classList.contains('mtr-band-pinned')).toBe(true);
        expect(qa(viz, '.defocused').length).toBeGreaterThan(0);
        expect(q(viz, '.mtr-legend-hint').textContent).toMatch(/pinned$/);
        $(band(viz, 0)).trigger('click');
        expect(qa(viz, '.defocused').length).toBe(0);
        $(band(viz, 0)).trigger('click');
        key(viz.el, 'Escape');
        expect(qa(viz, '.defocused').length).toBe(0);
    });

    test('"No data" dims every cell that has a value', () => {
        const viz = typical();
        $(q(viz, '.mtr-nodata-swatch')).trigger('mouseenter');
        expect(cell(viz, 'T1059', 'Execution').classList.contains('defocused')).toBe(true);
        expect(cell(viz, 'T1190').classList.contains('defocused')).toBe(false);
        expect(q(viz, '.mtr-legend-hint').textContent).toMatch(/^No data · \d+ techniques/);
    });

    test('a band also keeps a technique whose sub-technique is in it', () => {
        const viz = typical();
        const subBand = q(viz, '.mtr-sub-technique[data-id="T1059.001"]').getAttribute('data-band');
        $(band(viz, Number(subBand))).trigger('mouseenter');
        expect(cell(viz, 'T1059', 'Execution').classList.contains('defocused')).toBe(false);
    });

    test('the band, the search and the data filter work together', () => {
        const viz = typical();
        search(viz, 'access');
        $(band(viz, 4)).trigger('mouseenter');
        const kept = qa(viz, '.mtr-technique').filter(c => !c.classList.contains('defocused'));
        kept.forEach(c => expect(c.getAttribute('data-band') === '4' || c.parentNode.querySelector('.mtr-sub-technique[data-band="4"]')).toBeTruthy());
    });
});

describe('keyboard', () => {
    // jsdom has no layout, so give each cell a position: columns left to right, rows top to bottom.
    const layOut = viz => {
        qa(viz, '.mtr-tactic-col').forEach((column, c) => {
            qa({ el: column }, '.mtr-technique').forEach((t, r) => {
                t.getBoundingClientRect = () => ({ left: c * 60, top: r * 28, width: 56, height: 28, right: c * 60 + 56, bottom: r * 28 + 28 });
            });
        });
    };

    test('the matrix is one tab stop', () => {
        const viz = typical();
        const stops = qa(viz, '.mtr-technique').filter(c => c.getAttribute('tabindex') === '0');
        expect(stops).toHaveLength(1);
        expect(qa(viz, '.mtr-technique').every(c => c.getAttribute('role') === 'button')).toBe(true);
    });

    test('arrow keys move between cells; Home and End to the ends of a column', () => {
        const viz = typical();
        layOut(viz);
        const column = q(viz, '.mtr-tactic-col[data-name="Execution"]');
        const cells = qa({ el: column }, '.mtr-technique');
        cells[0].focus();
        key(cells[0], 'ArrowDown');
        expect(document.activeElement).toBe(cells[1]);
        key(cells[1], 'ArrowUp');
        expect(document.activeElement).toBe(cells[0]);
        key(cells[0], 'End');
        expect(document.activeElement).toBe(cells[cells.length - 1]);
        key(cells[cells.length - 1], 'Home');
        expect(document.activeElement).toBe(cells[0]);
        key(cells[0], 'ArrowRight');
        expect(document.activeElement.closest('.mtr-tactic-col')).not.toBe(column);
    });

    test('Enter selects the cell, like a click', () => {
        const viz = typical();
        const target = cell(viz, 'T1059', 'Execution');
        target.focus();
        key(target, 'Enter');
        expect(target.classList.contains('mtr-selected')).toBe(true);
        expect(viz.drilldowns).toHaveLength(1);
    });

    test('Escape clears the pinned tooltip, the band and the tactic focus', () => {
        const viz = typical();
        $(cell(viz, 'T1059', 'Execution')).trigger('click');
        $(q(viz, '.mtr-band[data-band="1"]')).trigger('click');
        $(q(viz, '.mtr-tactic-col[data-name="Impact"] .mtr-tactic-title')).trigger('click');
        key(viz.el, 'Escape');
        expect(q(viz, '.mtr-technique-tooltip')).toBeNull();
        expect(qa(viz, '.defocused').length).toBe(0);
        expect(qa(viz, '.mtr-tactic-selected').length).toBe(0);
    });
});

describe('a refresh of the search results', () => {
    const refresh = viz => viz.updateView(viz.formatData(loadFixture('typical.json'), buildConfig()), buildConfig());

    test('keeps the search text and its matches', () => {
        const viz = typical();
        search(viz, 'phishing');
        const matches = qa(viz, '.mtr-technique.focused').length;
        refresh(viz);
        expect(q(viz, '.mtr-search-input').value).toBe('phishing');
        expect(qa(viz, '.mtr-technique.focused')).toHaveLength(matches);
    });

    test('keeps the data filter, the pinned band and the selected tactic', () => {
        const viz = typical();
        $(q(viz, '.mtr-filter [data-show="data"]')).trigger('click');
        $(q(viz, '.mtr-band[data-band="2"]')).trigger('click');
        $(q(viz, '.mtr-tactic-col[data-name="Impact"] .mtr-tactic-title')).trigger('click');
        refresh(viz);
        expect(q(viz, '.mtr-filter [data-show="data"]').classList.contains('mtr-on')).toBe(true);
        expect(q(viz, '.mtr-band[data-band="2"]').classList.contains('mtr-band-pinned')).toBe(true);
        expect(q(viz, '.mtr-tactic-col[data-name="Impact"] .mtr-tactic').classList.contains('mtr-tactic-selected')).toBe(true);
    });

    test('keeps a pinned tooltip, and the scroll position', () => {
        const viz = typical();
        let scrollTop = 0, scrollLeft = 0;
        Object.defineProperty(viz.el, 'scrollTop', { get: () => scrollTop, set: v => { scrollTop = v; }, configurable: true });
        Object.defineProperty(viz.el, 'scrollLeft', { get: () => scrollLeft, set: v => { scrollLeft = v; }, configurable: true });
        $(cell(viz, 'T1059', 'Execution')).trigger('click');
        scrollTop = 240;
        scrollLeft = 80;
        refresh(viz);
        expect(scrollTop).toBe(240);
        expect(scrollLeft).toBe(80);
        expect(q(viz, '.mtr-technique-tooltip.mtr-pinned .mtr-id').textContent).toBe('T1059');
        expect(cell(viz, 'T1059', 'Execution').classList.contains('mtr-selected')).toBe(true);
    });

    test('lets go of a pinned tooltip whose technique is no longer there', () => {
        const viz = typical();
        $(cell(viz, 'T1059', 'Execution')).trigger('click');
        viz.updateView(viz.formatData(loadFixture('typical.json'), buildConfig({ matrix: 'ics::' })), buildConfig({ matrix: 'ics::' }));
        expect(q(viz, '.mtr-technique-tooltip')).toBeNull();
    });

    test('shows new data in the same view', () => {
        const viz = typical();
        search(viz, 'phishing');
        viz.updateView(viz.formatData(loadFixture('single-row.json'), buildConfig()), buildConfig());
        expect(qa(viz, '.mtr-technique[data-value]')).toHaveLength(1);
        expect(q(viz, '.mtr-search-input').value).toBe('phishing');
    });
});

describe('messages', () => {
    test('while imported data is being read the panel says so, and a later render replaces it', async () => {
        const viz = createViz(Viz);
        viz._fetchRecords = () => new Promise(() => {});
        const config = buildConfig({ matrixSource: 'splunk', matrix: 'enterprise::' });
        viz.updateView(viz.formatData(loadFixture('typical.json'), config), config);
        expect(q(viz, '.mtr-message b').textContent).toMatch(/^Loading ATT&CK data/);
        expect(q(viz, '.mtr-viz-container')).toBeNull();
    });

    test('a panel that has already drawn keeps its matrix while new imported data loads', () => {
        const viz = typical();
        viz._fetchRecords = () => new Promise(() => {});
        const config = buildConfig({ matrixSource: 'splunk', matrix: 'enterprise::' });
        viz.updateView(viz.formatData(loadFixture('typical.json'), config), config);
        expect(q(viz, '.mtr-viz-container')).not.toBeNull();
    });
});

describe('the logic is exercised through the same numbers', () => {
    test('band edges on the page equal computeEdges for the same values', () => {
        const viz = typical({ scaleMode: 'auto' });
        const values = qa(viz, '.mtr-technique[data-value], .mtr-sub-technique[data-value]');
        const unique = new Map();
        values.forEach(c => unique.set(c.getAttribute('data-id'), Number(c.getAttribute('data-value'))));
        const edges = qa(viz, '.mtr-band-col:not(.mtr-band-col-nodata) > .mtr-band-edge:not(.mtr-band-edge-end)').map(e => Number(e.textContent.replace(/,/g, '')));
        const all = Array.from(unique.values());
        const bounds = logic.computeBounds(all, 'zero', { startVal: 0, endVal: 100 });
        const expected = logic.computeEdges(all, 5, 'quantile', bounds.startVal, bounds.endVal);
        expect(edges).toEqual(expected.slice(0, 5));
    });
});


describe('wall mode', () => {
    let animate;

    beforeEach(() => {
        jest.useFakeTimers();
        animate = jest.fn();
        Element.prototype.animate = animate;
    });

    afterEach(() => {
        jest.useRealTimers();
        delete Element.prototype.animate;
        delete window.matchMedia;
    });

    const wall = options => typical(Object.assign({ wallMode: 'yes', animate: 'no' }, options));
    const expected = col => logic.hyphenateName(col.getAttribute('data-name'));
    const titles = viz => qa(viz, '.mtr-tactic-col').map(col => col.querySelector('.mtr-tactic-title').textContent);
    const figures = viz => qa(viz, '.mtr-tactic-col .mtr-fig-pct').map(f => f.textContent);

    test('is off unless the option is set: nothing twinkles and nothing scrambles', () => {
        const viz = typical();
        const before = titles(viz);
        jest.advanceTimersByTime(30000);
        expect(animate).not.toHaveBeenCalled();
        expect(titles(viz)).toEqual(before);
    });

    test('cells with a value twinkle, two at a time', () => {
        const viz = wall();
        jest.advanceTimersByTime(900);
        expect(animate).toHaveBeenCalledTimes(2);
        const [keyframes, timing] = animate.mock.calls[0];
        expect(keyframes.map(k => k.filter)).toEqual(['brightness(1)', 'brightness(1.7) saturate(1.25)', 'brightness(1)']);
        expect(timing.duration).toBeGreaterThanOrEqual(1300);
        const twinkled = animate.mock.instances;
        twinkled.forEach(el => expect(el.hasAttribute('data-value')).toBe(true));
        jest.advanceTimersByTime(5000);
        expect(animate.mock.calls.length).toBeGreaterThan(6);
        expect(viz.el.querySelectorAll('.mtr-technique').length).toBeGreaterThan(0);
    });

    test('cells with a status twinkle too, and cells with nothing do not', () => {
        const fields = ['id', 'count', 'description', 'state'].map(name => ({ name }));
        const viz = render(Viz, { fields, rows: [['T1059', '', '', 'gap']] }, { wallMode: 'yes', animate: 'no', statusField: 'state' });
        jest.advanceTimersByTime(20000);
        expect(animate).toHaveBeenCalled();
        animate.mock.instances.forEach(el => expect(el.getAttribute('data-id')).toBe('T1059'));
    });

    test('now and then a tactic header scrambles and then resolves to what it was', () => {
        const viz = wall();
        const names = qa(viz, '.mtr-tactic-col').map(expected);
        const pcts = figures(viz);
        jest.advanceTimersByTime(3050);
        // A scramble has begun: some title or figure is not itself.
        expect(titles(viz).some((t, i) => t !== names[i]) || figures(viz).some((f, i) => f !== pcts[i])).toBe(true);
        // Soft hyphens, spaces and the % sign stay put while it runs.
        titles(viz).forEach((t, i) => expect(t.length).toBe(names[i].length));
        jest.advanceTimersByTime(1500);
        const during = titles(viz).map((t, i) => t === names[i]);
        expect(during.filter(same => !same).length).toBeLessThanOrEqual(2);
    });

    test('stopping restores every header exactly', () => {
        const viz = wall();
        const names = qa(viz, '.mtr-tactic-col').map(expected);
        const pcts = figures(viz);
        jest.advanceTimersByTime(3050);
        viz._stopWall();
        expect(titles(viz)).toEqual(names);
        expect(figures(viz)).toEqual(pcts);
        animate.mockClear();
        jest.advanceTimersByTime(30000);
        expect(animate).not.toHaveBeenCalled();
        expect(titles(viz)).toEqual(names);
    });

    test('nothing happens while someone is using the panel', () => {
        const viz = wall();
        const names = qa(viz, '.mtr-tactic-col').map(expected);
        $(cell(viz, 'T1059', 'Execution')).trigger('click');
        animate.mockClear();
        jest.advanceTimersByTime(20000);
        expect(animate).not.toHaveBeenCalled();
        expect(titles(viz)).toEqual(names);
    });

    test('a search, a pinned band, a focused tactic or a hover each pause it', () => {
        const pause = setup => {
            animate = jest.fn();
            Element.prototype.animate = animate;
            const viz = wall();
            setup(viz);
            animate.mockClear();
            jest.advanceTimersByTime(8000);
            return animate.mock.calls.length;
        };
        expect(pause(viz => search(viz, 'phish'))).toBe(0);
        expect(pause(viz => $(q(viz, '.mtr-band[data-band="2"]')).trigger('click'))).toBe(0);
        expect(pause(viz => $(q(viz, '.mtr-tactic-col[data-name="Impact"] .mtr-tactic-title')).trigger('click'))).toBe(0);
        expect(pause(viz => hover(viz, 'T1059'))).toBe(0);
        expect(pause(viz => $(q(viz, '.mtr-band[data-band="1"]')).trigger('mouseenter'))).toBe(0);
    });

    test('it carries on when the person lets go', () => {
        const viz = wall();
        $(cell(viz, 'T1059', 'Execution')).trigger('click');
        jest.advanceTimersByTime(5000);
        animate.mockClear();
        key(viz.el, 'Escape');
        jest.advanceTimersByTime(3000);
        expect(animate).toHaveBeenCalled();
    });

    test('the browser asking for less motion switches it off', () => {
        window.matchMedia = () => ({ matches: true });
        const viz = wall();
        const names = qa(viz, '.mtr-tactic-col').map(expected);
        jest.advanceTimersByTime(30000);
        expect(animate).not.toHaveBeenCalled();
        expect(titles(viz)).toEqual(names);
    });

    test('a refresh does not start a second set of timers', () => {
        const viz = wall();
        for (let i = 0; i < 3; i++) viz.updateView(viz.formatData(loadFixture('typical.json'), buildConfig({ wallMode: 'yes', animate: 'no' })), buildConfig({ wallMode: 'yes', animate: 'no' }));
        animate.mockClear();
        jest.advanceTimersByTime(10000);
        const withRefreshes = animate.mock.calls.length;
        const single = wall();
        animate.mockClear();
        jest.advanceTimersByTime(10000);
        // Two panels twinkle about twice as often as one, not four times as often.
        expect(withRefreshes).toBeGreaterThan(0);
        expect(animate.mock.calls.length).toBeLessThan(withRefreshes * 3);
        expect(single).toBeDefined();
    });

    test('turning it off in the next refresh stops it', () => {
        const viz = wall();
        jest.advanceTimersByTime(3050);
        viz.updateView(viz.formatData(loadFixture('typical.json'), buildConfig()), buildConfig());
        expect(viz._stopWall || null).toBeNull();
        animate.mockClear();
        jest.advanceTimersByTime(20000);
        expect(animate).not.toHaveBeenCalled();
    });

    test('a message in place of the matrix stops it', () => {
        const viz = wall();
        viz.updateView(viz.formatData(loadFixture('empty.json'), buildConfig()), buildConfig());
        animate.mockClear();
        jest.advanceTimersByTime(20000);
        expect(animate).not.toHaveBeenCalled();
    });

    test('a panel taken off the page stops it', () => {
        const viz = wall();
        viz.el.remove();
        jest.advanceTimersByTime(20000);
        expect(animate).not.toHaveBeenCalled();
    });

    test('it does not change what the panel shows once it stops: values, colors and text are untouched', () => {
        const plain = typical();
        const walled = wall();
        walled._stopWall();
        const read = viz => qa(viz, '.mtr-technique[data-value]').map(c => c.getAttribute('data-id') + c.getAttribute('data-value') + c.style.background);
        expect(read(walled)).toEqual(read(plain));
    });
});
