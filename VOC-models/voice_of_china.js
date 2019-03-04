define("voice_of_china", ["stage_ctrl", "assets_loader", "section_cell", "section_head", "section_naying", "section_jay", "section_wangfeng", "section_harlern", "section_bottom", "section_footer", "section_top", "wechat_api", "wechat_event", "event_center", "url_util", "voc_constants"], function(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v) {
    var m = function() {
        var e = this;
        t.threadsCount = 1;
        var n = c.instance();
        n.initialize("http://voc.bungba.com/dev/php/wechat_js/jsticket.php"),
            n.shareTitle = "四大导师拯救麦渣",
            n.shareDesc = "如果你是KTV麦渣，看四大导师如何教你唱出好声音。",
            n.shareLink = d.cleanURL(),
            n.shareImageURL = d.relativePath("images/share.jpg"),
            n.updateSharing(),
            p.addListener(n, e, h.SUCCESS_SHARING, e.onWechatShared)
    };
    m.prototype = new e;
    var g = m.prototype;
    return g.constructor = m,
        g.loadAssets = function(t) {
            var n = this;
            t.push("text|http://voc.bungba.com/dev/php/voc/pv.php", "text|http://voc.bungba.com/dev/php/voc/like_count.php"),
                e.prototype.loadAssets.call(n, t)
        },
        g.pageBox = null,
        g.cells = null,
        g.onViewControllerPrepared = function() {
            var e = this;
            v.pvCount = parseInt(t.asset("http://voc.bungba.com/dev/php/voc/pv.php"), 10),
                v.likeCount = parseInt(t.asset("http://voc.bungba.com/dev/php/voc/like_count.php"), 10);
            var c = e.view().subViewByName("cell_views");
            c.remove(),
                e.cells = [],
                e.cells.push(new l(c.subViewByIndex(0)), new r(c.subViewByIndex(1)), new n(c.subViewByIndex(2)), new n(c.subViewByIndex(3)), new s(c.subViewByIndex(4)), new n(c.subViewByIndex(5)), new i(c.subViewByIndex(6)), new n(c.subViewByIndex(7)), new o(c.subViewByIndex(8)), new n(c.subViewByIndex(9)), new u(c.subViewByIndex(10)), new n(c.subViewByIndex(11)), new n(c.subViewByIndex(12)), new a(c.subViewByIndex(13)), new f(c.subViewByIndex(14))),
                e.pageBox = e.view().subViewByName("page_box"),
                e.pageBox.dataSource(e),
                e.pageBox.reloadData()
        },
        g.onViewResize = function(e, t) {
            var n = this;
            if (n.prepared) {
                n.view().width(e),
                    n.view().height(t),
                    n.pageBox.height(t),
                    n.pageBox.width(e);
                for (var r = 0; r < n.cells.length; r++) {
                    var i = n.cells[r].view(),
                        s = e / i.width();
                    i.scaleX(s),
                        i.scaleY(s)
                }
                n.pageBox.reloadData()
            }
        },
        g.isVertical = function(e) {
            return !0
        },
        g.cellCount = function(e) {
            var t = this;
            return t.cells.length
        },
        g.cellSizeByIndex = function(e, t) {
            var n = this;
            return n.cells[t].view().height() * n.cells[t].view().scaleY()
        },
        g.cellByIndex = function(e, t) {
            var n = this;
            return n.cells[t].view()
        },
        g.onWechatShared = function() {
            window["_hmt"] != undefined && _hmt.push(["_trackEvent", "SHAREING", "SHARING", "SHARING"])
        },
        m
})
