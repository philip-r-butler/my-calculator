/*global jQuery, myCalculator */
(function (jq, calc) {

    'use strict';

    calc.view = (function () {
        var ui = {
            btnItem: jq('button.number, button.operator'),
            btnEvaluate: jq('button.evaluate'),
            btnRemove: jq('button.remove'),
            outScreen: jq('div.screen')
        };

        function getUIElements() {
            return ui;
        }

        function updateScreen(val) {
            ui.outScreen.html(val);
        }

        return {
            getUIElements: getUIElements,
            updateScreen: updateScreen
        };
    }());
}(jQuery, myCalculator));