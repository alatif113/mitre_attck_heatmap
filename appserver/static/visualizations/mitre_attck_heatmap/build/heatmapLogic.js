/*
 * Pure heatmap logic: config parsing, data transforms and scale/layout math.
 * Nothing here touches the DOM or Splunk APIs (vizUtils is passed in), so it
 * can be unit tested directly.
 *
 * Behavior intentionally matches the original inline code, quirks included
 * (numeric options stay strings, legend midpoint is (end - start) / 2, etc.).
 * See docs/audit.md before "fixing" any of them.
 */
define(function() {

    const MIN_PERCENT = 2;
    const DESCRIPTION_PREVIEW_CHARS = 256;
    const TOOLTIP_FLIP_MARGIN = 400;

    // Reads the format options, applying the same defaults as before.
    function parseConfig(config, namespace, vizUtils, fields) {
        let get = function(key) {
            return config[namespace + key];
        };
        let matrixPlatform = (get('matrix') || 'enterprise::').split('::');

        return {
            animate: vizUtils.normalizeBoolean(get('animate') || 'no'),
            duration: get('duration') || 300,
            startColor: get('startColor') || '#53a051',
            midColor: get('midColor') || '#f8be34',
            endColor: get('endColor') || '#dc4e41',
            startVal: get('startVal') || 0,
            endVal: get('endVal') || 100,
            display: get('display') || 'id',
            legendTitle: vizUtils.escapeHtml(get('legendTitle')) || fields[1].name,
            sortKey: get('sortKey') || 'data-id',
            sortOrder: get('sortOrder') || 'asc',
            hideNull: vizUtils.normalizeBoolean(get('hideNull') || 'no'),
            showSubTechniques: vizUtils.normalizeBoolean(get('showSubTechniques') || 'yes'),
            showSearchBar: vizUtils.normalizeBoolean(get('showSearchBar') || 'yes'),
            matrix: matrixPlatform[0],
            platform: matrixPlatform[1].split(',')
        };
    }

    function selectMatrix(matrix, matrices) {
        if (matrix == 'ics') return matrices.ics;
        if (matrix == 'mobile') return matrices.mobile;
        if (matrix == 'd3fend') return matrices.d3fend;
        return matrices.enterprise;
    }

    // An empty platform list ([''] from "enterprise::") or an item without
    // platform data always matches.
    function isOnPlatform(item, platform) {
        if (platform != '' && 'platform' in item) {
            return platform.some(p => item.platform.indexOf(p) >= 0);
        }
        return true;
    }

    function parseRow(row, escapeHtml) {
        return {
            id: escapeHtml(row[0]),
            count: escapeHtml(row[1]),
            description: escapeHtml(row[2]) || ""
        };
    }

    function isValidCount(count) {
        return !(!count || count == '' || count == null || isNaN(count));
    }

    function getPercent(lowerBound, upperBound, value) {
        let percent = Math.round(100 * (value - lowerBound) / (upperBound - lowerBound));
        if (percent > 100) percent = 100;
        if (percent < 0) percent = 0;
        return percent;
    }

    // Keeps very low values visible as a sliver of meter.
    function visiblePercent(percent) {
        if (percent < MIN_PERCENT) percent = MIN_PERCENT;
        return percent;
    }

    // Returns channels as "0x.." strings; arithmetic in getColor coerces them.
    function hexToRgb(h) {
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
    }

    function buildColorMap(startColor, midColor, endColor) {
        return [
            { pct: 0, color: hexToRgb(startColor) },
            { pct: 50, color: hexToRgb(midColor) },
            { pct: 100, color: hexToRgb(endColor) }
        ];
    }

    function getColor(percent, colorMap) {
        let i;
        for (i = 1; i < colorMap.length - 1; i++) {
            if (percent < colorMap[i].pct) {
                break;
            }
        }

        let lower = colorMap[i - 1];
        let upper = colorMap[i];
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
    }

    function legendGradient(startColor, midColor, endColor) {
        return '(45deg, ' + startColor + ' 0%, ' + midColor + ' 50%, ' + endColor + ' 100%)';
    }

    // Lower, middle and upper labels under the legend bar.
    function legendLabels(startVal, endVal) {
        return [startVal, (endVal - startVal)/2, endVal];
    }

    // Maps a pointer x-offset over the legend to the cursor position and the
    // value window it covers. Returns null when the pointer is outside.
    function legendCursorRange(x, cursorWidth, legendWidth, startVal, endVal) {
        if (!(x <= legendWidth && x > 0)) return null;

        let left = x - cursorWidth / 2;
        return {
            left: left,
            lower: left / legendWidth * (endVal - startVal),
            upper: (left + cursorWidth) / legendWidth * (endVal - startVal)
        };
    }

    // Per-tactic totals from the data-value attributes of its techniques
    // (undefined for techniques without a result row).
    function tacticStats(values) {
        let sum = 0;
        let count = 0;
        let total = 0;

        values.forEach(function(val) {
            total += 1;
            if (val && !isNaN(val)) {
                sum += +val;
                count += 1;
            }
        });

        let mean = Math.round(sum / count);
        let coverage = Math.round(count / total * 100);
        if (!mean) mean = 0;
        if (!coverage) coverage = 0;

        return { sum: sum, count: count, total: total, mean: mean, coverage: coverage };
    }

    // Splits on literal "\n" sequences into paragraphs, hiding everything past
    // the preview length behind a "Show more" link.
    function formatDescription(description) {
        let showChar = DESCRIPTION_PREVIEW_CHARS;
        if (description.length > showChar) {
            let visible = description.substr(0, showChar);
            let hidden = description.substr(showChar, description.length - showChar);
            visible = visible.split('\\n').join('</p><p>');
            hidden = hidden.split('\\n').join('</p><p>');
            return `<p>${visible} <span class="more-elipses">...</span><span class="more-content">${hidden}</span><a href="#" class="more-link">Show more</a></p>`;
        }
        return description.split('\\n').join('</p><p>');
    }

    function tooltipSide(offsetLeft, windowWidth) {
        return (offsetLeft > windowWidth - TOOLTIP_FLIP_MARGIN) ? 'left' : 'right';
    }

    // Comparator over the sort-key attribute of two techniques.
    function compareByKey(key, order, a, b) {
        let flip = (order == 'asc') ? 1 : -1;

        if (key == 'data-id' || key == 'data-name') {
            return flip * (a < b ? -1 : 1);
        }

        if (key == 'data-value') {
            let aVal = parseInt(a);
            let bVal = parseInt(b);
            if (!Number.isInteger(aVal)) aVal = -1;
            if (!Number.isInteger(bVal)) bVal = -1;
            return flip * (aVal < bVal ? -1 : 1);
        }

        return 0;
    }

    // `query` is expected lower-cased already.
    function matchesSearch(id, name, query) {
        id = id?.toLowerCase();
        name = name?.toLowerCase();
        return (id?.indexOf(query) > -1 || name?.indexOf(query) > -1);
    }

    function animationSteps(startVal, endVal, duration) {
        return {
            stepSize: (endVal - startVal) / duration / 60,
            stepWidth: (endVal - startVal) * .1
        };
    }

    // The value window to highlight for this frame and where the next frame
    // starts; wraps to 0 once the window passes the upper bound.
    function animationFrame(currStep, steps, endVal) {
        let lower = currStep;
        let upper = lower + steps.stepSize + steps.stepWidth;
        let next = (lower < endVal) ? currStep + steps.stepSize : 0;
        return { lower: lower, upper: upper, next: next };
    }

    function inFocusRange(value, lower, upper) {
        return !!(value && value >= lower && value <= upper);
    }

    return {
        MIN_PERCENT: MIN_PERCENT,
        parseConfig: parseConfig,
        selectMatrix: selectMatrix,
        isOnPlatform: isOnPlatform,
        parseRow: parseRow,
        isValidCount: isValidCount,
        getPercent: getPercent,
        visiblePercent: visiblePercent,
        hexToRgb: hexToRgb,
        buildColorMap: buildColorMap,
        getColor: getColor,
        legendGradient: legendGradient,
        legendLabels: legendLabels,
        legendCursorRange: legendCursorRange,
        tacticStats: tacticStats,
        formatDescription: formatDescription,
        tooltipSide: tooltipSide,
        compareByKey: compareByKey,
        matchesSearch: matchesSearch,
        animationSteps: animationSteps,
        animationFrame: animationFrame,
        inFocusRange: inFocusRange
    };
});
