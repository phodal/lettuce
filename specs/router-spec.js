'use strict';

describe("Router", function() {
    var L;

    beforeEach(function() {
        L = new lettuce();
        jasmine.clock().install();
    });

    it("should be able to different router in page", function() {
        var log = function(){

        };

        var check = L.Router
            .add(/#about/,log)
            .add(/#what/, log)
            .add(/#why/, log)
            .load();

        expect("/#about/".toString()).toEqual(check["routes"][0]["re"].toString());

        check.navigate("all.html");
        expect(window.location.href).not.toEqual("file:///all.html");
    });

    it("should be able to different router in page", function() {
        var log = function(result){
        };

        L.Router.navigate("/");
        var url = window.location.href;
        var router = L.Router
            .add(/#about/,log)
            .add(/#what/, log)
            .load();

        router.navigate("what/");

        router.navigate("about/");
        expect(window.location.href).toEqual(url.replace("#", "#about"));

        router.navigate("why/");
        expect(window.location.href).toEqual(url.replace("#", "#why"));
    });

    it("should be able to call router check", function() {
        var log = jasmine.createSpy('log');
        var somefunc = jasmine.createSpy('somefunc');
        var some = function (){};

        L.Router.navigate("/");
        var url = window.location.href;
        var router = L.Router
            .add(/#about/,log)
            .add(/#what/, log)
            .add(some, somefunc)
            .load();

        jasmine.clock().tick(101);

        router.check('about', router);
        expect(log).toHaveBeenCalled();

        jasmine.clock().tick(101);
        router.check('sp,e', router);
        expect(somefunc).not.toHaveBeenCalled();
    });
});
