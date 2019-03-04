define("touch", [], function() {
    var e = function(e, t, n, r) {
        var i = this;
        i.x = e,
            i.y = t,
            i.stageX = n,
            i.stageY = r
    };
    return e.prototype.constructor = e,
        e.prototype.x = 0,
        e.prototype.y = 0,
        e.prototype.stageX = 0,
        e.prototype.stageY = 0,
        e
})
