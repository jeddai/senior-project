var assert = require('assert');
var expect = require('chai').expect;
var request = require('request');
var sinon = require('sinon');
var app = require('../app.js');
var index = require('../routes/index.js');

app.listen(8000);

describe('Index file', function() {
    describe('\'/\' test', function () {
        it('should render the index file', function(done) {
            request('http://localhost:8000/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});
