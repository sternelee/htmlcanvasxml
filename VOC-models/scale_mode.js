define("scale_mode", ["mat3", "vec2", "align_mode"], function(e, t, n) {
    var r = function() {};
    return r.align = function(e, r, i, s, o) {
            var u = new t;
            return (o & n.LEFT) != 0 ? u.x = 0 : (o & n.CENTER) != 0 ? u.x = Math.round(i / 2 - e / 2) : (o & n.RIGHT) != 0 && (u.x = Math.round(i - e)),
                (o & n.TOP) != 0 ? u.y = 0 : (o & n.MIDDLE) != 0 ? u.y = Math.round(s / 2 - r / 2) : (o & n.BOTTOM) != 0 && (u.y = Math.round(s - r)),
                u
        },
        r.noScale = function(t, n, i, s, o) {
            var u = new e,
                a = r.align(t, n, i, s, o);
            return u.tx = a.x,
                u.ty = a.y,
                u
        },
        r.showAll = function(t, n, i, s, o) {
            var u = Math.min(i / t, s / n),
                a = Math.round(t * u),
                f = Math.round(n * u),
                l = new e;
            l.a = a / t,
                l.d = f / n;
            var c = r.align(a, f, i, s, o);
            return l.tx = c.x,
                l.ty = c.y,
                l
        },
        r.noBorder = function(t, n, i, s, o) {
            var u = Math.max(i / t, s / n),
                a = Math.round(t * u),
                f = Math.round(n * u),
                l = new e;
            l.a = a / t,
                l.d = f / n;
            var c = r.align(a, f, i, s, o);
            return l.tx = c.x,
                l.ty = c.y,
                l
        },
        r.extraFit = function(t, n, r, i) {
            var s = new e;
            return s.a = r / t,
                s.d = i / n,
                s
        },
        r.fitWidth = function(t, n, i, s, o) {
            var u = i / t,
                a = Math.round(t * u),
                f = Math.round(n * u),
                l = new e;
            l.a = a / t,
                l.d = f / n;
            var c = r.align(a, f, i, s, o);
            return l.tx = c.x,
                l.ty = c.y,
                l
        },
        r.fitHeight = function(t, n, i, s, o) {
            var u = s / n,
                a = Math.round(t * u),
                f = Math.round(n * u),
                l = new e;
            l.a = a / t,
                l.d = f / n;
            var c = r.align(a, f, i, s, o);
            return l.tx = c.x,
                l.ty = c.y,
                l
        },
        r
})
