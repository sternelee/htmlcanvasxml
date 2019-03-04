define("run_loop", ["system"], function(e) {
    var t = function() {};
    return t.targets = [],
        t.timer = undefined,
        t.lastTS = 0,
        t.enterFrame = function() {
            var t = null,
                n = e.vendorJSProp(window, "requestAnimationFrame");
            return n == null ? t = function(e) {
                    return window.setTimeout(e, 1e3 / 60)
                } :
                t = function(e) {
                    return n.call(window, e)
                },
                t
        }
        (),
        t.clearAnimationFrame = function() {
            var t = e.vendorJSProp(window, "cancelAnimationFrame");
            t == null && (t = window.clearTimeout);
            var n = function(e) {
                t.call(window, e)
            };
            return n
        }
        (),
        t.documentHidden = function() {
            var t = e.vendorJSProp(document, "hidden");
            return typeof t == "undefined" && (t = !1),
                t
        },
        t.active = t.documentHidden() === !1,
        t.onActivate = function() {
            if (t.active === !1) {
                t.active = !0;
                for (var e = 0; e < t.targets.length; e++) {
                    var n = t.targets[e],
                        r = n.target;
                    typeof r["onActivate"] == "function" && r.onActivate()
                }
                t.timer != undefined && (t.clearAnimationFrame(t.timer),
                        t.timer = undefined),
                    t.timer = t.enterFrame(t.onFire)
            }
        },
        t.onDeactivate = function() {
            if (t.active === !0) {
                t.active = !1;
                for (var e = 0; e < t.targets.length; e++) {
                    var n = t.targets[e],
                        r = n.target;
                    typeof r["onDeactivate"] == "function" && r.onDeactivate()
                }
            }
        },
        t.inited = !1,
        t.initialize = function() {
            if (t.inited === !1) {
                t.inited = !0,
                    window.addEventListener("blur", t.onDeactivate),
                    window.addEventListener("focus", t.onActivate),
                    window["onpageshow"] != undefined && window["onpagehide"] != undefined && (window.addEventListener("pageshow", t.onActivate),
                        window.addEventListener("pagehide", t.onDeactivate));
                var n = e.addVendorPrefix("visibilitychange");
                window.addEventListener(n, function() {
                        e.documentHidden() ? t.onDeactivate() : t.onActivate()
                    }),
                    t.lastTS = (new Date).getTime(),
                    t.active && (t.timer = t.enterFrame(t.onFire)),
                    t.targets = []
            }
        },
        t.addToRunLoop = function(e) {
            t.initialize();
            var n = !1;
            $.each(t.targets, function(t, r) {
                return r["target"] == e ? (n = !0, !1) : !0
            });
            if (n)
                return;
            t.targets.unshift({
                target: e,
                ts: (new Date).getTime()
            })
        },
        t.onFire = function() {
            var e = (new Date).getTime(),
                n = (e - t.lastTS) / 1e3;
            for (var r = 0; r < t.targets.length; r++) {
                var i = t.targets[r],
                    s = i.target;
                if (typeof s["fire"] == "function") {
                    var o = (e - i.ts) / 1e3;
                    s.fire.call(s, o, n)
                }
            }
            t.lastTS = e,
                t.timer = t.enterFrame(t.onFire)
        },
        t.removeFromRunLoop = function(e) {
            for (var n = 0; n < t.targets.length; n++)
                if (t.targets[n]["target"] == e) {
                    t.targets.splice(n, 1);
                    break
                }
        },
        t
})
