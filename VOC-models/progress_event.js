define("progress_event", ["event"], function(e) {
    var t = function(n, r) {
        var i = this;
        e.prototype.constructor.call(i, n, t.PROGRESS),
            i.percent = r
    };
    t.PROGRESS = "progress",
        t.prototype = new e;
    var n = t.prototype;
    return n.constructor = t,
        n.percent = 0,
        n.clone = function(e) {
            var n = this;
            return e = arguments.length > 0 ? e : n.target,
                new t(e, n.percent)
        },
        t
})
