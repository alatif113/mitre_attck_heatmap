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
