/**
 * Created by mtlsspb4 on 02/03/2016.
 */
(function (calc) {

    'use strict';

    calc.controller = (function (model, view, publisher) {

        publisher.subscribe('addNumber', function (num) {
            model.addNumberToExpression(num);
            view.updateScreen(model.getExpression());
        });

        publisher.subscribe('addOperator', function (num) {
            model.addOperatorToExpression(num);
            view.updateScreen(model.getExpression());
        });

        //view.getUIElements.btnOperator.on('click', function () {
        //    publisher.publish('Operator selected');
        //});
        //
        //view.getUIElements.btnEvaluate.on('click', function () {
        //    publisher.publish('Evaluate selected');
        //});
        //
        //view.getUIElements.btnCancel.on('click', function () {
        //    publisher.publish('Cancel selected');
        //});


        return {};
    }(calc.model, calc.view, calc.publisher));

}(myCalculator));