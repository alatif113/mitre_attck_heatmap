/*
 * Visualization source
 */
define([
    'jquery',
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
    SplunkVisualizationBase,
    vizUtils,
    enterpriseAttack,
    icsAttack,
    mobileAttack,
    d3fend,
    logic
) {

// Imported matrices fetched on this page, by "matrix|pinned version", so several
// panels share one request. A failed fetch is not kept.
const matrixCache = new Map();
const MATRIX_CACHE_MS = 5 * 60 * 1000;

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
    formatData: function(data, config) {
        if(data.rows.length < 1) {
            return false;
        }

        if(data.rows[0].length < 2) {
            throw new SplunkVisualizationBase.VisualizationError(
                'Search results must have at least 2 fields: id, count'
            );
        }

        // Fail early, with a message, when a configured field name is not in the results.
        if (config) {
            try {
                logic.resolveFields(data.fields, logic.mappingNames(config, this.getPropertyNamespaceInfo().propertyNamespace));
            } catch (error) {
                throw this._visualizationError(error);
            }
        }

        return data;
    },

    // Implement updateView to render a visualization.
    //  'data' will be the data object returned from formatData or from the search
    //  'config' will be the configuration property object
    updateView: function(data, config) {

        if (!data) return;

        let self = this;
        let theme = vizUtils.getCurrentTheme();
        let options;
        try {
            options = logic.parseConfig(config, this.getPropertyNamespaceInfo().propertyNamespace, vizUtils, data.fields);
        } catch (error) {
            throw this._visualizationError(error);
        }
        let {
            animate, duration, startColor, midColor, endColor, startVal, endVal, display, legendTitle,
            sortKey, sortOrder, hideNull, showSubTechniques, showSearchBar, matrix, platform,
            statusMode, statusColors, statusDefaultColor
        } = options;
        let bundledMatrix = logic.selectMatrix(matrix, {
            enterprise: enterpriseAttack,
            ics: icsAttack,
            mobile: mobileAttack,
            d3fend: d3fend
        });

        // Everything up to the end of this method draws one matrix. Bundled data is drawn
        // at once; imported data when it arrives. (The body keeps its original indentation
        // so the markup in its template literals is byte-for-byte unchanged.)
        let render = (matrixJSON, notice) => {
        // Each render starts its own animation loop; stop the previous one.
        window.cancelAnimationFrame(this._animationFrame);

        this.$el.empty();

        // The numeric sweep means nothing when cells are colored by status.
        self.animate = animate && !statusMode;

        this.$el.attr('class', '').addClass(theme);

        // The matrix scrolls, both ways, when the panel is too small for it. The legend is
        // positioned against this element, so it needs to be a positioning context.
        this.$el.css('overflow', 'auto');
        if (['absolute', 'relative', 'fixed', 'sticky'].indexOf(this.$el.css('position')) < 0) {
            this.$el.css('position', 'relative');
        }

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

        // Look elements up by id once instead of running a selector over the
        // whole matrix for every sub-technique and every result row.
        let indexById = function(selector) {
            let index = new Map();
            $(selector, $content).each(function() {
                let key = this.getAttribute('data-id');
                if (!index.has(key)) index.set(key, []);
                index.get(key).push(this);
            });
            return index;
        };

        if (showSubTechniques) {
            let containersById = indexById('.mtr-technique-container[data-id]');

            matrixJSON.sub_techniques.forEach(function(sub_technique) {
                if (!logic.isOnPlatform(sub_technique, platform)) return;

                let title = (display == 'id') ?  sub_technique.short_id : sub_technique.name;
                (containersById.get(String(sub_technique.technique)) || []).forEach(function(container) {
                    $('.mtr-sub-technique-container', $(container)).append(`
                        <div class="mtr-sub-technique mtr-display-${display}" data-id="${sub_technique.id}" data-name="${sub_technique.name}" data-url="${sub_technique.url}">
                            <span>${title}</span>
                        </div>
                    `);
                });
            })
        }

        let cellsById = indexById('.mtr-technique, .mtr-sub-technique');

        // One entry per id; a later row for the same id replaces an earlier one.
        let entries = new Map();
        data.rows.forEach(function(r) {
            let entry = logic.parseRow(r, vizUtils.escapeHtml, options.columns);
            if (!logic.isValidEntry(entry, statusMode)) return;
            entries.set(entry.id, entry);
        });

        let subParents = logic.subTechniqueParents(matrixJSON, platform);
        entries = logic.rollUp(entries, subParents, options.rollup, options.rollupParent, options.statusPriority);

        // Legend entries for status mode: each status with its color and cell count.
        let statusItems = statusMode
            ? logic.statusSummary(entries, id => cellsById.has(id), statusColors).map(function(item) {
                item.color = logic.statusColor(item.name, statusColors, statusDefaultColor);
                return item;
            })
            : [];

        // Automatic color bounds come from the values that will be colored.
        if (options.scaleMode == 'auto' && !statusMode) {
            let values = [];
            entries.forEach(function(entry, id) {
                if (cellsById.has(id)) values.push(Number(entry.count));
            });
            ({ startVal, endVal } = logic.computeBounds(values, options.autoLowerBound, { startVal, endVal }));
        }

        let $legend;
        if (statusMode) {
            $legend = self._statusLegend(legendTitle, statusItems);
        } else {
        // (the gradient legend keeps its original indentation so its markup is unchanged)
        let legendLabels = logic.legendLabels(startVal, endVal);
        $legend = $(`
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
            $('.mtr-legend-cursor', $legend).remove();
            $('.mtr-technique', self.$el).removeClass('focused').removeClass('defocused');
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
        }

        entries.forEach(function(entry, id) {
            let { count, description } = entry;
            let $technique = $(cellsById.get(id) || []);

            if (logic.isValidCount(count)) {
                let percent = self._getPercent(startVal, endVal, count);
                let color = self._getColor(percent);

                percent = logic.visiblePercent(percent);

                $technique.attr('data-value', count);
                $technique.attr('data-percent', percent);
                $technique.attr('data-desc', description);
                if (!statusMode) {
                    $technique
                        .css('background', color.background)
                        .css('color', color.foreground);
                }
            } else {
                $technique.attr('data-desc', description);
            }
            if (statusMode && entry.status) {
                let background = logic.statusColor(entry.status, statusColors, statusDefaultColor);
                $technique
                    .attr('data-status', entry.status)
                    .attr('data-status-key', entry.status.toLowerCase())
                    .attr('data-status-rank', logic.statusRank(entry.status, options.statusPriority))
                    .css('background', background)
                    .css('color', logic.readableTextColor(background));
            }
            if (entry.rolledFrom) {
                $technique.attr('data-rollup', entry.rolledFrom).addClass('mtr-rolled-up');
            }
        });

        $('.mtr-technique, .mtr-sub-technique', $content).hover(function(e) {
            
            let id = $(this).attr('data-id');
            let name = $(this).attr('data-name');
            let percent = parseInt($(this).attr('data-percent')) || '';
            let description = $(this).attr('data-desc') || '';
            let value = logic.parseValue($(this).attr('data-value'));
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
                    <div class="mtr-ref"><a target="_blank" rel="noopener noreferrer" href="${url}">${url} <i class="icon-external"></i></a></div>
                </div>
            `);

            $tooltip.addClass('mtr-technique-tooltip-' + logic.tooltipSide($(this).offset().left, $(window).width()));

            $('.mtr-desc', $tooltip).append(logic.formatDescription(description));

            let rolledFrom = parseInt($(this).attr('data-rollup'));
            if (rolledFrom) {
                $('.mtr-desc', $tooltip).append(
                    '<p class="mtr-rollup-note">Rolled up from ' + rolledFrom + ' sub-technique' +
                    (rolledFrom == 1 ? '' : 's') + ' (' + options.rollup + ')</p>'
                );
            }

            $('.more-link', $tooltip).click(function(){
                $('.more-elipses', $tooltip).hide();
                $('.more-content', $tooltip).show();
                $('.more-link', $tooltip).hide();
                return false;
            });

            // A sandboxed iframe cannot open new windows, so show the address as text.
            if (self._isSandboxed()) {
                $('.mtr-ref', $tooltip).text(url);
            }

            let status = $(this).attr('data-status');
            if (status) {
                let $badge = $('<div class="mtr-status"><span class="mtr-status-swatch"></span><span class="mtr-status-text"></span></div>');
                $('.mtr-status-swatch', $badge).css('background', this.style.background);
                $('.mtr-status-text', $badge).text(status);
                $('.mtr-name', $tooltip).after($badge);
            }
            if (statusMode) {
                $('.mtr-meter-container', $tooltip).hide();
            }

            $tooltip.appendTo($(this));

            if (value !== '') {
                $('.mtr-label', $tooltip).text(data.fields[options.columns.value].name);
                if (!statusMode) {
                    $('.mtr-meter-fill', $tooltip)
                        .css('background', color.background)
                        .animate({width: $(this).attr('data-percent') + '%'}, 50, 'linear');
                    if (color.luminance < 0.1) {
                        $('.mtr-meter-container', $tooltip).addClass('dark');
                    }
                }
            }
        }, function() {
            $('.mtr-technique-tooltip', $content).remove();
        });

        $('.mtr-tactic-col', $content).each(function() {
            let values = [];
            $('.mtr-technique', this).each(function() {

                let val = $(this).attr('data-value');

                if (!val && $(this).attr('data-status') === undefined && hideNull) {
                    // Keep a technique without a value or status while a sub-technique under it has one.
                    if ($('.mtr-sub-technique[data-value], .mtr-sub-technique[data-status]', $(this).parent()).length == 0) {
                        $(this).parent().remove();
                        return;
                    }
                }

                values.push(val);
            });

            let { sum, count, total, mean, coverage } = logic.tacticStats(values);

            if (total == 0 && hideNull) {
                $(this).remove();
                return
            }

            if (statusMode) {
                $(this).attr('data-value', sum);
                self._statusTactic($(this), statusItems, total);
                return;
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
            if (hideNull && isNaN(val) && $(this).attr('data-status') === undefined) {
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
                drilldown_data['mtr_sub-technique_status'] = $sub_technique.attr('data-status');
                drilldown_data['mtr_technique_status'] = $technique.attr('data-status');
                // Clicking a tactic has always also supplied the tactic name as mtr_tactic.
                if ($(this).hasClass('mtr-tactic')) {
                    drilldown_data['mtr_tactic'] = $tactic_col.attr('data-name');
                }
                // Leave out what does not apply to this click. Classic dashboards treat a
                // missing key as an unset token; Dashboard Studio would turn undefined
                // into the text "undefined".
                Object.keys(drilldown_data).forEach(function(key) {
                    if (drilldown_data[key] === undefined || drilldown_data[key] === null) delete drilldown_data[key];
                });
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
                // Compared with attribute values, not written into HTML, so no escaping.
                let value = this.value.toLowerCase();
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

        let navigatorDomain = logic.navigatorDomain(matrix);
        if (options.showExportButton && navigatorDomain) {
            let $toolbar = $('<div class="mtr-toolbar"><button type="button" class="mtr-export-button">Export to ATT&amp;CK Navigator</button></div>');
            $('.mtr-export-button', $toolbar).on('click', function() {
                let layer = logic.buildNavigatorLayer({
                    name: options.navigatorLayerName || logic.unescapeHtml(legendTitle) || 'MITRE ATT&CK Heatmap',
                    domain: navigatorDomain,
                    attackVersion: options.navigatorAttackVersion || logic.attackMajor(matrixJSON.version),
                    platforms: platform.filter(Boolean),
                    techniques: logic.navigatorTechniques(
                        entries, id => cellsById.has(id), subParents,
                        status => logic.statusColor(status, statusColors, statusDefaultColor)
                    ),
                    gradient: statusMode ? null : { colors: [options.startColor, options.midColor, options.endColor], minValue: startVal, maxValue: endVal },
                    legendItems: statusItems.filter(item => item.count > 0).map(item => ({ label: item.name, color: item.color }))
                });
                self._download(logic.navigatorFileName(layer.name), JSON.stringify(layer, null, 2));
            });
            $toolbar.appendTo(this.$el);
        }

        if (notice) {
            $('<div class="mtr-notice"></div>').text(notice).appendTo(this.$el);
        }

        $content.appendTo(this.$el);
        $legend.appendTo(this.$el);


        if (self.animate) {
            let steps = logic.animationSteps(startVal, endVal, duration);
            let currStep = startVal;

            // A function expression, not a declaration: declarations inside blocks are
            // hoisted differently in strict and sloppy mode, and the bundle's mode is not
            // the one the minifier assumes.
            let step = function() {
                let frame = logic.animationFrame(currStep, steps, endVal, startVal);

                self._setAnimationClass(frame.lower, frame.upper);
                currStep = frame.next;
                if (self.animate) {
                    self._animationFrame = window.requestAnimationFrame(step);
                } else {
                    $('.mtr-technique', self.$el).removeClass('focused').removeClass('defocused');
                }
            };
            self._animationFrame = window.requestAnimationFrame(step);
        }
        };

        // A newer render makes any fetch still in flight obsolete.
        let token = this._renderToken = (this._renderToken || 0) + 1;

        if (options.matrixSource == 'splunk' && logic.IMPORTED_MATRICES.indexOf(matrix) >= 0) {
            this._loadImportedMatrix(matrix, options.attackVersion).then(function(imported) {
                if (token !== self._renderToken) return;
                if (imported) {
                    render(imported);
                } else {
                    render(bundledMatrix, logic.fallbackNotice(options.attackVersion));
                }
            }).catch(function(error) {
                if (window.console) console.error(error);
            });
        } else {
            render(bundledMatrix);
        }
    },

    // Search data params
    getInitialDataParams: function() {
        return ({
            outputMode: SplunkVisualizationBase.ROW_MAJOR_OUTPUT_MODE            
        });
    },
    
    // Override to respond to re-sizing events. Nothing to do: the matrix sizes itself with CSS and
    // scrolls when it no longer fits (columns and cells have minimum widths).
    reflow: function() {

    },

    _setAnimationClass: function(lower, upper) {
        $('.mtr-technique', this.$el).each(function() {
            if (logic.inFocusRange($(this).attr('data-value'), lower, upper)) {
                $(this).addClass('focused').removeClass('defocused');
            } else {
                $(this).removeClass('focused').addClass('defocused');
            }
        })
    },

    // A panel with the exported text in a box, for places where a file cannot be downloaded.
    _showExportText: function(filename, text) {
        $('.mtr-export-dialog', this.$el).remove();
        let $dialog = $(
            '<div class="mtr-export-dialog" role="dialog">' +
                '<div class="mtr-export-panel">' +
                    '<p class="mtr-export-note"></p>' +
                    '<textarea class="mtr-export-text" readonly></textarea>' +
                    '<div class="mtr-export-actions">' +
                        '<button type="button" class="mtr-export-copy">Copy</button>' +
                        '<button type="button" class="mtr-export-close">Close</button>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
        $('.mtr-export-note', $dialog).text(
            'This dashboard does not allow a visualization to download files. Copy the layer and save it as ' + filename + '.'
        );
        $('.mtr-export-text', $dialog).val(text);
        $('.mtr-export-copy', $dialog).on('click', function() {
            let box = $('.mtr-export-text', $dialog)[0];
            box.focus();
            box.select();
            let copied = false;
            try {
                copied = document.execCommand('copy');
            } catch (error) {
                copied = false;
            }
            $(this).text(copied ? 'Copied' : 'Press Ctrl+C to copy');
        });
        $('.mtr-export-close', $dialog).on('click', function() {
            $dialog.remove();
        });
        $dialog.appendTo(this.$el);
    },

    // The matrix records in the KV Store, as parsed JSON.
    // fetch rather than XMLHttpRequest: inside a Dashboard Studio iframe (sandboxed, no
    // cookies of its own) Splunk replaces fetch with a version that makes same-origin
    // requests through the dashboard page; XMLHttpRequest would not be proxied.
    _fetchRecords: function(url) {
        return fetch(url, { credentials: 'same-origin', headers: { Accept: 'application/json' } }).then(function(response) {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.json();
        });
    },

    // True when the visualization runs in a sandboxed iframe (as in Dashboard Studio): it
    // has no origin of its own, cannot download files and cannot open new windows.
    _isSandboxed: function() {
        return window.origin === 'null' || window.location.protocol === 'about:';
    },

    // The KV Store URL for a matrix. The document's base URL is tried first: inside a
    // Studio iframe (a srcdoc document) it is the dashboard page, while location is not.
    _matrixUrl: function(matrix) {
        let paths = [];
        try {
            paths.push(new URL(document.baseURI).pathname);
        } catch (error) {
            // no usable base URL
        }
        paths.push(window.location.pathname);
        return logic.kvStoreUrl(paths, matrix);
    },

    // The imported matrix to use, or null (nothing imported, no such version,
    // fetch failed or data malformed), in which case the caller falls back.
    _loadImportedMatrix: function(matrix, attackVersion) {
        let key = matrix + '|' + attackVersion;
        let cached = matrixCache.get(key);
        if (cached && Date.now() - cached.at < MATRIX_CACHE_MS) return cached.promise;

        let promise = this._fetchRecords(this._matrixUrl(matrix)).then(function(records) {
            let record = logic.pickMatrixRecord(records, matrix, attackVersion);
            return record ? logic.parseMatrixRecord(record) : null;
        }).catch(function() {
            return null;
        });
        matrixCache.set(key, { at: Date.now(), promise: promise });
        promise.then(function(result) {
            if (!result) matrixCache.delete(key);
        });
        return promise;
    },

    // Test hook: forget what was fetched.
    _clearMatrixCache: function() {
        matrixCache.clear();
    },

    // Saves text as a file through the browser; no request is made.
    _download: function(filename, text) {
        // A sandboxed iframe cannot download files; offer the text to copy instead.
        if (this._isSandboxed()) {
            return this._showExportText(filename, text);
        }
        let url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
        let link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function() { URL.revokeObjectURL(url); }, 0);
    },

    // The legend in status mode: one swatch per status with its cell count.
    // Hovering a swatch highlights the cells that have that status.
    _statusLegend: function(legendTitle, items) {
        let self = this;
        let $legend = $('<div class="mtr-legend mtr-legend-status"><div class="mtr-legend-title"></div><div class="mtr-status-legend"></div></div>');
        $('.mtr-legend-title', $legend).html(legendTitle);

        items.forEach(function(item) {
            let $item = $('<div class="mtr-status-item"><span class="mtr-status-swatch"></span><span class="mtr-status-label"></span><span class="mtr-status-count"></span></div>');
            $('.mtr-status-swatch', $item).css('background', item.color);
            $('.mtr-status-label', $item).text(item.name);
            $('.mtr-status-count', $item).text(item.count.toLocaleString());
            $item.attr('data-status-key', item.key).hover(function() {
                $('.mtr-technique', self.$el).each(function() {
                    if ($(this).attr('data-status-key') == item.key) {
                        $(this).addClass('focused').removeClass('defocused');
                    } else {
                        $(this).removeClass('focused').addClass('defocused');
                    }
                });
            }, function() {
                $('.mtr-technique', self.$el).removeClass('focused').removeClass('defocused');
            });
            $('.mtr-status-legend', $legend).append($item);
        });
        return $legend;
    },

    // A tactic's header in status mode: a count per status, and a bar split in
    // proportion to the statuses of its techniques.
    _statusTactic: function($column, items, total) {
        let counts = {};
        $('.mtr-technique[data-status-key]', $column).each(function() {
            let key = $(this).attr('data-status-key');
            counts[key] = (counts[key] || 0) + 1;
        });

        let $stats = $('.mtr-tactic .mtr-stats-container', $column).empty();
        items.forEach(function(item) {
            let count = counts[item.key] || 0;
            if (!count) return;

            let $stat = $('<div class="mtr-stat"><div class="mtr-stats-label"></div><div class="mtr-stats-val"></div></div>');
            $stat.css({ background: item.color, color: logic.readableTextColor(item.color) });
            $('.mtr-stats-label', $stat).text(item.name);
            $('.mtr-stats-val', $stat).text(count.toLocaleString());
            $stats.append($stat);
        });

        $('.mtr-tactic .mtr-meter-fill', $column)
            .css('background', logic.statusBarGradient(items, counts, total))
            .css('width', '100%');
    },

    // Field-mapping problems are shown to the user as a visualization error.
    _visualizationError: function(error) {
        return (error instanceof logic.FieldError)
            ? new SplunkVisualizationBase.VisualizationError(error.message)
            : error;
    },

    _getPercent: function(lowerBound, upperBound, value) {
        return logic.getPercent(lowerBound, upperBound, value);
    },

    _getColor: function(percent) {
        return logic.getColor(percent, this.colorMap);
    },

    _sortElements: function($container, key, order) {
        // Status sorts by the rank stored on each cell (position in the status list).
        let attribute = (key == 'data-status') ? 'data-status-rank' : key;
        let $children = $container.children().sort(function(a, b) {
            let $t1 = $('.mtr-technique', $(a));
            let $t2 = $('.mtr-technique', $(b));
            return logic.compareByKey(key, order, $t1.attr(attribute), $t2.attr(attribute));
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
