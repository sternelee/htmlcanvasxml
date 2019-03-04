define("motion_layer", ["motion_frame", "mat3", "view_factory", "color", "vec2"], function(e, t, n, r, i) {
    var s = function() {},
        o = s.prototype;
    return o.constructor = s,
        o.contentView = null,
        o.updateFromXML = function(t) {
            var r = this,
                i = t.find("> content > *");
            if (i.length > 0) {
                var s = i[0].nodeName.toLowerCase();
                r.contentView = n.createViewByNodeName(s),
                    r.contentView != null && r.contentView.updatePropsFromXML(i)
            } else
                r.content = null;
            r.frames = [];
            var o = t.find("> frame");
            o.each(function(t, n) {
                var i = $(n),
                    s = new e;
                s.updateFromXML(i),
                    r.frames.push(s)
            })
        },
        o.calculateValue = function(e, t, n, r, i) {
            return e + (t - e) * i(n, 0, 1, r)
        },
        o.frames = null,
        o.calculateRotation = function(e, n, r) {
            var s = new i(e.width() / 2, e.height() / 2),
                o = new t;
            return o.a = Math.cos(r),
                o.b = Math.sin(r),
                o.c = -1 * o.b,
                o.d = o.a,
                o.tx = n.x - o.a * s.x - o.c * s.y,
                o.ty = n.y - o.b * s.x - o.d * s.y,
                o
        },
        o.contentWithTime = function(e) {
            var n = this,
                s = null,
                o = null;
            for (var u = n.frames.length - 1; u >= 0; u--) {
                var a = n.frames[u];
                if (a.time <= e) {
                    s = a,
                        u < n.frames.length - 1 && (o = n.frames[u + 1]);
                    break
                }
            }
            var f = null;
            if (s != null && s.isBlank == 0) {
                f = n.contentView;
                if (s.tween == null || o == null)
                    f.alpha(s.alpha),
                    s.bgColor != null && f.bgColor(s.bgColor),
                    s.rotation != null ? f.matrix(n.calculateRotation(f, new i(s.x, s.y), s.rotation)) : f.matrix(s.matrix),
                    f.goToAndPlay != undefined && isNaN(s.frame) == 0 && (o != null && isNaN(o.frame) == 0 ? f.goToAndStop(s.frame) : f.goToAndPlay(s.frame));
                else {
                    var l = o.time - s.time,
                        c = e - s.time;
                    if (s.bgColor != null && o.bgColor != null) {
                        var h = new r;
                        h.r(n.calculateValue(s.bgColor.r(), o.bgColor.r(), c, l, s.tween)),
                            h.g(n.calculateValue(s.bgColor.g(), o.bgColor.g(), c, l, s.tween)),
                            h.b(n.calculateValue(s.bgColor.b(), o.bgColor.b(), c, l, s.tween)),
                            h.a(n.calculateValue(s.bgColor.a(), o.bgColor.a(), c, l, s.tween)),
                            f.bgColor(h)
                    }
                    var p = n.calculateValue(s.alpha, o.alpha, c, l, s.tween);
                    f.alpha(p);
                    if (f.goToAndStop != undefined && isNaN(s.frame) == 0 && isNaN(o.frame) == 0) {
                        var d = Math.floor(n.calculateValue(s.frame, o.frame, c, l, s.tween));
                        f.goToAndStop(d)
                    }
                    if (s.rotation != null && o.rotation != null) {
                        var v = n.calculateValue(s.rotation.rotation, o.rotation.rotation, c, l, s.tween);
                        f.matrix(n.calculateRotation(f, new i(s.rotation.x, s.rotation.y), v))
                    } else {
                        var m = s.matrix,
                            g = o.matrix,
                            y = new t;
                        y.a = n.calculateValue(m.a, g.a, c, l, s.tween),
                            y.b = n.calculateValue(m.b, g.b, c, l, s.tween),
                            y.c = n.calculateValue(m.c, g.c, c, l, s.tween),
                            y.d = n.calculateValue(m.d, g.d, c, l, s.tween),
                            y.tx = n.calculateValue(m.tx, g.tx, c, l, s.tween),
                            y.ty = n.calculateValue(m.ty, g.ty, c, l, s.tween),
                            f.matrix(y)
                    }
                }
            }
            return f
        },
        o.reverse = function() {
            var e = this,
                t = e.frames.slice(),
                n = [];
            for (var r = 0; r < t.length; r++) {
                var i = t[r];
                n.push(i.time)
            }
            t = t.reverse();
            for (var s = 0; s < t.length; s++) {
                var o = t[s];
                o.time = n[s]
            }
            e.frames = t
        },
        o.clone = function() {
            var e = this,
                t = new s;
            e.contentView != null && (t.contentView = e.contentView.clone()),
                t.frames = [];
            for (var n = 0; n < e.frames.length; n++) {
                var r = e.frames[n];
                t.frames.push(r)
            }
            return t
        },
        o.dealloc = function() {
            var e = this;
            e.contentView.dealloc(),
                e.contentView = null;
            for (var t = 0; t < e.frames.length; t++)
                e.frames[t].dealloc();
            e.frames = null
        },
        s
})
