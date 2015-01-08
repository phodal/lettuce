'use strict';

describe("Helper", function () {
    var l = lettuce;

    it("should be a object", function () {
        expect(l.isObject([])).toEqual(true);
        expect(l.isObject([{}])).toEqual(true);
    });

    describe("Extend", function () {
        it("should be able to extend object", function () {
            expect(l.extend({one: 1}, {two: 2})).toEqual({ one: 1, two: 2 });
            expect(l.extend({two: 1}, {two: 2})).toEqual({two: 2 });
        });

        it("should be unable to extend object when no a object", function () {
            var results = l.extend("", { two: 2 });
            expect(results).toEqual("");
        });
    });
});
