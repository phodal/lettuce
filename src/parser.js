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
