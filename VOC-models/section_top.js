define("section_top", ["section_cell", "star_kv", "event_center", "touch_event", "voc_constants"], function(e, t, n, r, i) {
    var s = function(t) {
        var n = this;
        e.prototype.constructor.call(n, t)
    };
    return s.prototype = new e,
        s.prototype.constructor = s,
        s.prototype.btnCreator = null,
        s.prototype.onViewControllerPrepared = function() {
            var t = this;
            e.prototype.onViewControllerPrepared.call(t),
                t.btnCreator = t.view().subViewByName("btn_creator"),
                n.addListener(t.btnCreator, t, r.CLICK, function() {
                    window["_hmt"] != undefined && (_hmt.push(["_trackEvent", "AUTHOR", "AUTHOR", "AUTHOR"]),
                        setTimeout(function() {
                            window.location.href = i.READ_MORE
                        }, 100))
                })
        },
        s
})
