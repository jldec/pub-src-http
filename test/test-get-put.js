/**
 * test-get-put.js
 * copyright 2015-2020, Jürgen Leschner - github.com/jldec - MIT license
 *
**/

var test = require('tape');
var fs = require('fs');

var expected = JSON.parse(fs.readFileSync(__dirname + '/test.json'));

test('get and put', { timeout:30000 }, function(t) {

  var source = require('../pub-src-http')(
    { path:'https://raw.githubusercontent.com/jldec/pub-src-http/master/test/test.json',
      writable: true }
  );

  source.get(function(err, data) {
    t.error(err);
    t.deepEqual(data, expected, 'data matches expected');

    // endpoint should respond with POSTed data
    var endpoint = process.env.ECHO_ENDPOINT;
    t.assert(endpoint, '$ECHO_ENDPOINT for put');

    // endpoint expects token in "echo-token" header
    var token = process.env.ECHO_ENDPOINT_TOKEN;
    t.assert(token, '$ECHO_ENDPOINT_TOKEN for put');

    source.put(expected, {url:endpoint, headers:{'echo-token':token}}, function(err, data) {
      t.error(err);
      t.deepEqual(data, expected, 'POST response matches expected');
      t.end();
    });
  });
});
