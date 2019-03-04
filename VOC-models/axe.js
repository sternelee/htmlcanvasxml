define("axe", ["render_engine", "event_center", "event", "stage", "view_container", "view", "bitmap", "shape", "movie", "text", "button", "motion", "scroll_view", "table_view", "spin_view", "view_factory"], function(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v) {
    var m = function(m, g, y) {
            var b = this;
            v.addClass("stage", r),
                v.addClass("container", i),
                v.addClass("view", s),
                v.addClass("bitmap", o),
                v.addClass("shape", u),
                v.addClass("movie", a),
                v.addClass("text", f),
                v.addClass("button", l),
                v.addClass("motion", c),
                v.addClass("scroll", h),
                v.addClass("table", p),
                v.addClass("spin", d),
                b.stageCtrl = new m,
                typeof g == "string" ? (b.stageCtrl.initWithURL(g),
                    t.addListener(b.stageCtrl, b, n.PREPARED, function() {
                        b._renderEngine = new e(b.stageCtrl.view())
                    })) : (b.stageCtrl.init(),
                    b._renderEngine = new e(b.stageCtrl.view()))
        },
        g = m.prototype;
    return m.prototype.stageCtrl = null,
        m.prototype._renderEngine = null,
        m.prototype.renderEngine = function() {
            var e = this;
            return e._renderEngine
        },
        m.prototype.initRenderEngine = function() {},
        m
})
