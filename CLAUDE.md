# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Splunk app (this repository is the app root) that adds one custom visualization: a MITRE ATT&CK / D3FEND heatmap. Search results (`id`, numeric value, optional description) are mapped onto a tactic → technique → sub-technique matrix and colored in value bands blended from a 3-stop gradient (or a palette). There is no backend logic. Splunk loads the bundled AMD module plus conf files. There is a Jest harness (see Tests) but no linter.

All visualization code lives in `appserver/static/visualizations/mitre_attck_heatmap/` (called `VIZ/` below).

## Build pipeline (the directory names are inverted)

The usual meaning of `src/` and `build/` is **reversed** here:

- `VIZ/build/` holds the **human-edited source** (readable ES6+). Edit `build/visualization_source.js`. Never edit `src/`.
- `VIZ/src/` holds **generated** output: Babel-transpiled and terser-minified one-liners.
- `VIZ/visualization.js` is the **final webpack bundle** that Splunk actually loads (AMD, `libraryTarget: 'amd'`). It is committed, so you must rebuild it after any source change.

From `VIZ/`, after running `npm install`:

```sh
npm run build      # babel build -> src, terser minify, then webpack src -> visualization.js
npm run devbuild   # webpack only (uses $SPLUNK_HOME); skips babel/terser, so src/ must already be current
```

`npm run build` runs webpack with system Node, so no Splunk install is needed (verified byte-for-byte against the committed artifacts with Node 22 after `npm ci`). `npm run build:splunk` is the old variant that uses `/Applications/Splunk/bin/splunk cmd node`. The webpack version is 1.x and relies on `resolve.root`. Its externals are `api/SplunkVisualizationBase` and `api/SplunkVisualizationUtils`, which Splunk provides at runtime. `node_modules/` is not checked in.

`scripts/package.sh` (and `.slimignore`) keep `build/`, `src/`, the package files and the webpack/babel configs out of the packaged app, and the script fails if anything else lands in the visualization folder. The shipped viz is only `visualization.js`, `visualization.css`, `formatter.html` and `preview.png`.

## Tests

The Jest harness lives in `VIZ/test/`. It is a **separate npm package** on purpose. Installing Jest into the build package bumps `@babel/core`/`caniuse-lite`, after which the `"> 0.25%, not dead"` Babel target stops down-levelling `let`/`?.`, and webpack 1 can no longer parse the output. Never add test dependencies to `VIZ/package.json`.

```sh
cd VIZ/test && npm install          # once
npm test                            # all Jest suites (~70s; jsdom renders of the full Enterprise matrix are slow)
npm run test:python                 # the importer's Python tests (stdlib unittest, ~2s)
npx jest heatmapLogic               # just the fast unit tests
npx jest -t "tooltip"               # tests whose name matches
npm run test:coverage
```

How it fits together:
- `test/support/amdTransform.js` runs the AMD modules in `build/` (and the shipped `visualization.js`) unmodified under Jest.
- `moduleNameMapper` in `test/jest.config.js` mirrors webpack's `resolve.root` and points `api/SplunkVisualization*` at `test/mocks/`.
- `test/support/render.js` renders through `formatData` → `updateView`, using the `[default]` stanza of `default/savedsearches.conf` as the base config. It switches the first-render fade and count-up off (`viz._entrance = false`) so tests leave no frame loop; `renderAnimated` turns it on.

The suites:
- **`heatmapLogic.test.js`:** unit tests for the pure logic in `build/heatmapLogic.js`.
- **`visualization.test.js`:** jsdom render, interaction and snapshot tests. The snapshots are characterization tests: a hash of the exact HTML plus a structural summary. Tests named `(audit …)` pin known defects (see *Known limitations* in `docs/ARCHITECTURE.md`). When a change is *meant* to alter output, update with `npx jest -u` and review the summary diff.
- **`bundle.test.js`:** checks that `visualization.js` renders identically to `build/`. It fails if you edit `build/` without rebuilding the bundle. It also forbids function declarations inside blocks in the source: the bundle runs in sloppy mode but the minifier assumes strict mode, so a block-level declaration can be renamed onto another variable (this broke the animation once).
- **`interaction.test.js`:** the interface: tactic headers, cells, bands and palettes, tooltip and pinning, search, the data filter, legend bands, keyboard, what survives a refresh, messages.
- **`navigator.test.js`:** the Navigator export; every exported layer is validated against the v4.5 format rules in `support/navigatorLayer.js`.
- **`imported.test.js`:** imported-matrix selection, fallback, caching and stale-request handling with a stubbed fetch.
- **`config.test.js`, `importer-config.test.js`, `css.test.js`:** the config files, the test bench dashboard and the importer's Splunk configuration must agree with each other and with the code. A new format option needs a control in `formatter.html`, a default in `savedsearches.conf` and a spec line.

Behavior that depends on a running Splunk (the scripted input, the scheduled search, the KV Store read from the browser, Splunk Web's splunkd proxy URL) has no automated test; it is checked only by the consistency tests above and by hand.

Fixtures (`test/fixtures/`) cover typical, empty, single-row, wide (10 fields) and large (every Enterprise ID plus unknown IDs) result sets.

## Pure logic vs. Splunk-coupled code

Config parsing, field mapping, matrix/platform selection, row parsing, roll-up, automatic bounds, status colors, the percent/color scale, legend and animation math, tactic stats, sorting, search matching, Navigator layer building and imported-record selection live in `build/heatmapLogic.js` (AMD, no dependencies, no DOM). `visualization_source.js` keeps the jQuery DOM construction, event wiring and the Splunk API surface, and calls into `logic.*`. Put new non-DOM logic in `heatmapLogic.js` with unit tests.

Data flow in `updateView`: resolve fields → parse rows into one entry per id → roll up → (status summary) → automatic bounds → legend → apply entries to cells → tooltips, tactic statistics, hide null, drilldown, sort, search, export button. Everything from the matrix on is inside a `render` arrow function so imported data can be drawn after a fetch; its body is deliberately not re-indented (template-literal whitespace is part of the snapshots).

## Packaging and deploy

- `scripts/package.sh` builds and writes `<app_id>.tgz` into the app root. `APP_ENV=production` (default) packages the app hidden (`is_visible = 0`) without the test bench; `APP_ENV=test` makes it visible and adds `default/data/ui/nav/default.xml`, the test bench dashboard (`mitre_heatmap_testbench.xml`) and `lookups/mitre_heatmap_test.csv`. Visibility is rewritten in the staged copy only; `default/app.conf` in the repo stays `is_visible = 0`.
- `scripts/deploy_dev.sh` packages with `APP_ENV=test` (unless set), scp's the archive to the dev host, then installs it through the REST API. `--ssh-install` (with `--restart`) unpacks it over ssh instead, for when REST is unavailable (a Free license answers every REST call with 401). Test packages get a fresh `build` number so browsers load the new static files. Settings live in the git-ignored `.env`; see the script header.
- The package ships `bin/import_matrices.py` and `bin/mitre_attck/` (the scripted input) but not `bin/enterpriseAttack2json.py`, `scripts/`, `docs/`, `images/`, `CLAUDE.md`, `.env`, tests or hidden files.
- The repo sits in iCloud Drive, which can create duplicates such as `visualization 2.js`. The package script skips names like that, but they are worth deleting.

## Dashboard Studio

Studio hosts this classic visualization in an iframe with `sandbox="allow-scripts"` through its own bridge (read from Studio's shipped source; see `docs/ARCHITECTURE.md`). Consequences baked into the code:
- Only options set in the dashboard arrive, **not** the `savedsearches.conf` defaults, so the defaults in `heatmapLogic.parseConfig` must equal the conf (a test checks).
- Drilldown values are turned into text with `String()`: never send `undefined` (the click handler leaves such keys out). Tokens are `$row.<name>.value$` in Studio, `$row.<name>$` in classic.
- Use `fetch()`, not `XMLHttpRequest` (Studio proxies fetch); the iframe's `location` is `about:srcdoc`, so page-based lookups use `document.baseURI` first.
- No downloads and no new windows: the export shows a copy box and tooltip links become text (`_isSandboxed()`). No `localStorage`.
- `window.DASHBOARD_THEME` (set by Studio from the dashboard) is what `getCurrentTheme()` returns, so there is no theme option.
- Each panel is its own iframe: the matrix cache is per panel there.

## Matrix data

`build/{enterpriseAttack,icsAttack,mobileAttack,d3fend}.js` are generated data modules of the form `define(function() { return {tactics, techniques, sub_techniques, version, modified, source, schema} })` (D3FEND has no metadata keys). `visualization_source.js` imports them by bare name through webpack's `resolve.root`. Techniques reference tactics by `short_name` (ATT&CK kill-chain phase name, or the D3FEND `@id` such as `d3f:Harden`); sub-techniques reference their parent through `technique`.

The conversion lives in the standard-library package `bin/mitre_attck/` (`fetch`, `attck`, `d3fend`, `validate`, `output`), shared by two entry points:

- `bin/import_matrices.py`: the **scripted input**. Prints one JSON event per changed matrix plus a status event; `inputs.conf` (disabled), `props.conf` (`TRUNCATE = 0`), `collections.conf`/`transforms.conf` (KV Store `mitre_matrix`), `macros.conf` and a disabled scheduled search copy the events into the collection, which the viz reads when `matrixSource = splunk`. It is not covered by anything that runs inside Splunk here: only the Python tests and the config-consistency tests exist.
- `bin/enterpriseAttack2json.py`: the offline **fallback** that rewrites the `build/*.js` modules (all or none, after sanity checks). It is left out of packages. `--from-dir`, `--matrices` and `--out` are available.

```sh
python3 bin/enterpriseAttack2json.py --matrices enterprise,ics,mobile   # then: npm run build
```

The tactic column order comes from the bundle's own matrix definition, not a list. D3FEND follows the current ontology (7 tactic columns, techniques in them, every class below a technique as a flat list of sub-techniques with their own IDs); `bin/mitre_attck/d3fend.py` documents the mapping. A new ATT&CK version can rename tactics, which changes drilldown token values.

Python tests: `cd VIZ/test && npm run test:python` (67 tests, standard library only).

## Rendering model (`build/visualization_source.js`)

The module is a single `SplunkVisualizationBase.extend({...})`. On every `updateView` it rebuilds the whole DOM with jQuery, but what the user did (search text, All/With data/Gaps, pinned band, focused tactic, pinned tooltip, scroll position) lives in `this._ui` and is restored after each rebuild; the entrance animation only runs on the first render.

1. It picks the matrix and platform filter from the `matrix` setting (`"<matrix>::<comma-separated platforms>"`, for example `enterprise::Linux`).
2. It builds tactic columns (flat header: name, coverage %, count, gauge, hover card), then clones technique cells into every tactic they belong to. Sub-technique cells are added under each technique but are **not drawn**: they carry `data-*` for the tooltip, roll-up and drilldown.
3. It applies data rows. `r[0]` is the id (matched against `data-id`), `r[1]` the value, `r[2]` the description. The scale is split into `colorBands` bands (`logic.computeEdges`: even edges for manual bounds, quantile edges for bounds from the data); a cell gets `data-value`, `data-percent`, `data-band` and the band's color. Colors blend in OKLCH (`logic.getColor`), text color comes from WCAG contrast (`logic.textColorOn`).
4. It computes per-tactic stats, hideNull, one shared tooltip (positioned in JS inside the panel; hover shows it, click pins it; sub-technique rows in it send the sub-technique drilldown), sorting, the legend of bands plus *No data* (or status swatches), search/band/tactic focus (`applyFocus`, which toggles `focused`/`defocused`), keyboard navigation (one tab stop, arrows via `logic.nextCell`) and the export button.

Wall mode (`wallMode`, off by default) twinkles cells and scrambles tactic headers on timers that stop themselves when anyone interacts (`quiet()`), on re-render, and when the panel leaves the page.

Messages replace the matrix for no results (`formatData` returns `{empty: true}`), no usable rows, and ids that match nothing.

State is still mostly in DOM `data-*` attributes; sorting and stats read them back.

Drilldown emits the `mtr_*` tokens documented in the README (`mtr_tactic_id`, `mtr_technique_name`, `mtr_sub-technique_value`, etc.). Keep their names stable because they are a user-facing API.

## Adding or changing a format option

A setting is wired in several places, and they currently drift out of sync. Keep all of them in step:

- `VIZ/formatter.html`: the UI control, named `{{VIZ_NAMESPACE}}.<key>`.
- `default/savedsearches.conf`: the default value.
- `README/savedsearches.conf.spec`: the type declaration.
- `build/visualization_source.js`: read the setting via `config[this.getPropertyNamespaceInfo().propertyNamespace + '<key>']` and give it a fallback.

The format menu is deliberately small (25 controls). `legendTitle`, `statusDefaultColor`, `navigatorLayerName`, `navigatorAttackVersion`, `autoLowerBound` and `rollupParent` are still read (and have conf/spec entries) but are not in the menu; `config.test.js` lists them. The formatter's shown defaults must equal `savedsearches.conf`, and a test checks that.

## Versioning

Version numbers appear in `app.manifest` and in `default/app.conf` (both `[launcher]` and `[id]`). The changelog is in `README.md`. Update all of them together.
