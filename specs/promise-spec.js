'use strict';

describe("Promise", function () {
    var L;

    beforeEach(function () {
        L = new lettuce();
        jasmine.clock().install();
    });

    it("should be use promise patterns", function () {
        function late(n) {
            var p = new L.Promise();
            setTimeout(function() {
                p.done(null, n);
            }, n);
            return p;
        }

        late(10).then(
            function (err, n) {
                expect(n).toEqual(10);
                return late(n + 200);
            }
        ).done();
    });
});
