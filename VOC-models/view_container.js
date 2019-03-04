define("view_container", ["view", "rect", "view_factory"], function(e, t, n) {
    var r = function() {};
    return r.prototype = new e,
        r.prototype.constructor = r,
        r.prototype.className = "AXEViewContainer",
        r.prototype.clone = function() {
            var e = this,
                t = new r;
            return e.copyProperties(t),
                t
        },
        r.prototype.copyProperties = function(t) {
            var n = this;
            e.prototype.copyProperties.call(n, t),
                t.muted(n.muted()),
                n.subViews().length > 0 && n.eachSubView(function(e, n) {
                    t.addSubView(n.clone())
                })
        },
        r.prototype.dealloc = function() {
            var t = this,
                n = t.subViews();
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.dealloc()
            }
            e.prototype.dealloc.call(t)
        },
        r.prototype.updatePropsFromXML = function(t) {
            var r = this;
            e.prototype.updatePropsFromXML.call(r, t),
                t.is("[muted]") && r.muted(t.attr("muted") == "true");
            var i = t.find("> *");
            i.each(function(e, t) {
                var i = $(t),
                    s = i[0].nodeName.toLowerCase(),
                    o = n.createViewByNodeName(s);
                o != null && (o.updatePropsFromXML(i),
                    r.addSubView(o))
            })
        },
        r.prototype.needToRender = function(t) {
            var n = this,
                r, i = n.subViews();
            if (arguments.length > 0)
                r = e.prototype.needToRender.call(n, t);
            else {
                r = e.prototype.needToRender.call(n);
                if (r === !1)
                    for (var s = 0; s < i.length; s++) {
                        var o = i[s];
                        if (o.needToRender()) {
                            r = !0;
                            break
                        }
                    }
            }
            return r
        },
        r.prototype._subViews = null,
        r.prototype.subViews = function() {
            var e = this;
            return e._subViews == null && (e._subViews = []),
                e._subViews
        },
        r.prototype.addSubView = function(e) {
            var t = this;
            e.parent() != null && e.parent().moveSubView(e),
                t.subViews().push(e),
                t.afterSubViewAdded(e)
        },
        r.prototype.insertSubViewAt = function(e, t) {
            var n = this;
            e.parent() != null && e.parent().moveSubView(e);
            var r = n.subViews();
            t = Math.max(0, Math.min(r.length - 1, t)),
                r.splice(t, 0, e),
                n.afterSubViewAdded(e)
        },
        r.prototype.afterSubViewAdded = function(e) {
            var t = this;
            e.parent(t),
                e.onAdd(t),
                t.onStage && e.onAddToStage(),
                e.active(t.active()),
                t.needToRender(!0)
        },
        r.prototype.onAddToStage = function() {
            var t = this;
            e.prototype.onAddToStage.call(t);
            for (var n = 0; n < t.subViews().length; n++) {
                var r = t.subViews()[n];
                r.onAddToStage()
            }
        },
        r.prototype.empty = function() {
            var e = this,
                t = e.subViews().slice(0);
            for (var n = 0; n < t.length; n++)
                e.removeSubView(t[n])
        },
        r.prototype.moveSubView = function(e) {
            var t = this,
                n = !1;
            if (e.parent() == t)
                for (var r = 0; r < t.subViews().length; r++) {
                    var i = t.subViews()[r];
                    if (i === e) {
                        t.subViews().splice(r, 1),
                            i.parent(null),
                            n = !0;
                        break
                    }
                }
            return n && t.needToRender(!0),
                n
        },
        r.prototype.removeSubView = function(e) {
            var t = this,
                n = t.moveSubView(e);
            n && e.onRemoveFromSuperView(t)
        },
        r.prototype.removeFromStage = function() {
            var t = this;
            e.prototype.removeFromStage.call(t),
                t.eachSubView(function(e, t) {
                    t.removeFromStage()
                })
        },
        r.prototype.indexOfSubView = function(e) {
            var t = this,
                n = -1;
            for (var r = 0; r < t.subViews().length; r++) {
                var i = t.subViews()[r];
                if (i === e) {
                    n = r;
                    break
                }
            }
            return n
        },
        r.prototype.subViewByIndex = function(e) {
            var t = this,
                n = null;
            return e >= 0 && e < t.subViews().length && (n = t.subViews()[e]),
                n
        },
        r.prototype.subViewByName = function(e) {
            var t = this,
                n = null;
            for (var r = 0; r < t.subViews().length; r++) {
                var i = t.subViews()[r];
                if (i.name() == e) {
                    n = i;
                    break
                }
            }
            return n
        },
        r.prototype.containsSubView = function(e) {
            var t = this,
                n = !1;
            return t.eachSubView(function(t, r) {
                    return r == e ? (n = !0, !1) : !0
                }),
                n
        },
        r.prototype.visibleSubViews = function() {
            var e = this,
                t = [],
                n = e.rect(e);
            for (var r = 0; r < e.subViews().length; r++) {
                var i = e.subViews()[r];
                if (i.visible()) {
                    var s = i.rect(e);
                    (e.clip() === !1 || n.intersect(s).isEmpty() === !1) && t.push(i)
                }
            }
            return t
        },
        r.prototype.eachSubView = function(e) {
            var t = this,
                n = t.subViews().slice();
            for (var r = 0; r < n.length; r++) {
                var i = n[r],
                    s = e.call(null, r, i);
                if (s === !1)
                    break
            }
        },
        r.prototype._muted = !1,
        r.prototype.muted = function(e) {
            var t = this;
            return typeof e == "boolean" && e != t._muted && (t._muted = e),
                t._muted
        },
        r.prototype.triggerSubViewEvent = function(e) {
            var t = this,
                n = !1,
                r = t.subViews();
            for (var i = r.length - 1; i >= 0; i--) {
                var s = r[i],
                    o = s.triggerEvent(e);
                if (o) {
                    n = o;
                    break
                }
            }
            return n
        },
        r.prototype.triggerEvent = function(t) {
            var n = this,
                r = !1;
            return n.muted() ? n.enabled() && n.animating() === !1 && n.visible() && (r = n.triggerSubViewEvent(t)) : (r = e.prototype.triggerEvent.call(n, t),
                    r && n.triggerSubViewEvent(t)),
                r
        },
        r.prototype.active = function(t) {
            var n = this,
                r = e.prototype.active.call(n, t);
            return n.eachSubView(function(e, t) {
                    t.active(r)
                }),
                r
        },
        r.prototype.onWindowOrientationChanged = function(t) {
            var n = this;
            e.prototype.onWindowOrientationChanged.call(n, t),
                n.eachSubView(function(e, n) {
                    n.onWindowOrientationChanged(t)
                })
        },
        r.prototype.resize = function(t, n) {
            var r = this;
            e.prototype.resize.call(r, t, n),
                r.eachSubView(function(e, r) {
                    r.resize(t, n)
                })
        },
        r.prototype.onAnimationStart = function() {
            var t = this;
            e.prototype.onAnimationStart.call(t);
            var n = t.subViews();
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.onAnimationStart()
            }
        },
        r.prototype.onAnimationStop = function() {
            var t = this;
            e.prototype.onAnimationStop.call(t);
            var n = t.subViews();
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.onAnimationStop()
            }
        },
        r.prototype.update = function(t, n) {
            var r = this;
            e.prototype.update.call(r, t, n);
            if (r.cachedImage == null) {
                var i = r.subViews();
                for (var s = 0; s < i.length; s++) {
                    var o = i[s];
                    o.visible() && o.update(t, n)
                }
            }
        },
        r
})
