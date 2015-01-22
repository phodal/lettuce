'use strict';

describe("Effect", function () {
    var L, content, height,elementID = "content";

    beforeEach(function () {
        L = new lettuce();
        jasmine.clock().install();
    });

    it('should able slide down content', function () {
        content = document.createElement('div');
        content.setAttribute("id", elementID);
        document.body.appendChild(content);
        document.getElementById(elementID).style.height = '4px';

        L.Effect.slideDown(document.getElementById(elementID), 10 ,400);
        height = document.getElementById(elementID).style.height;
        jasmine.clock().tick(1000);
        expect(height).toEqual('400px');
    });

});
