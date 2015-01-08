/**
 * Lettuce Class 0.0.1
 * JavaScript Class built-in inheritance system
 *
 * MIT Licensed.
 * (c) 2015, Fengda Huang - http://www.phodal.com
 * Copyright (c) 2011, 2012 Jeanine Adkisson.
 * Inspired by https://github.com/munro/self, https://github.com/jneen/pjs
 */

Lettuce.prototype.Class = (function (prototype, ownProperty, undefined) {
	var lettuceClass = function Class(_superclass, definition) {
        if (definition === undefined) {
            definition = _superclass;
            _superclass = Object;
        }

        function C() {
            var self = this instanceof C ? this : new Bare();
            self.init.apply(self, arguments);
            return self;
        }

        function Bare() {
        }

        C.Bare = Bare;

        var _super = Bare[prototype] = _superclass[prototype];
        var proto = Bare[prototype] = C[prototype] = C.p = new Bare();

        proto.constructor = C;

        C.extend = function (def) {
            return new Class(C, def);
        };

        var open = (C.open = function (def) {
            if (typeof def === 'function') {
                def = def.call(C, proto, _super, C, _superclass);
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

            return C;
        });
        return (open)(definition);
    };
    return lettuceClass;

})('prototype', ({}).hasOwnProperty);
