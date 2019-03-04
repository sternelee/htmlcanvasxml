define("scroll_view", ["system", "view_container", "vec2", "scroll_bar_style", "scroll_bar", "event_center", "touch_event"], function(e, t, n, r, i, s, o) {
    var u = {};
    u.scrollBar = function(e, t) {
            return null
        },
        u.onScrollViewStartScroll = function(e) {},
        u.onScrollViewScrolling = function(e) {},
        u.onScrollViewEndScroll = function(e) {},
        u.onScrollViewStartEasing = function(e) {};
    var a = function() {
        var e = this;
        s.addListener(e, e, o.TOUCH_START, e.onViewScrollBegin)
    };
    return a.prototype = new t,
        a.prototype.constructor = a,
        a.prototype.scrolling = !1,
        a.prototype.delegate = null,
        a.prototype.dealloc = function() {
            var e = this;
            e._contentView != null && (e._contentView.dealloc(),
                    e._contentView = null),
                e._hScrollBar != null && (e._hScrollBar.remove(),
                    e._hScrollBar.dealloc(),
                    e._hScrollBar = null),
                e._vScrollBar != null && (e._vScrollBar.remove(),
                    e._vScrollBar.dealloc(),
                    e._vScrollBar = null),
                t.prototype.dealloc.call(e)
        },
        a.prototype.clone = function() {
            var e = this,
                t = new a;
            return e.copyProperties(t),
                t
        },
        a.prototype.copyProperties = function(e) {
            var n = this;
            t.prototype.copyProperties.call(n, e),
                e.empty(),
                n._contentView != null && (e._contentView = n._contentView.clone(),
                    e.addSubView(n._contentView)),
                n._hScrollBar != null && (e._hScrollBar = n._hScrollBar.clone(),
                    e._hScrollBar.scrollView = e,
                    e.addSubView(n._hScrollBar)),
                n._vScrollBar != null && (e._vScrollBar = n._vScrollBar.clone(),
                    e._vScrollBar.scrollView = e,
                    e.addSubView(n._vScrollBar)),
                e.offset(n.offset().clone()),
                e.contentSize(n.contentSize().clone()),
                e.paging(n._paging),
                e.bouncing(n._bouncing),
                e.lockHorizontal(n._lockHorizontal),
                e.lockVertical(n._lockVertical),
                e.scrollBarStyle(n._scrollBarStyle),
                e.easing(n._easing),
                e.reloadData()
        },
        a.prototype.updatePropsFromXML = function(e) {
            var i = this;
            t.prototype.updatePropsFromXML.call(i, e),
                i.clip(!0);
            var s = e.find("> content");
            s.length > 0 && i.contentView().updatePropsFromXML(s);
            if (e.is("[offset]")) {
                var o = e.attr("offset").split(","),
                    u = new n(parseFloat(o[0]), parseFloat(o[1]));
                i.offset(u)
            }
            if (e.is("[content-size]")) {
                var a = e.attr("content-size").split(","),
                    f = new n(parseFloat(a[0]), parseFloat(a[1]));
                i.contentSize(f)
            }
            e.is("[bouncing]") && i.bouncing(e.attr("bouncing") == "true"),
                e.is("[paging]") && i.paging(e.attr("paging") == "true"),
                e.is("[lock-h]") && i.lockHorizontal(e.attr("lock-h") == "true"),
                e.is("[lock-v]") && i.lockVertical(e.attr("lock-v") == "true"),
                e.is("[scroll-bar-style]") && i.scrollBarStyle(r[e.attr("scroll-bar-style").toUpperCase()]),
                i.reloadData()
        },
        a.prototype.lastOffset = null,
        a.prototype.currentSpeed = new n,
        a.prototype.easingInitSpeed = null,
        a.prototype.easingDuration = null,
        a.prototype.easingAcc = null,
        a.prototype.desOffset = null,
        a.prototype.beginEasing = !1,
        a.prototype.easingStartTs = 0,
        a.prototype.easingStartOffset = null,
        a.prototype.update = function(e, r) {
            var i = this;
            t.prototype.update.call(i, e, r);
            if (i.lastOffset != null) {
                var s = i.offset().clone();
                if (i.paging() == 0 || i.lastOffset.equalsTo(s) == 0)
                    i.currentSpeed = new n,
                    i.currentSpeed.x = (s.x - i.lastOffset.x) / r,
                    i.currentSpeed.y = (s.y - i.lastOffset.y) / r
            }
            i.lastOffset = i.offset().clone(),
                i.beginEasing && (i.easingStartTs = e,
                    i.easingStartOffset = i.offset().clone(),
                    i.beginEasing = !1);
            if (i.easingInitSpeed != null) {
                var o = e - i.easingStartTs,
                    u = i.offset().clone();
                o < i.easingDuration.x ? u.x = i.easingStartOffset.x + i.easingInitSpeed.x * o + i.easingAcc.x * o * o / 2 : u.x = i.desOffset.x,
                    o < i.easingDuration.y ? u.y = i.easingStartOffset.y + i.easingInitSpeed.y * o + i.easingAcc.y * o * o / 2 : u.y = i.desOffset.y,
                    i.offset(u),
                    o >= i.easingDuration.x && o >= i.easingDuration.y ? i.onViewEndScroll() : i.delegate != null && i.delegate.onScrollViewScrolling(i)
            }
            i.needReload && (i.needReload = !1,
                i.renderView())
        },
        a.prototype.width = function(e) {
            var n = this;
            return isNaN(e) == 0 && e != n.width() && (t.prototype.width.call(n, e),
                    n.reloadData()),
                t.prototype.width.call(n)
        },
        a.prototype.height = function(e) {
            var n = this;
            return isNaN(e) == 0 && e != n.height() && (t.prototype.height.call(n, e),
                    n.reloadData()),
                t.prototype.height.call(n)
        },
        a.prototype._contentView = null,
        a.prototype.contentView = function() {
            var e = this;
            return e._contentView == null && (e._contentView = new t,
                    e._contentView.clip(!0),
                    e.insertSubViewAt(e._contentView, 0)),
                e._contentView
        },
        a.prototype._offset = new n,
        a.prototype.offset = function(e) {
            var t = this;
            return Boolean(e) && e.equalsTo(t._offset) == 0 && (t._offset = e.clone(),
                    t.reloadData()),
                t._offset
        },
        a.prototype._contentSize = new n,
        a.prototype.contentSize = function(e) {
            var t = this;
            return Boolean(e) && e.equalsTo(t._contentSize) == 0 && (t._contentSize = e.clone(),
                    t.reloadData()),
                t._contentSize
        },
        a.prototype._bouncing = !0,
        a.prototype.bouncing = function(e) {
            var t = this;
            return typeof e == "boolean" && t._bouncing != e && (t._bouncing = e),
                t._bouncing
        },
        a.prototype._easing = !0,
        a.prototype.easing = function(e) {
            var t = this;
            return typeof e == "boolean" && e == t._easing && (t._easing = e),
                t._easing
        },
        a.prototype._paging = !1,
        a.prototype.paging = function(e) {
            var t = this;
            return typeof e == "boolean" && t._paging != e && (t._paging = e),
                t._paging
        },
        a.prototype._hScrollBar = null,
        a.prototype.hScrollBar = function() {
            var e = this;
            return e._hScrollBar == null && (e.delegate != null && e.delegate.scrollBar != null && (e._hScrollBar = e.delegate.scrollBar(e, !1)),
                    e._hScrollBar == null && (e._hScrollBar = new i(!1)),
                    e._hScrollBar.scrollView = e,
                    e.addSubView(e._hScrollBar)),
                e._hScrollBar
        },
        a.prototype._vScrollBar = null,
        a.prototype.vScrollBar = function() {
            var e = this;
            return e._vScrollBar == null && (e.delegate != null && e.delegate.scrollBar != null && (e._vScrollBar = e.delegate.scrollBar(e, !0)),
                    e._vScrollBar == null && (e._vScrollBar = new i(!0)),
                    e._vScrollBar.scrollView = e,
                    e.addSubView(e._vScrollBar)),
                e._vScrollBar
        },
        a.prototype._lockHorizontal = !1,
        a.prototype.lockHorizontal = function(e) {
            var t = this;
            return typeof e == "boolean" && t._lockHorizontal != e && (t._lockHorizontal = e),
                t._lockHorizontal
        },
        a.prototype._lockVertical = !1,
        a.prototype.lockVertical = function(e) {
            var t = this;
            return typeof e == "boolean" && t._lockVertical != e && (t._lockVertical = e),
                t._lockVertical
        },
        a.prototype._scrollBarStyle = r.AUTO,
        a.prototype.scrollBarStyle = function(e) {
            var t = this;
            return isNaN(e) == 0 && e != t._scrollBarStyle && (t._scrollBarStyle = e,
                    t._scrollBarStyle == r.AUTO ? (t._hScrollBar != null && (t._hScrollBar.stopAnimation(),
                            t.scrolling && t.lockHorizontal() == 0 && t.contentSize().x > t.width() ? t._hScrollBar.show() : t._hScrollBar.hide()),
                        t._vScrollBar != null && t.lockVertical() == 0 && t.contentSize().y > t.height() && (t._vScrollBar.stopAnimation(),
                            t.scrolling ? t._vScrollBar.show() : t._vScrollBar.hide())) : t._scrollBarStyle == r.HIDDEN ? (t._hScrollBar != null && (t._hScrollBar.remove(),
                            t._hScrollBar.dealloc(),
                            t._hScrollBar = null),
                        t._vScrollBar != null && (t._vScrollBar.remove(),
                            t._vScrollBar.dealloc(),
                            t._vScrollBar = null)) : t._scrollBarStyle == r.VISIBLE && (t.lockHorizontal() == 0 && t.hScrollBar().show(),
                        t.lockVertical() == 0 && t.vScrollBar().show())),
                t._scrollBarStyle
        },
        a.prototype.needReload = !1,
        a.prototype.reloadData = function() {
            var e = this;
            e.needReload = !0
        },
        a.prototype.renderView = function() {
            var e = this;
            if (e.bouncing() == 0) {
                var t = e.offset();
                t.x = Math.max(0, Math.min(e.contentSize().x - e.width(), t.x)),
                    t.y = Math.max(0, Math.min(e.contentSize().y - e.height(), t.y))
            }
            e._contentView != null && (e._contentView.width(e.contentSize().x),
                    e._contentView.height(e.contentSize().y),
                    e._contentView.x(-1 * e.offset().x),
                    e._contentView.y(-1 * e.offset().y)),
                e._hScrollBar != null && (e._hScrollBar.updateSize(),
                    e._hScrollBar.updatePotion()),
                e._vScrollBar != null && (e._vScrollBar.updateSize(),
                    e._vScrollBar.updatePotion())
        },
        a.prototype.lastTouch = null,
        a.prototype.onViewScrollBegin = function(e) {
            var t = this;
            if (t.contentSize().x > t.width() || t.contentSize().y > t.height())
                t.easingInitSpeed = null,
                t.easingDuration = 0,
                t.easingAcc = null,
                t.desOffset = null,
                t.lastTouch = new n(e.touches[0].x, e.touches[0].y),
                s.addListener(t, t, [o.TOUCH_MOVE, o.TOUCH_END], [t.onViewScrolling, t.onViewScrollEnd]),
                t.scrolling = !0,
                t.delegate != null && t.delegate.onScrollViewStartScroll(t)
        },
        a.prototype.onViewScrolling = function(e) {
            var t = this,
                i = new n(e.touches[0].x, e.touches[0].y),
                s = t.offset().clone(),
                o = new n;
            t.lockHorizontal() ? o.x = s.x : s.x >= 0 && s.x <= t.contentSize().x - t.width() ? o.x = s.x - (i.x - t.lastTouch.x) : o.x = s.x - (i.x - t.lastTouch.x) / 4,
                t.lockVertical() ? o.y = s.y : s.y >= 0 && s.y <= t.contentSize().y - t.height() ? o.y = s.y - (i.y - t.lastTouch.y) : o.y = s.y - (i.y - t.lastTouch.y) / 4,
                t.offset(o),
                t.lastTouch = i,
                t.delegate != null && t.delegate.onScrollViewScrolling(t),
                t.scrollBarStyle() == r.AUTO && (t.lockHorizontal() == 0 && t.contentSize().x > t.width() && t.hScrollBar().show(),
                    t.lockVertical() == 0 && t.contentSize().y > t.height() && t.vScrollBar().show())
        },
        a.prototype.BOUNCING_DURATION = .2,
        a.prototype.EASING_DURATION = .4,
        a.prototype.onViewScrollEnd = function() {
            var e = this,
                t = e.offset().clone(),
                r = t.clone(),
                i = 0,
                u = 0,
                a = 0,
                f = 0,
                l = e.currentSpeed.clone();
            t.x < 0 ? (r.x = 0,
                    i = e.BOUNCING_DURATION,
                    l.x = (r.x - t.x) * 2 / i,
                    a = l.x / i * -1) : t.x > e.contentSize().x - e.width() ? (r.x = e.contentSize().x - e.width(),
                    i = e.BOUNCING_DURATION,
                    l.x = (r.x - t.x) * 2 / i,
                    a = l.x / i * -1) : e.paging() ? (r.x = t.x + (l.x >= 0 ? 1 : -1) * e.width(),
                    r.x = Math.max(0, Math.min(r.x, e.contentSize().x - e.width())),
                    i = e.EASING_DURATION,
                    l.x = (r.x - t.x) * 2 / i,
                    a = l.x / i * -1) : e.easing() && l.x != 0 && (i = e.EASING_DURATION,
                    r.x = t.x + l.x * i / 2,
                    r.x = Math.max(0, Math.min(r.x, e.contentSize().x - e.width())),
                    l.x = (r.x - t.x) * 2 / i,
                    a = l.x / i * -1),
                t.y < 0 ? (r.y = 0,
                    u = e.BOUNCING_DURATION,
                    l.y = (r.y - t.y) * 2 / u,
                    f = l.y / u * -1) : t.y > e.contentSize().y - e.height() ? (r.y = e.contentSize().y - e.height(),
                    u = e.BOUNCING_DURATION,
                    l.y = (r.y - t.y) * 2 / u,
                    f = l.y / u * -1) : e.paging() ? (r.y = t.y + (l.y >= 0 ? 1 : -1) * e.height(),
                    r.y = Math.max(0, Math.min(r.y, e.contentSize().y - e.height())),
                    u = e.EASING_DURATION,
                    l.y = (r.y - t.y) * 2 / u,
                    f = l.y / u * -1) : e.easing() && l.y != 0 && (u = e.EASING_DURATION,
                    r.y = t.y + l.y * u / 2,
                    r.y = Math.max(0, Math.min(r.y, e.contentSize().y - e.height())),
                    l.y = (r.y - t.y) * 2 / u,
                    f = l.y / u * -1),
                r.equalsTo(t) ? e.onViewEndScroll() : (e.desOffset = r,
                    e.easingInitSpeed = l,
                    e.easingDuration = new n(i, u),
                    e.easingAcc = new n(a, f),
                    e.beginEasing = !0,
                    e.delegate != null && e.delegate.onScrollViewStartEasing(e)),
                e.lastTouch = null,
                s.removeListener(e, e, [o.TOUCH_MOVE, o.TOUCH_END], [e.onViewScrolling, e.onViewScrollEnd])
        },
        a.prototype.onViewEndScroll = function() {
            var e = this;
            e.scrolling = !1,
                e.easingInitSpeed = null,
                e.easingDuration = 0,
                e.easingAcc = null,
                e.desOffset = null,
                e._hScrollBar != null && e._hScrollBar.hide(),
                e._vScrollBar != null && e._vScrollBar.hide(),
                e.delegate != null && e.delegate.onScrollViewEndScroll(e),
                e.scrollBarStyle() == r.AUTO && (e.lockHorizontal() == 0 && e.contentSize().x > e.width() && e.hScrollBar().hide(),
                    e.lockVertical() == 0 && e.contentSize().y > e.height() && e.vScrollBar().hide())
        },
        a
})
