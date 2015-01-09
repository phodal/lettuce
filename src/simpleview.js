var SimpleView = new Lettuce.prototype.Class(function () {

});

SimpleView.prototype.init = function () {

};


SimpleView.prototype.render = function (data, type) {
    var result = Lettuce.tmpl("<h3>{%=o."+ type +"%}" + "</h3>", data);
    document.getElementById("results").innerHTML = result;
};

var simpleView = {
    SimpleView: SimpleView
};

Lettuce.prototype = Lettuce.extend(Lettuce.prototype, simpleView);
