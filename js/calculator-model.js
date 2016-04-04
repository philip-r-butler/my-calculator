/*global jQuery, myCalculator, myMath */
(function (jq, calc, math) {

    'use strict';

    calc.model = (function () {
        var expression = '';

        function notifyExpressionChange() {
            jq.publish('expressionChanged');
        }

        function setExpression(exp) {
            expression = exp.toString();
            notifyExpressionChange();
        }

        function getExpression() {
            return expression;
        }

        function clearExpression() {
            expression = '';
            notifyExpressionChange();
        }

        function addItemToExpression(item) {
            expression += item;
            notifyExpressionChange();
        }

        function removeLastItemFromExpression() {
            expression = expression.substr(0, expression.length - 1);
            notifyExpressionChange();
        }

        function evaluateExpression() {
            return math.eval(getExpression());
        }

        return {
            setExpression: setExpression,
            getExpression: getExpression,
            clearExpression: clearExpression,
            evaluateExpression: evaluateExpression,
            addItemToExpression: addItemToExpression,
            removeLastItemFromExpression: removeLastItemFromExpression
        };

    }());

}(jQuery, myCalculator, myMath));

