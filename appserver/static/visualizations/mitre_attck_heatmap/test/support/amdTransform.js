/*
 * Jest transformer that lets AMD modules (build/*.js and the webpack bundle)
 * load unmodified: a local `define` resolves dependencies through Jest's
 * `require` (and so through moduleNameMapper) and assigns the factory result
 * to module.exports.
 *
 * The prelude is kept on the first line so coverage line numbers still match
 * the source file.
 */
const PRELUDE =
    'function define(deps, factory) {' +
    ' if (typeof deps === "function") { factory = deps; deps = []; }' +
    ' module.exports = factory.apply(null, deps.map(function(d) { return require(d); }));' +
    ' } define.amd = true; ';

module.exports = {
    process(src) {
        return { code: PRELUDE + src };
    }
};
