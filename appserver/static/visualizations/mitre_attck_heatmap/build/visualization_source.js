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
        if(data.rows.length < 1) {
            return false;
        }

        console.log(data);

        if(data.rows[0].length < 2) {
            throw new SplunkVisualizationBase.VisualizationError(
                'Search results must have at least 2 fields: id, count'
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
        let mitre_url_prefix = 'https://attack.mitre.org/techniques/';
        let colorMap = this.colorMap;
        let theme = config[this.getPropertyNamespaceInfo().propertyNamespace + 'theme'] || 'light';
        let startColor = config[this.getPropertyNamespaceInfo().propertyNamespace + 'startColor'] || '#53a051';
        let midColor = config[this.getPropertyNamespaceInfo().propertyNamespace + 'midColor'] || '#f8be34';
        let endColor = config[this.getPropertyNamespaceInfo().propertyNamespace + 'endColor'] || '#dc4e41';
        let startVal = config[this.getPropertyNamespaceInfo().propertyNamespace + 'startVal'] || 0;
        let endVal = config[this.getPropertyNamespaceInfo().propertyNamespace + 'endVal'] || 100;
        let display = config[this.getPropertyNamespaceInfo().propertyNamespace + 'display'] || 'id';
        let legendTitle = vizUtils.escapeHtml(config[this.getPropertyNamespaceInfo().propertyNamespace + 'legendTitle']);
        let sortKey = config[this.getPropertyNamespaceInfo().propertyNamespace + 'sortKey'] || 'data-id'; 
        let sortOrder = config[this.getPropertyNamespaceInfo().propertyNamespace + 'sortOrder'] || 'asc';

        this.$el.attr('class', '').addClass(theme);

        colorMap[0].color = this._hexToRgb(startColor);
        colorMap[1].color = this._hexToRgb(midColor);
        colorMap[2].color = this._hexToRgb(endColor);
        
        let $content = $(`<div class="mtr-viz-container"></div>`);

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
            $tactic_col = $(`<div class="mtr-tactic-col" data-name="${tactic.name}" data-tactic="${tactic.short_name}">`);
            $tactic_col.appendTo($content).append(`
                    <div class="mtr-tactic">
                        <div class="mtr-tactic-title">${tactic.name}</div>
                        <div class="mtr-meter-container">
                            <div class="mtr-meter-fill">
                                <div class="mtr-stats-container">
                                    <div class="mtr-total mtr-stat">
                                        <div class="mtr-stats-label">Total</div>
                                        <div class="mtr-stats-val"></div>
                                    </div>
                                    <div class="mtr-count mtr-stat">
                                        <div class="mtr-stats-label">Unique Techniques</div>
                                        <div class="mtr-stats-val"></div>
                                    </div>
                                    <div class="mtr-mean mtr-stat">
                                        <div class="mtr-stats-label">Average per Technique</div>
                                        <div class="mtr-stats-val"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mtr-technique-col"></div>
            `);

            $('.mtr-tactic-title', $content).click(function(e) {
                drilldown_data = {mtr_tactic: $(this).parents('.mtr-tactic-col').attr('data-name')};
                self._drilldown(drilldown_data, e);    
            })
        })

        enterpriseAttack.techniques.forEach(function(technique) {
            let title = (display == 'id') ?  technique.id : technique.name;
            let $technique = $(`
                <div class="mtr-technique mtr-display-${display}" data-id="${technique.id}" data-name="${technique.name}" data-value="" data-percent="" data-desc=""><span>${title}</span></div>
            `);

            technique.tactics.forEach(function(tactic) {
                $technique.clone().prependTo($(`.mtr-tactic-col[data-tactic="${tactic}"] .mtr-technique-col`, $content));
            });
        })

        data.rows.forEach(function(r) {
            let id = vizUtils.escapeHtml(r[0]);
            let count = vizUtils.escapeHtml(r[1]);
            let $technique = $(`.mtr-technique[data-id="${id}"]`, $content)

            $technique.click(function(e) {
                drilldown_data = {}
                r.forEach((d, i) => { drilldown_data[data.fields[i].name] = d })
                drilldown_data['mtr_name'] = $(this).attr('data-name');
                drilldown_data['mtr_tactic'] = $(this).parents('.mtr-tactic-col').attr('data-name');
                self._drilldown(drilldown_data, e);
            });

            if (!$technique || count == '' || count == null || isNaN(count)) return;

            let percent = self._getPercent(startVal, endVal, count); 
            let color = self._getColor(percent);
            let description = vizUtils.escapeHtml(r[2]) || "";

            if(percent < 2) percent = 2;
            
            $technique.attr('data-value', count);
            $technique.attr('data-percent', percent);
            $technique.attr('data-desc', description);
            $technique
                .css('background', color.background)
                .css('color', color.foreground);
        });

        $('.mtr-technique', $content).hover(function() {
            let id = $(this).attr('data-id');
            let name = $(this).attr('data-name');
            let percent = parseInt($(this).attr('data-percent'));
            let description = $(this).attr('data-desc');
            let value = parseInt($(this).attr('data-value')) || '';
            let color = self._getColor(percent);

            if(percent < 2) percent = 2;

            let $tooltip = $(`
                <div class="mtr-technique-tooltip">
                    <div class="mtr-id">${id}</div>
                    <div class="mtr-name">${name}</div>
                    <div class="mtr-meter-container">
                        <div class="mtr-meter-fill"></div>
                    </div>
                    <div class="mtr-label"></div>
                    <div class="mtr-val">${value}</div>
                    <div class="mtr-desc"></div>
                    <div class="mtr-ref"><a target="_blank" href="${mitre_url_prefix}${id}">${mitre_url_prefix}${id} <i class="icon-external"></i></a></div>
                </div>
            `);

            if ($(this).offset().left > $(window).width() - 400) {
                $tooltip.addClass('mtr-technique-tooltip-left');
            } else {
                $tooltip.addClass('mtr-technique-tooltip-right');
            }

            $('.mtr-desc', $tooltip).append('<p>' + description.split('\\n').join('</p><p>') + '</p>');
            $tooltip.appendTo($(this)).animate({opacity: 1}, 200, 'linear');

            if (value) {
                $('.mtr-label', $tooltip).text(data.fields[1].name);
                $('.mtr-meter-fill', $tooltip)
                    .css('background', color.background)
                    .animate({width: $(this).attr('data-percent') + '%'}, 50, 'linear');
                if (color.luminance < 0.1) {
                    $('.mtr-meter-container', $tooltip).addClass('dark');
                }
            }
        }, function() {
            $('.mtr-technique-tooltip').remove();
        });

        $('.mtr-tactic-col', $content).each(function() {
            let sum = 0;
            let count = 0;
            let total = 0;
            $('.mtr-technique', this).each(function() {
                total += 1;
                let val = $(this).attr('data-value');
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
            let color = self._getColor(percent);

            if(percent < 2) percent = 2;

            $('.mtr-tactic .mtr-meter-fill', this)
                .css('background', color.background)
                .css('color', color.foreground)
                .css('width', percent + '%');
            $('.mtr-tactic .mtr-stat', this)
                .css('background', color.background)
                .css('color', color.foreground)
                .css('border-color', color.foreground);
            $('.mtr-tactic .mtr-total .mtr-stats-val', this).text(sum.toLocaleString());
            $('.mtr-tactic .mtr-count .mtr-stats-val', this).text(count.toLocaleString() + ` (${coverage}%)`);
            $('.mtr-tactic .mtr-mean .mtr-stats-val', this).text(mean.toLocaleString());
        });

        $('.mtr-technique-col', $content).each(function() {
            self._sortElements($(this), sortKey, sortOrder);
            $(this).append(`
                <div class="mtr-technique mtr-placeholder mtr-display-${display}">
                    <div class="mtr-technique-title">T0000</div>
                </div>
                <div class="mtr-technique mtr-placeholder mtr-display-${display}">
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
            outputMode: SplunkVisualizationBase.ROW_MAJOR_OUTPUT_MODE            
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

        let luminance = ( 0.299 * color.r + 0.587 * color.g + 0.114 * color.b)/255;
        let foreground = (luminance > 0.65) ? 'rgb(0,0,0)' : 'rgb(255,255,255)';

        return {
            background: 'rgb(' + [color.r, color.g, color.b].join(',') + ')',
            luminance: luminance,
            foreground: foreground
        }
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
                if (!Number.isInteger(aVal)) aVal = -1;
                if (!Number.isInteger(bVal)) bVal = -1;
                return flip * (aVal < bVal ? -1 : 1);
            }

            return 0;
        });
        $container.append($children);
    },

    _drilldown: function(data, e) {
        this.drilldown({
            action: SplunkVisualizationBase.FIELD_VALUE_DRILLDOWN,
            data: data
        }, e);
    }
    });
});
