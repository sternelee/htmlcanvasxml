define("color", ["string_util"], function(e) {
    var t = function(e) {
        var t = this;
        if (arguments.length >= 1) {
            var n = e.replace(/^#|^0x/, ""),
                r = parseInt(n, 16);
            if (n.length != 6 && n.length != 8 || isNaN(r))
                throw new Error("Invalid color value: " + e);
            var i, s, o, u;
            n.length == 6 ? (i = r >> 16 & 255,
                    s = r >> 8 & 255,
                    o = r & 255,
                    u = 255) : n.length == 8 && (i = r >> 24 & 255,
                    s = r >> 16 & 255,
                    o = r >> 8 & 255,
                    u = r & 255),
                t.r(i),
                t.g(s),
                t.b(o),
                t.a(u)
        }
    };
    return t.colorWithString = function(e) {
            return new t(e)
        },
        t.colorWithRGBA = function(e, n, r, i) {
            var s = new t;
            return s.r(e),
                s.g(n),
                s.b(r),
                arguments.length < 4 && (i = 255),
                s.a(i),
                s
        },
        t.randomColor = function(e, n) {
            e = isNaN(e) ? 0 : e,
                n = isNaN(n) ? 16777215 : n;
            var r = e >> 16 & 255,
                i = e >> 8 & 255,
                s = e & 255,
                o = n >> 16 & 255,
                u = n >> 8 & 255,
                a = n & 255,
                f = r + Math.floor(Math.random() * (o - r)),
                l = r + Math.floor(Math.random() * (u - i)),
                c = r + Math.floor(Math.random() * (a - s));
            return t.colorWithRGBA(f, l, c, 255)
        },
        t.prototype.bit24String = null,
        t.prototype.bit24Updated = !1,
        t.prototype.to24BitString = function(t) {
            var n = this;
            if (n.bit24String == null || n.bit24Updated === !1) {
                var r = e.fillStringTo(n.r().toString(16), "0", 2).toUpperCase(),
                    i = e.fillStringTo(n.g().toString(16), "0", 2).toUpperCase(),
                    s = e.fillStringTo(n.b().toString(16), "0", 2).toUpperCase();
                t = arguments.length >= 1 ? t : "#",
                    n.bit24String = t + r + i + s,
                    n.bit24Updated = !0
            }
            return n.bit24String
        },
        t.prototype.bit32String = null,
        t.prototype.bit32Updated = !1,
        t.prototype.to32BitString = function(t) {
            var n = this;
            if (n.bit32String == null || n.bit32Updated === !1) {
                var r = e.fillStringTo(n.r().toString(16), "0", 2).toUpperCase(),
                    i = e.fillStringTo(n.g().toString(16), "0", 2).toUpperCase(),
                    s = e.fillStringTo(n.b().toString(16), "0", 2).toUpperCase(),
                    o = e.fillStringTo(n.a().toString(16), "0", 2).toUpperCase();
                t = arguments.length >= 1 ? t : "#",
                    n.bit32String = t + r + i + s + o,
                    n.bit32Updated = !0
            }
            return n.bit32String
        },
        t.prototype.rgbString = null,
        t.prototype.rgbStringUpdated = !1,
        t.prototype.toRGBString = function() {
            var e = this;
            if (e.rgbString == null || e.rgbStringUpdated === !1) {
                e.rgbStringUpdated = !0;
                var t = Math.round(e.r()),
                    n = Math.round(e.g()),
                    r = Math.round(e.b());
                e.rgbString = "rgb(" + t.toString(10) + "," + n.toString(10) + "," + r.toString() + ")"
            }
            return e.rgbString
        },
        t.prototype.rgbaString = null,
        t.prototype.rgbaStringUpdated = !1,
        t.prototype.toRGBAString = function() {
            var e = this;
            if (e.rgbaString == null || e.rgbaStringUpdated === !1) {
                e.rgbaStringUpdated = !0;
                var t = Math.round(e.r()),
                    n = Math.round(e.g()),
                    r = Math.round(e.b()),
                    i = Math.round(e.a() / 255 * 100) / 100;
                e.rgbaString = "rgba(" + t.toString(10) + "," + n.toString(10) + "," + r.toString() + "," + i.toString() + ")"
            }
            return e.rgbaString
        },
        t.prototype._r = 0,
        t.prototype.r = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._r && (t._r = Math.round(e),
                    t.bit24Updated = !1,
                    t.bit32Updated = !1,
                    t.rgbaStringUpdated = !1,
                    t.rgbStringUpdated = !1),
                t._r
        },
        t.prototype._g = 0,
        t.prototype.g = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._g && (t._g = Math.round(e),
                    t.bit24Updated = !1,
                    t.bit32Updated = !1,
                    t.rgbaStringUpdated = !1,
                    t.rgbStringUpdated = !1),
                t._g
        },
        t.prototype._b = 0,
        t.prototype.b = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._b && (t._b = Math.round(e),
                    t.bit24Updated = !1,
                    t.bit32Updated = !1,
                    t.rgbaStringUpdated = !1,
                    t.rgbStringUpdated = !1),
                t._b
        },
        t.prototype._a = 0,
        t.prototype.a = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._a && (t._a = Math.round(e),
                    t.bit24Updated = !1,
                    t.bit32Updated = !1,
                    t.rgbaStringUpdated = !1,
                    t.rgbStringUpdated = !1),
                t._a
        },
        t.prototype.adjustSaturation = function(e) {
            var t = this,
                n = (t.r() + t.g() + t.b()) / 3,
                r = n + (t.r() - n) * e,
                i = n + (t.g() - n) * e,
                s = n + (t.b() - n) * e;
            t.r(Math.floor(r)),
                t.g(Math.floor(i)),
                t.b(Math.floor(s)),
                t.bit24Updated = !1,
                t.bit32Updated = !1,
                t.rgbaStringUpdated = !1,
                t.rgbStringUpdated = !1
        },
        t.prototype.equalsTo = function(e) {
            var t = this;
            return t.r() === e.r() && t.g() === e.g() && t.b() === e.b() && t.a() === e.a()
        },
        t.prototype.clone = function() {
            var e = this;
            return t.colorWithRGBA(e.r(), e.g(), e.b(), e.a())
        },
        t
});
