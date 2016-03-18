/**
 * Created by mtlsspb4 on 11/03/2016.
 */
describe('calculator publisher tests : ', function () {

    'use strict';

    var getHelloWorld, getGoodByeWorld, publisher;

    beforeEach(function () {
        publisher = myCalculator.publisher;
        publisher.unsubscribeAll();

        getHelloWorld = function () {
            return 'Hello World';
        };

        getGoodByeWorld = function () {
            return 'Goodbye World';
        };
    });

    it('add subscription should increment publisher count by 1', function () {


        expect(publisher.count()).toBe(0);
        publisher.subscribe('hello world', getHelloWorld);
        expect(publisher.count()).toBe(1);
        publisher.subscribe('goodbye world', getGoodByeWorld);
        expect(publisher.count()).toBe(2);
        publisher.unsubscribeAll();
    });

    it('remove subscription should decrement publisher count by 1', function () {

        expect(publisher.count()).toBe(0);
        publisher.subscribe('hello world 1', getHelloWorld);
        publisher.subscribe('hello world 2', getHelloWorld);
        publisher.subscribe('goodbye world 1', getGoodByeWorld);
        publisher.subscribe('goodbye world 2', getGoodByeWorld);
        expect(publisher.count()).toBe(4);
        publisher.unsubscribe('goodbye world 1');
        expect(publisher.count()).toBe(3);
        publisher.unsubscribeAll();
    });

    it('indexOf subscription should return -1 when subscription not found', function () {

        expect(publisher.count()).toBe(0);
        publisher.subscribe('hello world 1', getHelloWorld);
        publisher.subscribe('hello world 2', getHelloWorld);
        expect(publisher.indexOf('goodbye world 1')).toBe(-1);
        publisher.unsubscribeAll();
    });

    it('indexOf subscription should return index when subscription found', function () {

        expect(publisher.count()).toBe(0);
        publisher.subscribe('hello world 1', getHelloWorld);
        expect(publisher.indexOf('hello world 1')).toBe(0);
        publisher.subscribe('hello world 2', getHelloWorld);
        expect(publisher.indexOf('hello world 2')).toBe(1);
        publisher.unsubscribeAll();
    });

    it('publish should execute subscription', function () {

        var o = {};

        function subscription(obj) {
            obj.val = 'hello';
        }

        publisher.subscribe('sub', subscription);
        publisher.publish('sub', o);
        expect(o.val).toBe('hello');
        publisher.unsubscribeAll();

    });
});