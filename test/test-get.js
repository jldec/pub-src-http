/**
 * test-get.js
 * copyright 2015-2020, Jürgen Leschner - github.com/jldec - MIT license
 *
**/

var test = require('tape');
var fs = require('fs');

var expected = JSON.parse(fs.readFileSync(__dirname + '/test.json'));

test('get JSON array from somewhere', { timeout:30000 }, function(t) {

  var source = require('../pub-src-http')( { path:'https://raw.githubusercontent.com/jldec/pub-src-http/master/test/test.json' } );

  source.get(function(err, data) {
    t.error(err);
    t.deepEqual(data, expected, 'data matches expected');
    t.end();
  });

});


// TODO
// - test put
// - test $ variants
