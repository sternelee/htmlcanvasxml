define("touch_event", ["event"], function(e) {
    var t = function(t, n, r) {
        var i = this;
        e.prototype.constructor.call(i, t, n),
            i.touches = r
    };
    return t.CLICK = "click",
        t.TOUCH_START = "touch_start",
        t.TOUCH_MOVE = "touch_move",
        t.TOUCH_END = "touch_end",
        t.SWIPE = "swipe",
        t.prototype = new e,
        t.prototype.constructor = t,
        t.prototype.touches = null,
        t.prototype.clone = function(e) {
            var n = this;
            return e = arguments.length > 0 ? e : n.target,
                new t(e, n.type, n.touches.slice(0))
        },
        t
})
