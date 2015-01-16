'use strict';

describe("Helper", function () {
    var l = lettuce;

    it("should be a object", function () {
        expect(l.isObject([])).toEqual(true);
        expect(l.isObject([{}])).toEqual(true);
    });

    describe("Extend", function () {
        it("should be able to extend object", function () {
            expect(l.extend({one: 1}, {two: 2})).toEqual({one: 1, two: 2});
            expect(l.extend({two: 1}, {two: 2})).toEqual({two: 2});
        });

        it("should be unable to extend object when no a object", function () {
            var results = l.extend("", {two: 2});
            expect(results).toEqual("");
        });
    });

    describe("Defaults", function () {
        it("should be return variable when same key", function () {
            var origin = {one: 1};
            var new_object = {one: 2};
            l.defaults(origin, new_object);
            expect(origin).toEqual({one: 1});
        });

        it("should return empty string when defaults is empty string", function () {
            var emptyString = "";
            var defaults = {two: 2};
            l.defaults(emptyString, defaults);
            expect(emptyString).toEqual("");
        });

        it("should return defaults when defaults is empty object", function () {
            var empty = {};
            var defaults = {two: 2};
            l.defaults(empty, defaults);
            expect(empty).toEqual({two: 2});
        });
    });

});
