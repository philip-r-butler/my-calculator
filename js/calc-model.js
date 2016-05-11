/*global jQuery, myCalculator, myMath */
(function (calc, math) {

    'use strict';

    math.import({
        ln: function (val) {
            return math.log(val, math.e);
        }
    });

    calc.model = {};

    calc.model.parameters = (function () {
        var params                 = {},
            notifyParameterChanged = function (name) {
                calc.api.parameter.changed(name);
            },
            addParameter           = function (name, val) {
                params[name] = val;
                notifyParameterChanged(name);
            },
            deleteParameter        = function (name) {
                delete params[name];
                notifyParameterChanged(name);
            },
            getParameter           = function (name) {
                console.log(name + '=' + params[name]);
                return params[name];
            },
            getParameters          = function () {
                return params;
            };

        return {
            set: addParameter,
            get: getParameter,
            getAll: getParameters,
            delete: deleteParameter
        };
    }());

    calc.model.history = (function () {
        var history              = [],
            notifyHistoryChanged = function () {
                calc.api.history.changed();
            },
            appendToHistory      = function (exp, val) {
                history.push({
                    expression: exp,
                    result: val
                });
                notifyHistoryChanged();
            },
            clearHistory         = function () {
                history.length = 0;
                notifyHistoryChanged();
            },
            getHistory           = function () {
                return history;
            },
            getHistoryLength     = function () {
                return history.length;
            },
            getLastHistory       = function () {
                return history[history.length - 1];
            };

        return {
            appendTo: appendToHistory,
            get: getHistory,
            length: getHistoryLength,
            getLast: getLastHistory,
            clear: clearHistory
        };
    }());

    calc.model.memory = (function () {
        var memory             = '',
            notifyMemoryChange = function () {
                calc.api.memory.changed();
            },
            setMemory          = function (val) {
                memory = val.toString();
                notifyMemoryChange();
            },
            getMemory          = function () {
                return memory;
            },
            addToMemory        = function (val) {
                if (memory !== '') {
                    memory = memory + '+' + val.toString();
                    notifyMemoryChange();
                } else {
                    setMemory(val);
                }
            },
            subtractFromMemory = function (val) {
                memory = memory + '-' + val.toString();
                notifyMemoryChange();
            },
            clearMemory        = function () {
                memory = '';
                notifyMemoryChange();
            };

        return {
            set: setMemory,
            get: getMemory,
            addTo: addToMemory,
            subtractFrom: subtractFromMemory,
            clear: clearMemory
        };
    }());

    calc.model.expression = (function (parameters) {
        var expression                    = '',
            notifyExpressionChange        = function () {
                calc.api.expression.changed();
            },
            setExpression                 = function (exp) {
                expression = exp.toString();
                notifyExpressionChange();
            },
            getExpression                 = function () {
                return expression;
            },
            indexOfExpression             = function (val) {
                return expression.indexOf(val);
            },
            clearExpression               = function () {
                expression = '';
                notifyExpressionChange();
            },
            prependToExpression           = function (item) {
                expression = item + expression;
                notifyExpressionChange();
            },
            appendToExpression            = function (item) {
                expression += item;
                notifyExpressionChange();
            },
            removeLastItemFromExpression  = function () {
                expression = expression.substr(0, expression.length - 1);
                notifyExpressionChange();
            },
            removeFirstItemFromExpression = function () {
                expression = expression.substr(1, expression.length);
                notifyExpressionChange();
            },
            wrapExpression                = function (left, right) {
                expression = left + expression + right;
                notifyExpressionChange();
            },
            formatNumber                  = function (val) {
                var options;
                options = {
                    precision: 16,
                    exponential: {
                        lower: 1e-10,
                        upper: 1e+10
                    }
                };
                return math.bignumber(math.format(val, options));
            },
            evaluateExpression            = function () {
                var result;
                try {
                    result = formatNumber(math.eval(getExpression(), parameters.getAll()));
                    return result;
                } catch (error) {
                    console.log('Error ' + error);
                    return getExpression();
                }
            };

        return {
            set: setExpression,
            get: getExpression,
            indexOf: indexOfExpression,
            clear: clearExpression,
            evaluate: evaluateExpression,
            appendTo: appendToExpression,
            prependTo: prependToExpression,
            removeFirst: removeFirstItemFromExpression,
            removeLast: removeLastItemFromExpression,
            wrap: wrapExpression
        };

    }(calc.model.parameters));

}(myCalculator, myMath));

