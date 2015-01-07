'use strict';

describe("Event", function() {
    var L;

    beforeEach(function() {
        L = new lettuce();
    });

    it("should be use promise patterns", function() {
        expect('function').toEqual(typeof L.Event.on);
        expect('function').toEqual(typeof L.Event.off);
        expect('function').toEqual(typeof L.Event.trigger);
    });

    it('should trigger ping event 3 times',  function () {
        var called = 0,
            f1 = function () { called++ };

        L.Event.on('ping', f1);
        L.Event.trigger('ping');
        L.Event.trigger('ping');
        L.Event.trigger('ping');
        expect(called).toEqual(3);
    });

    it('should find ping call 0 times when off events',  function () {
        var called = 0,
            f1 = function () { called++ };

        L.Event.on('ping', f1);
        L.Event.off('ping');
        L.Event.trigger('ping');
        expect(called).toEqual(0);
    });

    it('should no return when off or trigger something no exists',  function () {
        var called = 0,
            f1 = function () { called++ };

        L.Event.on('ping', f1);
        L.Event.off('something');
        L.Event.trigger('something');
        expect(called).toEqual(0);
    });

});
