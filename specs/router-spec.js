'use strict';

describe("Router", function() {
    var L;

    beforeEach(function() {
        L = new lettuce();
    });

    it("should be able to different router in page", function() {
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

        expect("/#about/".toString()).toEqual(check["routes"][0]["re"].toString());

        check.flush();
        check.navigate("all.html");
        expect(window.location.href).not.toEqual("file:///all.html");
    });
});
