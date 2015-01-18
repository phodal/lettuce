(function(root, undefined) {

  'use strict';


var Lettuce = function() {

};

Lettuce.VERSION = '0.0.8';

root.lettuce = Lettuce;


//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

Lettuce.isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

Lettuce.isFunction = function(obj) {
    return typeof obj == 'function' || false;
};

Lettuce.defaults = function(obj) {
    if (!Lettuce.isObject(obj)) {
        return obj;
    }

    for (var i = 1, length = arguments.length; i < length; i++) {
        var source = arguments[i];
        for (var prop in source) {
            if (obj[prop] === void 0) {
                obj[prop] = source[prop];
            }
        }
    }
    return obj;
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


/**
 * Lettuce Class 0.0.1
 * JavaScript Class built-in inheritance system
 *(c) 2015, Fengda Huang - http://www.phodal.com
 *
 * Copyright (c) 2011, 2012 Jeanine Adkisson.
 *  MIT Licensed.
 * Inspired by https://github.com/munro/self, https://github.com/jneen/pjs
 */

Lettuce.prototype.Class = (function (prototype, ownProperty) {

	var lettuceClass = function Klass(_superclass, definition) {

        function Class() {
            var self = this instanceof Class ? this : new Basic();
            self.init.apply(self, arguments);
            return self;
        }

        function Basic() {
        }

        Class.Basic = Basic;

        var _super = Basic[prototype] = _superclass[prototype];
        var proto = Basic[prototype] = Class[prototype] = new Basic();

        proto.constructor = Class;

        Class.extend = function (def) {
            return new Klass(Class, def);
        };

        var open = (Class.open = function (def) {
            if (typeof def === 'function') {
                def = def.call(Class, proto, _super, Class, _superclass);
            }

            if (typeof def === 'object') {
                for (var key in def) {
                    if (ownProperty.call(def, key)) {
                        proto[key] = def[key];
                    }
                }
            }

            if (!('init' in proto)) {
                proto.init = _superclass;
            }

            return Class;
        });

        return (open)(definition);
    };

    return lettuceClass;

})('prototype', ({}).hasOwnProperty);


var Parser = new Lettuce.prototype.Class({});

Parser.prototype.init = function (options) {
    this.options = options || {};
    Lettuce.defaults(this.options, {
        first: 'first',
        regex: /.*Page/,
        last: 'last'
    });
};

Parser.prototype.run = function (methods) {
    this.methods = methods;

    this.execute(this.options.first);

    for (var key in this.methods) {
        if (key !== this.options.last && key.match(this.options.regex)) {
            this.execute(key);
        }
    }

    this.execute(this.options.last);
};

Parser.prototype.execute = function (methodName) {
    this.methods[methodName]();
};

var parser = {
    Parser: Parser
};

Lettuce.prototype = Lettuce.extend(Lettuce.prototype, parser);


Lettuce.get = function (url, callback) {
    Lettuce.send(url, 'GET', callback);
};

Lettuce.post = function (url, data, callback) {
    Lettuce.send(url, 'POST', callback, data);
};

Lettuce.send = function (url, method, callback, data) {
    data = data || null;
    var request = new XMLHttpRequest();
    if (callback instanceof Function) {
        request.onreadystatechange = function () {
            if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
                callback(request.responseText);
            }
        };
    }
    request.open(method, url, true);
    if (data instanceof Object) {
        data = JSON.stringify(data);
        request.setRequestHeader('Content-Type', 'application/json');
    }
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.send(data);
};


var Event = {
    on: function(event, callback){
        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(callback);
    },
    off: function(event, callback){
        this._events = this._events || {};
        if (event in this._events === false) {
            return;
        }
        this._events[event].splice(this._events[event].indexOf(callback), 1);
    },
    trigger: function(event){
        this._events = this._events || {};
        if (event in this._events === false) {
            return;
        }
        for (var i = 0; i < this._events[event].length; i++) {
            this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
};

var event = {
    Event: Event
};


Lettuce.prototype = Lettuce.extend(Lettuce.prototype, event);


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
    return f(data, tmpl);
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

Lettuce.prototype.tmpl = Lettuce.tmpl = tmpl;


var SimpleView = new Lettuce.prototype.Class({});

SimpleView.prototype.init = function () {

};


SimpleView.prototype.render = function (tmpl, id) {
    //var result = Lettuce.tmpl("<h3>{%=o."+ type +"%}" + "</h3>", data);
    document.getElementById(id).innerHTML = tmpl;
};

var simpleView = {
    SimpleView: SimpleView
};

Lettuce.prototype = Lettuce.extend(Lettuce.prototype, simpleView);


//Inspired by http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url & Backbone
var Router = {
    routes: [],
    mode: null,
    root: '/',
    hashStrip: /^#*/,
    location: window.location,

    getFragment: function() {
        return (this.location).hash.replace(this.hashStrip, '');
    },

    add: function(regex, handler) {
        if(Lettuce.isFunction(regex)) {
            handler = regex;
            regex = '';
        }
        this.routes.push({ regex: regex, handler: handler});
        return this;
    },

    check: function (current, self) {
        var fragment = current || self.getFragment();
        for (var i = 0; i < self.routes.length; i++) {
            var newFragment = "#" + fragment;
            var match = newFragment.match(self.routes[i].regex);
            if (match) {
                match.shift();
                self.routes[i].handler.apply({}, match);
            }
        }
    },

    load: function() {
        var self, current, fn;
        self = this;
        fn = function() {
            current = self.getFragment();
            if (current === self.getFragment()) {
                self.check(current, self);
            }
        };
        if (window.addEventListener) {
            window.addEventListener("hashchange", fn, false);
        }
        else if (window.attachEvent) {
            window.attachEvent("onhashchange", fn);
        }
        return this;
    },

    navigate: function(path) {
        path = path ? path : '';
        this.location.href.match(/#(.*)$/);
        this.location.href = this.location.href.replace(/#(.*)$/, '') + '#' + path;
        return this;
    }
};

var router = {
    Router: Router
};

Lettuce.prototype = Lettuce.extend(Lettuce.prototype, router);


}(this));
