QUnit.test("test for promise then", function (assert) {
    assert.expect(2);

    var done = assert.async();
    var done2 = assert.async();

    function late(n) {
        console.log(n);
        var L = new lettuce();
        var p = new L.promise.Promise();
        return p;
    }

    late(100).then(
        assert.ok(true, "test promise then 1"),
        done()
    ).then(
        assert.ok(true, "test promise then 2"),
        done2()
    )
});
