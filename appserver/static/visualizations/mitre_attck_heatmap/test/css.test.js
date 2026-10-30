/*
 * visualization.css is injected into the whole Splunk page, so what it
 * defines at :root must not collide with other styles.
 */
const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, '../visualization.css'), 'utf8');
const declared = Array.from(css.matchAll(/^\s*(--[\w-]+)\s*:/gm)).map(m => m[1]);
const used = Array.from(css.matchAll(/var\((--[\w-]+)/g)).map(m => m[1]);

// Returns the declarations of the first rule whose selector is exactly `selector`.
const rule = selector => {
    const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const match = text.match(new RegExp('(?:^|})\\s*' + selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{([^}]*)\\}'));
    return match ? match[1] : null;
};

// The declarations of a rule, as { property: value }.
const declarations = selector => {
    const body = rule(selector);
    const result = {};
    (body || '').split(';').forEach(line => {
        const m = line.match(/^\s*([\w-]+)\s*:\s*([\s\S]*?)\s*$/);
        if (m) result[m[1]] = m[2];
    });
    return result;
};

const px = value => parseFloat(value);

test('ID cells are narrow and name cells wide, and every cell in a view has the same fixed height', () => {
    const base = declarations('.mtr-viz');
    const name = declarations('.mtr-viz.mtr-display-name');
    expect(px(base['--mtr-tw'])).toBe(44);
    expect(px(base['--mtr-th'])).toBe(28);
    expect(px(name['--mtr-tw'])).toBe(132);
    expect(px(name['--mtr-th'])).toBe(39);
    expect(rule('.mtr-technique-container')).toMatch(/height:\s*var\(--mtr-th\)/);
    expect(rule('.mtr-technique')).toMatch(/height:\s*100%/);
});

test('cells touch: no gap between them, no rounding, one fixed grid', () => {
    const grid = declarations('.mtr-technique-col');
    expect(grid.display).toBe('grid');
    expect(px(grid.gap)).toBe(0);
    expect(declarations('.mtr-technique')['border-radius']).toBeUndefined();
});

test('a column is never narrower than two lines of tactic name, so the matrix scrolls instead of squeezing', () => {
    expect(rule('.mtr-tactic-col')).toMatch(/min-width:\s*var\(--mtr-colmin\)/);
    expect(px(declarations('.mtr-viz')['--mtr-colmin'])).toBe(76);
    expect(px(declarations('.mtr-viz.mtr-display-name')['--mtr-colmin'])).toBe(140);
});

test('centering does not cut off the left side when the matrix overflows', () => {
    expect(rule('.mtr-viz-container')).toMatch(/justify-content:\s*safe center/);
});

test('every tactic header has the same fixed height and a flat fill, with no border or gradient', () => {
    const header = declarations('.mtr-tactic');
    expect(header.height).toBe('var(--mtr-labh)');
    expect(px(declarations('.mtr-viz')['--mtr-labh'])).toBe(88);
    expect(header.background).toBe('var(--mtr-panel)');
    expect(header.border).toBeUndefined();
    expect(rule('.mtr-tactic')).not.toMatch(/gradient/);
});

test('tactic names break at syllables and stop at two lines', () => {
    const title = declarations('.mtr-tactic-title');
    expect(title['-webkit-line-clamp']).toBe('2');
    expect(title.hyphens).toBe('auto');
    expect(title.height).toBe('30px');
});

test('cells with no value are hatched, faintly', () => {
    expect(rule('.mtr-technique')).toMatch(/repeating-linear-gradient/);
    const hatch = css.match(/--mtr-hatch:\s*rgba\([^)]*,\s*([\d.]+)\)/);
    expect(parseFloat(hatch[1])).toBeLessThanOrEqual(0.05);
});

test('the corner marker for sub-techniques is faint', () => {
    expect(parseFloat(declarations('.mtr-subdot').opacity)).toBeLessThanOrEqual(0.3);
});

test('the search box, its clear button and the export button share one height and have no margin, whatever the page says', () => {
    const shared = declarations('.mtr-viz .mtr-search-input, .mtr-viz .mtr-export-button, .mtr-viz .mtr-search-clear'.replace(/,\s*/g, ',\n'));
    expect(px(shared.height)).toBe(32);
    expect(shared.margin).toBe('0');
    expect(shared['box-sizing']).toBe('border-box');
    expect(declarations('.mtr-top')['align-items']).toBe('center');
});

test('there is no keyboard hint drawn in the search box', () => {
    expect(css).not.toMatch(/kbd/);
});

test('the legend is in the page flow, not positioned over the matrix', () => {
    expect(rule('.mtr-legend')).not.toMatch(/position:\s*absolute/);
});

test('motion is limited to named properties, and is switched off when the reader asks for less', () => {
    expect(css).not.toMatch(/transition:\s*all/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
});

test('the theme text tokens keep at least 4.5:1 contrast on their backgrounds, in both themes', () => {
    const tokens = block => {
        const out = {};
        Array.from(block.matchAll(/(--mtr-[\w-]+):\s*(#[0-9A-Fa-f]{6})/g)).forEach(m => { out[m[1]] = m[2]; });
        return out;
    };
    const light = tokens(rule('.mtr-viz'));
    const dark = Object.assign({}, light, tokens(rule('.mtr-viz.dark')));
    const lum = hex => {
        const f = i => { const c = parseInt(hex.slice(i, i + 2), 16) / 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
        return 0.2126 * f(1) + 0.7152 * f(3) + 0.0722 * f(5);
    };
    const ratio = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
    [light, dark].forEach(t => {
        expect(ratio(t['--mtr-text'], t['--mtr-panel'])).toBeGreaterThanOrEqual(4.5);
        expect(ratio(t['--mtr-muted'], t['--mtr-panel'])).toBeGreaterThanOrEqual(4.5);
        expect(ratio(t['--mtr-muted'], t['--mtr-tip'])).toBeGreaterThanOrEqual(4.5);
        expect(ratio(t['--mtr-nodata-text'], t['--mtr-surface'])).toBeGreaterThanOrEqual(4.5);
        expect(ratio(t['--mtr-accent'], t['--mtr-tip'])).toBeGreaterThanOrEqual(4.5);
    });
});

test('the tile layout is gone', () => {
    expect(css).not.toMatch(/mtr-compact|mtr-short/);
});

test('declares custom properties', () => {
    expect(declared.length).toBeGreaterThan(10);
});

test('every custom property is prefixed with --mtr- (audit P2-11)', () => {
    declared.forEach(name => expect(name).toMatch(/^--mtr-/));
});

test('every var() refers to a declared property', () => {
    used.forEach(name => expect(declared).toContain(name));
});
