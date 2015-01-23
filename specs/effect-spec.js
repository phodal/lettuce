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

    it('should be able fadein elements', function () {
        content = document.createElement('div');
        content.setAttribute("id", elementID);
        document.body.appendChild(content);
        document.getElementById(elementID).style.height = '4px';
        document.getElementById(elementID).style.opacity = 1;

        L.FX.fadeIn(document.getElementById(elementID), {duration: 100, complete: function() {
            var opacity = document.getElementById(elementID).style.opacity;
            expect(opacity).toEqual(0);
        }});
    });

    it('should be able fadeout elements', function () {
        content = document.createElement('div');
        content.setAttribute("id", elementID);
        document.body.appendChild(content);
        document.getElementById(elementID).style.height = '4px';
        document.getElementById(elementID).style.opacity = 0;

        L.FX.fadeOut(document.getElementById(elementID), {duration: 100, complete: function() {
            var opacity = document.getElementById(elementID).style.opacity;
            expect(opacity).toEqual(1);
        }});
    });
});
