'use strict';

describe("Helper", function () {
    var L;

    beforeEach(function () {
        L = new lettuce();
    });

    it("should be a object", function () {
        expect(lettuce.isObject([])).toEqual(true);
        expect(lettuce.isObject([{}])).toEqual(true);
    });

    describe("Extend", function () {
        it("should be able to extend object", function () {
	        var results = lettuce.extend({one: 1}, {two: 2});
            expect(results).toEqual({ one: 1, two: 2 });
        });

        it("should be unable to extend object when no a object", function () {
            var results = lettuce.extend("", { two: 2 } );
            expect(results).toEqual("");
        });
    });
});
