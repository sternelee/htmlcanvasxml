define("section_cell", ["view_ctrl", "event_center", "event"], function(e, t, n) {
    var r = function(e) {
        if (arguments.length > 0) {
            var t = this;
            t.initWithView(e)
        }
    };
    return r.prototype = new e,
        r.prototype.constructor = r,
        r.prototype.motionBox = null,
        r.prototype.kvMotion = null,
        r.prototype.motionLoading = !1,
        r.prototype.onViewControllerPrepared = function() {
            var e = this;
            e.motionBox = e.view().subViewByName("motion_box")
        },
        r.prototype.onViewAddToStage = function() {
            var e = this;
            e.prepared && e.motionBox != null && e.kvMotion == null && e.loadKVMotion()
        },
        r.prototype.loadKVMotion = function() {
            var e = this;
            if (e.motionLoading == 0) {
                e.motionLoading = !0;
                var r = e.createKVMotion();
                r != null && (t.addListener(r, e, n.PREPARED, e.onKVMotionPrepared),
                    r.initialize())
            }
        },
        r.prototype.onKVMotionPrepared = function(e) {
            var t = this;
            t.kvMotion = e.target,
                t.motionBox.empty(),
                t.motionBox.addSubView(t.kvMotion.view()),
                t.view().stage() != null ? (t.kvMotion.view().alpha(0),
                    t.kvMotion.view().animate(.3, {
                        alpha: 1
                    }, Cubic.easeInOut, null, function() {
                        t.motionBox.bgColor(null)
                    })) : t.motionBox.bgColor(null)
        },
        r.prototype.createKVMotion = function() {
            return null
        },
        r
})
