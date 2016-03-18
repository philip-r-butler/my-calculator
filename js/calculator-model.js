(function (calc, math) {

    'use strict';

    calc.model = (function () {
        var expression = '';

        function addItemToExpression(item) {
            expression += item;
        }

        // function removeLastItemFromExpression() {
        //     expression = expression.substr(0, expression.length - 1);
        // }

        function addNumberToExpression(n) {
            addItemToExpression(n);
        }

        function addOperatorToExpression(op) {
            addItemToExpression(op);
        }

        function setExpression(exp) {
            expression = exp;
        }

        function getExpression() {
            return expression;
        }

        function clearExpression() {
            expression = '';
        }

        function evaluateExpression() {
            return math.eval(getExpression());
        }

        // function add(a, b) {
        //     calc.validator.parametersAreNumbers(a, b);
        //     setExpression(a + '+' + b);
        //     return evaluateExpression(getExpression());
        // }
        //
        // function subtract(a, b) {
        //     calc.validator.parametersAreNumbers(a, b);
        //     setExpression(a + '-' + b);
        //     return evaluateExpression(getExpression());
        // }
        //
        // function multiply(a, b) {
        //     calc.validator.parametersAreNumbers(a, b);
        //     setExpression(a + '*' + b);
        //     return evaluateExpression(getExpression());
        // }
        //
        // function divide(a, b) {
        //     calc.validator.parametersAreNumbers(a, b);
        //     calc.validator.divideByZero(b);
        //     setExpression(a + '/' + b);
        //     return evaluateExpression(getExpression());
        // }


        return {
            setExpression: setExpression,
            getExpression: getExpression,
            evaluateExpression: evaluateExpression,
            addOperatorToExpression: addOperatorToExpression,
            addNumberToExpression: addNumberToExpression,
            clearExpression: clearExpression
        };

    }());
}(myCalculator, myMath));
//(function (calc) {
//
//    'use strict';
//
//    calc.model = (function () {
//
//        function add(a, b) {
//            calc.validator.parametersAreNumbers(a, b);
//            return a + b;
//        }
//
//        function subtract(a, b) {
//            calc.validator.parametersAreNumbers(a, b);
//            return a - b;
//        }
//
//        function multiply(a, b) {
//            calc.validator.parametersAreNumbers(a, b);
//            return a * b;
//        }
//
//        function divide(a, b) {
//            calc.validator.parametersAreNumbers(a, b);
//            calc.validator.divideByZero(b);
//            return a / b;
//        }
//
//        return {
//            add: add,
//            subtract: subtract,
//            multiply: multiply,
//            divide: divide
//        };
//
//    }());
//}(myCalculator));

//function calculator() {
//  var validate = new calculatorValidator();
//  this.add = add;
//  this.subtract = subtract;
//  this.multiply = multiply;
//  this.divide = divide;
//
//  function add(a, b) {
//    validate.parametersAreNumbers(a, b);
//    return a + b;
//  }
//
//  function subtract(a, b) {
//    validate.parametersAreNumbers(a, b);
//    return a - b;
//  }
//
//  function multiply(a, b) {
//    validate.parametersAreNumbers(a, b);
//    return a * b;
//  }
//
//  function divide(a, b) {
//    validate.parametersAreNumbers(a, b);
//    validate.divideByZero(b);
//    return a / b;
//  }
//}


//var calculator = function () {
//};
//
//calculator.prototype.add = function (a, b) {
//  if (a === 0) return b;
//
//  if (b === 0) return a;
//
//  return a + b;
//};
//
//calculator.prototype.subtract = function (a, b) {
//  return a - b;
//};
//
//calculator.prototype.multiply = function (a, b) {
//  if (a === 0 || b === 0) {
//    return 0;
//  }
//  return a * b;
//};
//
//calculator.prototype.divide = function (a, b) {
//  if (b === 0) throw new Error('Attempt to divide by zero');
//  return a / b;
//};
//
