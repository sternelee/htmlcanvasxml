define("bitmap", ["view", "assets_loader"], function(e, t) {
    var n = function() {};
    n.prototype = new e;
    var r = n.prototype;
    return r.className = "AXEBitmap",
        r.clone = function() {
            var e = this,
                t = new n;
            return e.copyProperties(t),
                t
        },
        r.copyProperties = function(t) {
            var n = this;
            e.prototype.copyProperties.call(n, t),
                t.fixSize(n.fixSize()),
                t.bitmap(n.bitmap())
        },
        r.dealloc = function() {
            var t = this;
            t._bitmap = null,
                e.prototype.dealloc.call(t)
        },
        r.updatePropsFromXML = function(n) {
            var r = this;
            e.prototype.updatePropsFromXML.call(r, n),
                r.fixSize(n.is("[width]") && n.is("[height]")),
                n.is("[src]") && r.bitmap(t.asset(n.attr("src")))
        },
        r.updateSize = function() {
            var e = this;
            e.bitmap() != null && (e.fixSize() == 0 ? (e.width(e.bitmap().naturalWidth),
                e.height(e.bitmap().naturalHeight)) : (e.bitmap().width = e.width(),
                e.bitmap().height = e.height()))
        },
        r._fixSize = !1,
        r.fixSize = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._fixSize && (t._fixSize = e,
                    t.updateSize(),
                    t.needToRender(!0)),
                t._fixSize
        },
        r._bitmap = null,
        r.bitmap = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._bitmap && (t._bitmap = e,
                    t.updateSize(),
                    t.needToRender(!0)),
                t._bitmap
        },
        n
})
