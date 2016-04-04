/**
 * Created by mtlsspb4 on 17/03/2016.
 */
/*global $, myCalculator */
describe('calculator controller tests', function () {

    'use strict';

    var model;

    beforeEach(function () {

        model = myCalculator.model;

        // setFixtures('<div id="calculator">' +
        //         '<div class="screen"></div>' +
        //         '<button class="number" data-value="9">9</button>' +
        //         '<button class="operator" data-value="+">+</button>' +
        //         '</div>');
    });

    // it('html fixture contains screen', function () {
    //     expect($('.screen')).toBeInDOM();
    // });
    //
    // it('html fixture contains number button', function () {
    //     expect($('button.number')).toBeInDOM();
    // });
    //
    // it('html fixture contains operator button', function () {
    //     expect($('button.operator')).toBeInDOM();
    // });

    it('addNumber subscription adds number to model expression', function () {
        $.publish('addToExpression', '1');
        expect(model.getExpression()).toBe('1');
        model.clearExpression();
    });

    it('two addNumber subscriptions appends number to model expression', function () {
        $.publish('addToExpression', '1');
        $.publish('addToExpression', '2');
        expect(model.getExpression()).toBe('12');
        model.clearExpression();
    });

    it('addOperator subscription appends operator to model expression', function () {
        $.publish('addToExpression', '1+2');
        expect(model.getExpression()).toBe('1+2');
        model.clearExpression();
    });

    it('evalExpression subscription evaluates and updates expression', function () {
        $.publish('addToExpression', '1+2');
        $.publish('evaluateExpression');
        expect(model.getExpression()).toBe('3');
        model.clearExpression();
    });

    it('removeLastItem subscription removes last item from expression', function () {
        $.publish('addToExpression', '1+2');
        $.publish('removeLastFromExpression');
        expect(model.getExpression()).toBe('1+');
        $.publish('removeLastFromExpression');
        expect(model.getExpression()).toBe('1');
        model.clearExpression();
    });

});