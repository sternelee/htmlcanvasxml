define("easing", function() {}),
define("animate", ["mat3", "color", "easing"], function(e, t) {
    var n = function(e, t, n, r, i, s) {
            var o = this;
            o.target = e,
                o.to = n,
                o.duration = t,
                o.easing = typeof r == "function" ? r : Linear.easeNone,
                o.onUpdate = i,
                o.onComplete = s
        },
        r = n.prototype;
    return r.target = null,
        r.duration = 0,
        r.easing = null,
        r.onUpdate = null,
        r.onComplete = null,
        r.to = null,
        r.from = null,
        r.startTS = 0,
        r.init = function(e) {
            var t = this;
            t.startTS = e,
                t.from = {};
            for (var n in t.to)
                if (t.to.hasOwnProperty(n) && typeof t.target[n] == "function") {
                    var r = t.target[n],
                        i = r.call(t.target);
                    t.from[n] = i.clone ? i.clone() : i
                }
        },
        r.update = function(n) {
            var r = this,
                i = Math.min(n - r.startTS, r.duration),
                s = r.easing(i, 0, 1, r.duration);
            for (var o in r.from)
                if (r.from.hasOwnProperty(o)) {
                    var u = r.from[o],
                        a = r.to[o];
                    if (o == "matrix") {
                        var f = new e;
                        f.a = u.a + (a.a - u.a) * s,
                            f.b = u.b + (a.b - u.b) * s,
                            f.c = u.c + (a.c - u.c) * s,
                            f.d = u.d + (a.d - u.d) * s,
                            f.tx = u.tx + (a.tx - u.tx) * s,
                            f.ty = u.ty + (a.ty - u.ty) * s,
                            r.target.matrix(f)
                    } else if (o == "bgColor") {
                        var l = u.r() + (a.r() - u.r()) * s,
                            c = u.g() + (a.g() - u.g()) * s,
                            h = u.b() + (a.b() - u.b()) * s,
                            p = u.a() + (a.a() - u.a()) * s;
                        r.target.bgColor(t.colorWithRGBA(l, c, h, p))
                    } else if (isNaN(u) === !1 && isNaN(a) === !1) {
                        var d = u + (a - u) * s;
                        r.target[o](d)
                    }
                }
            typeof r.onUpdate == "function" && r.onUpdate(r.target, s);
            var v = n - r.startTS >= r.duration;
            return v && typeof r.onComplete == "function" && r.onComplete(r.target),
                v
        },
        r.jumpToEnd = function() {
            var e = this;
            e.update(e.startTS + e.duration)
        },
        n
})
