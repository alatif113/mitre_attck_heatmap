/*
 * Pure heatmap logic: config parsing, data transforms and scale/layout math.
 * Nothing here touches the DOM or Splunk APIs (vizUtils is passed in), so it
 * can be unit tested directly.
 *
 * Defaults reproduce the original behavior; see docs/audit.md for the quirks
 * that were deliberately left alone (for example the sort tie handling).
 */
define(function() {

    const MIN_PERCENT = 2;
    const DESCRIPTION_PREVIEW_CHARS = 256;
    const TOOLTIP_FLIP_MARGIN = 400;

    // Platform names that ATT&CK has since renamed or folded together. Saved
    // dashboards may still hold the old values, so map them to the current
    // names rather than silently matching nothing.
    const PLATFORM_ALIASES = {
        'Azure AD': 'Identity Provider',
        'Google Workspace': 'Office Suite',
        'Office 365': 'Office Suite',
        'Network': 'Network Devices'
    };

    function normalizePlatform(name) {
        return PLATFORM_ALIASES.hasOwnProperty(name) ? PLATFORM_ALIASES[name] : name;
    }

    // Format options arrive as strings; text that is not a number gets the default.
    function toNumber(raw, fallback) {
        let number = parseFloat(raw);
        return isNaN(number) ? fallback : number;
    }

    // Raised for field-mapping problems the user can fix in the format menu.
    function FieldError(message) {
        this.name = 'FieldError';
        this.message = message;
    }
    FieldError.prototype = Object.create(Error.prototype);
    FieldError.prototype.constructor = FieldError;

    // The four field-name options, trimmed. '' means not set.
    function mappingNames(config, namespace) {
        let names = {};
        ['idField', 'valueField', 'descriptionField', 'statusField'].forEach(function(key) {
            names[key] = String(config[namespace + key] || '').trim();
        });
        return names;
    }

    // Exact name first, then ignoring case. -1 when absent.
    function findField(fields, wanted) {
        let index = fields.findIndex(f => f.name === wanted);
        if (index < 0) {
            index = fields.findIndex(f => String(f.name).toLowerCase() === wanted.toLowerCase());
        }
        return index;
    }

    // Column indexes for the id, value, description and status fields; -1 means
    // the field is not used. Unnamed fields keep their positions: id is the 1st
    // column, value the 2nd, description the 3rd (when no other field uses it).
    function resolveFields(fields, names) {
        let named = function(key) {
            return String((names || {})[key] || '').trim();
        };
        let byName = function(key, label) {
            let index = findField(fields, named(key));
            if (index < 0) {
                throw new FieldError(
                    'The ' + label + ' field "' + named(key) + '" is not in the results. Available fields: ' +
                    fields.map(f => f.name).join(', ') + '.'
                );
            }
            return index;
        };

        let id = named('idField') ? byName('idField', 'ID') : 0;
        let value = named('valueField') ? byName('valueField', 'value') : 1;
        let status = named('statusField') ? byName('statusField', 'status') : -1;

        if (id >= fields.length || value >= fields.length) {
            throw new FieldError('Search results must have at least 2 fields: id, count');
        }
        if (id === value) {
            throw new FieldError(
                'The ID field and the value field are the same column ("' + fields[id].name + '"). Choose different fields.'
            );
        }

        let description = -1;
        if (named('descriptionField')) {
            description = byName('descriptionField', 'description');
        } else if (fields.length > 2 && [id, value, status].indexOf(2) < 0) {
            description = 2;
        }

        return { id: id, value: value, description: description, status: status };
    }

    // Reads the format options. The defaults here must equal the [default] stanza of
    // savedsearches.conf (a test checks): classic dashboards get that stanza merged in,
    // while Dashboard Studio passes only the options set in the dashboard.
    function parseConfig(config, namespace, vizUtils, fields) {
        let get = function(key) {
            return config[namespace + key];
        };
        let matrixPlatform = (get('matrix') || 'enterprise::').split('::');
        let columns = resolveFields(fields, mappingNames(config, namespace));
        let statusColors = parseStatusColors(get('statusColors'));

        return {
            columns: columns,
            animate: vizUtils.normalizeBoolean(get('animate') || 'yes'),
            duration: Math.max(toNumber(get('duration'), 300), 0) || 300,
            startColor: get('startColor') || '#B63457',
            midColor: get('midColor') || '#FCFCBD',
            endColor: get('endColor') || '#22908D',
            startVal: toNumber(get('startVal'), 0),
            endVal: toNumber(get('endVal'), 100),
            display: get('display') || 'id',
            legendTitle: vizUtils.escapeHtml(get('legendTitle')) ||
                vizUtils.escapeHtml(fields[columns.status >= 0 ? columns.status : columns.value].name),
            sortKey: get('sortKey') || 'data-value',
            sortOrder: get('sortOrder') || 'asc',
            hideNull: vizUtils.normalizeBoolean(get('hideNull') || 'no'),
            showSubTechniques: vizUtils.normalizeBoolean(get('showSubTechniques') || 'yes'),
            showSearchBar: vizUtils.normalizeBoolean(get('showSearchBar') || 'yes'),
            showExportButton: vizUtils.normalizeBoolean(get('showExportButton') || 'no'),
            navigatorLayerName: String(get('navigatorLayerName') || '').trim(),
            navigatorAttackVersion: String(get('navigatorAttackVersion') || '').trim(),
            matrixSource: get('matrixSource') == 'splunk' ? 'splunk' : 'bundled',
            attackVersion: String(get('attackVersion') || '').trim(),
            statusMode: columns.status >= 0,
            statusColors: statusColors,
            statusPriority: statusColors.map(entry => entry.key),
            statusDefaultColor: HEX_COLOR.test(String(get('statusDefaultColor') || '').trim())
                ? String(get('statusDefaultColor')).trim() : DEFAULT_STATUS_COLOR,
            scaleMode: get('scaleMode') == 'auto' ? 'auto' : 'manual',
            autoLowerBound: get('autoLowerBound') == 'min' ? 'min' : 'zero',
            rollup: ROLLUPS.indexOf(get('rollup')) >= 0 ? get('rollup') : 'none',
            rollupParent: get('rollupParent') == 'include' ? 'include' : 'fill',
            matrix: matrixPlatform[0],
            platform: matrixPlatform[1].split(',').map(normalizePlatform)
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

    // `columns` comes from resolveFields; without it the first three columns are used.
    function parseRow(row, escapeHtml, columns) {
        columns = columns || { id: 0, value: 1, description: 2, status: -1 };
        return {
            id: escapeHtml(row[columns.id]),
            count: escapeHtml(row[columns.value]),
            description: columns.description >= 0 ? (escapeHtml(row[columns.description]) || "") : "",
            status: columns.status >= 0 ? String(row[columns.status] == null ? '' : row[columns.status]).trim() : ''
        };
    }

    // The parent technique of each sub-technique that is shown on this platform.
    function subTechniqueParents(matrix, platform) {
        let parents = new Map();
        (matrix.sub_techniques || []).forEach(function(sub) {
            if (isOnPlatform(sub, platform) && typeof sub.technique === 'string') {
                parents.set(sub.id, sub.technique);
            }
        });
        return parents;
    }

    const ROLLUPS = ['sum', 'max', 'avg', 'count'];

    function aggregate(values, rollup) {
        let sum = values.reduce((total, value) => total + value, 0);
        if (rollup == 'sum') return parseFloat(sum.toFixed(6));
        if (rollup == 'max') return Math.max.apply(null, values);
        if (rollup == 'avg') return Math.round(sum / values.length);
        return values.length;
    }

    // The status with the highest priority (earliest in `priority`, lower-cased);
    // statuses not in the list come last, and the first one seen wins ties.
    function highestPriorityStatus(statuses, priority) {
        let rank = status => {
            let index = priority.indexOf(status.toLowerCase());
            return index < 0 ? priority.length : index;
        };
        return statuses.reduce((best, status) => rank(status) < rank(best) ? status : best);
    }

    // Gives each parent technique a value (and, if it has none, a status) taken
    // from its sub-techniques. `entries` maps id -> {id, count, description,
    // status}; a new Map is returned and the input is not changed. Rolled-up
    // entries carry `rolledFrom`, the number of sub-techniques that contributed.
    function rollUp(entries, subToParent, rollup, rollupParent, statusPriority) {
        if (ROLLUPS.indexOf(rollup) < 0 || subToParent.size == 0) return entries;

        let groups = new Map();
        entries.forEach(function(entry, id) {
            let parent = subToParent.get(id);
            if (parent === undefined) return;
            let group = groups.get(parent) || { values: [], statuses: [], children: 0 };
            group.children += 1;
            if (isValidCount(entry.count)) group.values.push(Number(entry.count));
            if (entry.status) group.statuses.push(entry.status);
            groups.set(parent, group);
        });

        let result = new Map(entries);
        groups.forEach(function(group, parent) {
            let own = entries.get(parent);
            let merged = Object.assign({ id: parent, count: '', description: '', status: '' }, own);
            let ownHasValue = !!own && isValidCount(own.count);
            let changed = false;

            if (group.values.length && (!ownHasValue || rollupParent == 'include')) {
                let values = group.values;
                if (ownHasValue && rollup != 'count') values = values.concat(Number(own.count));
                merged.count = String(aggregate(values, rollup));
                changed = true;
            }
            if (group.statuses.length && !merged.status) {
                merged.status = highestPriorityStatus(group.statuses, statusPriority || []);
                changed = true;
            }
            if (changed) {
                merged.rolledFrom = group.children;
                result.set(parent, merged);
            }
        });
        return result;
    }

    const MAX_STATUSES = 24;
    const HEX_COLOR = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
    const DEFAULT_STATUS_COLOR = '#8c8c8c';

    // "covered=#53a051, partial=#f1813f" -> [{name, key, color}] in the order
    // written. Entries without a valid #rgb/#rrggbb color or with a repeated
    // name (ignoring case) are skipped; at most 24 are kept.
    function parseStatusColors(text) {
        let list = [];
        let seen = Object.create(null);
        String(text || '').split(',').forEach(function(part) {
            let at = part.lastIndexOf('=');
            if (at < 0) return;
            let name = part.slice(0, at).trim();
            let color = part.slice(at + 1).trim();
            let key = name.toLowerCase();
            if (!name || !HEX_COLOR.test(color) || seen[key] || list.length >= MAX_STATUSES) return;
            seen[key] = true;
            list.push({ name: name, key: key, color: color });
        });
        return list;
    }

    // Matching ignores case and surrounding spaces.
    function statusColor(status, list, defaultColor) {
        let key = String(status || '').trim().toLowerCase();
        let found = list.find(entry => entry.key == key);
        return found ? found.color : defaultColor;
    }

    // Position of a status in the configured order; unlisted statuses rank last.
    function statusRank(status, priority) {
        let index = priority.indexOf(String(status || '').trim().toLowerCase());
        return index < 0 ? priority.length : index;
    }

    // Black or white text, whichever reads better on a #rgb/#rrggbb background.
    function readableTextColor(hex) {
        let color = hexToRgb(hex);
        let luminance = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
        return luminance > 0.65 ? 'rgb(0,0,0)' : 'rgb(255,255,255)';
    }

    // The statuses to show in the legend, with how many cells have each: the
    // configured ones first (even with no cells), then any others in the order
    // they appear. `isShown(id)` says whether an id has a cell on the page.
    function statusSummary(entries, isShown, list) {
        let items = new Map();
        list.forEach(entry => items.set(entry.key, { name: entry.name, key: entry.key, count: 0 }));
        entries.forEach(function(entry, id) {
            if (!entry.status || !isShown(id)) return;
            let key = entry.status.toLowerCase();
            let item = items.get(key);
            if (!item) {
                if (items.size >= MAX_STATUSES) return;
                item = { name: entry.status, key: key, count: 0 };
                items.set(key, item);
            }
            item.count += 1;
        });
        return Array.from(items.values());
    }

    // A bar split in proportion to each status's share of `total` cells, in the
    // order given; the remainder is transparent. Two stops per color keep the
    // edges hard in every browser.
    function statusBarGradient(items, counts, total) {
        let stops = [];
        let position = 0;
        items.forEach(function(item) {
            let count = counts[item.key] || 0;
            if (!count || !total) return;
            let end = position + count / total * 100;
            stops.push(item.color + ' ' + position + '%', item.color + ' ' + end + '%');
            position = end;
        });
        if (position < 100) stops.push('transparent ' + position + '%', 'transparent 100%');
        return 'linear-gradient(to right, ' + stops.join(', ') + ')';
    }

    const NAVIGATOR_DOMAINS = { enterprise: 'enterprise-attack', mobile: 'mobile-attack', ics: 'ics-attack' };
    const NAVIGATOR_VERSION = '4.9.0';
    const NAVIGATOR_LAYER_VERSION = '4.5';
    const NAVIGATOR_COMMENT_CHARS = 2000;

    // The ATT&CK Navigator domain for a matrix; null for matrices it does not know (D3FEND).
    function navigatorDomain(matrix) {
        return NAVIGATOR_DOMAINS.hasOwnProperty(matrix) ? NAVIGATOR_DOMAINS[matrix] : null;
    }

    // "20.1" -> "20"; '' when there is no usable version.
    function attackMajor(version) {
        let match = String(version || '').trim().match(/^(\d+)/);
        return match ? match[1] : '';
    }

    // #rgb -> #rrggbb; anything else is returned unchanged.
    function normalizeHex(color) {
        let match = String(color).trim().match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
        return match ? '#' + match[1] + match[1] + match[2] + match[2] + match[3] + match[3] : String(color).trim();
    }

    // Reverses the HTML escaping applied to values read from the results.
    function unescapeHtml(text) {
        const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
        return String(text == null ? '' : text).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, function(match, code) {
            if (code[0] == '#') {
                let number = code[1].toLowerCase() == 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
                return isNaN(number) ? match : String.fromCodePoint(number);
            }
            return named.hasOwnProperty(code.toLowerCase()) ? named[code.toLowerCase()] : match;
        });
    }

    // "Detection coverage" -> "Detection-coverage.json"
    function navigatorFileName(name) {
        let slug = String(name || '').trim().replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
        return (slug || 'mitre-attack-heatmap') + '.json';
    }

    // The technique entries of a Navigator layer: every id that has a cell and a
    // value or status. A technique that has scored sub-techniques gets
    // showSubtechniques so Navigator expands it, and is added if it has no entry
    // of its own. `isShown(id)` says whether an id exists in the matrix on screen.
    function navigatorTechniques(entries, isShown, subToParent, statusColorOf) {
        let items = new Map();
        let expanded = new Set();

        entries.forEach(function(entry, rawId) {
            let id = unescapeHtml(rawId);
            if (!isShown(rawId)) return;
            let hasValue = isValidCount(entry.count);
            if (!hasValue && !entry.status) return;

            let item = { techniqueID: id };
            if (hasValue) item.score = Number(entry.count);
            if (entry.status) item.color = normalizeHex(statusColorOf(entry.status));
            let comment = unescapeHtml(entry.description);
            if (entry.rolledFrom) {
                comment = (comment ? comment + ' ' : '') + '(rolled up from ' + entry.rolledFrom + ' sub-technique' + (entry.rolledFrom == 1 ? '' : 's') + ')';
            }
            if (comment) item.comment = comment.slice(0, NAVIGATOR_COMMENT_CHARS);
            item.enabled = true;
            items.set(id, item);

            if (subToParent.has(rawId)) expanded.add(subToParent.get(rawId));
        });

        expanded.forEach(function(parent) {
            if (!items.has(parent) && isShown(parent)) items.set(parent, { techniqueID: parent, enabled: true });
            if (items.has(parent)) items.get(parent).showSubtechniques = true;
        });

        return Array.from(items.values()).sort((a, b) => a.techniqueID < b.techniqueID ? -1 : (a.techniqueID > b.techniqueID ? 1 : 0));
    }

    // An ATT&CK Navigator layer (format 4.5). `gradient` is {colors, minValue,
    // maxValue} or null; the layer needs minValue < maxValue.
    function buildNavigatorLayer(model) {
        let versions = {};
        if (model.attackVersion) versions.attack = String(model.attackVersion);
        versions.navigator = NAVIGATOR_VERSION;
        versions.layer = NAVIGATOR_LAYER_VERSION;

        let layer = { name: model.name, versions: versions, domain: model.domain };
        if (model.platforms && model.platforms.length) layer.filters = { platforms: model.platforms };
        layer.techniques = model.techniques;
        if (model.gradient) {
            let max = model.gradient.maxValue > model.gradient.minValue ? model.gradient.maxValue : model.gradient.minValue + 1;
            layer.gradient = { colors: model.gradient.colors.map(normalizeHex), minValue: model.gradient.minValue, maxValue: max };
        }
        if (model.legendItems && model.legendItems.length) {
            layer.legendItems = model.legendItems.map(item => ({ label: item.label, color: normalizeHex(item.color) }));
        }
        return layer;
    }

    // ---- Imported matrices (the scripted input's KV Store collection) ----

    const KV_COLLECTION = 'mitre_matrix';
    const IMPORTED_MATRICES = ['enterprise', 'ics', 'mobile'];

    // The REST URL of a matrix's records in the KV Store, through Splunk Web's
    // splunkd proxy, derived from the page's own path (which has the optional
    // root endpoint and the locale in front: /<root>/<locale>/app/...).
    // `pathnames` is one path or a list of candidates; the first that looks like a
    // Splunk Web page wins (inside a Dashboard Studio iframe the document's own
    // path is meaningless, but its base URL is the dashboard's).
    function kvStoreUrl(pathnames, matrix) {
        let pattern = /^(.*?)\/([A-Za-z]{2}(?:-[A-Za-z]{2,4})?)\/(?:app|manager|dashboards|embed|dj)(?:\/|$)/;
        let match = null;
        [].concat(pathnames).some(function(pathname) {
            match = String(pathname || '').match(pattern);
            return !!match;
        });
        let base = match ? match[1] + '/' + match[2] : '/en-US';
        return base + '/splunkd/__raw/servicesNS/nobody/mitre_attck_heatmap/storage/collections/data/' + KV_COLLECTION +
            '?query=' + encodeURIComponent(JSON.stringify({ matrix: matrix }));
    }

    // Compares dotted numeric versions: "20.1" > "20.0" > "9.2". Returns -1, 0 or 1.
    function compareVersions(a, b) {
        let left = String(a).split('.').map(part => parseInt(part, 10) || 0);
        let right = String(b).split('.').map(part => parseInt(part, 10) || 0);
        for (let i = 0; i < Math.max(left.length, right.length); i++) {
            let difference = (left[i] || 0) - (right[i] || 0);
            if (difference) return difference < 0 ? -1 : 1;
        }
        return 0;
    }

    // The record to use: the highest version, or with a pin the highest version
    // equal to it ("20.0") or, for a pin without a dot ("20"), within it.
    // Returns null when nothing qualifies.
    function pickMatrixRecord(records, matrix, attackVersion) {
        let pin = String(attackVersion || '').trim();
        let candidates = (Array.isArray(records) ? records : []).filter(function(record) {
            if (!record || record.matrix != matrix || typeof record.data_json != 'string') return false;
            if (!pin) return true;
            let version = String(record.version || '');
            return version == pin || (pin.indexOf('.') < 0 && version.split('.')[0] == pin);
        });
        if (candidates.length == 0) return null;
        return candidates.reduce((best, record) => compareVersions(record.version || '0', best.version || '0') > 0 ? record : best);
    }

    // Parses a record's matrix and checks it has the shape the renderer needs.
    // Returns null if it does not.
    function parseMatrixRecord(record) {
        let matrix;
        try {
            matrix = JSON.parse(record.data_json);
        } catch (error) {
            return null;
        }
        let isText = value => typeof value == 'string' && value !== '';
        let valid = !!matrix && Array.isArray(matrix.tactics) && Array.isArray(matrix.techniques) && Array.isArray(matrix.sub_techniques) &&
            matrix.tactics.length > 0 && matrix.techniques.length > 0 &&
            matrix.tactics.every(t => t && isText(t.id) && isText(t.name) && isText(t.short_name)) &&
            matrix.techniques.every(t => t && isText(t.id) && isText(t.name) && Array.isArray(t.tactics)) &&
            matrix.sub_techniques.every(t => t && isText(t.id) && isText(t.name) && typeof t.technique == 'string');
        if (!valid) return null;
        if (!matrix.version && record.version) matrix.version = String(record.version);
        return matrix;
    }

    // The one-line message shown when imported data was asked for but is not used.
    function fallbackNotice(attackVersion) {
        let pin = String(attackVersion || '').trim();
        return (pin ? 'ATT&CK version ' + pin + ' has not been imported' : 'Imported ATT&CK data is not available') +
            '; showing the bundled data.';
    }

    // ---- Layout: below this width the matrix is replaced by one tile per tactic ----

    const COMPACT_BELOW_WIDTH = 640;
    const FULL_AGAIN_AT_WIDTH = 664;   // a margin so a panel being dragged does not flicker
    const SHORT_BELOW_HEIGHT = 140;
    const FULL_AGAIN_AT_HEIGHT = 164;

    // Which layout fits a panel of this size. `current` is the previous result
    // ({compact, short}); the layout only changes once a size is clearly past a
    // limit. A size of 0 (not laid out yet, or hidden) leaves the layout as it is.
    function layoutMode(width, height, current) {
        let compact = !!(current && current.compact);
        let short = !!(current && current.short);
        if (width > 0) {
            compact = compact ? width < FULL_AGAIN_AT_WIDTH : width < COMPACT_BELOW_WIDTH;
        }
        if (height > 0) {
            short = short ? height < FULL_AGAIN_AT_HEIGHT : height < SHORT_BELOW_HEIGHT;
        }
        return { compact: compact, short: short };
    }

    // The tooltip of a tactic tile: "Execution: Total 25; Unique Techniques 1 (4%)".
    function tileTitle(name, stats) {
        let parts = stats.map(stat => (stat.label + ' ' + stat.value).trim()).filter(Boolean);
        return parts.length ? name + ': ' + parts.join('; ') : name;
    }

    // A row counts when it has a number, or (with a status field) a status.
    function isValidEntry(entry, statusMode) {
        return isValidCount(entry.count) || (!!statusMode && entry.status !== '');
    }

    // Color bounds taken from the data: the highest value is the upper bound, and
    // the lower bound is 0 (when no value is negative and "zero" is chosen) or
    // the lowest value. Rounded outward to 2 decimals. With no usable values the
    // fallback bounds are returned unchanged.
    function computeBounds(values, autoLowerBound, fallback) {
        let numbers = values.filter(Number.isFinite);
        if (numbers.length == 0) return { startVal: fallback.startVal, endVal: fallback.endVal };

        let min = numbers.reduce((a, b) => Math.min(a, b));
        let max = numbers.reduce((a, b) => Math.max(a, b));
        let lower = (autoLowerBound != 'min' && min >= 0) ? 0 : min;
        let upper = max;
        if (upper <= lower) upper = lower + 1;

        return { startVal: Math.floor(lower * 100) / 100, endVal: Math.ceil(upper * 100) / 100 };
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
        return [startVal, (startVal + endVal)/2, endVal];
    }

    // Maps a pointer x-offset over the legend to the cursor position and the
    // value window it covers. Returns null when the pointer is outside.
    function legendCursorRange(x, cursorWidth, legendWidth, startVal, endVal) {
        if (!(x <= legendWidth && x > 0)) return null;

        let left = x - cursorWidth / 2;
        return {
            left: left,
            lower: startVal + left / legendWidth * (endVal - startVal),
            upper: startVal + (left + cursorWidth) / legendWidth * (endVal - startVal)
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

        if (key == 'data-status') {
            // a and b are the cells' data-status-rank attributes; cells without a status sort last.
            let aRank = parseInt(a);
            let bRank = parseInt(b);
            if (isNaN(aRank)) aRank = Infinity;
            if (isNaN(bRank)) bRank = Infinity;
            return flip * (aRank < bRank ? -1 : (aRank > bRank ? 1 : 0));
        }

        if (key == 'data-value') {
            let aVal = parseFloat(a);
            let bVal = parseFloat(b);
            if (!Number.isFinite(aVal)) aVal = -1;
            if (!Number.isFinite(bVal)) bVal = -1;
            return flip * (aVal < bVal ? -1 : 1);
        }

        return 0;
    }

    // The value shown in a tooltip: the number in a data-value attribute, or
    // '' when the technique has none. 0 is a value.
    function parseValue(attr) {
        let value = parseFloat(attr);
        return isNaN(value) ? '' : value;
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
    // starts; wraps back to the lower bound once the window passes the upper bound.
    function animationFrame(currStep, steps, endVal, startVal) {
        let lower = currStep;
        let upper = lower + steps.stepSize + steps.stepWidth;
        let next = (lower < endVal) ? currStep + steps.stepSize : (startVal || 0);
        return { lower: lower, upper: upper, next: next };
    }

    function inFocusRange(value, lower, upper) {
        return !!(value && value >= lower && value <= upper);
    }

    return {
        MIN_PERCENT: MIN_PERCENT,
        PLATFORM_ALIASES: PLATFORM_ALIASES,
        parseConfig: parseConfig,
        FieldError: FieldError,
        mappingNames: mappingNames,
        resolveFields: resolveFields,
        selectMatrix: selectMatrix,
        isOnPlatform: isOnPlatform,
        parseRow: parseRow,
        isValidCount: isValidCount,
        computeBounds: computeBounds,
        MAX_STATUSES: MAX_STATUSES,
        DEFAULT_STATUS_COLOR: DEFAULT_STATUS_COLOR,
        parseStatusColors: parseStatusColors,
        statusColor: statusColor,
        statusRank: statusRank,
        readableTextColor: readableTextColor,
        statusSummary: statusSummary,
        statusBarGradient: statusBarGradient,
        isValidEntry: isValidEntry,
        COMPACT_BELOW_WIDTH: COMPACT_BELOW_WIDTH,
        layoutMode: layoutMode,
        tileTitle: tileTitle,
        IMPORTED_MATRICES: IMPORTED_MATRICES,
        kvStoreUrl: kvStoreUrl,
        compareVersions: compareVersions,
        pickMatrixRecord: pickMatrixRecord,
        parseMatrixRecord: parseMatrixRecord,
        fallbackNotice: fallbackNotice,
        navigatorDomain: navigatorDomain,
        attackMajor: attackMajor,
        normalizeHex: normalizeHex,
        unescapeHtml: unescapeHtml,
        navigatorFileName: navigatorFileName,
        navigatorTechniques: navigatorTechniques,
        buildNavigatorLayer: buildNavigatorLayer,
        ROLLUPS: ROLLUPS,
        subTechniqueParents: subTechniqueParents,
        rollUp: rollUp,
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
        parseValue: parseValue,
        matchesSearch: matchesSearch,
        animationSteps: animationSteps,
        animationFrame: animationFrame,
        inFocusRange: inFocusRange
    };
});
