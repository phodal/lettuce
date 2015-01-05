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
            .check('/products/12/edit/22').listen();

        expect("/#about/".toString()).toEqual(check["routes"][0]["re"].toString());

        check.navigate("all.html");
        expect(window.location.href).toEqual("file:///all.html");
    });
});
