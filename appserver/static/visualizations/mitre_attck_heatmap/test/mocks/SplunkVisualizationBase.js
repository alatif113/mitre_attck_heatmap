/*
 * Minimal stand-in for Splunk's api/SplunkVisualizationBase. Only the surface
 * the heatmap uses is implemented. Drilldown calls are recorded on the
 * instance so tests can assert on them.
 */
const NAMESPACE = 'display.visualizations.custom.mitre_attck_heatmap.mitre_attck_heatmap.';

function SplunkVisualizationBase(el) {
    this.el = el;
    this.drilldowns = [];
    this.initialize.apply(this, arguments);
}

SplunkVisualizationBase.prototype.initialize = function() {};

SplunkVisualizationBase.prototype.getPropertyNamespaceInfo = function() {
    return { propertyNamespace: NAMESPACE };
};

SplunkVisualizationBase.prototype.drilldown = function(payload, e) {
    this.drilldowns.push(payload);
};

// Backbone's View#remove: detach the element.
SplunkVisualizationBase.prototype.remove = function() {
    if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
    return this;
};

SplunkVisualizationBase.extend = function(proto) {
    const Parent = this;
    function Child() {
        Parent.apply(this, arguments);
    }
    Child.prototype = Object.create(Parent.prototype);
    Object.assign(Child.prototype, proto);
    Child.prototype.constructor = Child;
    Child.extend = Parent.extend;
    return Child;
};

SplunkVisualizationBase.VisualizationError = class VisualizationError extends Error {};
SplunkVisualizationBase.ROW_MAJOR_OUTPUT_MODE = 'json_rows';
SplunkVisualizationBase.FIELD_VALUE_DRILLDOWN = 'fieldvalue';
SplunkVisualizationBase.NAMESPACE = NAMESPACE;

module.exports = SplunkVisualizationBase;
