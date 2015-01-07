'use strict';

describe("Class", function() {
    var L;

    beforeEach(function() {
        L = new lettuce();
    });

    it("should be able to see class parent class", function() {
        var zero = function(){};
        var sub = new L.Class(zero);
        expect(sub.class).toEqual(L.Class);
    });
});
