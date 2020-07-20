import jQuery from 'jquery'

export const system = function (e = jQuery) {
  let t = function() {};
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
                let e = ["iphone", "android", "ipod", "ipad"],
                    t = !1;
                for (let n = 0; n < e.length; n++)
                    if (navigator.appVersion.toLowerCase().indexOf(e[n]) > -1) {
                        t = !0;
                        break
                    }
                return t
            },
            t.isSupportCSS3Transform = function() {
                let t = e("<div></div>"),
                    n = "scale(2,2)",
                    r = ["-webkit-transform", "-moz-transform", "-o-transform", "-ms-transform", "transform"];
                e.each(r, function(e, r) {
                    t.css(r, n)
                });
                let i = !1;
                return e.each(r, function(e, n) {
                        let r = t.css(n);
                        return r != undefined && r.toLowerCase().indexOf("scale") > -1 ? (i = !0, !1) : !0
                    }),
                    i
            },
            t.isSupportCanvas = function() {
                let e = !1;
                try {
                    let t = document.createElement("canvas");
                    t.getContext("2d"),
                        e = !0
                } catch (n) {
                    e = !1
                }
                return e
            },
            t.isSupportMotion = function() {
                let e = window["DeviceOrientationEvent"] != undefined;
                return e
            },
            t.inWechatBrowser = function() {
                let e = /MicroMessenger/i,
                    t = navigator.userAgent;
                return e.test(t)
            },
            t._xhrSupportProgressEvent = null,
            t.xhrSupportProgressEvent = function() {
                if (t._xhrSupportProgressEvent == null) {
                    let e = t.nativeXHR();
                    t._xhrSupportProgressEvent = typeof e["onprogress"] != "undefined"
                }
                return t._xhrSupportProgressEvent
            },
            t.vendorJSProp = function(e, t) {
                let n = undefined;
                if (e[t] != undefined)
                    n = e[t];
                else {
                    let r = t.slice(0, 1).toUpperCase() + t.slice(1, t.length),
                        i = ["webkit", "moz", "o", "ms"];
                    for (let s = 0; s < i.length; s++) {
                        let o = i[s] + r;
                        if (e[o] != undefined) {
                            n = e[o];
                            break
                        }
                    }
                }
                return n
            },
            t.vendorPrefix = function() {
                let e = null;
                return document["hidden"] != undefined ? e = "" : document["webkitHidden"] != undefined ? e = "webkit" : document["mozHidden"] != undefined ? e = "moz" : document["oHidden"] != undefined ? e = "o" : document["msHidden"] != undefined && (e = "ms"),
                    e
            },
            t.addVendorPrefix = function(e) {
                let n = null,
                    r = t.vendorPrefix();
                return r != null && (r.length <= 0 ? n = e : n = r + e.slice(0, 1).toUpperCase() + e.slice(1, e.length)),
                    n
            },
            t.nativeXHR = function() {
                let e = null;
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
}();

export const run_loop = function (e = system) {
  let t = function() {};
        return t.targets = [],
            t.timer = undefined,
            t.lastTS = 0,
            t.enterFrame = function() {
                let t = null,
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
                let t = e.vendorJSProp(window, "cancelAnimationFrame");
                t == null && (t = window.clearTimeout);
                let n = function(e) {
                    t.call(window, e)
                };
                return n
            }
            (),
            t.documentHidden = function() {
                let t = e.vendorJSProp(document, "hidden");
                return typeof t == "undefined" && (t = !1),
                    t
            },
            t.active = t.documentHidden() === !1,
            t.onActivate = function() {
                if (t.active === !1) {
                    t.active = !0;
                    for (let e = 0; e < t.targets.length; e++) {
                        let n = t.targets[e],
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
                    for (let e = 0; e < t.targets.length; e++) {
                        let n = t.targets[e],
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
                    let n = e.addVendorPrefix("visibilitychange");
                    window.addEventListener(n, function() {
                            t.documentHidden() ? t.onDeactivate() : t.onActivate()
                        }),
                        t.lastTS = (new Date).getTime(),
                        t.active && (t.timer = t.enterFrame(t.onFire)),
                        t.targets = []
                }
            },
            t.addToRunLoop = function(e) {
                t.initialize();
                let n = !1;
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
                let e = (new Date).getTime(),
                    n = (e - t.lastTS) / 1e3;
                for (let r = 0; r < t.targets.length; r++) {
                    let i = t.targets[r],
                        s = i.target;
                    if (typeof s["fire"] == "function") {
                        let o = (e - i.ts) / 1e3;
                        s.fire.call(s, o, n)
                    }
                }
                t.lastTS = e,
                    t.timer = t.enterFrame(t.onFire)
            },
            t.removeFromRunLoop = function(e) {
                for (let n = 0; n < t.targets.length; n++)
                    if (t.targets[n]["target"] == e) {
                        t.targets.splice(n, 1);
                        break
                    }
            },
            t
}();

export const vec2 = function () {
  let e = function(e, t) {
    let n = this;
    this.x = isNaN(e) ? n.x : e,
        this.y = isNaN(t) ? n.y : t
}
return e.constructor = e,
    e.prototype.x = 0,
    e.prototype.y = 0,
    e.prototype.equalsTo = function(e) {
        let t = this;
        return t.x == e.x && t.y == e.y
    },
    e.prototype.radian = function() {
        let e = this,
            t = 0;
        if (e.x == 0)
            e.y > 0 ? t = Math.PI / 2 : e.y < 0 ? t = -1 * Math.PI / 2 : e.y == 0 && (t = 0);
        else {
            t = Math.atan(e.y / e.x);
            if (e.y <= 0 && e.x < 0 || e.y >= 0 && e.x < 0)
                t += Math.PI
        }
        return t
    },
    e.prototype.radian2PI = function() {
        let e = this,
            t = 0;
        return e.x == 0 ? e.y > 0 ? t = Math.PI / 2 : e.y < 0 ? t = Math.PI / 2 * 3 : e.y == 0 && (t = 0) : (t = Math.atan(e.y / e.x),
                e.x < 0 && e.y > 0 ? t += Math.PI : e.x < 0 && e.y < 0 ? t += Math.PI : e.x > 0 && e.y < 0 && (t += Math.PI * 2)),
            t
    },
    e.prototype.angle2PI = function() {
        let e = this;
        return e.radian2PI() * (180 / Math.PI)
    },
    e.prototype.angle = function() {
        let e = this;
        return e.radian() * (180 / Math.PI)
    },
    e.prototype.multiple = function(e) {
        let t = this;
        t.x = t.x * e,
            t.y = t.y * e
    },
    e.prototype.multipleWith = function(t) {
        let n = this;
        return new e(n.x * t, n.y * t)
    },
    e.prototype.multipleVec2 = function(e) {
        let t = this;
        t.x = t.x * e.x,
            t.y = t.y * e.y
    },
    e.prototype.multipleWithVec2 = function(t) {
        let n = this;
        return new e(n.x * t.x, n.y * t.y)
    },
    e.prototype.add = function(t) {
        let n = this;
        return new e(n.x + t.x, n.y + t.y)
    },
    e.prototype.subtract = function(t) {
        let n = this;
        return new e(n.x - t.x, n.y - t.y)
    },
    e.prototype.normalize = function() {
        let e = this,
            t = e.len();
        t > 0 && (e.x = e.x / t,
            e.y = e.y / t)
    },
    e.prototype.normalization = function() {
        let t = this,
            n = t.len(),
            r = 0,
            i = 0;
        return n > 0 && (r = t.x / n,
                i = t.y / n),
            new e(r, i)
    },
    e.prototype.len = function() {
        let e = this;
        return Math.sqrt(e.x * e.x + e.y * e.y)
    },
    e.prototype.distance = function(e) {
        let t = this;
        return Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y))
    },
    e.prototype.intersect = function(e) {
        let t = this;
        return e.y >= t.x && t.y >= e.x
    },
    e.prototype.contains = function(e) {
        let t = this;
        return e >= t.x && e <= t.y
    },
    e.prototype.clone = function() {
        let t = this;
        return new e(t.x, t.y)
    },
    e.prototype.toString = function() {
        let e = this;
        return "[x:" + e.x + ",y:" + e.y + "]"
    },
    e
}();

export const mat3 = function (e = vec2) {
  let t = function(e, t, n, r, i, s) {
    let o = this;
    o.a = isNaN(e) ? o.a : parseFloat(e),
        o.b = isNaN(t) ? o.b : parseFloat(t),
        o.c = isNaN(n) ? o.c : parseFloat(n),
        o.d = isNaN(r) ? o.d : parseFloat(r),
        o.tx = isNaN(i) ? o.tx : parseFloat(i),
        o.ty = isNaN(s) ? o.ty : parseFloat(s)
};
return t.rotateMat = function(e, n) {
        let r = new t;
        return r.a = Math.cos(e),
            r.b = Math.sin(e),
            r.c = -1 * r.b,
            r.d = r.a,
            r.tx = n.x - r.a * n.x - r.c * n.y,
            r.ty = n.y - r.b * n.x - r.d * n.y,
            r
    },
    t.mat3With3Points = function(e, n) {
        let r = ((n[0].x - n[1].x) * (e[1].y - e[2].y) - (n[1].x - n[2].x) * (e[0].y - e[1].y)) / ((e[0].x - e[1].x) * (e[1].y - e[2].y) - (e[1].x - e[2].x) * (e[0].y - e[1].y)),
            i = ((n[0].x - n[1].x) * (e[0].x - e[2].x) - (n[0].x - n[2].x) * (e[0].x - e[1].x)) / ((e[0].x - e[2].x) * (e[0].y - e[1].y) - (e[0].x - e[1].x) * (e[0].y - e[2].y)),
            s = n[0].x - r * e[0].x - i * e[0].y,
            o = ((n[0].y - n[1].y) * (e[1].y - e[2].y) - (n[1].y - n[2].y) * (e[0].y - e[1].y)) / ((e[0].x - e[1].x) * (e[1].y - e[2].y) - (e[1].x - e[2].x) * (e[0].y - e[1].y)),
            u = ((n[0].y - n[1].y) * (e[0].x - e[2].x) - (n[0].y - n[2].y) * (e[0].x - e[1].x)) / ((e[0].x - e[2].x) * (e[0].y - e[1].y) - (e[0].x - e[1].x) * (e[0].y - e[2].y)),
            a = n[0].y - o * e[0].x - u * e[0].y;
        return new t(r, o, i, u, s, a)
    },
    t.prototype.a = 1,
    t.prototype.b = 0,
    t.prototype.c = 0,
    t.prototype.d = 1,
    t.prototype.tx = 0,
    t.prototype.ty = 0,
    t.prototype.scale = function(e, n) {
        n = arguments.length >= 2 ? n : e;
        let r = this;
        r.concat(new t(e, 0, 0, n))
    },
    t.prototype.rotate = function(e) {
        let n = this,
            r = e * (Math.PI / 180);
        n.concat(new t(Math.cos(r), Math.sin(r), Math.sin(r) * -1, Math.cos(r)))
    },
    t.prototype.move = function(e, n) {
        let r = this;
        r.concat(new t(1, 0, 0, 1, e, n))
    },
    t.prototype.concat = function(e) {
        let t = this,
            n = t.concatWith(e);
        t.a = n.a,
            t.b = n.b,
            t.c = n.c,
            t.d = n.d,
            t.tx = n.tx,
            t.ty = n.ty
    },
    t.prototype.concatWith = function(e) {
        let n = this,
            r = n.a * e.a + n.b * e.c,
            i = n.a * e.b + n.b * e.d,
            s = n.c * e.a + n.d * e.c,
            o = n.c * e.b + n.d * e.d,
            u = n.tx * e.a + n.ty * e.c + e.tx,
            a = n.tx * e.b + n.ty * e.d + e.ty;
        return new t(r, i, s, o, u, a)
    },
    t.prototype.transformPoint = function(t) {
        let n = this,
            r = new e;
        return r.x = t.x * n.a + t.y * n.c + n.tx,
            r.y = t.x * n.b + t.y * n.d + n.ty,
            r
    },
    t.prototype.inversePoint = function(e) {
        let t = this,
            n = t.inversion();
        return n.transformPoint(e)
    },
    t.prototype.determinant = function() {
        let e = this;
        return e.a * e.d - e.b * e.c
    },
    t.prototype.inversion = function() {
        let e = this,
            t = e.clone();
        return t.inverse(),
            t
    },
    t.prototype.inverse = function() {
        let e = this,
            t = e.determinant();
        if (t === 0)
            throw new Error("The matrix can not be inverse properly. " + e.toString());
        let n = 1 / t,
            r = e.d * n,
            i = -1 * e.b * n,
            s = -1 * e.c * n,
            o = e.a * n,
            u = (e.c * e.ty - e.d * e.tx) * n,
            a = -1 * (e.a * e.ty - e.b * e.tx) * n;
        e.a = r,
            e.b = i,
            e.c = s,
            e.d = o,
            e.tx = u,
            e.ty = a
    },
    t.prototype.adjoint = function() {
        let e = this,
            n = e.d,
            r = -1 * e.b,
            i = -1 * e.c,
            s = e.a,
            o = e.c * e.ty - e.d * e.tx,
            u = -1 * (e.a * e.ty - e.b * e.tx);
        return new t(n, r, i, s, o, u)
    },
    t.prototype.equalsTo = function(e) {
        let t = this,
            n = !1;
        return e != null && (n = t.a == e.a && t.b == e.b && t.c == e.c && t.d == e.d && t.tx == e.tx && t.ty == e.ty),
            n
    },
    t.prototype.clone = function() {
        let e = this;
        return new t(e.a, e.b, e.c, e.d, e.tx, e.ty)
    },
    t.prototype.toArray = function() {
        let e = this;
        return [e.a, e.b, e.c, e.d, e.tx, e.ty]
    },
    t.prototype.toString = function() {
        let e = this,
            t = "a:" + e.a + "  " + "b:" + e.b;
        return t += " c:" + e.c + "  " + "d:" + e.d,
            t += " tx:" + e.tx + "  " + "ty:" + e.ty,
            t
    },
    t
}();

export const event = function () {
  let e = function(e, t) {
    let n = this;
    arguments.length >= 2 && (n.target = e,
            n.type = t),
        n.timeStamp = (new Date).getTime()
};
return e.LOAD = "load",
    e.PREPARED = "prepared",
    e.UPDATE = "update",
    e.READY = "ready",
    e.ADDED = "added",
    e.ADD_TO_STAGE = "add_to_stage",
    e.REMOVED = "removed",
    e.REMOVE_FROM_STAGE = "remove_from_stage",
    e.ANIMATION_BEGIN = "animation_begin",
    e.ANIMATION_END = "animation_end",
    e.RESIZE = "resize",
    e.FINISH = "finish",
    e.END = "end",
    e.CHANGE = "change",
    e.prototype.constructor = e,
    e.prototype.type = null,
    e.prototype.target = null,
    e.prototype.timeStamp = 0,
    e.prototype.clone = function(t) {
        let n = this;
        return t = arguments.length > 0 ? t : n.target,
            new e(t, n.type)
    },
    e
}();

export const touch_event = function (e = event) {
  let t = function(t, n, r) {
    let i = this;
    e.prototype.constructor.call(i, t, n),
        i.touches = r
};
return t.CLICK = "click",
    t.TOUCH_START = "touch_start",
    t.TOUCH_MOVE = "touch_move",
    t.TOUCH_END = "touch_end",
    t.SWIPE = "swipe",
    t.prototype = new e,
    t.prototype.constructor = t,
    t.prototype.touches = null,
    t.prototype.clone = function(e) {
        let n = this;
        return e = arguments.length > 0 ? e : n.target,
            new t(e, n.type, n.touches.slice(0))
    },
    t
}();

export const touch = function () {
  let e = function(e, t, n, r) {
    let i = this;
    i.x = e,
        i.y = t,
        i.stageX = n,
        i.stageY = r
};
return e.prototype.constructor = e,
    e.prototype.x = 0,
    e.prototype.y = 0,
    e.prototype.stageX = 0,
    e.prototype.stageY = 0,
    e
}();

export const text_align = function () {
  let e = function() {};
        return e.LEFT = "left",
            e.CENTER = "center",
            e.RIGHT = "right",
            e
}();

export const render_engine = function (e = jQuery, t = run_loop, n = system, r = mat3, i = vec2, s = touch_event, o = touch, u = text_align) {
  let a = function(n) {
    let r = this;
    r.stage = n,
        r.$body = e("body"),
        r.$txtFPS = r.$body.find("input.txt_fps"),
        r.$canvas = e("<canvas></canvas>"),
        r.$body.append(r.$canvas),
        e(window).bind("resize", function() {
            r.stage.needResizeFlag = !0
        }),
        r.resize(),
        r.configEvents(),
        t.addToRunLoop(r)
},
f = a.prototype;
return a.prototype.stage = null,
a.prototype.$canvas = null,
a.prototype.$body = null,
a.prototype.$txtFPS = null,
a.prototype.onActivate = function() {
    let e = this;
    e.stage.active(!0)
},
a.prototype.onDeactivate = function() {
    let e = this;
    e.stage.active(!1)
},
a.prototype.resize = function() {
    let t = this,
        n = e(window).width(),
        r = e(window).height();
    t.$body.width(n).height(r),
        t.$canvas.css("position", "absolute"),
        t.$canvas.css("left", 0),
        t.$canvas.css("top", 0),
        t.$canvas.css("width", n),
        t.$canvas.css("height", r),
        t.stage.resize(n, r)
},
a.prototype.fire = function(e, t) {
    let n = this;
    n.$txtFPS != null && n.$txtFPS.val(Math.round(1 / t * 10) / 10),
        n.stage.update(e, t);
    if (n.stage.needToRender() || n.stage.needResizeFlag) {
        n.stage.needToRender(!1),
            n.stage.needResizeFlag && (n.stage.needResizeFlag = !1,
                n.resize()),
            n.$canvas.attr("width", n.stage.stageWidth()),
            n.$canvas.attr("height", n.stage.stageHeight());
        let r = n.$canvas[0].getContext("2d");
        r.clearRect(0, 0, n.stage.stageWidth(), n.stage.stageHeight()),
            n.render(r, n.stage, n.stage.stageMatrix())
    }
},
a.prototype.takePhoto = function(t, n, i) {
    let s = this,
        o = e("<canvas></canvas>");
    o.attr("width", t.width()),
        o.attr("height", t.height());
    let u = t.clone();
    u.matrix(new r);
    let a = o[0].getContext("2d");
    s.render(a, u, new r, 1);
    let f = o[0].toDataURL(typeof i == "string" ? i : "image/png"),
        l = e("<img/>");
    l.load(function() {
            Boolean(n) && n(t, l[0])
        }),
        l.attr("src", f)
},
a.prototype.render = function(e, t, n, i) {
    let s = this;
    n = n instanceof Object ? n : new r,
        i = isNaN(i) === !1 ? i : 1,
        n = t.matrix().concatWith(n),
        i *= t.alpha();
    let o = i <= 0 || t.mask() != null && t.mask().commands().length <= 0;
    if (o === !1) {
        e.globalAlpha = i,
            e.setTransform(n.a, n.b, n.c, n.d, n.tx, n.ty);
        if (t.cachedImage != null)
            e.drawImage(t.cachedImage, 0, 0, t.width(), t.height());
        else {
            t.clip() && (e.save(),
                    e.beginPath(),
                    e.rect(0, 0, t.width(), t.height()),
                    e.clip()),
                t.mask() != null && (e.save(),
                    s.drawPaths(e, t.mask()),
                    e.clip()),
                t.shadowColor() != null && (e.save(),
                    e.shadowOffsetX = t.shadowOffsetX(),
                    e.shadowOffsetY = t.shadowOffsetY(),
                    e.shadowBlur = t.shadowBlur(),
                    e.shadowColor = t.shadowColor().toRGBAString());
            if (t.bgColor() != null && t.bgColor().a() > 0) {
                e.beginPath();
                let u = t.rect(t);
                e.rect(u.x, u.y, u.width, u.height),
                    e.globalAlpha = i * (t.bgColor().a() / 255);
                let a = t.bgColor().clone();
                a.adjustSaturation(t.saturation()),
                    e.fillStyle = a.to24BitString(),
                    e.fill()
            }
            let f = t.className;
            switch (f) {
                case "AXEStage":
                case "AXEViewContainer":
                    s.renderContainer(e, t, n, i);
                    break;
                case "AXEBitmap":
                    s.renderBitmap(e, t);
                    break;
                case "AXEMovie":
                    s.renderMovie(e, t);
                    break;
                case "AXEShape":
                    s.renderShape(e, t, i);
                    break;
                case "AXEText":
                    s.renderText(e, t, i);
                    break;
                default:
            }
            t.shadowColor() != null && e.restore(),
                t.mask() != null && e.restore(),
                (t.clip() || t.shadowColor() != null) && e.restore()
        }
    }
},
a.prototype.renderContainer = function(e, t, n, r) {
    let i = this,
        s = t.visibleSubViews();
    for (let o = 0; o < s.length; o++) {
        let u = s[o];
        i.render(e, u, n, r)
    }
},
a.prototype.renderBitmap = function(e, t) {
    let n = t.bitmap();
    if (n != null) {
        let r = t.width(),
            i = t.height();
        e.drawImage(n, 0, 0, n.naturalWidth, n.naturalHeight, 0, 0, r, i)
    }
},
a.prototype.renderMovie = function(e, t) {
    if (t.framesCount() > 0) {
        let n = t.frames()[t.currentFrame()];
        if (n != null) {
            let r = t.width(),
                i = t.height();
            e.drawImage(n, 0, 0, n.naturalWidth, n.naturalHeight, 0, 0, r, i)
        }
    }
},
a.prototype.renderShape = function(e, t, n) {
    let r = this;
    r.drawPaths(e, t.paths()),
        t.fillColor() != null && (e.globalAlpha = n * (t.fillColor().a() / 255),
            e.fillStyle = t.fillColor().to24BitString(),
            e.fill()),
        t.strokeColor() != null && t.strokeSize() > 0 && (e.globalAlpha = n * (t.strokeColor().a() / 255),
            e.lineWidth = t.strokeSize(),
            e.strokeStyle = t.strokeColor().to24BitString(),
            e.stroke())
},
a.prototype.renderText = function(e, t, n) {
    let r = this;
    t.color() != null && t.text().length > 0 && (e.globalAlpha = n * (t.color().a() / 255),
        e.fillStyle = t.color().to24BitString(),
        e.font = t.textStyle(),
        t.wordWrap() ? r.renderMultipleLineText(e, t) : r.renderSingleLineText(e, t))
},
a.prototype.renderMultipleLineText = function(e, t) {
    let n = t.text();
    if (n.length > 0 && t.width() > 0) {
        n = n.replace(/\<br\/\>/gi, "\n");
        let r = [],
            i = n.split(""),
            s = "";
        while (i.length > 0) {
            let o = i.shift();
            if (o == "\n")
                r.push(s),
                s = "";
            else {
                s += o;
                let a = e.measureText(s).width;
                if (a > t.width() || i.length <= 0)
                    a > t.width() && (s = s.slice(0, s.length - 1),
                        i.unshift(o)),
                    r.push(s),
                    s = ""
            }
        }
        if (t.mergeLastLine() > 0)
            for (let f = r.length - 1; f > 0; f--)
                r[f].length <= t.mergeLastLine() && (r[f - 1] += r[f],
                    r.splice(f, 1));
        e.textBaseline = "alphabetic";
        let l = t.lineHeight() / 2;
        for (let c = 0; c < r.length; c++) {
            let h = r[c],
                p = e.measureText(h),
                d = 0;
            t.textAlign() == u.LEFT ? d = 0 : t.textAlign() == u.CENTER ? d = t.width() / 2 - p.width / 2 : t.textAlign() == u.RIGHT && (d = t.width() - p.width),
                e.fillText(h, d, l),
                l += t.lineHeight()
        }
    }
},
a.prototype.renderSingleLineText = function(e, t) {
    e.textBaseline = t.textVAlign();
    let n = e.measureText(t.text()),
        r = 0;
    t.textAlign() == u.LEFT ? r = 0 : t.textAlign() == u.CENTER ? r = t.width() / 2 - n.width / 2 : t.textAlign() == u.RIGHT && (r = t.width() - n.width),
        e.fillText(t.text(), r, t.height() / 2)
},
a.prototype.drawPaths = function(e, t) {
    let n = t.commands();
    e.beginPath();
    for (let r = 0; r < n.length; r++) {
        let i = n[r],
            s = i.o,
            o = i.p;
        e[s].apply(e, o)
    }
},
a.prototype.createTouchEvent = function(e) {
    let t = this,
        n = [];
    for (let r = 0; r < e.length; r++) {
        let s = new i(e[r].pageX * t.stage.ratio(), e[r].pageY * t.stage.ratio());
        s = t.stage.stageMatrix().inversePoint(s);
        let u = new o(s.x, s.y, s.x, s.y);
        n.push(u)
    }
    return n
},
a.prototype.configEvents = function() {
    let e = this;
    e.$canvas.bind(n.isTouchDevice() ? "touchstart" : "mousedown", function(t) {
        let r = function(t) {
            let r = null;
            t.type == "touchstart" || t.type == "mousedown" ? r = s.TOUCH_START : r = s.TOUCH_MOVE;
            let i = null;
            n.isTouchDevice() ? i = t.originalEvent.touches : i = [t];
            let o = e.createTouchEvent(i),
                u = new s(e.stage, r, o);
            e.stage.triggerEvent(u),
                t.preventDefault()
        };
        r(t),
            e.$canvas.unbind("touchmove touchend mousemove mouseup"),
            e.$canvas.bind(n.isTouchDevice() ? "touchmove" : "mousemove", r),
            e.$canvas.bind(n.isTouchDevice() ? "touchend" : "mouseup", function() {
                let t = new s(e.stage, s.TOUCH_END, []);
                e.stage.triggerEvent(t),
                    e.$canvas.unbind("touchmove touchend mousemove mouseup")
            })
    })
},
a
}();

export const event_center = function () {
  let e = function(e, t, n, r) {
    let i = this;
    i.listener = t,
        i.target = e,
        i.event = n,
        i.handler = r
},
t = e.prototype;
t.listener = null,
t.target = null,
t.event = null,
t.handler = null,
t.execute = function(e) {
    let t = this;
    t.handler.call(t.listener, e)
},
t.checkIfMatch = function(e, t, n, r) {
    let i = this,
        s = !0;
    typeof e != "undefined" && e != null && (s = i.target === e),
        s && typeof t != "undefined" && t != null && (s = i.listener === t);
    if (s && typeof n != "undefined") {
        let o = !1;
        for (let u = 0; u < n.length; u++) {
            let a = n[u];
            if (a == i.event) {
                o = !0;
                break
            }
        }
        s = o
    }
    if (s && typeof r != "undefined") {
        let f = !1;
        for (let l = 0; l < r.length; l++) {
            let c = r[l];
            if (c === i.handler) {
                f = !0;
                break
            }
        }
        s = f
    }
    return s
},
t.release = function() {
    let e = this;
    e.listener = null,
        e.target = null,
        e.event = null,
        e.handler = null
};
let n = function() {};
return n.listeners = [],
n.addListener = function(t, r, i, s) {
    i = typeof i == "string" ? [i] : i,
        s = typeof s == "function" ? [s] : s;
    for (let o = 0; o < i.length && o < s.length; o++) {
        let u = i[o],
            a = s[o],
            f = new e(t, r, u, a);
        n.listeners.push(f)
    }
},
n.removeListener = function(e, t, r, i) {
    r = typeof r == "string" ? [r] : r,
        i = typeof i == "function" ? [i] : i;
    for (let s = n.listeners.length - 1; s >= 0; s--) {
        let o = n.listeners[s];
        o.checkIfMatch(e, t, r, i) && n.listeners.splice(s, 1)
    }
},
n.dispatchEvent = function(e) {
    let t = e.type,
        r = e.target,
        i = n.listeners.slice();
    for (let s = 0; s < i.length; s++) {
        let o = i[s];
        o != null && o != undefined && o.checkIfMatch(r, null, [t]) && o.execute(e)
    }
},
n
}();

export const rect = function (e = vec2) {
  let t = function(e, t, n, r) {
    let i = this;
    i.x = isNaN(e) ? i.x : e,
        i.y = isNaN(t) ? i.y : t,
        i.width = isNaN(n) ? i.width : n,
        i.height = isNaN(r) ? i.height : r
};
return t.prototype.x = 0,
    t.prototype.y = 0,
    t.prototype.width = 0,
    t.prototype.height = 0,
    t.prototype.isEmpty = function() {
        let e = this;
        return e.x === 0 && e.y === 0 && e.width === 0 && e.height === 0
    },
    t.prototype.left = function(e) {
        let t = this;
        return arguments.length > 0 && (t.x = e),
            t.x
    },
    t.prototype.right = function(e) {
        let t = this;
        return arguments.length > 0 && (t.width = e - t.x),
            t.x + t.width
    },
    t.prototype.top = function(e) {
        let t = this;
        return arguments.length > 0 && (t.y = e),
            t.y
    },
    t.prototype.bottom = function(e) {
        let t = this;
        return arguments.length > 0 && (t.height = e - t.y),
            t.y + t.height
    },
    t.prototype.topLeft = function() {
        let t = this;
        return new e(t.x, t.y)
    },
    t.prototype.topRight = function() {
        let t = this;
        return new e(t.right(), t.top())
    },
    t.prototype.bottomRight = function() {
        let t = this;
        return new e(t.right(), t.bottom())
    },
    t.prototype.bottomLeft = function() {
        let t = this;
        return new e(t.left(), t.bottom())
    },
    t.prototype.equalsTo = function(e) {
        let t = this;
        return t.x == e.x && t.y == e.y && t.width == e.width && t.height == e.height
    },
    t.prototype.containsVec2 = function(e) {
        let t = this;
        return e.x >= t.left() && e.x <= t.right() && e.y >= t.top() && e.y <= t.bottom()
    },
    t.prototype.containsRect = function(e) {
        let t = this;
        return e.left() >= t.left() && e.right() <= t.right() && e.top() >= t.top() && e.bottom() <= t.bottom()
    },
    t.prototype.intersect = function(n) {
        let r = this,
            i = r.topLeft(),
            s = r.bottomRight(),
            o = n.topLeft(),
            u = n.bottomRight(),
            a = new e(Math.max(i.x, o.x), Math.max(i.y, o.y)),
            f = new e(Math.min(s.x, u.x), Math.min(s.y, u.y)),
            l = new t(0, 0, 0, 0);
        return a.x <= f.x && a.y <= f.y && (l.x = a.x,
                l.y = a.y,
                l.width = f.x - a.x,
                l.height = f.y - a.y),
            l
    },
    t.prototype.shrink = function() {
        let e = this;
        e.x = Math.ceil(e.x),
            e.y = Math.ceil(e.y),
            e.width = Math.floor(e.width),
            e.height = Math.floor(e.height)
    },
    t.prototype.expand = function() {
        let e = this;
        e.x = Math.floor(e.x),
            e.y = Math.floor(e.y),
            e.width = Math.ceil(e.width),
            e.height = Math.ceil(e.height)
    },
    t.prototype.clone = function() {
        let e = this;
        return new t(e.x, e.y, e.width, e.height)
    },
    t.prototype.toString = function() {
        let e = this;
        return "[x:" + e.x + ",y:" + e.y + ",width:" + e.width + ",height:" + e.height + "]"
    },
    t
}();

export const paths = function () {
  let e = function() {};
        return e.prototype.delegate = null,
            e.prototype.rect = function(e) {
                let t = this,
                    n = [e.x, e.y, e.width, e.height];
                t.addCommand("R:" + n.join(","))
            },
            e.prototype.circle = function(e) {
                let t = this,
                    n = [e.center.x, e.center.y, e.radius, 0, Math.PI * 2];
                t.addCommand("A:" + n.join(","))
            },
            e.prototype.moveTo = function(e, t) {
                let n = this,
                    r = [e, t];
                n.addCommand("M:" + r.join(","))
            },
            e.prototype.lineTo = function(e, t) {
                let n = this,
                    r = [e, t];
                n.addCommand("L:" + r.join(","))
            },
            e.prototype.arc = function(e, t, n, r, i, s) {
                let o = this,
                    u = [];
                for (let a = 0; a < arguments.length; a++)
                    u.push(arguments[a]);
                u.length < 5 && (u[3] = 0,
                        u[4] = Math.PI * 2),
                    o.addCommand("A:" + u.join(","))
            },
            e.prototype.arcTo = function(e, t, n, r, i) {
                let s = this,
                    o = [e, t, n, r, i];
                s.addCommand("AT:" + o.join(","))
            },
            e.prototype.closePath = function() {
                let e = this;
                e.addCommand("C")
            },
            e.prototype._commands = null,
            e.prototype.commands = function() {
                let e = this;
                return e._commands == null && (e._commands = []),
                    e._commands
            },
            e.prototype.clearCommands = function() {
                let e = this;
                e._commands = [],
                    e.delegate != null && e.delegate.onPathChanged(e)
            },
            e.prototype.operationMap = function(e) {
                let t = null;
                switch (e) {
                    case "M":
                        t = "moveTo";
                        break;
                    case "L":
                        t = "lineTo";
                        break;
                    case "A":
                        t = "arc";
                        break;
                    case "AT":
                        t = "arcTo";
                        break;
                    case "R":
                        t = "rect";
                        break;
                    case "C":
                        t = "closePath"
                }
                return t
            },
            e.prototype.addCommand = function(e) {
                let t = this,
                    n = e.split("|");
                for (let r = 0; r < n.length; r++) {
                    let i = n[r],
                        s = i.split(":"),
                        o = t.operationMap(s[0]);
                    if (o != null) {
                        let u = s.length > 1 ? s[1].split(",") : [];
                        for (let a = 0; a < u.length; a++)
                            u[a] = parseFloat(u[a]);
                        let f = {
                            o: o,
                            p: u
                        };
                        t.commands().push(f)
                    }
                }
                t.delegate != null && t.delegate.onPathChanged(t)
            },
            e.prototype.clone = function() {
                let t = this,
                    n = new e;
                return n._commands = t.commands().slice(),
                    n
            },
            e
}();

export const string_util = function () {
  let e = function() {};
        return e.fillStringTo = function(e, t, n, r) {
                let i = e.slice(0);
                r = arguments.length >= 4 ? r : !0;
                while (i.length < n)
                    i = r ? t + i : i + t;
                return i
            },
            e
}

export const color = function (e = string_util) {
  let t = function(e) {
    let t = this;
    if (arguments.length >= 1) {
        let n = e.replace(/^#|^0x/, ""),
            r = parseInt(n, 16);
        if (n.length != 6 && n.length != 8 || isNaN(r))
            throw new Error("Invalid color value: " + e);
        let i, s, o, u;
        n.length == 6 ? (i = r >> 16 & 255,
                s = r >> 8 & 255,
                o = r & 255,
                u = 255) : n.length == 8 && (i = r >> 24 & 255,
                s = r >> 16 & 255,
                o = r >> 8 & 255,
                u = r & 255),
            t.r(i),
            t.g(s),
            t.b(o),
            t.a(u)
    }
};
return t.colorWithString = function(e) {
        return new t(e)
    },
    t.colorWithRGBA = function(e, n, r, i) {
        let s = new t;
        return s.r(e),
            s.g(n),
            s.b(r),
            arguments.length < 4 && (i = 255),
            s.a(i),
            s
    },
    t.randomColor = function(e, n) {
        e = isNaN(e) ? 0 : e,
            n = isNaN(n) ? 16777215 : n;
        let r = e >> 16 & 255,
            i = e >> 8 & 255,
            s = e & 255,
            o = n >> 16 & 255,
            u = n >> 8 & 255,
            a = n & 255,
            f = r + Math.floor(Math.random() * (o - r)),
            l = r + Math.floor(Math.random() * (u - i)),
            c = r + Math.floor(Math.random() * (a - s));
        return t.colorWithRGBA(f, l, c, 255)
    },
    t.prototype.bit24String = null,
    t.prototype.bit24Updated = !1,
    t.prototype.to24BitString = function(t) {
        let n = this;
        if (n.bit24String == null || n.bit24Updated === !1) {
            let r = e.fillStringTo(n.r().toString(16), "0", 2).toUpperCase(),
                i = e.fillStringTo(n.g().toString(16), "0", 2).toUpperCase(),
                s = e.fillStringTo(n.b().toString(16), "0", 2).toUpperCase();
            t = arguments.length >= 1 ? t : "#",
                n.bit24String = t + r + i + s,
                n.bit24Updated = !0
        }
        return n.bit24String
    },
    t.prototype.bit32String = null,
    t.prototype.bit32Updated = !1,
    t.prototype.to32BitString = function(t) {
        let n = this;
        if (n.bit32String == null || n.bit32Updated === !1) {
            let r = e.fillStringTo(n.r().toString(16), "0", 2).toUpperCase(),
                i = e.fillStringTo(n.g().toString(16), "0", 2).toUpperCase(),
                s = e.fillStringTo(n.b().toString(16), "0", 2).toUpperCase(),
                o = e.fillStringTo(n.a().toString(16), "0", 2).toUpperCase();
            t = arguments.length >= 1 ? t : "#",
                n.bit32String = t + r + i + s + o,
                n.bit32Updated = !0
        }
        return n.bit32String
    },
    t.prototype.rgbString = null,
    t.prototype.rgbStringUpdated = !1,
    t.prototype.toRGBString = function() {
        let e = this;
        if (e.rgbString == null || e.rgbStringUpdated === !1) {
            e.rgbStringUpdated = !0;
            let t = Math.round(e.r()),
                n = Math.round(e.g()),
                r = Math.round(e.b());
            e.rgbString = "rgb(" + t.toString(10) + "," + n.toString(10) + "," + r.toString() + ")"
        }
        return e.rgbString
    },
    t.prototype.rgbaString = null,
    t.prototype.rgbaStringUpdated = !1,
    t.prototype.toRGBAString = function() {
        let e = this;
        if (e.rgbaString == null || e.rgbaStringUpdated === !1) {
            e.rgbaStringUpdated = !0;
            let t = Math.round(e.r()),
                n = Math.round(e.g()),
                r = Math.round(e.b()),
                i = Math.round(e.a() / 255 * 100) / 100;
            e.rgbaString = "rgba(" + t.toString(10) + "," + n.toString(10) + "," + r.toString() + "," + i.toString() + ")"
        }
        return e.rgbaString
    },
    t.prototype._r = 0,
    t.prototype.r = function(e) {
        let t = this;
        return arguments.length > 0 && e != t._r && (t._r = Math.round(e),
                t.bit24Updated = !1,
                t.bit32Updated = !1,
                t.rgbaStringUpdated = !1,
                t.rgbStringUpdated = !1),
            t._r
    },
    t.prototype._g = 0,
    t.prototype.g = function(e) {
        let t = this;
        return arguments.length > 0 && e != t._g && (t._g = Math.round(e),
                t.bit24Updated = !1,
                t.bit32Updated = !1,
                t.rgbaStringUpdated = !1,
                t.rgbStringUpdated = !1),
            t._g
    },
    t.prototype._b = 0,
    t.prototype.b = function(e) {
        let t = this;
        return arguments.length > 0 && e != t._b && (t._b = Math.round(e),
                t.bit24Updated = !1,
                t.bit32Updated = !1,
                t.rgbaStringUpdated = !1,
                t.rgbStringUpdated = !1),
            t._b
    },
    t.prototype._a = 0,
    t.prototype.a = function(e) {
        let t = this;
        return arguments.length > 0 && e != t._a && (t._a = Math.round(e),
                t.bit24Updated = !1,
                t.bit32Updated = !1,
                t.rgbaStringUpdated = !1,
                t.rgbStringUpdated = !1),
            t._a
    },
    t.prototype.adjustSaturation = function(e) {
        let t = this,
            n = (t.r() + t.g() + t.b()) / 3,
            r = n + (t.r() - n) * e,
            i = n + (t.g() - n) * e,
            s = n + (t.b() - n) * e;
        t.r(Math.floor(r)),
            t.g(Math.floor(i)),
            t.b(Math.floor(s)),
            t.bit24Updated = !1,
            t.bit32Updated = !1,
            t.rgbaStringUpdated = !1,
            t.rgbStringUpdated = !1
    },
    t.prototype.equalsTo = function(e) {
        let t = this;
        return t.r() === e.r() && t.g() === e.g() && t.b() === e.b() && t.a() === e.a()
    },
    t.prototype.clone = function() {
        let e = this;
        return t.colorWithRGBA(e.r(), e.g(), e.b(), e.a())
    },
    t
}();

let Linear = function() {};
Linear.easeNone = function(e, t, n, r) {
        return n * e / r + t
    },
    Linear.easeIn = function(e, t, n, r) {
        return n * e / r + t
    },
    Linear.easeOut = function(e, t, n, r) {
        return n * e / r + t
    },
    Linear.easeInOut = function(e, t, n, r) {
        return n * e / r + t
    };
let Cubic = function() {};
Cubic.easeIn = function(e, t, n, r) {
        return n * (e /= r) * e * e + t
    },
    Cubic.easeOut = function(e, t, n, r) {
        return n * ((e = e / r - 1) * e * e + 1) + t
    },
    Cubic.easeInOut = function(e, t, n, r) {
        return (e /= r / 2) < 1 ? n / 2 * e * e * e + t : n / 2 * ((e -= 2) * e * e + 2) + t
    };
let Bounce = function() {};
Bounce.easeIn = function(e, t, n, r) {
        return n - Bounce.easeOut(r - e, 0, n, r) + t
    },
    Bounce.easeOut = function(e, t, n, r) {
        return (e /= r) < 1 / 2.75 ? n * 7.5625 * e * e + t : e < 2 / 2.75 ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : e < 2.5 / 2.75 ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
    },
    Bounce.easeInOut = function(e, t, n, r) {
        return e < r / 2 ? Bounce.easeIn(e * 2, 0, n, r) * .5 + t : Bounce.easeOut(e * 2 - r, 0, n, r) * .5 + n * .5 + t
    };
let Back = function() {};
Back.easeIn = function(e, t, n, r) {
        let i = 1.70158;
        return n * (e /= r) * e * ((i + 1) * e - i) + t
    }
    Back.easeOut = function(e, t, n, r) {
        let i = 1.70158;
        return n * ((e = e / r - 1) * e * ((i + 1) * e + i) + 1) + t
    }
    Back.easeInOut = function(e, t, n, r) {
        let i = 1.70158;
        return (e /= r / 2) < 1 ? n / 2 * e * e * (((i *= 1.525) + 1) * e - i) + t : n / 2 * ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) + t
    }

const easing = () => {};

export const animate = function (e = mat3, t = color) {
  let n = function(e, t, n, r, i, s) {
    let o = this;
    o.target = e,
        o.to = n,
        o.duration = t,
        o.easing = typeof r == "function" ? r : Linear.easeNone,
        o.onUpdate = i,
        o.onComplete = s
},
r = n.prototype;
return r.target = null,
r.duration = 0,
r.easing = null,
r.onUpdate = null,
r.onComplete = null,
r.to = null,
r.from = null,
r.startTS = 0,
r.init = function(e) {
    let t = this;
    t.startTS = e,
        t.from = {};
    for (let n in t.to)
        if (t.to.hasOwnProperty(n) && typeof t.target[n] == "function") {
            let r = t.target[n],
                i = r.call(t.target);
            t.from[n] = i.clone ? i.clone() : i
        }
},
r.update = function(n) {
    let r = this,
        i = Math.min(n - r.startTS, r.duration),
        s = r.easing(i, 0, 1, r.duration);
    for (let o in r.from)
        if (r.from.hasOwnProperty(o)) {
            let u = r.from[o],
                a = r.to[o];
            if (o == "matrix") {
                let f = new e;
                f.a = u.a + (a.a - u.a) * s,
                    f.b = u.b + (a.b - u.b) * s,
                    f.c = u.c + (a.c - u.c) * s,
                    f.d = u.d + (a.d - u.d) * s,
                    f.tx = u.tx + (a.tx - u.tx) * s,
                    f.ty = u.ty + (a.ty - u.ty) * s,
                    r.target.matrix(f)
            } else if (o == "bgColor") {
                let l = u.r() + (a.r() - u.r()) * s,
                    c = u.g() + (a.g() - u.g()) * s,
                    h = u.b() + (a.b() - u.b()) * s,
                    p = u.a() + (a.a() - u.a()) * s;
                r.target.bgColor(t.colorWithRGBA(l, c, h, p))
            } else if (isNaN(u) === !1 && isNaN(a) === !1) {
                let d = u + (a - u) * s;
                r.target[o](d)
            }
        }
    typeof r.onUpdate == "function" && r.onUpdate(r.target, s);
    let v = n - r.startTS >= r.duration;
    return v && typeof r.onComplete == "function" && r.onComplete(r.target),
        v
},
r.jumpToEnd = function() {
    let e = this;
    e.update(e.startTS + e.duration)
},
n
}();

export const align_mode = function () {
  let e = function() {};
        return e.CENTER = parseInt("1", 2),
            e.MIDDLE = parseInt("10", 2),
            e.TOP = parseInt("100", 2),
            e.BOTTOM = parseInt("1000", 2),
            e.LEFT = parseInt("10000", 2),
            e.RIGHT = parseInt("100000", 2),
            e.MIDDLE_LEFT = e.MIDDLE | e.LEFT,
            e.MIDDLE_CENTER = e.MIDDLE | e.CENTER,
            e.MIDDLE_RIGHT = e.MIDDLE | e.RIGHT,
            e.TOP_LEFT = e.TOP | e.LEFT,
            e.TOP_CENTER = e.TOP | e.CENTER,
            e.TOP_RIGHT = e.TOP | e.RIGHT,
            e.BOTTOM_LEFT = e.BOTTOM | e.LEFT,
            e.BOTTOM_CENTER = e.BOTTOM | e.CENTER,
            e.BOTTOM_RIGHT = e.BOTTOM | e.RIGHT,
            e
}();

export const scale_mode = function (e = mat3, t = vec2, n = align_mode) {
  let r = function() {};
        return r.align = function(e, r, i, s, o) {
                let u = new t;
                return (o & n.LEFT) != 0 ? u.x = 0 : (o & n.CENTER) != 0 ? u.x = Math.round(i / 2 - e / 2) : (o & n.RIGHT) != 0 && (u.x = Math.round(i - e)),
                    (o & n.TOP) != 0 ? u.y = 0 : (o & n.MIDDLE) != 0 ? u.y = Math.round(s / 2 - r / 2) : (o & n.BOTTOM) != 0 && (u.y = Math.round(s - r)),
                    u
            },
            r.noScale = function(t, n, i, s, o) {
                let u = new e,
                    a = r.align(t, n, i, s, o);
                return u.tx = a.x,
                    u.ty = a.y,
                    u
            },
            r.showAll = function(t, n, i, s, o) {
                let u = Math.min(i / t, s / n),
                    a = Math.round(t * u),
                    f = Math.round(n * u),
                    l = new e;
                l.a = a / t,
                    l.d = f / n;
                let c = r.align(a, f, i, s, o);
                return l.tx = c.x,
                    l.ty = c.y,
                    l
            },
            r.noBorder = function(t, n, i, s, o) {
                let u = Math.max(i / t, s / n),
                    a = Math.round(t * u),
                    f = Math.round(n * u),
                    l = new e;
                l.a = a / t,
                    l.d = f / n;
                let c = r.align(a, f, i, s, o);
                return l.tx = c.x,
                    l.ty = c.y,
                    l
            },
            r.extraFit = function(t, n, r, i) {
                let s = new e;
                return s.a = r / t,
                    s.d = i / n,
                    s
            },
            r.fitWidth = function(t, n, i, s, o) {
                let u = i / t,
                    a = Math.round(t * u),
                    f = Math.round(n * u),
                    l = new e;
                l.a = a / t,
                    l.d = f / n;
                let c = r.align(a, f, i, s, o);
                return l.tx = c.x,
                    l.ty = c.y,
                    l
            },
            r.fitHeight = function(t, n, i, s, o) {
                let u = s / n,
                    a = Math.round(t * u),
                    f = Math.round(n * u),
                    l = new e;
                l.a = a / t,
                    l.d = f / n;
                let c = r.align(a, f, i, s, o);
                return l.tx = c.x,
                    l.ty = c.y,
                    l
            },
            r
}();

export const view = function (e = jQuery, t = mat3, n = rect, r = vec2, i = paths, s = animate, o = color, u = event, a = event_center, f = touch, l = touch_event, c = scale_mode, h = align_mode) {
  let p = function() {};
        return p.viewIndex = 0,
            p.issueViewName = function(e) {
                let t = e + "_" + p.viewIndex;
                return p.viewIndex += 1,
                    t
            },
            p.prototype.className = "AXEView",
            p.prototype.controller = null,
            p.prototype.dealloc = function() {
                let e = this;
                e._matrix = null,
                    e._mask = null,
                    e.remove(),
                    a.removeListener(e)
            },
            p.prototype.clone = function() {
                let e = this,
                    t = new p;
                return e.copyProperties(t),
                    t
            },
            p.prototype.copyProperties = function(e) {
                let t = this;
                e.name(t.name()),
                    e.width(t.width()),
                    e.height(t.height()),
                    e.alpha(t.alpha()),
                    e.scaleMode(t.scaleMode()),
                    e.alignMode(t.alignMode()),
                    t.bgColor() != null && e.bgColor(t.bgColor().clone()),
                    t.shadowColor() != null && e.shadowColor(t.shadowColor().clone()),
                    e.shadowOffsetX(t.shadowOffsetX()),
                    e.shadowOffsetY(t.shadowOffsetY()),
                    e.shadowBlur(t.shadowBlur()),
                    e.blendMode(t.blendMode()),
                    e.enabled(t.enabled()),
                    e.visible(t.visible()),
                    e.clip(t.clip()),
                    t.mask() != null && e.mask(t.mask().clone()),
                    e.matrix(t.matrix())
            },
            p.prototype.updatePropsFromXML = function(e) {
                let n = this;
                n.name(e.is("[name]") ? e.attr("name") : null),
                    n.width(e.is("[width]") ? parseFloat(e.attr("width")) : 0),
                    n.height(e.is("[height]") ? parseFloat(e.attr("height")) : 0),
                    n.alpha(e.is("[alpha]") ? parseFloat(e.attr("alpha")) : 1),
                    e.is("[sat]") && n.saturation(parseFloat(e.attr("sat"))),
                    e.is("[bg-color]") && n.bgColor(o.colorWithString(e.attr("bg-color"))),
                    e.is("[shadow-color]") && n.shadowColor(o.colorWithString(e.attr("shadow-color"))),
                    e.is("[shadow-x]") && n.shadowOffsetX(parseFloat(e.attr("shadow-x"))),
                    e.is("[shadow-y]") && n.shadowOffsetY(parseFloat(e.attr("shadow-y"))),
                    e.is("[shadow-blur]") && n.shadowBlur(parseInt(e.attr("shadow-blur"), 10)),
                    n.blendMode(e.is("blend") ? e.attr("blend") : n._blendMode),
                    n.enabled(e.is("[enabled]") ? e.attr("enabled") == "true" : !0),
                    n.visible(e.is("[visible]") ? String(e.attr("visible")).toLowerCase() === "true" : !0),
                    n.clip(e.is("[clip]") ? String(e.attr("clip")).toLowerCase() === "true" : !1);
                let r = e.find("> mask");
                if (r.length > 0) {
                    let s = new i;
                    s.addCommand(r.text()),
                        n.mask(s)
                } else
                    n.mask(null);
                let u = new t;
                if (e.is("[matrix]")) {
                    let a = e.attr("matrix").split(",");
                    u.a = parseFloat(a[0]),
                        u.b = parseFloat(a[1]),
                        u.c = parseFloat(a[2]),
                        u.d = parseFloat(a[3]),
                        u.tx = parseFloat(a[4]),
                        u.ty = parseFloat(a[5])
                } else {
                    let f = e.is("[scale-x]") ? parseFloat(e.attr("scale-x")) : 1,
                        l = e.is("[scale-y]") ? parseFloat(e.attr("scale-y")) : 1,
                        p = e.is("[rotation]") ? parseFloat(e.attr("rotation")) * (Math.PI / 180) : 0,
                        d = e.is("[x]") ? parseFloat(e.attr("x")) : 0,
                        v = e.is("[y]") ? parseFloat(e.attr("y")) : 0;
                    u.a = f * Math.cos(p),
                        u.b = Math.sin(p),
                        u.c = -1 * Math.sin(p),
                        u.d = l * Math.cos(p),
                        u.tx = d,
                        u.ty = v
                }
                n.matrix(u);
                if (e.is("[align]")) {
                    let m = h[e.attr("align")];
                    n.alignMode(m)
                }
                if (e.is("[scale-mode]")) {
                    let g = e.attr("scale-mode");
                    typeof c[g] == "function" && n.scaleMode(c[g])
                }
                n.controller != null && n.controller.onViewUpdateFromXML(e)
            },
            p.prototype.cachedImage = null,
            p.prototype._name = null,
            p.prototype.name = function(e) {
                let t = this;
                return arguments.length > 0 && (t._name = e),
                    t._name == null && (t._name = p.issueViewName(t.className)),
                    t._name
            },
            p.prototype.pathname = function() {
                let e = this,
                    t = [],
                    n = e;
                do
                    t.unshift(n.name()),
                    n = n.parent();
                while (n != null);
                return t.join(".")
            },
            p.prototype._needToRender = !1,
            p.prototype.needToRender = function(e) {
                let t = this;
                return arguments.length > 0 && e != t._needToRender && (t._needToRender = e),
                    t._needToRender
            },
            p.prototype._scaleMode = null,
            p.prototype.scaleMode = function(e) {
                let t = this;
                if (arguments.length > 0 && t._scaleMode != e) {
                    t._scaleMode = e;
                    let n = t.stage();
                    n != null && t.resize(n.stageWidth(), n.stageHeight())
                }
                return t._scaleMode
            },
            p.prototype._alignMode = null,
            p.prototype.alignMode = function(e) {
                let t = this;
                if (arguments.length > 0 && t._alignMode != e) {
                    t._alignMode = e;
                    let n = t.stage();
                    n != null && t.resize(n.stageWidth(), n.stageHeight())
                }
                return t._alignMode
            },
            p.prototype.x = function(e) {
                let t = this;
                if (arguments.length > 0) {
                    let n = t.matrix().clone();
                    n.tx = e,
                        t.matrix(n)
                }
                return t.matrix().tx
            },
            p.prototype.y = function(e) {
                let t = this;
                if (arguments.length > 0) {
                    let n = t.matrix().clone();
                    n.ty = e,
                        t.matrix(n)
                }
                return t.matrix().ty
            },
            p.prototype.scaleX = function(e) {
                let t = this,
                    n = t.matrix(),
                    r = t.radian(),
                    i = n.a / Math.cos(r);
                return arguments.length > 0 && (i = e,
                        n = n.clone(),
                        n.a = i * Math.cos(r),
                        t.matrix(n)),
                    i
            },
            p.prototype.scaleY = function(e) {
                let t = this,
                    n = t.matrix(),
                    r = t.radian(),
                    i = n.d / Math.cos(r);
                return arguments.length > 0 && (i = e,
                        n = n.clone(),
                        n.d = i * Math.cos(r),
                        t.matrix(n)),
                    i
            },
            p.prototype.rotation = function(e) {
                let t = this,
                    n = 0;
                if (arguments.length > 0) {
                    n = e;
                    let r = e * (Math.PI / 180);
                    t.radian(r)
                } else
                    n = t.radian() * (180 / Math.PI);
                return n
            },
            p.prototype.radian = function(e) {
                let t = this,
                    n = t.matrix(),
                    r = Math.asin(n.b);
                n.b > 0 && n.a < 0 ? r = Math.PI - r : n.b < 0 && n.a < 0 ? r = Math.PI - r : n.b < 0 && n.a > 0 && (r = Math.PI * 2 + r);
                if (arguments.length > 0) {
                    let i = n.a / Math.cos(r);
                    r = e,
                        n = n.clone(),
                        n.a = i * Math.cos(r),
                        n.b = Math.sin(r),
                        n.c = -1 * n.b,
                        n.d = n.a,
                        t.matrix(n)
                }
                return r
            },
            p.prototype._matrix = null,
            p.prototype.matrix = function(e) {
                let n = this;
                return arguments.length > 0 && (n._matrix = e.clone(),
                        n.needToRender(!0)),
                    n._matrix == null && (n._matrix = new t),
                    n._matrix
            },
            p.prototype._width = 0,
            p.prototype.width = function(e) {
                let t = this;
                return isNaN(e) == 0 && t._width != e && (t._width = e,
                        t.needToRender(!0)),
                    t._width
            },
            p.prototype._height = 0,
            p.prototype.height = function(e) {
                let t = this;
                return isNaN(e) == 0 && t._height != e && (t._height = e,
                        t.needToRender(!0)),
                    t._height
            },
            p.prototype._alpha = 1,
            p.prototype.alpha = function(e) {
                let t = this;
                return arguments.length > 0 && t._alpha != e && (t._alpha = e,
                        t.needToRender(!0)),
                    t._alpha
            },
            p.prototype._saturation = 1,
            p.prototype.saturation = function(e) {
                let t = this;
                return isNaN(e) == 0 && (e = Math.max(0, Math.min(1, e)),
                        e != t._saturation && (t._saturation = e,
                            t.needToRender(!0))),
                    t._saturation
            },
            p.prototype._bgColor = null,
            p.prototype.bgColor = function(e) {
                let t = this;
                return arguments.length > 0 && (t._bgColor = Boolean(e) ? e.clone() : null,
                        t.needToRender(!0)),
                    t._bgColor
            },
            p.prototype._clip = !1,
            p.prototype.clip = function(e) {
                let t = this;
                return arguments.length > 0 && e != t._clip && (t._clip = e,
                        t.needToRender(!0)),
                    t._clip
            },
            p.prototype._mask = null,
            p.prototype.mask = function(e) {
                let t = this;
                return arguments.length > 0 && (t._mask = e,
                        t.needToRender(!0)),
                    t._mask
            },
            p.prototype._shadowOffsetX = 0,
            p.prototype.shadowOffsetX = function(e) {
                let t = this;
                return isNaN(parseFloat(e)) === !1 && parseFloat(e) != t._shadowOffsetX && (t._shadowOffsetX = parseFloat(e),
                        t.needToRender(!0)),
                    t._shadowOffsetX
            },
            p.prototype._shadowOffsetY = 0,
            p.prototype.shadowOffsetY = function(e) {
                let t = this;
                return isNaN(parseFloat(e)) === !1 && parseFloat(e) != t._shadowOffsetY && (t._shadowOffsetY = parseFloat(e),
                        t.needToRender(!0)),
                    t._shadowOffsetY
            },
            p.prototype._shadowColor = null,
            p.prototype.shadowColor = function(e) {
                let t = this;
                return arguments.length > 0 && typeof e == "object" && (t._shadowColor = e,
                        t.needToRender(!0)),
                    t._shadowColor
            },
            p.prototype._shadowBlur = 0,
            p.prototype.shadowBlur = function(e) {
                let t = this;
                return arguments.length > 0 && isNaN(parseInt(e, 10)) === !1 && parseInt(e, 10) != t._shadowBlur && (t._shadowBlur = e,
                        t.needToRender(!0)),
                    t._shadowBlur
            },
            p.prototype._blendMode = "source-over",
            p.prototype.blendMode = function(e) {
                let t = this;
                return typeof e == "string" && (t._blendMode = e,
                        t.needToRender(!0)),
                    t._blendMode
            },
            p.prototype._visible = !0,
            p.prototype.visible = function(e) {
                let t = this;
                return typeof e == "boolean" && e != t._visible && (t._visible = e,
                        t.needToRender(!0)),
                    t._visible
            },
            p.prototype._parent = null,
            p.prototype.parent = function(e) {
                let t = this;
                return arguments.length > 0 && (t._parent = e),
                    t._parent
            },
            p.prototype.remove = function() {
                let e = this;
                e.parent() != null && e.parent().removeSubView(e)
            },
            p.prototype._enabled = !0,
            p.prototype.enabled = function(e) {
                let t = this;
                return typeof e == "boolean" && e != t._enabled && (t._enabled = e,
                        t.lastEvent = null),
                    t._enabled
            },
            p.prototype.matrixTo = function(e) {
                let n = this,
                    r = null;
                if (arguments.length > 0) {
                    let i = e,
                        s = new t,
                        o = new t;
                    while (i != null && r == null) {
                        let u = n;
                        while (u != null) {
                            if (i == u) {
                                let a = o.inversion();
                                r = s.concatWith(a);
                                break
                            }
                            s = s.concatWith(u.matrix()),
                                u = u.parent()
                        }
                        o = o.concatWith(i.matrix()),
                            i = i.parent()
                    }
                } else
                    r = new t;
                return r
            },
            p.prototype.rect = function(e) {
                let t = this,
                    i = new r(0, 0),
                    s = new r(t.width(), 0),
                    o = new r(0, t.height()),
                    u = new r(t.width(), t.height()),
                    a = arguments.length > 0 ? t.matrixTo(e) : t.matrixTo(),
                    f = null;
                if (a != null) {
                    let l = a.transformPoint(i),
                        c = a.transformPoint(s),
                        h = a.transformPoint(o),
                        p = a.transformPoint(u),
                        d = Math.min(l.x, c.x, h.x, p.x),
                        v = Math.max(l.x, c.x, h.x, p.x),
                        m = Math.min(l.y, c.y, h.y, p.y),
                        g = Math.max(l.y, c.y, h.y, p.y);
                    f = new n(d, m, v - d, g - m)
                }
                return f
            },
            p.prototype.convertTouches = function(e) {
                let t = this,
                    n = [],
                    i = t.matrixTo(e.target);
                for (let s = 0; s < e.touches.length; s++) {
                    let o = new r(e.touches[s].x, e.touches[s].y);
                    o = i.inversePoint(o);
                    let u = new f(o.x, o.y, e.touches[s].stageX, e.touches[s].stageY);
                    n.push(u)
                }
                return n
            },
            p.prototype.lastEvent = null,
            p.prototype.startEvent = null,
            p.prototype.triggerEvent = function(e) {
                let t = this,
                    n = !1;
                if (t.enabled() && t.visible()) {
                    let i = t.animating();
                    if (e.type == l.TOUCH_START) {
                        let s = t.rect(e.target),
                            o = e.touches[0],
                            u = new r(o.x, o.y);
                        if (t.className == "AXEStage" || s.containsVec2(u))
                            n = !0,
                            i === !1 && (t.lastEvent = new l(t, e.type, t.convertTouches(e)),
                                t.startEvent = t.lastEvent,
                                a.dispatchEvent(t.lastEvent))
                    } else if (e.type == l.TOUCH_MOVE)
                        t.lastEvent != null && (n = !0,
                            t.lastEvent = new l(t, e.type, t.convertTouches(e)),
                            a.dispatchEvent(t.lastEvent));
                    else if (e.type == l.TOUCH_END && t.lastEvent != null) {
                        let f = t.lastEvent,
                            c = t.startEvent;
                        t.lastEvent = null,
                            t.startEvent = null,
                            n = !0,
                            a.dispatchEvent(new l(t, e.type, [])),
                            f.type == l.TOUCH_START && a.dispatchEvent(new l(t, l.CLICK, f.touches));
                        if (f.type == l.TOUCH_MOVE && f.timeStamp - c.timeStamp < 500 && f.touches.length <= 1 && c.touches.length <= 1) {
                            let h = new r(c.touches[0].stageX, c.touches[0].stageY),
                                p = new r(f.touches[0].stageX, f.touches[0].stageY);
                            h.distance(p) > 30 && Math.abs(c.timeStamp - f.timeStamp) < 500 && a.dispatchEvent(new l(t, l.SWIPE, [c.touches[0], f.touches[0]]))
                        }
                    }
                }
                return n
            },
            p.prototype.animateChangeFlag = !1,
            p.prototype.objAnimate = null,
            p.prototype._animating = !1,
            p.prototype.animating = function(e) {
                let t = this;
                typeof e == "boolean" && (t._animating = e);
                let n = t._animating;
                return n === !1 && t.parent() != null && (n = t.parent().animating()),
                    n
            },
            p.prototype.animate = function(e, t, n, r, i) {
                let o = this;
                o.objAnimate = new s(o, e, t, n, r, i),
                    o.animateChangeFlag = !0
            },
            p.prototype.stopAnimation = function(e) {
                let t = this;
                t.objAnimate != null && (e = arguments.length >= 1 ? e : !1,
                    t._animating && e && t.objAnimate.jumpToEnd(),
                    t.animating(!1),
                    t.animateChangeFlag = !1,
                    t.objAnimate = null,
                    t.onAnimationStop())
            },
            p.prototype.onAnimationStart = function() {
                let e = this;
                e.controller != null && e.controller.onViewStartAnimate();
                let t = new u(e, u.ANIMATION_BEGIN);
                a.dispatchEvent(t)
            },
            p.prototype.onAnimationStop = function() {
                let e = this;
                e.controller != null && e.controller.onViewEndAnimate();
                let t = new u(e, u.ANIMATION_END);
                a.dispatchEvent(t)
            },
            p.prototype.onAdd = function(e) {
                let t = this;
                t.controller != null && t.controller.onViewAdded(e);
                let n = new u(t, u.ADDED);
                a.dispatchEvent(n)
            },
            p.prototype.removeFromStage = function() {
                let e = this;
                e.lastEvent = null,
                    e.startEvent = null,
                    e.controller != null && e.controller.onViewRemoveFromStage();
                let t = new u(e, u.REMOVE_FROM_STAGE);
                a.dispatchEvent(t)
            },
            p.prototype.onRemoveFromSuperView = function(e) {
                let t = this;
                t.lastEvent = null,
                    t.startEvent = null,
                    t.controller != null && t.controller.onViewRemoved(e);
                let n = new u(t, u.REMOVED);
                a.dispatchEvent(n),
                    t.removeFromStage()
            },
            p.prototype.stage = function() {
                let e = this;
                while (e != null && e.className != "AXEStage")
                    e = e.parent();
                return e
            },
            p.prototype.onStage = !1,
            p.prototype.onAddToStage = function() {
                let e = this;
                e.onStage = !0,
                    e.lastEvent = null,
                    e.startEvent = null,
                    e.controller != null && e.controller.onViewAddToStage();
                let t = new u(e, u.ADD_TO_STAGE);
                a.dispatchEvent(t);
                let n = e.stage();
                n != null && (e.onWindowOrientationChanged(n.orientation),
                    e.resize(n.stageWidth(), n.stageHeight()))
            },
            p.prototype.onWindowOrientationChanged = function(e) {
                let t = this;
                t.windowOrientationChange(e),
                    t.controller != null && t.controller.onWindowOrientationChanged(e)
            },
            p.prototype.windowOrientationChange = function(e) {},
            p.prototype._active = !0,
            p.prototype.active = function(e) {
                let t = this;
                return e != undefined && t._active != e && (t._active = e,
                        t._active ? (t.onActivate(),
                            t.controller != null && t.controller.onViewActivate()) : (t.onDeactivate(),
                            t.controller != null && t.controller.onViewDeactivate())),
                    t._active
            },
            p.prototype.onActivate = function() {},
            p.prototype.onDeactivate = function() {},
            p.prototype.resize = function(e, t) {
                let n = this;
                if (n.alignMode() != null && n.scaleMode() != null) {
                    let r = n.alignMode(),
                        i = n.scaleMode(),
                        s = i(n.width(), n.height(), e, t, r);
                    n.matrix(s)
                }
                n.controller != null && n.controller.onViewResize(e, t);
                let o = new u(n, u.RESIZE);
                a.dispatchEvent(o)
            },
            p.prototype.update = function(e, t) {
                let n = this;
                n.animateChangeFlag && (n.animateChangeFlag = !1,
                    n.objAnimate != null && (n.objAnimate.init(e),
                        n.animating(!0),
                        n.onAnimationStart()));
                if (n.objAnimate != null) {
                    let r = n.objAnimate.update(e);
                    r && (n.objAnimate = null,
                        n.animating(!1),
                        n.onAnimationStop())
                }
                n.controller != null && n.controller.onViewUpdated(e, t),
                    n.needToRender() && (n.cachedImage = null)
            },
            p
}();

export const view_factory = function () {
    let e = function() {};
        return e.ViewClasses = {},
            e.createViewByNodeName = function(t) {
                let n = null;
                if (e.ViewClasses.hasOwnProperty(t)) {
                    let r = e.ViewClasses[t];
                    n = new r
                }
                return n
            },
            e.addClass = function(t, n) {
                e.ViewClasses[t] = n
            },
            e
}();

export const view_container = function (e = view, t = rect, n = view_factory) {
    let r = function() {};
        return r.prototype = new e,
            r.prototype.constructor = r,
            r.prototype.className = "AXEViewContainer",
            r.prototype.clone = function() {
                let e = this,
                    t = new r;
                return e.copyProperties(t),
                    t
            },
            r.prototype.copyProperties = function(t) {
                let n = this;
                e.prototype.copyProperties.call(n, t),
                    t.muted(n.muted()),
                    n.subViews().length > 0 && n.eachSubView(function(e, n) {
                        t.addSubView(n.clone())
                    })
            },
            r.prototype.dealloc = function() {
                let t = this,
                    n = t.subViews();
                for (let r = 0; r < n.length; r++) {
                    let i = n[r];
                    i.dealloc()
                }
                e.prototype.dealloc.call(t)
            },
            r.prototype.updatePropsFromXML = function(t) {
                let r = this;
                e.prototype.updatePropsFromXML.call(r, t),
                    t.is("[muted]") && r.muted(t.attr("muted") == "true");
                let i = t.find("> *");
                i.each(function(e, t) {
                    let i = $(t),
                        s = i[0].nodeName.toLowerCase(),
                        o = n.createViewByNodeName(s);
                    o != null && (o.updatePropsFromXML(i),
                        r.addSubView(o))
                })
            },
            r.prototype.needToRender = function(t) {
                let n = this,
                    r, i = n.subViews();
                if (arguments.length > 0)
                    r = e.prototype.needToRender.call(n, t);
                else {
                    r = e.prototype.needToRender.call(n);
                    if (r === !1)
                        for (let s = 0; s < i.length; s++) {
                            let o = i[s];
                            if (o.needToRender()) {
                                r = !0;
                                break
                            }
                        }
                }
                return r
            },
            r.prototype._subViews = null,
            r.prototype.subViews = function() {
                let e = this;
                return e._subViews == null && (e._subViews = []),
                    e._subViews
            },
            r.prototype.addSubView = function(e) {
                let t = this;
                e.parent() != null && e.parent().moveSubView(e),
                    t.subViews().push(e),
                    t.afterSubViewAdded(e)
            },
            r.prototype.insertSubViewAt = function(e, t) {
                let n = this;
                e.parent() != null && e.parent().moveSubView(e);
                let r = n.subViews();
                t = Math.max(0, Math.min(r.length - 1, t)),
                    r.splice(t, 0, e),
                    n.afterSubViewAdded(e)
            },
            r.prototype.afterSubViewAdded = function(e) {
                let t = this;
                e.parent(t),
                    e.onAdd(t),
                    t.onStage && e.onAddToStage(),
                    e.active(t.active()),
                    t.needToRender(!0)
            },
            r.prototype.onAddToStage = function() {
                let t = this;
                e.prototype.onAddToStage.call(t);
                for (let n = 0; n < t.subViews().length; n++) {
                    let r = t.subViews()[n];
                    r.onAddToStage()
                }
            },
            r.prototype.empty = function() {
                let e = this,
                    t = e.subViews().slice(0);
                for (let n = 0; n < t.length; n++)
                    e.removeSubView(t[n])
            },
            r.prototype.moveSubView = function(e) {
                let t = this,
                    n = !1;
                if (e.parent() == t)
                    for (let r = 0; r < t.subViews().length; r++) {
                        let i = t.subViews()[r];
                        if (i === e) {
                            t.subViews().splice(r, 1),
                                i.parent(null),
                                n = !0;
                            break
                        }
                    }
                return n && t.needToRender(!0),
                    n
            },
            r.prototype.removeSubView = function(e) {
                let t = this,
                    n = t.moveSubView(e);
                n && e.onRemoveFromSuperView(t)
            },
            r.prototype.removeFromStage = function() {
                let t = this;
                e.prototype.removeFromStage.call(t),
                    t.eachSubView(function(e, t) {
                        t.removeFromStage()
                    })
            },
            r.prototype.indexOfSubView = function(e) {
                let t = this,
                    n = -1;
                for (let r = 0; r < t.subViews().length; r++) {
                    let i = t.subViews()[r];
                    if (i === e) {
                        n = r;
                        break
                    }
                }
                return n
            },
            r.prototype.subViewByIndex = function(e) {
                let t = this,
                    n = null;
                return e >= 0 && e < t.subViews().length && (n = t.subViews()[e]),
                    n
            },
            r.prototype.subViewByName = function(e) {
                let t = this,
                    n = null;
                for (let r = 0; r < t.subViews().length; r++) {
                    let i = t.subViews()[r];
                    if (i.name() == e) {
                        n = i;
                        break
                    }
                }
                return n
            },
            r.prototype.containsSubView = function(e) {
                let t = this,
                    n = !1;
                return t.eachSubView(function(t, r) {
                        return r == e ? (n = !0, !1) : !0
                    }),
                    n
            },
            r.prototype.visibleSubViews = function() {
                let e = this,
                    t = [],
                    n = e.rect(e);
                for (let r = 0; r < e.subViews().length; r++) {
                    let i = e.subViews()[r];
                    if (i.visible()) {
                        let s = i.rect(e);
                        (e.clip() === !1 || n.intersect(s).isEmpty() === !1) && t.push(i)
                    }
                }
                return t
            },
            r.prototype.eachSubView = function(e) {
                let t = this,
                    n = t.subViews().slice();
                for (let r = 0; r < n.length; r++) {
                    let i = n[r],
                        s = e.call(null, r, i);
                    if (s === !1)
                        break
                }
            },
            r.prototype._muted = !1,
            r.prototype.muted = function(e) {
                let t = this;
                return typeof e == "boolean" && e != t._muted && (t._muted = e),
                    t._muted
            },
            r.prototype.triggerSubViewEvent = function(e) {
                let t = this,
                    n = !1,
                    r = t.subViews();
                for (let i = r.length - 1; i >= 0; i--) {
                    let s = r[i],
                        o = s.triggerEvent(e);
                    if (o) {
                        n = o;
                        break
                    }
                }
                return n
            },
            r.prototype.triggerEvent = function(t) {
                let n = this,
                    r = !1;
                return n.muted() ? n.enabled() && n.animating() === !1 && n.visible() && (r = n.triggerSubViewEvent(t)) : (r = e.prototype.triggerEvent.call(n, t),
                        r && n.triggerSubViewEvent(t)),
                    r
            },
            r.prototype.active = function(t) {
                let n = this,
                    r = e.prototype.active.call(n, t);
                return n.eachSubView(function(e, t) {
                        t.active(r)
                    }),
                    r
            },
            r.prototype.onWindowOrientationChanged = function(t) {
                let n = this;
                e.prototype.onWindowOrientationChanged.call(n, t),
                    n.eachSubView(function(e, n) {
                        n.onWindowOrientationChanged(t)
                    })
            },
            r.prototype.resize = function(t, n) {
                let r = this;
                e.prototype.resize.call(r, t, n),
                    r.eachSubView(function(e, r) {
                        r.resize(t, n)
                    })
            },
            r.prototype.onAnimationStart = function() {
                let t = this;
                e.prototype.onAnimationStart.call(t);
                let n = t.subViews();
                for (let r = 0; r < n.length; r++) {
                    let i = n[r];
                    i.onAnimationStart()
                }
            },
            r.prototype.onAnimationStop = function() {
                let t = this;
                e.prototype.onAnimationStop.call(t);
                let n = t.subViews();
                for (let r = 0; r < n.length; r++) {
                    let i = n[r];
                    i.onAnimationStop()
                }
            },
            r.prototype.update = function(t, n) {
                let r = this;
                e.prototype.update.call(r, t, n);
                if (r.cachedImage == null) {
                    let i = r.subViews();
                    for (let s = 0; s < i.length; s++) {
                        let o = i[s];
                        o.visible() && o.update(t, n)
                    }
                }
            },
            r
}();

export const orientation = function () {
    let e = function() {};
        return e.PORTRAIT = "portrait",
            e.LANDSCAPE = "landscape",
            e
}();

export const stage = function (e = jQuery, t = mat3, n = view_container, r = scale_mode, i = align_mode, s = orientation, o = rect) {
    let u = function() {};
        u.prototype = new n;
        let a = u.prototype;
        return a.constructor = u,
            a.className = "AXEStage",
            a.onStage = !0,
            a.clone = function() {
                let e = this,
                    t = new u;
                return e.copyProperties(t),
                    t
            },
            a.copyProperties = function(e) {
                let t = this;
                n.prototype.copyProperties.call(t, e),
                    e.ratio(t.ratio()),
                    e.alignMode(t.alignMode()),
                    e.scaleMode(t.scaleMode())
            },
            a.updatePropsFromXML = function(e) {
                let t = this;
                n.prototype.updatePropsFromXML.call(t, e),
                    e.is("[ratio]") ? t.ratio(parseFloat(e.attr("ratio"))) : window["devicePixelRatio"] != undefined && t.ratio(window.devicePixelRatio)
            },
            a.dealloc = function() {
                let e = this;
                e._alignMode = null,
                    e._scaleMode = null,
                    e._stageMatrix = null,
                    n.prototype.dealloc.call(e)
            },
            a.matrix = function() {
                let e = this;
                return n.prototype.matrix.call(e)
            },
            a.width = function(e) {
                let t = this,
                    r = 0;
                return arguments.length > 0 ? (r = n.prototype.width.call(t, e),
                        t.needResizeFlag = !0) : r = n.prototype.width.call(t),
                    r
            },
            a.height = function(e) {
                let t = this,
                    r = 0;
                return arguments.length > 0 ? (r = n.prototype.height.call(t, e),
                        t.needResizeFlag = !0) : r = n.prototype.height.call(t),
                    r
            },
            a.needResizeFlag = !1,
            a._alignMode = i.MIDDLE_CENTER,
            a.alignMode = function(e) {
                let t = this;
                return arguments.length > 0 && e != t.mode && (t._alignMode = e,
                        t.needResizeFlag = !0),
                    t._alignMode
            },
            a._scaleMode = r.showAll,
            a.scaleMode = function(e) {
                let t = this;
                return arguments.length > 0 && e != t._scaleMode && (t._scaleMode = e,
                        t.needResizeFlag = !0),
                    t._scaleMode
            },
            a._stageMatrix = new t,
            a.stageMatrix = function(e) {
                let t = this;
                return arguments.length > 0 && (t._stageMatrix = e,
                        t.needResizeFlag = !0),
                    t._stageMatrix
            },
            a._ratio = 2,
            a.ratio = function(e) {
                let t = this;
                return isNaN(e) === !1 && t._ratio != parseFloat(e) && (t._ratio = e,
                        t.needResizeFlag = !0),
                    t._ratio
            },
            a.orientation = null,
            a.windowWidth = 0,
            a.windowHeight = 0,
            a.resize = function(e, t) {
                let r = this;
                if (r.windowWidth != e || r.windowHeight != t) {
                    r.windowWidth = e,
                        r.windowHeight = t,
                        r.stageMatrix(r.scaleMode().call(null, r.width(), r.height(), r.stageWidth(), r.stageHeight(), r.alignMode())),
                        n.prototype.resize.call(r, r.stageWidth(), r.stageHeight());
                    let i = e > t ? s.LANDSCAPE : s.PORTRAIT;
                    i != r.orientation && (r.orientation = i,
                        r.onWindowOrientationChanged(i))
                }
            },
            a.stageWidth = function() {
                let e = this;
                return e.windowWidth * e.ratio()
            },
            a.stageHeight = function() {
                let e = this;
                return e.windowHeight * e.ratio()
            },
            u
}();

export const assets_config = function () {
    let e = function() {};
        return e.baseURI = "./",
            e
}();

export const asset_types = function () {
    let e = function() {};
        return e.IMAGE = "image",
            e.TEXT = "text",
            e.JSON = "json",
            e.HTML = "html",
            e.XML = "xml",
            e.SOUND = "sound",
            e.AXE = "axe",
            e
}();

export const progress_event = function (e = event) {
    let t = function(n, r) {
        let i = this;
        e.prototype.constructor.call(i, n, t.PROGRESS),
            i.percent = r
    };
    t.PROGRESS = "progress",
        t.prototype = new e;
    let n = t.prototype;
    return n.constructor = t,
        n.percent = 0,
        n.clone = function(e) {
            let n = this;
            return e = arguments.length > 0 ? e : n.target,
                new t(e, n.percent)
        },
        t
}();

export const error_event = function (e = event) {
    let t = function(n, r) {
        let i = this;
        e.prototype.constructor.call(i, n, t.ERROR),
            i.error = r
    };
    t.prototype = new e;
    let n = t.prototype;
    return n.constructor = t,
        t.ERROR = "error",
        n.error = null,
        n.clone = function(e) {
            let n = this;
            return e = arguments.length > 0 ? e : n.target,
                new t(e, n.error)
        },
        t
}();

export const base64_js = function () {
    let e = {
        toByteArray: function(e) {},
        fromByteArray: function(e) {}
    };
    return function(e) {
            "use strict";

            function l(e) {
                let t = e.charCodeAt(0);
                if (t === r || t === a)
                    return 62;
                if (t === i || t === f)
                    return 63;
                if (t < s)
                    return -1;
                if (t < s + 10)
                    return t - s + 26 + 26;
                if (t < u + 26)
                    return t - u;
                if (t < o + 26)
                    return t - o + 26
            }

            function c(e) {
                function c(e) {
                    u[f++] = e
                }
                let t, r, i, s, o, u;
                if (e.length % 4 > 0)
                    throw new Error("Invalid string. Length must be a multiple of 4");
                let a = e.length;
                o = e.charAt(a - 2) === "=" ? 2 : e.charAt(a - 1) === "=" ? 1 : 0,
                    u = new n(e.length * 3 / 4 - o),
                    i = o > 0 ? e.length - 4 : e.length;
                let f = 0;
                for (t = 0,
                    r = 0; t < i; t += 4,
                    r += 3)
                    s = l(e.charAt(t)) << 18 | l(e.charAt(t + 1)) << 12 | l(e.charAt(t + 2)) << 6 | l(e.charAt(t + 3)),
                    c((s & 16711680) >> 16),
                    c((s & 65280) >> 8),
                    c(s & 255);
                return o === 2 ? (s = l(e.charAt(t)) << 2 | l(e.charAt(t + 1)) >> 4,
                        c(s & 255)) : o === 1 && (s = l(e.charAt(t)) << 10 | l(e.charAt(t + 1)) << 4 | l(e.charAt(t + 2)) >> 2,
                        c(s >> 8 & 255),
                        c(s & 255)),
                    u
            }

            function h(e) {
                function u(e) {
                    return t.charAt(e)
                }

                function a(e) {
                    return u(e >> 18 & 63) + u(e >> 12 & 63) + u(e >> 6 & 63) + u(e & 63)
                }
                let n, r = e.length % 3,
                    i = "",
                    s, o;
                for (n = 0,
                    o = e.length - r; n < o; n += 3)
                    s = (e[n] << 16) + (e[n + 1] << 8) + e[n + 2],
                    i += a(s);
                switch (r) {
                    case 1:
                        s = e[e.length - 1],
                            i += u(s >> 2),
                            i += u(s << 4 & 63),
                            i += "==";
                        break;
                    case 2:
                        s = (e[e.length - 2] << 8) + e[e.length - 1],
                            i += u(s >> 10),
                            i += u(s >> 4 & 63),
                            i += u(s << 2 & 63),
                            i += "=";
                        break;
                    default:
                }
                return i
            }
            let t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                n = typeof Uint8Array != "undefined" ? Uint8Array : Array,
                r = "+".charCodeAt(0),
                i = "/".charCodeAt(0),
                s = "0".charCodeAt(0),
                o = "a".charCodeAt(0),
                u = "A".charCodeAt(0),
                a = "-".charCodeAt(0),
                f = "_".charCodeAt(0);
            e.toByteArray = c,
                e.fromByteArray = h
        }
        (e),
        e
}();

export const asset_item = function (e = jQuery, t = event_center, n = assets_config, r = asset_types, i = system, s = event, o = progress_event, u = error_event, a = base64_js) {
    let f = function(e) {
        if (arguments.length <= 0)
            return;
        let t = this;
        t.referenceCount = 1;
        let n = /:(\d+)$/;
        if (n.test(e)) {
            let i = e.match(n);
            t.sliceCount = parseInt(i[1], 10);
            let s = e.split(":");
            s = s.slice(0, s.length - 1),
                e = s.join(":")
        } else
            t.sliceCount = 1;
        let o = /^\w+\|/;
        if (o.test(e)) {
            let u = e.split("|"),
                a = u.slice(1),
                f = a.join("|");
            u = u.slice(0, 1),
                u = u.concat(f),
                t.type = u[0],
                t.uri = u[1]
        } else {
            let l = /\.(\w+)$/,
                c = e.match(l);
            if (c != null && c.length >= 2) {
                let h = c[1].toLowerCase();
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
        let e = this,
            t = 0;
        return e.loaded ? t = 1 : e.bytesTotal == 0 ? t = 0 : t = e.bytesLoaded / e.bytesTotal,
            t
    },
    l.asset = null,
    l.configLoadURL = function(e) {
        let t = this,
            r = /^abs:/gi,
            i = /^https*/gi,
            s = /^\//gi,
            o = /^\.\//gi;
        r.test(e) ? t.loadURL = e.slice(4, e.length) : i.test(e) || s.test(e) || o.test(e) ? t.loadURL = e : t.loadURL = n.baseURI + e
    },
    l.load = function() {
        let e = this;
        e.loading = !0,
            e.startLoadTS = (new Date).getTime;
        let t = e[e.type + "Loader"];
        t.call(e)
    },
    l.assetPaths = null,
    l.assetImages = null,
    l.multipleAssetLoaded = function(e, n) {
        let r = this;
        r.assetPaths = e,
            r.assetImages = n,
            r.loaded = !0,
            r.loading = !1,
            r.endLoadTS = (new Date).getTime();
        let i = new s(r, s.LOAD);
        t.dispatchEvent(i)
    },
    l.assetLoaded = function(e) {
        let n = this;
        n.asset = e,
            n.loaded = !0,
            n.loading = !1,
            n.endLoadTS = (new Date).getTime();
        let r = new s(n, s.LOAD);
        t.dispatchEvent(r)
    },
    l.assetLoadError = function(e, n) {
        let r = this;
        r.failCount++;
        if (r.failCount < r.MAX_FAIL_COUNT)
            i.log("Fail to fetch data from url: " + r.loadURL + ". status: " + e + " des: " + n + ". Will retry in 150ms. Fail count:" + r.failCount),
            setTimeout(function() {
                r.load()
            }, 150);
        else {
            let s = "Fail to fetch data from url: " + r.loadURL + ". status: " + e + " des: " + n + ". Try count:" + r.failCount;
            i.log(s);
            let o = new Error(s);
            t.dispatchEvent(new u(r, o))
        }
    },
    l.loadWithXHR = function(n, r, s, u) {
        let a = this;
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
                    t == "success" ? n(e, t) : a.assetLoadError(t, "Unknown Error.");

                },
                xhr: function() {
                    let e = i.nativeXHR();

                    return e.onprogress = function(e) {
                            a.bytesTotal = e.total,
                                a.bytesLoaded = e.loaded;
                            let n = new o(a, a.loadPercent());
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
        let t = this,
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
            n.attr("src", t.loadURL);
    },
    l.textLoader = function() {
        let e = this,
            t = function(t) {
                e.assetLoaded(t)
            };
        e.loadWithXHR(t, "text", !1)
    },
    l.jsonLoader = function() {
        let e = this,
            t = function(t) {
                e.assetLoaded(t)
            };
        e.loadWithXHR(t, "json", !1)
    },
    l.htmlLoader = function() {
        let t = this,
            n = function(n) {
                let r = e(n),
                    i = r.find("div[pre-load]");
                i.length > 0 ? t.assetLoaded(r.find("> div[pre-load]")) : t.assetLoaded(r)
            };
        t.loadWithXHR(n, "html", !0)
    },
    l.xmlLoader = function() {
        let t = this,
            n = function(n) {
                t.assetLoaded(e(n).find("> *"))
            };
        t.loadWithXHR(n, "xml", !0)
    },
    l.soundLoader = function() {
        let t = this,
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
        let e = this,
            n = function(t) {
                let n = t.currentTarget,
                    r = n.response,
                    i = new DataView(r),
                    s = 0,
                    o = [],
                    u = [],
                    f = [];
                while (s < i.byteLength) {
                    let l = i.getUint32(s, !1);
                    s += 4;
                    let c = "";
                    for (let h = 0; h < l; h++) {
                        let p = i.getUint32(s, !1);
                        s += 4,
                            c += String.fromCharCode(p)
                    }
                    let d = i.getUint32(s, !1);
                    s += 4;
                    let v = new Uint8Array(r, s, d);

                    s += d,
                        o.push(c),
                        f.push(v)
                }
                let m = 0,
                    g = window.URL || window.webkitURL || window,
                    y = function() {
                        if (m >= f.length)
                            e.multipleAssetLoaded(o, u);
                        else {
                            let t = f[m],
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
                                let i = o[m].substr(o[m].length - 3, 3).toLowerCase(),
                                    s;
                                i == "jpg" || i == "jpeg" ? s = "data:image/jpeg;base64," : i == "png" ? s = "data:image/png;base64," : i == "gif" && (s = "data:image/gif;base64,"),
                                    n.src = s + a.fromByteArray(t);
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
                let r = new o(e, e.loadPercent());
                t.dispatchEvent(r)
            },
            r.onerror = function(t, n) {
                e.assetLoadError(t, n)
            },
            r.send()
    },
    f
}();

export const url_util = function (e = jQuery) {
    let t = function() {};
        return t.origin = function() {
                let e = String(window.location.href),
                    t = /^http[s]?:\/\/[^\/]*\/{1}/,
                    n = null;
                return t.test(e) ? n = e.match(t)[0] : n = e + "/",
                    n
            },
            t.relativePath = function(e) {
                let n = t.cleanURL(),
                    r = n.split("/");
                r.pop();
                let i = e.split("/");
                for (let s = 0; s < i.length; s++) {
                    let o = i[s];
                    o == ".." ? r.pop() : o.length > 0 && o != "." && r.push(o)
                }
                let u = r.join("/");
                return u
            },
            t.cleanURL = function() {
                let e = String(window.location.href),
                    t = e.split("#");
                return t[0]
            },
            t.hash = function(e) {
                if (arguments.length > 0) {
                    let n = t.cleanURL();
                    window.location.href = n + "#" + encodeURIComponent(e)
                }
                let r = String(window.location.href),
                    i = r.split("#"),
                    s = null;
                return i.length > 1 && (s = decodeURIComponent(i[1])),
                    s
            },
            t.decodeParams = function(t) {
                let n = null;
                if (t != null) {
                    n = {};
                    let r = decodeURIComponent(t).split("&");
                    e.each(r, function(e, t) {
                        let r = t.split("=")[0],
                            i = decodeURIComponent(t.split("=")[1]);
                        n[r] = i
                    })
                }
                return n
            },
            t.encodeParams = function(e) {
                let t = "";
                if (e != null) {
                    let n = [];
                    for (let r in e)
                        if (e.hasOwnProperty(r)) {
                            let i = encodeURIComponent(e[r]);
                            n.push(r + "=" + i)
                        }
                    t = n.join("&")
                }
                return t
            },
            t.splitURLs = function(e) {
                let t = /\[\d+-\d+\]/,
                    n = e.match(t),
                    r = [];
                if (n != null) {
                    n = n[0];
                    let i = n.slice(1, n.length - 1).split("-"),
                        s = i[0],
                        o = i[1],
                        u = Math.max(s.length, o.length);
                    s = parseInt(s, 10),
                        o = parseInt(o, 10);
                    for (let a = s; a <= o; a++) {
                        let f = String(a);
                        while (f.length < u)
                            f = "0" + f;
                        let l = e.replace(t, f);
                        r.push(l)
                    }
                } else
                    r = [e];
                return r
            },
            t
}();

export const assets_loader = function (e = jQuery, t = system, n = event_center, r = asset_item, i = progress_event, s = event, o = error_event, u = url_util, a = asset_types) {
    let f = function(e) {
        let t = this;
        isNaN(e) === !1 && (t._threadsCount = e)
    };
    f._assets = null,
        f.assets = function() {
            return f._assets == null && (f._assets = {}),
                f._assets
        },
        f.threadsCount = 10,
        f.asset = function(e) {
            let t = f.assets(),
                n = t[e];
            return n != null ? n.asset : null
        },
        f.releaseAssets = function(e) {
            let t = f.assets();
            for (let n = 0; n < e.length; n++) {
                let r = e[n],
                    i = u.splitURLs(r);
                for (let s = 0; s < i.length; s++) {
                    let o = i[s];
                    if (t.hasOwnProperty(o)) {
                        let a = t[o];
                        a.referenceCount -= 1,
                            a.referenceCount <= 0 && delete t[o]
                    }
                }
            }
        },
        f.releaseAll = function() {
            let e = f.assets();
            for (let t in e)
                if (e.hasOwnProperty(t)) {
                    let n = e[t];
                    n.referenceCount -= 1,
                        n.referenceCount <= 0 && delete e[t]
                }
        },
        f.clearAll = function() {
            f._assets = null
        };
    let l = f.prototype;
    return l.assets = null,
        l.loadAssets = function(e) {
            let t = this;
            e = typeof e == "string" ? [e] : e,
                t.assets = [];
            for (let a = 0; a < e.length; a++) {
                let l = e[a],
                    c = u.splitURLs(l);
                for (let h = 0; h < c.length; h++) {
                    let p = new r(c[h], t);
                    f.asset(p.uri) == null ? (n.addListener(p, t, [s.LOAD, i.PROGRESS, o.ERROR], [t.onAssetLoaded, t.onAssetLoadProgress, t.onAssetLoadError]),
                        t.assets.push(p)) : f.assets()[p.uri].referenceCount += 1
                }
            }
            if (t.assets.length <= 0) {
                let d = new s(t, s.LOAD);
                n.dispatchEvent(d)
            } else
                t.multipleThreadLoad()
        },
        l._threadsCount = 0,
        l.threadsCount = function() {
            let e = this,
                t = e._threadsCount;
            if (isNaN(t) || t < 1)
                t = f.threadsCount;
            return t
        },
        l.loadingItemCount = 0,
        l.multipleThreadLoad = function() {
            let e = this;
            if (e.loadingItemCount < e.threadsCount())
                for (let t = 0; t < e.assets.length; t++) {
                    let n = e.assets[t];
                    if (n.loaded === !1 && n.loading === !1) {
                        n.load(),
                            e.loadingItemCount++;
                        if (e.loadingItemCount >= e.threadsCount())
                            break
                    }
                }
        },
        l.loadProgress = function() {
            let e = this,
                t = 0,
                n = 0;
            for (let r = 0; r < e.assets.length; r++) {
                let i = e.assets[r];
                t += i.sliceCount,
                    n += i.loadPercent() * i.sliceCount
            }
            return n / t
        },
        l.onAssetLoaded = function(e) {
            let t = this,
                u = e.target;
            n.removeListener(u, t, [s.LOAD, i.PROGRESS, o.ERROR], [t.onAssetLoaded, t.onAssetLoadProgress, t.onAssetLoadError]);
            if (u.type == a.AXE)
                for (let l = 0; l < u.assetImages.length; l++) {
                    let c = u.assetPaths[l],
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
                let d = new s(t, s.LOAD);
                n.dispatchEvent(d)
            }
        },
        l.onAssetLoadProgress = function() {
            let e = this,
                t = e.loadProgress(),
                r = new i(e, t);
            n.dispatchEvent(r)
        },
        l.onAssetLoadError = function(e) {
            let t = this,
                r = e.clone();
            r.target = t,
                n.dispatchEvent(r)
        },
        f
}();

export const bitmap = function (e = view, t = assets_loader) {
    let n = function() {};
        n.prototype = new e;
        let r = n.prototype;
        return r.className = "AXEBitmap",
            r.clone = function() {
                let e = this,
                    t = new n;
                return e.copyProperties(t),
                    t
            },
            r.copyProperties = function(t) {
                let n = this;
                e.prototype.copyProperties.call(n, t),
                    t.fixSize(n.fixSize()),
                    t.bitmap(n.bitmap())
            },
            r.dealloc = function() {
                let t = this;
                t._bitmap = null,
                    e.prototype.dealloc.call(t)
            },
            r.updatePropsFromXML = function(n) {
                let r = this;
                e.prototype.updatePropsFromXML.call(r, n),
                    r.fixSize(n.is("[width]") && n.is("[height]")),
                    n.is("[src]") && r.bitmap(t.asset(n.attr("src")))
            },
            r.updateSize = function() {
                let e = this;
                e.bitmap() != null && (e.fixSize() == 0 ? (e.width(e.bitmap().naturalWidth),
                    e.height(e.bitmap().naturalHeight)) : (e.bitmap().width = e.width(),
                    e.bitmap().height = e.height()))
            },
            r._fixSize = !1,
            r.fixSize = function(e) {
                let t = this;
                return arguments.length > 0 && e != t._fixSize && (t._fixSize = e,
                        t.updateSize(),
                        t.needToRender(!0)),
                    t._fixSize
            },
            r._bitmap = null,
            r.bitmap = function(e) {
                let t = this;
                return arguments.length > 0 && e != t._bitmap && (t._bitmap = e,
                        t.updateSize(),
                        t.needToRender(!0)),
                    t._bitmap
            },
            n
}();

export const shape = function (e = jQuery, t = view, n = color, r = paths) {
    let i = function() {};
        return i.prototype = new t,
            i.prototype.constructor = i,
            i.prototype.className = "AXEShape",
            i.prototype.dealloc = function() {
                let e = this;
                e._paths = null,
                    e._strokeColor = null,
                    e._fillColor = null,
                    t.prototype.dealloc.call(e)
            },
            i.prototype.clone = function() {
                let e = this,
                    t = new i;
                return e.copyProperties(t),
                    t
            },
            i.prototype.copyProperties = function(e) {
                let n = this;
                t.prototype.copyProperties.call(n, e),
                    e.strokeSize(n.strokeSize()),
                    n.strokeColor() != null && e.strokeColor(n.strokeColor().clone()),
                    n.fillColor() != null && e.fillColor(n.fillColor().clone()),
                    n.paths() != null && (e._paths = n.paths().clone())
            },
            i.prototype.updatePropsFromXML = function(r) {
                let i = this;
                t.prototype.updatePropsFromXML.call(i, r),
                    r.is("[stroke-size]") && i.strokeSize(parseFloat(r.attr("stroke-size"))),
                    r.is("[stroke-color]") && i.strokeColor(n.colorWithString(r.attr("stroke-color"))),
                    r.is("[fill-color]") && i.fillColor(n.colorWithString(r.attr("fill-color")));
                let s = r.find("> path");
                if (s.length > 0) {
                    let o = e.trim(s.text());
                    i.paths().clearCommands(),
                        i.paths().addCommand(o)
                }
            },
            i.prototype._strokeSize = 1,
            i.prototype.strokeSize = function(e) {
                let t = this;
                return arguments.length > 0 && t._strokeSize != e && (t._strokeSize = e,
                        t.needToRender(!0)),
                    t._strokeSize
            },
            i.prototype._strokeColor = null,
            i.prototype.strokeColor = function(e) {
                let t = this;
                return arguments.length > 0 && (t._strokeColor = e,
                        t.needToRender(!0)),
                    t._strokeColor
            },
            i.prototype._fillColor = null,
            i.prototype.fillColor = function(e) {
                let t = this;
                return arguments.length > 0 && (t._fillColor = e,
                        t.needToRender(!0)),
                    t._fillColor
            },
            i.prototype._paths = null,
            i.prototype.paths = function() {
                let e = this;
                return e._paths == null && (e._paths = new r,
                        e._paths.delegate = e),
                    e._paths
            },
            i.prototype.onPathChanged = function(e) {
                let t = this;
                e == t.paths() && t.needToRender(!0)
            },
            i
}();

export const movie = function (e = view, t = assets_loader, n = url_util, r = event, i = event_center) {
    let s = function(e, t, n, r) {
        let i = this;
        i.frame = e,
            i.target = r instanceof Object ? r : null,
            i.action = t,
            i.params = n instanceof Array ? n : []
    };
    s.prototype.constructor = s,
        s.prototype.target = null,
        s.prototype.action = null,
        s.prototype.params = null,
        s.prototype.frame = NaN,
        s.prototype.execute = function() {
            let e = this;
            e.action.apply(e.target, e.params)
        };
    let o = function() {};
    return o.prototype = new e,
        o.prototype.constructor = o,
        o.prototype.className = "AXEMovie",
        o.prototype.dealloc = function() {
            let t = this;
            t._frames = null,
                e.prototype.dealloc.call(t)
        },
        o.prototype.clone = function() {
            let e = this,
                t = new o;
            return e.copyProperties(t),
                t
        },
        o.prototype.copyProperties = function(t) {
            let n = this;
            e.prototype.copyProperties.call(n, t),
                t._frames = n.frames().slice(),
                t.pauseWhenAnimating(n.pauseWhenAnimating()),
                t.frameRate(n.frameRate()),
                t.loop(n.loop()),
                t.backToFirst(n.backToFirst());
            if (n.actions() != null) {
                t._actions = {};
                let r = n.actions();
                for (let i in r)
                    r.hasOwnProperty(i) && (t._actions[i] = r[i])
            }
        },
        o.prototype.updatePropsFromXML = function(r) {
            let i = this;
            e.prototype.updatePropsFromXML.call(i, r);
            let s = r.find("> frame"),
                o = i.frames();
            s.each(function(e, r) {
                    let i = $(r),
                        s = i.is("[repeat]") ? parseInt(i.attr("repeat"), 10) : 1;
                    for (let u = 0; u < s; u++) {
                        let a = i.text(),
                            f = n.splitURLs(a);
                        i.is("[reverse]") && (f = f.reverse());
                        for (let l = 0; l < f.length; l++) {
                            let c = f[l];
                            o.push(t.asset(c))
                        }
                    }
                }),
                r.is("[pause-when-animating]") && i.pauseWhenAnimating(r.attr("pause-when-animating") === "true"),
                r.is("[fps]") && i.frameRate(parseFloat(r.attr("fps"))),
                i.loop(r.is("[loop]") ? String(r.attr("loop")).toLowerCase() == "true" : !0),
                i.backToFirst(r.is("[back]") ? String(r.attr("back")).toLowerCase() == "true" : !1);
            let u = r.find("> script");
            u.each(function(e, t) {
                let n = $(t),
                    r = n.attr("frame").toLowerCase(),
                    s;
                r == "first" ? s = 0 : r == "last" ? s = i.framesCount() - 1 : s = parseInt(r, 10);
                if (isNaN(s))
                    return;
                let o = n.attr("action"),
                    u = o.split(":"),
                    a = u[0],
                    f = i[a];
                if (typeof f != "function")
                    return;
                let l = [];
                if (u.length > 1) {
                    l = u[1].split(",");
                    for (let c = 0; c < l.length; c++) {
                        let h = parseFloat(l[c]);
                        if (isNaN(h) === !1)
                            l[c] = h;
                        else if (l[c] == "true" || l[c] == "false")
                            l[c] = l[c] == "true"
                    }
                }
                i.addAction(s, f, l, i)
            });
            let a = r.is("[auto-play]") ? String(r.attr("auto-play")).toLowerCase() == "true" : !0;
            a ? i.goToAndPlay(0) : i.goToAndStop(0)
        },
        o.prototype._actions = null,
        o.prototype.actions = function() {
            let e = this;
            return e._actions == null && (e._actions = {}),
                e._actions
        },
        o.prototype.frameActions = function(e) {
            let t = this,
                n = String(e),
                r = null;
            return t.actions().hasOwnProperty(n) && (r = t.actions()[n]),
                r
        },
        o.prototype.addAction = function(e, t, n, r) {
            let i = this,
                o = new s(e, t, n, r),
                u = i.frameActions(e);
            return u == null && (u = [],
                    i.actions()[String(e)] = u),
                u.push(o),
                o
        },
        o.prototype.removeAction = function(e) {
            let t = this,
                n = t.frameActions(e.frame);
            if (n != null)
                for (let r = 0; r < n.length; r++)
                    if (n[r] == e) {
                        n.splice(r, 1);
                        break
                    }
        },
        o.prototype.removeFrameAction = function(e) {
            let t = this,
                n = t.frameActions(e);
            n != null && delete t.actions()[String(e)]
        },
        o.prototype._backToFirst = !1,
        o.prototype.backToFirst = function(e) {
            let t = this;
            return arguments.length > 0 && (t._backToFirst = e),
                t._backToFirst
        },
        o.prototype._loop = !0,
        o.prototype.loop = function(e) {
            let t = this;
            return arguments.length > 0 && (t._loop = e),
                t._loop
        },
        o.prototype._finishAction = null,
        o.prototype.duration = function() {
            let e = this;
            return e.framesCount() / e.frameRate()
        },
        o.prototype.framesCount = function() {
            let e = this;
            return e.frames().length
        },
        o.prototype.addFramesByURL = function(e, r, i) {
            let s = this;
            i = isNaN(i) ? 1 : i,
                r = typeof r == "boolean" ? r : !1;
            let o = s.frames();
            for (let u = 0; u < i; u++) {
                let a = n.splitURLs(e);
                r && (a = a.reverse());
                for (let f = 0; f < a.length; f++) {
                    let l = a[f];
                    o.push(t.asset(l))
                }
            }
        },
        o.prototype._frames = null,
        o.prototype.frames = function(e) {
            let t = this;
            return arguments.length > 0 && e != null && (t._frames = e.slice(),
                    t.needToRender(!0)),
                t._frames == null && (t._frames = []),
                t._frames
        },
        o.prototype._frameRate = 24,
        o.prototype.frameRate = function(e) {
            let t = this;
            return isNaN(e) === !1 && (t._frameRate = e,
                    t.needToRender(!0)),
                t._frameRate
        },
        o.prototype.reverse = function() {
            let e = this,
                t = e.frames();
            t.reverse(),
                e.frames(t)
        },
        o.prototype.playing = !1,
        o.prototype.play = function() {
            let e = this;
            if (e.playing)
                return;
            e.playing = !0
        },
        o.prototype.stop = function() {
            let e = this;
            e.playing && (e.playing = !1)
        },
        o.prototype.goToAndStop = function(e) {
            let t = this;
            t.stop(),
                t._currentFrame = Math.max(0, Math.min(t.framesCount() - 1, e)),
                t.needToRender(!0)
        },
        o.prototype.goToAndPlay = function(e) {
            let t = this;
            t.goToAndStop(e),
                t.play(),
                t.needToRender(!0)
        },
        o.prototype._currentFrame = 0,
        o.prototype.currentFrame = function() {
            let e = this;
            return Math.floor(e._currentFrame)
        },
        o.prototype._pauseWhenAnimating = !1,
        o.prototype.pauseWhenAnimating = function(e) {
            let t = this;
            return arguments.length > 0 && e != t._pauseWhenAnimating && (t._pauseWhenAnimating = e),
                t._pauseWhenAnimating
        },
        o.prototype.update = function(t, n) {
            let s = this;
            e.prototype.update.call(s, t, n);
            if (s.playing && (s.pauseWhenAnimating() === !1 || s.animating() === !1)) {
                let o = n * s.frameRate(),
                    u = Math.floor(s._currentFrame + o),
                    a = s.currentFrame(),
                    f = u - a,
                    l = s._currentFrame + o - u;
                for (let c = 0; c < f; c++) {
                    let h = s.currentFrame(),
                        p = s.frameActions(h);
                    if (p != null)
                        for (let d = 0; d < p.length; d++)
                            p[d].execute();
                    s._currentFrame = s.currentFrame() + 1,
                        s._currentFrame == s.framesCount() && (s.loop() ? s._currentFrame = 0 : (s._currentFrame = s.backToFirst() ? 0 : s.framesCount() - 1,
                                s.stop()),
                            i.dispatchEvent(new r(s, r.END))),
                        s.needToRender(!0),
                        i.dispatchEvent(new r(s, r.CHANGE));
                    if (s.playing == 0)
                        break
                }
                s.playing && (s._currentFrame = s.currentFrame() + l)
            }
        },
        o
}();

export const text_v_align = function () {
    let e = function() {};
        return e.TOP = "top",
            e.MIDDLE = "middle",
            e.BOTTOM = "bottom",
            e.ALPHABETIC = "alphabetic",
            e.IDEOGRAPHIC = "ideographic",
            e.HANGING = "hanging",
            e
}();

export const text = function (e = jQuery, t = view, n = color, r = text_align, i = text_v_align) {
    let s = function() {};
        s.prototype = new t;
        let o = s.prototype;
        return s.prototype.constructor = s,
            s.prototype.className = "AXEText",
            s.prototype.clone = function() {
                let e = this,
                    t = new s;
                return e.copyProperties(t),
                    t
            },
            s.prototype.copyProperties = function(e) {
                let n = this;
                t.prototype.copyProperties.call(n, e),
                    n.color() != null && e.color(n.color()),
                    n.font() != null && e.font(n.font()),
                    e.lineHeight(n.lineHeight()),
                    e.wordWrap(n.wordWrap()),
                    e.size(n.size()),
                    e.style(n.style()),
                    e.textAlign(n.textAlign()),
                    e.textVAlign(n.textVAlign()),
                    e.text(n.text()),
                    e.mergeLastLine(n.mergeLastLine())
            },
            s.prototype.updatePropsFromXML = function(r) {
                let i = this;
                t.prototype.updatePropsFromXML.call(i, r),
                    r.is("[merge-last-line]") && i.mergeLastLine(parseInt(r.attr("merge-last-line"), 10)),
                    r.is("[color]") && i.color(n.colorWithString(r.attr("color"))),
                    r.is("[font]") && i.font(r.attr("font")),
                    r.is("[size]") && i.size(parseFloat(r.attr("size"))),
                    r.is("[style]") && i.style(r.attr("style")),
                    r.is("[text-align]") && i.textAlign(r.attr("text-align")),
                    r.is("[text-v-align]") && i.textVAlign(r.attr("text-v-align")),
                    r.is("[word-wrap]") && i.wordWrap(r.attr("word-wrap") == "true"),
                    r.is("[line-height]") && i.lineHeight(parseFloat(r.attr("line-height"))),
                    i.text(e.trim(r.text()))
            },
            s.prototype._mergeLastLine = 0,
            s.prototype.mergeLastLine = function(e) {
                let t = this;
                return isNaN(e) == 0 && t._mergeLastLine != Math.abs(e) && (t._mergeLastLine = Math.abs(e),
                        t.needToRender(!0)),
                    t._mergeLastLine
            },
            s.prototype._lineHeight = 0,
            s.prototype.lineHeight = function(e) {
                let t = this;
                return arguments.length > 0 && e != t._lineHeight && (t._lineHeight = e,
                        t.needToRender(!0)),
                    t._lineHeight
            },
            s.prototype._wordWrap = !1,
            s.prototype.wordWrap = function(e) {
                let t = this;
                return arguments.length > 0 && e != t._wordWrap && (t._wordWrap = e,
                        t.needToRender(!0)),
                    t._wordWrap
            },
            s.prototype._color = null,
            s.prototype.color = function(e) {
                let t = this;
                return arguments.length > 0 && e != t._color && (t._color = e,
                        t.needToRender(!0)),
                    t._color
            },
            s.prototype._font = "sans-serif",
            s.prototype.font = function(e) {
                let t = this;
                return arguments.length > 0 && typeof e == "string" && t._font != e && (t._font = e,
                        t.needToRender(!0)),
                    null
            },
            s.prototype._size = 12,
            s.prototype.size = function(e) {
                let t = this;
                return arguments.length > 0 && isNaN(parseFloat(e)) === !1 && parseFloat(e) != t._size && (t._size = parseFloat(e),
                        t.needToRender(!0)),
                    t._size
            },
            s.prototype._style = null,
            s.prototype.style = function(e) {
                let t = this;
                return arguments.length > 0 && typeof e == "string" && e != t._style && (t._style = e,
                        t.needToRender(!0)),
                    t._style
            },
            s.prototype.textStyle = function() {
                let e = this,
                    t = [];
                return e._style != null && t.push(e._style),
                    e._size != null && t.push(e._size + "px"),
                    e._font != null && t.push(e._font),
                    t.join(" ")
            },
            s.prototype._textVAlign = i.ALPHABETIC,
            s.prototype.textVAlign = function(e) {
                let t = this;
                return arguments.length > 0 && typeof e == "string" && t._textVAlign != e && (t._textVAlign = e,
                        t.needToRender(!0)),
                    t._textVAlign
            },
            s.prototype._textAlign = r.LEFT,
            s.prototype.textAlign = function(e) {
                let t = this;
                return arguments.length > 0 && typeof e == "string" && e != t._textAlign && (t._textAlign = e,
                        t.needToRender(!0)),
                    t._textAlign
            },
            s.prototype._text = "",
            s.prototype.text = function(e) {
                let t = this;
                return arguments.length > 0 && t._text != e && (t._text = String(e),
                        t.needToRender(!0)),
                    t._text
            },
            s
}();

export const button_state = function () {
    let e = {};
        return e.NORMAL_STATE = 0,
            e.CLICK_STATE = 1,
            e
}();

export const button = function (e = view_container, t = button_state, n = event_center, r = touch_event, i = event) {
    let s = function() {};
        s.prototype = new e;
        let o = s.prototype;
        return s.prototype.constructor = s,
            s.prototype.normalStateView = null,
            s.prototype.clickStateView = null,
            s.prototype.disableStateView = null,
            s.prototype.clone = function() {
                let e = this,
                    t = new s;
                return e.copyProperties(t),
                    t
            },
            s.prototype.copyProperties = function(t) {
                let n = this;
                e.prototype.copyProperties.call(n, t),
                    t.initButton(),
                    t.switchMode(n.switchMode())
            },
            s.prototype.dealloc = function() {
                let t = this;
                n.removeListener(t),
                    e.prototype.dealloc.call(t)
            },
            s.prototype.updatePropsFromXML = function(t) {
                let n = this;
                e.prototype.updatePropsFromXML.call(n, t),
                    n.initButton(),
                    t.is("[switch-mode]") && n.switchMode(t.attr("switch-mode") == "true")
            },
            s.prototype.initButton = function() {
                let e = this;
                e.normalStateView = e.subViewByName("normal"),
                    e.clickStateView = e.subViewByName("click"),
                    e.disableStateView = e.subViewByName("disable"),
                    e.updateButtonView(),
                    n.addListener(e, e, r.TOUCH_START, e.onButtonTouchStart),
                    n.addListener(e, e, r.TOUCH_END, e.onButtonTouchEnd)
            },
            s.prototype.onButtonTouchStart = function() {
                let e = this;
                e.switchMode() === !1 && e.buttonState(t.CLICK_STATE)
            },
            s.prototype.onButtonTouchEnd = function() {
                let e = this;
                e.switchMode() === !1 ? e.buttonState(t.NORMAL_STATE) : (e.buttonState() == t.NORMAL_STATE ? e.buttonState(t.CLICK_STATE) : e.buttonState(t.NORMAL_STATE),
                    n.dispatchEvent(new i(e, i.CHANGE)))
            },
            s.prototype._switchMode = !1,
            s.prototype.switchMode = function(e) {
                let n = this;
                return typeof e == "boolean" && e != n._switchMode && (n._switchMode = e,
                        n.buttonState(t.NORMAL_STATE)),
                    n._switchMode
            },
            s.prototype._buttonState = t.NORMAL_STATE,
            s.prototype.buttonState = function(e) {
                let t = this;
                return isNaN(e) === !1 && (t._buttonState = e,
                        t.updateButtonView()),
                    t._buttonState
            },
            s.prototype.enabled = function(t) {
                let n = this,
                    r = e.prototype.enabled.call(n, t);
                return typeof t == "boolean" && n.updateButtonView(),
                    r
            },
            s.prototype.updateButtonView = function() {
                let e = this;
                e.switchMode() ? (e.disableStateView != null && e.disableStateView.visible(!1),
                    e.normalStateView != null && e.normalStateView.visible(e.buttonState() == t.NORMAL_STATE),
                    e.clickStateView != null && e.clickStateView.visible(e.buttonState() == t.CLICK_STATE)) : (e.disableStateView != null && e.disableStateView.visible(e.enabled() == 0),
                    e.normalStateView != null && (e.enabled() ? e.normalStateView.visible(e.buttonState() == t.NORMAL_STATE) : e.normalStateView.visible(e.disableStateView == null)),
                    e.clickStateView != null && e.clickStateView.visible(e.enabled() && e.buttonState() == t.CLICK_STATE))
            },
            s
}();

export const motion_frame = function (Mat3 = mat3, BBColor = color) {
    let AXEMotionFrame = function() {},
            pt = AXEMotionFrame.prototype;
        return pt.constructor = AXEMotionFrame,
            pt.time = 0,
            pt.tween = null,
            pt.isBlank = !1,
            pt.matrix = null,
            pt.alpha = 1,
            pt.bgColor = null,
            pt.frame = NaN,
            pt.rotation = null,
            pt.updateFromXML = function($xml) {
                let self = this;
                self.isBlank = $xml.is("[blank]"),
                    self.time = parseFloat($xml.attr("time")),
                    self.tween = $xml.is("[tween]") ? eval($xml.attr("tween")) : null,
                    $xml.is("[bg-color]") ? self.bgColor = BBColor.colorWithString($xml.attr("bg-color")) : self.bgColor = null,
                    $xml.is("[alpha]") && (self.alpha = parseFloat($xml.attr("alpha"))),
                    $xml.is("[frame]") ? self.frame = parseFloat($xml.attr("frame")) : self.frame = NaN;
                if ($xml.is("[rotate]")) {
                    let strRotation = $xml.attr("rotate").split(",");
                    self.rotation = {
                        x: parseFloat(strRotation[0]),
                        y: parseFloat(strRotation[1]),
                        rotation: parseFloat(strRotation[2]) * (Math.PI / 180)
                    }
                }
                let matrix = new Mat3;
                if ($xml.is("[matrix]")) {
                    let strMatrix = $xml.attr("matrix").split(",");
                    matrix.a = parseFloat(strMatrix[0]),
                        matrix.b = parseFloat(strMatrix[1]),
                        matrix.c = parseFloat(strMatrix[2]),
                        matrix.d = parseFloat(strMatrix[3]),
                        matrix.tx = parseFloat(strMatrix[4]),
                        matrix.ty = parseFloat(strMatrix[5])
                } else {
                    let scaleX = $xml.is("[scale-x]") ? parseFloat($xml.attr("scale-x")) : 1,
                        scaleY = $xml.is("[scale-y]") ? parseFloat($xml.attr("scale-y")) : 1,
                        rotation = $xml.is("[rotation]") ? parseFloat($xml.attr("rotation")) * (Math.PI / 180) : 0,
                        x = $xml.is("[x]") ? parseFloat($xml.attr("x")) : 0,
                        y = $xml.is("[y]") ? parseFloat($xml.attr("y")) : 0;
                    matrix.a = scaleX * Math.cos(rotation),
                        matrix.b = Math.sin(rotation),
                        matrix.c = -1 * Math.sin(rotation),
                        matrix.d = scaleY * Math.cos(rotation),
                        matrix.tx = x,
                        matrix.ty = y
                }
                self.matrix = matrix
            },
            pt.clone = function() {
                let e = this,
                    t = new AXEMotionFrame;
                return t.time = e.time,
                    t.frame = e.frame,
                    t.tween = e.tween,
                    t.alpha = e.alpha,
                    t.isBlank = e.isBlank,
                    e.matrix != null && (t.matrix = e.matrix.clone()),
                    t
            },
            pt.dealloc = function() {
                let e = this;
                e.matrix = null
            },
            AXEMotionFrame
}();

export const motion_layer = function (e = motion_frame, t = mat3, n = view_factory, r = color, i = vec2) {
    let s = function() {},
            o = s.prototype;
        return o.constructor = s,
            o.contentView = null,
            o.updateFromXML = function(t) {
                let r = this,
                    i = t.find("> content > *");
                if (i.length > 0) {
                    let s = i[0].nodeName.toLowerCase();
                    r.contentView = n.createViewByNodeName(s),
                        r.contentView != null && r.contentView.updatePropsFromXML(i)
                } else
                    r.content = null;
                r.frames = [];
                let o = t.find("> frame");
                o.each(function(t, n) {
                    let i = $(n),
                        s = new e;
                    s.updateFromXML(i),
                        r.frames.push(s)
                })
            },
            o.calculateValue = function(e, t, n, r, i) {
                return e + (t - e) * i(n, 0, 1, r)
            },
            o.frames = null,
            o.calculateRotation = function(e, n, r) {
                let s = new i(e.width() / 2, e.height() / 2),
                    o = new t;
                return o.a = Math.cos(r),
                    o.b = Math.sin(r),
                    o.c = -1 * o.b,
                    o.d = o.a,
                    o.tx = n.x - o.a * s.x - o.c * s.y,
                    o.ty = n.y - o.b * s.x - o.d * s.y,
                    o
            },
            o.contentWithTime = function(e) {
                let n = this,
                    s = null,
                    o = null;
                for (let u = n.frames.length - 1; u >= 0; u--) {
                    let a = n.frames[u];
                    if (a.time <= e) {
                        s = a,
                            u < n.frames.length - 1 && (o = n.frames[u + 1]);
                        break
                    }
                }
                let f = null;
                if (s != null && s.isBlank == 0) {
                    f = n.contentView;
                    if (s.tween == null || o == null)
                        f.alpha(s.alpha),
                        s.bgColor != null && f.bgColor(s.bgColor),
                        s.rotation != null ? f.matrix(n.calculateRotation(f, new i(s.x, s.y), s.rotation)) : f.matrix(s.matrix),
                        f.goToAndPlay != undefined && isNaN(s.frame) == 0 && (o != null && isNaN(o.frame) == 0 ? f.goToAndStop(s.frame) : f.goToAndPlay(s.frame));
                    else {
                        let l = o.time - s.time,
                            c = e - s.time;
                        if (s.bgColor != null && o.bgColor != null) {
                            let h = new r;
                            h.r(n.calculateValue(s.bgColor.r(), o.bgColor.r(), c, l, s.tween)),
                                h.g(n.calculateValue(s.bgColor.g(), o.bgColor.g(), c, l, s.tween)),
                                h.b(n.calculateValue(s.bgColor.b(), o.bgColor.b(), c, l, s.tween)),
                                h.a(n.calculateValue(s.bgColor.a(), o.bgColor.a(), c, l, s.tween)),
                                f.bgColor(h)
                        }
                        let p = n.calculateValue(s.alpha, o.alpha, c, l, s.tween);
                        f.alpha(p);
                        if (f.goToAndStop != undefined && isNaN(s.frame) == 0 && isNaN(o.frame) == 0) {
                            let d = Math.floor(n.calculateValue(s.frame, o.frame, c, l, s.tween));
                            f.goToAndStop(d)
                        }
                        if (s.rotation != null && o.rotation != null) {
                            let v = n.calculateValue(s.rotation.rotation, o.rotation.rotation, c, l, s.tween);
                            f.matrix(n.calculateRotation(f, new i(s.rotation.x, s.rotation.y), v))
                        } else {
                            let m = s.matrix,
                                g = o.matrix,
                                y = new t;
                            y.a = n.calculateValue(m.a, g.a, c, l, s.tween),
                                y.b = n.calculateValue(m.b, g.b, c, l, s.tween),
                                y.c = n.calculateValue(m.c, g.c, c, l, s.tween),
                                y.d = n.calculateValue(m.d, g.d, c, l, s.tween),
                                y.tx = n.calculateValue(m.tx, g.tx, c, l, s.tween),
                                y.ty = n.calculateValue(m.ty, g.ty, c, l, s.tween),
                                f.matrix(y)
                        }
                    }
                }
                return f
            },
            o.reverse = function() {
                let e = this,
                    t = e.frames.slice(),
                    n = [];
                for (let r = 0; r < t.length; r++) {
                    let i = t[r];
                    n.push(i.time)
                }
                t = t.reverse();
                for (let s = 0; s < t.length; s++) {
                    let o = t[s];
                    o.time = n[s]
                }
                e.frames = t
            },
            o.clone = function() {
                let e = this,
                    t = new s;
                e.contentView != null && (t.contentView = e.contentView.clone()),
                    t.frames = [];
                for (let n = 0; n < e.frames.length; n++) {
                    let r = e.frames[n];
                    t.frames.push(r)
                }
                return t
            },
            o.dealloc = function() {
                let e = this;
                e.contentView.dealloc(),
                    e.contentView = null;
                for (let t = 0; t < e.frames.length; t++)
                    e.frames[t].dealloc();
                e.frames = null
            },
            s
}();

export const motion = function (e = jQuery, t = system, n = view_container, r = motion_layer, i = event_center, s = event ) {
    let o = function() {};
        o.prototype = new n;
        let u = o.prototype;
        return u.constructor = o,
            u.clone = function() {
                let e = this,
                    t = new o;
                return e.copyProperties(t),
                    t
            },
            u.copyProperties = function(e) {
                let t = this;
                n.prototype.copyProperties.call(t, e),
                    e.layers = [];
                for (let r = 0; r < t.layers.length; r++) {
                    let i = t.layers[r];
                    e.layers.push(i.clone())
                }
                e._duration = t.duration(),
                    e.loop(t.loop()),
                    e.currentTime(t.currentTime()),
                    e.updateFromTime(),
                    e.play()
            },
            u.updatePropsFromXML = function(t) {
                let i = this;
                n.prototype.updatePropsFromXML.call(i, t),
                    i.layers = [];
                let s = t.find("> layer");
                s.each(function(t, n) {
                        let s = e(n),
                            o = new r;
                        o.updateFromXML(s),
                            i.layers.push(o)
                    }),
                    i._duration = parseFloat(t.attr("duration")),
                    i.loop(t.is("[loop]") ? t.attr("loop") == "true" : !0),
                    t.is("[reverse]") && i.reverse(),
                    t.is("[time]") ? i.currentTime(parseFloat(t.attr("time"))) : i.currentTime(0),
                    i.updateFromTime(),
                    t.is("[auto-play]") ? t.attr("auto-play") == "true" ? i.play() : i.pause() : i.play()
            },
            u.layers = null,
            u.layerContentByName = function(e) {
                let t = this,
                    n = null;
                for (let r = 0; r < t.layers.length; r++) {
                    let i = t.layers[r].contentView;
                    if (i.name() == e) {
                        n = i;
                        break
                    }
                }
                return n
            },
            u.isReverse = !1,
            u.reverse = function() {
                let e = this;
                for (let t = 0; t < e.layers.length; t++) {
                    let n = e.layers[t];
                    n.reverse()
                }
                e.currentTimeChanged = !0,
                    e.updateFromTime(),
                    e.isReverse = !e.isReverse
            },
            u._duration = 0,
            u.duration = function() {
                let e = this;
                return e._duration
            },
            u.currentTimeChanged = !0,
            u._currentTime = 0,
            u.currentTime = function(e) {
                let t = this;
                return isNaN(e) == 0 && t._currentTime != e && (t.loop() ? e -= Math.floor(e / t.duration()) * t.duration() : e = Math.min(t.duration(), Math.max(0, e)),
                        t._currentTime != e && (t._currentTime = e,
                            t.currentTimeChanged = !0,
                            t.updateFromTime())),
                    t._currentTime
            },
            u.isPlaying = !1,
            u.pause = function() {
                let e = this;
                e.isPlaying = !1
            },
            u.play = function(e) {
                let t = this;
                t.currentTime(e),
                    t.isPlaying = !0
            },
            u._loop = !1,
            u.loop = function(e) {
                let t = this;
                return typeof e == "boolean" && e != t._loop && (t._loop = e,
                        t.needToRender(!0)),
                    t._loop
            },
            u.updateFromTime = function() {
                let e = this;
                if (e.currentTimeChanged) {
                    e.currentTimeChanged = !1,
                        e.empty();
                    for (let t = 0; t < e.layers.length; t++) {
                        let n = e.layers[t].contentWithTime(e.currentTime());
                        n != null && e.addSubView(n)
                    }
                }
            },
            u.update = function(e, t) {
                let r = this;
                n.prototype.update.call(r, e, t);
                if (r.isPlaying) {
                    let o = r.currentTime() + t;
                    r.currentTime(r.currentTime() + t),
                        o >= r.duration() && (r.loop() == 0 && r.pause(),
                            i.dispatchEvent(new s(r, s.END)))
                }
            },
            u.dealloc = function() {
                let e = this;
                for (let t = 0; t < e.layers.length; t++)
                    e.layers[t].dealloc();
                i.removeListener(e),
                    n.prototype.dealloc.call(e)
            },
            o
}();

export const scroll_bar_style = function () {
    let e = {};
        return e.AUTO = 0,
            e.HIDDEN = 1,
            e.VISIBLE = 2,
            e
}();

export const circle = function (e = vec2) {
    let t = function(t, n, r) {
        let i = this;
        t = arguments.length > 0 ? t : 0,
            n = arguments.length > 1 ? n : 0,
            i.center = new e(t, n),
            i.radius = arguments.length > 2 ? r : 0
    };
    return t.prototype.constructor = t,
        t.prototype.center = null,
        t.prototype.radius = 0,
        t.prototype.isEqualTo = function(e) {
            let t = this;
            return t.center.distance(e.center) == 0 && t.radius == e.radius
        },
        t.prototype.containsVec2 = function(e) {
            let t = this;
            return t.center.distance(e) >= t.radius
        },
        t.prototype.intersect = function(e) {
            let t = this;
            return t.center.distance(e.center) > t.radius + e.radius
        },
        t.prototype.clone = function() {
            let e = this;
            return new t(e.center.x, e.center.y, e.radius)
        },
        t.prototype.toString = function() {
            let e = this;
            return "[x:" + e.center.x + ", y:" + e.center.y + ", r:" + e.radius + "]"
        },
        t
}();

export const scroll_bar = function (e = view_container, t = shape, n = color, r = circle, i = rect) {
    let s = function(e) {
        let t = this;
        t.isVertical = e
    };
    return s.prototype = new e,
        s.prototype.constructor = s,
        s.prototype.BAR_SIZE = 4,
        s.prototype.BAR_MARGIN = 2,
        s.prototype.BAR_COLOR = n.colorWithString("#00000066"),
        s.prototype.MIN_BAR_SIZE = 4,
        s.prototype.scrollView = null,
        s.prototype.isVertical = !1,
        s.prototype._barView = null,
        s.prototype.barView = function() {
            let e = this;
            return e._barView == null && (e._barView = new t,
                    e._barView.fillColor(e.BAR_COLOR),
                    e.addSubView(e._barView)),
                e._barView
        },
        s.prototype.contentSize = 0,
        s.prototype.viewSize = 0,
        s.prototype.updateSize = function() {
            let e = this;
            if (e.scrollView != null) {
                let t = e.barView(),
                    n = 0,
                    s = 0,
                    o = 0,
                    u = 0;
                if (e.isVertical) {
                    if (e.scrollView.height() != e.viewSize || e.scrollView.contentSize().y != e.contentSize) {
                        e.viewSize = e.scrollView.height(),
                            e.contentSize = e.scrollView.contentSize().y,
                            e.width(e.BAR_SIZE + 2 * e.BAR_MARGIN),
                            e.height(e.scrollView.height()),
                            e.x(e.scrollView.width() - e.width()),
                            n = e.scrollView.contentSize().y,
                            s = e.scrollView.height(),
                            o = e.height() - e.BAR_MARGIN * 2,
                            u = Math.max(o * (s / n), e.MIN_BAR_SIZE),
                            e.barView().width(e.BAR_SIZE),
                            e.barView().height(u),
                            e.barView().y(e.BAR_MARGIN);
                        let a = e.barView().paths();
                        a.clearCommands(),
                            a.circle(new r(e.BAR_SIZE / 2, e.BAR_SIZE / 2, e.BAR_SIZE / 2)),
                            a.circle(new r(e.BAR_SIZE / 2, u - e.BAR_SIZE / 2, e.BAR_SIZE / 2)),
                            a.rect(new i(0, e.BAR_SIZE / 2, e.BAR_SIZE, u - e.BAR_SIZE))
                    }
                } else if (e.scrollView.width() != e.viewSize || e.scrollView.contentSize().x != e.contentSize) {
                    e.viewSize = e.scrollView.width(),
                        e.contentSize = e.scrollView.contentSize().x,
                        e.height(e.BAR_SIZE + 2 * e.BAR_MARGIN),
                        e.width(e.scrollView.width()),
                        e.y(e.scrollView.height() - e.height()),
                        n = e.scrollView.contentSize().x,
                        s = e.scrollView.width(),
                        o = e.width() - e.BAR_MARGIN * 2,
                        u = Math.max(o * (s / n), e.MIN_BAR_SIZE),
                        e.barView().height(e.BAR_SIZE),
                        e.barView().width(u),
                        e.barView().x(e.BAR_MARGIN);
                    let f = e.barView().paths();
                    f.clearCommands(),
                        f.circle(new r(e.BAR_SIZE / 2, e.BAR_SIZE / 2, e.BAR_SIZE / 2)),
                        f.circle(new r(u - e.BAR_SIZE / 2, e.BAR_SIZE / 2, e.BAR_SIZE / 2)),
                        f.rect(new i(e.BAR_SIZE / 2, 0, u - e.BAR_SIZE, e.BAR_SIZE))
                }
            }
        },
        s.prototype.updatePotion = function() {
            let e = this;
            if (e.isVertical) {
                let t = e.scrollView.offset().y;
                t = Math.max(0, Math.min(t, e.scrollView.contentSize().y - e.scrollView.height())),
                    e.barView().y((e.height() - 2 * e.BAR_MARGIN) * (t / e.scrollView.contentSize().y))
            } else {
                let n = e.scrollView.offset().x;
                n = Math.max(0, Math.min(n, e.scrollView.contentSize().x - e.scrollView.width())),
                    e.barView().x((e.width() - 2 * e.BAR_MARGIN) * (n / e.scrollView.contentSize().x))
            }
        },
        s.prototype.hidden = !1,
        s.prototype.show = function() {
            let e = this;
            e.hidden && (e.hidden = !1,
                e.stopAnimation(),
                e.visible(!0),
                e.alpha(1))
        },
        s.prototype.hide = function() {
            let e = this;
            e.hidden == 0 && (e.hidden = !0,
                e.animate(.4, {
                    alpha: 0
                }, Cubic.easeOut, null, function() {
                    e.visible(!1)
                }))
        },
        s
}();

export const scroll_view = function (e = system, t = view, n = vec2, r = scroll_bar_style, i = scroll_bar, s = event_center, o = touch_event) {
    let u = {};
        u.scrollBar = function(e, t) {
                return null
            },
            u.onScrollViewStartScroll = function(e) {},
            u.onScrollViewScrolling = function(e) {},
            u.onScrollViewEndScroll = function(e) {},
            u.onScrollViewStartEasing = function(e) {};
        let a = function() {
            let e = this;
            s.addListener(e, e, o.TOUCH_START, e.onViewScrollBegin)
        };
        return a.prototype = new t,
            a.prototype.constructor = a,
            a.prototype.scrolling = !1,
            a.prototype.delegate = null,
            a.prototype.dealloc = function() {
                let e = this;
                e._contentView != null && (e._contentView.dealloc(),
                        e._contentView = null),
                    e._hScrollBar != null && (e._hScrollBar.remove(),
                        e._hScrollBar.dealloc(),
                        e._hScrollBar = null),
                    e._vScrollBar != null && (e._vScrollBar.remove(),
                        e._vScrollBar.dealloc(),
                        e._vScrollBar = null),
                    t.prototype.dealloc.call(e)
            },
            a.prototype.clone = function() {
                let e = this,
                    t = new a;
                return e.copyProperties(t),
                    t
            },
            a.prototype.copyProperties = function(e) {
                let n = this;
                t.prototype.copyProperties.call(n, e),
                    e.empty(),
                    n._contentView != null && (e._contentView = n._contentView.clone(),
                        e.addSubView(n._contentView)),
                    n._hScrollBar != null && (e._hScrollBar = n._hScrollBar.clone(),
                        e._hScrollBar.scrollView = e,
                        e.addSubView(n._hScrollBar)),
                    n._vScrollBar != null && (e._vScrollBar = n._vScrollBar.clone(),
                        e._vScrollBar.scrollView = e,
                        e.addSubView(n._vScrollBar)),
                    e.offset(n.offset().clone()),
                    e.contentSize(n.contentSize().clone()),
                    e.paging(n._paging),
                    e.bouncing(n._bouncing),
                    e.lockHorizontal(n._lockHorizontal),
                    e.lockVertical(n._lockVertical),
                    e.scrollBarStyle(n._scrollBarStyle),
                    e.easing(n._easing),
                    e.reloadData()
            },
            a.prototype.updatePropsFromXML = function(e) {
                let i = this;
                t.prototype.updatePropsFromXML.call(i, e),
                    i.clip(!0);
                let s = e.find("> content");
                s.length > 0 && i.contentView().updatePropsFromXML(s);
                if (e.is("[offset]")) {
                    let o = e.attr("offset").split(","),
                        u = new n(parseFloat(o[0]), parseFloat(o[1]));
                    i.offset(u)
                }
                if (e.is("[content-size]")) {
                    let a = e.attr("content-size").split(","),
                        f = new n(parseFloat(a[0]), parseFloat(a[1]));
                    i.contentSize(f)
                }
                e.is("[bouncing]") && i.bouncing(e.attr("bouncing") == "true"),
                    e.is("[paging]") && i.paging(e.attr("paging") == "true"),
                    e.is("[lock-h]") && i.lockHorizontal(e.attr("lock-h") == "true"),
                    e.is("[lock-v]") && i.lockVertical(e.attr("lock-v") == "true"),
                    e.is("[scroll-bar-style]") && i.scrollBarStyle(r[e.attr("scroll-bar-style").toUpperCase()]),
                    i.reloadData()
            },
            a.prototype.lastOffset = null,
            a.prototype.currentSpeed = new n,
            a.prototype.easingInitSpeed = null,
            a.prototype.easingDuration = null,
            a.prototype.easingAcc = null,
            a.prototype.desOffset = null,
            a.prototype.beginEasing = !1,
            a.prototype.easingStartTs = 0,
            a.prototype.easingStartOffset = null,
            a.prototype.update = function(e, r) {
                let i = this;
                t.prototype.update.call(i, e, r);
                if (i.lastOffset != null) {
                    let s = i.offset().clone();
                    if (i.paging() == 0 || i.lastOffset.equalsTo(s) == 0)
                        i.currentSpeed = new n,
                        i.currentSpeed.x = (s.x - i.lastOffset.x) / r,
                        i.currentSpeed.y = (s.y - i.lastOffset.y) / r
                }
                i.lastOffset = i.offset().clone(),
                    i.beginEasing && (i.easingStartTs = e,
                        i.easingStartOffset = i.offset().clone(),
                        i.beginEasing = !1);
                if (i.easingInitSpeed != null) {
                    let o = e - i.easingStartTs,
                        u = i.offset().clone();
                    o < i.easingDuration.x ? u.x = i.easingStartOffset.x + i.easingInitSpeed.x * o + i.easingAcc.x * o * o / 2 : u.x = i.desOffset.x,
                        o < i.easingDuration.y ? u.y = i.easingStartOffset.y + i.easingInitSpeed.y * o + i.easingAcc.y * o * o / 2 : u.y = i.desOffset.y,
                        i.offset(u),
                        o >= i.easingDuration.x && o >= i.easingDuration.y ? i.onViewEndScroll() : i.delegate != null && i.delegate.onScrollViewScrolling(i)
                }
                i.needReload && (i.needReload = !1,
                    i.renderView())
            },
            a.prototype.width = function(e) {
                let n = this;
                return isNaN(e) == 0 && e != n.width() && (t.prototype.width.call(n, e),
                        n.reloadData()),
                    t.prototype.width.call(n)
            },
            a.prototype.height = function(e) {
                let n = this;
                return isNaN(e) == 0 && e != n.height() && (t.prototype.height.call(n, e),
                        n.reloadData()),
                    t.prototype.height.call(n)
            },
            a.prototype._contentView = null,
            a.prototype.contentView = function() {
                let e = this;
                return e._contentView == null && (e._contentView = new t,
                        e._contentView.clip(!0),
                        e.insertSubViewAt(e._contentView, 0)),
                    e._contentView
            },
            a.prototype._offset = new n,
            a.prototype.offset = function(e) {
                let t = this;
                return Boolean(e) && e.equalsTo(t._offset) == 0 && (t._offset = e.clone(),
                        t.reloadData()),
                    t._offset
            },
            a.prototype._contentSize = new n,
            a.prototype.contentSize = function(e) {
                let t = this;
                return Boolean(e) && e.equalsTo(t._contentSize) == 0 && (t._contentSize = e.clone(),
                        t.reloadData()),
                    t._contentSize
            },
            a.prototype._bouncing = !0,
            a.prototype.bouncing = function(e) {
                let t = this;
                return typeof e == "boolean" && t._bouncing != e && (t._bouncing = e),
                    t._bouncing
            },
            a.prototype._easing = !0,
            a.prototype.easing = function(e) {
                let t = this;
                return typeof e == "boolean" && e == t._easing && (t._easing = e),
                    t._easing
            },
            a.prototype._paging = !1,
            a.prototype.paging = function(e) {
                let t = this;
                return typeof e == "boolean" && t._paging != e && (t._paging = e),
                    t._paging
            },
            a.prototype._hScrollBar = null,
            a.prototype.hScrollBar = function() {
                let e = this;
                return e._hScrollBar == null && (e.delegate != null && e.delegate.scrollBar != null && (e._hScrollBar = e.delegate.scrollBar(e, !1)),
                        e._hScrollBar == null && (e._hScrollBar = new i(!1)),
                        e._hScrollBar.scrollView = e,
                        e.addSubView(e._hScrollBar)),
                    e._hScrollBar
            },
            a.prototype._vScrollBar = null,
            a.prototype.vScrollBar = function() {
                let e = this;
                return e._vScrollBar == null && (e.delegate != null && e.delegate.scrollBar != null && (e._vScrollBar = e.delegate.scrollBar(e, !0)),
                        e._vScrollBar == null && (e._vScrollBar = new i(!0)),
                        e._vScrollBar.scrollView = e,
                        e.addSubView(e._vScrollBar)),
                    e._vScrollBar
            },
            a.prototype._lockHorizontal = !1,
            a.prototype.lockHorizontal = function(e) {
                let t = this;
                return typeof e == "boolean" && t._lockHorizontal != e && (t._lockHorizontal = e),
                    t._lockHorizontal
            },
            a.prototype._lockVertical = !1,
            a.prototype.lockVertical = function(e) {
                let t = this;
                return typeof e == "boolean" && t._lockVertical != e && (t._lockVertical = e),
                    t._lockVertical
            },
            a.prototype._scrollBarStyle = r.AUTO,
            a.prototype.scrollBarStyle = function(e) {
                let t = this;
                return isNaN(e) == 0 && e != t._scrollBarStyle && (t._scrollBarStyle = e,
                        t._scrollBarStyle == r.AUTO ? (t._hScrollBar != null && (t._hScrollBar.stopAnimation(),
                                t.scrolling && t.lockHorizontal() == 0 && t.contentSize().x > t.width() ? t._hScrollBar.show() : t._hScrollBar.hide()),
                            t._vScrollBar != null && t.lockVertical() == 0 && t.contentSize().y > t.height() && (t._vScrollBar.stopAnimation(),
                                t.scrolling ? t._vScrollBar.show() : t._vScrollBar.hide())) : t._scrollBarStyle == r.HIDDEN ? (t._hScrollBar != null && (t._hScrollBar.remove(),
                                t._hScrollBar.dealloc(),
                                t._hScrollBar = null),
                            t._vScrollBar != null && (t._vScrollBar.remove(),
                                t._vScrollBar.dealloc(),
                                t._vScrollBar = null)) : t._scrollBarStyle == r.VISIBLE && (t.lockHorizontal() == 0 && t.hScrollBar().show(),
                            t.lockVertical() == 0 && t.vScrollBar().show())),
                    t._scrollBarStyle
            },
            a.prototype.needReload = !1,
            a.prototype.reloadData = function() {
                let e = this;
                e.needReload = !0
            },
            a.prototype.renderView = function() {
                let e = this;
                if (e.bouncing() == 0) {
                    let t = e.offset();
                    t.x = Math.max(0, Math.min(e.contentSize().x - e.width(), t.x)),
                        t.y = Math.max(0, Math.min(e.contentSize().y - e.height(), t.y))
                }
                e._contentView != null && (e._contentView.width(e.contentSize().x),
                        e._contentView.height(e.contentSize().y),
                        e._contentView.x(-1 * e.offset().x),
                        e._contentView.y(-1 * e.offset().y)),
                    e._hScrollBar != null && (e._hScrollBar.updateSize(),
                        e._hScrollBar.updatePotion()),
                    e._vScrollBar != null && (e._vScrollBar.updateSize(),
                        e._vScrollBar.updatePotion())
            },
            a.prototype.lastTouch = null,
            a.prototype.onViewScrollBegin = function(e) {
                let t = this;
                if (t.contentSize().x > t.width() || t.contentSize().y > t.height())
                    t.easingInitSpeed = null,
                    t.easingDuration = 0,
                    t.easingAcc = null,
                    t.desOffset = null,
                    t.lastTouch = new n(e.touches[0].x, e.touches[0].y),
                    s.addListener(t, t, [o.TOUCH_MOVE, o.TOUCH_END], [t.onViewScrolling, t.onViewScrollEnd]),
                    t.scrolling = !0,
                    t.delegate != null && t.delegate.onScrollViewStartScroll(t)
            },
            a.prototype.onViewScrolling = function(e) {
                let t = this,
                    i = new n(e.touches[0].x, e.touches[0].y),
                    s = t.offset().clone(),
                    o = new n;
                t.lockHorizontal() ? o.x = s.x : s.x >= 0 && s.x <= t.contentSize().x - t.width() ? o.x = s.x - (i.x - t.lastTouch.x) : o.x = s.x - (i.x - t.lastTouch.x) / 4,
                    t.lockVertical() ? o.y = s.y : s.y >= 0 && s.y <= t.contentSize().y - t.height() ? o.y = s.y - (i.y - t.lastTouch.y) : o.y = s.y - (i.y - t.lastTouch.y) / 4,
                    t.offset(o),
                    t.lastTouch = i,
                    t.delegate != null && t.delegate.onScrollViewScrolling(t),
                    t.scrollBarStyle() == r.AUTO && (t.lockHorizontal() == 0 && t.contentSize().x > t.width() && t.hScrollBar().show(),
                        t.lockVertical() == 0 && t.contentSize().y > t.height() && t.vScrollBar().show())
            },
            a.prototype.BOUNCING_DURATION = .2,
            a.prototype.EASING_DURATION = .4,
            a.prototype.onViewScrollEnd = function() {
                let e = this,
                    t = e.offset().clone(),
                    r = t.clone(),
                    i = 0,
                    u = 0,
                    a = 0,
                    f = 0,
                    l = e.currentSpeed.clone();
                t.x < 0 ? (r.x = 0,
                        i = e.BOUNCING_DURATION,
                        l.x = (r.x - t.x) * 2 / i,
                        a = l.x / i * -1) : t.x > e.contentSize().x - e.width() ? (r.x = e.contentSize().x - e.width(),
                        i = e.BOUNCING_DURATION,
                        l.x = (r.x - t.x) * 2 / i,
                        a = l.x / i * -1) : e.paging() ? (r.x = t.x + (l.x >= 0 ? 1 : -1) * e.width(),
                        r.x = Math.max(0, Math.min(r.x, e.contentSize().x - e.width())),
                        i = e.EASING_DURATION,
                        l.x = (r.x - t.x) * 2 / i,
                        a = l.x / i * -1) : e.easing() && l.x != 0 && (i = e.EASING_DURATION,
                        r.x = t.x + l.x * i / 2,
                        r.x = Math.max(0, Math.min(r.x, e.contentSize().x - e.width())),
                        l.x = (r.x - t.x) * 2 / i,
                        a = l.x / i * -1),
                    t.y < 0 ? (r.y = 0,
                        u = e.BOUNCING_DURATION,
                        l.y = (r.y - t.y) * 2 / u,
                        f = l.y / u * -1) : t.y > e.contentSize().y - e.height() ? (r.y = e.contentSize().y - e.height(),
                        u = e.BOUNCING_DURATION,
                        l.y = (r.y - t.y) * 2 / u,
                        f = l.y / u * -1) : e.paging() ? (r.y = t.y + (l.y >= 0 ? 1 : -1) * e.height(),
                        r.y = Math.max(0, Math.min(r.y, e.contentSize().y - e.height())),
                        u = e.EASING_DURATION,
                        l.y = (r.y - t.y) * 2 / u,
                        f = l.y / u * -1) : e.easing() && l.y != 0 && (u = e.EASING_DURATION,
                        r.y = t.y + l.y * u / 2,
                        r.y = Math.max(0, Math.min(r.y, e.contentSize().y - e.height())),
                        l.y = (r.y - t.y) * 2 / u,
                        f = l.y / u * -1),
                    r.equalsTo(t) ? e.onViewEndScroll() : (e.desOffset = r,
                        e.easingInitSpeed = l,
                        e.easingDuration = new n(i, u),
                        e.easingAcc = new n(a, f),
                        e.beginEasing = !0,
                        e.delegate != null && e.delegate.onScrollViewStartEasing(e)),
                    e.lastTouch = null,
                    s.removeListener(e, e, [o.TOUCH_MOVE, o.TOUCH_END], [e.onViewScrolling, e.onViewScrollEnd])
            },
            a.prototype.onViewEndScroll = function() {
                let e = this;
                e.scrolling = !1,
                    e.easingInitSpeed = null,
                    e.easingDuration = 0,
                    e.easingAcc = null,
                    e.desOffset = null,
                    e._hScrollBar != null && e._hScrollBar.hide(),
                    e._vScrollBar != null && e._vScrollBar.hide(),
                    e.delegate != null && e.delegate.onScrollViewEndScroll(e),
                    e.scrollBarStyle() == r.AUTO && (e.lockHorizontal() == 0 && e.contentSize().x > e.width() && e.hScrollBar().hide(),
                        e.lockVertical() == 0 && e.contentSize().y > e.height() && e.vScrollBar().hide())
            },
            a
}();

export const table_view = function (e = scroll_view, t = rect, n = vec2) {
    let r = {};
        r.isVertical = function(e) {
                return !1
            },
            r.cellCount = function(e) {
                return 0
            },
            r.cellSizeByIndex = function(e, t) {
                return 0
            },
            r.cellByIndex = function(e, t) {
                return null
            };
        let i = function() {
            let t = this;
            e.prototype.constructor.call(t)
        };
        return i.prototype = new e,
            i.constructor = i,
            i.prototype._dataSource = null,
            i.prototype.dataSource = function(e) {
                let t = this;
                return Boolean(e) && e != t._dataSource && (t._dataSource = e,
                        e.isVertical(t) ? (t.lockHorizontal(!0),
                            t.lockVertical(!1)) : (t.lockVertical(!0),
                            t.lockHorizontal(!1))),
                    t._dataSource
            },
            i.prototype.renderView = function() {
                let e = this;
                if (e._dataSource != null) {
                    if (e.bouncing() == 0) {
                        let t = e.offset();
                        t.x = Math.max(0, Math.min(e.contentSize().x - e.width(), t.x)),
                            t.y = Math.max(0, Math.min(e.contentSize().y - e.height(), t.y))
                    }
                    let n = e.contentView();
                    n.width(e.width()),
                        n.height(e.height());
                    let r;
                    e._dataSource.isVertical(e) ? r = e.renderVertical() : r = e.renderHorizontal();
                    let i = e.contentView().subViews().slice();
                    for (let s = 0; s < i.length; s++) {
                        let o = !0;
                        for (let u = 0; u < r.length; u++)
                            if (i[s] == r[u]) {
                                o = !1;
                                break
                            }
                        o && i[s].remove()
                    }
                    for (let a = 0; a < r.length; a++) {
                        let f = !0;
                        for (let l = 0; l < i.length; l++)
                            if (r[a] == i[l]) {
                                f = !1;
                                break
                            }
                        f && e.contentView().addSubView(r[a])
                    }
                    e._hScrollBar != null && (e._hScrollBar.updateSize(),
                            e._hScrollBar.updatePotion()),
                        e._vScrollBar != null && (e._vScrollBar.updateSize(),
                            e._vScrollBar.updatePotion())
                }
            },
            i.prototype.renderVertical = function() {
                let e = this,
                    t = new n(e.offset().y, e.offset().y + e.height()),
                    r = [],
                    i = 0;
                for (let s = 0; s < e.dataSource().cellCount(e); s++) {
                    let o = e.dataSource().cellSizeByIndex(e, s),
                        u = new n(i, i + o),
                        a = u.y < t.x || u.x > t.y;
                    if (a == 0) {
                        let f = e.dataSource().cellByIndex(e, s);
                        f.x(0),
                            f.y(i - e.offset().y),
                            r.push(f)
                    }
                    i += o
                }
                return e._contentSize = new n(0, i),
                    r
            },
            i.prototype.renderHorizontal = function() {
                let e = this,
                    t = new n(e.offset().x, e.offset().x + e.width()),
                    r = [],
                    i = 0;
                for (let s = 0; s < e.dataSource().cellCount(e); s++) {
                    let o = e.dataSource().cellSizeByIndex(e, s),
                        u = new n(i, i + o),
                        a = u.y < t.x || u.x > t.y;
                    if (a == 0) {
                        let f = e.dataSource().cellByIndex(e, s);
                        f.x(i - e.offset().x),
                            f.y(0),
                            r.push(f)
                    }
                    i += o
                }
                return e._contentSize = new n(i, 0),
                    r
            },
            i
}();

export const spin_view = function (e = view_container, t = mat3) {
    let n = function() {};
        n.prototype = new e;
        let r = n.prototype;
        return r.constructor = n,
            r.clone = function() {
                let e = this,
                    t = new n;
                return e.copyProperties(t),
                    t
            },
            r.copyProperties = function(t) {
                let n = this;
                e.prototype.copyProperties.call(n, t),
                    t.originalMat = n.originalMat.clone(),
                    t.clockwise = n.clockwise,
                    t.aps(n.aps()),
                    t.angle(n.angle()),
                    n.playing ? t.play() : t.pause()
            },
            r.dealloc = function() {
                let t = this;
                e.prototype.dealloc.call(t),
                    t.originalMat = null
            },
            r.originalMat = null,
            r.updatePropsFromXML = function(t) {
                let n = this;
                e.prototype.updatePropsFromXML.call(n, t),
                    n.originalMat = n.matrix().clone(),
                    t.is("[clockwise]") ? n.clockwise = t.attr("clockwise") == "true" : n.clockwise = !0;
                if (t.is("[aps]")) {
                    let r = parseFloat(t.attr("aps"));
                    n.aps(r)
                }
                t.is("[auto-play]") ? n.playing = t.attr("auto-play") == "true" : n.playing = !0
            },
            r.playing = !1,
            r.clockwise = !0,
            r.play = function() {
                let e = this;
                e.playing = !0
            },
            r.pause = function() {
                let e = this;
                e.playing = !1
            },
            r.angleChanged = !1,
            r._angle = 0,
            r.angle = function(e) {
                let t = this;
                return typeof e == "number" && (e = e >= 0 ? e % 360 : 360 - Math.abs(e) % 360,
                        t._angle != e && (t._angle = e,
                            t.angleChanged = !0)),
                    t._angle
            },
            r._aps = 0,
            r.aps = function(e) {
                let t = this;
                return isNaN(e) == 0 && e != t._aps && (t._aps = e,
                        t.needToRender(!0)),
                    t._aps
            },
            r.update = function(n, r) {
                let i = this;
                e.prototype.update.call(i, n, r);
                if (i.playing) {
                    let s = r * i.aps();
                    i.angle(i.angle() + (i.clockwise ? 1 : -1) * s)
                }
                if (i.angleChanged) {
                    i.angleChanged = !1;
                    let o = i.angle() * (Math.PI / 180),
                        u = new t;
                    u.a = Math.cos(o),
                        u.b = Math.sin(o),
                        u.c = -1 * u.b,
                        u.d = u.a,
                        u.tx = i.width() / 2 - u.a * i.width() / 2 - u.c * i.height() / 2,
                        u.ty = i.height() / 2 - u.b * i.width() / 2 - u.d * i.height() / 2,
                        u = u.concatWith(i.originalMat),
                        i.matrix(u)
                }
            },
            n
}();

export const axe = function (e = render_engine, t = event_center, n = event, r = stage, i = view_container, s = view, o = bitmap, u = shape, a = movie, f = text, l = button, c = motion, h = scroll_view, p = table_view, d = spin_view, v = view_factory) {
    let m = function(m, g, y) {
        let b = this;
        v.addClass("stage", r),
            v.addClass("container", i),
            v.addClass("view", s),
            v.addClass("bitmap", o),
            v.addClass("shape", u),
            v.addClass("movie", a),
            v.addClass("text", f),
            v.addClass("button", l),
            v.addClass("motion", c),
            v.addClass("scroll", h),
            v.addClass("table", p),
            v.addClass("spin", d),
            b.stageCtrl = new m,
            typeof g == "string" ? (b.stageCtrl.initWithURL(g),
                t.addListener(b.stageCtrl, b, n.PREPARED, function() {
                    b._renderEngine = new e(b.stageCtrl.view())
                })) : (b.stageCtrl.init(),
                b._renderEngine = new e(b.stageCtrl.view()))
    },
    g = m.prototype;
return m.prototype.stageCtrl = null,
    m.prototype._renderEngine = null,
    m.prototype.renderEngine = function() {
        let e = this;
        return e._renderEngine
    },
    m.prototype.initRenderEngine = function() {},
    m
}();

export const view_ctrl = function (e = jQuery, t = view_container, n = assets_loader, r = event_center, i = event, s = progress_event, o = error_event) {
    let u = function(e) {
        let t = this;
        typeof e == "object" && t.initWithView(e)
    };
    return u.prototype.constructor = u,
        u.prototype.inited = !1,
        u.prototype.prepared = !1,
        u.prototype._view = null,
        u.prototype.view = function(e) {
            let t = this;
            return arguments.length > 0 && e != t._view && (t._view != null && (t._view.controller = null),
                    t._view = e,
                    t._view.controller = t),
                t._view == null && (t._view = t.generateView(),
                    t._view.controller = t,
                    t.$viewXML != null && t.prepared && t._view.updatePropsFromXML(t.$viewXML)),
                t._view
        },
        u.prototype.generateView = function() {
            return new t
        },
        u.prototype._loadPercent = 0,
        u.prototype.loadPercent = function() {
            let e = this;
            return e._loadPercent
        },
        u.prototype.inited = !1,
        u.prototype.init = function() {
            let e = this;
            if (e.inited !== !1)
                throw new Error("View controller has init already.");
            e.inited = !0,
                e.prepared = !0,
                e._loadPercent = 1,
                e.onViewControllerPrepared()
        },
        u.prototype.initWithView = function(e) {
            let t = this;
            if (t.inited !== !1)
                throw new Error("View controller has init already.");
            t.view(e),
                t.init()
        },
        u.prototype.$viewXML = null,
        u.prototype.afterPrepared = function() {
            let e = this;
            e.inited = !0,
                e.prepared = !0,
                e._loadPercent = 1;
            if (e._view != null) {
                e._view.updatePropsFromXML(e.$viewXML),
                    e.onViewControllerPrepared();
                if (e._view.onStage) {
                    let t = e._view.stage();
                    e._view.resize(t.stageWidth(), t.stageHeight()),
                        e._view.onWindowOrientationChanged(t.orientation)
                }
            } else
                e.onViewControllerPrepared();
            r.dispatchEvent(new i(e, i.PREPARED))
        },
        u.prototype.initWithXML = function(t) {
            let n = this;
            if (n.inited !== !1)
                throw new Error("View controller has init already.");
            n._loadPercent = 0,
                n.inited = !0,
                n.prepared = !1,
                n.$viewXML = t;
            let r = n.$viewXML.find("asset");
            if (r.length <= 0)
                n.afterPrepared();
            else {
                let i = [];
                r.each(function(t, n) {
                        i.push(e(n).text())
                    }),
                    n.loadAssets(i)
            }
        },
        u.prototype.initWithURL = function(t) {
            let s = this;
            if (s.inited !== !1)
                throw new Error("View controller has init already.");
            let u = n.asset(t);
            if (u != null)
                s.initWithXML(u);
            else {
                s._loadPercent = 0,
                    s.inited = !0,
                    s.prepared = !1;
                let a = new n;
                r.addListener(a, s, [i.LOAD, o.ERROR], [function() {
                        s.$viewXML = n.asset(t);
                        let i = s.$viewXML.find("asset");
                        if (i.length <= 0)
                            s.afterPrepared();
                        else {
                            let o = [];
                            i.each(function(t, n) {
                                    o.push(e(n).text())
                                }),
                                s.loadAssets(o)
                        }
                        r.removeListener(a, s)
                    }, function(e) {
                        throw r.removeListener(a, s),
                            e.error
                    }]),
                    a.loadAssets(t)
            }
        },
        u.prototype.assets = null,
        u.prototype.loadAssets = function(e) {
            let t = this;
            t.assets = e;
            let u = new n;
            r.addListener(u, t, [i.LOAD, s.PROGRESS, o.ERROR], [function() {
                    t.afterPrepared(),
                        r.removeListener(u, t)
                }, function(e) {
                    t._loadPercent = e.percent,
                        t.onViewControllerProgress(t._loadPercent),
                        r.dispatchEvent(e.clone(t))
                }, function(e) {
                    throw r.removeListener(u, t),
                        e.error
                }]),
                u.loadAssets(e)
        },
        u.prototype.dealloc = function() {
            let e = this;
            e._view != null && (e._view.dealloc(),
                    e._view = null),
                e.inited = !1,
                e.assets != null && (n.releaseAssets(e.assets),
                    e.assets = null),
                r.removeListener(e)
        },
        u.prototype.onViewUpdateFromXML = function(e) {},
        u.prototype.onViewControllerPrepared = function() {},
        u.prototype.onViewControllerProgress = function(e) {},
        u.prototype.onViewAddToStage = function() {},
        u.prototype.onViewAdded = function(e) {},
        u.prototype.onViewRemoved = function(e) {},
        u.prototype.onViewRemoveFromStage = function() {},
        u.prototype.onViewStartAnimate = function() {},
        u.prototype.onViewEndAnimate = function() {},
        u.prototype.onViewUpdated = function(e, t) {},
        u.prototype.onViewDeactivate = function() {},
        u.prototype.onViewActivate = function() {},
        u.prototype.onViewResize = function(e, t) {},
        u.prototype.onWindowOrientationChanged = function(e) {},
        u
}();

export const stage_ctrl = function (e = view_ctrl, t = stage) {
    let n = function() {};
        return n.prototype = new e,
            n.prototype.constructor = n,
            n.prototype.generateView = function() {
                return new t
            },
            n
}();

export const section_cell = function (e = view_ctrl, t = event_center, n = event) {
    let r = function(e) {
        if (arguments.length > 0) {
            let t = this;
            t.initWithView(e)
        }
    };
    return r.prototype = new e,
        r.prototype.constructor = r,
        r.prototype.motionBox = null,
        r.prototype.kvMotion = null,
        r.prototype.motionLoading = !1,
        r.prototype.onViewControllerPrepared = function() {
            let e = this;
            e.motionBox = e.view().subViewByName("motion_box")
        },
        r.prototype.onViewAddToStage = function() {
            let e = this;
            e.prepared && e.motionBox != null && e.kvMotion == null && e.loadKVMotion()
        },
        r.prototype.loadKVMotion = function() {
            let e = this;
            if (e.motionLoading == 0) {
                e.motionLoading = !0;
                let r = e.createKVMotion();
                r != null && (t.addListener(r, e, n.PREPARED, e.onKVMotionPrepared),
                    r.initialize())
            }
        },
        r.prototype.onKVMotionPrepared = function(e) {
            let t = this;
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
}();

export const kv_motion = function (e = view_ctrl) {
    let t = function() {};
        return t.prototype = new e,
            t.prototype.constructor = t,
            t.prototype.initialize = function() {},
            t
}();

export const button_group = function (e = event_center, t = touch_event, n = button_state, r = event) {
    let i = function() {};
        return i.prototype.constructor = i,
            i.prototype.eachButton = function(e) {
                let t = this;
                for (let n = 0; n < t.buttons().length; n++) {
                    let r = t.buttons()[n];
                    if (e(n, r) === !1)
                        break
                }
            },
            i.prototype._buttons = null,
            i.prototype.buttons = function() {
                let e = this;
                return e._buttons == null && (e._buttons = []),
                    e._buttons
            },
            i.prototype.addButtons = function(r) {
                let i = this;
                for (let s = 0; s < r.length; s++) {
                    let o = r[s];
                    o.switchMode(!0),
                        o.buttonState(n.NORMAL_STATE),
                        e.addListener(o, i, t.TOUCH_END, i.onButtonTouchEnd),
                        i.buttons().push(o)
                }
            },
            i.prototype.onButtonTouchEnd = function(t) {
                let n = this,
                    i = t.target;
                n.selectButton(i),
                    e.dispatchEvent(new r(n, r.CHANGE))
            },
            i.prototype.enable = function() {
                let e = this;
                e.eachButton(function(t, n) {
                    n != e._selectedButton && n.enabled(!0)
                })
            },
            i.prototype.disable = function() {
                let e = this;
                e.eachButton(function(e, t) {
                    t.enabled(!1)
                })
            },
            i.prototype.selectedIndex = function() {
                let e = this;
                return e.indexOfButton(e._selectedButton)
            },
            i.prototype._selectedButton = null,
            i.prototype.selectedButton = function() {
                let e = this;
                return e._selectedButton
            },
            i.prototype.buttonByIndex = function(e) {
                let t = this,
                    n = null;
                return e >= 0 && e < t.buttons().length && (n = t.buttons()[e]),
                    n
            },
            i.prototype.indexOfButton = function(e) {
                let t = this,
                    n = -1;
                for (let r = 0; r < t.buttons().length; r++)
                    if (e == t.buttons()[r]) {
                        n = r;
                        break
                    }
                return n
            },
            i.prototype.cancelable = !1,
            i.prototype.selectButton = function(e) {
                let t = this;
                if (t.cancelable) {
                    t._selectedButton != null && t._selectedButton.buttonState(n.NORMAL_STATE);
                    let r = t._selectedButton;
                    t._selectedButton = null,
                        r != e && (e.buttonState(n.CLICK_STATE),
                            t._selectedButton = e)
                } else
                    t._selectedButton != null && t._selectedButton != e && (t._selectedButton.enabled(!0),
                        t._selectedButton.buttonState(n.NORMAL_STATE)),
                    e.buttonState(n.CLICK_STATE),
                    e.enabled(!1),
                    t._selectedButton = e
            },
            i.prototype.selectButtonByIndex = function(e) {
                let t = this,
                    n = t.buttonByIndex(e);
                n != null && t.selectButton(n)
            },
            i.prototype.cancelSelect = function() {
                let e = this;
                e._selectedButton != null && (e._selectedButton.enabled(!0),
                    e._selectedButton.buttonState(n.NORMAL_STATE),
                    e._selectedButton = null)
            },
            i
}();

export const audio_ctrl = function (e = event_center, t = event, n = assets_loader) {
    let r = function(e, t) {
        let n = this;
        if (arguments.length > 0)
            if (typeof e == "string") {
                let r = document.createElement("audio");
                r.src = e,
                    n.audio(r)
            } else
                typeof e == "object" && n.audio(e);
        arguments.length > 1 && n.loop(t)
    };
    return r.audioByURL = function(e) {
            let t = n.asset(e);
            return new r(t)
        },
        r.prototype.constructor = r,
        r.prototype._audio = null,
        r.prototype.audio = function(e) {
            let t = this;
            if (typeof e == "object" && t._audio != e) {
                t._audio != null && (t.pause(),
                        t._audio = null,
                        t._audio.removeEventListener("playing", t),
                        t._audio.removeEventListener("pause", t),
                        t._audio.removeEventListener("ended", t)),
                    t._audio = e;
                try {
                    t._audio.loop = t.loop()
                } catch (n) {}
                try {
                    t._audio.volume = t._volume
                } catch (n) {}
                t._audio.addEventListener("playing", t),
                    t._audio.addEventListener("pause", t),
                    t._audio.addEventListener("ended", t)
            }
            return t._audio
        },
        r.prototype.handleEvent = function(n) {
            let r = this,
                i = n.type;
            i == "playing" ? (r._playing = !0,
                e.dispatchEvent(new t(r, t.CHANGE))) : i == "pause" ? (r._playing = !1,
                e.dispatchEvent(new t(r, t.CHANGE))) : i == "ended" && (r.loop() ? r.play(0) : e.dispatchEvent(new t(r, t.END)))
        },
        r.prototype._volume = 1,
        r.prototype.volume = function(e) {
            let t = this;
            if (isNaN(e) === !1 && t._volume != e) {
                t._volume = e;
                if (t.audio() != null)
                    try {
                        t.audio().volume = t._volume
                    } catch (n) {}
            }
            return t._volume
        },
        r.prototype._playing = !1,
        r.prototype.playing = function() {
            let e = this;
            return e._playing
        },
        r.prototype._loop = !1,
        r.prototype.loop = function(e) {
            let t = this;
            if (typeof e == "boolean" && e != t._loop) {
                t._loop = e;
                if (t.audio() != null)
                    try {
                        t.audio().loop = t._loop
                    } catch (n) {}
            }
            return t._loop
        },
        r.prototype.play = function(e) {
            let t = this;
            if (t.audio() != null) {
                if (isNaN(e) === !1)
                    try {
                        t.audio().currentTime = e
                    } catch (n) {}
                try {
                    t.audio().play()
                } catch (n) {}
            }
        },
        r.prototype.pause = function() {
            let e = this;
            if (e.audio() != null)
                try {
                    e.audio().pause()
                } catch (t) {}
        },
        r.prototype.dealloc = function() {
            let e = this;
            e._audio != null && (e.pause(),
                e._audio = null,
                e._audio.removeEventListener("playing", e),
                e._audio.removeEventListener("pause", e),
                e._audio.removeEventListener("ended", e),
                e._audio = null,
                e._playing = !1,
                e._loop = !1,
                e._volume = 1)
        },
        r
}();

export const head_kv = function (e = kv_motion, t = button_group, n = event_center, r = event, i = system, s = vec2, o = movie, u = audio_ctrl) {
    let a = function(e, t, n, r, i, s, o) {
        let u = this;
        u.name = e,
            u.motionIndex = t,
            u.beginFrame = n,
            u.endFrame = r,
            u.x = i,
            u.y = s,
            u.reversion = typeof o == "boolean" ? o : !1,
            u.toNodes = []
    };
    a.prototype.constructor = a,
        a.prototype.name = null,
        a.prototype._soundEffect = null,
        a.prototype.soundEffect = function(e) {
            let t = this;
            return typeof e == "string" && (t._soundEffect = new u(e, !1)),
                t._soundEffect
        },
        a.prototype.motionIndex = 0,
        a.prototype.beginFrame = 0,
        a.prototype.endFrame = 0,
        a.prototype.reversion = !1,
        a.prototype.x = 0,
        a.prototype.y = 0,
        a.prototype.distance = function(e) {
            let t = this,
                n = new s(t.x, t.y),
                r = new s(e.x, e.y);
            return n.distance(r)
        },
        a.prototype.toNodes = null,
        a.prototype.addToNodes = function(e) {
            let t = this;
            for (let n = 0; n < arguments.length; n++)
                t.toNodes.push(arguments[n])
        },
        a.prototype.getMotionFrames = function(e) {
            let t = this,
                n = e[t.motionIndex],
                r = n.frames().slice(t.beginFrame, t.endFrame + 1);
            return t.reversion && (r = r.reverse()),
                r
        },
        a.prototype.reverse = function() {
            let e = this,
                t = new a(e.name, e.motionIndex, e.beginFrame, e.endFrame, e.x, e.y, !e.reversion);
            return t.toNodes = e.toNodes.slice(),
                t
        };
    let f = new a("DEF_LOOP", 0, 0, 14, 0, 0),
        l = new a("DEF_TRANSITION", 0, 15, 28, 0, 1),
        c = l.reverse(),
        h = new a("MC1_TRANSITION", 1, 0, 6, 0, 2),
        p = h.reverse(),
        d = new a("MC1_LOOP", 1, 7, 20, 0, 3);
    h.soundEffect("sounds/head_1.mp3");
    let v = new a("MC2_TRANSITION", 2, 0, 6, 1, 2),
        m = v.reverse(),
        g = new a("MC2_LOOP", 2, 7, 20, 1, 3);
    v.soundEffect("sounds/head_2.mp3");
    let y = new a("MC3_TRANSITION", 3, 0, 6, 2, 2),
        b = y.reverse(),
        w = new a("MC3_LOOP", 3, 7, 20, 2, 3);
    y.soundEffect("sounds/head_3.mp3");
    let E = new a("MC4_TRANSITION", 4, 0, 6, 3, 2),
        S = E.reverse(),
        x = new a("MC4_LOOP", 4, 7, 20, 3, 3);
    E.soundEffect("sounds/head_4.mp3"),
        f.addToNodes(l),
        l.addToNodes(h, v, y, E),
        c.addToNodes(l, f),
        h.addToNodes(d),
        p.addToNodes(c),
        d.addToNodes(p),
        v.addToNodes(g),
        m.addToNodes(c),
        g.addToNodes(m),
        y.addToNodes(w),
        b.addToNodes(c),
        w.addToNodes(b),
        E.addToNodes(x),
        S.addToNodes(c),
        x.addToNodes(S);
    let T = [];
    T.push(f, l, c, d, h, p, g, v, m, w, y, b, x, E, S);
    let N = function() {};
    return N.prototype = new e,
        N.prototype.constructor = N,
        N.prototype.sounds = null,
        N.prototype.currentSound = null,
        N.prototype.initialize = function() {
            let e = this;
            e.initWithURL("views/head.xml"),
                e.sounds = [],
                e.sounds.push(new u("sounds/head_1.mp3", !1), new u("sounds/head_2.mp3", !1), new u("sounds/head_3.mp3", !1), new u("sounds/head_4.mp3", !1))
        },
        N.prototype.motionBox = null,
        N.prototype.motions = null,
        N.prototype.kvButtons = null,
        N.prototype.kvMovie = null,
        N.prototype.onViewControllerPrepared = function() {
            let e = this;
            e.motionBox = e.view().subViewByName("motion_box"),
                e.motions = e.motionBox.subViews().slice(),
                e.motionBox.empty(),
                e.kvMovie = new o,
                e.kvMovie.name("head_kv"),
                e.kvMovie.width(e.motionBox.width()),
                e.kvMovie.height(e.motionBox.height()),
                e.kvMovie.frameRate(20),
                e.kvMovie.loop(!1),
                e.motionBox.addSubView(e.kvMovie),
                n.addListener(e.kvMovie, e, r.END, e.onKVMovieEnd),
                e.kvButtons = new t,
                e.kvButtons.cancelable = !0,
                e.kvButtons.addButtons([e.view().subViewByName("btn_1"), e.view().subViewByName("btn_2"), e.view().subViewByName("btn_3"), e.view().subViewByName("btn_4")]),
                n.addListener(e.kvButtons, e, r.CHANGE, e.onKVButtonsChange),
                e.actions = [],
                e.currentNode(f)
        },
        N.prototype.onViewAddToStage = function() {
            let e = this;
            e.prepared && (e.actions = [],
                e._currentNode = null,
                e.currentNode(f),
                e.kvButtons.cancelSelect())
        },
        N.prototype.onViewRemoveFromStage = function() {
            let e = this;
            e.prepared && e.currentSound != null && (e.currentSound.pause(),
                e.currentSound = null)
        },
        N.prototype._currentNode = null,
        N.prototype.currentNode = function(e) {
            let t = this;
            if (Boolean(e)) {
                let n = t._currentNode;
                t._currentNode = e;
                let r = null;
                n != null && n.name == t._currentNode.name ? (r = t._currentNode.getMotionFrames(t.motions),
                        n.reversion == t._currentNode.reversion ? r = r.slice(t.kvMovie.currentFrame(), r.length) : r = r.slice(r.length - (t.kvMovie.currentFrame() - 1), r.length)) : r = t._currentNode.getMotionFrames(t.motions),
                    r.length <= 0 ? t.onKVMovieEnd() : (t.kvMovie.frames(r),
                        t.kvMovie.goToAndPlay(0))
            }
            return t._currentNode
        },
        N.prototype.actions = null,
        N.prototype.onKVMovieEnd = function() {
            let e = this,
                t = null;
            if (e.actions.length > 0) {
                t = e.actions.shift();
                let n = t.soundEffect();
                n != null && (e.currentSound != null && (e.currentSound.pause(),
                        e.currentSound = null),
                    e.currentSound = n,
                    e.currentSound.play(0))
            } else
                t = e._currentNode;
            e._currentNode = null,
                e.currentNode(t)
        },
        N.prototype.onKVButtonsChange = function() {
            let e = this;
            e.currentSound != null && (e.currentSound.pause(),
                e.currentSound = null);
            let t = null;
            switch (e.kvButtons.selectedIndex()) {
                case -1:
                    t = f;
                    break;
                case 0:
                    t = d;
                    break;
                case 1:
                    t = g;
                    break;
                case 2:
                    t = w;
                    break;
                case 3:
                    t = x
            }
            e.actions = e.createPathFromNodeName(e._currentNode.name, t),
                e.currentNode(e.actions.shift())
        },
        N.prototype.createPathFromNodes = function(e, t) {
            let n = this,
                r = null,
                i = e.toNodes.slice();
            while (r == null && i.length > 0) {
                let s = null,
                    o = -1;
                for (let u = 0; u < i.length; u++) {
                    let a = i[u];
                    if (a == t) {
                        r = [e, a];
                        break
                    }
                    if (s == null || s.distance(t) > a.distance(t))
                        s = a,
                        o = u
                }
                if (r == null) {
                    i.splice(o, 1);
                    let f = n.createPathFromNodes(s, t);
                    f != null && (r = [e].concat(f))
                }
            }
            return r
        },
        N.prototype.createPathFromNodeName = function(e, t) {
            let n = this,
                r = null;
            for (let i = 0; i < T.length; i++) {
                let s = T[i];
                if (s.name == e) {
                    let o = n.createPathFromNodes(s, t);
                    if (r == null || o.length < r.length)
                        r = o
                }
            }
            return r
        },
        N 
}();

export const section_head = function (e = section_cell, t = head_kv) {
    let n = function(t) {
        let n = this;
        e.prototype.constructor.call(n, t)
    };
    return n.prototype = new e,
        n.prototype.constructor = n,
        n.prototype.createKVMotion = function() {
            let e = this;
            return new t
        },
        n
}();

export const star_kv = function (e = kv_motion, t = event_center, n = event, r = touch_event, i = audio_ctrl) {
    let s = function(e) {
        let t = this;
        t.starName = e
    };
    return s.prototype = new e,
        s.constructor = s,
        s.prototype.starName = null,
        s.prototype.soundEffect = null,
        s.prototype.initialize = function() {
            let e = this;
            e.starName != null && (e.soundEffect = new i("sounds/" + e.starName + ".mp3"),
                e.soundEffect.loop(!1),
                e.initWithURL("views/" + e.starName + ".xml"))
        },
        s.prototype.playBox = null,
        s.prototype.huMovie = null,
        s.prototype.gfMovie = null,
        s.prototype.btnBack = null,
        s.prototype.normalBox = null,
        s.prototype.btnStart = null,
        s.prototype.onViewControllerPrepared = function() {
            let e = this;
            e.playBox = e.view().subViewByName("play_box"),
                e.huMovie = e.playBox.subViewByName("hu_movie"),
                e.gfMovie = e.playBox.subViewByName("gf_movie"),
                e.btnBack = e.playBox.subViewByName("btn_back"),
                e.normalBox = e.view().subViewByName("normal_box"),
                e.btnStart = e.normalBox.subViewByName("btn_start"),
                t.addListener(e.btnStart, e, r.CLICK, e.playMotion),
                t.addListener(e.btnBack, e, r.CLICK, e.stopMotion),
                t.addListener(e.huMovie, e, n.END, e.onHUMovieEnd)
        },
        s.prototype.onViewAddToStage = function() {
            let e = this;
            e.prepared && (e.isPlaying = !1,
                e.btnStart.normalStateView.play(0),
                e.normalBox.alpha(1),
                e.normalBox.stopAnimation(),
                e.view().empty(),
                e.view().addSubView(e.normalBox))
        },
        s.prototype.onViewRemoveFromStage = function() {
            let e = this;
            e.prepared && e.soundEffect != null && e.soundEffect.pause()
        },
        s.prototype.isPlaying = !1,
        s.prototype.playMotion = function() {
            let e = this;
            e.isPlaying == 0 && (e.isPlaying = !0,
                e.btnBack.stopAnimation(),
                e.btnBack.visible(!1),
                e.huMovie.goToAndStop(0),
                e.gfMovie.goToAndStop(0),
                e.gfMovie.stopAnimation(),
                e.gfMovie.visible(!1),
                e.view().insertSubViewAt(e.playBox, 0),
                e.btnStart.normalStateView.currentTime(0),
                e.btnStart.normalStateView.pause(),
                e.normalBox.animate(1, {
                    alpha: 0
                }, Cubic.easeIn, null, function() {
                    e.soundEffect != null && e.soundEffect.play(0),
                        e.normalBox.remove(),
                        e.huMovie.play()
                }))
        },
        s.prototype.stopMotion = function() {
            let e = this;
            e.isPlaying && (e.isPlaying = !1,
                e.btnBack.normalStateView.currentTime(0),
                e.btnBack.normalStateView.pause(),
                e.normalBox.alpha(0),
                e.view().addSubView(e.normalBox),
                e.normalBox.animate(1, {
                    alpha: 1
                }, Cubic.easeOut, null, function() {
                    e.btnStart.normalStateView.play(0),
                        e.playBox.remove()
                }),
                e.soundEffect != null && e.soundEffect.pause())
        },
        s.prototype.onHUMovieEnd = function() {
            let e = this;
            e.gfMovie.alpha(0),
                e.gfMovie.visible(!0),
                e.gfMovie.animate(.5, {
                    alpha: 1
                }, Cubic.easeOut, null, function() {
                    e.gfMovie.play(),
                        setTimeout(function() {
                            e.btnBack.alpha(0),
                                e.btnBack.visible(!0),
                                e.btnBack.normalStateView.currentTime(0),
                                e.btnBack.normalStateView.pause(),
                                e.btnBack.animate(.5, {
                                    alpha: 1
                                }, Cubic.easeOut, null, function() {
                                    e.btnBack.normalStateView.play(0)
                                })
                        }, 2400)
                })
        },
        s
}();

export const section_naying = function (e = section_cell, t = star_kv) {
    let n = function(t) {
        let n = this;
        e.prototype.constructor.call(n, t)
    };
    return n.prototype = new e,
        n.prototype.constructor = n,
        n.prototype.createKVMotion = function() {
            let e = this;
            return new t("naying")
        },
        n
}();

export const section_jay = function (e = section_cell, t = star_kv) {
    let n = function(t) {
        let n = this;
        e.prototype.constructor.call(n, t)
    };
    return n.prototype = new e,
        n.prototype.constructor = n,
        n.prototype.createKVMotion = function() {
            let e = this;
            return new t("jay")
        },
        n
}();

export const section_wangfeng = function (e = section_cell, t = star_kv) {
    let n = function(t) {
        let n = this;
        e.prototype.constructor.call(n, t)
    };
    return n.prototype = new e,
        n.prototype.constructor = n,
        n.prototype.createKVMotion = function() {
            let e = this;
            return new t("wangfeng")
        },
        n
}();

export const section_harlern = function (e = section_cell, t = star_kv) {
    let n = function(t) {
        let n = this;
        e.prototype.constructor.call(n, t)
    };
    return n.prototype = new e,
        n.prototype.constructor = n,
        n.prototype.createKVMotion = function() {
            let e = this;
            return new t("harlern")
        },
        n
}();

export const bottom_kv = function (e = kv_motion, t = event_center, n = touch_event, r = event, i = audio_ctrl) {
    let s = function() {};
        return s.prototype = new e,
            s.prototype.constructor = s,
            s.prototype.soundEffect = null,
            s.prototype.initialize = function() {
                let e = this;
                e.initWithURL("views/bottom.xml"),
                    e.soundEffect = new i("sounds/bottom.mp3"),
                    e.soundEffect.loop(!1)
            },
            s.prototype.stars = null,
            s.prototype.voc = null,
            s.prototype.onViewControllerPrepared = function() {
                let e = this;
                e.stars = e.view().subViewByName("stars"),
                    e.voc = e.view().subViewByName("voc"),
                    t.addListener(e.view(), e, n.CLICK, function() {
                        e.isPlaying == 0 && e.play()
                    }),
                    t.addListener(e.voc, e, r.END, e.onVocREnd)
            },
            s.prototype.onViewAddToStage = function() {
                let e = this;
                e.prepared && (e.isPlaying = !1,
                    e.voc.goToAndPlay(0),
                    e.stars.goToAndStop(0))
            },
            s.prototype.onViewRemoveFromStage = function() {
                let e = this;
                e.prepared && (e.voc.stop(),
                    e.voc.stop(),
                    e.soundEffect.pause())
            },
            s.prototype.onViewUpdated = function() {
                let e = this;
                e.prepared && e.isPlaying == 0 && e.voc.currentFrame() == 15 && e.voc.goToAndPlay(0)
            },
            s.prototype.isPlaying = !1,
            s.prototype.play = function() {
                let e = this;
                e.isPlaying == 0 && (e.isPlaying = !0,
                    e.stars.goToAndPlay(0),
                    e.soundEffect.play(0))
            },
            s.prototype.onVocREnd = function() {
                let e = this;
                e.isPlaying = !1,
                    e.voc.goToAndPlay(0)
            },
            s
}();

export export const section_bottom = function (e = section_cell, t = bottom_kv) {
    let n = function(t) {
        let n = this;
        e.prototype.constructor.call(n, t)
    };
    return n.prototype = new e,
        n.prototype.constructor = n,
        n.prototype.createKVMotion = function() {
            let e = this;
            return new t
        },
        n
}();

jQuery.cookie = function(e, t, n) {
    if (arguments.length > 1 && String(t) !== "[object Object]") {
        n = jQuery.extend({}, n);
        if (t === null || t === undefined)
            n.expires = -1;
        if (typeof n.expires == "number") {
            let r = n.expires,
                i = n.expires = new Date;
            i.setDate(i.getDate() + r)
        }
        return t = String(t),
            document.cookie = [encodeURIComponent(e), "=", n.raw ? t : encodeURIComponent(t), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : ""].join("")
    }
    n = t || {};
    let s, o = n.raw ? function(e) {
            return e
        } :
        decodeURIComponent;
    return (s = (new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)")).exec(document.cookie)) ? o(s[1]) : null
};

export const voc_constants = function function (e = jQuery, t = jQuery) {
    let n = {};
        return n.READ_MORE = "http://evt.dianping.com/synthesislink/4483.html",

            n.pvCount = 0,
            n.likeCount = 0,
            n.isLiked = function() {
                let t = e.cookie("is_liked");
                return t == "is_liked"
            },
            n.like = function() {
                e.cookie("is_liked", "is_liked"),
                    n.likeCount += 1,
                    e.get("http://voc.bungba.com/dev/php/voc/like.php", {
                        ts: Date.now()
                    })
            },
            n
}();

export const section_footer = function (e = section_cell, t = event_center, n = touch_event, r = event, i = voc_constants, s = button_state) {
    let o = function(t) {
        let n = this;
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
            let o = this;
            e.prototype.onViewControllerPrepared.call(o),
                o.btnWant = o.view().subViewByName("btn_want"),
                o.btnSource = o.view().subViewByName("btn_source"),
                o.txtPV = o.view().subViewByName("txt_pv");
            let u = i.pvCount;
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
                let n = Math.floor(t / 100) / 10;
                e.text(n + "K +")
            } else if (t >= 1e4) {
                let r = Math.floor(t / 1e3) / 10;
                e.text(r + "W +")
            }
        },
        o
}();

export const section_top = function (e = section_cell, t = star_kv, n = event_center, r = touch_event, i = voc_constants) {
    let s = function(t) {
        let n = this;
        e.prototype.constructor.call(n, t)
    };
    return s.prototype = new e,
        s.prototype.constructor = s,
        s.prototype.btnCreator = null,
        s.prototype.onViewControllerPrepared = function() {
            let t = this;
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
}();

!function(e = jQuery, t) {
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
        let r, i, s;
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
        let n, r, i, s;
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
        let t, n, r, i;
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
            let n = m[e];
            n && (e = n),
                t && t._complete && delete t._complete,
                console.log('"' + e + '",', t || "")
        }
    }

    function c() {
        if (!("6.0.2" > x || N.systemType < 0)) {
            let e = new Image;
            N.appId = C.appId,
                N.initTime = T.initEndTime - T.initStartTime,
                N.preVerifyTime = T.preVerifyEndTime - T.preVerifyStartTime,
                A.getNetworkType({
                    isInnerInvoke: !0,
                    success: function(t) {
                        N.networkType = t.networkType;
                        let n = "https://open.weixin.qq.com/sdk/report?v=" + N.version + "&o=" + N.isPreVerifyOk + "&s=" + N.systemType + "&c=" + N.clientVersion + "&a=" + N.appId + "&n=" + N.networkType + "&i=" + N.initTime + "&p=" + N.preVerifyTime + "&u=" + N.url;
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
    let v, m, g, y, b, w, E, S, x, T, N, C, k, L, A;
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
                let e, t = {};
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
                let e = b.match(/micromessenger\/(\d+\.\d+\.\d+)/) || b.match(/micromessenger\/(\d+\.\d+)/);
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
                                        let e = k._completes;
                                        return e.push(function() {
                                                C.debug || c()
                                            }),
                                            k.complete = function(t) {
                                                for (let n = 0, r = e.length; r > n; ++n)
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
                    let t = function(e) {
                        let t, n, r = e.checkResult;
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
                                        let n = e.checkResult;
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
                                        let t = e.localIds;
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
                    let t = function(e) {
                        let t, n, r, i = e.errMsg;
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
                            let t = s(e, "jsapi_location");
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
                    let t, r, i, s, o = e.cardList,
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
                                    let t, n, r, i = e.card_list;
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
                    let t, r, i, s, o = e.cardList,
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
});

export const wechat_event = function (e = event) {
    let t = function(t, n, r) {
        let i = this;
        i.message = r,
            e.prototype.constructor.call(i, t, n)
    };
    t.CANCEL_SHARING = "cancel_sharing",
        t.SUCCESS_SHARING = "success_sharing",
        t.WEICHAT_READY = "wechat_ready",
        t.prototype = new e;
    let n = t.prototype;
    return n.constructor = t,
        n.message = null,
        n.clone = function(e) {
            let n = this;
            return e = arguments.length > 0 ? e : n.target,
                new t(e, n.type, n.message)
        },
        t
}();

export const wechat_api = function (e = jQuery, t = jweixin, n = system, r = url_util, i = event_center, s = wechat_event) {
    let o = function() {};
        o._instance = null,
            o.instance = function() {
                return o._instance == null && (o._instance = new o),
                    o._instance
            };
        let u = o.prototype;
        return u.constructor = o,
            u.inited = !1,
            u.jsTicketInfo = null,
            u.debug = !1,
            u.jsApiList = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"],
            u.jsTicketURL = "./php/wechat_js/jsticket.php",
            u.initialize = function(t, n) {
                let i = this;
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
                let e = this;
                i.removeListener(e, e, s.WEICHAT_READY, e.updateSharing);
                if (e.isReady) {
                    let n = function(t) {
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
                let e = this;
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
}();

export const voice_of_china = function (e = stage_ctrl, t = assets_loader, n = section_cell, r = section_head, i = section_naying, s = section_jay, o = section_wangfeng, u = section_harlern, a = section_bottom, f = section_footer, l = section_top, c = wechat_api, h = wechat_event, p = event_center, d = url_util, v = voc_constants) {
    let m = function() {
        let e = this;
        t.threadsCount = 1;
        let n = c.instance();
        n.initialize("http://voc.bungba.com/dev/php/wechat_js/jsticket.php"),
            n.shareTitle = "四大导师拯救麦渣",
            n.shareDesc = "如果你是KTV麦渣，看四大导师如何教你唱出好声音。",
            n.shareLink = d.cleanURL(),
            n.shareImageURL = d.relativePath("images/share.jpg"),
            n.updateSharing(),
            p.addListener(n, e, h.SUCCESS_SHARING, e.onWechatShared)
    };
    m.prototype = new e;
    let g = m.prototype;
    return g.constructor = m,
        g.loadAssets = function(t) {
            let n = this;
            t.push("text|http://voc.bungba.com/dev/php/voc/pv.php", "text|http://voc.bungba.com/dev/php/voc/like_count.php"),
                e.prototype.loadAssets.call(n, t)
        },
        g.pageBox = null,
        g.cells = null,
        g.onViewControllerPrepared = function() {
            let e = this;
            v.pvCount = parseInt(t.asset("http://voc.bungba.com/dev/php/voc/pv.php"), 10),
                v.likeCount = parseInt(t.asset("http://voc.bungba.com/dev/php/voc/like_count.php"), 10);
            let c = e.view().subViewByName("cell_views");
            c.remove(),
                e.cells = [],
                e.cells.push(new l(c.subViewByIndex(0)), new r(c.subViewByIndex(1)), new n(c.subViewByIndex(2)), new n(c.subViewByIndex(3)), new s(c.subViewByIndex(4)), new n(c.subViewByIndex(5)), new i(c.subViewByIndex(6)), new n(c.subViewByIndex(7)), new o(c.subViewByIndex(8)), new n(c.subViewByIndex(9)), new u(c.subViewByIndex(10)), new n(c.subViewByIndex(11)), new n(c.subViewByIndex(12)), new a(c.subViewByIndex(13)), new f(c.subViewByIndex(14))),
                e.pageBox = e.view().subViewByName("page_box"),
                e.pageBox.dataSource(e),
                e.pageBox.reloadData()
        },
        g.onViewResize = function(e, t) {
            let n = this;
            if (n.prepared) {
                n.view().width(e),
                    n.view().height(t),
                    n.pageBox.height(t),
                    n.pageBox.width(e);
                for (let r = 0; r < n.cells.length; r++) {
                    let i = n.cells[r].view(),
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
            let t = this;
            return t.cells.length
        },
        g.cellSizeByIndex = function(e, t) {
            let n = this;
            return n.cells[t].view().height() * n.cells[t].view().scaleY()
        },
        g.cellByIndex = function(e, t) {
            let n = this;
            return n.cells[t].view()
        },
        g.onWechatShared = function() {
            window["_hmt"] != undefined && _hmt.push(["_trackEvent", "SHAREING", "SHARING", "SHARING"])
        },
        m
}();

const main = function (e = jQuery, t = axe, n = voice_of_china) {
    e(document).ready(function() {
        const axes = new t(n, "views/stage.xml")
    })
}

main()
