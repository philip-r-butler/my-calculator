/**
 * Created by mtlsspb4 on 17/03/2016.
 */
describe('calculator controller tests', function () {

    'use strict';

    var controller = {}, publisher = {}, model = {};

    beforeEach(function () {
        controller = myCalculator.controller;
        publisher = myCalculator.publisher;
        model = myCalculator.model;

        setFixtures('<div id="calculator">' +
                '<div class="screen"></div>' +
                '<button class="number" data-value="9">9</button>' +
                '<button class="operator" data-value="+">+</button>' +
                '</div>');
    });

    it('html fixture contains screen', function () {
        expect($('.screen')).toBeInDOM();
    });

    it('html fixture contains number button', function () {
        expect($('button.number')).toBeInDOM();
    });

    it('html fixture contains operator button', function () {
        expect($('button.operator')).toBeInDOM();
    });

    it('controller publishes addNumber adds number to model expression', function () {
        publisher.publish('addNumber', '10');
        expect(model.getExpression()).toBe('10');
        model.clearExpression();
    });

    it('controller publishes addNumber adds number to model expression', function () {
        publisher.publish('addNumber', '10');
        publisher.publish('addNumber', '20');
        expect(model.getExpression()).toBe('1020');
        model.clearExpression();
    });


    // it('controller publishes addNumber adds number to dom screen element', function () {
    //     publisher.publish('addNumber', '10');
    //     console.log($('#calculator'));
    //     // $('.screen').html('test');
    //     // console.log($('#calculator'));
    //    expect($('.screen').html()).toBe('10');
    //     model.clearExpression();
    // });

});