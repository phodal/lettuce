'use strict';

describe("Parser", function () {
    var L, Parser;

    beforeEach(function() {
        L = new lettuce();
        Parser = new L.Parser();
    });

    it('it must be a function of Lettuce', function () {
        var called = 0,
            func = function () { called++ };

        Parser.run({
            first: function() {
                func();
            },

            HomePage: function() {
                func();
            },

            AboutPage: function() {
                func();
            },

            last: function() {
                func();
            }
        });

        expect(called).toEqual(4);
    });
});
