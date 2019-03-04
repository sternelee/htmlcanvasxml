define("stage_ctrl", ["view_ctrl", "stage"], function(e, t) {
    var n = function() {};
    return n.prototype = new e,
        n.prototype.constructor = n,
        n.prototype.generateView = function() {
            return new t
        },
        n
})
