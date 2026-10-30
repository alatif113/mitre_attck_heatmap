/*
 * visualization.css is injected into the whole Splunk page, so what it
 * defines at :root must not collide with other styles.
 */
const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, '../visualization.css'), 'utf8');
const declared = Array.from(css.matchAll(/^\s*(--[\w-]+)\s*:/gm)).map(m => m[1]);
const used = Array.from(css.matchAll(/var\((--[\w-]+)/g)).map(m => m[1]);

test('the compact layout rules are all under .mtr-compact, so wider panels are untouched', () => {
    const selectors = Array.from(css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{/g)).map(m => m[1].trim()).filter(s => /mtr-compact|mtr-short/.test(s));
    expect(selectors.length).toBeGreaterThan(5);
    selectors.forEach(selector => selector.split(',').forEach(part => expect(part.trim()).toMatch(/^\.mtr-compact/)));
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
