/**
 * test-get.js
 * copyright 2015, Jurgen Leschner - github.com/jldec - MIT license
 *
**/

suite('test-get');

var assert = require('assert')
var u = require('pub-util')

test('get JSON array from somewhere', function(done) {
  this.timeout(10000);

  var source = require('../pub-src-http')( { path:'https://raw.githubusercontent.com/jldec/pub-src-http/master/test/test.json' } );

  source.get(function(err, data) {
    if (err) return done(err);
    assert(u.isArray(data));
    done();
  });

});
