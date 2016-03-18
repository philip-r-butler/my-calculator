(function (calc) {

    'use strict';

    calc.validator = (function () {

        function divideByZero(a) {
            if (a === 0) {
                throw new Error('Attempt to divide by zero');
            }
        }

        function parametersAreNumbers(a, b) {
            if (typeof a !== 'number') {
                throw new Error('First parameter is not a number');
            }
            if (typeof b !== 'number') {
                throw new Error('Second parameter is not a number');
            }
        }

        function arrayIndexInRange(index, length) {
            if (index <= -1 || index >= length) {
                throw new Error('Array index is out of range');
            }
        }

        return {
            divideByZero: divideByZero,
            parametersAreNumbers: parametersAreNumbers,
            arrayIndexInRange: arrayIndexInRange
        };

    }());
}(myCalculator));

//(function (calc) {
//
//    'use strict';
//
//    calc.calculatorValidator = (function () {
//
//        function divideByZero(a) {
//            if (a === 0) {
//                throw new Error('Attempt to divide by zero');
//            }
//        }
//
//        function parametersAreNumbers(a, b) {
//            if (typeof a !== 'number') {
//                throw new Error('First parameter is not a number');
//            }
//            if (typeof b !== 'number') {
//                throw new Error('Second parameter is not a number');
//            }
//        }
//
//        return {
//            divideByZero: divideByZero,
//            parametersAreNumbers: parametersAreNumbers
//        };
//
//    }());
//}(myCalculator));

//function calculatorValidator() {
//  this.divideByZero = function (a) {
//    if (a === 0) {
//      throw new Error('Attempt to divide by zero');
//    }
//  };
//  this.parametersAreNumbers = function (a, b) {
//    if (typeof a !== 'number') {
//      throw new Error('First parameter is not a number');
//    }
//    if (typeof b !== 'number') {
//      throw new Error('Second parameter is not a number');
//    }
//  };
//}
