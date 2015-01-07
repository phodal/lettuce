'use strict';

describe("Ajax", function() {
    var L;

    beforeEach(function() {
        L = new lettuce();
    });

    it("should be get JSON from bower.json", function(done) {
        lettuce.get('http://0.0.0.0:8000/bower.json', function(result){
            expect(JSON.parse(result).name).toEqual("lettuce");
            done();
        });
    });

    it("should be post to some where", function(done) {
        lettuce.post('http://0.0.0.0:8000/post', [], function(result){
            console.log(result);
            done();
        });
    });

});
