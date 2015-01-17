var SimpleView = new Lettuce.prototype.Class({});

SimpleView.prototype.init = function () {

};


SimpleView.prototype.render = function (tmpl, id) {
    //var result = Lettuce.tmpl("<h3>{%=o."+ type +"%}" + "</h3>", data);
    document.getElementById(id).innerHTML = tmpl;
};

var simpleView = {
    SimpleView: SimpleView
};

Lettuce.prototype = Lettuce.extend(Lettuce.prototype, simpleView);
