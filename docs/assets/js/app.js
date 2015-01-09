(function (l) {
    var L = new l();

    var data = {
        about: "This about A Mobile Framework For Romantic",
        what: "A Framework",
        why: "Why is a new Framework."
    };

    var home = function (){
        L.Router.navigate("");
    };

	var aboutPage = function(){
		var aboutPage = new L.SimpleView();
        return aboutPage.render(data, "about");
    };

    var whyPage = function(){
        var whyPage = new L.SimpleView();
        return whyPage.render(data, "why");
    };

    var whatPage = function(){
        var whatPage = new L.SimpleView();
        return whatPage.render(data, "what");
    };

    L.Router
        .add(/#/, home)
        .add(/#about/, aboutPage)
        .add(/#what/, whatPage)
        .add(/#why/, whyPage)
        .load();

    L.Event.on('tick', function (results) {
        console.log(results);
    });
    console.log(L.Router.routes)

}(lettuce));
