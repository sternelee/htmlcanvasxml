define("table_view", ["scroll_view", "rect", "vec2"], function(e, t, n) {
    var r = {};
    r.isVertical = function(e) {
            return !1
        },
        r.cellCount = function(e) {
            return 0
        },
        r.cellSizeByIndex = function(e, t) {
            return 0
        },
        r.cellByIndex = function(e, t) {
            return null
        };
    var i = function() {
        var t = this;
        e.prototype.constructor.call(t)
    };
    return i.prototype = new e,
        i.constructor = i,
        i.prototype._dataSource = null,
        i.prototype.dataSource = function(e) {
            var t = this;
            return Boolean(e) && e != t._dataSource && (t._dataSource = e,
                    e.isVertical(t) ? (t.lockHorizontal(!0),
                        t.lockVertical(!1)) : (t.lockVertical(!0),
                        t.lockHorizontal(!1))),
                t._dataSource
        },
        i.prototype.renderView = function() {
            var e = this;
            if (e._dataSource != null) {
                if (e.bouncing() == 0) {
                    var t = e.offset();
                    t.x = Math.max(0, Math.min(e.contentSize().x - e.width(), t.x)),
                        t.y = Math.max(0, Math.min(e.contentSize().y - e.height(), t.y))
                }
                var n = e.contentView();
                n.width(e.width()),
                    n.height(e.height());
                var r;
                e._dataSource.isVertical(e) ? r = e.renderVertical() : r = e.renderHorizontal();
                var i = e.contentView().subViews().slice();
                for (var s = 0; s < i.length; s++) {
                    var o = !0;
                    for (var u = 0; u < r.length; u++)
                        if (i[s] == r[u]) {
                            o = !1;
                            break
                        }
                    o && i[s].remove()
                }
                for (var a = 0; a < r.length; a++) {
                    var f = !0;
                    for (var l = 0; l < i.length; l++)
                        if (r[a] == i[l]) {
                            f = !1;
                            break
                        }
                    f && e.contentView().addSubView(r[a])
                }
                e._hScrollBar != null && (e._hScrollBar.updateSize(),
                        e._hScrollBar.updatePotion()),
                    e._vScrollBar != null && (e._vScrollBar.updateSize(),
                        e._vScrollBar.updatePotion())
            }
        },
        i.prototype.renderVertical = function() {
            var e = this,
                t = new n(e.offset().y, e.offset().y + e.height()),
                r = [],
                i = 0;
            for (var s = 0; s < e.dataSource().cellCount(e); s++) {
                var o = e.dataSource().cellSizeByIndex(e, s),
                    u = new n(i, i + o),
                    a = u.y < t.x || u.x > t.y;
                if (a == 0) {
                    var f = e.dataSource().cellByIndex(e, s);
                    f.x(0),
                        f.y(i - e.offset().y),
                        r.push(f)
                }
                i += o
            }
            return e._contentSize = new n(0, i),
                r
        },
        i.prototype.renderHorizontal = function() {
            var e = this,
                t = new n(e.offset().x, e.offset().x + e.width()),
                r = [],
                i = 0;
            for (var s = 0; s < e.dataSource().cellCount(e); s++) {
                var o = e.dataSource().cellSizeByIndex(e, s),
                    u = new n(i, i + o),
                    a = u.y < t.x || u.x > t.y;
                if (a == 0) {
                    var f = e.dataSource().cellByIndex(e, s);
                    f.x(i - e.offset().x),
                        f.y(0),
                        r.push(f)
                }
                i += o
            }
            return e._contentSize = new n(i, 0),
                r
        },
        i
})
