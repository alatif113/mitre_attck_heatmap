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

// The first tooltip waits a moment. Once one is open, moving onto another cell must rest there a
// little longer before it takes over, so a pointer crossing cells on its way to the tooltip does
// not replace it; and the tooltip lingers after the pointer leaves its cell.
const TOOLTIP_DELAY_MS = 120;
const TOOLTIP_SWITCH_MS = 350;
const TOOLTIP_GRACE_MS = 600;
const TOOLTIP_WIDTH = 310;
const NO_BAND = -9;
const NO_DATA_BAND = -2;

// Extend from SplunkVisualizationBase
return SplunkVisualizationBase.extend({

    initialize: function() {
        SplunkVisualizationBase.prototype.initialize.apply(this, arguments);
        this.$el = $(this.el);
        this.colorMap = logic.buildStopMap(['#B63457', '#FCFCBD', '#22908D']);
        this._tooltipDelay = TOOLTIP_DELAY_MS;
        this._switchDelay = TOOLTIP_SWITCH_MS;
        // What the user has done in the panel. It outlives a re-render (a refresh
        // of the search brings new data, not a new panel), so search text, the
        // pinned band, a selected tactic, the pinned tooltip and the scroll position stay.
        this._ui = { query: '', band: NO_BAND, tactic: null, pin: null, scrollTop: 0, scrollLeft: 0, rendered: false };
    },

    // Optionally implement to format data returned from search. 
    // The returned object will be passed to updateView as 'data'
    formatData: function(data, config) {
        if(data.rows.length < 1) {
            // No rows is shown as a message, not as an unchanged old render.
            return { fields: data.fields, rows: [], empty: true };
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

        if (data.empty) {
            // A render still waiting for imported data is obsolete.
            this._renderToken = (this._renderToken || 0) + 1;
            this._renderMessage(theme, 'No results', 'Run a search that returns an id column and a value column, for example | table id count.');
            return;
        }

        let options;
        try {
            options = logic.parseConfig(config, this.getPropertyNamespaceInfo().propertyNamespace, vizUtils, data.fields);
        } catch (error) {
            throw this._visualizationError(error);
        }
        let {
            startColor, midColor, endColor, startVal, endVal, display, legendTitle,
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
        // at once; imported data when it arrives.
        let render = (matrixJSON, notice) => {
        let ui = self._ui;
        // Remember where the panel was scrolled to, and what is pinned, before it is rebuilt.
        if (ui.rendered) {
            ui.scrollTop = self.el.scrollTop;
            ui.scrollLeft = self.el.scrollLeft;
        }
        let firstRender = !ui.rendered;
        ui.rendered = true;

        clearTimeout(self._showTimer);
        clearTimeout(self._hideTimer);
        window.cancelAnimationFrame(self._countFrame);
        if (self._stopWall) self._stopWall();
        if (self._keyHandler) self.$el.off('keydown', self._keyHandler);

        this.$el.empty();

        this.$el.attr('class', '').addClass(theme).addClass('mtr-viz').addClass('mtr-display-' + display).addClass('mtr-matrix-' + matrix);
        // The first render fades in and counts up; later ones (a refresh) do not. Tests switch it off.
        let entrance = firstRender && self._entrance !== false;
        if (entrance) this.$el.addClass('mtr-enter');

        // The matrix scrolls, both ways, when the panel is too small for it. Tooltips are
        // positioned against this element, so it needs to be a positioning context.
        this.$el.css('overflow', 'auto');
        if (['absolute', 'relative', 'fixed', 'sticky'].indexOf(this.$el.css('position')) < 0) {
            this.$el.css('position', 'relative');
        }

        let stops = logic.paletteStops(options.palette, startColor, midColor, endColor);
        this.colorMap = logic.buildStopMap(stops);

        let $content = $(`<div class="mtr-viz-container"></div>`);

        matrixJSON.tactics.forEach(function(tactic) {
            let $tactic_col = $(`<div class="mtr-tactic-col" data-id="${tactic.id}" data-name="${tactic.name}" data-tactic="${tactic.short_name}">`);
            $tactic_col.appendTo($content).append(`
                    <div class="mtr-tactic" tabindex="0">
                        <div class="mtr-tactic-title" lang="en"></div>
                        <div class="mtr-tactic-fig"><b class="mtr-fig-pct"></b><span class="mtr-fig-count"></span></div>
                        <div class="mtr-meter-container">
                            <div class="mtr-meter-fill"></div>
                        </div>
                        <div class="grid-wrapper">
                            <div class="mtr-stats-container">
                                <div class="mtr-count mtr-stat">
                                    <div class="mtr-stats-label">Techniques with a value</div>
                                    <div class="mtr-stats-val"></div>
                                </div>
                                <div class="mtr-subs mtr-stat">
                                    <div class="mtr-stats-label">Sub-techniques with a value</div>
                                    <div class="mtr-stats-val"></div>
                                </div>
                                <div class="mtr-total mtr-stat">
                                    <div class="mtr-stats-label">Sum of values</div>
                                    <div class="mtr-stats-val"></div>
                                </div>
                                <div class="mtr-mean mtr-stat">
                                    <div class="mtr-stats-label">Average value</div>
                                    <div class="mtr-stats-val"></div>
                                </div>
                                <div class="mtr-top mtr-stat">
                                    <div class="mtr-stats-label">Highest</div>
                                    <div class="mtr-stats-val"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mtr-technique-col"></div>
            `);
            $('.mtr-tactic-title', $tactic_col).text(logic.hyphenateName(tactic.name));
        })

        matrixJSON.techniques.forEach(function(technique) {
            if (!logic.isOnPlatform(technique, platform)) return;

            let $technique = $(`
                <div class="mtr-technique-container mtr-display-${display}" data-id="${technique.id}">
                    <div class="mtr-technique" data-id="${technique.id}" data-name="${technique.name}" data-url="${technique.url}" tabindex="-1" role="button">
                        <span class="mtr-cell-id"></span>
                        <span class="mtr-cell-name"></span>
                        <i class="mtr-subdot" aria-hidden="true"></i>
                    </div>
                    <div class="mtr-sub-technique-container"></div>
                </div>
            `);
            $('.mtr-cell-id', $technique).text(technique.id);
            if (display == 'name') {
                $('.mtr-cell-name', $technique).text(technique.name);
            } else {
                $('.mtr-cell-name', $technique).remove();
            }

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

        // Sub-technique cells carry the data for the tooltip, the roll-up and the
        // drilldown. They are not drawn in the matrix: the tooltip lists them.
        if (showSubTechniques) {
            let containersById = indexById('.mtr-technique-container[data-id]');

            matrixJSON.sub_techniques.forEach(function(sub_technique) {
                if (!logic.isOnPlatform(sub_technique, platform)) return;

                (containersById.get(String(sub_technique.technique)) || []).forEach(function(container) {
                    let $sub = $(`
                        <div class="mtr-sub-technique" data-id="${sub_technique.id}" data-name="${sub_technique.name}" data-url="${sub_technique.url}">
                            <span></span>
                        </div>
                    `);
                    $('span', $sub).text(sub_technique.short_id);
                    $('.mtr-sub-technique-container', $(container)).append($sub);
                });
            })
        }

        let cellsById = indexById('.mtr-technique, .mtr-sub-technique');

        // One entry per id; a later row for the same id replaces an earlier one.
        let entries = new Map();
        let unmatchedIds = [];
        data.rows.forEach(function(r) {
            let entry = logic.parseRow(r, vizUtils.escapeHtml, options.columns);
            if (!logic.isValidEntry(entry, statusMode)) return;
            entries.set(entry.id, entry);
        });

        let subParents = logic.subTechniqueParents(matrixJSON, platform);
        entries = logic.rollUp(entries, subParents, options.rollup, options.rollupParent, options.statusPriority);

        entries.forEach(function(entry, id) {
            if (!cellsById.has(id) && unmatchedIds.length < 3) unmatchedIds.push(id);
        });
        let matchedCount = 0;
        entries.forEach(function(entry, id) { if (cellsById.has(id)) matchedCount++; });

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

        // The scale is split into bands. Edges are even when the bounds were set by hand and
        // follow the data (equal numbers of values per band) when they come from the data.
        let bandValues = [];
        entries.forEach(function(entry, id) {
            if (cellsById.has(id) && logic.isValidCount(entry.count)) bandValues.push(Number(entry.count));
        });
        let bandCount = options.colorBands;
        let edges = logic.computeEdges(bandValues, bandCount, options.scaleMode == 'auto' ? 'quantile' : 'equal', startVal, endVal);
        let bandColors = logic.bandColors(this.colorMap, bandCount);
        let bandOfValue = value => logic.bandOf(Number(value), edges);

        entries.forEach(function(entry, id) {
            let { count, description } = entry;
            let $technique = $(cellsById.get(id) || []);

            if (logic.isValidCount(count)) {
                let percent = self._getPercent(startVal, endVal, count);

                percent = logic.visiblePercent(percent);

                $technique.attr('data-value', count);
                $technique.attr('data-percent', percent);
                $technique.attr('data-desc', description);
                if (!statusMode) {
                    let band = bandOfValue(count);
                    $technique
                        .attr('data-band', band)
                        .css('background', bandColors[band].background)
                        .css('color', bandColors[band].foreground);
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

        // A technique that has sub-techniques with a value gets a small marker in its corner.
        $('.mtr-technique-container', $content).each(function() {
            if ($('.mtr-sub-technique[data-value], .mtr-sub-technique[data-status]', this).length > 0) {
                $('.mtr-technique', this).addClass('mtr-has-subs');
            }
        });

        // Techniques with a value, once each however many tactics they are in, highest first:
        // the basis of a technique's rank.
        let rankValues = [];
        let rankSeen = new Set();
        $('.mtr-technique[data-value]', $content).each(function() {
            let id = this.getAttribute('data-id');
            if (rankSeen.has(id)) return;
            rankSeen.add(id);
            rankValues.push(Number($(this).attr('data-value')));
        });
        rankValues.sort((a, b) => b - a);

        let tooltipState = { $tip: null, cell: null };
        let closeTooltip = function() {
            clearTimeout(self._showTimer);
            clearTimeout(self._hideTimer);
            if (tooltipState.$tip) tooltipState.$tip.remove();
            tooltipState.$tip = null;
            tooltipState.cell = null;
        };

        // A tooltip for a technique cell: what it is, its value and where it stands, and its
        // sub-techniques (each one clickable like the cell itself).
        let showTooltip = function(cell, pinned, instant) {
            let $cell = $(cell);
            // Replacing the tooltip of the same cell (hover to pin) or drawing it again after a
            // refresh must not fade it in a second time.
            instant = instant || tooltipState.cell === cell;
            let id = $cell.attr('data-id');
            let name = $cell.attr('data-name');
            let description = $cell.attr('data-desc') || '';
            let value = logic.parseValue($cell.attr('data-value'));
            let url = $cell.attr('data-url') || '';
            let percent = parseInt($cell.attr('data-percent')) || '';
            let band = $cell.attr('data-band');
            let tacticName = $cell.closest('.mtr-tactic-col').attr('data-name');
            let otherTactics = [];
            $(`.mtr-technique[data-id="${id}"]`, $content).each(function() {
                let other = $(this).closest('.mtr-tactic-col').attr('data-name');
                if (other != tacticName && otherTactics.indexOf(other) < 0) otherTactics.push(other);
            });

            closeTooltip();

            let $tooltip = $(`
                <div class="mtr-technique-tooltip" role="tooltip">
                    <div class="mtr-tooltip-head"><span class="mtr-id"></span><span class="mtr-tooltip-tactic"></span><button type="button" class="mtr-tooltip-close" aria-label="Close">&times;</button></div>
                    <div class="mtr-name"></div>
                    <div class="mtr-desc"></div>
                    <div class="mtr-also"></div>
                    <div class="mtr-value-row"><span class="mtr-label"></span><span class="mtr-val"></span></div>
                    <div class="mtr-meter-container">
                        <div class="mtr-meter-fill"></div>
                    </div>
                    <div class="mtr-standing"></div>
                    <div class="mtr-subs-list"></div>
                    <div class="mtr-ref"><a target="_blank" rel="noopener noreferrer"></a></div>
                </div>
            `);
            $('.mtr-id', $tooltip).text(id);
            $('.mtr-tooltip-tactic', $tooltip).text(tacticName);
            $('.mtr-name', $tooltip).text(name);
            $('.mtr-val', $tooltip).text(value === '' ? 'No data' : logic.formatNumber(value));
            if (!pinned) $('.mtr-tooltip-close', $tooltip).remove();
            $('.mtr-desc', $tooltip).append(logic.formatDescription(description));
            if (!description) $('.mtr-desc', $tooltip).remove();
            if (otherTactics.length) {
                $('.mtr-also', $tooltip).text('Also in ' + otherTactics.join(' · '));
            } else {
                $('.mtr-also', $tooltip).remove();
            }

            let rolledFrom = parseInt($cell.attr('data-rollup'));
            if (rolledFrom) {
                $('.mtr-standing', $tooltip).append(
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

            $('.mtr-ref a', $tooltip).attr('href', url).text(url + ' ');
            // A sandboxed iframe cannot open new windows, so show the address as text.
            if (self._isSandboxed()) {
                $('.mtr-ref', $tooltip).text(url);
            }

            let status = $cell.attr('data-status');
            if (status) {
                let $badge = $('<div class="mtr-status"><span class="mtr-status-swatch"></span><span class="mtr-status-text"></span></div>');
                $('.mtr-status-swatch', $badge).css('background', $cell[0].style.background);
                $('.mtr-status-text', $badge).text(status);
                $('.mtr-name', $tooltip).after($badge);
            }

            if (value !== '') {
                $('.mtr-label', $tooltip).text(data.fields[options.columns.value].name);
                if (!statusMode) {
                    let color = bandColors[bandOfValue(value)];
                    $('.mtr-meter-fill', $tooltip)
                        .css('background', color.background)
                        .css('width', logic.visiblePercent(percent) + '%');
                    let rank = logic.rankOf(Number(value), rankValues);
                    $('.mtr-standing', $tooltip).prepend($('<span class="mtr-band-line"></span>').text(
                        'Band ' + (Number(band) + 1) + ' of ' + bandCount + ' (' + logic.formatNumber(edges[band]) + '–' + logic.formatNumber(edges[Number(band) + 1]) +
                        ') · rank ' + rank + ' of ' + rankValues.length
                    ));
                }
            } else {
                $('.mtr-label', $tooltip).text(data.fields[options.columns.value].name);
                $('.mtr-meter-container', $tooltip).hide();
            }
            if (statusMode) {
                $('.mtr-meter-container', $tooltip).hide();
            }

            let $subs = $('.mtr-sub-technique', $cell.closest('.mtr-technique-container'));
            if ($subs.length) {
                let withValue = $subs.filter('[data-value], [data-status]').length;
                let $list = $('.mtr-subs-list', $tooltip);
                $('<div class="mtr-subs-title"></div>').text('Sub-techniques · ' + withValue + ' of ' + $subs.length + ' with a value').appendTo($list);
                $subs.toArray().sort(function(a, b) {
                    return logic.compareByKey('data-value', 'desc', $(a).attr('data-value'), $(b).attr('data-value'));
                }).forEach(function(sub) {
                    let $sub = $(sub);
                    let subValue = logic.parseValue($sub.attr('data-value'));
                    let $row = $('<button type="button" class="mtr-sub-row"><span class="mtr-sub-id"></span><span class="mtr-sub-name"></span><span class="mtr-sub-bar"><i></i></span><span class="mtr-sub-val"></span></button>');
                    $('.mtr-sub-id', $row).text($sub.find('span').text());
                    $('.mtr-sub-name', $row).text($sub.attr('data-name'));
                    $('.mtr-sub-val', $row).text(subValue === '' ? '—' : logic.formatNumber(subValue));
                    if (subValue !== '' && !statusMode) {
                        $('.mtr-sub-bar i', $row)
                            .css('width', logic.visiblePercent(self._getPercent(startVal, endVal, subValue)) + '%')
                            .css('background', bandColors[bandOfValue(subValue)].background);
                    } else if ($sub.attr('data-status')) {
                        $('.mtr-sub-bar i', $row).css('width', '100%').css('background', $sub[0].style.background);
                    }
                    $row.on('click', function(e) {
                        e.stopPropagation();
                        self._drilldown(drilldownData($sub), e);
                    });
                    $row.appendTo($list);
                });
            }

            $tooltip.appendTo(self.$el);
            $tooltip.on('mouseenter', function() { clearTimeout(self._hideTimer); });
            $tooltip.on('mouseleave', function() { if (!ui.pin) scheduleClose(); });
            $('.mtr-tooltip-close', $tooltip).on('click', function() {
                ui.pin = null;
                $('.mtr-technique.mtr-selected', $content).removeClass('mtr-selected');
                closeTooltip();
            });
            if (pinned) $tooltip.addClass('mtr-pinned');
            if (instant) $tooltip.addClass('mtr-instant');
            tooltipState.$tip = $tooltip;
            tooltipState.cell = cell;
            self._placeTooltip($tooltip, $cell);
        };

        let scheduleClose = function() {
            clearTimeout(self._showTimer);
            clearTimeout(self._hideTimer);
            self._hideTimer = setTimeout(function() {
                if (!ui.pin) closeTooltip();
            }, TOOLTIP_GRACE_MS);
        };

        let drilldownData = function($target) {
            let $tactic_col = $target.closest('.mtr-tactic-col');
            let $technique_container = $target.closest('.mtr-technique-container');
            let $technique = $('.mtr-technique', $technique_container);
            let $sub_technique = $target.closest('.mtr-sub-technique');
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
            if ($target.hasClass('mtr-tactic')) {
                drilldown_data['mtr_tactic'] = $tactic_col.attr('data-name');
            }
            // Leave out what does not apply to this click. Classic dashboards treat a
            // missing key as an unset token; Dashboard Studio would turn undefined
            // into the text "undefined".
            Object.keys(drilldown_data).forEach(function(key) {
                if (drilldown_data[key] === undefined || drilldown_data[key] === null) delete drilldown_data[key];
            });
            return drilldown_data;
        };

        $('.mtr-technique', $content).on('mouseenter focus', function(e) {
            let cell = this;
            if (ui.pin) return;
            clearTimeout(self._hideTimer);
            clearTimeout(self._showTimer);
            // Back on the cell whose tooltip is open (for instance from the tooltip): keep it.
            if (tooltipState.cell === cell) return;
            let delay = (e.type == 'focus') ? 0 : (tooltipState.$tip ? self._switchDelay : self._tooltipDelay);
            if (delay === 0) {
                showTooltip(cell, false);
            } else {
                self._showTimer = setTimeout(function() { showTooltip(cell, false); }, delay);
            }
        }).on('mouseleave blur', function() {
            // A cell the pointer only crossed does not get a tooltip.
            clearTimeout(self._showTimer);
            if (!ui.pin) scheduleClose();
        });

        // Selecting a technique pins its tooltip; clicking it again, or Escape, lets it go.
        $('.mtr-technique', $content).on('click', function() {
            let id = $(this).attr('data-id');
            let tactic = $(this).closest('.mtr-tactic-col').attr('data-id');
            $('.mtr-technique.mtr-selected', $content).removeClass('mtr-selected');
            if (ui.pin && ui.pin.id == id && ui.pin.tactic == tactic) {
                ui.pin = null;
                closeTooltip();
                return;
            }
            ui.pin = { id: id, tactic: tactic };
            $(this).addClass('mtr-selected');
            showTooltip(this, true);
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

            let $col = $(this);
            let figs = { coverage: coverage, count: count, total: total };
            $('.mtr-fig-count', $col).text(count.toLocaleString() + '/' + total.toLocaleString());
            $col.data('mtrFigs', figs);

            if (statusMode) {
                $(this).attr('data-value', sum);
                self._statusTactic($(this), statusItems, total);
                $('.mtr-fig-pct', $col).text(coverage + '%');
                return;
            }

            $(this).attr('data-value', sum);

            let meanBand = count > 0 ? bandOfValue(mean) : -1;
            $('.mtr-tactic .mtr-meter-fill', this)
                .css('background', meanBand >= 0 ? bandColors[meanBand].background : '')
                .attr('data-width', coverage)
                .css('width', entrance ? '0%' : coverage + '%');
            $('.mtr-fig-pct', $col).text(coverage + '%');

            let subCount = $('.mtr-sub-technique', this).length;
            let subWith = $('.mtr-sub-technique[data-value]', this).length;
            let highest = null;
            $('.mtr-technique[data-value]', this).each(function() {
                let v = Number($(this).attr('data-value'));
                if (!highest || v > highest.value) highest = { id: $(this).attr('data-id'), value: v };
            });
            $('.mtr-tactic .mtr-count .mtr-stats-val', this).text(count.toLocaleString() + ' of ' + total.toLocaleString() + ` (${coverage}%)`);
            $('.mtr-tactic .mtr-subs .mtr-stats-val', this).text(subCount ? subWith.toLocaleString() + ' of ' + subCount.toLocaleString() : 'None in this tactic');
            $('.mtr-tactic .mtr-total .mtr-stats-val', this).text(sum.toLocaleString());
            $('.mtr-tactic .mtr-mean .mtr-stats-val', this).text(count ? mean.toLocaleString() : '—');
            $('.mtr-tactic .mtr-top .mtr-stats-val', this).text(highest ? highest.id + ' · ' + logic.formatNumber(highest.value) : '—');
        });

        $('.mtr-sub-technique', $content).each(function() {
            let val = $(this).attr('data-value');
            if (hideNull && isNaN(val) && $(this).attr('data-status') === undefined) {
                $(this).remove();
            }
        });

        // Selecting a tactic focuses it; clicking again lets it go. Both send the drilldown.
        $('.mtr-tactic', $content).on('click', function() {
            let id = $(this).closest('.mtr-tactic-col').attr('data-id');
            ui.tactic = (ui.tactic == id) ? null : id;
            applyFocus();
        });
        $('.mtr-tactic', $content).on('keydown', function(e) {
            if (e.key == 'Enter' || e.key == ' ') {
                e.preventDefault();
                $(this).trigger('click');
            }
        });

        $(`.mtr-technique, .mtr-tactic`, $content).each(function() {
            $(this).click(function(e) {
                self._drilldown(drilldownData($(this)), e);
            });
        });

        $('.mtr-technique-col', $content).each(function() {
            self._sortElements($(this), sortKey, sortOrder);
        });

        // ---- Focus: the legend's bands, the search and a selected tactic all dim what is
        // not of interest. `focused` marks a match, `defocused` what is dimmed.
        let hoverBand = NO_BAND;
        let hoverStatus = null;
        let applyFocus = function() {
            let band = (ui.band !== NO_BAND) ? ui.band : hoverBand;
            let query = ui.query.toLowerCase();

            $('.mtr-tactic', $content).each(function() {
                let name = ($(this).closest('.mtr-tactic-col').attr('data-name') || '').toLowerCase();
                let hit = query !== '' && name.indexOf(query) > -1;
                $(this).toggleClass('mtr-match', hit);
                $(this).toggleClass('mtr-tactic-selected', ui.tactic !== null && $(this).closest('.mtr-tactic-col').attr('data-id') == ui.tactic);
            });

            $('.mtr-technique', $content).each(function() {
                let $cell = $(this);
                let $container = $cell.parent();
                let id = $cell.attr('data-id');
                let hasValue = $cell.attr('data-value') !== undefined || $cell.attr('data-status') !== undefined;
                let dim = false;
                let match = false;

                if (query !== '') {
                    let fields = logic.searchFields({
                        id: id,
                        name: $cell.attr('data-name'),
                        description: $cell.attr('data-desc'),
                        subNames: $('.mtr-sub-technique', $container).map(function() { return $(this).attr('data-name'); }).get()
                    }, query);
                    match = fields.length > 0;
                    if (!match) dim = true;
                }

                if (band !== NO_BAND && !statusMode) {
                    let inBand;
                    if (band === NO_DATA_BAND) {
                        inBand = !hasValue;
                    } else {
                        // The technique's own value decides, not its sub-techniques': a band
                        // lights exactly the cells the legend counts for it.
                        inBand = $cell.attr('data-band') == band;
                    }
                    if (!inBand) dim = true;
                }

                if (hoverStatus !== null && $cell.attr('data-status-key') != hoverStatus) dim = true;

                if (ui.tactic !== null && $cell.closest('.mtr-tactic-col').attr('data-id') != ui.tactic) dim = true;

                $cell.toggleClass('focused', match && !dim).toggleClass('defocused', dim);
            });

            // Highlight the matched text in the cells.
            $('.mtr-technique', $content).each(function() {
                let $cell = $(this);
                if ($cell.data('mtrQuery') === query) return;
                $cell.data('mtrQuery', query);
                self._highlight($('.mtr-cell-id', $cell), $cell.attr('data-id'), query);
                self._highlight($('.mtr-cell-name', $cell), $cell.attr('data-name'), query);
            });

            $('.mtr-search-container', self.$el).toggleClass('mtr-has-query', query !== '');
            $('.mtr-band', self.$el).each(function() {
                let b = parseInt($(this).attr('data-band'));
                let active = band !== NO_BAND;
                $(this).toggleClass('mtr-band-on', active && band === b).toggleClass('mtr-band-off', active && band !== b)
                    .toggleClass('mtr-band-pinned', ui.band === b);
            });
        };

        // ---- The top row: the search box and the export button on the left, the legend on the right.
        let $top = $('<div class="mtr-top"></div>');
        let $controls = $('<div class="mtr-controls"></div>').appendTo($top);

        if (showSearchBar) {
            let $searchbar = $(`
                <div class="mtr-search-container">
                    <div class="mtr-search">
                        <input id="mtrSearchInput" class="mtr-search-input" type="search" placeholder="Find technique" aria-label="Find a technique, tactic or sub-technique"/>
                        <button type="button" class="mtr-search-clear" aria-label="Clear search">&times;</button>
                    </div>
                </div>
            `);
            let $input = $('input', $searchbar);
            $input.val(ui.query);
            $input.on('input change', function() {
                // Compared with attribute values, not written into HTML, so no escaping.
                ui.query = this.value.trim();
                applyFocus();
            });
            $('.mtr-search-clear', $searchbar).on('click', function() {
                $input.val('');
                ui.query = '';
                applyFocus();
                $input.trigger('focus');
            });
            $searchbar.appendTo($controls);
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
                    gradient: statusMode ? null : { colors: stops, minValue: startVal, maxValue: endVal },
                    legendItems: statusItems.filter(item => item.count > 0).map(item => ({ label: item.name, color: item.color }))
                });
                self._download(logic.navigatorFileName(layer.name), JSON.stringify(layer, null, 2));
            });
            $toolbar.appendTo($controls);
        }

        let $legend;
        if (statusMode) {
            $legend = self._statusLegend(legendTitle, statusItems, function(key) {
                hoverStatus = key;
                applyFocus();
            });
        } else {
            let uniqueTechniques = new Map();
            $('.mtr-technique', $content).each(function() { uniqueTechniques.set(this.getAttribute('data-id'), this); });
            let bandTotals = new Array(bandCount).fill(0);
            let noData = 0;
            uniqueTechniques.forEach(function(cell) {
                if (cell.getAttribute('data-value') === null) noData++;
                else bandTotals[parseInt(cell.getAttribute('data-band'))]++;
            });

            $legend = $(`
                <div class="mtr-legend">
                    <div class="mtr-legend-top"><span class="mtr-legend-title">` + legendTitle + `</span><span class="mtr-legend-hint"></span></div>
                    <div class="mtr-legend-bands" role="group" aria-label="Value bands"></div>
                </div>
            `);
            let $bands = $('.mtr-legend-bands', $legend);
            let hint = function(band) {
                if (band === NO_BAND) return '';
                let pinnedText = ui.band !== NO_BAND ? ' · pinned' : '';
                if (band === NO_DATA_BAND) return 'No data · ' + noData + ' techniques' + pinnedText;
                return logic.formatNumber(edges[band]) + '–' + logic.formatNumber(edges[band + 1]) + ' · ' + bandTotals[band] + ' techniques' + pinnedText;
            };
            let addBand = function(band, background, label, upper, extraClass, aria) {
                let $col = $('<div class="mtr-band-col"><button type="button" class="mtr-band"></button><span class="mtr-band-edge"></span></div>').addClass(extraClass || '');
                $('.mtr-band', $col).attr('data-band', band).attr('aria-label', aria).css('background', background);
                $('.mtr-band-edge', $col).text(label);
                if (upper !== undefined) $col.append($('<span class="mtr-band-edge mtr-band-edge-end"></span>').text(upper));
                $col.appendTo($bands);
                $('.mtr-band', $col).on('mouseenter focus', function() {
                    hoverBand = band;
                    $('.mtr-legend-hint', $legend).text(hint(ui.band !== NO_BAND ? ui.band : band));
                    applyFocus();
                }).on('mouseleave blur', function() {
                    hoverBand = NO_BAND;
                    $('.mtr-legend-hint', $legend).text(hint(ui.band));
                    applyFocus();
                }).on('click', function() {
                    ui.band = (ui.band === band) ? NO_BAND : band;
                    $('.mtr-legend-hint', $legend).text(hint(ui.band !== NO_BAND ? ui.band : band));
                    applyFocus();
                });
            };
            bandColors.forEach(function(color, i) {
                addBand(i, color.background, logic.formatNumber(edges[i]), i == bandCount - 1 ? logic.formatNumber(edges[bandCount]) : undefined, '',
                    'Focus values ' + logic.formatNumber(edges[i]) + ' to ' + logic.formatNumber(edges[i + 1]) + ', ' + bandTotals[i] + ' techniques');
            });
            addBand(NO_DATA_BAND, '', 'No data', undefined, 'mtr-band-col-nodata', 'Focus techniques with no data, ' + noData);
            $('.mtr-band-col-nodata .mtr-band', $bands).addClass('mtr-nodata-swatch');
            $('.mtr-legend-hint', $legend).text(hint(ui.band));
        }
        $legend.appendTo($top);
        $top.appendTo(this.$el);

        if (notice) {
            $('<div class="mtr-notice" role="status"></div>').text(notice).appendTo(this.$el);
        }

        if (entries.size === 0) {
            $('<div class="mtr-message" role="status"></div>')
                .append($('<b></b>').text('No usable rows'))
                .append($('<span></span>').text(statusMode
                    ? 'Each row needs a technique id and a status.'
                    : 'Each row needs a technique id and a numeric value.'))
                .appendTo(this.$el);
        } else if (matchedCount === 0) {
            let $message = $('<div class="mtr-message" role="status"></div>')
                .append($('<b></b>').text('None of the ' + entries.size + ' result ids matched this matrix'))
                .append($('<span></span>').text('Check the id field. Technique ids look like T1059 or T1059.001. Unmatched ids: ' + unmatchedIds.join(', ')));
            $message.appendTo(this.$el);
        }

        $content.appendTo(this.$el);

        // The first tab stop of the matrix: arrow keys move between cells from there.
        $('.mtr-technique', $content).first().attr('tabindex', '0');
        $content.on('focusin', '.mtr-technique', function() {
            $('.mtr-technique[tabindex="0"]', $content).attr('tabindex', '-1');
            $(this).attr('tabindex', '0');
        });

        self._keyHandler = function(e) {
            let target = $(e.target);
            if (e.key == 'Escape') {
                ui.pin = null;
                ui.band = NO_BAND;
                ui.tactic = null;
                $('.mtr-technique.mtr-selected', $content).removeClass('mtr-selected');
                closeTooltip();
                applyFocus();
                return;
            }
            let $cell = target.closest('.mtr-technique');
            if ($cell.length === 0) return;
            if (e.key == 'Enter' || e.key == ' ') {
                e.preventDefault();
                $cell.trigger('click');
                return;
            }
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].indexOf(e.key) < 0) return;
            e.preventDefault();
            let cells = $('.mtr-technique', $content).toArray();
            let next = logic.nextCell(cells.map(function(c) {
                let r = c.getBoundingClientRect();
                return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
            }), cells.indexOf($cell[0]), e.key, cells.map(function(c) { return $(c).closest('.mtr-tactic-col').attr('data-id'); }));
            if (next >= 0 && cells[next]) {
                cells[next].focus();
                if (cells[next].scrollIntoView) cells[next].scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }
        };
        self.$el.on('keydown', self._keyHandler);

        applyFocus();

        // Restore the scroll position and the pinned tooltip from before the rebuild.
        if (!firstRender) {
            self.el.scrollTop = ui.scrollTop;
            self.el.scrollLeft = ui.scrollLeft;
            if (ui.pin) {
                let $pinned = $(`.mtr-tactic-col[data-id="${ui.pin.tactic}"] .mtr-technique[data-id="${ui.pin.id}"]`, $content).first();
                if ($pinned.length) {
                    $pinned.addClass('mtr-selected');
                    showTooltip($pinned[0], true, true);
                } else {
                    ui.pin = null;
                }
            }
        }

        // ---- Wall mode: for a display nobody is touching. Cells twinkle and tactic headers
        // scramble and resolve, now and then. It carries no information, only life, and it
        // keeps out of the way: everything waits while anyone interacts with the panel, while
        // the tab is hidden, and when the browser asks for less motion.
        if (options.wallMode) {
            let wall = { stopped: false, timers: {}, scrambling: [], startedAt: Date.now() };
            let alive = function() {
                return !wall.stopped && $.contains(document.documentElement, self.el);
            };
            let quiet = function() {
                let reduced = false;
                try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (error) { reduced = false; }
                return reduced || document.hidden || tooltipState.$tip !== null || ui.pin !== null ||
                    ui.query !== '' || ui.band !== NO_BAND || ui.tactic !== null ||
                    hoverBand !== NO_BAND || hoverStatus !== null || self.$el.find(':focus').length > 0;
            };

            let twinkle = function() {
                if (!alive()) return;
                wall.timers.twinkle = setTimeout(twinkle, 220 + Math.random() * 330);
                if (quiet()) return;
                let box = self.el.getBoundingClientRect();
                let cells = $('.mtr-technique[data-value], .mtr-technique[data-status]', $content).filter(function() {
                    if (!this.animate) return false;
                    let r = this.getBoundingClientRect();
                    return box.width === 0 || (r.top > box.top && r.bottom < box.bottom && r.left > box.left && r.right < box.right);
                }).toArray();
                for (let i = 0; i < 2 && cells.length > 0; i++) {
                    let cell = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
                    cell.animate([
                        { filter: 'brightness(1)' },
                        { filter: 'brightness(1.7) saturate(1.25)', offset: 0.4 },
                        { filter: 'brightness(1)' }
                    ], { duration: 1300 + Math.random() * 700, easing: 'ease-in-out' });
                }
            };

            let scramble = function($el) {
                let el = $el[0];
                if (!el || wall.scrambling.some(entry => entry.el === el)) return;
                let final = $el.text();
                let chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+';
                let started = Date.now();
                let duration = 900 + final.length * 22;
                let entry = { el: el, final: final, id: 0 };
                entry.id = setInterval(function() {
                    let progress = Math.min(1, (Date.now() - started) / duration);
                    let reveal = Math.floor(final.length * progress);
                    $el.text(final.split('').map(function(c, i) {
                        return (i < reveal || c === ' ' || c === '­' || c === '%' || c === '/') ? c : chars[Math.floor(Math.random() * chars.length)];
                    }).join(''));
                    if (progress >= 1) {
                        clearInterval(entry.id);
                        $el.text(final);
                        wall.scrambling = wall.scrambling.filter(other => other !== entry);
                    }
                }, 45);
                wall.scrambling.push(entry);
            };

            let decode = function() {
                if (!alive()) return;
                wall.timers.decode = setTimeout(decode, 3500 + Math.random() * 2500);
                // Not while the percentages are still counting up.
                if (quiet() || Date.now() - wall.startedAt < 2500) return;
                let $cols = $('.mtr-tactic-col', $content);
                if ($cols.length === 0) return;
                let $col = $cols.eq(Math.floor(Math.random() * $cols.length));
                scramble($('.mtr-tactic-title', $col));
                scramble($('.mtr-fig-pct', $col));
            };

            self._stopWall = function() {
                wall.stopped = true;
                clearTimeout(wall.timers.twinkle);
                clearTimeout(wall.timers.decode);
                wall.scrambling.forEach(function(entry) {
                    clearInterval(entry.id);
                    $(entry.el).text(entry.final);
                });
                wall.scrambling = [];
                self._stopWall = null;
            };

            wall.timers.twinkle = setTimeout(twinkle, 800);
            wall.timers.decode = setTimeout(decode, 3000);
        }

        // On the first render, the percentages count up and the gauges fill.
        if (entrance) {
            let reduced = false;
            try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (error) { reduced = false; }
            if (!reduced) {
                let started = null;
                let figures = $('.mtr-tactic-col', $content).toArray();
                let tick = function(now) {
                    if (started === null) started = now;
                    let progress = Math.min(1, (now - started) / 400);
                    let eased = 1 - Math.pow(1 - progress, 3);
                    figures.forEach(function(col) {
                        let figs = $(col).data('mtrFigs');
                        if (figs && !statusMode) $('.mtr-fig-pct', col).text(Math.round(figs.coverage * eased) + '%');
                    });
                    if (progress < 1) self._countFrame = window.requestAnimationFrame(tick);
                };
                self._countFrame = window.requestAnimationFrame(tick);
            }
            window.requestAnimationFrame(function() {
                $('.mtr-tactic .mtr-meter-fill[data-width]', $content).each(function() {
                    $(this).css('width', $(this).attr('data-width') + '%');
                });
            });
        }
        // The entrance runs once.
        if (entrance) {
            setTimeout(function() { self.$el.removeClass('mtr-enter'); }, 1200);
        }
        };

        // A newer render makes any fetch still in flight obsolete.
        let token = this._renderToken = (this._renderToken || 0) + 1;

        if (options.matrixSource == 'splunk' && logic.IMPORTED_MATRICES.indexOf(matrix) >= 0) {
            if (!this._ui.rendered) {
                this._renderMessage(theme, 'Loading ATT&CK data…', 'Reading the imported matrix.');
            }
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

    // A message in place of the matrix (no results, loading).
    _renderMessage: function(theme, title, text) {
        if (this._stopWall) this._stopWall();
        clearTimeout(this._showTimer);
        clearTimeout(this._hideTimer);
        window.cancelAnimationFrame(this._countFrame);
        this.$el.empty().attr('class', '').addClass(theme).addClass('mtr-viz');
        $('<div class="mtr-message" role="status"></div>')
            .append($('<b></b>').text(title))
            .append($('<span></span>').text(text))
            .appendTo(this.$el);
    },

    // Puts text in a cell label, with the part that matches the search underlined.
    _highlight: function($span, text, query) {
        if ($span.length === 0) return;
        $span.empty();
        let index = query ? String(text).toLowerCase().indexOf(query) : -1;
        if (index < 0) {
            $span.text(text);
            return;
        }
        $span.append(document.createTextNode(text.slice(0, index)));
        $('<span class="mtr-hl"></span>').text(text.slice(index, index + query.length)).appendTo($span);
        $span.append(document.createTextNode(text.slice(index + query.length)));
    },

    // Places a tooltip next to its cell: on the right, or the left near the edge, and
    // always inside the visible part of the panel.
    _placeTooltip: function($tip, $cell) {
        let el = this.el;
        let box = el.getBoundingClientRect();
        let cell = $cell[0].getBoundingClientRect();
        let width = Math.max(220, Math.min(TOOLTIP_WIDTH, el.clientWidth - 24));
        $tip.css('width', width + 'px');
        // Touching the cell, so the pointer can move onto the tooltip without crossing other cells.
        let left = cell.right - box.left + el.scrollLeft;
        if (cell.right - box.left + width > el.clientWidth - 12) left = cell.left - box.left + el.scrollLeft - width;
        left = Math.max(el.scrollLeft + 12, left);
        let height = $tip.outerHeight() || 0;
        let top = cell.top - box.top + el.scrollTop - 4;
        let maxTop = el.scrollTop + el.clientHeight - height - 12;
        top = Math.max(el.scrollTop + 12, Math.min(top, maxTop));
        $tip.css({ left: Math.round(left) + 'px', top: Math.round(top) + 'px' });
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
    // Hovering a swatch dims the cells that have another status (`onFocus` gets the
    // status key, then null when the pointer leaves).
    _statusLegend: function(legendTitle, items, onFocus) {
        let $legend = $('<div class="mtr-legend mtr-legend-status"><div class="mtr-legend-top"><span class="mtr-legend-title"></span></div><div class="mtr-status-legend"></div></div>');
        $('.mtr-legend-title', $legend).html(legendTitle);

        items.forEach(function(item) {
            let $item = $('<button type="button" class="mtr-status-item"><span class="mtr-status-swatch"></span><span class="mtr-status-label"></span><span class="mtr-status-count"></span></button>');
            $('.mtr-status-swatch', $item).css('background', item.color);
            $('.mtr-status-label', $item).text(item.name);
            $('.mtr-status-count', $item).text(item.count.toLocaleString());
            $item.attr('data-status-key', item.key).on('mouseenter focus', function() {
                onFocus(item.key);
            }).on('mouseleave blur', function() {
                onFocus(null);
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

            let $stat = $('<div class="mtr-stat"><div class="mtr-stats-label"><span class="mtr-status-swatch"></span><span class="mtr-stats-name"></span></div><div class="mtr-stats-val"></div></div>');
            $('.mtr-status-swatch', $stat).css('background', item.color);
            $('.mtr-stats-name', $stat).text(item.name);
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
