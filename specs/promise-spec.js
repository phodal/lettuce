'use strict';

describe("Promise", function() {
    var L;

    beforeEach(function() {
        L = new lettuce();
    });

    it("should be use promise patterns", function(done) {
        function late(n) {
            var L = new lettuce();
            var p = new L.Promise();
            return p;
        }

        late(100).then(
            function(err, n) {
                return late(n + 200);
            }
        ).then(
            function(err, n) {
                return late(n + 300);
            }
        ).then(
            done()
        ).done();
        done();
    });

});
