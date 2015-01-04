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


var Template = function(){
    var cache = {};

    this.tmpl = function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                "with(obj){p.push('" +

                    // Convert the template into pure JavaScript
                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };
};

Lettuce.prototype.Template = Template;


var routes = {};
// The route registering function:
function route (path, templateId, controller) {
    // Allow route(path, controller) for template less routes:
    if (typeof templateId === 'function') {
        controller = templateId;
        templateId = null;
    }
    routes[path] = {templateId: templateId, controller: controller};
}

var el = null, current = null;
function router () {
    // Current route url (getting rid of '#' in hash as well):
    var url = location.hash.slice(1) || '/';
    // Get route by url:
    var route = routes[url];
    // Is it a route without template?
    if (route && !route.templateId) {
        // Just initiate controller:
        return route.controller ? new route.controller : null;
    }
    // Lazy load view element:
    el = el || document.getElementById('view');
    // Clear existing observer:
    if (current) {
        Object.unobserve(current.controller, current.render);
        current = null;
    }
    // Do we have both a view and a route?
    if (el && route && route.controller) {
        // Set current route information:
        current = {
            controller: new route.controller,
            template: tmpl(route.templateId),
            render: function () {
                // Render route template with John Resig's template engine:
                el.innerHTML = this.template(this.controller);
            }
        };
        // Render directly:
        current.render();
        // And observe for changes:
        Object.observe(current.controller, current.render.bind(current));
    }
}
// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);
// Expose the route register function:
//this.route = route;


Lettuce.prototype.Router = route;


}(this));
