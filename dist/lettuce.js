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
    if (!Lettuce.isObject(obj)) {
        return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
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


Lettuce.get = function (url, callback) {
    Lettuce.send(url, 'GET', callback);
};

Lettuce.post = function (url, params, callback) {
    Lettuce.send(url, 'POST', callback);
};

Lettuce.send = function (url, method, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
            callback(request.responseText);
        }
    };
    request.open(method, url, true);
    request.send(null);
};


/*
 * JavaScript Templates 2.4.1
 * https://github.com/blueimp/JavaScript-Templates
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Inspired by John Resig's JavaScript Micro-Templating:
 * http://ejohn.org/blog/javascript-micro-templating/
 */

/*jslint evil: true, regexp: true, unparam: true */
/*global document */

var tmpl = function (str, data) {
    var f = !/[^\w\-\.:]/.test(str) ? tmpl.cache[str] = tmpl.cache[str] ||
    tmpl(tmpl.load(str)) :
        new Function(
            tmpl.arg + ',tmpl',
            "var _e=tmpl.encode" + tmpl.helper + ",_s='" +
            str.replace(tmpl.regexp, tmpl.func) +
            "';return _s;"
        );
    return data ? f(data, tmpl) : function (data) {
        return f(data, tmpl);
    };
};
tmpl.cache = {};
tmpl.load = function (id) {
    return document.getElementById(id).innerHTML;
};
tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;
tmpl.func = function (s, p1, p2, p3, p4, p5) {
    if (p1) { // whitespace, quote and backspace in HTML context
        return {
                "\n": "\\n",
                "\r": "\\r",
                "\t": "\\t",
                " " : " "
            }[p1] || "\\" + p1;
    }
    if (p2) { // interpolation: {%=prop%}, or unescaped: {%#prop%}
        if (p2 === "=") {
            return "'+_e(" + p3 + ")+'";
        }
        return "'+(" + p3 + "==null?'':" + p3 + ")+'";
    }
    if (p4) { // evaluation start tag: {%
        return "';";
    }
    if (p5) { // evaluation end tag: %}
        return "_s+='";
    }
};
tmpl.encReg = /[<>&"'\x00]/g;
tmpl.encMap = {
    "<"   : "&lt;",
    ">"   : "&gt;",
    "&"   : "&amp;",
    "\""  : "&quot;",
    "'"   : "&#39;"
};
tmpl.encode = function (s) {
    /*jshint eqnull:true */
    return (s == null ? "" : "" + s).replace(
        tmpl.encReg,
        function (c) {
            return tmpl.encMap[c] || "";
        }
    );
};
tmpl.arg = "o";
tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" +
",include=function(s,d){_s+=tmpl(s,d);}";

Lettuce.prototype.tmpl = tmpl;


//Inspired by http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url & Backbone
var Router = {
    routes: [],
    mode: null,
    root: '/',
    hashStrip: /^#*/,
    getFragment: function(loc) {
        return (loc || window.location).hash.replace(this.hashStrip, '');
    },

    add: function(re, handler) {
        if(typeof re == 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler});
        return this;
    },
    remove: function(param) {
        for(var i=0, r = this.routes[i]; i<this.routes.length; i++) {
            if(r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    },
    check: function (current, self) {
        var fragment = current || self.getFragment();
        for (var i = 0; i < self.routes.length; i++) {
            var newFragment = "#" + fragment;
            var match = newFragment.match(self.routes[i].re);
            console.log(match, newFragment);
            if (match) {
                match.shift();
                self.routes[i].handler.apply({}, match);
            }
        }
    },

    load: function() {
        var self = this;
        var current = self.getFragment();
        var fn = function() {
            if(current !== self.getFragment()) {
                current = self.getFragment();
                //self.check(current);
            } else {
                self.check(current, self);
            }
        };
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    },
    navigate: function(path) {
        path = path ? path : '';
        window.location.href.match(/#(.*)$/);
        window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        return this;
    }
};

var router = {
    Router: Router
};

Lettuce.prototype = Lettuce.extend(Lettuce.prototype, router);


}(this));
