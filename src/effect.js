var Effect = {
    slideDown: function (element, duration, finalheight) {
        var s = element.style;
        s.height = '0px';

        var y = 0;
        var frameRate = 10;
        var totalFrames = duration / frameRate;
        var heightIncrement = finalheight / totalFrames;
        var oneSecond = 1000;
        var interval = oneSecond / frameRate;
        var tween = function () {
            y += heightIncrement;
            s.height = y + 'px';
            if (y < finalheight) {
                setTimeout(tween, interval);
            }
        };
        tween();
    }
};

var effect = {
    Effect: Effect
};


Lettuce.prototype = Lettuce.extend(Lettuce.prototype, effect);
