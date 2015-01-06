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
        if(typeof re === 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler});
        return this;
    },
    check: function (current, self) {
        var fragment = current || self.getFragment();
        for (var i = 0; i < self.routes.length; i++) {
            var newFragment = "#" + fragment;
            var match = newFragment.match(self.routes[i].re);
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
