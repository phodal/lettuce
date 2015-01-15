var Parser = new Lettuce.prototype.Class(function () {

});

Parser.prototype.init = function () {

};

var DSLRunner = {
    run: function(methods) {
        this.ingredients = [];
        this.methods     = methods;

        this.executeAndRemove('first');

        for (var key in this.methods) {
            if (key !== 'last' && key.match(/^bake/)) {
                this.executeAndRemove(key);
            }
        }

        this.executeAndRemove('last');
    },

    addIngredient: function(ingredient) {
        this.ingredients.push(ingredient);
    },

    executeAndRemove: function(methodName) {
        var output = this.methods[methodName]();
        delete(this.methods[methodName]);
        return output;
    }
};

Parser.prototype = Lettuce.extend(Parser.prototype, DSLRunner);


var parser = {
    Parser: Parser
};

Lettuce.prototype = Lettuce.extend(Lettuce.prototype, parser);
