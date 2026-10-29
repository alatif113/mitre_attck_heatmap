/*
 * Consistency checks across the app's config files and the bundled matrix
 * data. No DOM and no Splunk mocks; these run in a second or two.
 */
const fs = require('fs');
const path = require('path');

const APP_ROOT = path.resolve(__dirname, '../../../../..');
const read = file => fs.readFileSync(path.join(APP_ROOT, file), 'utf8');
const VIZ_NAME = 'mitre_attck_heatmap';

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
