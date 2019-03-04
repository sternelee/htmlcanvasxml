define("assets_loader", ["jquery", "system", "event_center", "asset_item", "progress_event", "event", "error_event", "url_util", "asset_types"], function(e, t, n, r, i, s, o, u, a) {
        var f = function(e) {
            var t = this;
            isNaN(e) === !1 && (t._threadsCount = e)
        };
        f._assets = null,
            f.assets = function() {
                return f._assets == null && (f._assets = {}),
                    f._assets
            },
            f.threadsCount = 10,
            f.asset = function(e) {
                var t = f.assets(),
                    n = t[e];
                return n != null ? n.asset : null
            },
            f.releaseAssets = function(e) {
                var t = f.assets();
                for (var n = 0; n < e.length; n++) {
                    var r = e[n],
                        i = u.splitURLs(r);
                    for (var s = 0; s < i.length; s++) {
                        var o = i[s];
                        if (t.hasOwnProperty(o)) {
                            var a = t[o];
                            a.referenceCount -= 1,
                                a.referenceCount <= 0 && delete t[o]
                        }
                    }
                }
            },
            f.releaseAll = function() {
                var e = f.assets();
                for (var t in e)
                    if (e.hasOwnProperty(t)) {
                        var n = e[t];
                        n.referenceCount -= 1,
                            n.referenceCount <= 0 && delete e[t]
                    }
            },
            f.clearAll = function() {
                f._assets = null
            };
        var l = f.prototype;
        return l.assets = null,
            l.loadAssets = function(e) {
                var t = this;
                e = typeof e == "string" ? [e] : e,
                    t.assets = [];
                for (var a = 0; a < e.length; a++) {
                    var l = e[a],
                        c = u.splitURLs(l);
                    for (var h = 0; h < c.length; h++) {
                        var p = new r(c[h], t);
                        f.asset(p.uri) == null ? (n.addListener(p, t, [s.LOAD, i.PROGRESS, o.ERROR], [t.onAssetLoaded, t.onAssetLoadProgress, t.onAssetLoadError]),
                            t.assets.push(p)) : f.assets()[p.uri].referenceCount += 1
                    }
                }
                if (t.assets.length <= 0) {
                    var d = new s(t, s.LOAD);
                    n.dispatchEvent(d)
                } else
                    t.multipleThreadLoad()
            },
            l._threadsCount = 0,
            l.threadsCount = function() {
                var e = this,
                    t = e._threadsCount;
                if (isNaN(t) || t < 1)
                    t = f.threadsCount;
                return t
            },
            l.loadingItemCount = 0,
            l.multipleThreadLoad = function() {
                var e = this;
                if (e.loadingItemCount < e.threadsCount())
                    for (var t = 0; t < e.assets.length; t++) {
                        var n = e.assets[t];
                        if (n.loaded === !1 && n.loading === !1) {
                            n.load(),
                                e.loadingItemCount++;
                            if (e.loadingItemCount >= e.threadsCount())
                                break
                        }
                    }
            },
            l.loadProgress = function() {
                var e = this,
                    t = 0,
                    n = 0;
                for (var r = 0; r < e.assets.length; r++) {
                    var i = e.assets[r];
                    t += i.sliceCount,
                        n += i.loadPercent() * i.sliceCount
                }
                return n / t
            },
            l.onAssetLoaded = function(e) {
                var t = this,
                    u = e.target;
                n.removeListener(u, t, [s.LOAD, i.PROGRESS, o.ERROR], [t.onAssetLoaded, t.onAssetLoadProgress, t.onAssetLoadError]);
                if (u.type == a.AXE)
                    for (var l = 0; l < u.assetImages.length; l++) {
                        var c = u.assetPaths[l],
                            h = u.assetImages[l],
                            p = new r;
                        p.assetLoaded(h),
                            f.assets()[c] != null && (f.assets()[c].referenceCount += 1),
                            f.assets()[c] = p
                    }
                else
                    f.assets()[u.uri] != null && (f.assets()[u.uri].referenceCount += 1),
                    f.assets()[u.uri] = u;
                t.onAssetLoadProgress(),
                    t.loadingItemCount--,
                    t.multipleThreadLoad();
                if (t.loadingItemCount <= 0) {
                    var d = new s(t, s.LOAD);
                    n.dispatchEvent(d)
                }
            },
            l.onAssetLoadProgress = function() {
                var e = this,
                    t = e.loadProgress(),
                    r = new i(e, t);
                n.dispatchEvent(r)
            },
            l.onAssetLoadError = function(e) {
                var t = this,
                    r = e.clone();
                r.target = t,
                    n.dispatchEvent(r)
            },
            f
    })