[![Build Status](https://travis-ci.org/phodal/lettuce.svg?branch=master)](https://travis-ci.org/phodal/lettuce)
[![Version](http://img.shields.io/npm/v/lettuce.svg?style=flat)](http://http://img.shields.io/npm/v/lettuce.svg)
[![Code Climate](https://codeclimate.com/github/phodal/lettuce/badges/gpa.svg)](https://codeclimate.com/github/phodal/lettuce)
[![Test Coverage](https://codeclimate.com/github/phodal/lettuce/badges/coverage.svg)](https://codeclimate.com/github/phodal/lettuce)
[![Node](https://img.shields.io/node/v/gh-badges.svg?style=flat)]()
[![npm](https://img.shields.io/npm/dm/lettuce.svg?style=flat)]()
[![LICENSE](https://img.shields.io/badge/license-MIT-green.svg?style=flat)]()

![Lettuce](./docs/lettuce.png)

#Lettuce, Mobile Framework for romantic#
 
Lettuce is a Small & Powerful Framework for Romantic.
Online demo [http://phodal.github.io/lettuce](http://phodal.github.io/lettuce/#/).


> Lettuce 是一个轻巧的移动开发框架。

用途: ``Romantic``，``前端学习``


##Gallery(展示)##

应用场景

 - 一个情人节礼物: [http://valentine.phodal.com/](http://valentine.phodal.com/)

 - 官网: [http://lettuce.phodal.com/](http://lettuce.phodal.com/)

##Lettuce Usage(用法)##

###Class(类)###

```javascript
var L = new lettuce();
var zero = function(){

};
var sub = new L.Class(zero);
```

###Template(模板)###

```javascript
var L = new lettuce();
var data = {
    "title": "JavaScript Templates"
};

var result = L.Template.tmpl("<h3>{%=o.title%}</h3>\n!@#$%^&*()-=", data);
```

###Router(路由)###

```javascript
var L = new lettuce();

var check = L.Router
            .add(/#about/,log)
            .add(/#what/, log)
            .add(/#why/, log)
            .load();;
```

###Effect(效果)###

####淡出####

```javascript
L.FX.fadeOut(document.getElementById('content'), {
    duration: 2000, complete: function () {
    }
});
```

####淡入####

```javascript
L.FX.fadeIn(document.getElementById('content'), {
    duration: 2000, complete: function () {
    }
});
```

###Promise###

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

###Ajax###

```javascript
lettuce.get('/bower.json', function(result){
    equal(result["name"], "lettuce");
    done();
})
```

```javascript
lettuce.post("http://127.0.0.1:5000/some", "something", function(data){
    console.log(data)
})
```

##Single Page Application Example(单页面应用)##

1.new a instance

```javascript
var L = new lettuce();
```
2.define data

```javascript
var data = {
    about: "Template",
    what: "This about A Mobile Framework For Romantic",
    why: "Why is a new Framework"
};
```

3.create function for router

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
```

4.Add router

```javascript
L.Router
    .add(/#about/, about)
    .add(/#why/, why)
    .load();
```

##Process##

###Done###

- Template
- Router
- Ajax
- Class
- Promise
- Event
- Effect

###On Going###

- View

##License##

© 2015 [Phodal Huang](http://www.phodal.com). This code is distributed under the MIT license. See `LICENSE.txt` in this directory.

[待我代码编成，娶你为妻可好](http://www.xuntayizhan.com/person/ji-ke-ai-qing-zhi-er-shi-dai-wo-dai-ma-bian-cheng-qu-ni-wei-qi-ke-hao-wan/)