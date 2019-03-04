define("event_center", [], function() {
    var e = function(e, t, n, r) {
            var i = this;
            i.listener = t,
                i.target = e,
                i.event = n,
                i.handler = r
        },
        t = e.prototype;
    t.listener = null,
        t.target = null,
        t.event = null,
        t.handler = null,
        t.execute = function(e) {
            var t = this;
            t.handler.call(t.listener, e)
        },
        t.checkIfMatch = function(e, t, n, r) {
            var i = this,
                s = !0;
            typeof e != "undefined" && e != null && (s = i.target === e),
                s && typeof t != "undefined" && t != null && (s = i.listener === t);
            if (s && typeof n != "undefined") {
                var o = !1;
                for (var u = 0; u < n.length; u++) {
                    var a = n[u];
                    if (a == i.event) {
                        o = !0;
                        break
                    }
                }
                s = o
            }
            if (s && typeof r != "undefined") {
                var f = !1;
                for (var l = 0; l < r.length; l++) {
                    var c = r[l];
                    if (c === i.handler) {
                        f = !0;
                        break
                    }
                }
                s = f
            }
            return s
        },
        t.release = function() {
            var e = this;
            e.listener = null,
                e.target = null,
                e.event = null,
                e.handler = null
        };
    var n = function() {};
    return n.listeners = [],
        n.addListener = function(t, r, i, s) {
            i = typeof i == "string" ? [i] : i,
                s = typeof s == "function" ? [s] : s;
            for (var o = 0; o < i.length && o < s.length; o++) {
                var u = i[o],
                    a = s[o],
                    f = new e(t, r, u, a);
                n.listeners.push(f)
            }
        },
        n.removeListener = function(e, t, r, i) {
            r = typeof r == "string" ? [r] : r,
                i = typeof i == "function" ? [i] : i;
            for (var s = n.listeners.length - 1; s >= 0; s--) {
                var o = n.listeners[s];
                o.checkIfMatch(e, t, r, i) && n.listeners.splice(s, 1)
            }
        },
        n.dispatchEvent = function(e) {
            var t = e.type,
                r = e.target,
                i = n.listeners.slice();
            for (var s = 0; s < i.length; s++) {
                var o = i[s];
                o != null && o != undefined && o.checkIfMatch(r, null, [t]) && o.execute(e)
            }
        },
        n
})
