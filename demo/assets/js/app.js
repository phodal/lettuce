(function (l) {
    var L = new l();

    var data = {
        about: "This about A Mobile Framework For Romantic",
        what: "A Framework",
        why: "Why is a new Framework."
    };

    var pageView = function(){};
    pageView.prototype = {
        message:"This about A Mobile Framework For Romantic",
        init:function(){
            var result = L.tmpl("<h3>" + this.message + "</h3>", data);
            document.getElementById("results").innerHTML = result;
        }
    };

    var about = new L.Class(pageView);

    function what() {
        var result = L.tmpl("<h3>{%=o.what%}</h3>", data);
        document.getElementById("results").innerHTML = result;
    }

    function why() {
        var result = L.tmpl("<h3>{%=o.why%}</h3>", data);
        document.getElementById("results").innerHTML = result;
    }

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
