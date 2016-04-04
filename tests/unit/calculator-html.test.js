/*jslint nomen: true */
/*global $, myCalculator, __html__*/
describe('DOM markup', function () {

    'use strict';

    beforeEach(function () {
        document.body.innerHTML = __html__['index.html'];
    });

    it('should expose the index.html to __html__', function () {
        expect($('#calculator')).toBeDefined();
    });
});