var SimpleView = new Lettuce.prototype.Class({});
SimpleView.prototype.init = function () {};

SimpleView.prototype.render = function (tmpl, id) {
    document.getElementById(id).innerHTML = tmpl;
};

var simpleView = {
    SimpleView: SimpleView
};

Lettuce.prototype = Lettuce.extend(Lettuce.prototype, simpleView);
