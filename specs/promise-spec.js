'use strict';

describe("Promise", function() {
    var L;

    beforeEach(function() {
        L = new lettuce();
    });

    it("should be use promise patterns", function() {
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
            function(err, n){
                //equal(n).to(600);
                //done();
            }
        ).done();
    });

});
