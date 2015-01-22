(function (l) {
    var L = new l();

    var data = {
        about: "This about A Mobile Framework For Romantic",
        what: "A Framework",
        why: "Why is a new Framework."
    };

    var about = function () {
        var result = L.Template.tmpl("<h3>{%=o.about%}</h3>", data);
        document.getElementById("results").innerHTML = result;
    };

    function what() {
        var result = L.Template.tmpl("<h3>{%=o.what%}</h3>", data);
        document.getElementById("results").innerHTML = result;
    }

    function why() {
        var result = L.Template.tmpl("<h3>{%=o.why%}</h3>", data);
        document.getElementById("results").innerHTML = result;
    }

    var home = function (){
        L.Router.navigate("");
    };

    L.Router
        .add(/#/, home)
        .add(/#about/, about)
        .add(/#what/, what)
        .add(/#why/, why)
        .load();

    console.log(L.Router.routes);

}(lettuce));
