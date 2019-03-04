define("scroll_bar", ["view_container", "shape", "color", "circle", "rect"], function(e, t, n, r, i) {
    var s = function(e) {
        var t = this;
        t.isVertical = e
    };
    return s.prototype = new e,
        s.prototype.constructor = s,
        s.prototype.BAR_SIZE = 4,
        s.prototype.BAR_MARGIN = 2,
        s.prototype.BAR_COLOR = n.colorWithString("#00000066"),
        s.prototype.MIN_BAR_SIZE = 4,
        s.prototype.scrollView = null,
        s.prototype.isVertical = !1,
        s.prototype._barView = null,
        s.prototype.barView = function() {
            var e = this;
            return e._barView == null && (e._barView = new t,
                    e._barView.fillColor(e.BAR_COLOR),
                    e.addSubView(e._barView)),
                e._barView
        },
        s.prototype.contentSize = 0,
        s.prototype.viewSize = 0,
        s.prototype.updateSize = function() {
            var e = this;
            if (e.scrollView != null) {
                var t = e.barView(),
                    n = 0,
                    s = 0,
                    o = 0,
                    u = 0;
                if (e.isVertical) {
                    if (e.scrollView.height() != e.viewSize || e.scrollView.contentSize().y != e.contentSize) {
                        e.viewSize = e.scrollView.height(),
                            e.contentSize = e.scrollView.contentSize().y,
                            e.width(e.BAR_SIZE + 2 * e.BAR_MARGIN),
                            e.height(e.scrollView.height()),
                            e.x(e.scrollView.width() - e.width()),
                            n = e.scrollView.contentSize().y,
                            s = e.scrollView.height(),
                            o = e.height() - e.BAR_MARGIN * 2,
                            u = Math.max(o * (s / n), e.MIN_BAR_SIZE),
                            e.barView().width(e.BAR_SIZE),
                            e.barView().height(u),
                            e.barView().y(e.BAR_MARGIN);
                        var a = e.barView().paths();
                        a.clearCommands(),
                            a.circle(new r(e.BAR_SIZE / 2, e.BAR_SIZE / 2, e.BAR_SIZE / 2)),
                            a.circle(new r(e.BAR_SIZE / 2, u - e.BAR_SIZE / 2, e.BAR_SIZE / 2)),
                            a.rect(new i(0, e.BAR_SIZE / 2, e.BAR_SIZE, u - e.BAR_SIZE))
                    }
                } else if (e.scrollView.width() != e.viewSize || e.scrollView.contentSize().x != e.contentSize) {
                    e.viewSize = e.scrollView.width(),
                        e.contentSize = e.scrollView.contentSize().x,
                        e.height(e.BAR_SIZE + 2 * e.BAR_MARGIN),
                        e.width(e.scrollView.width()),
                        e.y(e.scrollView.height() - e.height()),
                        n = e.scrollView.contentSize().x,
                        s = e.scrollView.width(),
                        o = e.width() - e.BAR_MARGIN * 2,
                        u = Math.max(o * (s / n), e.MIN_BAR_SIZE),
                        e.barView().height(e.BAR_SIZE),
                        e.barView().width(u),
                        e.barView().x(e.BAR_MARGIN);
                    var f = e.barView().paths();
                    f.clearCommands(),
                        f.circle(new r(e.BAR_SIZE / 2, e.BAR_SIZE / 2, e.BAR_SIZE / 2)),
                        f.circle(new r(u - e.BAR_SIZE / 2, e.BAR_SIZE / 2, e.BAR_SIZE / 2)),
                        f.rect(new i(e.BAR_SIZE / 2, 0, u - e.BAR_SIZE, e.BAR_SIZE))
                }
            }
        },
        s.prototype.updatePotion = function() {
            var e = this;
            if (e.isVertical) {
                var t = e.scrollView.offset().y;
                t = Math.max(0, Math.min(t, e.scrollView.contentSize().y - e.scrollView.height())),
                    e.barView().y((e.height() - 2 * e.BAR_MARGIN) * (t / e.scrollView.contentSize().y))
            } else {
                var n = e.scrollView.offset().x;
                n = Math.max(0, Math.min(n, e.scrollView.contentSize().x - e.scrollView.width())),
                    e.barView().x((e.width() - 2 * e.BAR_MARGIN) * (n / e.scrollView.contentSize().x))
            }
        },
        s.prototype.hidden = !1,
        s.prototype.show = function() {
            var e = this;
            e.hidden && (e.hidden = !1,
                e.stopAnimation(),
                e.visible(!0),
                e.alpha(1))
        },
        s.prototype.hide = function() {
            var e = this;
            e.hidden == 0 && (e.hidden = !0,
                e.animate(.4, {
                    alpha: 0
                }, Cubic.easeOut, null, function() {
                    e.visible(!1)
                }))
        },
        s
})
