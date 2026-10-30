/*
 * Helpers for rendering the visualization into jsdom.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const SplunkVisualizationBase = require('api/SplunkVisualizationBase');

const NAMESPACE = SplunkVisualizationBase.NAMESPACE;
const SAVEDSEARCHES = path.resolve(__dirname, '../../../../../../default/savedsearches.conf');

// The [default] stanza of savedsearches.conf, which is what Splunk passes to
// updateView when a user hasn't changed any format options.
function confDefaults() {
    const config = {};
    fs.readFileSync(SAVEDSEARCHES, 'utf8').split('\n').forEach(function(line) {
        const match = line.match(/^(display\.visualizations\.custom\.\S+)\s*=\s?(.*)$/);
        if (match) config[match[1]] = match[2].trim();
    });
    return config;
}

// Short option names (e.g. { matrix: 'ics::' }) layered over the conf defaults.
function buildConfig(options) {
    const config = confDefaults();
    Object.keys(options || {}).forEach(function(key) {
        config[NAMESPACE + key] = options[key];
    });
    return config;
}

function createViz(Viz) {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const viz = new Viz(el);
    // Tooltips open at once in tests; in a browser the first one waits a moment. The entrance
    // (fade and count-up) is off, so tests don't leave a frame loop running; renderAnimated turns it on.
    viz._tooltipDelay = 0;
    viz._entrance = false;
    return viz;
}

// Runs the same formatData -> updateView sequence Splunk does.
function render(Viz, data, options) {
    const viz = createViz(Viz);
    const config = buildConfig(options);
    viz.updateView(viz.formatData(data, config), config);
    return viz;
}

// Like render, with the first-render fade and count-up that a browser shows.
function renderAnimated(Viz, data, options) {
    const viz = createViz(Viz);
    viz._entrance = true;
    const config = buildConfig(options);
    viz.updateView(viz.formatData(data, config), config);
    return viz;
}

function sha256(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
}

// A compact, reviewable description of a render plus a hash of the exact
// HTML, so snapshots catch any markup change without storing megabytes.
function summarize(viz) {
    const root = viz.el;
    const text = function(node, selector) {
        const found = node.querySelector(selector);
        return found ? found.textContent : null;
    };
    const real = ':not(.mtr-placeholder)';
    return {
        htmlSha256: sha256(root.innerHTML),
        htmlLength: root.innerHTML.length,
        theme: root.className,
        hasSearchBar: !!root.querySelector('.mtr-search-container'),
        legend: root.querySelector('.mtr-legend') ? {
            title: text(root, '.mtr-legend-title'),
            labels: Array.from(root.querySelectorAll('.mtr-band-edge')).map(s => s.textContent)
        } : null,
        tactics: Array.from(root.querySelectorAll('.mtr-tactic-col')).map(function(col) {
            const techniques = col.querySelectorAll('.mtr-technique-container' + real + ' > .mtr-technique');
            return {
                id: col.getAttribute('data-id'),
                value: col.getAttribute('data-value'),
                techniques: techniques.length,
                withValue: col.querySelectorAll('.mtr-technique[data-value]').length,
                subTechniques: col.querySelectorAll('.mtr-sub-technique').length,
                stats: [text(col, '.mtr-total .mtr-stats-val'), text(col, '.mtr-count .mtr-stats-val'), text(col, '.mtr-mean .mtr-stats-val')],
                firstTechniques: Array.from(techniques).slice(0, 3).map(t => t.getAttribute('data-id'))
            };
        })
    };
}

function loadFixture(name) {
    return require(path.join(__dirname, '../fixtures', name));
}

module.exports = { NAMESPACE, buildConfig, createViz, render, renderAnimated, summarize, loadFixture };
