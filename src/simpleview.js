//var SimpleView = new Lettuce.prototype.Class(function (data, type) {
//    this.data = data;
//    this.message = type;
//});

function SimpleView (data, type){
    this.data = data;
    this.message = type;
}

SimpleView.prototype.init = function () {
    var result = Lettuce.tmpl("<h3>" + this.message + "</h3>", this.data);
    document.getElementById("results").innerHTML = result;
};


SimpleView.prototype.render = function () {

};

var simpleView = {
    SimpleView: SimpleView
};
Lettuce.prototype = Lettuce.extend(Lettuce.prototype, simpleView);
