define("view", ["jquery", "mat3", "rect", "vec2", "paths", "animate", "color", "event", "event_center", "touch", "touch_event", "scale_mode", "align_mode"], function(e, t, n, r, i, s, o, u, a, f, l, c, h) {
    var p = function() {};
    return p.viewIndex = 0,
        p.issueViewName = function(e) {
            var t = e + "_" + p.viewIndex;
            return p.viewIndex += 1,
                t
        },
        p.prototype.className = "AXEView",
        p.prototype.controller = null,
        p.prototype.dealloc = function() {
            var e = this;
            e._matrix = null,
                e._mask = null,
                e.remove(),
                a.removeListener(e)
        },
        p.prototype.clone = function() {
            var e = this,
                t = new p;
            return e.copyProperties(t),
                t
        },
        p.prototype.copyProperties = function(e) {
            var t = this;
            e.name(t.name()),
                e.width(t.width()),
                e.height(t.height()),
                e.alpha(t.alpha()),
                e.scaleMode(t.scaleMode()),
                e.alignMode(t.alignMode()),
                t.bgColor() != null && e.bgColor(t.bgColor().clone()),
                t.shadowColor() != null && e.shadowColor(t.shadowColor().clone()),
                e.shadowOffsetX(t.shadowOffsetX()),
                e.shadowOffsetY(t.shadowOffsetY()),
                e.shadowBlur(t.shadowBlur()),
                e.blendMode(t.blendMode()),
                e.enabled(t.enabled()),
                e.visible(t.visible()),
                e.clip(t.clip()),
                t.mask() != null && e.mask(t.mask().clone()),
                e.matrix(t.matrix())
        },
        p.prototype.updatePropsFromXML = function(e) {
            var n = this;
            n.name(e.is("[name]") ? e.attr("name") : null),
                n.width(e.is("[width]") ? parseFloat(e.attr("width")) : 0),
                n.height(e.is("[height]") ? parseFloat(e.attr("height")) : 0),
                n.alpha(e.is("[alpha]") ? parseFloat(e.attr("alpha")) : 1),
                e.is("[sat]") && n.saturation(parseFloat(e.attr("sat"))),
                e.is("[bg-color]") && n.bgColor(o.colorWithString(e.attr("bg-color"))),
                e.is("[shadow-color]") && n.shadowColor(o.colorWithString(e.attr("shadow-color"))),
                e.is("[shadow-x]") && n.shadowOffsetX(parseFloat(e.attr("shadow-x"))),
                e.is("[shadow-y]") && n.shadowOffsetY(parseFloat(e.attr("shadow-y"))),
                e.is("[shadow-blur]") && n.shadowBlur(parseInt(e.attr("shadow-blur"), 10)),
                n.blendMode(e.is("blend") ? e.attr("blend") : n._blendMode),
                n.enabled(e.is("[enabled]") ? e.attr("enabled") == "true" : !0),
                n.visible(e.is("[visible]") ? String(e.attr("visible")).toLowerCase() === "true" : !0),
                n.clip(e.is("[clip]") ? String(e.attr("clip")).toLowerCase() === "true" : !1);
            var r = e.find("> mask");
            if (r.length > 0) {
                var s = new i;
                s.addCommand(r.text()),
                    n.mask(s)
            } else
                n.mask(null);
            var u = new t;
            if (e.is("[matrix]")) {
                var a = e.attr("matrix").split(",");
                u.a = parseFloat(a[0]),
                    u.b = parseFloat(a[1]),
                    u.c = parseFloat(a[2]),
                    u.d = parseFloat(a[3]),
                    u.tx = parseFloat(a[4]),
                    u.ty = parseFloat(a[5])
            } else {
                var f = e.is("[scale-x]") ? parseFloat(e.attr("scale-x")) : 1,
                    l = e.is("[scale-y]") ? parseFloat(e.attr("scale-y")) : 1,
                    p = e.is("[rotation]") ? parseFloat(e.attr("rotation")) * (Math.PI / 180) : 0,
                    d = e.is("[x]") ? parseFloat(e.attr("x")) : 0,
                    v = e.is("[y]") ? parseFloat(e.attr("y")) : 0;
                u.a = f * Math.cos(p),
                    u.b = Math.sin(p),
                    u.c = -1 * Math.sin(p),
                    u.d = l * Math.cos(p),
                    u.tx = d,
                    u.ty = v
            }
            n.matrix(u);
            if (e.is("[align]")) {
                var m = h[e.attr("align")];
                n.alignMode(m)
            }
            if (e.is("[scale-mode]")) {
                var g = e.attr("scale-mode");
                typeof c[g] == "function" && n.scaleMode(c[g])
            }
            n.controller != null && n.controller.onViewUpdateFromXML(e)
        },
        p.prototype.cachedImage = null,
        p.prototype._name = null,
        p.prototype.name = function(e) {
            var t = this;
            return arguments.length > 0 && (t._name = e),
                t._name == null && (t._name = p.issueViewName(t.className)),
                t._name
        },
        p.prototype.pathname = function() {
            var e = this,
                t = [],
                n = e;
            do
                t.unshift(n.name()),
                n = n.parent();
            while (n != null);
            return t.join(".")
        },
        p.prototype._needToRender = !1,
        p.prototype.needToRender = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._needToRender && (t._needToRender = e),
                t._needToRender
        },
        p.prototype._scaleMode = null,
        p.prototype.scaleMode = function(e) {
            var t = this;
            if (arguments.length > 0 && t._scaleMode != e) {
                t._scaleMode = e;
                var n = t.stage();
                n != null && t.resize(n.stageWidth(), n.stageHeight())
            }
            return t._scaleMode
        },
        p.prototype._alignMode = null,
        p.prototype.alignMode = function(e) {
            var t = this;
            if (arguments.length > 0 && t._alignMode != e) {
                t._alignMode = e;
                var n = t.stage();
                n != null && t.resize(n.stageWidth(), n.stageHeight())
            }
            return t._alignMode
        },
        p.prototype.x = function(e) {
            var t = this;
            if (arguments.length > 0) {
                var n = t.matrix().clone();
                n.tx = e,
                    t.matrix(n)
            }
            return t.matrix().tx
        },
        p.prototype.y = function(e) {
            var t = this;
            if (arguments.length > 0) {
                var n = t.matrix().clone();
                n.ty = e,
                    t.matrix(n)
            }
            return t.matrix().ty
        },
        p.prototype.scaleX = function(e) {
            var t = this,
                n = t.matrix(),
                r = t.radian(),
                i = n.a / Math.cos(r);
            return arguments.length > 0 && (i = e,
                    n = n.clone(),
                    n.a = i * Math.cos(r),
                    t.matrix(n)),
                i
        },
        p.prototype.scaleY = function(e) {
            var t = this,
                n = t.matrix(),
                r = t.radian(),
                i = n.d / Math.cos(r);
            return arguments.length > 0 && (i = e,
                    n = n.clone(),
                    n.d = i * Math.cos(r),
                    t.matrix(n)),
                i
        },
        p.prototype.rotation = function(e) {
            var t = this,
                n = 0;
            if (arguments.length > 0) {
                n = e;
                var r = e * (Math.PI / 180);
                t.radian(r)
            } else
                n = t.radian() * (180 / Math.PI);
            return n
        },
        p.prototype.radian = function(e) {
            var t = this,
                n = t.matrix(),
                r = Math.asin(n.b);
            n.b > 0 && n.a < 0 ? r = Math.PI - r : n.b < 0 && n.a < 0 ? r = Math.PI - r : n.b < 0 && n.a > 0 && (r = Math.PI * 2 + r);
            if (arguments.length > 0) {
                var i = n.a / Math.cos(r);
                r = e,
                    n = n.clone(),
                    n.a = i * Math.cos(r),
                    n.b = Math.sin(r),
                    n.c = -1 * n.b,
                    n.d = n.a,
                    t.matrix(n)
            }
            return r
        },
        p.prototype._matrix = null,
        p.prototype.matrix = function(e) {
            var n = this;
            return arguments.length > 0 && (n._matrix = e.clone(),
                    n.needToRender(!0)),
                n._matrix == null && (n._matrix = new t),
                n._matrix
        },
        p.prototype._width = 0,
        p.prototype.width = function(e) {
            var t = this;
            return isNaN(e) == 0 && t._width != e && (t._width = e,
                    t.needToRender(!0)),
                t._width
        },
        p.prototype._height = 0,
        p.prototype.height = function(e) {
            var t = this;
            return isNaN(e) == 0 && t._height != e && (t._height = e,
                    t.needToRender(!0)),
                t._height
        },
        p.prototype._alpha = 1,
        p.prototype.alpha = function(e) {
            var t = this;
            return arguments.length > 0 && t._alpha != e && (t._alpha = e,
                    t.needToRender(!0)),
                t._alpha
        },
        p.prototype._saturation = 1,
        p.prototype.saturation = function(e) {
            var t = this;
            return isNaN(e) == 0 && (e = Math.max(0, Math.min(1, e)),
                    e != t._saturation && (t._saturation = e,
                        t.needToRender(!0))),
                t._saturation
        },
        p.prototype._bgColor = null,
        p.prototype.bgColor = function(e) {
            var t = this;
            return arguments.length > 0 && (t._bgColor = Boolean(e) ? e.clone() : null,
                    t.needToRender(!0)),
                t._bgColor
        },
        p.prototype._clip = !1,
        p.prototype.clip = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._clip && (t._clip = e,
                    t.needToRender(!0)),
                t._clip
        },
        p.prototype._mask = null,
        p.prototype.mask = function(e) {
            var t = this;
            return arguments.length > 0 && (t._mask = e,
                    t.needToRender(!0)),
                t._mask
        },
        p.prototype._shadowOffsetX = 0,
        p.prototype.shadowOffsetX = function(e) {
            var t = this;
            return isNaN(parseFloat(e)) === !1 && parseFloat(e) != t._shadowOffsetX && (t._shadowOffsetX = parseFloat(e),
                    t.needToRender(!0)),
                t._shadowOffsetX
        },
        p.prototype._shadowOffsetY = 0,
        p.prototype.shadowOffsetY = function(e) {
            var t = this;
            return isNaN(parseFloat(e)) === !1 && parseFloat(e) != t._shadowOffsetY && (t._shadowOffsetY = parseFloat(e),
                    t.needToRender(!0)),
                t._shadowOffsetY
        },
        p.prototype._shadowColor = null,
        p.prototype.shadowColor = function(e) {
            var t = this;
            return arguments.length > 0 && typeof e == "object" && (t._shadowColor = e,
                    t.needToRender(!0)),
                t._shadowColor
        },
        p.prototype._shadowBlur = 0,
        p.prototype.shadowBlur = function(e) {
            var t = this;
            return arguments.length > 0 && isNaN(parseInt(e, 10)) === !1 && parseInt(e, 10) != t._shadowBlur && (t._shadowBlur = e,
                    t.needToRender(!0)),
                t._shadowBlur
        },
        p.prototype._blendMode = "source-over",
        p.prototype.blendMode = function(e) {
            var t = this;
            return typeof e == "string" && (t._blendMode = e,
                    t.needToRender(!0)),
                t._blendMode
        },
        p.prototype._visible = !0,
        p.prototype.visible = function(e) {
            var t = this;
            return typeof e == "boolean" && e != t._visible && (t._visible = e,
                    t.needToRender(!0)),
                t._visible
        },
        p.prototype._parent = null,
        p.prototype.parent = function(e) {
            var t = this;
            return arguments.length > 0 && (t._parent = e),
                t._parent
        },
        p.prototype.remove = function() {
            var e = this;
            e.parent() != null && e.parent().removeSubView(e)
        },
        p.prototype._enabled = !0,
        p.prototype.enabled = function(e) {
            var t = this;
            return typeof e == "boolean" && e != t._enabled && (t._enabled = e,
                    t.lastEvent = null),
                t._enabled
        },
        p.prototype.matrixTo = function(e) {
            var n = this,
                r = null;
            if (arguments.length > 0) {
                var i = e,
                    s = new t,
                    o = new t;
                while (i != null && r == null) {
                    var u = n;
                    while (u != null) {
                        if (i == u) {
                            var a = o.inversion();
                            r = s.concatWith(a);
                            break
                        }
                        s = s.concatWith(u.matrix()),
                            u = u.parent()
                    }
                    o = o.concatWith(i.matrix()),
                        i = i.parent()
                }
            } else
                r = new t;
            return r
        },
        p.prototype.rect = function(e) {
            var t = this,
                i = new r(0, 0),
                s = new r(t.width(), 0),
                o = new r(0, t.height()),
                u = new r(t.width(), t.height()),
                a = arguments.length > 0 ? t.matrixTo(e) : t.matrixTo(),
                f = null;
            if (a != null) {
                var l = a.transformPoint(i),
                    c = a.transformPoint(s),
                    h = a.transformPoint(o),
                    p = a.transformPoint(u),
                    d = Math.min(l.x, c.x, h.x, p.x),
                    v = Math.max(l.x, c.x, h.x, p.x),
                    m = Math.min(l.y, c.y, h.y, p.y),
                    g = Math.max(l.y, c.y, h.y, p.y);
                f = new n(d, m, v - d, g - m)
            }
            return f
        },
        p.prototype.convertTouches = function(e) {
            var t = this,
                n = [],
                i = t.matrixTo(e.target);
            for (var s = 0; s < e.touches.length; s++) {
                var o = new r(e.touches[s].x, e.touches[s].y);
                o = i.inversePoint(o);
                var u = new f(o.x, o.y, e.touches[s].stageX, e.touches[s].stageY);
                n.push(u)
            }
            return n
        },
        p.prototype.lastEvent = null,
        p.prototype.startEvent = null,
        p.prototype.triggerEvent = function(e) {
            var t = this,
                n = !1;
            if (t.enabled() && t.visible()) {
                var i = t.animating();
                if (e.type == l.TOUCH_START) {
                    var s = t.rect(e.target),
                        o = e.touches[0],
                        u = new r(o.x, o.y);
                    if (t.className == "AXEStage" || s.containsVec2(u))
                        n = !0,
                        i === !1 && (t.lastEvent = new l(t, e.type, t.convertTouches(e)),
                            t.startEvent = t.lastEvent,
                            a.dispatchEvent(t.lastEvent))
                } else if (e.type == l.TOUCH_MOVE)
                    t.lastEvent != null && (n = !0,
                        t.lastEvent = new l(t, e.type, t.convertTouches(e)),
                        a.dispatchEvent(t.lastEvent));
                else if (e.type == l.TOUCH_END && t.lastEvent != null) {
                    var f = t.lastEvent,
                        c = t.startEvent;
                    t.lastEvent = null,
                        t.startEvent = null,
                        n = !0,
                        a.dispatchEvent(new l(t, e.type, [])),
                        f.type == l.TOUCH_START && a.dispatchEvent(new l(t, l.CLICK, f.touches));
                    if (f.type == l.TOUCH_MOVE && f.timeStamp - c.timeStamp < 500 && f.touches.length <= 1 && c.touches.length <= 1) {
                        var h = new r(c.touches[0].stageX, c.touches[0].stageY),
                            p = new r(f.touches[0].stageX, f.touches[0].stageY);
                        h.distance(p) > 30 && Math.abs(c.timeStamp - f.timeStamp) < 500 && a.dispatchEvent(new l(t, l.SWIPE, [c.touches[0], f.touches[0]]))
                    }
                }
            }
            return n
        },
        p.prototype.animateChangeFlag = !1,
        p.prototype.objAnimate = null,
        p.prototype._animating = !1,
        p.prototype.animating = function(e) {
            var t = this;
            typeof e == "boolean" && (t._animating = e);
            var n = t._animating;
            return n === !1 && t.parent() != null && (n = t.parent().animating()),
                n
        },
        p.prototype.animate = function(e, t, n, r, i) {
            var o = this;
            o.objAnimate = new s(o, e, t, n, r, i),
                o.animateChangeFlag = !0
        },
        p.prototype.stopAnimation = function(e) {
            var t = this;
            t.objAnimate != null && (e = arguments.length >= 1 ? e : !1,
                t._animating && e && t.objAnimate.jumpToEnd(),
                t.animating(!1),
                t.animateChangeFlag = !1,
                t.objAnimate = null,
                t.onAnimationStop())
        },
        p.prototype.onAnimationStart = function() {
            var e = this;
            e.controller != null && e.controller.onViewStartAnimate();
            var t = new u(e, u.ANIMATION_BEGIN);
            a.dispatchEvent(t)
        },
        p.prototype.onAnimationStop = function() {
            var e = this;
            e.controller != null && e.controller.onViewEndAnimate();
            var t = new u(e, u.ANIMATION_END);
            a.dispatchEvent(t)
        },
        p.prototype.onAdd = function(e) {
            var t = this;
            t.controller != null && t.controller.onViewAdded(e);
            var n = new u(t, u.ADDED);
            a.dispatchEvent(n)
        },
        p.prototype.removeFromStage = function() {
            var e = this;
            e.lastEvent = null,
                e.startEvent = null,
                e.controller != null && e.controller.onViewRemoveFromStage();
            var t = new u(e, u.REMOVE_FROM_STAGE);
            a.dispatchEvent(t)
        },
        p.prototype.onRemoveFromSuperView = function(e) {
            var t = this;
            t.lastEvent = null,
                t.startEvent = null,
                t.controller != null && t.controller.onViewRemoved(e);
            var n = new u(t, u.REMOVED);
            a.dispatchEvent(n),
                t.removeFromStage()
        },
        p.prototype.stage = function() {
            var e = this;
            while (e != null && e.className != "AXEStage")
                e = e.parent();
            return e
        },
        p.prototype.onStage = !1,
        p.prototype.onAddToStage = function() {
            var e = this;
            e.onStage = !0,
                e.lastEvent = null,
                e.startEvent = null,
                e.controller != null && e.controller.onViewAddToStage();
            var t = new u(e, u.ADD_TO_STAGE);
            a.dispatchEvent(t);
            var n = e.stage();
            n != null && (e.onWindowOrientationChanged(n.orientation),
                e.resize(n.stageWidth(), n.stageHeight()))
        },
        p.prototype.onWindowOrientationChanged = function(e) {
            var t = this;
            t.windowOrientationChange(e),
                t.controller != null && t.controller.onWindowOrientationChanged(e)
        },
        p.prototype.windowOrientationChange = function(e) {},
        p.prototype._active = !0,
        p.prototype.active = function(e) {
            var t = this;
            return e != undefined && t._active != e && (t._active = e,
                    t._active ? (t.onActivate(),
                        t.controller != null && t.controller.onViewActivate()) : (t.onDeactivate(),
                        t.controller != null && t.controller.onViewDeactivate())),
                t._active
        },
        p.prototype.onActivate = function() {},
        p.prototype.onDeactivate = function() {},
        p.prototype.resize = function(e, t) {
            var n = this;
            if (n.alignMode() != null && n.scaleMode() != null) {
                var r = n.alignMode(),
                    i = n.scaleMode(),
                    s = i(n.width(), n.height(), e, t, r);
                n.matrix(s)
            }
            n.controller != null && n.controller.onViewResize(e, t);
            var o = new u(n, u.RESIZE);
            a.dispatchEvent(o)
        },
        p.prototype.update = function(e, t) {
            var n = this;
            n.animateChangeFlag && (n.animateChangeFlag = !1,
                n.objAnimate != null && (n.objAnimate.init(e),
                    n.animating(!0),
                    n.onAnimationStart()));
            if (n.objAnimate != null) {
                var r = n.objAnimate.update(e);
                r && (n.objAnimate = null,
                    n.animating(!1),
                    n.onAnimationStop())
            }
            n.controller != null && n.controller.onViewUpdated(e, t),
                n.needToRender() && (n.cachedImage = null)
        },
        p
})
