/**
 * Created by mtlsspb4 on 04/03/2016.
 */
describe('calculator model tests', function () {

    'use strict';

    var model = {};

    beforeEach(function () {
        model = myCalculator.model;
    });

    it('calculator is object', function () {
        expect(typeof model === 'object').toBeTruthy();
    });

    //it('should return expression as string', function(){
    //    expect(model.chars('abc').toBe('abc'));
    //})
    //it('should evaluate expression', function () {
    //    expect(model.evaluateExpression(2, 2)).toBe(4);
    //});

    // it('should add numbers', function () {
    //     expect(model.add(2, 2)).toBe(4);
    // });
    //
    // it('should divide number', function () {
    //     expect(model.divide(6, 2)).toBe(3);
    // });
    //
    // it('should subtract positive numbers', function () {
    //     expect(model.subtract(4, 2)).toBe(2);
    // });
    //
    // it('should multiply numbers', function () {
    //     expect(model.multiply(0, 3)).toBe(0);
    //     expect(model.multiply(3, 0)).toBe(0);
    // });
    //
    // it('should throw an error when first parameter is not a number', function () {
    //     expect(function () {
    //         model.add('a', 1);
    //     }).toThrow();
    // });
    //
    // it('should throw an error when second parameter is not a number', function () {
    //     expect(function () {
    //         model.add(1, 'a');
    //     }).toThrow();
    // });
    //
    // it('should throw an error when both parameters are not numbers', function () {
    //     expect(function () {
    //         model.add('a', 'b');
    //     }).toThrow();
    // });
    //
    // it('should throw an error when dividing by zero', function () {
    //     expect(function () {
    //         model.divide(1, 0);
    //     }).toThrow();
    // });
});