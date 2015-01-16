var Parser = new Lettuce.prototype.Class(function () {
});

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

    this.executeAndRemove(this.options.first);

    for (var key in this.methods) {
        if (key !== this.options.last && key.match(this.options.regex)) {
            this.executeAndRemove(key);
        }
    }

    this.executeAndRemove(this.options.last);
};

Parser.prototype.executeAndRemove = function (methodName) {
    var output = this.methods[methodName]();
    delete(this.methods[methodName]);
    return output;
};

var parser = {
    Parser: Parser
};

Lettuce.prototype = Lettuce.extend(Lettuce.prototype, parser);
