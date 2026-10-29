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

test.each(scenarios())('$fixture with $name renders identically', ({ fixture, options }) => {
    const data = loadFixture(fixture);
    const fromSource = render(Source, data, options).el.innerHTML;
    document.body.innerHTML = '';
    const fromBundle = render(Bundle, data, options).el.innerHTML;
    expect(fromBundle).toBe(fromSource);
});
