/**
 * pub-src-http.js
 * uses node-fetch in node, built-in fetch in browser
 *
 * copyright 2015-2020, Jürgen Leschner - github.com/jldec - MIT license
**/

module.exports = function sourceHttp(sourceOpts) {

  var fetch = (typeof window !== 'undefined' && window.fetch) || require('node-fetch');

  return {
    get: get,
    put: put
  };

  //--//--//--//--//--//--//--//--//--//--//

  function get(options, cb) {
    if (typeof options === 'function') { cb = options; options = {}; }

    options.method = 'GET';
    options.credentials = 'include';

    fetch(options.url || sourceOpts.path, options)
      .then(function(res) {
        if (!res.ok) {
          throw new Error('http-src get: '+ res.status + ' ' + res.statusText);
        }
        return res.json(); // simply assume json
      })
      .then(function(respData) { cb(null, respData); })
      .catch(function(err) { cb(err); });
  }

  function put(data, options, cb) {
    if (typeof options === 'function') { cb = options; options = {}; }
    if (!sourceOpts.writable) return cb(new Error('cannot write to non-writable source'));

    options.method = 'POST';
    options.credentials = 'include';
    options.body = JSON.stringify(data);
    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/json; charset=utf-8';

    fetch(options.url || sourceOpts.path, options)
      .then(function(res) {
        if (!res.ok) {
          throw new Error('http-src get: '+ res.status + ' ' + res.statusText);
        }
        return res.json(); // simply assume json
      })
      .then(function(respData) { cb(null, respData); })
      .catch(function(err) { cb(err); });
  }

};
