# pub-src-http

HTTP source for pub-server and pub-generator

* provides `get()` and `put()` for JSON reads and writes over http
* uses [request](https://github.com/mikeal/request) in node, depends on jquery XHR in browser

## src(options)

```javascript
var src = require('pub-src-http');

// instantiate source
// options become properties of source
var source = src( { path:'http://....', timeout:10000 } );

source.get(function(err, result) {
  if (err) return console.log(err);
  console.log(result);
});

```
### source.path
- must be set to the URL of the HTTP endpoint

### source.timeout
- timeout in ms - defaults to 5000

### source.get(cb)
- `get()` fetches JSON in a single HTTP GET request from the endpoint in source.path 
- the result should be an array of file objects each with a `path:` and a `text:` property
- for non "FILE" type sources, other JSON structures may be retrieved 

### source.put(files, [options], cb)
- does nothing unless `writable` is set on the source
- serializes files into JSON and transmits them via HTTP POST to the endpoint in source.path 

```javascript
source.put(files, function(err, result) {
  if (err) return console.log(err);
  console.log(result);
});
```

#### configuring authentication
- explicit authentication configuration is not currently supported
- in the browser (e.g. saving files to a server), jQuery will include browser session cookies