var assert = require('assert');
var expect = require('chai').expect;
var sinon = require('sinon');
var angular = require('../../bower/angular-mocks/angular-mocks');
var homeCtrl = require('./home-controller');

describe('Test home controller', function() {
    beforeEach(angular.module('titanic'));


    it('should have the title', function() {
        assert.equal(homeCtrl.title, 'Would you survive?');
    });
});