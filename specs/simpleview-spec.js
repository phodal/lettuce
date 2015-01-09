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

        spyOn(lettuce, "tmpl");
        var why = new Lettuce.SimpleView(data, data.why);
        why.render();
        expect(lettuce.tmpl).toHaveBeenCalled();
    });
});
