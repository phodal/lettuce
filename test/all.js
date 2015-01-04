QUnit.test("test for promise then", function (assert) {
    assert.expect(2);

    var done = assert.async();
    var done2 = assert.async();

    function late(n) {
        var L = new lettuce();
        var p = new L.Promise();
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
