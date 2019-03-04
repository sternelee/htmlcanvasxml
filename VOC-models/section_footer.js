define("section_footer", ["section_cell", "event_center", "touch_event", "event", "voc_constants", "button_state"], function(e, t, n, r, i, s) {
    var o = function(t) {
        var n = this;
        e.prototype.constructor.call(n, t)
    };
    return o.prototype = new e,
        o.prototype.constructor = o,
        o.prototype.btnWant = null,
        o.prototype.btnSource = null,
        o.prototype.btnReport = null,
        o.prototype.btnLike = null,
        o.prototype.txtPV = null,
        o.prototype.txtLike = null,
        o.prototype.onViewControllerPrepared = function() {
            var o = this;
            e.prototype.onViewControllerPrepared.call(o),
                o.btnWant = o.view().subViewByName("btn_want"),
                o.btnSource = o.view().subViewByName("btn_source"),
                o.txtPV = o.view().subViewByName("txt_pv");
            var u = i.pvCount;
            u = Math.floor(u / 1e5) * 1e5,
                o.txtPV.text(u + "+"),
                o.txtLike = o.view().subViewByName("txt_like"),
                o.updateCountText(o.txtLike, i.likeCount),
                t.addListener(o.btnWant, o, n.CLICK, function() {
                    window["_hmt"] != undefined && (_hmt.push(["_trackEvent", "VOC_ICON", "VOC_ICON", "VOC_ICON"]),
                        setTimeout(function() {
                            window.location.href = i.READ_MORE
                        }, 100))
                }),
                t.addListener(o.btnSource, o, n.CLICK, function() {
                    _hmt.push(["_trackEvent", "READ_MORE", "READ_MORE", "READ_MORE"]),
                        setTimeout(function() {
                            window.location.href = i.READ_MORE
                        }, 100)
                }),
                o.btnReport = o.view().subViewByName("btn_report"),
                t.addListener(o.btnReport, o, n.CLICK, function() {
                    _hmt.push(["_trackEvent", "REPORT", "REPORT", "REPORT"]),
                        o.btnReport.enabled(!1),
                        o.btnReport.play(0),
                        t.addListener(o.btnReport, o, r.END, function() {
                            o.btnReport.dealloc(),
                                o.btnReport = null
                        })
                }),
                o.btnLike = o.view().subViewByName("btn_like"),
                i.isLiked() ? (o.btnLike.switchMode(!0),
                    o.btnLike.enabled(!1),
                    o.btnLike.buttonState(s.CLICK_STATE)) : t.addListener(o.btnLike, o, n.CLICK, function() {
                    i.like(),
                        o.btnLike.switchMode(!0),
                        o.btnLike.enabled(!1),
                        o.btnLike.buttonState(s.CLICK_STATE),
                        o.updateCountText(o.txtLike, i.likeCount),
                        _hmt.push(["_trackEvent", "REPORT", "REPORT", "REPORT"])
                })
        },
        o.prototype.updateCountText = function(e, t) {
            if (t < 1e3)
                e.text(t);
            else if (t >= 1e3 && t < 1e4) {
                var n = Math.floor(t / 100) / 10;
                e.text(n + "K +")
            } else if (t >= 1e4) {
                var r = Math.floor(t / 1e3) / 10;
                e.text(r + "W +")
            }
        },
        o
})
