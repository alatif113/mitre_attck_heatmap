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

test('a cell has a minimum and a maximum width, depending on whether it shows the ID or the name', () => {
    expect(rule('.mtr-technique-container.mtr-display-id')).toMatch(/min-width:\s*4rem/);
    expect(rule('.mtr-technique-container.mtr-display-id')).toMatch(/max-width:\s*6\.5rem/);
    expect(rule('.mtr-technique-container.mtr-display-name')).toMatch(/min-width:\s*10rem/);
    expect(rule('.mtr-technique-container.mtr-display-name')).toMatch(/max-width:\s*16rem/);
});

test('a column is never narrower than one cell or its longest header word, so the matrix scrolls instead of squeezing', () => {
    expect(rule('.mtr-tactic-col')).toMatch(/min-width:\s*6\.5rem/);
    expect(rule('.mtr-tactic-col:has(.mtr-display-name)')).toMatch(/min-width:\s*10rem/);
});

test('centering does not cut off the left side when the matrix overflows', () => {
    expect(rule('.mtr-viz-container')).toMatch(/justify-content:\s*safe center/);
});

test('long tactic names wrap inside their column', () => {
    expect(rule('.mtr-tactic-title')).toMatch(/overflow-wrap:\s*anywhere/);
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
