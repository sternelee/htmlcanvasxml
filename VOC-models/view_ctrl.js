define("view_ctrl", ["jquery", "view_container", "assets_loader", "event_center", "event", "progress_event", "error_event"], function(e, t, n, r, i, s, o) {
    var u = function(e) {
        var t = this;
        typeof e == "object" && t.initWithView(e)
    };
    return u.prototype.constructor = u,
        u.prototype.inited = !1,
        u.prototype.prepared = !1,
        u.prototype._view = null,
        u.prototype.view = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._view && (t._view != null && (t._view.controller = null),
                    t._view = e,
                    t._view.controller = t),
                t._view == null && (t._view = t.generateView(),
                    t._view.controller = t,
                    t.$viewXML != null && t.prepared && t._view.updatePropsFromXML(t.$viewXML)),
                t._view
        },
        u.prototype.generateView = function() {
            return new t
        },
        u.prototype._loadPercent = 0,
        u.prototype.loadPercent = function() {
            var e = this;
            return e._loadPercent
        },
        u.prototype.inited = !1,
        u.prototype.init = function() {
            var e = this;
            if (e.inited !== !1)
                throw new Error("View controller has init already.");
            e.inited = !0,
                e.prepared = !0,
                e._loadPercent = 1,
                e.onViewControllerPrepared()
        },
        u.prototype.initWithView = function(e) {
            var t = this;
            if (t.inited !== !1)
                throw new Error("View controller has init already.");
            t.view(e),
                t.init()
        },
        u.prototype.$viewXML = null,
        u.prototype.afterPrepared = function() {
            var e = this;
            e.inited = !0,
                e.prepared = !0,
                e._loadPercent = 1;
            if (e._view != null) {
                e._view.updatePropsFromXML(e.$viewXML),
                    e.onViewControllerPrepared();
                if (e._view.onStage) {
                    var t = e._view.stage();
                    e._view.resize(t.stageWidth(), t.stageHeight()),
                        e._view.onWindowOrientationChanged(t.orientation)
                }
            } else
                e.onViewControllerPrepared();
            r.dispatchEvent(new i(e, i.PREPARED))
        },
        u.prototype.initWithXML = function(t) {
            var n = this;
            if (n.inited !== !1)
                throw new Error("View controller has init already.");
            n._loadPercent = 0,
                n.inited = !0,
                n.prepared = !1,
                n.$viewXML = t;
            var r = n.$viewXML.find("asset");
            if (r.length <= 0)
                n.afterPrepared();
            else {
                var i = [];
                r.each(function(t, n) {
                        i.push(e(n).text())
                    }),
                    n.loadAssets(i)
            }
        },
        u.prototype.initWithURL = function(t) {
            var s = this;
            if (s.inited !== !1)
                throw new Error("View controller has init already.");
            var u = n.asset(t);
            if (u != null)
                s.initWithXML(u);
            else {
                s._loadPercent = 0,
                    s.inited = !0,
                    s.prepared = !1;
                var a = new n;
                r.addListener(a, s, [i.LOAD, o.ERROR], [function() {
                        s.$viewXML = n.asset(t);
                        var i = s.$viewXML.find("asset");
                        if (i.length <= 0)
                            s.afterPrepared();
                        else {
                            var o = [];
                            i.each(function(t, n) {
                                    o.push(e(n).text())
                                }),
                                s.loadAssets(o)
                        }
                        r.removeListener(a, s)
                    }, function(e) {
                        throw r.removeListener(a, s),
                            e.error
                    }]),
                    a.loadAssets(t)
            }
        },
        u.prototype.assets = null,
        u.prototype.loadAssets = function(e) {
            var t = this;
            t.assets = e;
            var u = new n;
            r.addListener(u, t, [i.LOAD, s.PROGRESS, o.ERROR], [function() {
                    t.afterPrepared(),
                        r.removeListener(u, t)
                }, function(e) {
                    t._loadPercent = e.percent,
                        t.onViewControllerProgress(t._loadPercent),
                        r.dispatchEvent(e.clone(t))
                }, function(e) {
                    throw r.removeListener(u, t),
                        e.error
                }]),
                u.loadAssets(e)
        },
        u.prototype.dealloc = function() {
            var e = this;
            e._view != null && (e._view.dealloc(),
                    e._view = null),
                e.inited = !1,
                e.assets != null && (n.releaseAssets(e.assets),
                    e.assets = null),
                r.removeListener(e)
        },
        u.prototype.onViewUpdateFromXML = function(e) {},
        u.prototype.onViewControllerPrepared = function() {},
        u.prototype.onViewControllerProgress = function(e) {},
        u.prototype.onViewAddToStage = function() {},
        u.prototype.onViewAdded = function(e) {},
        u.prototype.onViewRemoved = function(e) {},
        u.prototype.onViewRemoveFromStage = function() {},
        u.prototype.onViewStartAnimate = function() {},
        u.prototype.onViewEndAnimate = function() {},
        u.prototype.onViewUpdated = function(e, t) {},
        u.prototype.onViewDeactivate = function() {},
        u.prototype.onViewActivate = function() {},
        u.prototype.onViewResize = function(e, t) {},
        u.prototype.onWindowOrientationChanged = function(e) {},
        u
})
