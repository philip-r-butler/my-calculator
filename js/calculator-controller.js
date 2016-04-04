/*global jQuery, myCalculator */
(function (jq, calc) {

    'use strict';

    calc.events = (function (model, view) {
        function getEvents() {
            return {
                addToExpression: function (event, val) {
                    console.log('add to expression - ' + val);
                    model.addItemToExpression(val);
                },
                removeLastFromExpression: function () {
                    console.log('remove last from expression');
                    model.removeLastItemFromExpression();
                },
                evaluateExpression: function () {
                    console.log('evaluate expression');
                    model.setExpression(model.evaluateExpression());
                },
                expressionChanged: function () {
                    console.log('expression changed');
                    view.updateScreen(model.getExpression());
                }
            };
        }

        function init() {
            var o, subscriptions;

            subscriptions = getEvents();

            for (o in subscriptions) {
                if (subscriptions.hasOwnProperty(o)) {
                    jq.subscribe(o, subscriptions[o]);
                }
            }
        }

        return {
            init: init
        };
    }(calc.model, calc.view));

    calc.buttons = (function (view) {
        function init() {
            var ui = view.getUIElements();

            ui.btnItem.on('click', function (event) {
                jq.publish('addToExpression', jq(event.target).attr('data-val'));
            });

            ui.btnEvaluate.on('click', function () {
                jq.publish('evaluateExpression');
            });

            ui.btnRemove.on('click', function () {
                jq.publish('removeLastFromExpression');
            });
        }

        return {
            init: init
        };
    }(calc.view));

    calc.keys = (function () {
        function init() {
            jq(document).keypress(function (event) {
                var keyCode = event.which, chr = String.fromCharCode(keyCode);
                console.log('key pressed - ' + chr + '(' + keyCode + ')');
                if (chr.match(/[\d\.+-\/*]/)) {
                    jq.publish('addToExpression', chr);
                }
                if (chr.match(/[=\r\n ]/)) {
                    jq.publish('evaluateExpression');
                }
                if (chr.match(/[Cc]/)) {
                    jq.publish('removeLastFromExpression');
                }
            });
        }

        return {
            init: init
        };
    }());

    calc.controller = (function () {

        (function init() {

            calc.events.init();
            calc.buttons.init();
            calc.keys.init();

        }());


        return {};

    }());

}(jQuery, myCalculator));