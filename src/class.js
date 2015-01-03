/**
 * Lettuce Class 0.0.1
 * JavaScript Class built-in inheritance system
 *
 * MIT Licensed.
 * (c) 2015, Fengda Huang - http://www.phodal.com
 *
 * Inspired by https://github.com/munro/self, https://github.com/jneen/pjs
 */

var objectCreate;

if (typeof Object.create === 'function') {
    objectCreate = Object.create;
} else {
    objectCreate = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

function Class(Parent) {
    var obj;

    if (this instanceof Class) {
        obj = this;
    } else {
        obj = objectCreate(Class.prototype);
    }

    obj.class = Class;
    obj.super = Parent.prototype;

    return obj;
}

Lettuce.prototype.Class = Class;
