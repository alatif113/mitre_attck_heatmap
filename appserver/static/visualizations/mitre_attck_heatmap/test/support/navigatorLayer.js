/*
 * Checks a layer against the rules of ATT&CK Navigator layer format 4.5
 * (https://github.com/mitre-attack/attack-navigator/blob/master/layers/spec/v4.5/layerformat.md):
 * required fields, domain values, version constraints, technique and
 * gradient shapes. Returns a list of problems; empty means valid.
 */
const DOMAINS = ['enterprise-attack', 'mobile-attack', 'ics-attack'];

function atLeast(version, minimum) {
    const a = version.split('.').map(Number);
    const b = minimum.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
        if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0);
    }
    return true;
}

function validateLayer(layer) {
    const problems = [];
    const check = (condition, message) => { if (!condition) problems.push(message); };

    check(typeof layer.name === 'string' && layer.name.length > 0, 'name must be a non-empty string');
    check(DOMAINS.includes(layer.domain), 'domain must be one of ' + DOMAINS.join(', '));

    const versions = layer.versions || {};
    check(typeof versions.navigator === 'string' && atLeast(versions.navigator, '4.9.0'), 'versions.navigator must be a string of at least 4.9.0');
    check(versions.layer === '4.5', 'versions.layer must be "4.5"');
    check(versions.attack === undefined || (typeof versions.attack === 'string' && versions.attack !== ''), 'versions.attack must be a non-empty string when present');

    if (layer.filters !== undefined) {
        check(Array.isArray(layer.filters.platforms) && layer.filters.platforms.every(p => typeof p === 'string'), 'filters.platforms must be an array of strings');
    }

    check(Array.isArray(layer.techniques), 'techniques must be an array');
    (layer.techniques || []).forEach(t => {
        check(/^T\d{4}(\.\d{3})?$/.test(t.techniqueID), 'bad techniqueID ' + t.techniqueID);
        check(t.score === undefined || typeof t.score === 'number', 'score must be a number');
        check(t.color === undefined || /^#[0-9a-f]{6}$/i.test(t.color), 'color must be #rrggbb');
        check(t.comment === undefined || typeof t.comment === 'string', 'comment must be a string');
        check(t.enabled === undefined || typeof t.enabled === 'boolean', 'enabled must be a boolean');
        check(t.showSubtechniques === undefined || typeof t.showSubtechniques === 'boolean', 'showSubtechniques must be a boolean');
        check(t.tactic === undefined || typeof t.tactic === 'string', 'tactic must be a string');
    });
    const ids = (layer.techniques || []).map(t => t.techniqueID);
    check(new Set(ids).size === ids.length, 'techniqueIDs must be unique');

    if (layer.gradient !== undefined) {
        const g = layer.gradient;
        check(Array.isArray(g.colors) && g.colors.length >= 2 && g.colors.every(c => /^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(c)), 'gradient.colors needs at least two hex colors');
        check(typeof g.minValue === 'number' && typeof g.maxValue === 'number' && g.maxValue > g.minValue, 'gradient needs numeric minValue < maxValue');
    }
    if (layer.legendItems !== undefined) {
        check(Array.isArray(layer.legendItems) && layer.legendItems.every(i => typeof i.label === 'string' && /^#[0-9a-f]{6}$/i.test(i.color)), 'legendItems need a label and a color');
    }
    return problems;
}

module.exports = { validateLayer };
