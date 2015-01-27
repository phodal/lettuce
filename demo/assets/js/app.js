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
        var templates = L.Template.tmpl("<h3>{%=o.about%}</h3>", data);
        return aboutPage.render(templates, "results");
    };

    var whyPage = function(){
        var whyPage = new L.SimpleView();
        var templates = L.Template.tmpl("<h3>{%=o.why%}</h3>", data);
        return whyPage.render(templates, "results");
    };

    var whatPage = function(){
        var whatPage = new L.SimpleView();
        var templates = L.Template.tmpl("<h3>{%=o.what%}</h3>", data);
        return whatPage.render(templates, "results");
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
