# MITRE ATT&CK<sup>&reg;</sup> Heatmap

Custom Visualizations give you new interactive ways to visualize your data during search and investigation, and to better communicate results in dashboards and reports. After installing this app youll find a MITRE ATT&CK Heatmap diagram as an additional item in the visualization picker in Search and Dashboard.

This app uses Enterprise ATT&CK v9. For more information visit https://attack.mitre.org/versions/v9/

![screenshot.png](https://github.com/alatif113/mitre_attack_heatmap/blob/master/static/screenshot.gif?raw=true)

![screenshot.png](https://github.com/alatif113/mitre_attack_heatmap/blob/master/static/focus.gif?raw=true)

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

### Drilldowns

1. **Row Fields**: all search output fields are drilldownable via `$row.<<FIELD>>$`
2. **Technique Name**: the name of a selected technique is drilldownable via `$row.mtr_technique$`
3. **Tactic Name**: the name of a selected tactic (either by clicking an underlying technique or clicking the tactic name itself) is drilldownable via `$row.mtr_tactic$`

## Support

This app is currently unsupported for Internet Explorer. Please report issues to https://github.com/alatif113/mitre_attck_heatmap/issues

## Change Log

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
