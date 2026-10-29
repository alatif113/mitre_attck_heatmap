/*
 * The shipped visualization.js must render exactly what build/ renders.
 * Fails when the source changed but the bundle wasn't rebuilt (or the build
 * toolchain changed output).
 */
const $ = require('jquery');
const Source = require('../build/visualization_source.js');
const Bundle = require('../visualization.js');
const { render, loadFixture } = require('./support/render');
const { scenarios } = require('./support/scenarios');

beforeAll(() => {
    $.fx.off = true;
});

afterEach(() => {
    document.body.innerHTML = '';
});

test('the visualization declares no functions inside blocks, which the minified bundle would hoist differently', () => {
    // The bundle runs in sloppy mode but the minifier assumes strict mode, so a
    // block-level function declaration can be renamed onto another variable.
    const source = require('fs').readFileSync(require('path').join(__dirname, '../build/visualization_source.js'), 'utf8');
    expect(source.match(/^\s*function\s+\w+\s*\(/gm) || []).toEqual([]);
});

test('the bundle does not include Underscore, which the visualization does not use (audit P2-10)', () => {
    const text = require('fs').readFileSync(require('path').join(__dirname, '../visualization.js'), 'utf8');
    expect(text).not.toContain('Underscore.js');
    expect(text.split('\n').length).toBeLessThan(12000);
});

test.each(scenarios())('$fixture with $name renders identically', ({ fixture, options }) => {
    const data = loadFixture(fixture);
    const fromSource = render(Source, data, options).el.innerHTML;
    document.body.innerHTML = '';
    const fromBundle = render(Bundle, data, options).el.innerHTML;
    expect(fromBundle).toBe(fromSource);
});
