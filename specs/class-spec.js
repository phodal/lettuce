'use strict';

describe("Class", function() {
    var L;

    beforeEach(function() {
        L = new lettuce();
    });

    it("should be able to see class parent class", function() {
        var Person = L.Class(function(person) {
            person.init = function(isDancing) { this.dancing = isDancing };
            person.dance = function() { return this.dancing };
        });

        var Ninja = L.Class(Person, function(ninja, person) {
            ninja.init = function() { person.init.call(this, false) };
            ninja.swingSword = function() { return 'swinging sword!' };
        });

        var ninja = Ninja();

        it('respects instanceof', function() {
            assert.ok(ninja instanceof Person);
        });

        it('inherits methods (also super)', function() {
            assert.equal(false, ninja.dance());
        });
    });
});
