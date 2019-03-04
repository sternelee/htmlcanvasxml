define("head_kv", ["kv_motion", "button_group", "event_center", "event", "system", "vec2", "movie", "audio_ctrl"], function(e, t, n, r, i, s, o, u) {
    var a = function(e, t, n, r, i, s, o) {
        var u = this;
        u.name = e,
            u.motionIndex = t,
            u.beginFrame = n,
            u.endFrame = r,
            u.x = i,
            u.y = s,
            u.reversion = typeof o == "boolean" ? o : !1,
            u.toNodes = []
    };
    a.prototype.constructor = a,
        a.prototype.name = null,
        a.prototype._soundEffect = null,
        a.prototype.soundEffect = function(e) {
            var t = this;
            return typeof e == "string" && (t._soundEffect = new u(e, !1)),
                t._soundEffect
        },
        a.prototype.motionIndex = 0,
        a.prototype.beginFrame = 0,
        a.prototype.endFrame = 0,
        a.prototype.reversion = !1,
        a.prototype.x = 0,
        a.prototype.y = 0,
        a.prototype.distance = function(e) {
            var t = this,
                n = new s(t.x, t.y),
                r = new s(e.x, e.y);
            return n.distance(r)
        },
        a.prototype.toNodes = null,
        a.prototype.addToNodes = function(e) {
            var t = this;
            for (var n = 0; n < arguments.length; n++)
                t.toNodes.push(arguments[n])
        },
        a.prototype.getMotionFrames = function(e) {
            var t = this,
                n = e[t.motionIndex],
                r = n.frames().slice(t.beginFrame, t.endFrame + 1);
            return t.reversion && (r = r.reverse()),
                r
        },
        a.prototype.reverse = function() {
            var e = this,
                t = new a(e.name, e.motionIndex, e.beginFrame, e.endFrame, e.x, e.y, !e.reversion);
            return t.toNodes = e.toNodes.slice(),
                t
        };
    var f = new a("DEF_LOOP", 0, 0, 14, 0, 0),
        l = new a("DEF_TRANSITION", 0, 15, 28, 0, 1),
        c = l.reverse(),
        h = new a("MC1_TRANSITION", 1, 0, 6, 0, 2),
        p = h.reverse(),
        d = new a("MC1_LOOP", 1, 7, 20, 0, 3);
    h.soundEffect("sounds/head_1.mp3");
    var v = new a("MC2_TRANSITION", 2, 0, 6, 1, 2),
        m = v.reverse(),
        g = new a("MC2_LOOP", 2, 7, 20, 1, 3);
    v.soundEffect("sounds/head_2.mp3");
    var y = new a("MC3_TRANSITION", 3, 0, 6, 2, 2),
        b = y.reverse(),
        w = new a("MC3_LOOP", 3, 7, 20, 2, 3);
    y.soundEffect("sounds/head_3.mp3");
    var E = new a("MC4_TRANSITION", 4, 0, 6, 3, 2),
        S = E.reverse(),
        x = new a("MC4_LOOP", 4, 7, 20, 3, 3);
    E.soundEffect("sounds/head_4.mp3"),
        f.addToNodes(l),
        l.addToNodes(h, v, y, E),
        c.addToNodes(l, f),
        h.addToNodes(d),
        p.addToNodes(c),
        d.addToNodes(p),
        v.addToNodes(g),
        m.addToNodes(c),
        g.addToNodes(m),
        y.addToNodes(w),
        b.addToNodes(c),
        w.addToNodes(b),
        E.addToNodes(x),
        S.addToNodes(c),
        x.addToNodes(S);
    var T = [];
    T.push(f, l, c, d, h, p, g, v, m, w, y, b, x, E, S);
    var N = function() {};
    return N.prototype = new e,
        N.prototype.constructor = N,
        N.prototype.sounds = null,
        N.prototype.currentSound = null,
        N.prototype.initialize = function() {
            var e = this;
            e.initWithURL("views/head.xml"),
                e.sounds = [],
                e.sounds.push(new u("sounds/head_1.mp3", !1), new u("sounds/head_2.mp3", !1), new u("sounds/head_3.mp3", !1), new u("sounds/head_4.mp3", !1))
        },
        N.prototype.motionBox = null,
        N.prototype.motions = null,
        N.prototype.kvButtons = null,
        N.prototype.kvMovie = null,
        N.prototype.onViewControllerPrepared = function() {
            var e = this;
            e.motionBox = e.view().subViewByName("motion_box"),
                e.motions = e.motionBox.subViews().slice(),
                e.motionBox.empty(),
                e.kvMovie = new o,
                e.kvMovie.name("head_kv"),
                e.kvMovie.width(e.motionBox.width()),
                e.kvMovie.height(e.motionBox.height()),
                e.kvMovie.frameRate(20),
                e.kvMovie.loop(!1),
                e.motionBox.addSubView(e.kvMovie),
                n.addListener(e.kvMovie, e, r.END, e.onKVMovieEnd),
                e.kvButtons = new t,
                e.kvButtons.cancelable = !0,
                e.kvButtons.addButtons([e.view().subViewByName("btn_1"), e.view().subViewByName("btn_2"), e.view().subViewByName("btn_3"), e.view().subViewByName("btn_4")]),
                n.addListener(e.kvButtons, e, r.CHANGE, e.onKVButtonsChange),
                e.actions = [],
                e.currentNode(f)
        },
        N.prototype.onViewAddToStage = function() {
            var e = this;
            e.prepared && (e.actions = [],
                e._currentNode = null,
                e.currentNode(f),
                e.kvButtons.cancelSelect())
        },
        N.prototype.onViewRemoveFromStage = function() {
            var e = this;
            e.prepared && e.currentSound != null && (e.currentSound.pause(),
                e.currentSound = null)
        },
        N.prototype._currentNode = null,
        N.prototype.currentNode = function(e) {
            var t = this;
            if (Boolean(e)) {
                var n = t._currentNode;
                t._currentNode = e;
                var r = null;
                n != null && n.name == t._currentNode.name ? (r = t._currentNode.getMotionFrames(t.motions),
                        n.reversion == t._currentNode.reversion ? r = r.slice(t.kvMovie.currentFrame(), r.length) : r = r.slice(r.length - (t.kvMovie.currentFrame() - 1), r.length)) : r = t._currentNode.getMotionFrames(t.motions),
                    r.length <= 0 ? t.onKVMovieEnd() : (t.kvMovie.frames(r),
                        t.kvMovie.goToAndPlay(0))
            }
            return t._currentNode
        },
        N.prototype.actions = null,
        N.prototype.onKVMovieEnd = function() {
            var e = this,
                t = null;
            if (e.actions.length > 0) {
                t = e.actions.shift();
                var n = t.soundEffect();
                n != null && (e.currentSound != null && (e.currentSound.pause(),
                        e.currentSound = null),
                    e.currentSound = n,
                    e.currentSound.play(0))
            } else
                t = e._currentNode;
            e._currentNode = null,
                e.currentNode(t)
        },
        N.prototype.onKVButtonsChange = function() {
            var e = this;
            e.currentSound != null && (e.currentSound.pause(),
                e.currentSound = null);
            var t = null;
            switch (e.kvButtons.selectedIndex()) {
                case -1:
                    t = f;
                    break;
                case 0:
                    t = d;
                    break;
                case 1:
                    t = g;
                    break;
                case 2:
                    t = w;
                    break;
                case 3:
                    t = x
            }
            e.actions = e.createPathFromNodeName(e._currentNode.name, t),
                e.currentNode(e.actions.shift())
        },
        N.prototype.createPathFromNodes = function(e, t) {
            var n = this,
                r = null,
                i = e.toNodes.slice();
            while (r == null && i.length > 0) {
                var s = null,
                    o = -1;
                for (var u = 0; u < i.length; u++) {
                    var a = i[u];
                    if (a == t) {
                        r = [e, a];
                        break
                    }
                    if (s == null || s.distance(t) > a.distance(t))
                        s = a,
                        o = u
                }
                if (r == null) {
                    i.splice(o, 1);
                    var f = n.createPathFromNodes(s, t);
                    f != null && (r = [e].concat(f))
                }
            }
            return r
        },
        N.prototype.createPathFromNodeName = function(e, t) {
            var n = this,
                r = null;
            for (var i = 0; i < T.length; i++) {
                var s = T[i];
                if (s.name == e) {
                    var o = n.createPathFromNodes(s, t);
                    if (r == null || o.length < r.length)
                        r = o
                }
            }
            return r
        },
        N
})
