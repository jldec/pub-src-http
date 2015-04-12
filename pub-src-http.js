/**
 * pub-src-http.js
 * uses request in node, jquery in browser
 * https://github.com/mikeal/request
 *
 * copyright 2015, Jurgen Leschner - github.com/jldec - MIT license
**/

var u = require('pub-util');

module.exports = function sourceHttp(sourceOpts) {

  var src = {
    path: sourceOpts.path || '/' };

  var request = require('request');

  if (typeof request === 'function') {

    request = request.defaults( {
      timeout:sourceOpts.timeout || 5000,
      json:true } );

    src.get = getRequest;
    src.put = putRequest;

  }
  else {

    src.get = get$;
    src.put = put$;
  }

  return src;

  //--//--//--//--//--//--//--//--//--//--//

  function getRequest(options, cb) {
    if (typeof options === 'function') { cb = options; options = {}; }
    request.get(src.path, function(err, resp, body) {
      if (err || resp.statusCode != 200) return cb(err || resp.statusCode);
      cb(null, body);
    });
  }

  function putRequest(data, options, cb) {
    if (typeof options === 'function') { cb = options; options = {}; }
    if (!sourceOpts.writable) return cb(new Error('cannot write to non-writable source'));

    request.post(src.path, function(err, resp, body) {
      if (err || resp.statusCode != 200) return cb(err || resp.statusCode);
      cb(null, body);
    });
  }

  function get$(cb) {
    if (typeof options === 'function') { cb = options; options = {}; }

    $.getJSON(src.path)
    .done(function(respData) { cb(null, respData); })
    .fail(function(jqXHR) { cb(new Error(jqXHR.responseText)); });
  }

  // HTTP post sends json, and expects json response
  // metaData ignored for now
  function put$(data, options, cb) {
    if (typeof options === 'function') { cb = options; options = {}; }
    if (!sourceOpts.writable) return cb(new Error('cannot write to non-writable source'));

    $.ajax(
    { url: src.path,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      timeout: sourceOpts.timeout || 5000,
      data: JSON.stringify(data),
      dataType: "json" }
    )
    .done(function(respData) {
      cb(null, respData);
    })
    .fail(function(jqXHR) {
      cb(new Error(jqXHR.responseText));
    });
  }

}