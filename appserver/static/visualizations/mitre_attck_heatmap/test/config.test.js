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

describe('bundled matrix data is consistent (audit T-1)', () => {
    Object.keys(MATRICES).forEach(name => {
        describe(name, () => {
            const m = MATRICES[name];
            const tacticKeys = new Set(m.tactics.map(t => t.short_name));
            const techniqueIds = new Set(m.techniques.map(t => t.id));

            test('has tactics, techniques and sub-techniques', () => {
                expect(m.tactics.length).toBeGreaterThanOrEqual(5);
                expect(m.techniques.length).toBeGreaterThanOrEqual(20);
                expect(m.sub_techniques.length).toBeGreaterThan(0);
            });

            test('no id is used twice, and no tactic is also a technique', () => {
                const ids = m.techniques.map(t => t.id).concat(m.sub_techniques.map(s => s.id));
                expect(new Set(ids).size).toBe(ids.length);
                expect(new Set(m.tactics.map(t => t.id)).size).toBe(m.tactics.length);
                expect(new Set(m.tactics.map(t => t.name)).size).toBe(m.tactics.length);
                m.tactics.forEach(t => expect(techniqueIds.has(t.id)).toBe(false));
            });

            test('every technique is in at least one tactic column that exists', () => {
                m.techniques.forEach(t => {
                    expect(t.tactics.length).toBeGreaterThan(0);
                    t.tactics.forEach(x => expect(tacticKeys.has(x)).toBe(true));
                });
            });

            test('every tactic column has techniques', () => {
                m.tactics.forEach(t => expect(m.techniques.some(x => x.tactics.indexOf(t.short_name) >= 0)).toBe(true));
            });

            test('every sub-technique names one existing technique by id, and has an id to show', () => {
                m.sub_techniques.forEach(s => {
                    expect(typeof s.technique).toBe('string');
                    expect(techniqueIds.has(s.technique)).toBe(true);
                    expect(s.short_id).toBeTruthy();
                    expect(s.name).toBeTruthy();
                });
            });

            test('tactics are in a defined order', () => {
                const orders = m.tactics.map(t => t.sort_order);
                expect(orders).toEqual(orders.slice().sort((a, b) => a - b));
                expect(Math.max.apply(null, orders)).toBeLessThan(100);
            });

            test('links go to the matrix owner over https', () => {
                m.techniques.concat(m.sub_techniques).forEach(x => expect(x.url).toMatch(/^https:\/\/(attack|d3fend)\.mitre\.org\//));
            });
        });
    });

    describe('d3fend follows the current ontology (audit P1-1)', () => {
        test('has the seven defensive tactics as its columns, in order', () => {
            expect(d3fend.tactics.map(t => t.name)).toEqual(['Model', 'Harden', 'Detect', 'Isolate', 'Deceive', 'Evict', 'Restore']);
        });

        test('techniques are not columns: Credential Hardening is a technique under Harden', () => {
            const technique = d3fend.techniques.find(t => t.id === 'D3-CH');
            expect(technique.name).toBe('Credential Hardening');
            expect(technique.tactics).toEqual(['d3f:Harden']);
            expect(d3fend.tactics.map(t => t.name)).not.toContain('Credential Hardening');
        });

        test('sub-techniques attach to their technique and show their own id', () => {
            const sub = d3fend.sub_techniques.find(s => s.id === 'D3-HCI');
            expect(sub.name).toBe('Hardware Component Inventory');
            expect(sub.technique).toBe('D3-AI');
            expect(sub.short_id).toBe('D3-HCI');
            expect(d3fend.sub_techniques.length).toBeGreaterThan(150);
        });
    });
});

describe('release metadata', () => {
    const manifest = JSON.parse(read('app.manifest'));
    const appConf = parseConf(read('default/app.conf'));
    const readme = read('README.md');

    test('the version is the same in the manifest and both places in app.conf, and is the newest in the change log', () => {
        const version = manifest.info.id.version;
        expect(version).toMatch(/^\d+\.\d+\.\d+$/);
        expect(appConf.launcher.version).toBe(version);
        expect(appConf.id.version).toBe(version);
        expect(readme).toMatch(new RegExp('## Change Log\\s+### v' + version.replace(/\./g, '\\.') + '\\n'));
    });

    test('the build number is a positive integer (it changes the URL of the static files)', () => {
        expect(appConf.install.build).toMatch(/^[1-9]\d*$/);
    });

    test('the default panel height fits the matrix instead of a leftover from the old layout', () => {
        const height = parseInt(parseConf(read('default/visualizations.conf'))[VIZ_NAME].default_height, 10);
        expect(height).toBeGreaterThanOrEqual(800);
        expect(height).toBeLessThanOrEqual(1500);
    });

    test('the bundled D3FEND version in the README is the ontology\'s', () => {
        expect(readme).toMatch(/D3FEND v1\.6\.0/);
    });
});

describe('sample dashboards (classic and Dashboard Studio)', () => {
    const classic = new DOMParser().parseFromString(read('default/data/ui/views/mitre_heatmap_classic.xml'), 'text/xml');
    const studioDoc = new DOMParser().parseFromString(read('default/data/ui/views/mitre_heatmap_studio.xml'), 'text/xml');
    const studio = JSON.parse(studioDoc.querySelector('definition').textContent);
    const VIZ_TYPE = VIZ_NAME + '.' + VIZ_NAME;
    const classicQuery = classic.querySelector('viz query').textContent;
    const studioQuery = studio.dataSources.ds_detections.options.query;
    const formatter = read('appserver/static/visualizations/' + VIZ_NAME + '/formatter.html');
    const formatterKeys = new Set(Array.from(formatter.matchAll(/\{\{VIZ_NAMESPACE\}\}\.(\w+)/g)).map(m => m[1]));
    const validIds = new Set(enterpriseAttack.techniques.map(t => t.id).concat(enterpriseAttack.sub_techniques.map(s => s.id)));

    // The sample rows, as the search builds them: id|value|description, separated by ;.
    const rows = classicQuery.match(/split\("([^"]+)", ";"\)/)[1].split(';').map(r => r.split('|'));

    test('both are well-formed and each holds exactly one heatmap', () => {
        expect(classic.getElementsByTagName('parsererror')).toHaveLength(0);
        expect(studioDoc.getElementsByTagName('parsererror')).toHaveLength(0);
        expect(classic.documentElement.tagName).toBe('dashboard');
        expect(classic.documentElement.getAttribute('version')).toBe('1.1');
        expect(classic.querySelectorAll('panel')).toHaveLength(1);
        expect(Array.from(classic.querySelectorAll('viz')).map(v => v.getAttribute('type'))).toEqual([VIZ_TYPE]);
        expect(studioDoc.documentElement.getAttribute('version')).toBe('2');
        expect(Object.keys(studio.visualizations)).toHaveLength(1);
        expect(Object.values(studio.visualizations).map(v => v.type)).toEqual([VIZ_TYPE]);
    });

    test('both use the same generated sample search, which needs no data', () => {
        expect(classicQuery).toBe(studioQuery);
        expect(classicQuery.startsWith('| makeresults')).toBe(true);
        expect(classicQuery).not.toMatch(/index=|inputlookup|`/);
        expect(classicQuery).toMatch(/\| table id Detections description$/);
    });

    test('the sample data is typical: over 80 distinct, valid ids with sub-techniques, a spread of values and descriptions', () => {
        const ids = rows.map(r => r[0]);
        expect(rows.length).toBeGreaterThan(80);
        expect(new Set(ids).size).toBe(ids.length);
        ids.forEach(id => expect(validIds.has(id)).toBe(true));
        expect(ids.filter(id => id.indexOf('.') > 0).length).toBeGreaterThan(25);
        const values = rows.map(r => Number(r[1]));
        values.forEach(v => expect(Number.isFinite(v)).toBe(true));
        expect(Math.max.apply(null, values)).toBeGreaterThan(300);
        expect(values.filter(v => v < 20).length).toBeGreaterThan(10);
        rows.forEach(r => expect(r[2].length).toBeGreaterThan(10));
    });

    test('options only use settings the format menu has', () => {
        const prefix = VIZ_TYPE + '.';
        Array.from(classic.querySelectorAll('viz option')).forEach(o => {
            const name = o.getAttribute('name');
            if (name === 'height') return;
            expect(name.startsWith(prefix)).toBe(true);
            expect(formatterKeys).toContain(name.slice(prefix.length));
        });
        Object.keys(Object.values(studio.visualizations)[0].options).forEach(key => expect(formatterKeys).toContain(key));
    });

    test('the Dashboard Studio definition is complete: its panel is wired to its data source and is on the canvas', () => {
        const [id, viz] = Object.entries(studio.visualizations)[0];
        expect(studio.dataSources[viz.dataSources.primary].type).toBe('ds.search');
        const item = studio.layout.structure.find(s => s.item === id);
        expect(item).toBeDefined();
        expect(item.position.x + item.position.w).toBeLessThanOrEqual(studio.layout.options.width);
        expect(item.position.y + item.position.h).toBeLessThanOrEqual(studio.layout.options.height);
        expect(item.position.h).toBeGreaterThanOrEqual(1000);
    });

    test('the nav opens them, and the production package leaves them out', () => {
        const nav = read('default/data/ui/nav/default.xml');
        ['mitre_heatmap_testbench', 'mitre_heatmap_classic', 'mitre_heatmap_studio'].forEach(view => expect(nav).toContain('name="' + view + '"'));
        const script = read('scripts/package.sh');
        ['mitre_heatmap_classic.xml', 'mitre_heatmap_studio.xml'].forEach(file => expect(script).toContain("--exclude='/default/data/ui/views/" + file + "'"));
        expect(script).toMatch(/mitre_heatmap_\(test\|classic\|studio\)/);
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
        expect(views.map(v => v.getAttribute('name'))).toEqual(['mitre_heatmap_testbench', 'mitre_heatmap_classic', 'mitre_heatmap_studio']);
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
