// 以下微信与QQ人分享操作
! function(e, t) {
    "function" == typeof define && (define.amd || define.cmd) ? define("jweixin", [], function() {
        return t(e)
    }) : t(e, !0)
}
(this, function(e, t) {
    function n(t, n, r) {
        e.WeixinJSBridge ? WeixinJSBridge.invoke(t, i(n), function(e) {
            u(t, e, r)
        }) : l(t, r)
    }

    function r(t, n, r) {
        e.WeixinJSBridge ? WeixinJSBridge.on(t, function(e) {
            r && r.trigger && r.trigger(e),
                u(t, e, n)
        }) : r ? l(t, r) : l(t, n)
    }

    function i(e) {
        return e = e || {},
            e.appId = C.appId,
            e.verifyAppId = C.appId,
            e.verifySignType = "sha1",
            e.verifyTimestamp = C.timestamp + "",
            e.verifyNonceStr = C.nonceStr,
            e.verifySignature = C.signature,
            e
    }

    function s(e, t) {
        return {
            scope: t,
            signType: "sha1",
            timeStamp: e.timestamp + "",
            nonceStr: e.nonceStr,
            addrSign: e.addrSign
        }
    }

    function o(e) {
        return {
            timeStamp: e.timestamp + "",
            nonceStr: e.nonceStr,
            "package": e.package,
            paySign: e.paySign,
            signType: e.signType || "SHA1"
        }
    }

    function u(e, t, n) {
        var r, i, s;
        switch (delete t.err_code,
            delete t.err_desc,
            delete t.err_detail,
            r = t.errMsg,
            r || (r = t.err_msg,
                delete t.err_msg,
                r = a(e, r, n),
                t.errMsg = r),
            n = n || {},
            n._complete && (n._complete(t),
                delete n._complete),
            r = t.errMsg || "",
            C.debug && !n.isInnerInvoke && alert(JSON.stringify(t)),
            i = r.indexOf(":"),
            s = r.substring(i + 1)) {
            case "ok":
                n.success && n.success(t);
                break;
            case "cancel":
                n.cancel && n.cancel(t);
                break;
            default:
                n.fail && n.fail(t)
        }
        n.complete && n.complete(t)
    }

    function a(e, t) {
        var n, r, i, s;
        if (t) {
            switch (n = t.indexOf(":"),
                e) {
                case v.config:
                    r = "config";
                    break;
                case v.openProductSpecificView:
                    r = "openProductSpecificView";
                    break;
                default:
                    r = t.substring(0, n),
                        r = r.replace(/_/g, " "),
                        r = r.replace(/\b\w+\b/g, function(e) {
                            return e.substring(0, 1).toUpperCase() + e.substring(1)
                        }),
                        r = r.substring(0, 1).toLowerCase() + r.substring(1),
                        r = r.replace(/ /g, ""), -1 != r.indexOf("Wcpay") && (r = r.replace("Wcpay", "WCPay")),
                        i = m[r],
                        i && (r = i)
            }
            s = t.substring(n + 1),
                "confirm" == s && (s = "ok"), -1 != s.indexOf("failed_") && (s = s.substring(7)), -1 != s.indexOf("fail_") && (s = s.substring(5)),
                s = s.replace(/_/g, " "),
                s = s.toLowerCase(),
                ("access denied" == s || "no permission to execute" == s) && (s = "permission denied"),
                "config" == r && "function not exist" == s && (s = "ok"),
                t = r + ":" + s
        }
        return t
    }

    function f(e) {
        var t, n, r, i;
        if (e) {
            for (t = 0,
                n = e.length; n > t; ++t)
                r = e[t],
                i = v[r],
                i && (e[t] = i);
            return e
        }
    }

    function l(e, t) {
        if (C.debug && !t.isInnerInvoke) {
            var n = m[e];
            n && (e = n),
                t && t._complete && delete t._complete,
                console.log('"' + e + '",', t || "")
        }
    }

    function c() {
        if (!("6.0.2" > x || N.systemType < 0)) {
            var e = new Image;
            N.appId = C.appId,
                N.initTime = T.initEndTime - T.initStartTime,
                N.preVerifyTime = T.preVerifyEndTime - T.preVerifyStartTime,
                A.getNetworkType({
                    isInnerInvoke: !0,
                    success: function(t) {
                        N.networkType = t.networkType;
                        var n = "https://open.weixin.qq.com/sdk/report?v=" + N.version + "&o=" + N.isPreVerifyOk + "&s=" + N.systemType + "&c=" + N.clientVersion + "&a=" + N.appId + "&n=" + N.networkType + "&i=" + N.initTime + "&p=" + N.preVerifyTime + "&u=" + N.url;
                        e.src = n
                    }
                })
        }
    }

    function h() {
        return (new Date).getTime()
    }

    function p(t) {
        w && (e.WeixinJSBridge ? t() : g.addEventListener && g.addEventListener("WeixinJSBridgeReady", t, !1))
    }

    function d() {
        A.invoke || (A.invoke = function(t, n, r) {
                e.WeixinJSBridge && WeixinJSBridge.invoke(t, i(n), r)
            },
            A.on = function(t, n) {
                e.WeixinJSBridge && WeixinJSBridge.on(t, n)
            }
        )
    }
    var v, m, g, y, b, w, E, S, x, T, N, C, k, L, A;
    if (!e.jWeixin)
        return v = {
                config: "preVerifyJSAPI",
                onMenuShareTimeline: "menu:share:timeline",
                onMenuShareAppMessage: "menu:share:appmessage",
                onMenuShareQQ: "menu:share:qq",
                onMenuShareWeibo: "menu:share:weiboApp",
                previewImage: "imagePreview",
                getLocation: "geoLocation",
                openProductSpecificView: "openProductViewWithPid",
                addCard: "batchAddCard",
                openCard: "batchViewCard",
                chooseWXPay: "getBrandWCPayRequest"
            },
            m = function() {
                var e, t = {};
                for (e in v)
                    t[v[e]] = e;
                return t
            }
            (),
            g = e.document,
            y = g.title,
            b = navigator.userAgent.toLowerCase(),
            w = -1 != b.indexOf("micromessenger"),
            E = -1 != b.indexOf("android"),
            S = -1 != b.indexOf("iphone") || -1 != b.indexOf("ipad"),
            x = function() {
                var e = b.match(/micromessenger\/(\d+\.\d+\.\d+)/) || b.match(/micromessenger\/(\d+\.\d+)/);
                return e ? e[1] : ""
            }
            (),
            T = {
                initStartTime: h(),
                initEndTime: 0,
                preVerifyStartTime: 0,
                preVerifyEndTime: 0
            },
            N = {
                version: 1,
                appId: "",
                initTime: 0,
                preVerifyTime: 0,
                networkType: "",
                isPreVerifyOk: 1,
                systemType: S ? 1 : E ? 2 : -1,
                clientVersion: x,
                url: encodeURIComponent(location.href)
            },
            C = {},
            k = {
                _completes: []
            },
            L = {
                state: 0,
                res: {}
            },
            p(function() {
                T.initEndTime = h()
            }),
            A = {
                config: function(e) {
                    C = e,
                        l("config", e),
                        p(function() {
                            n(v.config, {
                                        verifyJsApiList: f(C.jsApiList)
                                    }, function() {
                                        k._complete = function(e) {
                                                T.preVerifyEndTime = h(),
                                                    L.state = 1,
                                                    L.res = e
                                            },
                                            k.success = function() {
                                                N.isPreVerifyOk = 0
                                            },
                                            k.fail = function(e) {
                                                k._fail ? k._fail(e) : L.state = -1
                                            };
                                        var e = k._completes;
                                        return e.push(function() {
                                                C.debug || c()
                                            }),
                                            k.complete = function(t) {
                                                for (var n = 0, r = e.length; r > n; ++n)
                                                    e[n](t);
                                                k._completes = []
                                            },
                                            k
                                    }
                                    ()),
                                T.preVerifyStartTime = h()
                        }),
                        C.beta && d()
                },
                ready: function(e) {
                    0 != L.state ? e() : (k._completes.push(e), !w && C.debug && e())
                },
                error: function(e) {
                    "6.0.2" > x || (-1 == L.state ? e(L.res) : k._fail = e)
                },
                checkJsApi: function(e) {
                    var t = function(e) {
                        var t, n, r = e.checkResult;
                        for (t in r)
                            n = m[t],
                            n && (r[n] = r[t],
                                delete r[t]);
                        return e
                    };
                    n("checkJsApi", {
                            jsApiList: f(e.jsApiList)
                        }, function() {
                            return e._complete = function(e) {
                                    if (E) {
                                        var n = e.checkResult;
                                        n && (e.checkResult = JSON.parse(n))
                                    }
                                    e = t(e)
                                },
                                e
                        }
                        ())
                },
                onMenuShareTimeline: function(e) {
                    r(v.onMenuShareTimeline, {
                        complete: function() {
                            n("shareTimeline", {
                                title: e.title || y,
                                desc: e.title || y,
                                img_url: e.imgUrl,
                                link: e.link || location.href
                            }, e)
                        }
                    }, e)
                },
                onMenuShareAppMessage: function(e) {
                    r(v.onMenuShareAppMessage, {
                        complete: function() {
                            n("sendAppMessage", {
                                title: e.title || y,
                                desc: e.desc || "",
                                link: e.link || location.href,
                                img_url: e.imgUrl,
                                type: e.type || "link",
                                data_url: e.dataUrl || ""
                            }, e)
                        }
                    }, e)
                },
                onMenuShareQQ: function(e) {
                    r(v.onMenuShareQQ, {
                        complete: function() {
                            n("shareQQ", {
                                title: e.title || y,
                                desc: e.desc || "",
                                img_url: e.imgUrl,
                                link: e.link || location.href
                            }, e)
                        }
                    }, e)
                },
                onMenuShareWeibo: function(e) {
                    r(v.onMenuShareWeibo, {
                        complete: function() {
                            n("shareWeiboApp", {
                                title: e.title || y,
                                desc: e.desc || "",
                                img_url: e.imgUrl,
                                link: e.link || location.href
                            }, e)
                        }
                    }, e)
                },
                startRecord: function(e) {
                    n("startRecord", {}, e)
                },
                stopRecord: function(e) {
                    n("stopRecord", {}, e)
                },
                onVoiceRecordEnd: function(e) {
                    r("onVoiceRecordEnd", e)
                },
                playVoice: function(e) {
                    n("playVoice", {
                        localId: e.localId
                    }, e)
                },
                pauseVoice: function(e) {
                    n("pauseVoice", {
                        localId: e.localId
                    }, e)
                },
                stopVoice: function(e) {
                    n("stopVoice", {
                        localId: e.localId
                    }, e)
                },
                onVoicePlayEnd: function(e) {
                    r("onVoicePlayEnd", e)
                },
                uploadVoice: function(e) {
                    n("uploadVoice", {
                        localId: e.localId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                downloadVoice: function(e) {
                    n("downloadVoice", {
                        serverId: e.serverId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                translateVoice: function(e) {
                    n("translateVoice", {
                        localId: e.localId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                chooseImage: function(e) {
                    n("chooseImage", {
                            scene: "1|2"
                        }, function() {
                            return e._complete = function(e) {
                                    if (E) {
                                        var t = e.localIds;
                                        t && (e.localIds = JSON.parse(t))
                                    }
                                },
                                e
                        }
                        ())
                },
                previewImage: function(e) {
                    n(v.previewImage, {
                        current: e.current,
                        urls: e.urls
                    }, e)
                },
                uploadImage: function(e) {
                    n("uploadImage", {
                        localId: e.localId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                downloadImage: function(e) {
                    n("downloadImage", {
                        serverId: e.serverId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                getNetworkType: function(e) {
                    var t = function(e) {
                        var t, n, r, i = e.errMsg;
                        if (e.errMsg = "getNetworkType:ok",
                            t = e.subtype,
                            delete e.subtype,
                            t)
                            e.networkType = t;
                        else
                            switch (n = i.indexOf(":"),
                                r = i.substring(n + 1)) {
                                case "wifi":
                                case "edge":
                                case "wwan":
                                    e.networkType = r;
                                    break;
                                default:
                                    e.errMsg = "getNetworkType:fail"
                            }
                        return e
                    };
                    n("getNetworkType", {}, function() {
                            return e._complete = function(e) {
                                    e = t(e)
                                },
                                e
                        }
                        ())
                },
                openLocation: function(e) {
                    n("openLocation", {
                        latitude: e.latitude,
                        longitude: e.longitude,
                        name: e.name || "",
                        address: e.address || "",
                        scale: e.scale || 28,
                        infoUrl: e.infoUrl || ""
                    }, e)
                },
                getLocation: function(e) {
                    n(v.getLocation, function() {
                            var t = s(e, "jsapi_location");
                            return t.type = "wgs84",
                                t
                        }
                        (),
                        function() {
                            return e._complete = function(e) {
                                    delete e.type
                                },
                                e
                        }
                        ())
                },
                hideOptionMenu: function(e) {
                    n("hideOptionMenu", {}, e)
                },
                showOptionMenu: function(e) {
                    n("showOptionMenu", {}, e)
                },
                closeWindow: function(e) {
                    n("closeWindow", {
                        immediate_close: e && e.immediateClose || 0
                    }, e)
                },
                hideMenuItems: function(e) {
                    n("hideMenuItems", {
                        menuList: e.menuList
                    }, e)
                },
                showMenuItems: function(e) {
                    n("showMenuItems", {
                        menuList: e.menuList
                    }, e)
                },
                hideAllNonBaseMenuItem: function(e) {
                    n("hideAllNonBaseMenuItem", {}, e)
                },
                showAllNonBaseMenuItem: function(e) {
                    n("showAllNonBaseMenuItem", {}, e)
                },
                scanQRCode: function(e) {
                    n("scanQRCode", {
                        desc: e.desc,
                        needResult: e.needResult || 0,
                        scanType: e.scanType || ["qrCode", "barCode"]
                    }, e)
                },
                openProductSpecificView: function(e) {
                    n(v.openProductSpecificView, {
                        pid: e.productId,
                        view_type: e.viewType || 0
                    }, e)
                },
                addCard: function(e) {
                    var t, r, i, s, o = e.cardList,
                        u = [];
                    for (t = 0,
                        r = o.length; r > t; ++t)
                        i = o[t],
                        s = {
                            card_id: i.cardId,
                            card_ext: i.cardExt
                        },
                        u.push(s);
                    n(v.addCard, {
                            card_list: u
                        }, function() {
                            return e._complete = function(e) {
                                    var t, n, r, i = e.card_list;
                                    if (i) {
                                        for (i = JSON.parse(i),
                                            t = 0,
                                            n = i.length; n > t; ++t)
                                            r = i[t],
                                            r.cardId = r.card_id,
                                            r.cardExt = r.card_ext,
                                            r.isSuccess = r.is_succ ? !0 : !1,
                                            delete r.card_id,
                                            delete r.card_ext,
                                            delete r.is_succ;
                                        e.cardList = i,
                                            delete e.card_list
                                    }
                                },
                                e
                        }
                        ())
                },
                chooseCard: function(e) {
                    n("chooseCard", {
                            app_id: C.appId,
                            location_id: e.shopId || "",
                            sign_type: e.signType || "SHA1",
                            card_id: e.cardId || "",
                            card_type: e.cardType || "",
                            card_sign: e.cardSign,
                            time_stamp: e.timestamp + "",
                            nonce_str: e.nonceStr
                        }, function() {
                            return e._complete = function(e) {
                                    e.cardList = e.choose_card_info,
                                        delete e.choose_card_info
                                },
                                e
                        }
                        ())
                },
                openCard: function(e) {
                    var t, r, i, s, o = e.cardList,
                        u = [];
                    for (t = 0,
                        r = o.length; r > t; ++t)
                        i = o[t],
                        s = {
                            card_id: i.cardId,
                            code: i.code
                        },
                        u.push(s);
                    n(v.openCard, {
                        card_list: u
                    }, e)
                },
                chooseWXPay: function(e) {
                    n(v.chooseWXPay, o(e), e)
                }
            },
            t && (e.wx = e.jWeixin = A),
            A
})
