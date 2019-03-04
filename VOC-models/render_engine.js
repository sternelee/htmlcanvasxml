define("render_engine", ["jquery", "run_loop", "system", "mat3", "vec2", "touch_event", "touch", "text_align"], function(e, t, n, r, i, s, o, u) {
    var a = function(n) {
            var r = this;
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
            var e = this;
            e.stage.active(!0)
        },
        a.prototype.onDeactivate = function() {
            var e = this;
            e.stage.active(!1)
        },
        a.prototype.resize = function() {
            var t = this,
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
            var n = this;
            n.$txtFPS != null && n.$txtFPS.val(Math.round(1 / t * 10) / 10),
                n.stage.update(e, t);
            if (n.stage.needToRender() || n.stage.needResizeFlag) {
                n.stage.needToRender(!1),
                    n.stage.needResizeFlag && (n.stage.needResizeFlag = !1,
                        n.resize()),
                    n.$canvas.attr("width", n.stage.stageWidth()),
                    n.$canvas.attr("height", n.stage.stageHeight());
                var r = n.$canvas[0].getContext("2d");
                r.clearRect(0, 0, n.stage.stageWidth(), n.stage.stageHeight()),
                    n.render(r, n.stage, n.stage.stageMatrix())
            }
        },
        a.prototype.takePhoto = function(t, n, i) {
            var s = this,
                o = e("<canvas></canvas>");
            o.attr("width", t.width()),
                o.attr("height", t.height());
            var u = t.clone();
            u.matrix(new r);
            var a = o[0].getContext("2d");
            s.render(a, u, new r, 1);
            var f = o[0].toDataURL(typeof i == "string" ? i : "image/png"),
                l = e("<img/>");
            l.load(function() {
                    Boolean(n) && n(t, l[0])
                }),
                l.attr("src", f)
        },
        a.prototype.render = function(e, t, n, i) {
            var s = this;
            n = n instanceof Object ? n : new r,
                i = isNaN(i) === !1 ? i : 1,
                n = t.matrix().concatWith(n),
                i *= t.alpha();
            var o = i <= 0 || t.mask() != null && t.mask().commands().length <= 0;
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
                        var u = t.rect(t);
                        e.rect(u.x, u.y, u.width, u.height),
                            e.globalAlpha = i * (t.bgColor().a() / 255);
                        var a = t.bgColor().clone();
                        a.adjustSaturation(t.saturation()),
                            e.fillStyle = a.to24BitString(),
                            e.fill()
                    }
                    var f = t.className;
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
            var i = this,
                s = t.visibleSubViews();
            for (var o = 0; o < s.length; o++) {
                var u = s[o];
                i.render(e, u, n, r)
            }
        },
        a.prototype.renderBitmap = function(e, t) {
            var n = t.bitmap();
            if (n != null) {
                var r = t.width(),
                    i = t.height();
                e.drawImage(n, 0, 0, n.naturalWidth, n.naturalHeight, 0, 0, r, i)
            }
        },
        a.prototype.renderMovie = function(e, t) {
            if (t.framesCount() > 0) {
                var n = t.frames()[t.currentFrame()];
                if (n != null) {
                    var r = t.width(),
                        i = t.height();
                    e.drawImage(n, 0, 0, n.naturalWidth, n.naturalHeight, 0, 0, r, i)
                }
            }
        },
        a.prototype.renderShape = function(e, t, n) {
            var r = this;
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
            var r = this;
            t.color() != null && t.text().length > 0 && (e.globalAlpha = n * (t.color().a() / 255),
                e.fillStyle = t.color().to24BitString(),
                e.font = t.textStyle(),
                t.wordWrap() ? r.renderMultipleLineText(e, t) : r.renderSingleLineText(e, t))
        },
        a.prototype.renderMultipleLineText = function(e, t) {
            var n = t.text();
            if (n.length > 0 && t.width() > 0) {
                n = n.replace(/\<br\/\>/gi, "\n");
                var r = [],
                    i = n.split(""),
                    s = "";
                while (i.length > 0) {
                    var o = i.shift();
                    if (o == "\n")
                        r.push(s),
                        s = "";
                    else {
                        s += o;
                        var a = e.measureText(s).width;
                        if (a > t.width() || i.length <= 0)
                            a > t.width() && (s = s.slice(0, s.length - 1),
                                i.unshift(o)),
                            r.push(s),
                            s = ""
                    }
                }
                if (t.mergeLastLine() > 0)
                    for (var f = r.length - 1; f > 0; f--)
                        r[f].length <= t.mergeLastLine() && (r[f - 1] += r[f],
                            r.splice(f, 1));
                e.textBaseline = "alphabetic";
                var l = t.lineHeight() / 2;
                for (var c = 0; c < r.length; c++) {
                    var h = r[c],
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
            var n = e.measureText(t.text()),
                r = 0;
            t.textAlign() == u.LEFT ? r = 0 : t.textAlign() == u.CENTER ? r = t.width() / 2 - n.width / 2 : t.textAlign() == u.RIGHT && (r = t.width() - n.width),
                e.fillText(t.text(), r, t.height() / 2)
        },
        a.prototype.drawPaths = function(e, t) {
            var n = t.commands();
            e.beginPath();
            for (var r = 0; r < n.length; r++) {
                var i = n[r],
                    s = i.o,
                    o = i.p;
                e[s].apply(e, o)
            }
        },
        a.prototype.createTouchEvent = function(e) {
            var t = this,
                n = [];
            for (var r = 0; r < e.length; r++) {
                var s = new i(e[r].pageX * t.stage.ratio(), e[r].pageY * t.stage.ratio());
                s = t.stage.stageMatrix().inversePoint(s);
                var u = new o(s.x, s.y, s.x, s.y);
                n.push(u)
            }
            return n
        },
        a.prototype.configEvents = function() {
            var e = this;
            e.$canvas.bind(n.isTouchDevice() ? "touchstart" : "mousedown", function(t) {
                var r = function(t) {
                    var r = null;
                    t.type == "touchstart" || t.type == "mousedown" ? r = s.TOUCH_START : r = s.TOUCH_MOVE;
                    var i = null;
                    n.isTouchDevice() ? i = t.originalEvent.touches : i = [t];
                    var o = e.createTouchEvent(i),
                        u = new s(e.stage, r, o);
                    e.stage.triggerEvent(u),
                        t.preventDefault()
                };
                r(t),
                    e.$canvas.unbind("touchmove touchend mousemove mouseup"),
                    e.$canvas.bind(n.isTouchDevice() ? "touchmove" : "mousemove", r),
                    e.$canvas.bind(n.isTouchDevice() ? "touchend" : "mouseup", function() {
                        var t = new s(e.stage, s.TOUCH_END, []);
                        e.stage.triggerEvent(t),
                            e.$canvas.unbind("touchmove touchend mousemove mouseup")
                    })
            })
        },
        a
})
