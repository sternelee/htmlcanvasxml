define("stage", ["jquery", "mat3", "view_container", "scale_mode", "align_mode", "orientation", "rect"], function(e, t, n, r, i, s, o) {
    var u = function() {};
    u.prototype = new n;
    var a = u.prototype;
    return a.constructor = u,
        a.className = "AXEStage",
        a.onStage = !0,
        a.clone = function() {
            var e = this,
                t = new u;
            return e.copyProperties(t),
                t
        },
        a.copyProperties = function(e) {
            var t = this;
            n.prototype.copyProperties.call(t, e),
                e.ratio(t.ratio()),
                e.alignMode(t.alignMode()),
                e.scaleMode(t.scaleMode())
        },
        a.updatePropsFromXML = function(e) {
            var t = this;
            n.prototype.updatePropsFromXML.call(t, e),
                e.is("[ratio]") ? t.ratio(parseFloat(e.attr("ratio"))) : window["devicePixelRatio"] != undefined && t.ratio(window.devicePixelRatio)
        },
        a.dealloc = function() {
            var e = this;
            e._alignMode = null,
                e._scaleMode = null,
                e._stageMatrix = null,
                n.prototype.dealloc.call(e)
        },
        a.matrix = function() {
            var e = this;
            return n.prototype.matrix.call(e)
        },
        a.width = function(e) {
            var t = this,
                r = 0;
            return arguments.length > 0 ? (r = n.prototype.width.call(t, e),
                    t.needResizeFlag = !0) : r = n.prototype.width.call(t),
                r
        },
        a.height = function(e) {
            var t = this,
                r = 0;
            return arguments.length > 0 ? (r = n.prototype.height.call(t, e),
                    t.needResizeFlag = !0) : r = n.prototype.height.call(t),
                r
        },
        a.needResizeFlag = !1,
        a._alignMode = i.MIDDLE_CENTER,
        a.alignMode = function(e) {
            var t = this;
            return arguments.length > 0 && e != t.mode && (t._alignMode = e,
                    t.needResizeFlag = !0),
                t._alignMode
        },
        a._scaleMode = r.showAll,
        a.scaleMode = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._scaleMode && (t._scaleMode = e,
                    t.needResizeFlag = !0),
                t._scaleMode
        },
        a._stageMatrix = new t,
        a.stageMatrix = function(e) {
            var t = this;
            return arguments.length > 0 && (t._stageMatrix = e,
                    t.needResizeFlag = !0),
                t._stageMatrix
        },
        a._ratio = 2,
        a.ratio = function(e) {
            var t = this;
            return isNaN(e) === !1 && t._ratio != parseFloat(e) && (t._ratio = e,
                    t.needResizeFlag = !0),
                t._ratio
        },
        a.orientation = null,
        a.windowWidth = 0,
        a.windowHeight = 0,
        a.resize = function(e, t) {
            var r = this;
            if (r.windowWidth != e || r.windowHeight != t) {
                r.windowWidth = e,
                    r.windowHeight = t,
                    r.stageMatrix(r.scaleMode().call(null, r.width(), r.height(), r.stageWidth(), r.stageHeight(), r.alignMode())),
                    n.prototype.resize.call(r, r.stageWidth(), r.stageHeight());
                var i = e > t ? s.LANDSCAPE : s.PORTRAIT;
                i != r.orientation && (r.orientation = i,
                    r.onWindowOrientationChanged(i))
            }
        },
        a.stageWidth = function() {
            var e = this;
            return e.windowWidth * e.ratio()
        },
        a.stageHeight = function() {
            var e = this;
            return e.windowHeight * e.ratio()
        },
        u
})
