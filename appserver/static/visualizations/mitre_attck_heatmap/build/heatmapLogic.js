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
    const NEAR_BLACK = '#0E1114';
    const NEAR_BLACK_LUMINANCE = 0.00545;   // relative luminance of #0E1114
    const DESCRIPTION_PREVIEW_CHARS = 256;

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
            palette: parsePalette(get('palette')),
            colorBands: parseBandCount(get('colorBands')),
            startColor: get('startColor') || '#B63457',
            midColor: get('midColor') || '#FCFCBD',
            endColor: get('endColor') || '#22908D',
            startVal: toNumber(get('startVal'), 0),
            endVal: toNumber(get('endVal'), 100),
            display: get('display') || 'id',
            legendTitle: vizUtils.escapeHtml(get('legendTitle')) ||
                vizUtils.escapeHtml(fields[columns.status >= 0 ? columns.status : columns.value].name),
            sortKey: get('sortKey') || 'data-value',
            sortOrder: get('sortOrder') == 'asc' ? 'asc' : 'desc',
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

    // Text color for a background given as channels 0-255: white, or near-black, or pure
    // black when near-black would fall under 4.5:1. Whatever the background, the result
    // has at least 4.5:1 contrast (the best of black and white always does).
    function textColorOn(r, g, b) {
        let channel = c => { c = Number(c) / 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
        let L = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
        let white = 1.05 / (L + 0.05);
        let black = (L + 0.05) / 0.05;
        if (white >= black) return '#FFFFFF';
        return (L + 0.05) / (NEAR_BLACK_LUMINANCE + 0.05) >= 4.5 ? NEAR_BLACK : '#000000';
    }

    // Black or white text, whichever reads better on a #rgb/#rrggbb background.
    function readableTextColor(hex) {
        let color = hexToRgb(hex);
        return textColorOn(color.r, color.g, color.b);
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

    // ---- Perceptual color interpolation ------------------------------------------
    //
    // Colors are blended in OKLCH (lightness, chroma, hue), not in RGB: a straight RGB blend
    // between two strong colors passes through a dull, muddy middle, while OKLCH keeps the
    // chroma and moves the hue and lightness evenly as the eye sees them.

    function srgbToLinear(c) {
        c = c / 255;
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }

    function linearToSrgb(c) {
        c = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
        return c * 255;
    }

    // [r, g, b] (0-255) to [L, C, h] (h in degrees).
    function rgbToOklch(r, g, b) {
        let lr = srgbToLinear(r), lg = srgbToLinear(g), lb = srgbToLinear(b);
        let l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
        let m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
        let s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
        let L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
        let A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
        let B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
        let C = Math.sqrt(A * A + B * B);
        let h = C < 0.0002 ? NaN : (Math.atan2(B, A) * 180 / Math.PI + 360) % 360;
        return [L, C, h];
    }

    // [L, C, h] to linear sRGB channels (not clamped).
    function oklchToLinear(L, C, h) {
        let A = C * Math.cos(h * Math.PI / 180);
        let B = C * Math.sin(h * Math.PI / 180);
        let l = Math.pow(L + 0.3963377774 * A + 0.2158037573 * B, 3);
        let m = Math.pow(L - 0.1055613458 * A - 0.0638541728 * B, 3);
        let s = Math.pow(L - 0.0894841775 * A - 1.2914855480 * B, 3);
        return [
            4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
            -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
            -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
        ];
    }

    function inGamut(rgb) {
        return rgb.every(c => c >= -0.0005 && c <= 1.0005);
    }

    // [L, C, h] to whole sRGB channels. A color outside what a screen can show loses chroma
    // (not lightness or hue) until it fits.
    function oklchToRgb(L, C, h) {
        let rgb = oklchToLinear(L, C, h);
        if (!inGamut(rgb)) {
            let low = 0, high = C;
            for (let i = 0; i < 20; i++) {
                let mid = (low + high) / 2;
                if (inGamut(oklchToLinear(L, mid, h))) low = mid; else high = mid;
            }
            rgb = oklchToLinear(L, low, h);
        }
        return rgb.map(c => Math.max(0, Math.min(255, Math.round(linearToSrgb(Math.max(0, Math.min(1, c)))))));
    }

    // The blend of two [L, C, h] colors, t from 0 to 1. Hue takes the shorter way round; a
    // color with no hue (gray) takes the other color's.
    function mixOklch(from, to, t) {
        let h1 = from[2], h2 = to[2];
        if (isNaN(h1)) h1 = h2;
        if (isNaN(h2)) h2 = h1;
        let h = 0;
        if (!isNaN(h1)) {
            let delta = ((h2 - h1 + 540) % 360) - 180;
            h = (h1 + delta * t + 360) % 360;
        }
        return [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t, h];
    }

    // A color map of evenly spaced stops, for getColor.
    function buildStopMap(stops) {
        return stops.map(function(color, index) {
            let rgb = hexToRgb(color);
            let channels = [Number(rgb.r), Number(rgb.g), Number(rgb.b)];
            return {
                pct: 100 * index / (stops.length - 1),
                color: rgb,
                lch: rgbToOklch(channels[0], channels[1], channels[2])
            };
        });
    }

    function buildColorMap(startColor, midColor, endColor) {
        return buildStopMap([startColor, midColor, endColor]);
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
        let color;
        if (rangePct <= 0) {
            color = { r: Number(lower.color.r), g: Number(lower.color.g), b: Number(lower.color.b) };
        } else if (rangePct >= 1) {
            color = { r: Number(upper.color.r), g: Number(upper.color.g), b: Number(upper.color.b) };
        } else {
            let mixed = mixOklch(lower.lch, upper.lch, rangePct);
            let rgb = oklchToRgb(mixed[0], mixed[1], mixed[2]);
            color = { r: rgb[0], g: rgb[1], b: rgb[2] };
        }

        let luminance = ( 0.299 * color.r + 0.587 * color.g + 0.114 * color.b)/255;
        let foreground = textColorOn(color.r, color.g, color.b);

        return {
            background: 'rgb(' + [color.r, color.g, color.b].join(',') + ')',
            luminance: luminance,
            foreground: foreground
        }
    }

    // ---- Color bands -------------------------------------------------------------

    const BAND_COUNTS = [3, 5, 7, 9];
    const DEFAULT_BANDS = 5;

    // 3, 5, 7 or 9; anything else (including text) is the default.
    function parseBandCount(raw) {
        let count = parseInt(raw, 10);
        return BAND_COUNTS.indexOf(count) >= 0 ? count : DEFAULT_BANDS;
    }

    const PALETTES = ['default', 'risk', 'blues', 'viridis'];
    const PALETTE_STOPS = {
        blues: ['#DCEAF7', '#9ECAE1', '#4292C6', '#2171B5', '#08306B'],
        viridis: ['#440154', '#3B528B', '#21918C', '#5EC962', '#FDE725']
    };

    function parsePalette(raw) {
        return PALETTES.indexOf(raw) >= 0 ? raw : 'default';
    }

    // The color stops of a palette: "default" is the three configured colors, "risk"
    // the same colors the other way round (low is good, high is bad).
    function paletteStops(palette, startColor, midColor, endColor) {
        if (palette == 'risk') return [endColor, midColor, startColor];
        if (PALETTE_STOPS[palette]) return PALETTE_STOPS[palette].slice();
        return [startColor, midColor, endColor];
    }

    function roundTo(value, decimals) {
        let factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }

    // The n + 1 edges of n bands. "equal" splits the range evenly (the right choice when
    // the bounds were set by hand); "quantile" puts about the same number of values in
    // each band (the right choice for counts, which are mostly small), keeping the
    // bounds as the outer edges.
    function computeEdges(values, count, mode, lower, upper) {
        let edges = [];
        let numbers = values.filter(Number.isFinite).sort((a, b) => a - b);
        for (let i = 0; i <= count; i++) {
            if (i == 0) edges.push(lower);
            else if (i == count) edges.push(upper);
            else if (mode == 'quantile' && numbers.length > 0) edges.push(numbers[Math.min(numbers.length - 1, Math.floor(numbers.length * i / count))]);
            else edges.push(lower + (upper - lower) * i / count);
        }
        // Edges never go backwards, whatever the data.
        for (let i = 1; i <= count; i++) {
            if (edges[i] < edges[i - 1]) edges[i] = edges[i - 1];
        }
        return edges.map(edge => roundTo(edge, 2));
    }

    // The band (0 to count - 1) a value falls in; values outside the range go to the
    // first or last band.
    function bandOf(value, edges) {
        let count = edges.length - 1;
        for (let i = count - 1; i > 0; i--) {
            if (value >= edges[i]) return i;
        }
        return 0;
    }

    // The color of each band: the gradient color at the middle of its share of the range.
    function bandColors(colorMap, count) {
        let colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(getColor(100 * (i + 0.5) / count, colorMap));
        }
        return colors;
    }

    // "1,234", "0.5": whole numbers keep their digits, long fractions are cut to 2 places.
    function formatNumber(value) {
        return roundTo(Number(value), 2).toLocaleString('en-US', { maximumFractionDigits: 2 });
    }

    // How many values are above this one, plus one (1 is the highest). `sortedDescending`
    // holds the values of everything that has one.
    function rankOf(value, sortedDescending) {
        let above = 0;
        while (above < sortedDescending.length && sortedDescending[above] > value) above++;
        return above + 1;
    }

    // ---- Keyboard ----------------------------------------------------------------

    // The cell to move to for an arrow, Home or End key. `points` are the cells' centers
    // (x, y), `columns` the tactic column of each. Arrows go to the nearest cell in that
    // direction (straying sideways costs three times as much as going on); Home and End go
    // to the first and last cell of the current column. Returns -1 when there is nowhere to go.
    function nextCell(points, index, key, columns) {
        if (index < 0 || index >= points.length) return -1;
        if (key == 'Home' || key == 'End') {
            let same = [];
            points.forEach(function(point, i) { if (columns[i] == columns[index]) same.push(i); });
            return key == 'Home' ? same[0] : same[same.length - 1];
        }
        let from = points[index];
        let best = -1;
        let bestScore = Infinity;
        points.forEach(function(point, i) {
            if (i == index) return;
            let dx = point.x - from.x;
            let dy = point.y - from.y;
            let score = Infinity;
            if (key == 'ArrowRight' && dx > 2) score = dx + 3 * Math.abs(dy);
            if (key == 'ArrowLeft' && dx < -2) score = -dx + 3 * Math.abs(dy);
            if (key == 'ArrowDown' && dy > 2) score = dy + 3 * Math.abs(dx);
            if (key == 'ArrowUp' && dy < -2) score = -dy + 3 * Math.abs(dx);
            if (score < bestScore) {
                bestScore = score;
                best = i;
            }
        });
        return best;
    }

    // ---- Tactic names ------------------------------------------------------------

    // Syllable break points for the words in ATT&CK and D3FEND tactic names. Names with
    // other words keep them whole and the browser's own hyphenation (hyphens: auto) copes.
    const HYPHENATED = {
        Reconnaissance: 'Recon\u00ADnais\u00ADsance', Resource: 'Re\u00ADsource', Development: 'Devel\u00ADop\u00ADment',
        Privilege: 'Priv\u00ADi\u00ADlege', Escalation: 'Es\u00ADca\u00ADla\u00ADtion', Defense: 'De\u00ADfense',
        Impairment: 'Im\u00ADpair\u00ADment', Credential: 'Cre\u00ADden\u00ADtial', Access: 'Ac\u00ADcess',
        Lateral: 'Lat\u00ADer\u00ADal', Movement: 'Move\u00ADment', Exfiltration: 'Ex\u00ADfil\u00ADtra\u00ADtion',
        Persistence: 'Per\u00ADsis\u00ADtence', Discovery: 'Dis\u00ADcov\u00ADery', Collection: 'Col\u00ADlec\u00ADtion',
        Execution: 'Ex\u00ADe\u00ADcu\u00ADtion', Initial: 'Ini\u00ADtial', Command: 'Com\u00ADmand',
        Control: 'Con\u00ADtrol', Impact: 'Im\u00ADpact', Evasion: 'E\u00ADva\u00ADsion', Inhibit: 'In\u00ADhib\u00ADit',
        Response: 'Re\u00ADsponse', Function: 'Func\u00ADtion', Process: 'Proc\u00ADess', Impair: 'Im\u00ADpair',
        Stealth: 'Stealth', Inventory: 'In\u00ADven\u00ADto\u00ADry', Mapping: 'Map\u00ADping', Hardening: 'Hard\u00ADen\u00ADing',
        Analysis: 'Anal\u00ADy\u00ADsis', Isolation: 'Iso\u00ADla\u00ADtion', Eviction: 'Evic\u00ADtion', Restore: 'Re\u00ADstore'
    };

    // A tactic name with soft hyphens at syllable breaks, as text (no markup).
    function hyphenateName(name) {
        return String(name).split(' ').map(word => HYPHENATED[word] || word).join(' ');
    }

    // ---- Search ------------------------------------------------------------------

    // Which parts of a technique a (lower-cased) query matches: its id, name, the names
    // of its sub-techniques, or its description. An empty list is no match.
    function searchFields(item, query) {
        let fields = [];
        if (!query) return fields;
        let has = text => String(text == null ? '' : text).toLowerCase().indexOf(query) > -1;
        if (has(item.id)) fields.push('id');
        if (has(item.name)) fields.push('name');
        if ((item.subNames || []).some(has)) fields.push('sub-technique');
        if (has(item.description)) fields.push('description');
        return fields;
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
        tacticStats: tacticStats,
        formatDescription: formatDescription,
        compareByKey: compareByKey,
        parseValue: parseValue,
        searchFields: searchFields,
        nextCell: nextCell,
        BAND_COUNTS: BAND_COUNTS,
        DEFAULT_BANDS: DEFAULT_BANDS,
        parseBandCount: parseBandCount,
        PALETTES: PALETTES,
        parsePalette: parsePalette,
        paletteStops: paletteStops,
        buildStopMap: buildStopMap,
        rgbToOklch: rgbToOklch,
        oklchToRgb: oklchToRgb,
        mixOklch: mixOklch,
        computeEdges: computeEdges,
        bandOf: bandOf,
        bandColors: bandColors,
        formatNumber: formatNumber,
        rankOf: rankOf,
        hyphenateName: hyphenateName,
        textColorOn: textColorOn
    };
});
