[import]
matrices = <comma-separated list>
* The matrices to import: any of enterprise, ics, mobile.
* Default: enterprise,ics,mobile

timeout = <integer>
* Seconds to wait for each download.
* Default: 120

max_bytes = <integer>
* Largest download accepted, compressed or decompressed.
* Default: 157286400

verify_tls = <boolean>
* Verify the server's certificate. Leave this on.
* Default: true

proxy = <url>
* HTTP(S) proxy for the downloads, for example http://proxy.example.com:3128.
* Default: none

min_count_ratio = <float>
* A matrix is rejected if its tactics, techniques or sub-techniques number
  fewer than this fraction of those in the previous import.
* Default: 0.8

[source:<matrix>]
url = <url>
* Where to download the named matrix from; must be https. Use this to point at
  an internal mirror.
* Default: MITRE's published STIX data for that matrix.
