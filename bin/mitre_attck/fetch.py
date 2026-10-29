"""Download a JSON document over HTTPS.

Handles gzip, a timeout, a size limit (applied to the decompressed data too),
conditional requests with an ETag, an optional proxy and certificate
verification, using only the standard library.
"""
import json
import ssl
import urllib.error
import urllib.parse
import urllib.request
import zlib

USER_AGENT = 'mitre_attck_heatmap-importer'
CHUNK = 1024 * 1024
LOCAL_HOSTS = ('localhost', '127.0.0.1', '::1')


class FetchError(Exception):
    """The document could not be downloaded or is not usable JSON."""


def _check_url(url):
    parts = urllib.parse.urlparse(url)
    if parts.scheme == 'https':
        return
    # Plain HTTP is only for tests against this machine.
    if parts.scheme == 'http' and parts.hostname in LOCAL_HOSTS:
        return
    raise FetchError('refusing to download %s: only https URLs are allowed' % url)


def _read_limited(response, max_bytes, gzipped):
    """Read the whole body, failing once it exceeds max_bytes (compressed or not)."""
    decoder = zlib.decompressobj(16 + zlib.MAX_WBITS) if gzipped else None
    raw_total = 0
    parts = []
    size = 0
    while True:
        chunk = response.read(CHUNK)
        if not chunk:
            break
        raw_total += len(chunk)
        if raw_total > max_bytes:
            raise FetchError('response is larger than the limit of %d bytes' % max_bytes)
        if decoder:
            try:
                chunk = decoder.decompress(chunk, max_bytes - size + 1)
            except zlib.error as error:
                raise FetchError('bad gzip data: %s' % error)
        size += len(chunk)
        if size > max_bytes:
            raise FetchError('decompressed response is larger than the limit of %d bytes' % max_bytes)
        parts.append(chunk)
    if decoder:
        try:
            tail = decoder.flush()
        except zlib.error as error:
            raise FetchError('bad gzip data: %s' % error)
        if size + len(tail) > max_bytes:
            raise FetchError('decompressed response is larger than the limit of %d bytes' % max_bytes)
        parts.append(tail)
    return b''.join(parts)


def fetch_json(url, timeout=120, max_bytes=150 * 1024 * 1024, etag=None, proxy=None, verify_tls=True):
    """Return (data, etag). data is None when the server says the document is
    unchanged since `etag` (HTTP 304)."""
    _check_url(url)

    handlers = []
    if proxy:
        handlers.append(urllib.request.ProxyHandler({'http': proxy, 'https': proxy}))
    context = ssl.create_default_context()
    if not verify_tls:
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE
    handlers.append(urllib.request.HTTPSHandler(context=context))
    opener = urllib.request.build_opener(*handlers)

    request = urllib.request.Request(url, headers={
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'User-Agent': USER_AGENT,
    })
    if etag:
        request.add_header('If-None-Match', etag)

    try:
        with opener.open(request, timeout=timeout) as response:
            gzipped = (response.headers.get('Content-Encoding') or '').lower() == 'gzip'
            body = _read_limited(response, max_bytes, gzipped)
            new_etag = response.headers.get('ETag')
    except urllib.error.HTTPError as error:
        if error.code == 304:
            return None, etag
        raise FetchError('%s returned HTTP %d' % (url, error.code))
    except (urllib.error.URLError, OSError) as error:
        raise FetchError('could not download %s: %s' % (url, getattr(error, 'reason', error)))

    try:
        return json.loads(body.decode('utf-8')), new_etag
    except (UnicodeDecodeError, ValueError) as error:
        raise FetchError('%s is not valid JSON: %s' % (url, error))
