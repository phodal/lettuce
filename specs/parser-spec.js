'use strict';

describe("Parser", function () {
    var L, Parser;

    beforeEach(function() {
        L = new lettuce();
        Parser = new L.Parser();
    });

    it('it must be a function ot Lettuce', function () {
        var called = 0,
            func = function () { called++ };

        Parser.run({
            first: function() {
                func();
            },

            bakeCake: function() {
                func();
            },

            bakeBread: function() {
                func();
            },

            last: function() {
                func();
            }
        });
        expect(called).toEqual(4);
    });
});
