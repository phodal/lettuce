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
    ).done();
});

QUnit.test("test for Create Class", function (assert) {
    var L = new lettuce();
    var zero = function(){};
    var sub = new L.Class(zero);

    equal(sub.class, L.Class);
});

QUnit.test("test for router", function (assert) {
    var L = new lettuce();
    L.Router.config({mode: 'history'});

    var check = L.Router
        .add(/#about/, function () {
        })
        .add({}, function () {
        })
        .add(/#remove/, function () {
        })
        .remove(/#remove/)
        .check('/products/12/edit/22').listen();

    equal("/#about/", check["routes"][0]["re"]);

    check.flush();
    check.navigate("all.html");
    notEqual(window.location.href, "file:///all.html");
});

QUnit.test("test for template", function (assert) {
    var L = new lettuce();
    var data = {
        "title": "JavaScript Templates"
    };

    var result = L.tmpl("<h3>{%=o.title%}</h3>\n!@#$%^&*()-=", data);
    equal("<h3>JavaScript Templates</h3>\n!@#$%^&*()-=", result);

    var result = L.tmpl("\n!@#$%^&*()-=_+{}[]\|:;/.,{", data);
    equal("\n!@#$%^&*()-=_+{}[]\|:;/.,{", result);

    var header = L.tmpl.load("qunit-header");
    equal(header, "QUnit Example");

});

QUnit.test("test for template", function (assert) {
    assert.expect(1);
    var done = assert.async();

    lettuce.get('/bower.json',[], function(result){
        equal(result["name"], "lettuce");
        done();
    })
});
