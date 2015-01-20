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
    var self = this;
    self.methods = methods;
    self.execute(self.options.first);
    for (var key in self.methods) {
        if (key !== self.options.last && key.match(self.options.regex)) {
            this.execute(key);
        }
    }

    self.execute(self.options.last);
};

Parser.prototype.execute = function (methodName) {
    this.methods[methodName]();
};

var parser = {
    Parser: Parser
};

Lettuce.prototype = Lettuce.extend(Lettuce.prototype, parser);
