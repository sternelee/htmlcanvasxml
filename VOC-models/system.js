define("system", ["jquery"], function(e) {
    var t = function() {};
    return t.ENV_DEV = "dev",
        t.ENV_STAGINE = "staging",
        t.ENV_PRD = "prd",
        t.env = t.ENV_DEV,
        t.log = function(e) {
            if (t.env == t.ENV_DEV)
                try {
                    window.console.log(e)
                } catch (n) {}
        },
        t.isTouchDevice = function() {
            try {
                return document.createEvent("TouchEvent"), !0
            } catch (e) {
                return !1
            }
        },
        t.isMobile = function() {
            var e = ["iphone", "android", "ipod", "ipad"],
                t = !1;
            for (var n = 0; n < e.length; n++)
                if (navigator.appVersion.toLowerCase().indexOf(e[n]) > -1) {
                    t = !0;
                    break
                }
            return t
        },
        t.isSupportCSS3Transform = function() {
            var t = e("<div></div>"),
                n = "scale(2,2)",
                r = ["-webkit-transform", "-moz-transform", "-o-transform", "-ms-transform", "transform"];
            e.each(r, function(e, r) {
                t.css(r, n)
            });
            var i = !1;
            return e.each(r, function(e, n) {
                    var r = t.css(n);
                    return r != undefined && r.toLowerCase().indexOf("scale") > -1 ? (i = !0, !1) : !0
                }),
                i
        },
        t.isSupportCanvas = function() {
            var e = !1;
            try {
                var t = document.createElement("canvas");
                t.getContext("2d"),
                    e = !0
            } catch (n) {
                e = !1
            }
            return e
        },
        t.isSupportMotion = function() {
            var e = window["DeviceOrientationEvent"] != undefined;
            return e
        },
        t.inWechatBrowser = function() {
            var e = /MicroMessenger/i,
                t = navigator.userAgent;
            return e.test(t)
        },
        t._xhrSupportProgressEvent = null,
        t.xhrSupportProgressEvent = function() {
            if (t._xhrSupportProgressEvent == null) {
                var e = t.nativeXHR();
                t._xhrSupportProgressEvent = typeof e["onprogress"] != "undefined"
            }
            return t._xhrSupportProgressEvent
        },
        t.vendorJSProp = function(e, t) {
            var n = undefined;
            if (e[t] != undefined)
                n = e[t];
            else {
                var r = t.slice(0, 1).toUpperCase() + t.slice(1, t.length),
                    i = ["webkit", "moz", "o", "ms"];
                for (var s = 0; s < i.length; s++) {
                    var o = i[s] + r;
                    if (e[o] != undefined) {
                        n = e[o];
                        break
                    }
                }
            }
            return n
        },
        t.vendorPrefix = function() {
            var e = null;
            return document["hidden"] != undefined ? e = "" : document["webkitHidden"] != undefined ? e = "webkit" : document["mozHidden"] != undefined ? e = "moz" : document["oHidden"] != undefined ? e = "o" : document["msHidden"] != undefined && (e = "ms"),
                e
        },
        t.addVendorPrefix = function(e) {
            var n = null,
                r = t.vendorPrefix();
            return r != null && (r.length <= 0 ? n = e : n = r + e.slice(0, 1).toUpperCase() + e.slice(1, e.length)),
                n
        },
        t.nativeXHR = function() {
            var e = null;
            if (window["XMLHttpRequest"] != undefined)
                e = new XMLHttpRequest;
            else
                try {
                    e = new ActiveXObject("MSXML2.XMLHTTP")
                } catch (t) {
                    try {
                        e = new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (t) {
                        e = null
                    }
                }
            return e
        },
        t
})
