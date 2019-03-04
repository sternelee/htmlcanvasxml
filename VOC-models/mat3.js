define("mat3", ["vec2"], function(e) {
    var t = function(e, t, n, r, i, s) {
        var o = this;
        o.a = isNaN(e) ? o.a : parseFloat(e),
            o.b = isNaN(t) ? o.b : parseFloat(t),
            o.c = isNaN(n) ? o.c : parseFloat(n),
            o.d = isNaN(r) ? o.d : parseFloat(r),
            o.tx = isNaN(i) ? o.tx : parseFloat(i),
            o.ty = isNaN(s) ? o.ty : parseFloat(s)
    };
    return t.rotateMat = function(e, n) {
            var r = new t;
            return r.a = Math.cos(e),
                r.b = Math.sin(e),
                r.c = -1 * r.b,
                r.d = r.a,
                r.tx = n.x - r.a * n.x - r.c * n.y,
                r.ty = n.y - r.b * n.x - r.d * n.y,
                r
        },
        t.mat3With3Points = function(e, n) {
            var r = ((n[0].x - n[1].x) * (e[1].y - e[2].y) - (n[1].x - n[2].x) * (e[0].y - e[1].y)) / ((e[0].x - e[1].x) * (e[1].y - e[2].y) - (e[1].x - e[2].x) * (e[0].y - e[1].y)),
                i = ((n[0].x - n[1].x) * (e[0].x - e[2].x) - (n[0].x - n[2].x) * (e[0].x - e[1].x)) / ((e[0].x - e[2].x) * (e[0].y - e[1].y) - (e[0].x - e[1].x) * (e[0].y - e[2].y)),
                s = n[0].x - r * e[0].x - i * e[0].y,
                o = ((n[0].y - n[1].y) * (e[1].y - e[2].y) - (n[1].y - n[2].y) * (e[0].y - e[1].y)) / ((e[0].x - e[1].x) * (e[1].y - e[2].y) - (e[1].x - e[2].x) * (e[0].y - e[1].y)),
                u = ((n[0].y - n[1].y) * (e[0].x - e[2].x) - (n[0].y - n[2].y) * (e[0].x - e[1].x)) / ((e[0].x - e[2].x) * (e[0].y - e[1].y) - (e[0].x - e[1].x) * (e[0].y - e[2].y)),
                a = n[0].y - o * e[0].x - u * e[0].y;
            return new t(r, o, i, u, s, a)
        },
        t.prototype.a = 1,
        t.prototype.b = 0,
        t.prototype.c = 0,
        t.prototype.d = 1,
        t.prototype.tx = 0,
        t.prototype.ty = 0,
        t.prototype.scale = function(e, n) {
            n = arguments.length >= 2 ? n : e;
            var r = this;
            r.concat(new t(e, 0, 0, n))
        },
        t.prototype.rotate = function(e) {
            var n = this,
                r = e * (Math.PI / 180);
            n.concat(new t(Math.cos(r), Math.sin(r), Math.sin(r) * -1, Math.cos(r)))
        },
        t.prototype.move = function(e, n) {
            var r = this;
            r.concat(new t(1, 0, 0, 1, e, n))
        },
        t.prototype.concat = function(e) {
            var t = this,
                n = t.concatWith(e);
            t.a = n.a,
                t.b = n.b,
                t.c = n.c,
                t.d = n.d,
                t.tx = n.tx,
                t.ty = n.ty
        },
        t.prototype.concatWith = function(e) {
            var n = this,
                r = n.a * e.a + n.b * e.c,
                i = n.a * e.b + n.b * e.d,
                s = n.c * e.a + n.d * e.c,
                o = n.c * e.b + n.d * e.d,
                u = n.tx * e.a + n.ty * e.c + e.tx,
                a = n.tx * e.b + n.ty * e.d + e.ty;
            return new t(r, i, s, o, u, a)
        },
        t.prototype.transformPoint = function(t) {
            var n = this,
                r = new e;
            return r.x = t.x * n.a + t.y * n.c + n.tx,
                r.y = t.x * n.b + t.y * n.d + n.ty,
                r
        },
        t.prototype.inversePoint = function(e) {
            var t = this,
                n = t.inversion();
            return n.transformPoint(e)
        },
        t.prototype.determinant = function() {
            var e = this;
            return e.a * e.d - e.b * e.c
        },
        t.prototype.inversion = function() {
            var e = this,
                t = e.clone();
            return t.inverse(),
                t
        },
        t.prototype.inverse = function() {
            var e = this,
                t = e.determinant();
            if (t === 0)
                throw new Error("The matrix can not be inverse properly. " + e.toString());
            var n = 1 / t,
                r = e.d * n,
                i = -1 * e.b * n,
                s = -1 * e.c * n,
                o = e.a * n,
                u = (e.c * e.ty - e.d * e.tx) * n,
                a = -1 * (e.a * e.ty - e.b * e.tx) * n;
            e.a = r,
                e.b = i,
                e.c = s,
                e.d = o,
                e.tx = u,
                e.ty = a
        },
        t.prototype.adjoint = function() {
            var e = this,
                n = e.d,
                r = -1 * e.b,
                i = -1 * e.c,
                s = e.a,
                o = e.c * e.ty - e.d * e.tx,
                u = -1 * (e.a * e.ty - e.b * e.tx);
            return new t(n, r, i, s, o, u)
        },
        t.prototype.equalsTo = function(e) {
            var t = this,
                n = !1;
            return e != null && (n = t.a == e.a && t.b == e.b && t.c == e.c && t.d == e.d && t.tx == e.tx && t.ty == e.ty),
                n
        },
        t.prototype.clone = function() {
            var e = this;
            return new t(e.a, e.b, e.c, e.d, e.tx, e.ty)
        },
        t.prototype.toArray = function() {
            var e = this;
            return [e.a, e.b, e.c, e.d, e.tx, e.ty]
        },
        t.prototype.toString = function() {
            var e = this,
                t = "a:" + e.a + "  " + "b:" + e.b;
            return t += " c:" + e.c + "  " + "d:" + e.d,
                t += " tx:" + e.tx + "  " + "ty:" + e.ty,
                t
        },
        t
})
