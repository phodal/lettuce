describe("Ajax", function () {
    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    it("specifying response when you need it", function (done) {
        var doneFn = jasmine.createSpy("success");

        lettuce.get('/some/cool/url', function (result) {
            expect(result).toEqual("awesome response");
            done();
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "contentType": 'text/plain',
            "responseText": 'awesome response'
        });
    });

    it("specifying html when you need it", function (done) {
        var doneFn = jasmine.createSpy("success");

        lettuce.load('/some', function (result) {
            expect(result).toEqual("<h2>fsasfA</h2>");
            done();
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some');
        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "contentType": 'text/plain',
            "responseText": '<h2>fsasfA</h2>'
        });
    });


    it("should be post to some where", function (done) {
        var doneFn = jasmine.createSpy("success");

        lettuce.post('/some/cool/url', [], function (result) {
            expect(result).toEqual("awesome response");
            done();
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "contentType": 'text/plain',
            "responseText": 'awesome response'
        });
    });
});

