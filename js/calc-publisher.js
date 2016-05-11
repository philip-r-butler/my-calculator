/**
 * Created by mtlsspb4 on 10/03/2016.
 */
(function (calc) {

    'use strict';

    calc.publisher = (function () {

        var subscriptions = [];

        function count() {
            return subscriptions.length;
        }

        function indexOf(name) {
            var i, len = count();

            for (i = 0; i < len; i += 1) {
                if (subscriptions[i].name === name) {
                    return i;
                }
            }

            return -1;
        }

        function publish(name, args) {
            subscriptions[indexOf(name)].func(args);
        }

        function subscribe(name, func) {

            subscriptions.push({
                name: name,
                func: func
            });
        }

        function unsubscribe(name) {
            subscriptions.splice(indexOf(name), 1);
        }

        function unsubscribeAll() {
            subscriptions.length = 0;
        }

        return {
            publish: publish,
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            unsubscribeAll: unsubscribeAll,
            count: count,
            indexOf: indexOf
        };
    }());

}(myCalculator));