'use strict';

describe("Effect", function () {
    var L, content, height, elementID = "content";

    beforeEach(function () {
        L = new lettuce();
        jasmine.clock().uninstall();
        jasmine.clock().install();
    });

    it('should be able fadein elements', function () {
        content = document.createElement('div');
        content.setAttribute("id", elementID);
        document.body.appendChild(content);
        document.getElementById(elementID).style.height = '4px';
        document.getElementById(elementID).style.opacity = 1;

        L.FX.fadeIn(document.getElementById(elementID), {
            duration: 2000, complete: function () {
            }
        });

        jasmine.clock().tick(2000);
        var opacity = document.getElementById(elementID).style.opacity;
        opacity = Math.round(opacity);
        expect(opacity).toEqual(0);
    });

    it('should be able fadeout elements', function () {
        content = document.createElement('div');
        content.setAttribute("id", elementID);
        document.body.appendChild(content);
        document.getElementById(elementID).style.height = '4px';
        document.getElementById(elementID).style.opacity = 0;

        L.FX.fadeOut(document.getElementById(elementID), {
            duration: 2000, complete: function () {
            }
        });

        jasmine.clock().tick(2000);
        var opacity = document.getElementById(elementID).style.opacity;
        opacity = Math.round(opacity);
        expect(opacity).toEqual(1);
    });

    describe(" Animation", function(){
        it('should return progress equal 1', function () {
            var to = 2, progress, that = this;
            var options = {
                duration: 0.2, complete: function () {
                }
            };
            var element = document.createElement('div');
            element.setAttribute("id", elementID);
            document.body.appendChild(content);
            document.getElementById(elementID).style.height = '4px';
            document.getElementById(elementID).style.opacity = 0;

            L.FX.animate({
                duration: options.duration,
                delta: function (progress) {
                    progress = this.progress;
                    var prog = L.FX.easing.linear(progress);
                    return prog;
                },
                complete: options.complete,
                step: function (delta) {
                    element.style.opacity = to - delta;
                }
            });
        });
    });

    describe("Effect Easing", function () {
        it('linear: should return it self', function () {
            var origin = 1, now;
            now = L.FX.easing.linear(origin);
            expect(now).toEqual(1);
        });

        it('quadratic: should return it self', function () {
            var origin = 2, now;
            now = L.FX.easing.quadratic(origin);
            expect(now).toEqual(4);
        });

        it('circ: should return it self', function () {
            var origin = 1.0, now;
            now = L.FX.easing.circ(origin);
            expect(now).toEqual(1);
        });

        it('back: should return it self', function () {
            var origin = 2, now;
            now = L.FX.easing.back(origin, origin);
            expect(now).toEqual(16);
        });

        it('bounce: should return it self', function () {
            var origin = 2, now;
            now = L.FX.easing.bounce(origin);
            expect(now).toEqual(-6.5625);
        });

        it('elastic: should return it self', function () {
            var origin = 2, now;
            now = L.FX.easing.elastic(origin, origin);
            now = Math.round(now);
            expect(now).toEqual(-512);
        });
    });
});
