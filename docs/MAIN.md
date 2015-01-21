##Class

example

```javascript
var L = new lettuce();
var zero = function(){

};
var sub = new L.Class(zero);
```

##Template

example

```javascript
var L = new lettuce();
var data = {
    "title": "JavaScript Templates"
};

var result = L.Template.tmpl("<h3>{%=o.title%}</h3>\n!@#$%^&*()-=", data);
```

##Router

Example

```javascript
var L = new lettuce();

var check = L.Router
            .add(/#about/,log)
            .add(/#what/, log)
            .add(/#why/, log)
            .load();;
```

##Promise

example

```javascript
function late(n) {
    var L = new lettuce();
    var p = new L.Promise();
    return p;
}

late(100).then(
).then(
).done();
```

##Ajax

example

```javascript
lettuce.get('/bower.json', function(result){
    equal(result["name"], "lettuce");
    done();
})
```

##Template with Router

```javascript
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
    .add(/#about/, aboutPage)
    .add(/#what/, whatPage)
    .add(/#why/, whyPage)
    .load();
```
