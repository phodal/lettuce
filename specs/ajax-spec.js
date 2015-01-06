'use strict';

describe("Template", function() {
    var L;

    beforeEach(function() {
        L = new lettuce();
    });

    it("should be able render page", function(done) {
        lettuce.get('http://0.0.0.0:8000/bower.json', function(result){
            //expect(result["name"]).toEqual("lettuce");
        })
        done();
    });

});
