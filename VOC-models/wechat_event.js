define("wechat_event", ["event"], function(e) {
    var t = function(t, n, r) {
        var i = this;
        i.message = r,
            e.prototype.constructor.call(i, t, n)
    };
    t.CANCEL_SHARING = "cancel_sharing",
        t.SUCCESS_SHARING = "success_sharing",
        t.WEICHAT_READY = "wechat_ready",
        t.prototype = new e;
    var n = t.prototype;
    return n.constructor = t,
        n.message = null,
        n.clone = function(e) {
            var n = this;
            return e = arguments.length > 0 ? e : n.target,
                new t(e, n.type, n.message)
        },
        t
})
