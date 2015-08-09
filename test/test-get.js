/**
 * test-get.js
 * copyright 2015, Jurgen Leschner - github.com/jldec - MIT license
 *
**/

var test = require('tape');

var u = require('pub-util')

test('get JSON array from somewhere', { timeout:10000 }, function(t) {

  var source = require('../pub-src-http')( { path:'https://raw.githubusercontent.com/jldec/pub-src-http/master/test/test.json' } );

  source.get(function(err, data) {
    t.error(err);
    t.assert(u.isArray(data));
    t.end();
  });

});
