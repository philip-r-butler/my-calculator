/**
 * Created by mtlsspb4 on 02/03/2016.
 */
(function ($, calc) {

    'use strict';

    calc.view = (function () {
        var ui = {
            btnNumber: $('.number'),
            btnOperator: $('.operator'),
            btnEvaluate: $('.equals'),
            btnCancel: $('.cancel'),
            outScreen: $('.screen')
        };

        function getUIElements() {
            return ui;
        }

        function updateScreen(val) {
            ui.outScreen.html(val);
        }

        function getDataValue(obj) {
            return obj.attr('data-val');
        }

        (function init() {
            ui.btnNumber.on('click', function () {
                console.log('button clicked - ' + getDataValue($(this)));
                calc.publisher.publish('addNumber', getDataValue($(this)));
            });

            ui.btnOperator.on('click', function () {
                console.log('button clicked - ' + getDataValue($(this)));
                calc.publisher.publish('addOperator', getDataValue($(this)));
            });
        }());


        return {
            getUIElements: getUIElements,
            updateScreen: updateScreen
        };
    }());
}($, myCalculator));