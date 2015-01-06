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

        var document = {
            getElementById: function(a) {
                return this;
            },

            innerHTML : function (){
                return this;
            }
        };

     //   spyOn(document, "getElementById");
     //   spyOn(document, "innerHTML").and.returnValue("");
     //   var header = L.tmpl.load("head");
     //   expect(document.getElementById).toHaveBeenCalled();
    });
});
