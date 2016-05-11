/*global myCalculator */
(function (calc) {

    'use strict';

    calc.validator = (function () {

        function arrayIndexInRange(index, length) {
            if (index <= -1 || index >= length) {
                throw new Error('Array index is out of range');
            }
        }

        return {
            arrayIndexInRange: arrayIndexInRange
        };

    }());
}(myCalculator));
