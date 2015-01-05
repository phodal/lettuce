Lettuce.get = function(url, params, callback) {
    Lettuce.send(url, 'GET', params, callback);
};

Lettuce.post = function(url, params, callback) {
    Lettuce.send(url, 'POST', params, callback);
};

Lettuce.send = function(url, method, params, callback) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            var data = request.responseText;
            try {
                data = JSON.parse(data);
            } catch (exc) {
            }
            if (callback) {
                callback(data);
            }
        }
    };

    var body;
    if (params) {
        var bodies = [];
        for (var name in params) {
            bodies.push(name + '=' + encodeURIComponent(params[name]));
        }

        body = bodies.join('&');
        if (body.length) {
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
    }

    request.send(body);
};
