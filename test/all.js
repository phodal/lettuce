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

QUnit.test("test for router", function (assert) {
    var L = new lettuce();
    L.Router.config({mode: 'history'});

    var check = L.Router
        .add(/#about/, function () {
        })
        .check('/products/12/edit/22').listen();

    equal("/#about/", check["routes"][0]["re"])
});

QUnit.test("test for template", function (assert) {
    var L = new lettuce();
    var data = {
        "title": "JavaScript Templates"
    };

    var result = L.tmpl("<h3>{%=o.title%}</h3>", data);

    equal("<h3>JavaScript Templates</h3>", result)
});
