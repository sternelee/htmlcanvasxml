define("error_event", ["event"], function(e) {
    var t = function(n, r) {
        var i = this;
        e.prototype.constructor.call(i, n, t.ERROR),
            i.error = r
    };
    t.prototype = new e;
    var n = t.prototype;
    return n.constructor = t,
        t.ERROR = "error",
        n.error = null,
        n.clone = function(e) {
            var n = this;
            return e = arguments.length > 0 ? e : n.target,
                new t(e, n.error)
        },
        t
})
