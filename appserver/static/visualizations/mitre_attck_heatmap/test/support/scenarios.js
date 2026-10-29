/*
 * Fixture x format-option combinations shared by the render snapshots and the
 * source-vs-bundle parity check.
 */
const FIXTURES = ['typical.json', 'empty.json', 'single-row.json', 'wide.json', 'large.js'];

const OPTIONS = {
    'defaults': {},
    'display name': { display: 'name' },
    'hide null': { hideNull: 'yes' },
    'no sub-techniques': { showSubTechniques: 'no' },
    'sort by id desc': { sortKey: 'data-id', sortOrder: 'desc' },
    'sort by name asc': { sortKey: 'data-name', sortOrder: 'asc' },
    'custom scale and legend': {
        startVal: '50', endVal: '150',
        startColor: '#000', midColor: '#888888', endColor: '#fff',
        legendTitle: 'Alerts <per> "day"'
    },
    'search bar off': { showSearchBar: 'no' },
    'ics': { matrix: 'ics::' },
    'mobile android': { matrix: 'mobile::Android' },
    'd3fend': { matrix: 'd3fend::' },
    'enterprise windows': { matrix: 'enterprise::Windows' },
    'enterprise multi-platform': { matrix: 'enterprise::IaaS,SaaS' }
};

// Every option set against the typical fixture; every fixture with defaults;
// the large fixture also with the options that change the most markup.
function scenarios() {
    const list = [];
    Object.keys(OPTIONS).forEach(name => list.push(['typical.json', name]));
    FIXTURES.filter(f => f !== 'typical.json').forEach(f => list.push([f, 'defaults']));
    ['hide null', 'display name', 'sort by id desc'].forEach(name => list.push(['large.js', name]));
    return list.map(([fixture, name]) => ({ fixture, name, options: OPTIONS[name] }));
}

module.exports = { FIXTURES, OPTIONS, scenarios };
