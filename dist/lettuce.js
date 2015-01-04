(function(root, undefined) {

  "use strict";


var Lettuce = function() {

};

Lettuce.VERSION = '0.0.1';

root.lettuce = Lettuce;


//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

Lettuce.isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};


Lettuce.extend = function (obj) {
    console.log(obj);
    if (!Lettuce.isObject(obj)) {
        return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        console.log(source);
        for (prop in source) {
            if (hasOwnProperty.call(source, prop)) {
                obj[prop] = source[prop];
            }
        }
    }
    return obj;
};


/*
 *  Copyright 2012-2013 (c) Pierre Duquesne <stackp@online.fr>
 *  Licensed under the New BSD License.
 *  https://github.com/stackp/promisejs
 */

function Promise() {
    this._callbacks = [];
}

Promise.prototype.then = function(func, context) {
    var p;
    if (this._isdone) {
        p = func.apply(context, this.result);
    } else {
        p = new Promise();
        this._callbacks.push(function () {
            var res = func.apply(context, arguments);
            if (res && typeof res.then === 'function') {
                res.then(p.done, p);
            }
        });
    }
    return p;
};

Promise.prototype.done = function() {
    this.result = arguments;
    this._isdone = true;
    for (var i = 0; i < this._callbacks.length; i++) {
        this._callbacks[i].apply(null, arguments);
    }
    this._callbacks = [];
};

function chain (funcs, args) {
    var p = new Promise();
    if (funcs.length === 0) {
        p.done.apply(p, args);
    } else {
        funcs[0].apply(null, args).then(function() {
            funcs.splice(0, 1);
            chain(funcs, arguments).then(function() {
                p.done.apply(p, arguments);
            });
        });
    }
    return p;
}

var promise = {
    Promise: Promise,
    chain: chain
};

Lettuce.prototype = Lettuce.extend(Lettuce.prototype, promise);


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


}(this));
