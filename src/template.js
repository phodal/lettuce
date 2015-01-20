/*
 * JavaScript Templates 2.4.1
 * https://github.com/blueimp/JavaScript-Templates
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Inspired by John Resig's JavaScript Micro-Templating:
 * http://ejohn.org/blog/javascript-micro-templating/
 */

/*jslint evil: true, regexp: true, unparam: true */
/*global document */

var Template = {
    regexp: /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g,
    encReg: /[<>&"'\x00]/g,
    encMap: {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "\"": "&quot;",
        "'": "&#39;"
    },
    arg: "o",
    helper: ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" +
    ",include=function(s,d){_s+=tmpl(s,d);}",

    tmpl: function (str, data){
        var f = !/[^\w\-\.:]/.test(str) ? "" : this.compile(str);
        return f(data, this);
    },
    compile: function (str) {
        var fn, variable;
        variable = this.arg + ',tmpl';
        fn = "var _e=tmpl.encode" + this.helper + ",_s='" + str.replace(this.regexp, this.func) + "';";
        fn = fn + "return _s;";
        return new Function(variable, fn);
    },
    encode: function (s) {
        /*jshint eqnull:true */
        return (s == null ? "" : "" + s).replace(
            /[<>&"'\x00]/g,
            function (c) {
                return {
                        "<": "&lt;",
                        ">": "&gt;",
                        "&": "&amp;",
                        "\"": "&quot;",
                        "'": "&#39;"
                    }[c] || "";
            }
        );
    },
    func: function (s, p1, p2, p3, p4, p5) {
        if (p1) { // whitespace, quote and backspace in HTML context
            return {
                    "\n": "\\n",
                    "\r": "\\r",
                    "\t": "\\t",
                    " ": " "
                }[p1] || "\\" + p1;
        }
        if (p2) { // interpolation: {%=prop%}, or unescaped: {%#prop%}
            if (p2 === "=") {
                return "'+_e(" + p3 + ")+'";
            }
            return "'+(" + p3 + "==null?'':" + p3 + ")+'";
        }
        if (p4) { // evaluation start tag: {%
            return "';";
        }
        if (p5) { // evaluation end tag: %}
            return "_s+='";
        }
    }
};

var template = {
    Template: Template
};

Lettuce.prototype.tmpl = Lettuce.extend(Lettuce.prototype, template);
