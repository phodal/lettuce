(function (l) {
    var L = new l();

    var data = {
        about: "This about A Mobile Framework For Romantic",
        what: "A Framework",
        why: "Why is a new Framework."
    };

    var pageView = function(){};
    pageView.prototype = {
        init:function(){
            var result = L.tmpl("<h3>" + this.message + "</h3>", data);
            document.getElementById("results").innerHTML = result;
        }
    };

    var about = new L.Class(pageView);
    about.prototype.message = data.about;

    var what = new L.Class(pageView);
    what.prototype.message = data.what;

    var why = new L.Class(pageView);
    why.prototype.message = data.why;

    L.Router
        .add(/#about/, about)
        .add(/#what/, what)
        .add(/#why/, why)
        .load();

    L.Event.on('tick', function (results) {
        console.log(results);
    });
    console.log(L.Router.routes)

}(lettuce));
