define("motion", ["jquery", "system", "view_container", "motion_layer", "event_center", "event"], function(e, t, n, r, i, s) {
    var o = function() {};
    o.prototype = new n;
    var u = o.prototype;
    return u.constructor = o,
        u.clone = function() {
            var e = this,
                t = new o;
            return e.copyProperties(t),
                t
        },
        u.copyProperties = function(e) {
            var t = this;
            n.prototype.copyProperties.call(t, e),
                e.layers = [];
            for (var r = 0; r < t.layers.length; r++) {
                var i = t.layers[r];
                e.layers.push(i.clone())
            }
            e._duration = t.duration(),
                e.loop(t.loop()),
                e.currentTime(t.currentTime()),
                e.updateFromTime(),
                e.play()
        },
        u.updatePropsFromXML = function(t) {
            var i = this;
            n.prototype.updatePropsFromXML.call(i, t),
                i.layers = [];
            var s = t.find("> layer");
            s.each(function(t, n) {
                    var s = e(n),
                        o = new r;
                    o.updateFromXML(s),
                        i.layers.push(o)
                }),
                i._duration = parseFloat(t.attr("duration")),
                i.loop(t.is("[loop]") ? t.attr("loop") == "true" : !0),
                t.is("[reverse]") && i.reverse(),
                t.is("[time]") ? i.currentTime(parseFloat(t.attr("time"))) : i.currentTime(0),
                i.updateFromTime(),
                t.is("[auto-play]") ? t.attr("auto-play") == "true" ? i.play() : i.pause() : i.play()
        },
        u.layers = null,
        u.layerContentByName = function(e) {
            var t = this,
                n = null;
            for (var r = 0; r < t.layers.length; r++) {
                var i = t.layers[r].contentView;
                if (i.name() == e) {
                    n = i;
                    break
                }
            }
            return n
        },
        u.isReverse = !1,
        u.reverse = function() {
            var e = this;
            for (var t = 0; t < e.layers.length; t++) {
                var n = e.layers[t];
                n.reverse()
            }
            e.currentTimeChanged = !0,
                e.updateFromTime(),
                e.isReverse = !e.isReverse
        },
        u._duration = 0,
        u.duration = function() {
            var e = this;
            return e._duration
        },
        u.currentTimeChanged = !0,
        u._currentTime = 0,
        u.currentTime = function(e) {
            var t = this;
            return isNaN(e) == 0 && t._currentTime != e && (t.loop() ? e -= Math.floor(e / t.duration()) * t.duration() : e = Math.min(t.duration(), Math.max(0, e)),
                    t._currentTime != e && (t._currentTime = e,
                        t.currentTimeChanged = !0,
                        t.updateFromTime())),
                t._currentTime
        },
        u.isPlaying = !1,
        u.pause = function() {
            var e = this;
            e.isPlaying = !1
        },
        u.play = function(e) {
            var t = this;
            t.currentTime(e),
                t.isPlaying = !0
        },
        u._loop = !1,
        u.loop = function(e) {
            var t = this;
            return typeof e == "boolean" && e != t._loop && (t._loop = e,
                    t.needToRender(!0)),
                t._loop
        },
        u.updateFromTime = function() {
            var e = this;
            if (e.currentTimeChanged) {
                e.currentTimeChanged = !1,
                    e.empty();
                for (var t = 0; t < e.layers.length; t++) {
                    var n = e.layers[t].contentWithTime(e.currentTime());
                    n != null && e.addSubView(n)
                }
            }
        },
        u.update = function(e, t) {
            var r = this;
            n.prototype.update.call(r, e, t);
            if (r.isPlaying) {
                var o = r.currentTime() + t;
                r.currentTime(r.currentTime() + t),
                    o >= r.duration() && (r.loop() == 0 && r.pause(),
                        i.dispatchEvent(new s(r, s.END)))
            }
        },
        u.dealloc = function() {
            var e = this;
            for (var t = 0; t < e.layers.length; t++)
                e.layers[t].dealloc();
            i.removeListener(e),
                n.prototype.dealloc.call(e)
        },
        o
})
