/**
 * Created by mtlsspb4 on 06/03/2016.
 */
describe('DOM markup', function () {

    'use strict';

    beforeEach(function () {
        document.body.innerHTML = __html__['index.html'];
    });

    it('should expose the index.html to __html__', function () {
        expect($('#calculator')).toBeDefined();
    });
});