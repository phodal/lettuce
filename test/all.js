QUnit.test("the base function exists", function(assert) {
    var done = assert.async();

    function late(n) {
        console.log(n);
        var L = new lettuce();
        var p = new L.promise.Promise();
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
        function(err, n) {
            return late(n + 400);
        }
    ).then(
        callback
    );

    function callback(err, n){
        console.log(n);
        if(n === 1000) {
            done();
        }
    }
    //
    //ok(lettuce);
});
