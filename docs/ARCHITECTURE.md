# Architecture notes

Decisions and open items that are not obvious from the code. The build, test and packaging workflow is in `CLAUDE.md`; usage is in `README.md`.

## Design decisions

- **Version independent of the app.** The matrices are bundled (`build/*.js`, generated). An optional scripted input (`bin/import_matrices.py`) downloads newer ATT&CK versions as events; a scheduled report copies them into the `mitre_matrix` KV Store collection, which the visualization reads when *Matrix data* is *Imported*. If imported data is missing or unusable, the bundled data is drawn with a note. D3FEND is never imported. The offline converter `bin/enterpriseAttack2json.py` stays as a fallback and is left out of packages. The page-level cache for imported data is in memory (five minutes), not `sessionStorage`.
- **Fields by name.** `idField`, `valueField`, `descriptionField` and `statusField` name result columns; blank means positions 1, 2 and 3. A name that is not in the results is an error listing the available fields, not a silent fallback.
- **Color bounds.** `scaleMode = auto` takes the bounds from the data, starting at 0 unless a value is negative. Bands then use quantile edges; manual bounds use even edges.
- **Roll-up.** Sub-technique values aggregate (sum, max, avg rounded to a whole number, count) onto a parent that has no value of its own. Roll-up runs before bounds are computed.
- **Status coloring.** A text status column decides the color alone; the number appears only in the tooltip. A parent without a status takes the first listed status among its sub-techniques, so users list the most important status first. The tactic gauge uses two color stops per segment so it renders in every browser.
- **Navigator export.** Builds a layer in format 4.5 from the same parsed data. Not available for D3FEND. In Dashboard Studio the layer is shown in a copy box because the sandbox blocks downloads.
- **D3FEND.** Follows the current ontology: tactics are `d3f:DefensiveTactic` nodes in display order; techniques are direct subclasses of `d3f:DefensiveTechnique`, placed by `d3f:enables`; every class below a technique, at any depth, is a flat list of sub-techniques with its own ID. `bin/mitre_attck/d3fend.py` documents the mapping.
- **Layout.** Panels scroll sideways and up and down instead of squeezing columns. Columns are at least 76 px; long names end in an ellipsis and the tooltip has the full name.
- **Look and behavior (visual refresh).** Value bands with an OKLCH blend and WCAG-checked text color; flat tactic headers; one shared tooltip (hover intent, grace period, pinned on click); one tab stop with arrow-key navigation; UI state kept in `this._ui` across re-renders; the entrance animation is always on and runs on the first render only; Wall mode (twinkle and scramble) is the only animation option.
- **Format menu.** Kept small on purpose (25 controls). Six properties are still read but hidden: `legendTitle`, `statusDefaultColor`, `navigatorLayerName`, `navigatorAttackVersion`, `autoLowerBound`, `rollupParent`.

## Dashboard Studio

Studio hosts this classic visualization in a sandboxed iframe through its own bridge. Findings come from reading Studio's shipped source (Splunk 10.4.2 / Dashboard Studio 1.26.4); the code was adapted accordingly (defaults equal to `savedsearches.conf`, no `undefined` drilldown values, `fetch` instead of `XMLHttpRequest`, no downloads or new windows).

**Not yet verified in a browser** (the dev instance could not be used signed in): add the visualization from *Add chart > Custom visualizations*; check that the editor shows the format sections and that changes apply; switch the dashboard between light and dark; resize the panel; add an interaction using `row.mtr_technique_id.value`; hover, search and legend; the export copy box; and the `type` Studio writes (expected `mitre_attck_heatmap.mitre_attck_heatmap`). `default/data/ui/views/mitre_heatmap_studio.xml` (test package) is the sample dashboard to use.

**Native Studio visualization (Phase B).** Not started and not recommended yet. The questions it existed to answer (options, drilldown, theme, resize) have working answers for the classic visualization. It could still escape the sandbox limits (downloads, new windows), but the native framework's limits are unknown, and its tutorial documents no way to emit a drilldown event. Revisit only if the checks above show real problems.

## Known limitations

- **Empty results:** what Splunk passes to `updateView` for a search with no results has not been confirmed in a live instance. The visualization handles `{empty: true}` from `formatData`.
- **Status mode headers:** with a *Status field* the tactic header shows `0%` and `0/N`, because coverage is computed from numeric values. It should count techniques that have a status.
- **Imported data and Splunk Cloud:** the scripted input needs outbound HTTPS to `raw.githubusercontent.com` and may not be runnable on a Cloud search head; the bundled data works everywhere.
- **Splunk-dependent behavior without automated tests:** the scripted input, the scheduled report, the KV Store read from the browser, and Splunk Web's splunkd proxy URL.
