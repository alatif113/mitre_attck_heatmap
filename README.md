# MITRE ATT&CK<sup>&reg;</sup> Heatmap

Custom Visualizations give you new interactive ways to visualize your data during search and investigation, and to better communicate results in dashboards and reports. After installing this app youll find a MITRE ATT&CK Heatmap diagram as an additional item in the visualization picker in Search and Dashboard.

This app bundles ATT&CK v20.0 and D3FEND v0.22, and can import newer ATT&CK versions (see *Imported ATT&CK data* below). For more information visit https://attack.mitre.org/resources/versions/ and https://d3fend.mitre.org/resources/

![screenshot.png](https://github.com/alatif113/mitre_attack_heatmap/blob/master/appserver/static/screenshot.gif?raw=true)

![screenshot.png](https://github.com/alatif113/mitre_attack_heatmap/blob/master/appserver/static/focus.gif?raw=true)

## Usage

### Search Query

`| table <att&ck_technique_id> <numerical_value> [description]`

OR

`| stats <aggregation> by <att&ck_technique_id>`

The visualization requires at least 2 fields to be present within the search output, with an optional third:
1. **att&ck_technique_id**: The ID of a MITRE ATT&CK Technique (e.g. T0001)
2. **numerical_value / aggregation**: A numerical value or aggregation to associate with the technique (e.g. count, sum, average)
3. **(Optional) description**: An optional description to associate with the technique, to display within a tooltop on mouse hover.  

### Example search query

```
| stats count AS "Detection Count" first(description) as description by id
| table id "Detection Count" description
```

### More than the first three columns

By default the first three columns are the technique ID, the value and the description. These options (format menu) change that:

- **Fields**: name the columns instead of relying on their order. *ID field*, *Value field*, *Description field* and *Status field* take field names (matched exactly, then ignoring case). A name that is not in the results is shown as an error listing the available fields.
- **Roll up sub-techniques** (*Aggregation*): when the search returns sub-technique IDs such as `T1059.001`, show the sum, max, average or count on the parent technique. *Technique's own value* chooses between keeping a parent's own value or including it in the aggregate. Rolled-up cells have a dotted underline.
- **Color bounds**: *From data* sets the gradient from the lowest/highest value in the results (starting at 0 unless a value is negative, or at the lowest value if chosen) instead of the two bounds typed below it.
- **Status colors**: set *Status field* to a text column and list colors as `gap=#d93f3c, partial=#f1813f, covered=#53a051`. Cells then take the color of their status (matched ignoring case; other statuses use *Other status color*), the legend lists each status with a count, and the number only appears in the tooltip. A parent technique without a status takes the first listed status among its sub-techniques when roll-up is on, so list the most important status first. *Sort Key* gains *Status*, in the order listed.
- **Export button** (*Export*): adds a button that downloads the current data as an [ATT&CK Navigator](https://mitre-attack.github.io/attack-navigator/) layer (format 4.5): values become scores, descriptions become comments, status colors and the legend are kept. Not available for D3FEND.

### Imported ATT&CK data

MITRE publishes new ATT&CK versions more often than this app is released. The app can download them itself:

1. Enable the scripted input `bin/import_matrices.py` (Settings > Data inputs > Scripts) and the saved search *MITRE ATT&CK - update matrix collection*. Both are disabled by default. The Splunk host needs HTTPS access to `raw.githubusercontent.com`; settings (proxy, mirrors, limits) are in `mitre_attck_import.conf`.
2. Set *Matrix data* to *Imported* in the format menu. *ATT&CK version* optionally pins a version such as `19.1`, or `19` for the newest 19.x.

If no usable imported data exists, the bundled data is drawn with a note saying so. D3FEND is always bundled. Newer ATT&CK versions can rename tactics (v20 replaced *Defense Evasion* with *Stealth* and *Defense Impairment* for Enterprise), which affects drilldown tokens that match on tactic names.

`bin/enterpriseAttack2json.py` regenerates the bundled data offline.

### Dashboard Studio

The heatmap can be added to a Dashboard Studio dashboard (Add chart > Custom visualizations). Studio runs it inside a restricted frame, which changes a few things:

- **Tokens:** in Studio the drilldown values are `$row.mtr_technique_id.value$`, `$row.mtr_tactic_name.value$` and so on (classic dashboards use `$row.mtr_technique_id$`). Values that do not apply to a click are not set.
- **Options** that are not set in the dashboard use the same defaults as classic dashboards.
- **Export button:** the browser does not let the frame download files, so the export shows the layer in a box to copy instead.
- **Technique links** in tooltips are shown as text (the frame cannot open new windows).
- The heatmap follows the dashboard's own light or dark theme.
- Trellis and scheduled email export are not available for custom visualizations in Studio.

Studio's handling was checked against the code of Splunk 10.4.2 / Dashboard Studio 1.26.4; see `docs/studio-compatibility.md` (in the source repository) for what is still to be confirmed visually.

### Drilldowns

1. **Sub-Technique ID**: the ID of a selected sub-technique is drilldownable via `$row.mtr_sub-technique_id$`
2. **Technique ID**: the ID of a selected technique (either by clicking an underlying sub-technique or the technique itself) is drilldownable via `$row.mtr_technique_id$`
3. **Tactic ID**: the ID of a selected tactic (either by clicking an underlying technique or the tactic itself) is drilldownable via `$row.mtr_tactic_id$`
4. **Sub-Technique Name**: the name of a selected sub-technique is drilldownable via `$row.mtr_sub-technique_name$`
5. **Technique Name**: the name of a selected technique is drilldownable via `$row.mtr_technique_name$`
6. **Tactic Name**: the name of a selected tactic is drilldownable (either by clicking an underlying technique or the tactic itself) via `$row.mtr_tactic_name$`
7. **Sub-Technique Value**: the value of a selected sub-technique is drilldownable via `$row.mtr_sub-technique_value$`
8. **Technique Value**: the value of a selected technique is drilldownable (either by clicking an underlying sub-technique or the technique itself) via `$row.mtr_technique_value$`
9. **Tactic Value**: the value of a selected tactic is drilldownable (either by clicking an underlying technique or the tactic itself) via `$row.mtr_tactic_value$`

10. **Sub-Technique Status**: the status of a selected sub-technique, when a Status field is set, via `$row.mtr_sub-technique_status$`
11. **Technique Status**: the status of a selected technique (either by clicking an underlying sub-technique or the technique itself) via `$row.mtr_technique_status$`

If any of the above values are not defined, the associated token is unset. 

## Support

This app is currently unsupported for Internet Explorer. Please report issues to https://github.com/alatif113/mitre_attck_heatmap/issues

## Change Log

### Unreleased
- Updated the bundled data to ATT&CK v20.0
- Added an optional scripted input and saved search that import newer ATT&CK versions, with *Matrix data* and *ATT&CK version* options
- Added the Fields options to map result columns by name
- Added *Roll up sub-techniques*, *Color bounds: From data*, status-based coloring and an ATT&CK Navigator export button
- Fixed: Enterprise tactic order for ATT&CK v20, several dashboards on one page affecting each other, "Hide null" removing sub-techniques that have values, the legend for non-zero lower bounds, zero and decimal values in tooltips, searching for names with `&`, the animation loop multiplying on refresh, one click firing many drilldowns, and several Platform options that showed an empty matrix
- Fixed: legend text built from field names is now escaped
- Added a compact layout: below 640px wide the matrix is replaced by one tile per tactic
- Removed the unused *Theme* option; the heatmap uses the theme of the dashboard it is in
- Dashboard Studio: defaults now match classic dashboards, unset drilldown values are no longer sent as text "undefined", the imported-data read works inside Studio's frame, and the export falls back to a copy box

### v1.9.0
- Added an optional search bar, enabled through the format menu, to quickly highlight techniques based on their ID or name
- Updated to use ATT&CK v15.1 and D3FEND v0.15.0

### v1.8.0
- Added MITRE D3FEND Matrix
- Updated Enterprise, Mobile, and ICS matrices

### v1.7.3
- Updated to use ATT&CK v14

### v1.7.0
- Added ability to toggle sub-techniques on/off via the visualization format menu.
- Added ability to enable an animation on the heatmap, highlighting techniques from lowest to highest values within a given duration. 
- Fixed bug where sorting by value or technique name was not working correctly.

### v1.6.1
- Added ability to select matrix type via the visualization format menu.
- Added support for sub-techniques

## LICENSE from the MITRE Corporation (MITRE)

Both MITRE ATT&CK<sup>&reg;</sup> and ATT&CK<sup>&reg;</sup> are registered trademarks of The MITRE Corporation.

The MITRE Corporation (MITRE) hereby grants you a non-exclusive, royalty-free license to use ATT&CK Evaluations for research, development, and commercial purposes. Any copy you make for such purposes is authorized provided that you reproduce MITRE's copyright designation and this license in any such copy.

"(C) 2018 The MITRE Corporation. This work is reproduced and distributed with the permission of The MITRE Corporation."

DISCLAIMERS
MITRE does not claim ATT&CK enumerates all possibilities for the types of actions and behaviors documented as part of its adversary model and framework of techniques. Using the information contained within ATT&CK to address or cover full categories of techniques will not guarantee full defensive coverage as there may be undisclosed techniques or variations on existing techniques not documented by ATT&CK.

ALL DOCUMENTS AND THE INFORMATION CONTAINED THEREIN ARE PROVIDED ON AN "AS IS" BASIS AND THE CONTRIBUTOR, THE ORGANIZATION HE/SHE REPRESENTS OR IS SPONSORED BY (IF ANY), THE MITRE CORPORATION, ITS BOARD OF TRUSTEES, OFFICERS, AGENTS, AND EMPLOYEES, DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTY THAT THE USE OF THE INFORMATION THEREIN WILL NOT INFRINGE ANY RIGHTS OR ANY IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
