'use strict';

describe("Template", function() {
    var L;

    beforeEach(function() {
        L = new lettuce();
    });

    it("should be able render page", function() {
        var data = {
            "title": "JavaScript Templates"
        };

        var result = L.tmpl("<h3>{%=o.title%}</h3>\n!@#$%^&*()-=", data);
        expect("<h3>JavaScript Templates</h3>\n!@#$%^&*()-=").toEqual(result);

        var result = L.tmpl("\n!@#$%^&*()-=_+{}[]\|:;/.,{", data);
        expect("\n!@#$%^&*()-=_+{}[]\|:;/.,{").toEqual(result);
    });
    //
    it("should be call innerHTml", function() {
        var getElementById = {
            innerHTML:""
        };
        //var dummyElement = document.createElement('div');
        getElementById.innerHTML = jasmine.createSpy('HTML Element');
        ////document.getElementById.innerHTML = dummyElement ;

        var document = jasmine.createSpy('spy');
        var document = {
            getElementById: getElementById.innerHTML
        };

        document.getElementById("head");
        //L.tmpl.load("head");
        expect(document.getElementById).toHaveBeenCalledWith("head");
    });
});
