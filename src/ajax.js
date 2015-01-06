Lettuce.get = function (url, callback) {
    Lettuce.send(url, 'GET', callback);
};

Lettuce.post = function (url, params, callback) {
    Lettuce.send(url, 'POST', callback);
};

Lettuce.send = function (url, method, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
            callback(request.responseText);
        }
    };
    request.open(method, url, true);
    request.send(null);
};
