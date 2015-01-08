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

var result = L.tmpl("<h3>{%=o.title%}</h3>\n!@#$%^&*()-=", data);
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
```
