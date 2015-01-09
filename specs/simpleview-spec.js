'use strict';

describe("SimpleView", function() {
    var L;

    beforeEach(function() {
        L = new lettuce();
    });

    it("should be able to see view", function() {
        var data = {
            why: "this is why"
        };
        var why = new L.SimpleView(data, data.why);

    });
});
