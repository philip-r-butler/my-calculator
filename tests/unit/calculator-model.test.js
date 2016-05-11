/*global jQuery, myCalculator */
describe('calculator model tests', function () {

    'use strict';

    var model = {};

    beforeEach(function () {
        model = myCalculator.model;
    });

    it('calculator is object', function () {
        expect(typeof model === 'object').toBeTruthy();
    });

});