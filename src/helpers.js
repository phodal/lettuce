/*     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
*     Underscore may be freely distributed under the MIT license.
*/
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
