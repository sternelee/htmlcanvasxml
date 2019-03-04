define("asset_item", ["jquery", "event_center", "assets_config", "asset_types", "system", "event", "progress_event", "error_event", "base64_js"], function(e, t, n, r, i, s, o, u, a) {
    var f = function(e) {
            if (arguments.length <= 0)
                return;
            var t = this;
            t.referenceCount = 1;
            var n = /:(\d+)$/;
            if (n.test(e)) {
                var i = e.match(n);
                t.sliceCount = parseInt(i[1], 10);
                var s = e.split(":");
                s = s.slice(0, s.length - 1),
                    e = s.join(":")
            } else
                t.sliceCount = 1;
            var o = /^\w+\|/;
            if (o.test(e)) {
                var u = e.split("|"),
                    a = u.slice(1),
                    f = a.join("|");
                u = u.slice(0, 1),
                    u = u.concat(f),
                    t.type = u[0],
                    t.uri = u[1]
            } else {
                var l = /\.(\w+)$/,
                    c = e.match(l);
                if (c != null && c.length >= 2) {
                    var h = c[1].toLowerCase();
                    switch (h) {
                        case "jpg":
                        case "jpeg":
                        case "gif":
                        case "png":
                            t.type = r.IMAGE;
                            break;
                        case "json":
                            t.type = r.JSON;
                            break;
                        case "html":
                        case "htm":
                            t.type = r.HTML;
                            break;
                        case "mp3":
                        case "ogg":
                            t.type = r.SOUND;
                            break;
                        case "xml":
                            t.type = r.XML;
                            break;
                        default:
                            t.type = r.TEXT
                    }
                } else
                    t.type = r.TEXT;
                t.uri = e
            }
            t.configLoadURL(t.uri),
                t.loaded = !1,
                t.asset = null,
                t.bytesLoaded = 0,
                t.bytesTotal = 0
        },
        l = f.prototype;
    return l.referenceCount = 0,
        l.startLoadTS = null,
        l.endLoadTS = null,
        l.failCount = 0,
        l.MAX_FAIL_COUNT = 10,
        l.uri = null,
        l.loadURL = null,
        l.type = null,
        l.loading = !1,
        l.loaded = !1,
        l.sliceCount = 1,
        l.bytesLoaded = 0,
        l.bytesTotal = 0,
        l.loadPercent = function() {
            var e = this,
                t = 0;
            return e.loaded ? t = 1 : e.bytesTotal == 0 ? t = 0 : t = e.bytesLoaded / e.bytesTotal,
                t
        },
        l.asset = null,
        l.configLoadURL = function(e) {
            var t = this,
                r = /^abs:/gi,
                i = /^https*/gi,
                s = /^\//gi,
                o = /^\.\//gi;
            r.test(e) ? t.loadURL = e.slice(4, e.length) : i.test(e) || s.test(e) || o.test(e) ? t.loadURL = e : t.loadURL = n.baseURI + e
        },
        l.load = function() {
            var e = this;
            e.loading = !0,
                e.startLoadTS = (new Date).getTime;
            var t = e[e.type + "Loader"];
            t.call(e)
        },
        l.assetPaths = null,
        l.assetImages = null,
        l.multipleAssetLoaded = function(e, n) {
            var r = this;
            r.assetPaths = e,
                r.assetImages = n,
                r.loaded = !0,
                r.loading = !1,
                r.endLoadTS = (new Date).getTime();
            var i = new s(r, s.LOAD);
            t.dispatchEvent(i)
        },
        l.assetLoaded = function(e) {
            var n = this;
            n.asset = e,
                n.loaded = !0,
                n.loading = !1,
                n.endLoadTS = (new Date).getTime();
            var r = new s(n, s.LOAD);
            t.dispatchEvent(r)
        },
        l.assetLoadError = function(e, n) {
            var r = this;
            r.failCount++;
            if (r.failCount < r.MAX_FAIL_COUNT)
                i.log("Fail to fetch data from url: " + r.loadURL + ". status: " + e + " des: " + n + ". Will retry in 150ms. Fail count:" + r.failCount),
                setTimeout(function() {
                    r.load()
                }, 150);
            else {
                var s = "Fail to fetch data from url: " + r.loadURL + ". status: " + e + " des: " + n + ". Try count:" + r.failCount;
                i.log(s);
                var o = new Error(s);
                t.dispatchEvent(new u(r, o))
            }
        },
        l.loadWithXHR = function(n, r, s, u) {
            var a = this;
            r = typeof r == "string" ? r : "text",
                s = typeof s == "boolean" ? s : !0,
                u = typeof u == "string" ? u : "get",
                e.ajax({
                    url: a.loadURL,
                    dataType: r,
                    async: !0,
                    cache: s,
                    type: u,
                    success: function(e, t) {
                        t == "success" ? n(e, t) : a.assetLoadError(t, "Unknown Error.")
                    },
                    xhr: function() {
                        var e = i.nativeXHR();
                        return e.onprogress = function(e) {
                                a.bytesTotal = e.total,
                                    a.bytesLoaded = e.loaded;
                                var n = new o(a, a.loadPercent());
                                t.dispatchEvent(n)
                            },
                            e
                    },
                    error: function(e, t, n) {
                        a.assetLoadError(t, n)
                    }
                })
        },
        l.imageLoader = function() {
            var t = this,
                n = e("<img/>");
            n[0].crossOrigin = "",
                n.width("auto").height("auto").css("display", "inline-block"),
                n.bind("load", function() {
                    n.removeAttr("style"),
                        t.assetLoaded(n[0])
                }),
                n.bind("error", function() {
                    t.assetLoadError("error", "Unknown error.")
                }),
                n.attr("src", t.loadURL)
        },
        l.textLoader = function() {
            var e = this,
                t = function(t) {
                    e.assetLoaded(t)
                };
            e.loadWithXHR(t, "text", !1)
        },
        l.jsonLoader = function() {
            var e = this,
                t = function(t) {
                    e.assetLoaded(t)
                };
            e.loadWithXHR(t, "json", !1)
        },
        l.htmlLoader = function() {
            var t = this,
                n = function(n) {
                    var r = e(n),
                        i = r.find("div[pre-load]");
                    i.length > 0 ? t.assetLoaded(r.find("> div[pre-load]")) : t.assetLoaded(r)
                };
            t.loadWithXHR(n, "html", !0)
        },
        l.xmlLoader = function() {
            var t = this,
                n = function(n) {
                    t.assetLoaded(e(n).find("> *"))
                };
            t.loadWithXHR(n, "xml", !0)
        },
        l.soundLoader = function() {
            var t = this,
                n = e("<audio></audio>");
            n.attr("src", t.loadURL),
                n.bind("canplaythrough suspend", function() {
                    t.assetLoaded(n[0]),
                        n.unbind()
                }),
                n.bind("error", function() {
                    t.assetLoadError("error", "Unknown error."),
                        n.unbind()
                }),
                n[0].load()
        },
        l.axeLoader = function() {
            var e = this,
                n = function(t) {
                    var n = t.currentTarget,
                        r = n.response,
                        i = new DataView(r),
                        s = 0,
                        o = [],
                        u = [],
                        f = [];
                    while (s < i.byteLength) {
                        var l = i.getUint32(s, !1);
                        s += 4;
                        var c = "";
                        for (var h = 0; h < l; h++) {
                            var p = i.getUint32(s, !1);
                            s += 4,
                                c += String.fromCharCode(p)
                        }
                        var d = i.getUint32(s, !1);
                        s += 4;
                        var v = new Uint8Array(r, s, d);
                        s += d,
                            o.push(c),
                            f.push(v)
                    }
                    var m = 0,
                        g = window.URL || window.webkitURL || window,
                        y = function() {
                            if (m >= f.length)
                                e.multipleAssetLoaded(o, u);
                            else {
                                var t = f[m],
                                    n = document.createElement("img");
                                n.onload = function(e) {
                                    try {
                                        g.revokeObjectURL(e.currentTarget.src)
                                    } catch (t) {}
                                    u.push(n),
                                        m += 1,
                                        y()
                                };
                                try {
                                    n.src = g.createObjectURL(new Blob([t]))
                                } catch (r) {
                                    var i = o[m].substr(o[m].length - 3, 3).toLowerCase(),
                                        s;
                                    i == "jpg" || i == "jpeg" ? s = "data:image/jpeg;base64," : i == "png" ? s = "data:image/png;base64," : i == "gif" && (s = "data:image/gif;base64,"),
                                        n.src = s + a.fromByteArray(t)
                                }
                            }
                        };
                    y()
                },
                r = i.nativeXHR();
            r.responseType = "arraybuffer",
                r.open("get", e.loadURL, !0),
                r.onload = n,
                r.onprogress = function(n) {
                    e.bytesTotal = n.total,
                        e.bytesLoaded = n.loaded;
                    var r = new o(e, e.loadPercent());
                    t.dispatchEvent(r)
                },
                r.onerror = function(t, n) {
                    e.assetLoadError(t, n)
                },
                r.send()
        },
        f
})
