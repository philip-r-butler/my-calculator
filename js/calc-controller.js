/*global jQuery, myCalculator, myMath */
(function (jq, calc) {

    'use strict';
    calc.api = {};

    calc.api.history = (function (history, view) {
        return {
            appendTo: function (exp, val) {
                console.log('append to history (' + exp + '=' + val);
                history.appendTo(exp, val);
            },
            clear: function () {
                console.log('history cleared');
                history.clear();
            },
            changed: function () {
                console.log('history changed');
                if (history.length() < 1) {
                    view.clearHistory();
                } else {
                    view.updateHistory(history.getLast());
                }
            }
        };
    }(calc.model.history, calc.view));

    calc.api.memory = (function (memory, expression, view) {
        return {
            save: function () {
                var val;

                val = expression.get();
                console.log('save to memory (' + val + ')');
                memory.set(val);
            },
            addTo: function () {
                var val;

                val = expression.get();

                console.log('add to memory (' + val + ')');
                memory.addTo(val);
            },
            subtractFrom: function () {
                var val;

                val = expression.get();

                console.log('subtract from memory (' + val + ')');
                memory.subtractFrom(val);
            },
            recall: function () {
                console.log('memory recalled');
                expression.set(memory.get());
            },
            clear: function () {
                console.log('clear memory');
                memory.clear();
            },
            changed: function () {
                view.updateMemory(memory.get());
            }
        };
    }(calc.model.memory, calc.model.expression, calc.view));

    calc.api.parameter = (function (parameters, view) {
        return {
            set: function (name, val) {
                parameters.set(name, val);
            },
            get: function (name) {
                return parameters.get(name);
            },
            delete: function (name) {
                parameters.delete(name);
            },
            changed: function () {
                view.updateX(parameters.get('x'));
                view.updateY(parameters.get('y'));
            }
        };
    }(calc.model.parameters, calc.view));

    calc.api.expression = (function (expression, history, view) {
        return {
            appendTo: function (val) {
                console.log('append to expression (' + val + ')');
                expression.appendTo(val);
                return calc.api.expression;
            },
            prependTo: function (val) {
                console.log('prepend to expression (' + val + ')');
                expression.prependTo(val);
                return calc.api.expression;
            },
            wrapInBrackets: function () {
                console.log('wrap in brackets');
                expression.wrap('(', ')');
                return calc.api.expression;
            },
            removeLast: function () {
                console.log('remove last from expression');
                expression.removeLast();
                return calc.api.expression;
            },
            removeFirst: function () {
                console.log('remove first from expression');
                expression.removeFirst();
                return calc.api.expression;
            },
            evaluate: function () {
                var exp, result;

                exp    = expression.get();
                result = expression.evaluate();

                console.log('evaluate expression (' + exp + '=' + result + ')');
                history.appendTo(exp, result);
                expression.set(result);
                return calc.api.expression;
            },
            changed: function () {
                console.log('expression changed (' + expression.get() + ')');
                view.updateScreen(expression.get());
            },
            clear: function () {
                console.log('clear expression');
                expression.clear();
                return calc.api.expression;
            },
            indexOf: function (val) {
                return expression.indexOf(val);
            },
            get: function () {
                return expression.get();
            },
            format: function () {
                return expression.format(expression.get());
            },
            isInteger: function () {
                if (Number.isInteger(Number(expression.get()))) {
                    return true;
                }
                return false;
            }
        };

    }(calc.model.expression, calc.model.history, calc.view));

    /*bind buttons*/
    (function (view) {
        var o, doc, buttons, button;

        function eventHandler(event) {
            /*jshint validthis:true */
            event.data.callback(jq(this).attr('data-val'));
        }

        doc     = jq(document);
        buttons = view.getButtons();

        for (o in buttons) {
            if (buttons.hasOwnProperty(o)) {
                button = buttons[o];
                doc.on('click', button.selector, {callback: button.callback}, eventHandler);
            }
        }

    }(calc.view));

    /*bind keys*/
    (function () {
        var doc;

        doc = jq(document);

        doc.keypress(function (event) {
            var keyCode = event.which,
                chr     = String.fromCharCode(keyCode);
            console.log('key pressed - ' + chr + '(' + keyCode + ')');
            if (chr.match(/[\d\.+-\/*]/)) {
                calc.api.expression.appendTo(chr);
            }
            if (chr.match(/[=\r\n ]/)) {
                calc.api.expression.evaluate();
            }
            if (chr.match(/[Cc]/)) {
                calc.api.expression.clear();
            }
            event.preventDefault();
            event.stopPropagation();
        });

        doc.keyup(function (event) {
            var keyCode = event.which,
                chr     = String.fromCharCode(keyCode);
            console.log('key pressed - ' + chr + '(' + keyCode + ')');

            if (chr.match(/[\u0008]/)) {
                calc.api.expression.removeLast();
            }
            event.preventDefault();
            event.stopPropagation();
        });

    }());

}(jQuery, myCalculator));