'use strict';

describe("Template", function() {
    var L;

    beforeEach(function() {
        L = new lettuce();
        var element = document.createElement('div');
        element.id = "results";
        document.body.appendChild(element);
    });

    it("should be able render page", function() {
        var data = {
            "title": "JavaScript Templates"
        };

        var result = L.tmpl("<h3>{%=o.title%}</h3>\n!@#$%^&*()-=", data);
        expect("<h3>JavaScript Templates</h3>\n!@#$%^&*()-=").toEqual(result);

	    var special = "\n!@#$%^&*()-=_+{}'\"'[]\|:;/.,{";
        var result = L.tmpl(special, data);
        expect(special).toEqual(result);
    });

    it("should be able handler special char", function() {
        var data = {
            "special": '<>&"\'\x00',
            value: 'value',
            nullValue: null,
            falseValue: false,
            zeroValue: 0
        };

        var result = L.tmpl("{%=o.special%}", data);
        expect("&lt;&gt;&amp;&quot;&#39;").toEqual(result);

        var result = L.tmpl("{%#o.special%}", data);
        expect('<>&"\'\x00').toEqual(result);

        expect(L.tmpl('{% print(o.special); %}',data)).toEqual('&lt;&gt;&amp;&quot;&#39;');
        expect(L.tmpl('{% print(o.special, true); %}',data)).toEqual('<>&"\'\x00');
    });

    //
    it("should be call innerHTml", function() {
        var element = document.createElement('div');
        element.id = "head";
        document.body.appendChild(element);

        L.tmpl.load("head");
        expect(document.getElementById("head").innerHTML).toBe("");
    });
});
