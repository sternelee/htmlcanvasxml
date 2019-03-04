define("spin_view", ["view_container", "mat3"], function(e, t) {
    var n = function() {};
    n.prototype = new e;
    var r = n.prototype;
    return r.constructor = n,
        r.clone = function() {
            var e = this,
                t = new n;
            return e.copyProperties(t),
                t
        },
        r.copyProperties = function(t) {
            var n = this;
            e.prototype.copyProperties.call(n, t),
                t.originalMat = n.originalMat.clone(),
                t.clockwise = n.clockwise,
                t.aps(n.aps()),
                t.angle(n.angle()),
                n.playing ? t.play() : t.pause()
        },
        r.dealloc = function() {
            var t = this;
            e.prototype.dealloc.call(t),
                t.originalMat = null
        },
        r.originalMat = null,
        r.updatePropsFromXML = function(t) {
            var n = this;
            e.prototype.updatePropsFromXML.call(n, t),
                n.originalMat = n.matrix().clone(),
                t.is("[clockwise]") ? n.clockwise = t.attr("clockwise") == "true" : n.clockwise = !0;
            if (t.is("[aps]")) {
                var r = parseFloat(t.attr("aps"));
                n.aps(r)
            }
            t.is("[auto-play]") ? n.playing = t.attr("auto-play") == "true" : n.playing = !0
        },
        r.playing = !1,
        r.clockwise = !0,
        r.play = function() {
            var e = this;
            e.playing = !0
        },
        r.pause = function() {
            var e = this;
            e.playing = !1
        },
        r.angleChanged = !1,
        r._angle = 0,
        r.angle = function(e) {
            var t = this;
            return typeof e == "number" && (e = e >= 0 ? e % 360 : 360 - Math.abs(e) % 360,
                    t._angle != e && (t._angle = e,
                        t.angleChanged = !0)),
                t._angle
        },
        r._aps = 0,
        r.aps = function(e) {
            var t = this;
            return isNaN(e) == 0 && e != t._aps && (t._aps = e,
                    t.needToRender(!0)),
                t._aps
        },
        r.update = function(n, r) {
            var i = this;
            e.prototype.update.call(i, n, r);
            if (i.playing) {
                var s = r * i.aps();
                i.angle(i.angle() + (i.clockwise ? 1 : -1) * s)
            }
            if (i.angleChanged) {
                i.angleChanged = !1;
                var o = i.angle() * (Math.PI / 180),
                    u = new t;
                u.a = Math.cos(o),
                    u.b = Math.sin(o),
                    u.c = -1 * u.b,
                    u.d = u.a,
                    u.tx = i.width() / 2 - u.a * i.width() / 2 - u.c * i.height() / 2,
                    u.ty = i.height() / 2 - u.b * i.width() / 2 - u.d * i.height() / 2,
                    u = u.concatWith(i.originalMat),
                    i.matrix(u)
            }
        },
        n
})
