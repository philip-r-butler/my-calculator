/**
 * Created by mtlsspb4 on 17/03/2016.
 */
/*global $, myCalculator */
describe('calculator controller tests', function () {

    'use strict';

    var model, buttons, spyEvent;

    beforeEach(function () {

        model   = myCalculator.model;
        buttons = myCalculator.buttons;

        setFixtures('<div id="calculators">' +
            '<div class="screen"></div>' +
            '<button class="number" data-val="9">9</button>' +
            '<button class="operator" data-val="+">+</button>' +
            '<button id="backspace">C</button>' +
            '<button id="evaluate">=</button>' +
            '</div>');
    });

    afterEach(function () {
        model.clear();
    });

    it('html fixture contains calculator', function () {
        expect($(myCalculator.view.getUISelectors().calculators)).toBeInDOM();
    });

    it('html fixture contains number element', function () {
        expect($(myCalculator.view.getUISelectors().number)).toBeInDOM();
    });

    it('html fixture contains operator element', function () {
        expect($(myCalculator.view.getUISelectors().operator)).toBeInDOM();
    });

    it('html fixture contains remove element', function () {
        expect($(myCalculator.view.getUISelectors().remove)).toBeInDOM();
    });

    it('html fixture contains evaluate element', function () {
        expect($(myCalculator.view.getUISelectors().evaluate)).toBeInDOM();
    });

    it('html fixture contains screen element', function () {
        expect($(myCalculator.view.getUISelectors().screen)).toBeInDOM();
    });

    it('number button clicked event triggered', function () {
        var number = myCalculator.view.getUISelectors().number;

        spyEvent = spyOnEvent(number, 'click');

        $(number).trigger('click');
        expect(spyEvent).toHaveBeenTriggered();
    });

    it('operator button clicked event triggered', function () {
        var operator = myCalculator.view.getUISelectors().operator;

        spyEvent = spyOnEvent(operator, 'click');

        $(operator).trigger('click');
        expect(spyEvent).toHaveBeenTriggered();
    });

    it('number button clicked adds character to expression', function () {
        $(myCalculator.view.getUISelectors().number).trigger('click');
        expect(model.get()).toBe('9');
    });

    it('operator button clicked adds character to expression', function () {
        var number   = myCalculator.view.getUISelectors().number,
            operator = myCalculator.view.getUISelectors().operator;

        $(number).trigger('click');
        $(operator).trigger('click');
        expect(model.get()).toBe('9+');
    });

    it('backspace button clicked removes last character from expression', function () {
        var number   = myCalculator.view.getUISelectors().number,
            operator = myCalculator.view.getUISelectors().operator,
            remove   = myCalculator.view.getUISelectors().remove;

        $(number).trigger('click');
        $(operator).trigger('click');
        $(number).trigger('click');
        expect(model.get()).toBe('9+9');
        $(remove).trigger('click');
        expect(model.get()).toBe('9+');
    });

    it('evaluate button clicked evaluates expression', function () {
        var number   = myCalculator.view.getUISelectors().number,
            operator = myCalculator.view.getUISelectors().operator,
            evaluate = myCalculator.view.getUISelectors().evaluate;

        $(number).trigger('click');
        $(operator).trigger('click');
        $(number).trigger('click');
        $(evaluate).trigger('click');
        expect(model.get()).toBe('18');
    });

    it('number key pressed add character to expression', function () {
        var code = 49;

        $(document).trigger($.Event('keypress', {which: code, keyCode: code}));
        expect(model.get()).toBe('1');
    });

    it('number key pressed add character to expression', function () {
        var code = 49;

        $(document).trigger($.Event('keypress', {which: code, keyCode: code}));
        expect(model.get()).toBe('1');
    });

    it('addToExpression subscription adds character to model expression', function () {
        $.publish('addToExpression', '1');
        expect(model.get()).toBe('1');
    });

    it('two addToExpression subscriptions appends two characters to model expression', function () {
        $.publish('addToExpression', '1');
        $.publish('addToExpression', '2');
        expect(model.get()).toBe('12');
    });

    it('addToExpression subscription appends clause to model expression', function () {
        $.publish('addToExpression', '1+2');
        expect(model.get()).toBe('1+2');
    });

    it('evaluate subscription evaluates and updates expression', function () {
        $.publish('addToExpression', '1+2');
        $.publish('evaluate');
        expect(model.get()).toBe('3');
    });

    it('removeLastFromExpression subscription removes last item from expression', function () {
        $.publish('addToExpression', '1+2');
        $.publish('removeLastFromExpression');
        expect(model.get()).toBe('1+');
        $.publish('removeLastFromExpression');
        expect(model.get()).toBe('1');
    });

});