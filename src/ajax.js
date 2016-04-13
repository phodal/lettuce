Lettuce.get = function(url,data,callback){
    Lettuce.send(url,'GET',callback,data)
}

Lettuce.load = function(url,data,callback){
    Lettuce.send(url,'GET',callback,data)
}

Lettuce.post = function (url, data, callback) {
    Lettuce.send(url, 'POST', callback, data);
};

Lettuce.send = function(url,method,callback,data){
    var data = data || null;
    var request = new XMLHttpRequest();     
    if(data instanceof Object){
        data = Lettuce.formatParams(data);
    }
    if(method=='GET'){
        request.open(method, url+'?'+data,true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.send(null);
    }else if(method=='POST'){
        request.open(method,url,true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.send(data);
    }       
    if(Lettuce.isFunction(callback)){
        request.onreadystatechange = function(){
            if(request.readyState===4 && (request.status === 200 || request.status ==0)){
                callback(request.responseText)
            }
        }
    }
}
Lettuce.formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
}
