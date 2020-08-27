/*
 * Visualization source
 */
define([
    'jquery',
    'underscore',
    'api/SplunkVisualizationBase',
    'api/SplunkVisualizationUtils'
    // Add required assets to this list
],
function(
    $,
    _,
    SplunkVisualizationBase,
    vizUtils
) {

// Extend from SplunkVisualizationBase
return SplunkVisualizationBase.extend({

    initialize: function() {
        SplunkVisualizationBase.prototype.initialize.apply(this, arguments);
        this.$el = $(this.el);
        this.$el.addClass('mitre-container');
        this.colorMap = [
            { pct: 0, color: { r: 0x63, g: 0xbe, b: 0x7b } },
            { pct: 50, color: { r: 0xff, g: 0xd5, b: 0x84 } },
            { pct: 100, color: { r: 0xf8, g: 0x69, b: 0x6b } }
        ];
    },

    // Optionally implement to format data returned from search. 
    // The returned object will be passed to updateView as 'data'
    formatData: function(data) {
        if(data.results.length < 1){
            return false;
        }

        let fieldlist = [];
        data.fields.forEach(function(field) {
            fieldlist.push(field.name);
        }); 

        if(!(fieldlist.includes('id')) || !(fieldlist.includes('name')) || !(fieldlist.includes('tactic')) || !(fieldlist.includes('count')) || !(fieldlist.includes('description'))) {
            throw new SplunkVisualizationBase.VisualizationError(
                'Search results must have fields id, name, tactic, count, and description.'
            );
        }

        return data;
    },

    // Implement updateView to render a visualization.
    //  'data' will be the data object returned from formatData or from the search
    //  'config' will be the configuration property object
    updateView: function(data, config) {

        if (!data) return;

        this.$el.empty();

        let self = this;
        let colorMap = this.colorMap;
        let startColor = config[this.getPropertyNamespaceInfo().propertyNamespace + 'startColor'] || '#53a051';
        let midColor = config[this.getPropertyNamespaceInfo().propertyNamespace + 'midColor'] || '#f8be34';
        let endColor = config[this.getPropertyNamespaceInfo().propertyNamespace + 'endColor'] || '#dc4e41';
        let startVal = config[this.getPropertyNamespaceInfo().propertyNamespace + 'startVal'] || 0;
        let endVal = config[this.getPropertyNamespaceInfo().propertyNamespace + 'endVal'] || 100;

        colorMap[0].color = this._hexToRgb(startColor);
        colorMap[1].color = this._hexToRgb(midColor);
        colorMap[2].color = this._hexToRgb(endColor);

        let legendTitle = vizUtils.escapeHtml(config[this.getPropertyNamespaceInfo().propertyNamespace + 'legendTitle']);
        let sortKey = config[this.getPropertyNamespaceInfo().propertyNamespace + 'sortKey'] || 'id'; 
        let sortOrder = config[this.getPropertyNamespaceInfo().propertyNamespace + 'sortOrder'] || 'asc';
        
        let $content = $(`
            <div>
                <div class="mitre-col mitre-col-TA0001"></div>
                <div class="mitre-col mitre-col-TA0002"></div>
                <div class="mitre-col mitre-col-TA0003"></div>
                <div class="mitre-col mitre-col-TA0004"></div>
                <div class="mitre-col mitre-col-TA0005"></div>
                <div class="mitre-col mitre-col-TA0006"></div>
                <div class="mitre-col mitre-col-TA0007"></div>
                <div class="mitre-col mitre-col-TA0008"></div>
                <div class="mitre-col mitre-col-TA0009"></div>
                <div class="mitre-col mitre-col-TA0010"></div>
                <div class="mitre-col mitre-col-TA0011"></div>
                <div class="mitre-col mitre-col-TA0040"></div>
            </div>
        `);

        $colorMeter = $(`
            <div class="mitre-color-map">
                <div class="mitre-color-map-title">` + legendTitle + `</div>
                <div class="mitre-color-map-meter"></div>
                <div class="mitre-color-map-text">
                    <span class="mitre-color-map-start">` + startVal + `</span>
                    <span class="mitre-color-map-mid">` + (endVal - startVal)/2 + `</span>
                    <span class="mitre-color-map-end">` + endVal + `</span>
                </div>
            </div>
        `);

        let gradient = '(45deg, ' + startColor + ' 0%, ' + midColor + ' 50%, ' + endColor + ' 100%)';

        $colorMeter.find('.mitre-color-map-meter')
            .css('background', '-moz-linear-gradient' + gradient)
            .css('background', '-webkit-linear-gradient' + gradient)
            .css('background', 'linear-gradient' + gradient);

        data.results.forEach(function(r) {
            let id = vizUtils.escapeHtml(r.id);
            let name = vizUtils.escapeHtml(r.name);
            let count = vizUtils.escapeHtml(r.count);
            let description = vizUtils.escapeHtml(r.description);
            let col_class = '.mitre-col-' + r.tactic;
            let percent = this._getPercent(startVal, endVal, count); 
            let colorString = self._getColor(percent);
            let $cell = null;
            
            if(id == r.tactic) {
                $cell = $(`
                    <div class="mitre-tactic mitre-cell" id="` + id + `" count="` + count + `">
                        <div class="mitre-title">` + name + `</div>
                        <div class="mitre-meter">
                            <div class="mitre-meter-fill"></div>
                            <div class="mitre-count-container">
                                <div class="mitre-count">` + count + `</div>
                                <div class="mitre-desc">` + description + `</div>
                            </div>
                        </div>
                    </div>
                `); 

                $cell.prependTo($content.find(col_class));

            } else {
                $cell = $(`
                    <div class="mitre-technique mitre-cell" id="` + id + `" name="` + name + `" count="` + count + `">
                        <div class="mitre-title">` + id + `</div>
                        <div class="mitre-count-container">
                            <div class="mitre-name">` + name + `</div>
                            <div class="mitre-count">` + count + `</div>
                            <div class="mitre-desc">` + description + `</div>
                        </div>
                    </div>
                `);

                if(count) {
                    $cell.css('background-color', colorString);
                } else {
                    $cell.addClass('no-data');
                }

                $cell.appendTo($content.find(col_class));
            }

            $cell.click(function(e) {
                self._drilldown(id, e);
            });

        }, this);

        $content.children().each(function() {
            let upperBound = endVal * $('.mitre-technique', this).not('.no-data').size();
            let count = $('.mitre-tactic', this).attr('count');
            let percent = self._getPercent(startVal, upperBound, count); 
            let colorString = self._getColor(percent);
            $('.mitre-meter-fill', this).css('width', percent + '%').css('background-color', colorString);
    
            $elements = self._sortElements($(this).children('.mitre-technique'), sortKey, sortOrder);
            $(this).append($elements);
        })

        $content.appendTo(this.$el);
        $colorMeter.appendTo(this.$el);
    },

    // Search data params
    getInitialDataParams: function() {
        return ({
            outputMode: SplunkVisualizationBase.RAW_OUTPUT_MODE            
        });
    },
    
    // Override to respond to re-sizing events
    reflow: function() {

    },

    _getPercent: function(lowerBound, upperBound, value) {
        let percent = Math.round(100 * (value - lowerBound) / (upperBound - lowerBound));
        if (percent > 100) percent = 100;
        if (percent < 0) percent = 0;
        return percent;
    },

    _hexToRgb: function(h) {
        let r = 0, g = 0, b = 0;

        // 3 digits
        if (h.length == 4) {
            r = "0x" + h[1] + h[1];
            g = "0x" + h[2] + h[2];
            b = "0x" + h[3] + h[3];

        // 6 digits
        } else if (h.length == 7) {
            r = "0x" + h[1] + h[2];
            g = "0x" + h[3] + h[4];
            b = "0x" + h[5] + h[6];
        }
        
        return {r: r, g: g, b: b};
    },

    _getColor: function(percent) {
        for (var i = 1; i < this.colorMap.length - 1; i++) {
            if (percent < this.colorMap[i].pct) {
                break;
            }
        }

        let lower = this.colorMap[i - 1];
        let upper = this.colorMap[i];
        let range = upper.pct - lower.pct;
        let rangePct = (percent - lower.pct) / range;
        let pctLower = 1 - rangePct;
        let pctUpper = rangePct;
        let color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    },

    _sortElements: function($elements, key, order) {
        let flip = (order == 'asc') ? 1 : -1;

        return $elements.sort(function(a, b) {
            if (key == 'id' || key == 'name') {
                return flip * ($(a).attr(key) < $(b).attr(key) ? -1 : 1);
            }

            if (key == 'percent') {
                aVal = parseInt($(a).attr('count'));
                bVal = parseInt($(b).attr('count'));
                if (!aVal) aVal = -1;
                if (!bVal) bVal = -1;
                return flip * (aVal < bVal ? -1 : 1);
            }

            return 0;
        });
    },

    _drilldown: function(id, e) {
        this.drilldown({
            action: SplunkVisualizationBase.FIELD_VALUE_DRILLDOWN,
            data: {'id': id}
        }, e);
    }
    });
});