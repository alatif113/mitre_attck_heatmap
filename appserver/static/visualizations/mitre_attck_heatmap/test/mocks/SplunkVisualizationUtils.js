/*
 * Stand-in for Splunk's api/SplunkVisualizationUtils.
 *
 * escapeHtml is assumed to behave like underscore's _.escape (null/undefined
 * become ''). The legend-title fallback to the field name depends on that.
 */
const _ = require('underscore');

let theme = 'light';

module.exports = {
    escapeHtml: function(input) {
        return _.escape(input);
    },
    normalizeBoolean: function(value) {
        if (typeof value === 'boolean') return value;
        return ['true', '1', 'yes', 'on'].indexOf(String(value).trim().toLowerCase()) > -1;
    },
    getCurrentTheme: function() {
        return theme;
    },
    // Test-only helper.
    setTheme: function(value) {
        theme = value;
    }
};
