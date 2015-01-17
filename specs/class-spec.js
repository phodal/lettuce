'use strict';

describe("Class", function () {
    var L, ninja, Person, killer;

    L = new lettuce();
    var Person = L.Class(function (person) {
        person.init = function (isDancing) {
            this.dancing = isDancing
        };
        person.dance = function () {
            return this.dancing
        };
    });

    var Ninja = L.Class(Person, function (ninja, person) {
        ninja.init = function () {
            person.init.call(this, false)
        };
        ninja.swingSword = function () {
            return 'swinging sword!'
        };
    });

    ninja = Ninja();
    var Killer = Ninja.extend({name: "killer"});
    killer = Killer();

    it('respects instanceof', function () {
        var results = ninja instanceof Person;
        expect(results).toBe(true);
    });

    it('inherits methods (also super)', function () {
        expect(ninja.dance).toBeUndefined();
    });

    it('extend methods', function () {
        expect(killer.name).toEqual('killer');
    });

});
