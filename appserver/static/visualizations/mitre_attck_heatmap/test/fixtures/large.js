/*
 * Large result set: one row for every Enterprise technique and sub-technique,
 * plus unknown ids, with deterministic pseudo-random values in 0-150 so some
 * rows fall outside the default 0-100 scale.
 */
const enterpriseAttack = require('enterpriseAttack');

const UNKNOWN_IDS = 300;

function value(i) {
    return String((i * 37 + 11) % 151);
}

const ids = enterpriseAttack.techniques.map(t => t.id)
    .concat(enterpriseAttack.sub_techniques.map(s => s.id));

for (let i = 0; i < UNKNOWN_IDS; i++) {
    ids.push('T9' + String(i).padStart(3, '0'));
}

module.exports = {
    fields: [{ name: 'id' }, { name: 'count' }, { name: 'description' }],
    rows: ids.map((id, i) => [id, value(i), 'Row ' + i + ' for ' + id])
};
