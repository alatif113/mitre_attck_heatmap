# MITRE ATT&CK Heatmap

Custom Visualizations give you new interactive ways to visualize your data during search and investigation, and to better communicate results in dashboards and reports. After installing this app youll find a MITRE ATT&CK Heatmap diagram as an additional item in the visualization picker in Search and Dashboard.

This app uses Enterprise ATT&CK v9. For more information visit https://attack.mitre.org/versions/v9/

## Usage

`| table <att&ck_technique_id> <numerical_value> [description]`

OR

`| stats <aggregation> by <att&ck_technique_id>`

The visualization rquires at least 3 fields to be present within the search output:
1. **att&ck_technique_id**: The ID of a MITRE ATT&CK Technique (e.g. T0001)
2. **numerical_value / aggregation**: A numerical value or aggregation to associate with the technique (e.g. count, sum, average)
3. **(Optional) descroption**: An optional description to associate with the technique, to display within a tooltop on mouse hover.  

### Example search query

```| stats count AS "Detection Count" first(description) as description by id
| table id "Detection Count" description```

## Support

This app is currently unsupported for Internet Explorer.

## LICENSE from the MITRE Corporation (MITRE)

The MITRE Corporation (MITRE) hereby grants you a non-exclusive, royalty-free license to use ATT&CK Evaluations for research, development, and commercial purposes. Any copy you make for such purposes is authorized provided that you reproduce MITRE's copyright designation and this license in any such copy.

"(C) 2018 The MITRE Corporation. This work is reproduced and distributed with the permission of The MITRE Corporation."

DISCLAIMERS
MITRE does not claim ATT&CK enumerates all possibilities for the types of actions and behaviors documented as part of its adversary model and framework of techniques. Using the information contained within ATT&CK to address or cover full categories of techniques will not guarantee full defensive coverage as there may be undisclosed techniques or variations on existing techniques not documented by ATT&CK.

ALL DOCUMENTS AND THE INFORMATION CONTAINED THEREIN ARE PROVIDED ON AN "AS IS" BASIS AND THE CONTRIBUTOR, THE ORGANIZATION HE/SHE REPRESENTS OR IS SPONSORED BY (IF ANY), THE MITRE CORPORATION, ITS BOARD OF TRUSTEES, OFFICERS, AGENTS, AND EMPLOYEES, DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTY THAT THE USE OF THE INFORMATION THEREIN WILL NOT INFRINGE ANY RIGHTS OR ANY IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
