/*
 * What Dashboard Studio's bridge for classic custom visualizations does to a
 * drilldown payload, copied from its source (splunk-dashboard-studio 1.26.4,
 * custom-viz-iframe-scripts/legacy.js.map: src/IframeUtils/legacyDrilldown.ts).
 * Used to check that what the visualization sends turns into sensible tokens.
 */
function coerce(value) {
    if (Array.isArray(value)) return value.map(v => String(v));
    if (value && typeof value === 'object') return value;
    return String(value);
}

// Returns the tokens Studio would offer for a `fieldvalue` drilldown, or null if it would ignore it.
function studioFieldValueTokens(payload) {
    if (!payload || typeof payload !== 'object') return null;
    const data = payload.data;
    const valid = payload.action === 'fieldvalue' && data && typeof data === 'object' && Object.keys(data).length > 0;
    if (!valid) return null;
    const tokens = {};
    Object.keys(data).forEach(key => {
        tokens['row.' + key + '.value'] = coerce(data[key]);
    });
    return tokens;
}

module.exports = { studioFieldValueTokens };
