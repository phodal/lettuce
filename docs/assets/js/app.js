(function (l) {
    var L = new l();

    var data = {
        about: "This about A Mobile Framework For Romantic",
        what: "A Framework",
        why: "Why is a new Framework."
    };

    var about = new L.SimpleView(data, data.about);

    var what = new L.SimpleView(data, data.what);

    var why = new L.SimpleView(data, data.why);

    var home = function (){
        L.Router.navigate("");
    };

    L.Router
        .add(/#/, home)
        .add(/#about/, about.render)
        .add(/#what/, what.render)
        .add(/#why/, why.render)
        .load();

    L.Event.on('tick', function (results) {
        console.log(results);
    });
    console.log(L.Router.routes)

}(lettuce));
