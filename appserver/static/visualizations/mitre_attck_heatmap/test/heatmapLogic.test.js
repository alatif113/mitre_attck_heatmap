/*
 * Unit tests for build/heatmapLogic.js. Tests named "(audit ...)" pin current
 * defective behavior documented in docs/audit.md; change them together with
 * the fix.
 */
const logic = require('heatmapLogic');
const vizUtils = require('api/SplunkVisualizationUtils');
const { NAMESPACE, buildConfig, loadFixture } = require('./support/render');

const FIELDS = [{ name: 'id' }, { name: 'Detection Count' }];

describe('parseConfig', () => {
    const parse = (config, fields) => logic.parseConfig(config, NAMESPACE, vizUtils, fields || FIELDS);
    const withOptions = options => {
        const config = {};
        Object.keys(options).forEach(key => { config[NAMESPACE + key] = options[key]; });
        return config;
    };

    test('applies code defaults when no options are set', () => {
        expect(parse({})).toEqual({
            columns: { id: 0, value: 1, description: -1, status: -1 },
            animate: false,
            duration: 300,
            startColor: '#53a051',
            midColor: '#f8be34',
            endColor: '#dc4e41',
            startVal: 0,
            endVal: 100,
            display: 'id',
            legendTitle: 'Detection Count',
            sortKey: 'data-id',
            sortOrder: 'asc',
            hideNull: false,
            showSubTechniques: true,
            showSearchBar: true,
            statusMode: false,
            statusColors: [],
            statusPriority: [],
            statusDefaultColor: '#8c8c8c',
            scaleMode: 'manual',
            autoLowerBound: 'zero',
            rollup: 'none',
            rollupParent: 'fill',
            matrix: 'enterprise',
            platform: ['']
        });
    });

    test('reads savedsearches.conf defaults', () => {
        const options = parse(buildConfig({ animate: 'yes' }));
        expect(options).toMatchObject({
            animate: true,
            startColor: '#B63457',
            midColor: '#FCFCBD',
            endColor: '#22908D',
            sortKey: 'data-value',
            matrix: 'enterprise',
            platform: ['']
        });
    });

    test('ignores keys outside the namespace', () => {
        expect(parse({ display: 'name' }).display).toBe('id');
    });

    test('splits matrix and comma-separated platforms', () => {
        const options = parse(withOptions({ matrix: 'enterprise::Windows,Linux,IaaS' }));
        expect(options.matrix).toBe('enterprise');
        expect(options.platform).toEqual(['Windows', 'Linux', 'IaaS']);
    });

    test('maps retired platform names saved in older dashboards to current ones', () => {
        const options = parse(withOptions({ matrix: 'enterprise::Azure AD,Google Workspace,IaaS,Office 365,SaaS' }));
        expect(options.platform).toEqual(['Identity Provider', 'Office Suite', 'IaaS', 'Office Suite', 'SaaS']);
        expect(parse(withOptions({ matrix: 'enterprise::Network' })).platform).toEqual(['Network Devices']);
    });

    test('leaves current and unknown platform names alone', () => {
        const options = parse(withOptions({ matrix: 'mobile::Android,constructor' }));
        expect(options.platform).toEqual(['Android', 'constructor']);
    });

    test('throws on a matrix value without "::"', () => {
        expect(() => parse(withOptions({ matrix: 'enterprise' }))).toThrow(TypeError);
    });

    test('normalizes boolean options', () => {
        const options = parse(withOptions({ hideNull: 'yes', showSubTechniques: 'no', showSearchBar: 'false', animate: 'true' }));
        expect(options).toMatchObject({ hideNull: true, showSubTechniques: false, showSearchBar: false, animate: true });
    });

    test('parses the numeric options as numbers (audit P2-5)', () => {
        const options = parse(withOptions({ startVal: '10', endVal: '90.5', duration: '5' }));
        expect(options).toMatchObject({ startVal: 10, endVal: 90.5, duration: 5 });
    });

    test.each([
        ['', 0, 100, 300],
        ['abc', 0, 100, 300],
        ['0', 0, 100, 300]
    ])('falls back to defaults for unusable numeric options (%p)', (raw, startVal, endVal, duration) => {
        const options = parse(withOptions({ startVal: raw, endVal: raw, duration: raw }));
        expect(options).toMatchObject({ startVal, endVal: raw === '0' ? 0 : endVal, duration });
    });

    test('accepts negative bounds', () => {
        expect(parse(withOptions({ startVal: '-50', endVal: '50' }))).toMatchObject({ startVal: -50, endVal: 50 });
    });

    test('the legend title follows the mapped value field', () => {
        const fields = [{ name: 'id' }, { name: 'count' }, { name: 'Risk score' }];
        expect(parse(withOptions({ valueField: 'Risk score' }), fields).legendTitle).toBe('Risk score');
        expect(parse(withOptions({ valueField: 'Risk score' }), fields).columns).toMatchObject({ id: 0, value: 2 });
    });

    test.each([
        ['sum', 'sum'], ['max', 'max'], ['avg', 'avg'], ['count', 'count'], ['none', 'none'], ['', 'none'], ['median', 'none']
    ])('rollup %p -> %p', (raw, expected) => {
        expect(parse(withOptions({ rollup: raw })).rollup).toBe(expected);
    });

    test('scaleMode is manual unless auto is set; autoLowerBound is zero unless min is set', () => {
        expect(parse({})).toMatchObject({ scaleMode: 'manual', autoLowerBound: 'zero' });
        expect(parse(withOptions({ scaleMode: 'auto', autoLowerBound: 'min' }))).toMatchObject({ scaleMode: 'auto', autoLowerBound: 'min' });
        expect(parse(withOptions({ scaleMode: 'x', autoLowerBound: 'x' }))).toMatchObject({ scaleMode: 'manual', autoLowerBound: 'zero' });
    });

    test('rollupParent is fill unless include is set', () => {
        expect(parse({}).rollupParent).toBe('fill');
        expect(parse(withOptions({ rollupParent: 'include' })).rollupParent).toBe('include');
        expect(parse(withOptions({ rollupParent: 'other' })).rollupParent).toBe('fill');
    });

    test('escapes a configured legend title', () => {
        expect(parse(withOptions({ legendTitle: '<b>Hits</b>' })).legendTitle).toBe('&lt;b&gt;Hits&lt;/b&gt;');
    });

    test('escapes the value field name used as the legend title fallback (audit P2-1)', () => {
        expect(parse({}, [{ name: 'id' }, { name: '<img src=x onerror=1>' }]).legendTitle).toBe('&lt;img src=x onerror=1&gt;');
    });
});

describe('resolveFields (field mapping)', () => {
    const f = (...names) => names.map(name => ({ name }));
    const resolve = (fields, names) => logic.resolveFields(fields, names);

    test('unnamed fields keep their positions', () => {
        expect(resolve(f('id', 'count', 'description'))).toEqual({ id: 0, value: 1, description: 2, status: -1 });
        expect(resolve(f('id', 'count'))).toEqual({ id: 0, value: 1, description: -1, status: -1 });
        expect(resolve(f('a', 'b', 'c', 'd', 'e'), {})).toEqual({ id: 0, value: 1, description: 2, status: -1 });
    });

    test('names pick columns in any order', () => {
        expect(resolve(f('note', 'risk', 'technique', 'state'), {
            idField: 'technique', valueField: 'risk', descriptionField: 'note', statusField: 'state'
        })).toEqual({ id: 2, value: 1, description: 0, status: 3 });
    });

    test('matching ignores case and surrounding spaces, exact names win', () => {
        expect(resolve(f('ID', 'id', 'n'), { idField: ' id ', valueField: 'N' })).toEqual({ id: 1, value: 2, description: -1, status: -1 });
        expect(resolve(f('Technique ID', 'Score'), { idField: 'technique id' }).id).toBe(0);
    });

    test('a positional description is dropped when another field uses that column', () => {
        expect(resolve(f('id', 'count', 'state'), { statusField: 'state' })).toEqual({ id: 0, value: 1, description: -1, status: 2 });
    });

    test('a named field that is missing lists the available fields', () => {
        expect(() => resolve(f('id', 'count'), { valueField: 'risk' }))
            .toThrow('The value field "risk" is not in the results. Available fields: id, count.');
        expect(() => resolve(f('id', 'count'), { statusField: 'state' })).toThrow(logic.FieldError);
    });

    test('the id and value fields must differ', () => {
        expect(() => resolve(f('id', 'count'), { idField: 'count' })).toThrow('same column ("count")');
    });

    test('fewer than 2 fields is an error', () => {
        expect(() => resolve(f('id'))).toThrow('at least 2 fields');
    });
});

describe('mappingNames', () => {
    test('trims and defaults to empty strings', () => {
        expect(logic.mappingNames({ 'ns.idField': '  tid ' }, 'ns.')).toEqual({ idField: 'tid', valueField: '', descriptionField: '', statusField: '' });
    });
});

describe('selectMatrix', () => {
    const matrices = { enterprise: 'E', ics: 'I', mobile: 'M', d3fend: 'D' };

    test.each([['ics', 'I'], ['mobile', 'M'], ['d3fend', 'D'], ['enterprise', 'E'], ['unknown', 'E'], ['', 'E']])(
        '%p selects %p', (name, expected) => {
            expect(logic.selectMatrix(name, matrices)).toBe(expected);
        });
});

describe('isOnPlatform', () => {
    const windowsOnly = { platform: ['Windows'] };

    test('everything matches when no platform is selected', () => {
        expect(logic.isOnPlatform(windowsOnly, [''])).toBe(true);
    });

    test('items without platform data always match', () => {
        expect(logic.isOnPlatform({}, ['Linux'])).toBe(true);
    });

    test('matches when any selected platform applies', () => {
        expect(logic.isOnPlatform(windowsOnly, ['Linux', 'Windows'])).toBe(true);
        expect(logic.isOnPlatform(windowsOnly, ['Linux'])).toBe(false);
    });

    test('platform names are exact, case-sensitive matches', () => {
        expect(logic.isOnPlatform(windowsOnly, ['windows'])).toBe(false);
    });
});

describe('parseRow / isValidCount', () => {
    const escape = vizUtils.escapeHtml;

    test('escapes id, count and description', () => {
        expect(logic.parseRow(['T1<1>', '5', 'a & b'], escape)).toEqual({ id: 'T1&lt;1&gt;', count: '5', description: 'a &amp; b', status: '' });
    });

    test('reads the mapped columns, and the status as plain trimmed text', () => {
        const columns = { id: 2, value: 0, description: 3, status: 1 };
        expect(logic.parseRow(['7', '  Covered ', 'T1059', 'a & b'], escape, columns))
            .toEqual({ id: 'T1059', count: '7', description: 'a &amp; b', status: 'Covered' });
        expect(logic.parseRow(['7', null, 'T1059'], escape, { id: 2, value: 0, description: -1, status: 1 }).status).toBe('');
    });

    test('missing description becomes an empty string', () => {
        expect(logic.parseRow(['T1059', '5'], escape).description).toBe('');
        expect(logic.parseRow(['T1059', '5', null], escape).description).toBe('');
    });

    test.each([['42', true], ['0', true], ['12.5', true], ['-5', true], ['', false], [undefined, false], ['n/a', false], ['1e3', true]])(
        'count %p valid: %p', (count, expected) => {
            expect(logic.isValidCount(count)).toBe(expected);
        });

    test('every row of the wide fixture parses from its first three columns', () => {
        const rows = loadFixture('wide.json').rows.map(r => logic.parseRow(r, escape));
        expect(rows.map(r => r.id)).toEqual(['T1059.001', 'T1003.001', 'T1021.002', 'T1071', 'T1048']);
        expect(rows.every(r => logic.isValidCount(r.count))).toBe(true);
    });
});

describe('status colors (feature 5)', () => {
    const list = logic.parseStatusColors('covered=#53a051, Partial = #f1813f ,gap=#d93f3c');

    test('parses name=color pairs in the order written', () => {
        expect(list).toEqual([
            { name: 'covered', key: 'covered', color: '#53a051' },
            { name: 'Partial', key: 'partial', color: '#f1813f' },
            { name: 'gap', key: 'gap', color: '#d93f3c' }
        ]);
    });

    test.each([
        ['', 0], [undefined, 0], ['nocolor', 0], ['a=red', 0], ['a=#12', 0], ['a=#12345g', 0], ['=#fff', 0],
        ['a=#fff,A=#000', 1], ['a=#abc,b=#aabbcc', 2], ['a=b=#fff', 1], ['constructor=#fff,__proto__=#000', 2]
    ])('%p keeps %p entries', (text, count) => {
        expect(logic.parseStatusColors(text)).toHaveLength(count);
    });

    test('keeps at most 24 entries', () => {
        const text = Array.from({ length: 40 }, (_, i) => 's' + i + '=#fff').join(',');
        expect(logic.parseStatusColors(text)).toHaveLength(logic.MAX_STATUSES);
    });

    test('colors match ignoring case and spaces; other statuses get the default', () => {
        expect(logic.statusColor(' COVERED ', list, '#000')).toBe('#53a051');
        expect(logic.statusColor('partial', list, '#000')).toBe('#f1813f');
        expect(logic.statusColor('unknown', list, '#000')).toBe('#000');
        expect(logic.statusColor(undefined, list, '#000')).toBe('#000');
    });

    test('rank is the position in the list; unlisted statuses come last', () => {
        const priority = ['gap', 'partial'];
        expect([logic.statusRank('GAP', priority), logic.statusRank('partial', priority), logic.statusRank('x', priority)]).toEqual([0, 1, 2]);
    });

    test('text color is chosen for contrast', () => {
        expect(logic.readableTextColor('#000000')).toBe('rgb(255,255,255)');
        expect(logic.readableTextColor('#ffffff')).toBe('rgb(0,0,0)');
        expect(logic.readableTextColor('#fc0')).toBe('rgb(0,0,0)');
        expect(logic.readableTextColor('#d93f3c')).toBe('rgb(255,255,255)');
    });

    describe('statusSummary', () => {
        const entries = new Map([
            ['T1', { status: 'Covered' }], ['T2', { status: 'covered' }], ['T3', { status: 'Mystery' }],
            ['T4', { status: '' }], ['T5', { status: 'gap' }], ['T6', { status: 'mystery' }]
        ]);

        test('lists the configured statuses first, then others as they appear, with cell counts', () => {
            const items = logic.statusSummary(entries, () => true, list);
            expect(items.map(i => [i.name, i.count])).toEqual([['covered', 2], ['Partial', 0], ['gap', 1], ['Mystery', 2]]);
        });

        test('only counts ids that have a cell', () => {
            const items = logic.statusSummary(entries, id => id != 'T1' && id != 'T3', list);
            expect(items.map(i => i.count)).toEqual([1, 0, 1, 1]);
        });
    });

    test('the tactic bar splits in proportion to the statuses, with a transparent remainder', () => {
        const items = [{ key: 'gap', color: '#d93f3c' }, { key: 'covered', color: '#53a051' }, { key: 'none', color: '#000' }];
        expect(logic.statusBarGradient(items, { gap: 1, covered: 1 }, 4))
            .toBe('linear-gradient(to right, #d93f3c 0%, #d93f3c 25%, #53a051 25%, #53a051 50%, transparent 50%, transparent 100%)');
        expect(logic.statusBarGradient(items, { gap: 2 }, 2)).toBe('linear-gradient(to right, #d93f3c 0%, #d93f3c 100%)');
        expect(logic.statusBarGradient(items, {}, 3)).toBe('linear-gradient(to right, transparent 0%, transparent 100%)');
    });

    test('a row is valid with a number, or with a status when a status field is set', () => {
        expect(logic.isValidEntry({ count: '5', status: '' }, false)).toBe(true);
        expect(logic.isValidEntry({ count: '', status: 'gap' }, false)).toBe(false);
        expect(logic.isValidEntry({ count: '', status: 'gap' }, true)).toBe(true);
        expect(logic.isValidEntry({ count: 'n/a', status: '' }, true)).toBe(false);
    });

    test('sorting by status uses the stored rank; cells without one go last', () => {
        const cmp = (a, b, order) => logic.compareByKey('data-status', order || 'asc', a, b);
        expect(cmp('0', '2')).toBe(-1);
        expect(cmp('2', '0')).toBe(1);
        expect(cmp('1', '1')).toBe(0);
        expect(cmp(undefined, '5')).toBe(1);
        expect(cmp(undefined, undefined)).toBe(0);
        expect(cmp('0', '2', 'desc')).toBe(1);
    });

    test('config: status mode needs a status field; the legend title follows it; bad colors are ignored', () => {
        const parse = (options, fields) => logic.parseConfig(
            Object.keys(options).reduce((c, k) => { c['ns.' + k] = options[k]; return c; }, {}), 'ns.', vizUtils,
            fields || [{ name: 'id' }, { name: 'count' }, { name: 'description' }, { name: 'state' }]);
        expect(parse({}).statusMode).toBe(false);
        const on = parse({ statusField: 'state', statusColors: 'gap=#d93f3c,bad=red', statusDefaultColor: '#123456' });
        expect(on).toMatchObject({ statusMode: true, statusPriority: ['gap'], statusDefaultColor: '#123456', legendTitle: 'state' });
        expect(parse({ statusDefaultColor: 'blue' }).statusDefaultColor).toBe('#8c8c8c');
    });
});

describe('computeBounds (feature 3)', () => {
    const fallback = { startVal: 20, endVal: 40 };

    test.each([
        [[10, 50, 90], 'zero', 0, 90],
        [[10, 50, 90], 'min', 10, 90],
        [[42], 'zero', 0, 42],
        [[42], 'min', 42, 43],
        [[0, 0], 'zero', 0, 1],
        [[5, 5], 'min', 5, 6],
        [[-5, 10], 'zero', -5, 10],
        [[-5, -1], 'zero', -5, -1],
        [[0.123, 0.456], 'min', 0.12, 0.46],
        [[3.001, 7.994], 'zero', 0, 8],
        [[1e6, 2.5e6], 'zero', 0, 2500000]
    ])('%p with %s -> [%p, %p]', (values, mode, lower, upper) => {
        expect(logic.computeBounds(values, mode, fallback)).toEqual({ startVal: lower, endVal: upper });
    });

    test('with nothing usable the fallback is returned', () => {
        expect(logic.computeBounds([], 'zero', fallback)).toEqual(fallback);
        expect(logic.computeBounds([NaN, Infinity], 'min', fallback)).toEqual(fallback);
    });

    test('handles a very large number of values', () => {
        const values = Array.from({ length: 300000 }, (_, i) => i % 1000);
        expect(logic.computeBounds(values, 'zero', fallback)).toEqual({ startVal: 0, endVal: 999 });
    });

    test('the upper bound is always above the lower bound', () => {
        [[1], [0], [-3], [2, 2], [0.001]].forEach(values => {
            ['zero', 'min'].forEach(mode => {
                const bounds = logic.computeBounds(values, mode, fallback);
                expect(bounds.endVal).toBeGreaterThan(bounds.startVal);
            });
        });
    });
});

describe('rollUp (feature 4)', () => {
    const entry = (id, count, extra) => Object.assign({ id, count: String(count), description: '', status: '' }, extra);
    const entries = (...list) => new Map(list.map(e => [e.id, e]));
    const parents = new Map([['T1.001', 'T1'], ['T1.002', 'T1'], ['T1.003', 'T1'], ['T2.001', 'T2']]);
    const run = (map, rollup, rollupParent, priority) => logic.rollUp(map, parents, rollup, rollupParent || 'fill', priority);

    test('does nothing when off, for an unknown mode, or without sub-techniques', () => {
        const map = entries(entry('T1.001', 5));
        expect(run(map, 'none')).toBe(map);
        expect(run(map, 'median')).toBe(map);
        expect(logic.rollUp(map, new Map(), 'sum', 'fill')).toBe(map);
    });

    test.each([
        ['sum', '30'],
        ['max', '20'],
        ['avg', '10'],
        ['count', '3']
    ])('%s of 4, 6 and 20 on a parent without a value', (rollup, expected) => {
        const result = run(entries(entry('T1.001', 4), entry('T1.002', 6), entry('T1.003', 20)), rollup);
        expect(result.get('T1')).toMatchObject({ id: 'T1', count: expected, rolledFrom: 3 });
    });

    test('the input map is not modified', () => {
        const map = entries(entry('T1.001', 4));
        run(map, 'sum');
        expect(map.has('T1')).toBe(false);
    });

    test('a parent that has its own value keeps it in fill mode', () => {
        const result = run(entries(entry('T1', 99, { description: 'own' }), entry('T1.001', 4)), 'sum', 'fill');
        expect(result.get('T1')).toMatchObject({ count: '99', description: 'own' });
        expect(result.get('T1').rolledFrom).toBeUndefined();
    });

    test('a parent value of 0 counts as having a value', () => {
        expect(run(entries(entry('T1', 0), entry('T1.001', 4)), 'sum', 'fill').get('T1').count).toBe('0');
    });

    test('include mode adds the parent\'s own value to the aggregate', () => {
        const map = entries(entry('T1', 10), entry('T1.001', 4), entry('T1.002', 6));
        expect(run(map, 'sum', 'include').get('T1')).toMatchObject({ count: '20', rolledFrom: 2 });
        expect(run(map, 'max', 'include').get('T1').count).toBe('10');
        expect(run(map, 'count', 'include').get('T1').count).toBe('2');
    });

    test('keeps the parent\'s description when it rolls up', () => {
        const result = run(entries(entry('T1', '', { description: 'about T1' }), entry('T1.001', 4)), 'sum');
        expect(result.get('T1')).toMatchObject({ count: '4', description: 'about T1' });
    });

    test('sub-techniques without a numeric value are ignored', () => {
        const result = run(entries(entry('T1.001', 'n/a'), entry('T1.002', 6), entry('T2.001', '')), 'sum');
        expect(result.get('T1').count).toBe('6');
        expect(result.has('T2')).toBe(false);
    });

    test('decimals sum without floating point noise', () => {
        expect(run(entries(entry('T1.001', 0.1), entry('T1.002', 0.2)), 'sum').get('T1').count).toBe('0.3');
    });

    test('different parents roll up independently', () => {
        const result = run(entries(entry('T1.001', 1), entry('T2.001', 7)), 'sum');
        expect([result.get('T1').count, result.get('T2').count]).toEqual(['1', '7']);
    });

    test('a parent without a status takes the highest-priority child status', () => {
        const map = entries(entry('T1.001', '', { status: 'Partial' }), entry('T1.002', '', { status: 'gap' }), entry('T1.003', '', { status: 'covered' }));
        const result = run(map, 'sum', 'fill', ['gap', 'partial', 'covered']);
        expect(result.get('T1')).toMatchObject({ status: 'gap', count: '', rolledFrom: 3 });
    });

    test('statuses that are not in the priority list rank last; a parent\'s own status is kept', () => {
        const unlisted = run(entries(entry('T1.001', '', { status: 'other' }), entry('T1.002', '', { status: 'Partial' })), 'sum', 'fill', ['gap', 'partial']);
        expect(unlisted.get('T1').status).toBe('Partial');
        const own = run(entries(entry('T1', '', { status: 'covered' }), entry('T1.001', '', { status: 'gap' })), 'sum', 'fill', ['gap', 'covered']);
        expect(own.get('T1').status).toBe('covered');
    });
});

describe('subTechniqueParents', () => {
    const matrix = { sub_techniques: [
        { id: 'T1.001', technique: 'T1', platform: ['Windows'] },
        { id: 'T1.002', technique: 'T1', platform: ['Linux'] },
        { id: 'D3-X', technique: ['d3f:Something'] },
        { id: 'T9.001', technique: 'T9' }
    ] };

    test('maps each sub-technique to its parent', () => {
        expect(Array.from(logic.subTechniqueParents(matrix, ['']).entries()))
            .toEqual([['T1.001', 'T1'], ['T1.002', 'T1'], ['T9.001', 'T9']]);
    });

    test('respects the platform filter and ignores list-valued parents', () => {
        expect(Array.from(logic.subTechniqueParents(matrix, ['Windows']).keys())).toEqual(['T1.001', 'T9.001']);
    });
});

describe('getPercent / visiblePercent', () => {
    test.each([
        [0, 100, 50, 50],
        [0, 100, '42', 42],
        [0, 100, 150, 100],
        [0, 100, -10, 0],
        [50, 150, 100, 50],
        ['50', '150', '75', 25],
        [0, 3, 1, 33]
    ])('getPercent(%p, %p, %p) = %p', (lower, upper, value, expected) => {
        expect(logic.getPercent(lower, upper, value)).toBe(expected);
    });

    test('equal bounds give NaN (audit P2-5)', () => {
        expect(logic.getPercent(10, 10, 10)).toBeNaN();
    });

    test('visiblePercent raises small values to the minimum', () => {
        expect(logic.visiblePercent(0)).toBe(logic.MIN_PERCENT);
        expect(logic.visiblePercent(1)).toBe(2);
        expect(logic.visiblePercent(2)).toBe(2);
        expect(logic.visiblePercent(75)).toBe(75);
        expect(logic.visiblePercent('')).toBe(2);
    });
});

describe('colors', () => {
    test('hexToRgb expands 3- and 6-digit hex to 0x strings', () => {
        expect(logic.hexToRgb('#abc')).toEqual({ r: '0xaa', g: '0xbb', b: '0xcc' });
        expect(logic.hexToRgb('#B63457')).toEqual({ r: '0xB6', g: '0x34', b: '0x57' });
    });

    test('hexToRgb returns black for unsupported formats', () => {
        expect(logic.hexToRgb('red')).toEqual({ r: 0, g: 0, b: 0 });
        expect(logic.hexToRgb('#11223344')).toEqual({ r: 0, g: 0, b: 0 });
    });

    test('buildColorMap places stops at 0, 50 and 100', () => {
        const map = logic.buildColorMap('#000', '#808080', '#fff');
        expect(map.map(s => s.pct)).toEqual([0, 50, 100]);
        expect(map[2].color).toEqual({ r: '0xff', g: '0xff', b: '0xff' });
    });

    describe('getColor', () => {
        const map = logic.buildColorMap('#000000', '#808080', '#ffffff');

        test.each([
            [0, 'rgb(0,0,0)', 'rgb(255,255,255)'],
            [25, 'rgb(64,64,64)', 'rgb(255,255,255)'],
            [50, 'rgb(128,128,128)', 'rgb(255,255,255)'],
            [75, 'rgb(191,191,191)', 'rgb(0,0,0)'],
            [100, 'rgb(255,255,255)', 'rgb(0,0,0)']
        ])('%p%% -> background %s, text %s', (percent, background, foreground) => {
            const color = logic.getColor(percent, map);
            expect(color.background).toBe(background);
            expect(color.foreground).toBe(foreground);
        });

        test('reports luminance for the dark-meter check', () => {
            expect(logic.getColor(0, map).luminance).toBe(0);
            expect(logic.getColor(100, map).luminance).toBeCloseTo(1);
        });

        test('blank percent (missing value) is treated as 0', () => {
            expect(logic.getColor('', map).background).toBe('rgb(0,0,0)');
        });
    });
});

describe('legend', () => {
    test('gradient string', () => {
        expect(logic.legendGradient('#a', '#b', '#c')).toBe('(45deg, #a 0%, #b 50%, #c 100%)');
    });

    test('labels for default bounds', () => {
        expect(logic.legendLabels(0, 100)).toEqual([0, 50, 100]);
    });

    test('middle label is the midpoint when the lower bound is not 0 (audit P2-5)', () => {
        expect(logic.legendLabels(50, 150)).toEqual([50, 100, 150]);
        expect(logic.legendLabels(-50, 50)).toEqual([-50, 0, 50]);
    });

    test('cursor range maps pointer position to a value window', () => {
        expect(logic.legendCursorRange(250, 100, 500, 0, 100)).toEqual({ left: 200, lower: 40, upper: 60 });
    });

    test('cursor range ignores pointers outside the legend', () => {
        expect(logic.legendCursorRange(0, 100, 500, 0, 100)).toBeNull();
        expect(logic.legendCursorRange(501, 100, 500, 0, 100)).toBeNull();
        expect(logic.legendCursorRange(500, 100, 500, 0, 100)).not.toBeNull();
    });

    test('cursor range is offset by the lower bound (audit P2-5)', () => {
        expect(logic.legendCursorRange(250, 100, 500, 100, 200)).toEqual({ left: 200, lower: 140, upper: 160 });
    });
});

describe('tacticStats', () => {
    test('typical column', () => {
        expect(logic.tacticStats(['10', undefined, '20', '0', undefined])).toEqual({
            sum: 30, count: 3, total: 5, mean: 10, coverage: 60
        });
    });

    test('column without values', () => {
        expect(logic.tacticStats([undefined, undefined])).toEqual({ sum: 0, count: 0, total: 2, mean: 0, coverage: 0 });
    });

    test('empty column', () => {
        expect(logic.tacticStats([])).toEqual({ sum: 0, count: 0, total: 0, mean: 0, coverage: 0 });
    });

    test('decimals sum exactly and the mean is rounded', () => {
        expect(logic.tacticStats(['12.5', '1'])).toMatchObject({ sum: 13.5, mean: 7 });
    });

    test('single value', () => {
        expect(logic.tacticStats(['42'])).toEqual({ sum: 42, count: 1, total: 1, mean: 42, coverage: 100 });
    });

    test('large column', () => {
        const values = Array.from({ length: 1000 }, (_, i) => (i % 4 === 0 ? undefined : String(i)));
        const stats = logic.tacticStats(values);
        expect(stats).toMatchObject({ total: 1000, count: 750, coverage: 75 });
        expect(stats.sum).toBe(values.reduce((s, v) => s + (v ? +v : 0), 0));
    });
});

describe('formatDescription', () => {
    test('short text is returned as-is', () => {
        expect(logic.formatDescription('Plain')).toBe('Plain');
        expect(logic.formatDescription('')).toBe('');
    });

    test('literal \\n sequences become paragraph breaks', () => {
        expect(logic.formatDescription('one\\ntwo')).toBe('one</p><p>two');
    });

    test('text over 256 characters is split behind "Show more"', () => {
        const html = logic.formatDescription('a'.repeat(256) + 'b'.repeat(10));
        expect(html).toBe(`<p>${'a'.repeat(256)} <span class="more-elipses">...</span><span class="more-content">${'b'.repeat(10)}</span><a href="#" class="more-link">Show more</a></p>`);
    });

    test('exactly 256 characters is not truncated', () => {
        expect(logic.formatDescription('a'.repeat(256))).toBe('a'.repeat(256));
    });
});

describe('tooltipSide', () => {
    test('flips left within 400px of the right edge', () => {
        expect(logic.tooltipSide(100, 1000)).toBe('right');
        expect(logic.tooltipSide(600, 1000)).toBe('right');
        expect(logic.tooltipSide(601, 1000)).toBe('left');
    });
});

describe('compareByKey', () => {
    // Wrapped because Array#sort moves bare undefineds to the end without calling the comparator.
    const sortBy = (key, order, values) => values.map(v => ({ v }))
        .sort((a, b) => logic.compareByKey(key, order, a.v, b.v))
        .map(w => w.v);

    test('ids ascending and descending', () => {
        expect(sortBy('data-id', 'asc', ['T1059', 'T1003', 'T1566'])).toEqual(['T1003', 'T1059', 'T1566']);
        expect(sortBy('data-id', 'desc', ['T1059', 'T1003', 'T1566'])).toEqual(['T1566', 'T1059', 'T1003']);
    });

    test('names compare by code unit, so uppercase sorts first', () => {
        expect(sortBy('data-name', 'asc', ['b', 'a', 'C'])).toEqual(['C', 'a', 'b']);
    });

    test('values compare numerically with missing values lowest', () => {
        expect(sortBy('data-value', 'asc', ['10', undefined, '9', '100'])).toEqual([undefined, '9', '10', '100']);
        expect(sortBy('data-value', 'desc', ['10', undefined, '9', '100'])).toEqual(['100', '10', '9', undefined]);
    });

    test('values keep their decimals (audit P2-6)', () => {
        expect(logic.compareByKey('data-value', 'asc', '1.9', '1.2')).toBe(1);
        expect(logic.compareByKey('data-value', 'asc', '1.2', '1.9')).toBe(-1);
        expect(sortBy('data-value', 'asc', ['1.9', '1.2', '1.5'])).toEqual(['1.2', '1.5', '1.9']);
    });

    test('equal and missing values still compare as greater (existing default ordering)', () => {
        expect(logic.compareByKey('data-value', 'asc', '5', '5')).toBe(1);
        expect(logic.compareByKey('data-value', 'asc', undefined, undefined)).toBe(1);
    });

    test('unknown keys keep order', () => {
        expect(logic.compareByKey('data-other', 'asc', 'a', 'b')).toBe(0);
    });
});

describe('parseValue', () => {
    test.each([['42', 42], ['0', 0], ['12.5', 12.5], ['-5', -5], ['1e3', 1000]])('%p -> %p', (attr, expected) => {
        expect(logic.parseValue(attr)).toBe(expected);
    });

    test.each([[undefined], [''], ['n/a']])('%p -> blank', attr => {
        expect(logic.parseValue(attr)).toBe('');
    });
});

describe('matchesSearch', () => {
    test('matches id or name substrings case-insensitively', () => {
        expect(logic.matchesSearch('T1059', 'Command and Scripting Interpreter', 't105')).toBe(true);
        expect(logic.matchesSearch('T1059', 'Command and Scripting Interpreter', 'scripting')).toBe(true);
        expect(logic.matchesSearch('T1059', 'Command and Scripting Interpreter', 'phishing')).toBe(false);
    });

    test('tolerates missing attributes (placeholder cells)', () => {
        expect(logic.matchesSearch(undefined, undefined, 't1')).toBe(false);
    });
});

describe('animation', () => {
    test('step size spreads the range over duration seconds at 60fps', () => {
        expect(logic.animationSteps(0, 100, 300)).toEqual({ stepSize: 100 / 300 / 60, stepWidth: 10 });
        expect(logic.animationSteps('0', '120', '2')).toEqual({ stepSize: 1, stepWidth: 12 });
    });

    test('frames advance then wrap to the lower bound past the upper bound', () => {
        const steps = { stepSize: 40, stepWidth: 10 };
        let frame = logic.animationFrame(0, steps, 100, 0);
        expect(frame).toEqual({ lower: 0, upper: 50, next: 40 });
        frame = logic.animationFrame(frame.next, steps, 100, 0);
        frame = logic.animationFrame(frame.next, steps, 100, 0);
        expect(frame).toEqual({ lower: 80, upper: 130, next: 120 });
        expect(logic.animationFrame(frame.next, steps, 100, 0).next).toBe(0);
    });

    test('animation starts and restarts at a non-zero lower bound (audit P2-5)', () => {
        const steps = { stepSize: 40, stepWidth: 10 };
        expect(logic.animationFrame(50, steps, 150, 50)).toEqual({ lower: 50, upper: 100, next: 90 });
        expect(logic.animationFrame(160, steps, 150, 50).next).toBe(50);
    });

    test('inFocusRange is inclusive and ignores missing values', () => {
        expect(logic.inFocusRange('10', 10, 20)).toBe(true);
        expect(logic.inFocusRange('20', 10, 20)).toBe(true);
        expect(logic.inFocusRange('21', 10, 20)).toBe(false);
        expect(logic.inFocusRange(undefined, 0, 20)).toBe(false);
    });

    test('a value of 0 is never focused (audit P2-6)', () => {
        expect(logic.inFocusRange(0, 0, 10)).toBe(false);
        expect(logic.inFocusRange('0', 0, 10)).toBe(true);
    });
});
