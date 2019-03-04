define("movie", ["view", "assets_loader", "url_util", "event", "event_center"], function(e, t, n, r, i) {
    var s = function(e, t, n, r) {
        var i = this;
        i.frame = e,
            i.target = r instanceof Object ? r : null,
            i.action = t,
            i.params = n instanceof Array ? n : []
    };
    s.prototype.constructor = s,
        s.prototype.target = null,
        s.prototype.action = null,
        s.prototype.params = null,
        s.prototype.frame = NaN,
        s.prototype.execute = function() {
            var e = this;
            e.action.apply(e.target, e.params)
        };
    var o = function() {};
    return o.prototype = new e,
        o.prototype.constructor = o,
        o.prototype.className = "AXEMovie",
        o.prototype.dealloc = function() {
            var t = this;
            t._frames = null,
                e.prototype.dealloc.call(t)
        },
        o.prototype.clone = function() {
            var e = this,
                t = new o;
            return e.copyProperties(t),
                t
        },
        o.prototype.copyProperties = function(t) {
            var n = this;
            e.prototype.copyProperties.call(n, t),
                t._frames = n.frames().slice(),
                t.pauseWhenAnimating(n.pauseWhenAnimating()),
                t.frameRate(n.frameRate()),
                t.loop(n.loop()),
                t.backToFirst(n.backToFirst());
            if (n.actions() != null) {
                t._actions = {};
                var r = n.actions();
                for (var i in r)
                    r.hasOwnProperty(i) && (t._actions[i] = r[i])
            }
        },
        o.prototype.updatePropsFromXML = function(r) {
            var i = this;
            e.prototype.updatePropsFromXML.call(i, r);
            var s = r.find("> frame"),
                o = i.frames();
            s.each(function(e, r) {
                    var i = $(r),
                        s = i.is("[repeat]") ? parseInt(i.attr("repeat"), 10) : 1;
                    for (var u = 0; u < s; u++) {
                        var a = i.text(),
                            f = n.splitURLs(a);
                        i.is("[reverse]") && (f = f.reverse());
                        for (var l = 0; l < f.length; l++) {
                            var c = f[l];
                            o.push(t.asset(c))
                        }
                    }
                }),
                r.is("[pause-when-animating]") && i.pauseWhenAnimating(r.attr("pause-when-animating") === "true"),
                r.is("[fps]") && i.frameRate(parseFloat(r.attr("fps"))),
                i.loop(r.is("[loop]") ? String(r.attr("loop")).toLowerCase() == "true" : !0),
                i.backToFirst(r.is("[back]") ? String(r.attr("back")).toLowerCase() == "true" : !1);
            var u = r.find("> script");
            u.each(function(e, t) {
                var n = $(t),
                    r = n.attr("frame").toLowerCase(),
                    s;
                r == "first" ? s = 0 : r == "last" ? s = i.framesCount() - 1 : s = parseInt(r, 10);
                if (isNaN(s))
                    return;
                var o = n.attr("action"),
                    u = o.split(":"),
                    a = u[0],
                    f = i[a];
                if (typeof f != "function")
                    return;
                var l = [];
                if (u.length > 1) {
                    l = u[1].split(",");
                    for (var c = 0; c < l.length; c++) {
                        var h = parseFloat(l[c]);
                        if (isNaN(h) === !1)
                            l[c] = h;
                        else if (l[c] == "true" || l[c] == "false")
                            l[c] = l[c] == "true"
                    }
                }
                i.addAction(s, f, l, i)
            });
            var a = r.is("[auto-play]") ? String(r.attr("auto-play")).toLowerCase() == "true" : !0;
            a ? i.goToAndPlay(0) : i.goToAndStop(0)
        },
        o.prototype._actions = null,
        o.prototype.actions = function() {
            var e = this;
            return e._actions == null && (e._actions = {}),
                e._actions
        },
        o.prototype.frameActions = function(e) {
            var t = this,
                n = String(e),
                r = null;
            return t.actions().hasOwnProperty(n) && (r = t.actions()[n]),
                r
        },
        o.prototype.addAction = function(e, t, n, r) {
            var i = this,
                o = new s(e, t, n, r),
                u = i.frameActions(e);
            return u == null && (u = [],
                    i.actions()[String(e)] = u),
                u.push(o),
                o
        },
        o.prototype.removeAction = function(e) {
            var t = this,
                n = t.frameActions(e.frame);
            if (n != null)
                for (var r = 0; r < n.length; r++)
                    if (n[r] == e) {
                        n.splice(r, 1);
                        break
                    }
        },
        o.prototype.removeFrameAction = function(e) {
            var t = this,
                n = t.frameActions(e);
            n != null && delete t.actions()[String(e)]
        },
        o.prototype._backToFirst = !1,
        o.prototype.backToFirst = function(e) {
            var t = this;
            return arguments.length > 0 && (t._backToFirst = e),
                t._backToFirst
        },
        o.prototype._loop = !0,
        o.prototype.loop = function(e) {
            var t = this;
            return arguments.length > 0 && (t._loop = e),
                t._loop
        },
        o.prototype._finishAction = null,
        o.prototype.duration = function() {
            var e = this;
            return e.framesCount() / e.frameRate()
        },
        o.prototype.framesCount = function() {
            var e = this;
            return e.frames().length
        },
        o.prototype.addFramesByURL = function(e, r, i) {
            var s = this;
            i = isNaN(i) ? 1 : i,
                r = typeof r == "boolean" ? r : !1;
            var o = s.frames();
            for (var u = 0; u < i; u++) {
                var a = n.splitURLs(e);
                r && (a = a.reverse());
                for (var f = 0; f < a.length; f++) {
                    var l = a[f];
                    o.push(t.asset(l))
                }
            }
        },
        o.prototype._frames = null,
        o.prototype.frames = function(e) {
            var t = this;
            return arguments.length > 0 && e != null && (t._frames = e.slice(),
                    t.needToRender(!0)),
                t._frames == null && (t._frames = []),
                t._frames
        },
        o.prototype._frameRate = 24,
        o.prototype.frameRate = function(e) {
            var t = this;
            return isNaN(e) === !1 && (t._frameRate = e,
                    t.needToRender(!0)),
                t._frameRate
        },
        o.prototype.reverse = function() {
            var e = this,
                t = e.frames();
            t.reverse(),
                e.frames(t)
        },
        o.prototype.playing = !1,
        o.prototype.play = function() {
            var e = this;
            if (e.playing)
                return;
            e.playing = !0
        },
        o.prototype.stop = function() {
            var e = this;
            e.playing && (e.playing = !1)
        },
        o.prototype.goToAndStop = function(e) {
            var t = this;
            t.stop(),
                t._currentFrame = Math.max(0, Math.min(t.framesCount() - 1, e)),
                t.needToRender(!0)
        },
        o.prototype.goToAndPlay = function(e) {
            var t = this;
            t.goToAndStop(e),
                t.play(),
                t.needToRender(!0)
        },
        o.prototype._currentFrame = 0,
        o.prototype.currentFrame = function() {
            var e = this;
            return Math.floor(e._currentFrame)
        },
        o.prototype._pauseWhenAnimating = !1,
        o.prototype.pauseWhenAnimating = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._pauseWhenAnimating && (t._pauseWhenAnimating = e),
                t._pauseWhenAnimating
        },
        o.prototype.update = function(t, n) {
            var s = this;
            e.prototype.update.call(s, t, n);
            if (s.playing && (s.pauseWhenAnimating() === !1 || s.animating() === !1)) {
                var o = n * s.frameRate(),
                    u = Math.floor(s._currentFrame + o),
                    a = s.currentFrame(),
                    f = u - a,
                    l = s._currentFrame + o - u;
                for (var c = 0; c < f; c++) {
                    var h = s.currentFrame(),
                        p = s.frameActions(h);
                    if (p != null)
                        for (var d = 0; d < p.length; d++)
                            p[d].execute();
                    s._currentFrame = s.currentFrame() + 1,
                        s._currentFrame == s.framesCount() && (s.loop() ? s._currentFrame = 0 : (s._currentFrame = s.backToFirst() ? 0 : s.framesCount() - 1,
                                s.stop()),
                            i.dispatchEvent(new r(s, r.END))),
                        s.needToRender(!0),
                        i.dispatchEvent(new r(s, r.CHANGE));
                    if (s.playing == 0)
                        break
                }
                s.playing && (s._currentFrame = s.currentFrame() + l)
            }
        },
        o
})
