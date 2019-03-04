define("wechat_api", ["jquery", "jweixin", "system", "url_util", "event_center", "wechat_event"], function(e, t, n, r, i, s) {
    var o = function() {};
    o._instance = null,
        o.instance = function() {
            return o._instance == null && (o._instance = new o),
                o._instance
        };
    var u = o.prototype;
    return u.constructor = o,
        u.inited = !1,
        u.jsTicketInfo = null,
        u.debug = !1,
        u.jsApiList = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"],
        u.jsTicketURL = "./php/wechat_js/jsticket.php",
        u.initialize = function(t, n) {
            var i = this;
            if (i.inited !== !1)
                throw new Error("Wechat API has been initialized.");
            i.inited = !0,
                typeof n == "boolean" && (i.debug = n),
                typeof t == "string" && (i.jsTicketURL = t),
                e.get(i.jsTicketURL, {
                    js_url: r.cleanURL()
                }, function(e, t) {
                    t === "success" && (i.jsTicketInfo = e,
                        i.configWechat())
                }, "json")
        },
        u.shareTitle = "",
        u.shareLink = "",
        u.shareImageURL = "",
        u.shareDesc = "",
        u.timelineShareTitle = null,
        u.timelineShareLink = null,
        u.timelineShareImageURL = null,
        u.frinedShareTitle = null,
        u.friendShareLink = null,
        u.friendShareImageURL = null,
        u.friendShareDesc = null,
        u.qqShareTitle = null,
        u.qqShareLink = null,
        u.qqShareImageURL = null,
        u.qqShareDesc = null,
        u.shareType = "",
        u.shareDataURL = "",
        u.updateSharing = function() {
            var e = this;
            i.removeListener(e, e, s.WEICHAT_READY, e.updateSharing);
            if (e.isReady) {
                var n = function(t) {
                        i.dispatchEvent(new s(e, s.SUCCESS_SHARING, t.errMsg))
                    },
                    r = function(t) {
                        i.dispatchEvent(new s(e, s.CANCEL_SHARING, t.errMsg))
                    };
                t.onMenuShareTimeline({
                        title: e.timelineShareTitle || e.shareTitle,
                        link: e.timelineShareLink || e.shareLink,
                        imgUrl: e.timelineShareImageURL || e.shareImageURL,
                        success: n,
                        cancel: r
                    }),
                    t.onMenuShareAppMessage({
                        title: e.frinedShareTitle || e.shareTitle,
                        desc: e.friendShareDesc || e.shareDesc,
                        link: e.friendShareLink || e.shareLink,
                        imgUrl: e.friendShareImageURL || e.shareImageURL,
                        type: e.shareType,
                        dataUrl: e.shareDataURL,
                        success: n,
                        cancel: r
                    }),
                    t.onMenuShareQQ({
                        title: e.qqShareTitle || e.shareTitle,
                        desc: e.qqShareDesc || e.shareDesc,
                        link: e.qqShareLink || e.shareLink,
                        imgUrl: e.qqShareImageURL || e.shareImageURL,
                        success: n,
                        cancel: r
                    })
            } else
                i.addListener(e, e, s.WEICHAT_READY, e.updateSharing)
        },
        u.isReady = !1,
        u.JWeiXin = null,
        u.configWechat = function() {
            var e = this;
            t.ready(function(n) {
                    e.isReady = !0,
                        e.JWeiXin = t,
                        i.dispatchEvent(new s(e, s.WEICHAT_READY, n.errMsg))
                }),
                t.config({
                    debug: e.debug,
                    appId: e.jsTicketInfo.appId,
                    timestamp: e.jsTicketInfo.timestamp,
                    nonceStr: e.jsTicketInfo.nonceStr,
                    signature: e.jsTicketInfo.signature,
                    jsApiList: e.jsApiList
                })
        },
        o
})
