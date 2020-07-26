# pub-src-http
[![CI](https://github.com/jldec/pub-src-http/workflows/CI/badge.svg)](https://github.com/jldec/pub-src-http/actions)

HTTP source for pub-server and pub-generator

* provides `get()` and `put()` for JSON reads and writes over http
* uses [node-fetch](https://github.com/node-fetch/node-fetch) in node, built-in fetch in browser

## src(options)

```javascript
var src = require('pub-src-http');

// instantiate source
// options become properties of source
var source = src( { path:'https://....' } );

source.get(function(err, result) {
  if (err) return console.log(err);
  console.log(result);
});

```
### source.path
- must be set to the URL of the HTTP endpoint

### source.timeout
- not currently implemented

### source.get([options], cb)
- `get()` fetches JSON in a single HTTP GET request from the endpoint in source.path
- the result should be an array of file objects each with a `path:` and a `text:` property
- for non "PUB" type sources, other JSON structures may be retrieved

### source.put(files, [options], cb)
- does nothing unless `writable` is set on the source
- serializes files into JSON and transmits them via HTTP POST to the endpoint in source.path

### options
- use optional options object for fetch options like headers
- use options.url to override endpoint

```javascript
source.put(files, function(err, result) {
  if (err) return console.log(err);
  console.log(result);
});
```

#### configuring authentication
- explicit authentication configuration is not currently supported
- in the browser request cookie credentials are included
