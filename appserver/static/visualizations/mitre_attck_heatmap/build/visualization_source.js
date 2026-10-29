/*
 * Visualization source
 */
define([
    'jquery',
    'underscore',
    'api/SplunkVisualizationBase',
    'api/SplunkVisualizationUtils',
    'enterpriseAttack',
    'icsAttack',
    'mobileAttack',
    'd3fend',
    'heatmapLogic'
    // Add required assets to this list
],
function(
    $,
    _,
    SplunkVisualizationBase,
    vizUtils,
    enterpriseAttack,
    icsAttack,
    mobileAttack,
    d3fend,
    logic
) {

// Extend from SplunkVisualizationBase
return SplunkVisualizationBase.extend({

    initialize: function() {
        SplunkVisualizationBase.prototype.initialize.apply(this, arguments);
        this.$el = $(this.el);
        this.animate = false;
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

        // Each render starts its own animation loop; stop the previous one.
        window.cancelAnimationFrame(this._animationFrame);

        this.$el.empty();

        let self = this;
        let theme = vizUtils.getCurrentTheme();
        let options = logic.parseConfig(config, this.getPropertyNamespaceInfo().propertyNamespace, vizUtils, data.fields);
        let {
            animate, duration, startColor, midColor, endColor, startVal, endVal, display, legendTitle,
            sortKey, sortOrder, hideNull, showSubTechniques, showSearchBar, matrix, platform
        } = options;
        let matrixJSON = logic.selectMatrix(matrix, {
            enterprise: enterpriseAttack,
            ics: icsAttack,
            mobile: mobileAttack,
            d3fend: d3fend
        });

        self.animate = animate;

        this.$el.attr('class', '').addClass(theme);

        this.colorMap = logic.buildColorMap(startColor, midColor, endColor);

        let $searchbar = $(`
            <div class="mtr-search-container">
                <div class="splunk-textinput">
                    <label for="mtrSearchInput">Technique ID/Name</label>
                    <input id="mtrSearchInput" class="mtr-search-input" type="text"/>
                </div>
            </div>
        `);
        
        let $content = $(`<div class="mtr-viz-container"></div>`);

        let legendLabels = logic.legendLabels(startVal, endVal);
        let $legend = $(`
            <div class="mtr-legend">
                <div class="mtr-legend-title">` + legendTitle + `</div>
                <div class="mtr-legend-meter-container">    
                    <div class="mtr-legend-meter"></div>
                </div>
                <div class="mtr-legend-val">
                    <span>` + vizUtils.escapeHtml(String(legendLabels[0])) + `</span>
                    <span>` + vizUtils.escapeHtml(String(legendLabels[1])) + `</span>
                    <span>` + vizUtils.escapeHtml(String(legendLabels[2])) + `</span>
                </div>
            </div>
        `);

        let gradient = logic.legendGradient(startColor, midColor, endColor);

        $('.mtr-legend-meter', $legend)
            .css('background', '-moz-linear-gradient' + gradient)
            .css('background', '-webkit-linear-gradient' + gradient)
            .css('background', 'linear-gradient' + gradient);
        
        $legend.hover(function() {
            $('.mtr-legend-meter-container', this).append($(`<div class="mtr-legend-cursor"></div>`))
        }, function() {
            $('.mtr-legend-cursor').remove();
            $('.mtr-technique').removeClass('focused').removeClass('defocused');
        })

        let lastMove = 0;
        let eventThrottle = 100;
        
        $legend.mousemove(function(e) {
            e.preventDefault();
            let now = Date.now();
            if (now > lastMove + eventThrottle) {
                let $cursor = $('.mtr-legend-cursor', this);
                let cursor_width = $cursor.width();
                let legend_width = $(this).width();
                let x = e.pageX - $(this).offset().left;
                let range = logic.legendCursorRange(x, cursor_width, legend_width, startVal, endVal);
                if (range) {
                    $cursor.css('left', range.left + 'px');
                    self._setAnimationClass(range.lower, range.upper);
                };
            }
        })

        matrixJSON.tactics.forEach(function(tactic) {
            let $tactic_col = $(`<div class="mtr-tactic-col" data-id="${tactic.id}" data-name="${tactic.name}" data-tactic="${tactic.short_name}">`);
            $tactic_col.appendTo($content).append(`
                    <div class="mtr-tactic">
                        <div class="mtr-tactic-title">${tactic.name}</div>
                        <div class="mtr-meter-container">
                            <div class="mtr-meter-fill"></div>
                        </div>
                        <div class="grid-wrapper">
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
                    <div class="mtr-technique-col"></div>
            `);
        })

        matrixJSON.techniques.forEach(function(technique) {
            if (!logic.isOnPlatform(technique, platform)) return;

            let title = (display == 'id') ?  technique.id : technique.name;
            let $technique = $(`
                <div class="mtr-technique-container mtr-display-${display}" data-id="${technique.id}">
                    <div class="mtr-technique" data-id="${technique.id}" data-name="${technique.name}" data-url="${technique.url}">
                        <span>${title}</span>
                    </div>
                    <div class="mtr-sub-technique-container mtr-display-${display}"></div>
                </div>
            `);

            technique.tactics.forEach(function(tactic) {
                $technique.clone().prependTo($(`.mtr-tactic-col[data-tactic="${tactic}"] .mtr-technique-col`, $content));
            });
        })

        if (showSubTechniques) {
            matrixJSON.sub_techniques.forEach(function(sub_technique) {
                if (!logic.isOnPlatform(sub_technique, platform)) return;

                let title = (display == 'id') ?  sub_technique.short_id : sub_technique.name;
                $(`.mtr-technique-container[data-id="${sub_technique.technique}"]`, $content).each(function() {
                    $('.mtr-sub-technique-container', $(this)).append(`
                        <div class="mtr-sub-technique mtr-display-${display}" data-id="${sub_technique.id}" data-name="${sub_technique.name}" data-url="${sub_technique.url}">
                            <span>${title}</span>
                        </div>
                    `);
                });
            })
        }

        data.rows.forEach(function(r) {
            let { id, count, description } = logic.parseRow(r, vizUtils.escapeHtml);
            let $technique = $(`.mtr-technique[data-id="${id}"], .mtr-sub-technique[data-id="${id}"]`, $content)

            if (!logic.isValidCount(count)) return;

            let percent = self._getPercent(startVal, endVal, count);
            let color = self._getColor(percent);

            percent = logic.visiblePercent(percent);

            $technique.attr('data-value', count);
            $technique.attr('data-percent', percent);
            $technique.attr('data-desc', description);
            $technique
                .css('background', color.background)
                .css('color', color.foreground);
        });

        $('.mtr-technique, .mtr-sub-technique', $content).hover(function(e) {
            
            let id = $(this).attr('data-id');
            let name = $(this).attr('data-name');
            let percent = parseInt($(this).attr('data-percent')) || '';
            let description = $(this).attr('data-desc') || '';
            let value = parseInt($(this).attr('data-value')) || '';
            let url = $(this).attr('data-url') || '';
            let color = self._getColor(percent);

            percent = logic.visiblePercent(percent);

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
                    <div class="mtr-ref"><a target="_blank" href="${url}">${url} <i class="icon-external"></i></a></div>
                </div>
            `);

            $tooltip.addClass('mtr-technique-tooltip-' + logic.tooltipSide($(this).offset().left, $(window).width()));

            $('.mtr-desc', $tooltip).append(logic.formatDescription(description));

            $('.more-link', $tooltip).click(function(){
                $('.more-elipses', $tooltip).hide();
                $('.more-content', $tooltip).show();
                $('.more-link', $tooltip).hide();
                return false;
            });

            $tooltip.appendTo($(this));

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
            let values = [];
            $('.mtr-technique', this).each(function() {

                let val = $(this).attr('data-value');

                if (!val && hideNull) {
                    $(this).parent().remove();
                    return;
                }

                values.push(val);
            });

            let { sum, count, total, mean, coverage } = logic.tacticStats(values);

            if (total == 0 && hideNull) {
                $(this).remove();
                return
            }

            let percent = self._getPercent(startVal, endVal, mean);
            let color = self._getColor(percent);

            percent = logic.visiblePercent(percent);

            $(this).attr('data-value', sum);
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

        $('.mtr-sub-technique', $content).each(function() {
            let val = $(this).attr('data-value');
            if (hideNull && isNaN(val)) {
                $(this).remove();
            }
        });

        $(`.mtr-technique, .mtr-sub-technique, .mtr-tactic`, $content).each(function() {
            $(this).click(function(e) {
                let $tactic_col = $(this).closest('.mtr-tactic-col');
                let $technique_container = $(this).closest('.mtr-technique-container');
                let $technique = $('.mtr-technique', $technique_container);
                let $sub_technique = $(this).closest('.mtr-sub-technique');
                let drilldown_data = {}

                drilldown_data['mtr_sub-technique_id'] = $sub_technique.attr('data-id');
                drilldown_data['mtr_technique_id'] = $technique.attr('data-id');
                drilldown_data['mtr_tactic_id'] = $tactic_col.attr('data-id');
                drilldown_data['mtr_sub-technique_name'] = $sub_technique.attr('data-name');
                drilldown_data['mtr_technique_name'] = $technique.attr('data-name');
                drilldown_data['mtr_tactic_name'] = $tactic_col.attr('data-name');
                drilldown_data['mtr_sub-technique_value'] = $sub_technique.attr('data-value');
                drilldown_data['mtr_technique_value'] = $technique.attr('data-value');
                drilldown_data['mtr_tactic_value'] = $tactic_col.attr('data-value');
                // Clicking a tactic has always also supplied the tactic name as mtr_tactic.
                if ($(this).hasClass('mtr-tactic')) {
                    drilldown_data['mtr_tactic'] = $tactic_col.attr('data-name');
                }
                self._drilldown(drilldown_data, e);
            });
        });

        $('.mtr-technique-col', $content).each(function() {
            self._sortElements($(this), sortKey, sortOrder);
            $(this).append(`
                <div class="mtr-technique-container mtr-placeholder mtr-display-${display}">
                    <div class="mtr-technique mtr-display-${display}">
                        <div class="mtr-technique-title">T0000</div>
                    </div>
                </div>
                <div class="mtr-technique-container mtr-placeholder mtr-display-${display}">
                    <div class="mtr-technique mtr-placeholder mtr-display-${display}">
                        <div class="mtr-technique-title">T0000</div>
                    </div>
                </div>
            `);
        });

        if (showSearchBar) {
            $('input', $searchbar).on('change', function() {
                let value = vizUtils.escapeHtml(this.value).toLowerCase();
                if(value == '' || value == null) {
                    $('.mtr-technique', $content).removeClass('focused').removeClass('defocused');
                } else {
                    $('.mtr-technique', $content).removeClass('focused').addClass('defocused');
                    let $matched = $('.mtr-technique', $content).filter(function() {
                        return logic.matchesSearch($(this).attr('data-id'), $(this).attr('data-name'), value);
                    });
                    $matched.removeClass('defocused').addClass('focused');
                }
            });

            $searchbar.appendTo(this.$el);
        }
        $content.appendTo(this.$el);
        $legend.appendTo(this.$el);

        if (self.animate) {
            let steps = logic.animationSteps(startVal, endVal, duration);
            let currStep = 0;

            function step() {
                let frame = logic.animationFrame(currStep, steps, endVal);

                self._setAnimationClass(frame.lower, frame.upper);
                currStep = frame.next;
                if (self.animate) {
                    self._animationFrame = window.requestAnimationFrame(step);
                } else {
                    $('.mtr-technique').removeClass('focused').removeClass('defocused');
                }
            }
            self._animationFrame = window.requestAnimationFrame(step);
        }
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

    _setAnimationClass: function(lower, upper) {
        $('.mtr-technique').each(function() {
            if (logic.inFocusRange($(this).attr('data-value'), lower, upper)) {
                $(this).addClass('focused').removeClass('defocused');
            } else {
                $(this).removeClass('focused').addClass('defocused');
            }
        })
    },

    _getPercent: function(lowerBound, upperBound, value) {
        return logic.getPercent(lowerBound, upperBound, value);
    },

    _getColor: function(percent) {
        return logic.getColor(percent, this.colorMap);
    },

    _sortElements: function($container, key, order) {
        let $children = $container.children().sort(function(a, b) {
            let $t1 = $('.mtr-technique', $(a));
            let $t2 = $('.mtr-technique', $(b));
            return logic.compareByKey(key, order, $t1.attr(key), $t2.attr(key));
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
