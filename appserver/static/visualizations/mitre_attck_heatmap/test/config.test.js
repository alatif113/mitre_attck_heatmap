/*
 * Consistency checks across the app's config files and the bundled matrix
 * data. No DOM and no Splunk mocks; these run in a second or two.
 */
const fs = require('fs');
const path = require('path');
const logic = require('heatmapLogic');
const enterpriseAttack = require('enterpriseAttack');
const icsAttack = require('icsAttack');
const mobileAttack = require('mobileAttack');
const d3fend = require('d3fend');

const APP_ROOT = path.resolve(__dirname, '../../../../..');
const read = file => fs.readFileSync(path.join(APP_ROOT, file), 'utf8');
const VIZ_NAME = 'mitre_attck_heatmap';

const MATRICES = { enterprise: enterpriseAttack, ics: icsAttack, mobile: mobileAttack, d3fend: d3fend };

// Minimal .conf/.meta parser: { stanza: { key: value } }.
function parseConf(text) {
    const stanzas = {};
    let current = null;
    text.split('\n').forEach(line => {
        const header = line.match(/^\[(.*)\]\s*$/);
        if (header) {
            current = stanzas[header[1]] = {};
            return;
        }
        const pair = line.match(/^([^#=\s][^=]*?)\s*=\s*(.*?)\s*$/);
        if (pair && current) current[pair[1]] = pair[2];
    });
    return stanzas;
}

describe('metadata/default.meta', () => {
    const meta = parseConf(read('metadata/default.meta'));
    const visualizations = parseConf(read('default/visualizations.conf'));

    test('every visualizations/<name> stanza refers to a declared visualization', () => {
        Object.keys(meta).filter(s => /^vi[sz]+ualizations\//.test(s)).forEach(stanza => {
            expect(stanza).toMatch(/^visualizations\//);
            expect(Object.keys(visualizations)).toContain(stanza.split('/')[1]);
        });
    });

    test('the heatmap visualization is exported to other apps', () => {
        expect(meta['visualizations/' + VIZ_NAME]).toMatchObject({ export: 'system' });
    });
});

describe('format options are declared everywhere (audit P3-3)', () => {
    const NS = 'display.visualizations.custom.' + VIZ_NAME + '.' + VIZ_NAME + '.';
    const keysOf = text => Array.from(text.matchAll(/^display\.visualizations\.custom\.\w+\.\w+\.(\w+)\s*=/gm)).map(m => m[1]);
    const formatter = read('appserver/static/visualizations/' + VIZ_NAME + '/formatter.html');
    const formatterKeys = Array.from(formatter.matchAll(/\{\{VIZ_NAMESPACE\}\}\.(\w+)/g)).map(m => m[1]);
    const confKeys = keysOf(read('default/savedsearches.conf'));
    const specKeys = keysOf(read('README/savedsearches.conf.spec'));

    test('there is no theme option: the visualization follows the theme of the dashboard it is in', () => {
        expect(formatterKeys).not.toContain('theme');
        expect(confKeys).not.toContain('theme');
        expect(specKeys).not.toContain('theme');
    });

    test('every option in the format menu has a default in savedsearches.conf', () => {
        formatterKeys.forEach(key => expect(confKeys).toContain(key));
    });

    test('every option in the format menu is declared in savedsearches.conf.spec', () => {
        formatterKeys.forEach(key => expect(specKeys).toContain(key));
    });

    test('conf and spec declare the same options', () => {
        expect(confKeys.slice().sort()).toEqual(specKeys.slice().sort());
    });

    // Options that are still read (saved dashboards may set them) but are not in the format menu.
    const HIDDEN_FROM_MENU = ['legendTitle', 'statusDefaultColor', 'navigatorLayerName', 'navigatorAttackVersion', 'autoLowerBound', 'rollupParent'];

    test('the only options missing from the format menu are the documented ones', () => {
        const missing = confKeys.filter(key => formatterKeys.indexOf(key) < 0);
        expect(missing.sort()).toEqual(HIDDEN_FROM_MENU.slice().sort());
    });

    test('the format menu shows each option\'s savedsearches.conf default', () => {
        const conf = {};
        read('default/savedsearches.conf').split('\n').forEach(line => {
            const m = line.match(/^display\.visualizations\.custom\.\w+\.\w+\.(\w+)\s*=\s?(.*)$/);
            if (m && !(m[1] in conf)) conf[m[1]] = m[2].trim();
        });
        formatter.split('</splunk-control-group>').forEach(group => {
            const m = group.match(/\{\{VIZ_NAMESPACE\}\}\.(\w+)"\s+value="([^"]*)"/);
            if (m) expect([m[1], m[2]]).toEqual([m[1], conf[m[1]]]);
        });
    });

    test('every control has a help text', () => {
        formatter.split('<splunk-control-group').slice(1).forEach(group => {
            expect(group).toMatch(/help="[^"]{8,}"/);
        });
    });

    test('there is no legend title, duration or continuous color option in the menu', () => {
        ['legendTitle', 'duration'].forEach(key => expect(formatterKeys).not.toContain(key));
        expect(formatter).not.toMatch(/Continuous/);
    });

    test('showSearchBar defaults to yes, as the code and format menu do', () => {
        expect(read('default/savedsearches.conf')).toMatch(new RegExp('^' + NS.replace(/\./g, '\\.') + 'showSearchBar = yes$', 'm'));
    });
});

describe('code defaults match savedsearches.conf (needed for Dashboard Studio)', () => {
    // Classic dashboards get the [default] stanza of savedsearches.conf merged into the
    // options; Dashboard Studio passes only the options set in the dashboard, so there
    // the code defaults are what users see. They must be the same.
    const logic = require('heatmapLogic');
    const vizUtils = require('api/SplunkVisualizationUtils');
    const NS = 'display.visualizations.custom.' + VIZ_NAME + '.' + VIZ_NAME + '.';
    const defaults = parseConf(read('default/savedsearches.conf')).default;
    const parse = config => logic.parseConfig(config, NS, vizUtils, [{ name: 'id' }, { name: 'count' }, { name: 'description' }, { name: 'state' }]);
    const keys = Object.keys(defaults).filter(k => k.startsWith(NS));

    test('there are defaults to compare', () => {
        expect(keys.length).toBeGreaterThan(25);
    });

    test.each(keys.map(k => [k.slice(NS.length), defaults[k]]))('%s = %p', (name, value) => {
        expect(parse({ [NS + name]: value })).toEqual(parse({}));
    });
});

describe('test bench dashboard', () => {
    const VIEW = 'default/data/ui/views/mitre_heatmap_testbench.xml';
    const xml = read(VIEW);
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const formatter = read('appserver/static/visualizations/' + VIZ_NAME + '/formatter.html');
    const formatterKeys = new Set(Array.from(formatter.matchAll(/\{\{VIZ_NAMESPACE\}\}\.(\w+)/g)).map(m => m[1]));
    const queries = Array.from(doc.querySelectorAll('viz query')).map(q => q.textContent);
    const knownIds = new Set(enterpriseAttack.techniques.map(t => t.id).concat(enterpriseAttack.sub_techniques.map(s => s.id)));

    test('is well-formed XML', () => {
        expect(doc.getElementsByTagName('parsererror')).toHaveLength(0);
        expect(doc.documentElement.tagName).toBe('form');
    });

    test('uses the declared visualization type', () => {
        const types = new Set(Array.from(doc.querySelectorAll('viz')).map(v => v.getAttribute('type')));
        expect(Array.from(types)).toEqual([VIZ_NAME + '.' + VIZ_NAME]);
        expect(queries.length).toBeGreaterThanOrEqual(10);
    });

    test('only sets options the formatter defines', () => {
        const prefix = VIZ_NAME + '.' + VIZ_NAME + '.';
        Array.from(doc.querySelectorAll('viz option')).forEach(option => {
            const name = option.getAttribute('name');
            if (name === 'height') return;
            expect(name.startsWith(prefix)).toBe(true);
            expect(formatterKeys).toContain(name.slice(prefix.length));
        });
    });

    test('every $token$ used by an option or panel is defined', () => {
        const defined = new Set(
            Array.from(doc.querySelectorAll('input[token], init set[token], change set[token]')).map(e => e.getAttribute('token'))
        );
        const used = new Set();
        Array.from(doc.querySelectorAll('viz option')).forEach(o => {
            (o.textContent.match(/\$[A-Za-z_]\w*\$/g) || []).forEach(t => used.add(t.slice(1, -1)));
        });
        Array.from(doc.querySelectorAll('panel[depends]')).forEach(p => {
            (p.getAttribute('depends').match(/\$[A-Za-z_]\w*\$/g) || []).forEach(t => used.add(t.slice(1, -1)));
        });
        Array.from(doc.querySelectorAll('html')).forEach(h => {
            (h.textContent.match(/\$[A-Za-z_]\w*(?=\|\w+\$)/g) || []).forEach(t => used.add(t.slice(1)));
        });
        used.forEach(token => expect(defined).toContain(token));
    });

    test('searches generate their own data (no index searches)', () => {
        queries.forEach(q => expect(q.trim()).toMatch(/^\| (makeresults|gentimes|inputlookup)\b/));
    });

    test('every technique ID in the searches exists in the Enterprise matrix', () => {
        const ids = [].concat(...queries.map(q => q.match(/T\d{4}(\.\d{3})?/g) || []));
        expect(ids.length).toBeGreaterThan(40);
        ids.forEach(id => expect(knownIds).toContain(id));
    });

    test('drilldown sets all nine documented mtr_* tokens', () => {
        const fields = Array.from(doc.querySelectorAll('drilldown set')).map(s => s.textContent.replace(/^\$row\.|\$$/g, ''));
        expect(fields.sort()).toEqual([
            'mtr_sub-technique_id', 'mtr_sub-technique_name', 'mtr_sub-technique_value',
            'mtr_tactic_id', 'mtr_tactic_name', 'mtr_tactic_value',
            'mtr_technique_id', 'mtr_technique_name', 'mtr_technique_value'
        ]);
    });

    test('the nav opens this dashboard by default', () => {
        const nav = new DOMParser().parseFromString(read('default/data/ui/nav/default.xml'), 'text/xml');
        const views = Array.from(nav.querySelectorAll('view'));
        expect(views.map(v => v.getAttribute('name'))).toEqual(['mitre_heatmap_testbench']);
        expect(views[0].getAttribute('default')).toBe('true');
        expect(fs.existsSync(path.join(APP_ROOT, VIEW))).toBe(true);
    });

    test('is theme-agnostic: no hardcoded colors or forced theme', () => {
        expect(doc.documentElement.getAttribute('theme')).toBeNull();
        // Visualization option values (such as the status colors) are data, not page styling.
        const styling = xml.replace(/<option\b[^>]*>[^<]*<\/option>/g, '').replace(/<query>[\s\S]*?<\/query>/g, '');
        expect(styling).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
        expect(styling).not.toMatch(/\b(color|background)\s*:\s*(?!inherit|currentColor|transparent)/i);
    });

    describe('lookup file', () => {
        const lookup = read('lookups/mitre_heatmap_test.csv').trim().split('\n');
        const header = lookup[0].split(',');

        test('is the one the search reads and has the columns the search tables', () => {
            expect(queries.join('\n')).toContain('inputlookup mitre_heatmap_test.csv');
            expect(header).toEqual(['id', 'count', 'description']);
        });

        test('uses real technique IDs apart from the deliberate unknown one', () => {
            const ids = lookup.slice(1).map(line => line.split(',')[0]);
            expect(ids.filter(id => !knownIds.has(id))).toEqual(['T9999']);
        });
    });
});

describe('formatter.html matrix options', () => {
    const formatter = read('appserver/static/visualizations/' + VIZ_NAME + '/formatter.html');
    const values = Array.from(formatter.matchAll(/<option value="([a-z0-9]+::[^"]*)"/g)).map(m => m[1]);

    test('finds the matrix options', () => {
        expect(values.length).toBeGreaterThan(10);
    });

    test.each(values)('%s selects at least one technique', value => {
        const [matrix, platforms] = value.split('::');
        const options = logic.parseConfig({ 'ns.matrix': value }, 'ns.', { normalizeBoolean: Boolean, escapeHtml: String }, [0, { name: 'x' }]);
        const data = logic.selectMatrix(options.matrix, MATRICES);
        const selected = data.techniques.filter(t => logic.isOnPlatform(t, options.platform));
        expect(options.matrix).toBe(matrix);
        expect(selected.length).toBeGreaterThan(0);
        // Every platform the option names must exist in the data (after aliasing).
        if (platforms) {
            const known = new Set([].concat(...data.techniques.map(t => t.platform || [])));
            options.platform.forEach(p => expect(known).toContain(p));
        }
    });

    test.each([
        'enterprise::Azure AD',
        'enterprise::Google Workspace',
        'enterprise::Office 365',
        'enterprise::Network',
        'enterprise::Azure AD,Google Workspace,IaaS,Office 365,SaaS'
    ])('retired value %s saved in older dashboards still selects techniques', value => {
        const options = logic.parseConfig({ 'ns.matrix': value }, 'ns.', { normalizeBoolean: Boolean, escapeHtml: String }, [0, { name: 'x' }]);
        const selected = enterpriseAttack.techniques.filter(t => logic.isOnPlatform(t, options.platform));
        expect(selected.length).toBeGreaterThan(0);
    });

    test('every platform in the Enterprise and Mobile data has an option', () => {
        const offered = new Set([].concat(...values.map(v => v.split('::')[1].split(',').filter(Boolean))));
        ['enterpriseAttack', 'mobileAttack'].forEach(name => {
            const data = { enterpriseAttack, mobileAttack }[name];
            new Set([].concat(...data.techniques.map(t => t.platform))).forEach(p => expect(offered).toContain(p));
        });
    });
});
