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

    test('keeps numeric options as strings (audit P2-5)', () => {
        const options = parse(withOptions({ startVal: '10', endVal: '90', duration: '5' }));
        expect(options).toMatchObject({ startVal: '10', endVal: '90', duration: '5' });
    });

    test('escapes a configured legend title', () => {
        expect(parse(withOptions({ legendTitle: '<b>Hits</b>' })).legendTitle).toBe('&lt;b&gt;Hits&lt;/b&gt;');
    });

    test('escapes the value field name used as the legend title fallback (audit P2-1)', () => {
        expect(parse({}, [{ name: 'id' }, { name: '<img src=x onerror=1>' }]).legendTitle).toBe('&lt;img src=x onerror=1&gt;');
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
        expect(logic.parseRow(['T1<1>', '5', 'a & b'], escape)).toEqual({ id: 'T1&lt;1&gt;', count: '5', description: 'a &amp; b' });
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

    test('middle label is half the range, not the midpoint (audit P2-5)', () => {
        expect(logic.legendLabels('50', '150')).toEqual(['50', 50, '150']);
    });

    test('cursor range maps pointer position to a value window', () => {
        expect(logic.legendCursorRange(250, 100, 500, 0, 100)).toEqual({ left: 200, lower: 40, upper: 60 });
    });

    test('cursor range ignores pointers outside the legend', () => {
        expect(logic.legendCursorRange(0, 100, 500, 0, 100)).toBeNull();
        expect(logic.legendCursorRange(501, 100, 500, 0, 100)).toBeNull();
        expect(logic.legendCursorRange(500, 100, 500, 0, 100)).not.toBeNull();
    });

    test('cursor range is not offset by the lower bound (audit P2-5)', () => {
        expect(logic.legendCursorRange(250, 100, 500, 100, 200)).toEqual({ left: 200, lower: 40, upper: 60 });
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

    test('values truncate decimals (audit P2-6)', () => {
        expect(logic.compareByKey('data-value', 'asc', '1.9', '1.2')).toBe(1);
        expect(logic.compareByKey('data-value', 'asc', '1.2', '1.9')).toBe(1);
    });

    test('unknown keys keep order', () => {
        expect(logic.compareByKey('data-other', 'asc', 'a', 'b')).toBe(0);
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

    test('frames advance then wrap to 0 past the upper bound', () => {
        const steps = { stepSize: 40, stepWidth: 10 };
        let frame = logic.animationFrame(0, steps, 100);
        expect(frame).toEqual({ lower: 0, upper: 50, next: 40 });
        frame = logic.animationFrame(frame.next, steps, 100);
        frame = logic.animationFrame(frame.next, steps, 100);
        expect(frame).toEqual({ lower: 80, upper: 130, next: 120 });
        expect(logic.animationFrame(frame.next, steps, 100).next).toBe(0);
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
