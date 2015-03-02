if (typeof define === "function" && define.amd) {
    define("lettuce", [], function () {
        return Lettuce;
    });
}
var strundefined = typeof undefined;
if (typeof noGlobal === strundefined) {
    window.Lettuce = Lettuce;
}
return Lettuce;
}));

