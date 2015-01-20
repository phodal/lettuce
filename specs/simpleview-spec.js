'use strict';

describe("SimpleView", function() {
    var Lettuce;

    beforeEach(function() {
        Lettuce = new lettuce();
        var element = document.createElement('div');
        element.id = "results";
        document.body.appendChild(element);
    });

    it("should be able to see view", function() {
        var data = {
            why: "this is why"
        };

        spyOn(Lettuce.Template, "tmpl");
        var why = new Lettuce.SimpleView();
        var templates = Lettuce.Template.tmpl("<h3>{%=o.why%}</h3>", data);
        why.render(templates, "results");
        expect(Lettuce.Template.tmpl).toHaveBeenCalled();
    });
});
