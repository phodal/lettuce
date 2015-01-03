(function(root, undefined) {

  "use strict";


var Lettuce = function() {

};

Lettuce.VERSION = '0.0.1';

//Promise
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

Lettuce.prototype.promise = promise;

root.lettuce = Lettuce;


}(this));
