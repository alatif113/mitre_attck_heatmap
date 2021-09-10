/*
 * Visualization source
 */
define([
    'jquery',
    'underscore',
    'api/SplunkVisualizationBase',
    'api/SplunkVisualizationUtils',
    'enterpriseAttack'
    // Add required assets to this list
],
function(
    $,
    _,
    SplunkVisualizationBase,
    vizUtils,
    enterpriseAttack
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

        if(!(fieldlist.includes('id')) || !(fieldlist.includes('name')) || !(fieldlist.includes('tactic')) || !(fieldlist.includes('count'))) {
            throw new SplunkVisualizationBase.VisualizationError(
                'Search results must have fields id, name, tactic, and count'
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
        let sortKey = config[this.getPropertyNamespaceInfo().propertyNamespace + 'sortKey'] || 'data-id'; 
        let sortOrder = config[this.getPropertyNamespaceInfo().propertyNamespace + 'sortOrder'] || 'asc';
        
        let $content = $(`
        <div class="mtr-viz-container"></div>
        `);

        $colorMeter = $(`
            <div class="mtr-legend">
                <div class="mtr-legend-title">` + legendTitle + `</div>
                <div class="mtr-legend-meter"></div>
                <div class="mtr-legend-val">
                    <span>` + startVal + `</span>
                    <span>` + (endVal - startVal)/2 + `</span>
                    <span>` + endVal + `</span>
                </div>
            </div>
        `);

        let gradient = '(45deg, ' + startColor + ' 0%, ' + midColor + ' 50%, ' + endColor + ' 100%)';

        $colorMeter.find('.mtr-legend-meter')
            .css('background', '-moz-linear-gradient' + gradient)
            .css('background', '-webkit-linear-gradient' + gradient)
            .css('background', 'linear-gradient' + gradient);

        enterpriseAttack.tactics.forEach(function(tactic) {
            $tactic_col = $(`<div class="mtr-tactic-col" data-tactic="${tactic.short_name}">`);
            $tactic_col.appendTo($content).append(`
                    <div class="mtr-tactic">
                        <div class="mtr-tactic-title">${tactic.name}</div>
                        <div class="mtr-meter-container">
                            <div class="mtr-meter-fill">
                                <div class="mtr-stats-container">
                                    <div class="mtr-total mtr-stat">
                                        <div class="mtr-stats-label">Total</div>
                                        <div class="mtr-stats-val">12345</div>
                                    </div>
                                    <div class="mtr-count mtr-stat">
                                        <div class="mtr-stats-label">Unique Techniques</div>
                                        <div class="mtr-stats-val">12</div>
                                    </div>
                                    <div class="mtr-mean mtr-stat">
                                        <div class="mtr-stats-label">Average per Techniques</div>
                                        <div class="mtr-stats-val">543</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mtr-technique-col"></div>
            `);
        })

        enterpriseAttack.techniques.forEach(function(technique) {
            let $technique = $(`
                <div class="mtr-technique" data-id="${technique.id}" data-value="">
                    <div class="mtr-technique-title">${technique.id}</div>
                    <div class="mtr-technique-tooltip">
                        <div class="mtr-id">${technique.id}</div>
                        <div class="mtr-name">${technique.name}</div>
                        <div class="mtr-val"></div>
                        <div class="mtr-desc"></div>
                    </div>
                </div>
            `);

            technique.tactics.forEach(function(tactic) {
                $technique.clone().prependTo($(`.mtr-tactic-col[data-tactic="${tactic}"] .mtr-technique-col`, $content));
            });

            $technique.click(function(e) {
                self._drilldown(id, e);
            });
        })

        data.results.forEach(function(r) {
            let id = vizUtils.escapeHtml(r.id);
            let count = vizUtils.escapeHtml(r.count);
            let percent = self._getPercent(startVal, endVal, count); 
            let description = vizUtils.escapeHtml(r.description);
            let colorString = self._getColor(percent);

            description = '<p>' + description.split('\\n').join('</p><p>') + '</p>';

            let $technique = $(`.mtr-technique[data-id="${id}"]`, $content)
            
            $technique.attr('data-value', count);
            $('.mtr-val', $technique).text(count);
            $('.mtr-desc', $technique).html(description);
            $('.mtr-desc p', $technique).addClass('mtr-desc-p');

            if (count) {
                $('.mtr-technique-title', $technique).css('background', colorString);
            } else {
                $('.mtr-technique-title', $technique).addClass('mtr-null-val');
            }

        });

        $('.mtr-tactic-col', $content).each(function() {
            let sum = 0;
            let count = 0;
            let total = 0;
            $('.mtr-val', this).each(function() {
                total += 1;
                let val = $(this).text();
                if (val && !isNaN(val)) {
                    sum += +val;
                    count += 1;
                }
            });
            let mean = Math.round(sum / count);
            let coverage = Math.round(count / total * 100);
            if (!mean) mean = 0;
            if (!coverage) coverage = 0;

            let percent = self._getPercent(startVal, endVal, mean); 
            let colorString = self._getColor(percent);

            $('.mtr-meter-fill', this).css('background', colorString).css('width', percent + '%');
            $('.mtr-stat', this).css('background', colorString);
            $('.mtr-total .mtr-stats-val', this).text(sum.toLocaleString());
            $('.mtr-count .mtr-stats-val', this).text(count.toLocaleString() + ` (${coverage}%)`);
            $('.mtr-mean .mtr-stats-val', this).text(mean.toLocaleString());
        });

        $('.mtr-technique-col', $content).each(function() {
            self._sortElements($(this), sortKey, sortOrder);
            $(this).append(`
                <div class="mtr-technique mtr-placeholder">
                    <div class="mtr-technique-title">T0000</div>
                </div>
                <div class="mtr-technique mtr-placeholder">
                    <div class="mtr-technique-title">T0000</div>
                </div>
            `);
        });

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

    _sortElements: function($container, key, order) {
        let flip = (order == 'asc') ? 1 : -1;
        $children = $container.children().sort(function(a, b) {
            if (key == 'data-id' || key == 'data-name') {
                return flip * ($(a).attr(key) < $(b).attr(key) ? -1 : 1);
            }

            if (key == 'data-value') {
                aVal = parseInt($(a).attr(key));
                bVal = parseInt($(b).attr(key));
                if (!aVal) aVal = -1;
                if (!bVal) bVal = -1;
                return flip * (aVal < bVal ? -1 : 1);
            }

            return 0;
        });
        $container.append($children);
    },

    _drilldown: function(id, e) {
        this.drilldown({
            action: SplunkVisualizationBase.FIELD_VALUE_DRILLDOWN,
            data: {'id': id}
        }, e);
    }
    });
});