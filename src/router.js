/*
 *Inspired by http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
 *  Backbone
 */
var Router = {
    routes: [],
    mode: null,
    root: '/',
    hashStrip: /^#*/,
    location: window.location,

    getFragment: function () {
        return (this.location).hash.replace(this.hashStrip, '');
    },

    add: function (regex, handler) {
        if (Lettuce.isFunction(regex)) {
            handler = regex;
            regex = '';
        }
        this.routes.push({regex: regex, handler: handler});
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

    load: function () {
        var self, current, checkUrl;
        self = this;

        checkUrl = function () {
            current = self.getFragment();
            self.check(current, self);
        };

        function addEventListener() {
            if (window.addEventListener) {
                window.addEventListener("hashchange", checkUrl, false);
            }
            else if (window.attachEvent) {
                window.attachEvent("onhashchange", checkUrl);
            }
        }

        addEventListener();

        return this;
    },

    navigate: function (path) {
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
