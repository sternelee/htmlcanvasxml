/*!
 * jQuery JavaScript Library v1.9.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-1-14
 */

/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function(e, t) {
    function _(e) {
        var t = e.length,
            n = y.type(e);
        return y.isWindow(e) ? !1 : e.nodeType === 1 && t ? !0 : n === "array" || n !== "function" && (t === 0 || typeof t == "number" && t > 0 && t - 1 in e)
    }

    function P(e) {
        var t = D[e] = {};
        return y.each(e.match(w) || [], function(e, n) {
                t[n] = !0
            }),
            t
    }

    function j(e, n, r, i) {
        if (!y.acceptData(e))
            return;
        var s, o, u = y.expando,
            a = typeof n == "string",
            l = e.nodeType,
            c = l ? y.cache : e,
            h = l ? e[u] : e[u] && u;
        if ((!h || !c[h] || !i && !c[h].data) && a && r === t)
            return;
        h || (l ? e[u] = h = f.pop() || y.guid++ : h = u),
            c[h] || (c[h] = {},
                l || (c[h].toJSON = y.noop));
        if (typeof n == "object" || typeof n == "function")
            i ? c[h] = y.extend(c[h], n) : c[h].data = y.extend(c[h].data, n);
        return s = c[h],
            i || (s.data || (s.data = {}),
                s = s.data),
            r !== t && (s[y.camelCase(n)] = r),
            a ? (o = s[n],
                o == null && (o = s[y.camelCase(n)])) : o = s,
            o
    }

    function F(e, t, n) {
        if (!y.acceptData(e))
            return;
        var r, i, s, o = e.nodeType,
            u = o ? y.cache : e,
            a = o ? e[y.expando] : y.expando;
        if (!u[a])
            return;
        if (t) {
            r = n ? u[a] : u[a].data;
            if (r) {
                y.isArray(t) ? t = t.concat(y.map(t, y.camelCase)) : t in r ? t = [t] : (t = y.camelCase(t),
                    t in r ? t = [t] : t = t.split(" "));
                for (i = 0,
                    s = t.length; i < s; i++)
                    delete r[t[i]];
                if (!(n ? q : y.isEmptyObject)(r))
                    return
            }
        }
        if (!n) {
            delete u[a].data;
            if (!q(u[a]))
                return
        }
        o ? y.cleanData([e], !0) : y.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null
    }

    function I(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(B, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r == "string") {
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : H.test(r) ? y.parseJSON(r) : r
                } catch (s) {}
                y.data(e, n, r)
            } else
                r = t
        }
        return r
    }

    function q(e) {
        var t;
        for (t in e) {
            if (t === "data" && y.isEmptyObject(e[t]))
                continue;
            if (t !== "toJSON")
                return !1
        }
        return !0
    }

    function nt() {
        return !0
    }

    function rt() {
        return !1
    }

    function ft(e, t) {
        do
            e = e[t];
        while (e && e.nodeType !== 1);
        return e
    }

    function lt(e, t, n) {
        t = t || 0;
        if (y.isFunction(t))
            return y.grep(e, function(e, r) {
                var i = !!t.call(e, r, e);
                return i === n
            });
        if (t.nodeType)
            return y.grep(e, function(e) {
                return e === t === n
            });
        if (typeof t == "string") {
            var r = y.grep(e, function(e) {
                return e.nodeType === 1
            });
            if (ot.test(t))
                return y.filter(t, r, !n);
            t = y.filter(t, r)
        }
        return y.grep(e, function(e) {
            return y.inArray(e, t) >= 0 === n
        })
    }

    function ct(e) {
        var t = ht.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            while (t.length)
                n.createElement(t.pop());
        return n
    }

    function At(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }

    function Ot(e) {
        var t = e.getAttributeNode("type");
        return e.type = (t && t.specified) + "/" + e.type,
            e
    }

    function Mt(e) {
        var t = Tt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
            e
    }

    function _t(e, t) {
        var n, r = 0;
        for (;
            (n = e[r]) != null; r++)
            y._data(n, "globalEval", !t || y._data(t[r], "globalEval"))
    }

    function Dt(e, t) {
        if (t.nodeType !== 1 || !y.hasData(e))
            return;
        var n, r, i, s = y._data(e),
            o = y._data(t, s),
            u = s.events;
        if (u) {
            delete o.handle,
                o.events = {};
            for (n in u)
                for (r = 0,
                    i = u[n].length; r < i; r++)
                    y.event.add(t, n, u[n][r])
        }
        o.data && (o.data = y.extend({}, o.data))
    }

    function Pt(e, t) {
        var n, r, i;
        if (t.nodeType !== 1)
            return;
        n = t.nodeName.toLowerCase();
        if (!y.support.noCloneEvent && t[y.expando]) {
            r = y._data(t);
            for (i in r.events)
                y.removeEvent(t, i, r.handle);
            t.removeAttribute(y.expando)
        }
        if (n === "script" && t.text !== e.text)
            Ot(t).text = e.text,
            Mt(t);
        else if (n === "object")
            t.parentNode && (t.outerHTML = e.outerHTML),
            y.support.html5Clone && e.innerHTML && !y.trim(t.innerHTML) && (t.innerHTML = e.innerHTML);
        else if (n === "input" && Et.test(e.type))
            t.defaultChecked = t.checked = e.checked,
            t.value !== e.value && (t.value = e.value);
        else if (n === "option")
            t.defaultSelected = t.selected = e.defaultSelected;
        else if (n === "input" || n === "textarea")
            t.defaultValue = e.defaultValue
    }

    function Ht(e, n) {
        var r, i, s = 0,
            o = typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll(n || "*") : t;
        if (!o)
            for (o = [],
                r = e.childNodes || e;
                (i = r[s]) != null; s++)
                !n || y.nodeName(i, n) ? o.push(i) : y.merge(o, Ht(i, n));
        return n === t || n && y.nodeName(e, n) ? y.merge([e], o) : o
    }

    function Bt(e) {
        Et.test(e.type) && (e.defaultChecked = e.checked)
    }

    function Zt(e, t) {
        if (t in e)
            return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = Yt.length;
        while (i--) {
            t = Yt[i] + n;
            if (t in e)
                return t
        }
        return r
    }

    function en(e, t) {
        return e = t || e,
            y.css(e, "display") === "none" || !y.contains(e.ownerDocument, e)
    }

    function tn(e, t) {
        var n, r = [],
            i = 0,
            s = e.length;
        for (; i < s; i++) {
            n = e[i];
            if (!n.style)
                continue;
            r[i] = y._data(n, "olddisplay"),
                t ? (!r[i] && n.style.display === "none" && (n.style.display = ""),
                    n.style.display === "" && en(n) && (r[i] = y._data(n, "olddisplay", on(n.nodeName)))) : !r[i] && !en(n) && y._data(n, "olddisplay", y.css(n, "display"))
        }
        for (i = 0; i < s; i++) {
            n = e[i];
            if (!n.style)
                continue;
            if (!t || n.style.display === "none" || n.style.display === "")
                n.style.display = t ? r[i] || "" : "none"
        }
        return e
    }

    function nn(e, t, n) {
        var r = Xt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function rn(e, t, n, r, i) {
        var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
            o = 0;
        for (; s < 4; s += 2)
            n === "margin" && (o += y.css(e, n + Gt[s], !0, i)),
            r ? (n === "content" && (o -= y.css(e, "padding" + Gt[s], !0, i)),
                n !== "margin" && (o -= y.css(e, "border" + Gt[s] + "Width", !0, i))) : (o += y.css(e, "padding" + Gt[s], !0, i),
                n !== "padding" && (o += y.css(e, "border" + Gt[s] + "Width", !0, i)));
        return o
    }

    function sn(e, t, n) {
        var r = !0,
            i = t === "width" ? e.offsetWidth : e.offsetHeight,
            s = Ft(e),
            o = y.support.boxSizing && y.css(e, "boxSizing", !1, s) === "border-box";
        if (i <= 0 || i == null) {
            i = jt(e, t, s);
            if (i < 0 || i == null)
                i = e.style[t];
            if (Vt.test(i))
                return i;
            r = o && (y.support.boxSizingReliable || i === e.style[t]),
                i = parseFloat(i) || 0
        }
        return i + rn(e, t, n || (o ? "border" : "content"), r, s) + "px"
    }

    function on(e) {
        var t = i,
            n = Jt[e];
        if (!n) {
            n = un(e, t);
            if (n === "none" || !n)
                It = (It || y("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement),
                t = (It[0].contentWindow || It[0].contentDocument).document,
                t.write("<!doctype html><html><body>"),
                t.close(),
                n = un(e, t),
                It.detach();
            Jt[e] = n
        }
        return n
    }

    function un(e, t) {
        var n = y(t.createElement(e)).appendTo(t.body),
            r = y.css(n[0], "display");
        return n.remove(),
            r
    }

    function pn(e, t, n, r) {
        var i;
        if (y.isArray(t))
            y.each(t, function(t, i) {
                n || fn.test(e) ? r(e, i) : pn(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
            });
        else if (!n && y.type(t) === "object")
            for (i in t)
                pn(e + "[" + i + "]", t[i], n, r);
        else
            r(e, t)
    }

    function On(e) {
        return function(t, n) {
            typeof t != "string" && (n = t,
                t = "*");
            var r, i = 0,
                s = t.toLowerCase().match(w) || [];
            if (y.isFunction(n))
                while (r = s[i++])
                    r[0] === "+" ? (r = r.slice(1) || "*",
                        (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function Mn(e, t, n, r) {
        function o(u) {
            var a;
            return i[u] = !0,
                y.each(e[u] || [], function(e, u) {
                    var f = u(t, n, r);
                    if (typeof f == "string" && !s && !i[f])
                        return t.dataTypes.unshift(f),
                            o(f), !1;
                    if (s)
                        return !(a = f)
                }),
                a
        }
        var i = {},
            s = e === kn;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }

    function _n(e, n) {
        var r, i, s = y.ajaxSettings.flatOptions || {};
        for (r in n)
            n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
        return i && y.extend(!0, e, i),
            e
    }

    function Dn(e, n, r) {
        var i, s, o, u, a = e.contents,
            f = e.dataTypes,
            l = e.responseFields;
        for (s in l)
            s in r && (n[l[s]] = r[s]);
        while (f[0] === "*")
            f.shift(),
            i === t && (i = e.mimeType || n.getResponseHeader("Content-Type"));
        if (i)
            for (s in a)
                if (a[s] && a[s].test(i)) {
                    f.unshift(s);
                    break
                }
        if (f[0] in r)
            o = f[0];
        else {
            for (s in r) {
                if (!f[0] || e.converters[s + " " + f[0]]) {
                    o = s;
                    break
                }
                u || (u = s)
            }
            o = o || u
        }
        if (o)
            return o !== f[0] && f.unshift(o),
                r[o]
    }

    function Pn(e, t) {
        var n, r, i, s, o = {},
            u = 0,
            a = e.dataTypes.slice(),
            f = a[0];
        e.dataFilter && (t = e.dataFilter(t, e.dataType));
        if (a[1])
            for (n in e.converters)
                o[n.toLowerCase()] = e.converters[n];
        for (; i = a[++u];)
            if (i !== "*") {
                if (f !== "*" && f !== i) {
                    n = o[f + " " + i] || o["* " + i];
                    if (!n)
                        for (r in o) {
                            s = r.split(" ");
                            if (s[1] === i) {
                                n = o[f + " " + s[0]] || o["* " + s[0]];
                                if (n) {
                                    n === !0 ? n = o[r] : o[r] !== !0 && (i = s[0],
                                        a.splice(u--, 0, i));
                                    break
                                }
                            }
                        }
                    if (n !== !0)
                        if (n && e["throws"])
                            t = n(t);
                        else
                            try {
                                t = n(t)
                            } catch (l) {
                                return {
                                    state: "parsererror",
                                    error: n ? l : "No conversion from " + f + " to " + i
                                }
                            }
                }
                f = i
            }
        return {
            state: "success",
            data: t
        }
    }

    function Rn() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function Un() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function Qn() {
        return setTimeout(function() {
                zn = t
            }),
            zn = y.now()
    }

    function Gn(e, t) {
        y.each(t, function(t, n) {
            var r = (Kn[t] || []).concat(Kn["*"]),
                i = 0,
                s = r.length;
            for (; i < s; i++)
                if (r[i].call(e, t, n))
                    return
        })
    }

    function Yn(e, t, n) {
        var r, i, s = 0,
            o = Jn.length,
            u = y.Deferred().always(function() {
                delete a.elem
            }),
            a = function() {
                if (i)
                    return !1;
                var t = zn || Qn(),
                    n = Math.max(0, f.startTime + f.duration - t),
                    r = n / f.duration || 0,
                    s = 1 - r,
                    o = 0,
                    a = f.tweens.length;
                for (; o < a; o++)
                    f.tweens[o].run(s);
                return u.notifyWith(e, [f, s, n]),
                    s < 1 && a ? n : (u.resolveWith(e, [f]), !1)
            },
            f = u.promise({
                elem: e,
                props: y.extend({}, t),
                opts: y.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: zn || Qn(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = y.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                    return f.tweens.push(r),
                        r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? f.tweens.length : 0;
                    if (i)
                        return this;
                    i = !0;
                    for (; n < r; n++)
                        f.tweens[n].run(1);
                    return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]),
                        this
                }
            }),
            l = f.props;
        Zn(l, f.opts.specialEasing);
        for (; s < o; s++) {
            r = Jn[s].call(f, e, l, f.opts);
            if (r)
                return r
        }
        return Gn(f, l),
            y.isFunction(f.opts.start) && f.opts.start.call(e, f),
            y.fx.timer(y.extend(a, {
                elem: e,
                anim: f,
                queue: f.opts.queue
            })),
            f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function Zn(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = y.camelCase(n),
                i = t[r],
                s = e[n],
                y.isArray(s) && (i = s[1],
                    s = e[n] = s[0]),
                n !== r && (e[r] = s,
                    delete e[n]),
                o = y.cssHooks[r];
            if (o && "expand" in o) {
                s = o.expand(s),
                    delete e[r];
                for (n in s)
                    n in e || (e[n] = s[n],
                        t[n] = i)
            } else
                t[r] = i
        }
    }

    function er(e, t, n) {
        var r, i, s, o, u, a, f, l, c, h = this,
            p = e.style,
            d = {},
            v = [],
            m = e.nodeType && en(e);
        n.queue || (l = y._queueHooks(e, "fx"),
                l.unqueued == null && (l.unqueued = 0,
                    c = l.empty.fire,
                    l.empty.fire = function() {
                        l.unqueued || c()
                    }
                ),
                l.unqueued++,
                h.always(function() {
                    h.always(function() {
                        l.unqueued--,
                            y.queue(e, "fx").length || l.empty.fire()
                    })
                })),
            e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY],
                y.css(e, "display") === "inline" && y.css(e, "float") === "none" && (!y.support.inlineBlockNeedsLayout || on(e.nodeName) === "inline" ? p.display = "inline-block" : p.zoom = 1)),
            n.overflow && (p.overflow = "hidden",
                y.support.shrinkWrapBlocks || h.done(function() {
                    p.overflow = n.overflow[0],
                        p.overflowX = n.overflow[1],
                        p.overflowY = n.overflow[2]
                }));
        for (r in t) {
            s = t[r];
            if (Xn.exec(s)) {
                delete t[r],
                    a = a || s === "toggle";
                if (s === (m ? "hide" : "show"))
                    continue;
                v.push(r)
            }
        }
        o = v.length;
        if (o) {
            u = y._data(e, "fxshow") || y._data(e, "fxshow", {}),
                "hidden" in u && (m = u.hidden),
                a && (u.hidden = !m),
                m ? y(e).show() : h.done(function() {
                    y(e).hide()
                }),
                h.done(function() {
                    var t;
                    y._removeData(e, "fxshow");
                    for (t in d)
                        y.style(e, t, d[t])
                });
            for (r = 0; r < o; r++)
                i = v[r],
                f = h.createTween(i, m ? u[i] : 0),
                d[i] = u[i] || y.style(e, i),
                i in u || (u[i] = f.start,
                    m && (f.end = f.start,
                        f.start = i === "width" || i === "height" ? 1 : 0))
        }
    }

    function tr(e, t, n, r, i) {
        return new tr.prototype.init(e, t, n, r, i)
    }

    function nr(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t)
            n = Gt[i],
            r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e),
            r
    }

    function rr(e) {
        return y.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
    }
    var n, r, i = e.document,
        s = e.location,
        o = e.jQuery,
        u = e.$,
        a = {},
        f = [],
        l = "1.9.0",
        c = f.concat,
        h = f.push,
        p = f.slice,
        d = f.indexOf,
        v = a.toString,
        m = a.hasOwnProperty,
        g = l.trim,
        y = function(e, t) {
            return new y.fn.init(e, t, n)
        },
        b = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        w = /\S+/g,
        E = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        S = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        x = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        T = /^[\],:{}\s]*$/,
        N = /(?:^|:|,)(?:\s*\[)+/g,
        C = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        k = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        L = /^-ms-/,
        A = /-([\da-z])/gi,
        O = function(e, t) {
            return t.toUpperCase()
        },
        M = function() {
            i.addEventListener ? (i.removeEventListener("DOMContentLoaded", M, !1),
                y.ready()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", M),
                y.ready())
        };
    y.fn = y.prototype = {
            jquery: l,
            constructor: y,
            init: function(e, n, r) {
                var s, o;
                if (!e)
                    return this;
                if (typeof e == "string") {
                    e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = S.exec(e);
                    if (s && (s[1] || !n)) {
                        if (s[1]) {
                            n = n instanceof y ? n[0] : n,
                                y.merge(this, y.parseHTML(s[1], n && n.nodeType ? n.ownerDocument || n : i, !0));
                            if (x.test(s[1]) && y.isPlainObject(n))
                                for (s in n)
                                    y.isFunction(this[s]) ? this[s](n[s]) : this.attr(s, n[s]);
                            return this
                        }
                        o = i.getElementById(s[2]);
                        if (o && o.parentNode) {
                            if (o.id !== s[2])
                                return r.find(e);
                            this.length = 1,
                                this[0] = o
                        }
                        return this.context = i,
                            this.selector = e,
                            this
                    }
                    return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
                }
                return e.nodeType ? (this.context = this[0] = e,
                    this.length = 1,
                    this) : y.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector,
                        this.context = e.context),
                    y.makeArray(e, this))
            },
            selector: "",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return p.call(this)
            },
            get: function(e) {
                return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
            },
            pushStack: function(e) {
                var t = y.merge(this.constructor(), e);
                return t.prevObject = this,
                    t.context = this.context,
                    t
            },
            each: function(e, t) {
                return y.each(this, e, t)
            },
            ready: function(e) {
                return y.ready.promise().done(e),
                    this
            },
            slice: function() {
                return this.pushStack(p.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
            },
            map: function(e) {
                return this.pushStack(y.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: h,
            sort: [].sort,
            splice: [].splice
        },
        y.fn.init.prototype = y.fn,
        y.extend = y.fn.extend = function() {
            var e, n, r, i, s, o, u = arguments[0] || {},
                a = 1,
                f = arguments.length,
                l = !1;
            typeof u == "boolean" && (l = u,
                    u = arguments[1] || {},
                    a = 2),
                typeof u != "object" && !y.isFunction(u) && (u = {}),
                f === a && (u = this,
                    --a);
            for (; a < f; a++)
                if ((e = arguments[a]) != null)
                    for (n in e) {
                        r = u[n],
                            i = e[n];
                        if (u === i)
                            continue;
                        l && i && (y.isPlainObject(i) || (s = y.isArray(i))) ? (s ? (s = !1,
                                o = r && y.isArray(r) ? r : []) : o = r && y.isPlainObject(r) ? r : {},
                            u[n] = y.extend(l, o, i)) : i !== t && (u[n] = i)
                    }
            return u
        },
        y.extend({
            noConflict: function(t) {
                return e.$ === y && (e.$ = u),
                    t && e.jQuery === y && (e.jQuery = o),
                    y
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? y.readyWait++ : y.ready(!0)
            },
            ready: function(e) {
                if (e === !0 ? --y.readyWait : y.isReady)
                    return;
                if (!i.body)
                    return setTimeout(y.ready);
                y.isReady = !0;
                if (e !== !0 && --y.readyWait > 0)
                    return;
                r.resolveWith(i, [y]),
                    y.fn.trigger && y(i).trigger("ready").off("ready")
            },
            isFunction: function(e) {
                return y.type(e) === "function"
            },
            isArray: Array.isArray || function(e) {
                return y.type(e) === "array"
            },
            isWindow: function(e) {
                return e != null && e == e.window
            },
            isNumeric: function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            type: function(e) {
                return e == null ? String(e) : typeof e == "object" || typeof e == "function" ? a[v.call(e)] || "object" : typeof e
            },
            isPlainObject: function(e) {
                if (!e || y.type(e) !== "object" || e.nodeType || y.isWindow(e))
                    return !1;
                try {
                    if (e.constructor && !m.call(e, "constructor") && !m.call(e.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (n) {
                    return !1
                }
                var r;
                for (r in e)
                ;
                return r === t || m.call(e, r)
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            },
            error: function(e) {
                throw new Error(e)
            },
            parseHTML: function(e, t, n) {
                if (!e || typeof e != "string")
                    return null;
                typeof t == "boolean" && (n = t,
                        t = !1),
                    t = t || i;
                var r = x.exec(e),
                    s = !n && [];
                return r ? [t.createElement(r[1])] : (r = y.buildFragment([e], t, s),
                    s && y(s).remove(),
                    y.merge([], r.childNodes))
            },
            parseJSON: function(t) {
                if (e.JSON && e.JSON.parse)
                    return e.JSON.parse(t);
                if (t === null)
                    return t;
                if (typeof t == "string") {
                    t = y.trim(t);
                    if (t && T.test(t.replace(C, "@").replace(k, "]").replace(N, "")))
                        return (new Function("return " + t))()
                }
                y.error("Invalid JSON: " + t)
            },
            parseXML: function(n) {
                var r, i;
                if (!n || typeof n != "string")
                    return null;
                try {
                    e.DOMParser ? (i = new DOMParser,
                        r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"),
                        r.async = "false",
                        r.loadXML(n))
                } catch (s) {
                    r = t
                }
                return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && y.error("Invalid XML: " + n),
                    r
            },
            noop: function() {},
            globalEval: function(t) {
                t && y.trim(t) && (e.execScript || function(t) {
                    e.eval.call(e, t)
                })(t)
            },
            camelCase: function(e) {
                return e.replace(L, "ms-").replace(A, O)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t, n) {
                var r, i = 0,
                    s = e.length,
                    o = _(e);
                if (n)
                    if (o)
                        for (; i < s; i++) {
                            r = t.apply(e[i], n);
                            if (r === !1)
                                break
                        }
                    else
                        for (i in e) {
                            r = t.apply(e[i], n);
                            if (r === !1)
                                break
                        }
                else if (o)
                    for (; i < s; i++) {
                        r = t.call(e[i], i, e[i]);
                        if (r === !1)
                            break
                    }
                else
                    for (i in e) {
                        r = t.call(e[i], i, e[i]);
                        if (r === !1)
                            break
                    }
                return e
            },
            trim: g && !g.call("﻿ ") ? function(e) {
                    return e == null ? "" : g.call(e)
                } :
                function(e) {
                    return e == null ? "" : (e + "").replace(E, "")
                },
            makeArray: function(e, t) {
                var n = t || [];
                return e != null && (_(Object(e)) ? y.merge(n, typeof e == "string" ? [e] : e) : h.call(n, e)),
                    n
            },
            inArray: function(e, t, n) {
                var r;
                if (t) {
                    if (d)
                        return d.call(t, e, n);
                    r = t.length,
                        n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                    for (; n < r; n++)
                        if (n in t && t[n] === e)
                            return n
                }
                return -1
            },
            merge: function(e, n) {
                var r = n.length,
                    i = e.length,
                    s = 0;
                if (typeof r == "number")
                    for (; s < r; s++)
                        e[i++] = n[s];
                else
                    while (n[s] !== t)
                        e[i++] = n[s++];
                return e.length = i,
                    e
            },
            grep: function(e, t, n) {
                var r, i = [],
                    s = 0,
                    o = e.length;
                n = !!n;
                for (; s < o; s++)
                    r = !!t(e[s], s),
                    n !== r && i.push(e[s]);
                return i
            },
            map: function(e, t, n) {
                var r, i = 0,
                    s = e.length,
                    o = _(e),
                    u = [];
                if (o)
                    for (; i < s; i++)
                        r = t(e[i], i, n),
                        r != null && (u[u.length] = r);
                else
                    for (i in e)
                        r = t(e[i], i, n),
                        r != null && (u[u.length] = r);
                return c.apply([], u)
            },
            guid: 1,
            proxy: function(e, n) {
                var r, i, s;
                return typeof n == "string" && (r = e[n],
                        n = e,
                        e = r),
                    y.isFunction(e) ? (i = p.call(arguments, 2),
                        s = function() {
                            return e.apply(n || this, i.concat(p.call(arguments)))
                        },
                        s.guid = e.guid = e.guid || y.guid++,
                        s) : t
            },
            access: function(e, n, r, i, s, o, u) {
                var a = 0,
                    f = e.length,
                    l = r == null;
                if (y.type(r) === "object") {
                    s = !0;
                    for (a in r)
                        y.access(e, n, a, r[a], !0, o, u)
                } else if (i !== t) {
                    s = !0,
                        y.isFunction(i) || (u = !0),
                        l && (u ? (n.call(e, i),
                            n = null) : (l = n,
                            n = function(e, t, n) {
                                return l.call(y(e), n)
                            }
                        ));
                    if (n)
                        for (; a < f; a++)
                            n(e[a], r, u ? i : i.call(e[a], a, n(e[a], r)))
                }
                return s ? e : l ? n.call(e) : f ? n(e[0], r) : o
            },
            now: function() {
                return (new Date).getTime()
            }
        }),
        y.ready.promise = function(t) {
            if (!r) {
                r = y.Deferred();
                if (i.readyState === "complete")
                    setTimeout(y.ready);
                else if (i.addEventListener)
                    i.addEventListener("DOMContentLoaded", M, !1),
                    e.addEventListener("load", y.ready, !1);
                else {
                    i.attachEvent("onreadystatechange", M),
                        e.attachEvent("onload", y.ready);
                    var n = !1;
                    try {
                        n = e.frameElement == null && i.documentElement
                    } catch (s) {}
                    n && n.doScroll && function o() {
                            if (!y.isReady) {
                                try {
                                    n.doScroll("left")
                                } catch (e) {
                                    return setTimeout(o, 50)
                                }
                                y.ready()
                            }
                        }
                        ()
                }
            }
            return r.promise(t)
        },
        y.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            a["[object " + t + "]"] = t.toLowerCase()
        }),
        n = y(i);
    var D = {};
    y.Callbacks = function(e) {
            e = typeof e == "string" ? D[e] || P(e) : y.extend({}, e);
            var n, r, i, s, o, u, a = [],
                f = !e.once && [],
                l = function(t) {
                    n = e.memory && t,
                        r = !0,
                        u = s || 0,
                        s = 0,
                        o = a.length,
                        i = !0;
                    for (; a && u < o; u++)
                        if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                            n = !1;
                            break
                        }
                    i = !1,
                        a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable())
                },
                c = {
                    add: function() {
                        if (a) {
                            var t = a.length;
                            (function r(t) {
                                y.each(t, function(t, n) {
                                    var i = y.type(n);
                                    i === "function" ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && i !== "string" && r(n)
                                })
                            })(arguments),
                            i ? o = a.length : n && (s = t,
                                l(n))
                        }
                        return this
                    },
                    remove: function() {
                        return a && y.each(arguments, function(e, t) {
                                var n;
                                while ((n = y.inArray(t, a, n)) > -1)
                                    a.splice(n, 1),
                                    i && (n <= o && o--,
                                        n <= u && u--)
                            }),
                            this
                    },
                    has: function(e) {
                        return y.inArray(e, a) > -1
                    },
                    empty: function() {
                        return a = [],
                            this
                    },
                    disable: function() {
                        return a = f = n = t,
                            this
                    },
                    disabled: function() {
                        return !a
                    },
                    lock: function() {
                        return f = t,
                            n || c.disable(),
                            this
                    },
                    locked: function() {
                        return !f
                    },
                    fireWith: function(e, t) {
                        return t = t || [],
                            t = [e, t.slice ? t.slice() : t],
                            a && (!r || f) && (i ? f.push(t) : l(t)),
                            this
                    },
                    fire: function() {
                        return c.fireWith(this, arguments),
                            this
                    },
                    fired: function() {
                        return !!r
                    }
                };
            return c
        },
        y.extend({
            Deferred: function(e) {
                var t = [
                        ["resolve", "done", y.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", y.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", y.Callbacks("memory")]
                    ],
                    n = "pending",
                    r = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return i.done(arguments).fail(arguments),
                                this
                        },
                        then: function() {
                            var e = arguments;
                            return y.Deferred(function(n) {
                                y.each(t, function(t, s) {
                                        var o = s[0],
                                            u = y.isFunction(e[t]) && e[t];
                                        i[s[1]](function() {
                                            var e = u && u.apply(this, arguments);
                                            e && y.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === r ? n.promise() : this, u ? [e] : arguments)
                                        })
                                    }),
                                    e = null
                            }).promise()
                        },
                        promise: function(e) {
                            return e != null ? y.extend(e, r) : r
                        }
                    },
                    i = {};
                return r.pipe = r.then,
                    y.each(t, function(e, s) {
                        var o = s[2],
                            u = s[3];
                        r[s[1]] = o.add,
                            u && o.add(function() {
                                n = u
                            }, t[e ^ 1][2].disable, t[2][2].lock),
                            i[s[0]] = function() {
                                return i[s[0] + "With"](this === i ? r : this, arguments),
                                    this
                            },
                            i[s[0] + "With"] = o.fireWith
                    }),
                    r.promise(i),
                    e && e.call(i, i),
                    i
            },
            when: function(e) {
                var t = 0,
                    n = p.call(arguments),
                    r = n.length,
                    i = r !== 1 || e && y.isFunction(e.promise) ? r : 0,
                    s = i === 1 ? e : y.Deferred(),
                    o = function(e, t, n) {
                        return function(r) {
                            t[e] = this,
                                n[e] = arguments.length > 1 ? p.call(arguments) : r,
                                n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
                        }
                    },
                    u, a, f;
                if (r > 1) {
                    u = new Array(r),
                        a = new Array(r),
                        f = new Array(r);
                    for (; t < r; t++)
                        n[t] && y.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
                }
                return i || s.resolveWith(f, n),
                    s.promise()
            }
        }),
        y.support = function() {
            var t, n, r, s, o, u, a, f, l, c, h = i.createElement("div");
            h.setAttribute("className", "t"),
                h.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                n = h.getElementsByTagName("*"),
                r = h.getElementsByTagName("a")[0];
            if (!n || !r || !n.length)
                return {};
            s = i.createElement("select"),
                o = s.appendChild(i.createElement("option")),
                u = h.getElementsByTagName("input")[0],
                r.style.cssText = "top:1px;float:left;opacity:.5",
                t = {
                    getSetAttribute: h.className !== "t",
                    leadingWhitespace: h.firstChild.nodeType === 3,
                    tbody: !h.getElementsByTagName("tbody").length,
                    htmlSerialize: !!h.getElementsByTagName("link").length,
                    style: /top/.test(r.getAttribute("style")),
                    hrefNormalized: r.getAttribute("href") === "/a",
                    opacity: /^0.5/.test(r.style.opacity),
                    cssFloat: !!r.style.cssFloat,
                    checkOn: !!u.value,
                    optSelected: o.selected,
                    enctype: !!i.createElement("form").enctype,
                    html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
                    boxModel: i.compatMode === "CSS1Compat",
                    deleteExpando: !0,
                    noCloneEvent: !0,
                    inlineBlockNeedsLayout: !1,
                    shrinkWrapBlocks: !1,
                    reliableMarginRight: !0,
                    boxSizingReliable: !0,
                    pixelPosition: !1
                },
                u.checked = !0,
                t.noCloneChecked = u.cloneNode(!0).checked,
                s.disabled = !0,
                t.optDisabled = !o.disabled;
            try {
                delete h.test
            } catch (p) {
                t.deleteExpando = !1
            }
            u = i.createElement("input"),
                u.setAttribute("value", ""),
                t.input = u.getAttribute("value") === "",
                u.value = "t",
                u.setAttribute("type", "radio"),
                t.radioValue = u.value === "t",
                u.setAttribute("checked", "t"),
                u.setAttribute("name", "t"),
                a = i.createDocumentFragment(),
                a.appendChild(u),
                t.appendChecked = u.checked,
                t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked,
                h.attachEvent && (h.attachEvent("onclick", function() {
                        t.noCloneEvent = !1
                    }),
                    h.cloneNode(!0).click());
            for (c in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                })
                h.setAttribute(f = "on" + c, "t"),
                t[c + "Bubbles"] = f in e || h.attributes[f].expando === !1;
            return h.style.backgroundClip = "content-box",
                h.cloneNode(!0).style.backgroundClip = "",
                t.clearCloneStyle = h.style.backgroundClip === "content-box",
                y(function() {
                    var n, r, s, o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                        u = i.getElementsByTagName("body")[0];
                    if (!u)
                        return;
                    n = i.createElement("div"),
                        n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",
                        u.appendChild(n).appendChild(h),
                        h.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
                        s = h.getElementsByTagName("td"),
                        s[0].style.cssText = "padding:0;margin:0;border:0;display:none",
                        l = s[0].offsetHeight === 0,
                        s[0].style.display = "",
                        s[1].style.display = "none",
                        t.reliableHiddenOffsets = l && s[0].offsetHeight === 0,
                        h.innerHTML = "",
                        h.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
                        t.boxSizing = h.offsetWidth === 4,
                        t.doesNotIncludeMarginInBodyOffset = u.offsetTop !== 1,
                        e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(h, null) || {}).top !== "1%",
                            t.boxSizingReliable = (e.getComputedStyle(h, null) || {
                                width: "4px"
                            }).width === "4px",
                            r = h.appendChild(i.createElement("div")),
                            r.style.cssText = h.style.cssText = o,
                            r.style.marginRight = r.style.width = "0",
                            h.style.width = "1px",
                            t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)),
                        typeof h.style.zoom != "undefined" && (h.innerHTML = "",
                            h.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1",
                            t.inlineBlockNeedsLayout = h.offsetWidth === 3,
                            h.style.display = "block",
                            h.innerHTML = "<div></div>",
                            h.firstChild.style.width = "5px",
                            t.shrinkWrapBlocks = h.offsetWidth !== 3,
                            u.style.zoom = 1),
                        u.removeChild(n),
                        n = h = s = r = null
                }),
                n = s = a = o = r = u = null,
                t
        }
        ();
    var H = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        B = /([A-Z])/g;
    y.extend({
            cache: {},
            expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: !0
            },
            hasData: function(e) {
                return e = e.nodeType ? y.cache[e[y.expando]] : e[y.expando], !!e && !q(e)
            },
            data: function(e, t, n) {
                return j(e, t, n, !1)
            },
            removeData: function(e, t) {
                return F(e, t, !1)
            },
            _data: function(e, t, n) {
                return j(e, t, n, !0)
            },
            _removeData: function(e, t) {
                return F(e, t, !0)
            },
            acceptData: function(e) {
                var t = e.nodeName && y.noData[e.nodeName.toLowerCase()];
                return !t || t !== !0 && e.getAttribute("classid") === t
            }
        }),
        y.fn.extend({
            data: function(e, n) {
                var r, i, s = this[0],
                    o = 0,
                    u = null;
                if (e === t) {
                    if (this.length) {
                        u = y.data(s);
                        if (s.nodeType === 1 && !y._data(s, "parsedAttrs")) {
                            r = s.attributes;
                            for (; o < r.length; o++)
                                i = r[o].name,
                                i.indexOf("data-") || (i = y.camelCase(i.substring(5)),
                                    I(s, i, u[i]));
                            y._data(s, "parsedAttrs", !0)
                        }
                    }
                    return u
                }
                return typeof e == "object" ? this.each(function() {
                    y.data(this, e)
                }) : y.access(this, function(n) {
                    if (n === t)
                        return s ? I(s, e, y.data(s, e)) : null;
                    this.each(function() {
                        y.data(this, e, n)
                    })
                }, null, n, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    y.removeData(this, e)
                })
            }
        }),
        y.extend({
            queue: function(e, t, n) {
                var r;
                if (e)
                    return t = (t || "fx") + "queue",
                        r = y._data(e, t),
                        n && (!r || y.isArray(n) ? r = y._data(e, t, y.makeArray(n)) : r.push(n)),
                        r || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = y.queue(e, t),
                    r = n.length,
                    i = n.shift(),
                    s = y._queueHooks(e, t),
                    o = function() {
                        y.dequeue(e, t)
                    };
                i === "inprogress" && (i = n.shift(),
                        r--),
                    s.cur = i,
                    i && (t === "fx" && n.unshift("inprogress"),
                        delete s.stop,
                        i.call(e, o, s)), !r && s && s.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return y._data(e, n) || y._data(e, n, {
                    empty: y.Callbacks("once memory").add(function() {
                        y._removeData(e, t + "queue"),
                            y._removeData(e, n)
                    })
                })
            }
        }),
        y.fn.extend({
            queue: function(e, n) {
                var r = 2;
                return typeof e != "string" && (n = e,
                        e = "fx",
                        r--),
                    arguments.length < r ? y.queue(this[0], e) : n === t ? this : this.each(function() {
                        var t = y.queue(this, e, n);
                        y._queueHooks(this, e),
                            e === "fx" && t[0] !== "inprogress" && y.dequeue(this, e)
                    })
            },
            dequeue: function(e) {
                return this.each(function() {
                    y.dequeue(this, e)
                })
            },
            delay: function(e, t) {
                return e = y.fx ? y.fx.speeds[e] || e : e,
                    t = t || "fx",
                    this.queue(t, function(t, n) {
                        var r = setTimeout(t, e);
                        n.stop = function() {
                            clearTimeout(r)
                        }
                    })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, n) {
                var r, i = 1,
                    s = y.Deferred(),
                    o = this,
                    u = this.length,
                    a = function() {
                        --i || s.resolveWith(o, [o])
                    };
                typeof e != "string" && (n = e,
                        e = t),
                    e = e || "fx";
                while (u--)
                    r = y._data(o[u], e + "queueHooks"),
                    r && r.empty && (i++,
                        r.empty.add(a));
                return a(),
                    s.promise(n)
            }
        });
    var R, U, z = /[\t\r\n]/g,
        W = /\r/g,
        X = /^(?:input|select|textarea|button|object)$/i,
        V = /^(?:a|area)$/i,
        $ = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
        J = /^(?:checked|selected)$/i,
        K = y.support.getSetAttribute,
        Q = y.support.input;
    y.fn.extend({
            attr: function(e, t) {
                return y.access(this, y.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    y.removeAttr(this, e)
                })
            },
            prop: function(e, t) {
                return y.access(this, y.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return e = y.propFix[e] || e,
                    this.each(function() {
                        try {
                            this[e] = t,
                                delete this[e]
                        } catch (n) {}
                    })
            },
            addClass: function(e) {
                var t, n, r, i, s, o = 0,
                    u = this.length,
                    a = typeof e == "string" && e;
                if (y.isFunction(e))
                    return this.each(function(t) {
                        y(this).addClass(e.call(this, t, this.className))
                    });
                if (a) {
                    t = (e || "").match(w) || [];
                    for (; o < u; o++) {
                        n = this[o],
                            r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(z, " ") : " ");
                        if (r) {
                            s = 0;
                            while (i = t[s++])
                                r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                            n.className = y.trim(r)
                        }
                    }
                }
                return this
            },
            removeClass: function(e) {
                var t, n, r, i, s, o = 0,
                    u = this.length,
                    a = arguments.length === 0 || typeof e == "string" && e;
                if (y.isFunction(e))
                    return this.each(function(t) {
                        y(this).removeClass(e.call(this, t, this.className))
                    });
                if (a) {
                    t = (e || "").match(w) || [];
                    for (; o < u; o++) {
                        n = this[o],
                            r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(z, " ") : "");
                        if (r) {
                            s = 0;
                            while (i = t[s++])
                                while (r.indexOf(" " + i + " ") >= 0)
                                    r = r.replace(" " + i + " ", " ");
                            n.className = e ? y.trim(r) : ""
                        }
                    }
                }
                return this
            },
            toggleClass: function(e, t) {
                var n = typeof e,
                    r = typeof t == "boolean";
                return y.isFunction(e) ? this.each(function(n) {
                    y(this).toggleClass(e.call(this, n, this.className, t), t)
                }) : this.each(function() {
                    if (n === "string") {
                        var i, s = 0,
                            o = y(this),
                            u = t,
                            a = e.match(w) || [];
                        while (i = a[s++])
                            u = r ? u : !o.hasClass(i),
                            o[u ? "addClass" : "removeClass"](i)
                    } else if (n === "undefined" || n === "boolean")
                        this.className && y._data(this, "__className__", this.className),
                        this.className = this.className || e === !1 ? "" : y._data(this, "__className__") || ""
                })
            },
            hasClass: function(e) {
                var t = " " + e + " ",
                    n = 0,
                    r = this.length;
                for (; n < r; n++)
                    if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(z, " ").indexOf(t) >= 0)
                        return !0;
                return !1
            },
            val: function(e) {
                var n, r, i, s = this[0];
                if (!arguments.length) {
                    if (s)
                        return n = y.valHooks[s.type] || y.valHooks[s.nodeName.toLowerCase()],
                            n && "get" in n && (r = n.get(s, "value")) !== t ? r : (r = s.value,
                                typeof r == "string" ? r.replace(W, "") : r == null ? "" : r);
                    return
                }
                return i = y.isFunction(e),
                    this.each(function(r) {
                        var s, o = y(this);
                        if (this.nodeType !== 1)
                            return;
                        i ? s = e.call(this, r, o.val()) : s = e,
                            s == null ? s = "" : typeof s == "number" ? s += "" : y.isArray(s) && (s = y.map(s, function(e) {
                                return e == null ? "" : e + ""
                            })),
                            n = y.valHooks[this.type] || y.valHooks[this.nodeName.toLowerCase()];
                        if (!n || !("set" in n) || n.set(this, s, "value") === t)
                            this.value = s
                    })
            }
        }),
        y.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = e.attributes.value;
                        return !t || t.specified ? e.value : e.text
                    }
                },
                select: {
                    get: function(e) {
                        var t, n, r = e.options,
                            i = e.selectedIndex,
                            s = e.type === "select-one" || i < 0,
                            o = s ? null : [],
                            u = s ? i + 1 : r.length,
                            a = i < 0 ? u : s ? i : 0;
                        for (; a < u; a++) {
                            n = r[a];
                            if ((n.selected || a === i) && (y.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !y.nodeName(n.parentNode, "optgroup"))) {
                                t = y(n).val();
                                if (s)
                                    return t;
                                o.push(t)
                            }
                        }
                        return o
                    },
                    set: function(e, t) {
                        var n = y.makeArray(t);
                        return y(e).find("option").each(function() {
                                this.selected = y.inArray(y(this).val(), n) >= 0
                            }),
                            n.length || (e.selectedIndex = -1),
                            n
                    }
                }
            },
            attr: function(e, n, r) {
                var i, s, o, u = e.nodeType;
                if (!e || u === 3 || u === 8 || u === 2)
                    return;
                if (typeof e.getAttribute == "undefined")
                    return y.prop(e, n, r);
                o = u !== 1 || !y.isXMLDoc(e),
                    o && (n = n.toLowerCase(),
                        s = y.attrHooks[n] || ($.test(n) ? U : R));
                if (r === t)
                    return s && o && "get" in s && (i = s.get(e, n)) !== null ? i : (typeof e.getAttribute != "undefined" && (i = e.getAttribute(n)),
                        i == null ? t : i);
                if (r !== null)
                    return s && o && "set" in s && (i = s.set(e, r, n)) !== t ? i : (e.setAttribute(n, r + ""),
                        r);
                y.removeAttr(e, n)
            },
            removeAttr: function(e, t) {
                var n, r, i = 0,
                    s = t && t.match(w);
                if (s && e.nodeType === 1)
                    while (n = s[i++])
                        r = y.propFix[n] || n,
                        $.test(n) ? !K && J.test(n) ? e[y.camelCase("default-" + n)] = e[r] = !1 : e[r] = !1 : y.attr(e, n, ""),
                        e.removeAttribute(K ? n : r)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!y.support.radioValue && t === "radio" && y.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t),
                                n && (e.value = n),
                                t
                        }
                    }
                }
            },
            propFix: {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            },
            prop: function(e, n, r) {
                var i, s, o, u = e.nodeType;
                if (!e || u === 3 || u === 8 || u === 2)
                    return;
                return o = u !== 1 || !y.isXMLDoc(e),
                    o && (n = y.propFix[n] || n,
                        s = y.propHooks[n]),
                    r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && (i = s.get(e, n)) !== null ? i : e[n]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var n = e.getAttributeNode("tabindex");
                        return n && n.specified ? parseInt(n.value, 10) : X.test(e.nodeName) || V.test(e.nodeName) && e.href ? 0 : t
                    }
                }
            }
        }),
        U = {
            get: function(e, n) {
                var r = y.prop(e, n),
                    i = typeof r == "boolean" && e.getAttribute(n),
                    s = typeof r == "boolean" ? Q && K ? i != null : J.test(n) ? e[y.camelCase("default-" + n)] : !!i : e.getAttributeNode(n);
                return s && s.value !== !1 ? n.toLowerCase() : t
            },
            set: function(e, t, n) {
                return t === !1 ? y.removeAttr(e, n) : Q && K || !J.test(n) ? e.setAttribute(!K && y.propFix[n] || n, n) : e[y.camelCase("default-" + n)] = e[n] = !0,
                    n
            }
        };
    if (!Q || !K)
        y.attrHooks.value = {
            get: function(e, n) {
                var r = e.getAttributeNode(n);
                return y.nodeName(e, "input") ? e.defaultValue : r && r.specified ? r.value : t
            },
            set: function(e, t, n) {
                if (!y.nodeName(e, "input"))
                    return R && R.set(e, t, n);
                e.defaultValue = t
            }
        };
    K || (R = y.valHooks.button = {
                get: function(e, n) {
                    var r = e.getAttributeNode(n);
                    return r && (n === "id" || n === "name" || n === "coords" ? r.value !== "" : r.specified) ? r.value : t
                },
                set: function(e, n, r) {
                    var i = e.getAttributeNode(r);
                    return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)),
                        i.value = n += "",
                        r === "value" || n === e.getAttribute(r) ? n : t
                }
            },
            y.attrHooks.contenteditable = {
                get: R.get,
                set: function(e, t, n) {
                    R.set(e, t === "" ? !1 : t, n)
                }
            },
            y.each(["width", "height"], function(e, t) {
                y.attrHooks[t] = y.extend(y.attrHooks[t], {
                    set: function(e, n) {
                        if (n === "")
                            return e.setAttribute(t, "auto"),
                                n
                    }
                })
            })),
        y.support.hrefNormalized || (y.each(["href", "src", "width", "height"], function(e, n) {
                y.attrHooks[n] = y.extend(y.attrHooks[n], {
                    get: function(e) {
                        var r = e.getAttribute(n, 2);
                        return r == null ? t : r
                    }
                })
            }),
            y.each(["href", "src"], function(e, t) {
                y.propHooks[t] = {
                    get: function(e) {
                        return e.getAttribute(t, 4)
                    }
                }
            })),
        y.support.style || (y.attrHooks.style = {
            get: function(e) {
                return e.style.cssText || t
            },
            set: function(e, t) {
                return e.style.cssText = t + ""
            }
        }),
        y.support.optSelected || (y.propHooks.selected = y.extend(y.propHooks.selected, {
            get: function(e) {
                var t = e.parentNode;
                return t && (t.selectedIndex,
                        t.parentNode && t.parentNode.selectedIndex),
                    null
            }
        })),
        y.support.enctype || (y.propFix.enctype = "encoding"),
        y.support.checkOn || y.each(["radio", "checkbox"], function() {
            y.valHooks[this] = {
                get: function(e) {
                    return e.getAttribute("value") === null ? "on" : e.value
                }
            }
        }),
        y.each(["radio", "checkbox"], function() {
            y.valHooks[this] = y.extend(y.valHooks[this], {
                set: function(e, t) {
                    if (y.isArray(t))
                        return e.checked = y.inArray(y(e).val(), t) >= 0
                }
            })
        });
    var G = /^(?:input|select|textarea)$/i,
        Y = /^key/,
        Z = /^(?:mouse|contextmenu)|click/,
        et = /^(?:focusinfocus|focusoutblur)$/,
        tt = /^([^.]*)(?:\.(.+)|)$/;
    y.event = {
            global: {},
            add: function(e, n, r, i, s) {
                var o, u, a, f, l, c, h, p, d, v, m, g = e.nodeType !== 3 && e.nodeType !== 8 && y._data(e);
                if (!g)
                    return;
                r.handler && (o = r,
                        r = o.handler,
                        s = o.selector),
                    r.guid || (r.guid = y.guid++),
                    (f = g.events) || (f = g.events = {}),
                    (u = g.handle) || (u = g.handle = function(e) {
                            return typeof y == "undefined" || !!e && y.event.triggered === e.type ? t : y.event.dispatch.apply(u.elem, arguments)
                        },
                        u.elem = e),
                    n = (n || "").match(w) || [""],
                    l = n.length;
                while (l--) {
                    a = tt.exec(n[l]) || [],
                        d = m = a[1],
                        v = (a[2] || "").split(".").sort(),
                        h = y.event.special[d] || {},
                        d = (s ? h.delegateType : h.bindType) || d,
                        h = y.event.special[d] || {},
                        c = y.extend({
                            type: d,
                            origType: m,
                            data: i,
                            handler: r,
                            guid: r.guid,
                            selector: s,
                            needsContext: s && y.expr.match.needsContext.test(s),
                            namespace: v.join(".")
                        }, o);
                    if (!(p = f[d])) {
                        p = f[d] = [],
                            p.delegateCount = 0;
                        if (!h.setup || h.setup.call(e, i, v, u) === !1)
                            e.addEventListener ? e.addEventListener(d, u, !1) : e.attachEvent && e.attachEvent("on" + d, u)
                    }
                    h.add && (h.add.call(e, c),
                            c.handler.guid || (c.handler.guid = r.guid)),
                        s ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                        y.event.global[d] = !0
                }
                e = null
            },
            remove: function(e, t, n, r, i) {
                var s, o, u, a, f, l, c, h, p, d, v, m = y.hasData(e) && y._data(e);
                if (!m || !(a = m.events))
                    return;
                t = (t || "").match(w) || [""],
                    f = t.length;
                while (f--) {
                    u = tt.exec(t[f]) || [],
                        p = v = u[1],
                        d = (u[2] || "").split(".").sort();
                    if (!p) {
                        for (p in a)
                            y.event.remove(e, p + t[f], n, r, !0);
                        continue
                    }
                    c = y.event.special[p] || {},
                        p = (r ? c.delegateType : c.bindType) || p,
                        h = a[p] || [],
                        u = u[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        o = s = h.length;
                    while (s--)
                        l = h[s],
                        (i || v === l.origType) && (!n || n.guid === l.guid) && (!u || u.test(l.namespace)) && (!r || r === l.selector || r === "**" && l.selector) && (h.splice(s, 1),
                            l.selector && h.delegateCount--,
                            c.remove && c.remove.call(e, l));
                    o && !h.length && ((!c.teardown || c.teardown.call(e, d, m.handle) === !1) && y.removeEvent(e, p, m.handle),
                        delete a[p])
                }
                y.isEmptyObject(a) && (delete m.handle,
                    y._removeData(e, "events"))
            },
            trigger: function(n, r, s, o) {
                var u, a, f, l, c, h, p, d = [s || i],
                    v = n.type || n,
                    m = n.namespace ? n.namespace.split(".") : [];
                a = f = s = s || i;
                if (s.nodeType === 3 || s.nodeType === 8)
                    return;
                if (et.test(v + y.event.triggered))
                    return;
                v.indexOf(".") >= 0 && (m = v.split("."),
                        v = m.shift(),
                        m.sort()),
                    c = v.indexOf(":") < 0 && "on" + v,
                    n = n[y.expando] ? n : new y.Event(v, typeof n == "object" && n),
                    n.isTrigger = !0,
                    n.namespace = m.join("."),
                    n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                    n.result = t,
                    n.target || (n.target = s),
                    r = r == null ? [n] : y.makeArray(r, [n]),
                    p = y.event.special[v] || {};
                if (!o && p.trigger && p.trigger.apply(s, r) === !1)
                    return;
                if (!o && !p.noBubble && !y.isWindow(s)) {
                    l = p.delegateType || v,
                        et.test(l + v) || (a = a.parentNode);
                    for (; a; a = a.parentNode)
                        d.push(a),
                        f = a;
                    f === (s.ownerDocument || i) && d.push(f.defaultView || f.parentWindow || e)
                }
                u = 0;
                while ((a = d[u++]) && !n.isPropagationStopped())
                    n.type = u > 1 ? l : p.bindType || v,
                    h = (y._data(a, "events") || {})[n.type] && y._data(a, "handle"),
                    h && h.apply(a, r),
                    h = c && a[c],
                    h && y.acceptData(a) && h.apply && h.apply(a, r) === !1 && n.preventDefault();
                n.type = v;
                if (!o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (v !== "click" || !y.nodeName(s, "a")) && y.acceptData(s) && c && s[v] && !y.isWindow(s)) {
                    f = s[c],
                        f && (s[c] = null),
                        y.event.triggered = v;
                    try {
                        s[v]()
                    } catch (g) {}
                    y.event.triggered = t,
                        f && (s[c] = f)
                }
                return n.result
            },
            dispatch: function(e) {
                e = y.event.fix(e);
                var n, r, i, s, o, u = [],
                    a = p.call(arguments),
                    f = (y._data(this, "events") || {})[e.type] || [],
                    l = y.event.special[e.type] || {};
                a[0] = e,
                    e.delegateTarget = this;
                if (l.preDispatch && l.preDispatch.call(this, e) === !1)
                    return;
                u = y.event.handlers.call(this, e, f),
                    n = 0;
                while ((s = u[n++]) && !e.isPropagationStopped()) {
                    e.currentTarget = s.elem,
                        r = 0;
                    while ((o = s.handlers[r++]) && !e.isImmediatePropagationStopped())
                        if (!e.namespace_re || e.namespace_re.test(o.namespace))
                            e.handleObj = o,
                            e.data = o.data,
                            i = ((y.event.special[o.origType] || {}).handle || o.handler).apply(s.elem, a),
                            i !== t && (e.result = i) === !1 && (e.preventDefault(),
                                e.stopPropagation())
                }
                return l.postDispatch && l.postDispatch.call(this, e),
                    e.result
            },
            handlers: function(e, n) {
                var r, i, s, o, u = [],
                    a = n.delegateCount,
                    f = e.target;
                if (a && f.nodeType && (!e.button || e.type !== "click"))
                    for (; f != this; f = f.parentNode || this)
                        if (f.disabled !== !0 || e.type !== "click") {
                            i = [];
                            for (r = 0; r < a; r++)
                                o = n[r],
                                s = o.selector + " ",
                                i[s] === t && (i[s] = o.needsContext ? y(s, this).index(f) >= 0 : y.find(s, this, null, [f]).length),
                                i[s] && i.push(o);
                            i.length && u.push({
                                elem: f,
                                handlers: i
                            })
                        }
                return a < n.length && u.push({
                        elem: this,
                        handlers: n.slice(a)
                    }),
                    u
            },
            fix: function(e) {
                if (e[y.expando])
                    return e;
                var t, n, r = e,
                    s = y.event.fixHooks[e.type] || {},
                    o = s.props ? this.props.concat(s.props) : this.props;
                e = new y.Event(r),
                    t = o.length;
                while (t--)
                    n = o[t],
                    e[n] = r[n];
                return e.target || (e.target = r.srcElement || i),
                    e.target.nodeType === 3 && (e.target = e.target.parentNode),
                    e.metaKey = !!e.metaKey,
                    s.filter ? s.filter(e, r) : e
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode),
                        e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, n) {
                    var r, s, o, u = n.button,
                        a = n.fromElement;
                    return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i,
                            s = r.documentElement,
                            o = r.body,
                            e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0),
                            e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0),
                        e
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    trigger: function() {
                        if (y.nodeName(this, "input") && this.type === "checkbox" && this.click)
                            return this.click(), !1
                    }
                },
                focus: {
                    trigger: function() {
                        if (this !== i.activeElement && this.focus)
                            try {
                                return this.focus(), !1
                            } catch (e) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === i.activeElement && this.blur)
                            return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                beforeunload: {
                    postDispatch: function(e) {
                        e.result !== t && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function(e, t, n, r) {
                var i = y.extend(new y.Event, n, {
                    type: e,
                    isSimulated: !0,
                    originalEvent: {}
                });
                r ? y.event.trigger(i, null, t) : y.event.dispatch.call(t, i),
                    i.isDefaultPrevented() && n.preventDefault()
            }
        },
        y.removeEvent = i.removeEventListener ? function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        } :
        function(e, t, n) {
            var r = "on" + t;
            e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null),
                e.detachEvent(r, n))
        },
        y.Event = function(e, t) {
            if (!(this instanceof y.Event))
                return new y.Event(e, t);
            e && e.type ? (this.originalEvent = e,
                    this.type = e.type,
                    this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? nt : rt) : this.type = e,
                t && y.extend(this, t),
                this.timeStamp = e && e.timeStamp || y.now(),
                this[y.expando] = !0
        },
        y.Event.prototype = {
            isDefaultPrevented: rt,
            isPropagationStopped: rt,
            isImmediatePropagationStopped: rt,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = nt;
                if (!e)
                    return;
                e.preventDefault ? e.preventDefault() : e.returnValue = !1
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = nt;
                if (!e)
                    return;
                e.stopPropagation && e.stopPropagation(),
                    e.cancelBubble = !0
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = nt,
                    this.stopPropagation()
            }
        },
        y.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(e, t) {
            y.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, r = this,
                        i = e.relatedTarget,
                        s = e.handleObj;
                    if (!i || i !== r && !y.contains(r, i))
                        e.type = s.origType,
                        n = s.handler.apply(this, arguments),
                        e.type = t;
                    return n
                }
            }
        }),
        y.support.submitBubbles || (y.event.special.submit = {
            setup: function() {
                if (y.nodeName(this, "form"))
                    return !1;
                y.event.add(this, "click._submit keypress._submit", function(e) {
                    var n = e.target,
                        r = y.nodeName(n, "input") || y.nodeName(n, "button") ? n.form : t;
                    r && !y._data(r, "submitBubbles") && (y.event.add(r, "submit._submit", function(e) {
                            e._submit_bubble = !0
                        }),
                        y._data(r, "submitBubbles", !0))
                })
            },
            postDispatch: function(e) {
                e._submit_bubble && (delete e._submit_bubble,
                    this.parentNode && !e.isTrigger && y.event.simulate("submit", this.parentNode, e, !0))
            },
            teardown: function() {
                if (y.nodeName(this, "form"))
                    return !1;
                y.event.remove(this, "._submit")
            }
        }),
        y.support.changeBubbles || (y.event.special.change = {
            setup: function() {
                if (G.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio")
                        y.event.add(this, "propertychange._change", function(e) {
                            e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                        }),
                        y.event.add(this, "click._change", function(e) {
                            this._just_changed && !e.isTrigger && (this._just_changed = !1),
                                y.event.simulate("change", this, e, !0)
                        });
                    return !1
                }
                y.event.add(this, "beforeactivate._change", function(e) {
                    var t = e.target;
                    G.test(t.nodeName) && !y._data(t, "changeBubbles") && (y.event.add(t, "change._change", function(e) {
                            this.parentNode && !e.isSimulated && !e.isTrigger && y.event.simulate("change", this.parentNode, e, !0)
                        }),
                        y._data(t, "changeBubbles", !0))
                })
            },
            handle: function(e) {
                var t = e.target;
                if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox")
                    return e.handleObj.handler.apply(this, arguments)
            },
            teardown: function() {
                return y.event.remove(this, "._change"), !G.test(this.nodeName)
            }
        }),
        y.support.focusinBubbles || y.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = 0,
                r = function(e) {
                    y.event.simulate(t, e.target, y.event.fix(e), !0)
                };
            y.event.special[t] = {
                setup: function() {
                    n++ === 0 && i.addEventListener(e, r, !0)
                },
                teardown: function() {
                    --n === 0 && i.removeEventListener(e, r, !0)
                }
            }
        }),
        y.fn.extend({
            on: function(e, n, r, i, s) {
                var o, u;
                if (typeof e == "object") {
                    typeof n != "string" && (r = r || n,
                        n = t);
                    for (u in e)
                        this.on(u, n, r, e[u], s);
                    return this
                }
                r == null && i == null ? (i = n,
                    r = n = t) : i == null && (typeof n == "string" ? (i = r,
                    r = t) : (i = r,
                    r = n,
                    n = t));
                if (i === !1)
                    i = rt;
                else if (!i)
                    return this;
                return s === 1 && (o = i,
                        i = function(e) {
                            return y().off(e),
                                o.apply(this, arguments)
                        },
                        i.guid = o.guid || (o.guid = y.guid++)),
                    this.each(function() {
                        y.event.add(this, e, i, r, n)
                    })
            },
            one: function(e, t, n, r) {
                return this.on(e, t, n, r, 1)
            },
            off: function(e, n, r) {
                var i, s;
                if (e && e.preventDefault && e.handleObj)
                    return i = e.handleObj,
                        y(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler),
                        this;
                if (typeof e == "object") {
                    for (s in e)
                        this.off(s, n, e[s]);
                    return this
                }
                if (n === !1 || typeof n == "function")
                    r = n,
                    n = t;
                return r === !1 && (r = rt),
                    this.each(function() {
                        y.event.remove(this, e, r, n)
                    })
            },
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function(e, t, n) {
                return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
            },
            trigger: function(e, t) {
                return this.each(function() {
                    y.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n)
                    return y.event.trigger(e, t, n, !0)
            },
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }),
        y.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            y.fn[t] = function(e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                },
                Y.test(t) && (y.event.fixHooks[t] = y.event.keyHooks),
                Z.test(t) && (y.event.fixHooks[t] = y.event.mouseHooks)
        }),
        function(e, t) {
            function rt(e) {
                return J.test(e + "")
            }

            function it() {
                var e, t = [];
                return e = function(n, r) {
                    return t.push(n += " ") > i.cacheLength && delete e[t.shift()],
                        e[n] = r
                }
            }

            function st(e) {
                return e[w] = !0,
                    e
            }

            function ot(e) {
                var t = c.createElement("div");
                try {
                    return e(t)
                } catch (n) {
                    return !1
                } finally {
                    t = null
                }
            }

            function ut(e, t, n, r) {
                var i, s, o, u, a, f, h, v, m, y;
                (t ? t.ownerDocument || t : E) !== c && l(t),
                    t = t || c,
                    n = n || [];
                if (!e || typeof e != "string")
                    return n;
                if ((u = t.nodeType) !== 1 && u !== 9)
                    return [];
                if (!p && !r) {
                    if (i = K.exec(e))
                        if (o = i[1]) {
                            if (u === 9) {
                                s = t.getElementById(o);
                                if (!s || !s.parentNode)
                                    return n;
                                if (s.id === o)
                                    return n.push(s),
                                        n
                            } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(o)) && g(t, s) && s.id === o)
                                return n.push(s),
                                    n
                        } else {
                            if (i[2])
                                return _.apply(n, D.call(t.getElementsByTagName(e), 0)),
                                    n;
                            if ((o = i[3]) && S.getByClassName && t.getElementsByClassName)
                                return _.apply(n, D.call(t.getElementsByClassName(o), 0)),
                                    n
                        }
                    if (S.qsa && !d.test(e)) {
                        h = !0,
                            v = w,
                            m = t,
                            y = u === 9 && e;
                        if (u === 1 && t.nodeName.toLowerCase() !== "object") {
                            f = ht(e),
                                (h = t.getAttribute("id")) ? v = h.replace(Y, "\\$&") : t.setAttribute("id", v),
                                v = "[id='" + v + "'] ",
                                a = f.length;
                            while (a--)
                                f[a] = v + pt(f[a]);
                            m = $.test(e) && t.parentNode || t,
                                y = f.join(",")
                        }
                        if (y)
                            try {
                                return _.apply(n, D.call(m.querySelectorAll(y), 0)),
                                    n
                            } catch (b) {} finally {
                                h || t.removeAttribute("id")
                            }
                    }
                }
                return Et(e.replace(R, "$1"), t, n, r)
            }

            function at(e, t) {
                var n = e && t && e.nextSibling;
                for (; n; n = n.nextSibling)
                    if (n === t)
                        return -1;
                return e ? 1 : -1
            }

            function ft(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return n === "input" && t.type === e
                }
            }

            function lt(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return (n === "input" || n === "button") && t.type === e
                }
            }

            function ct(e) {
                return st(function(t) {
                    return t = +t,
                        st(function(n, r) {
                            var i, s = e([], n.length, t),
                                o = s.length;
                            while (o--)
                                n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                        })
                })
            }

            function ht(e, t) {
                var n, r, s, o, u, a, f, l = C[e + " "];
                if (l)
                    return t ? 0 : l.slice(0);
                u = e,
                    a = [],
                    f = i.preFilter;
                while (u) {
                    if (!n || (r = U.exec(u)))
                        r && (u = u.slice(r[0].length) || u),
                        a.push(s = []);
                    n = !1;
                    if (r = z.exec(u))
                        n = r.shift(),
                        s.push({
                            value: n,
                            type: r[0].replace(R, " ")
                        }),
                        u = u.slice(n.length);
                    for (o in i.filter)
                        (r = V[o].exec(u)) && (!f[o] || (r = f[o](r))) && (n = r.shift(),
                            s.push({
                                value: n,
                                type: o,
                                matches: r
                            }),
                            u = u.slice(n.length));
                    if (!n)
                        break
                }
                return t ? u.length : u ? ut.error(e) : C(e, a).slice(0)
            }

            function pt(e) {
                var t = 0,
                    n = e.length,
                    r = "";
                for (; t < n; t++)
                    r += e[t].value;
                return r
            }

            function dt(e, t, n) {
                var i = t.dir,
                    s = n && t.dir === "parentNode",
                    o = T++;
                return t.first ? function(t, n, r) {
                        while (t = t[i])
                            if (t.nodeType === 1 || s)
                                return e(t, n, r)
                    } :
                    function(t, n, u) {
                        var a, f, l, c = x + " " + o;
                        if (u) {
                            while (t = t[i])
                                if (t.nodeType === 1 || s)
                                    if (e(t, n, u))
                                        return !0
                        } else
                            while (t = t[i])
                                if (t.nodeType === 1 || s) {
                                    l = t[w] || (t[w] = {});
                                    if ((f = l[i]) && f[0] === c) {
                                        if ((a = f[1]) === !0 || a === r)
                                            return a === !0
                                    } else {
                                        f = l[i] = [c],
                                            f[1] = e(t, n, u) || r;
                                        if (f[1] === !0)
                                            return !0
                                    }
                                }
                    }
            }

            function vt(e) {
                return e.length > 1 ? function(t, n, r) {
                        var i = e.length;
                        while (i--)
                            if (!e[i](t, n, r))
                                return !1;
                        return !0
                    } :
                    e[0]
            }

            function mt(e, t, n, r, i) {
                var s, o = [],
                    u = 0,
                    a = e.length,
                    f = t != null;
                for (; u < a; u++)
                    if (s = e[u])
                        if (!n || n(s, r, i))
                            o.push(s),
                            f && t.push(u);
                return o
            }

            function gt(e, t, n, r, i, s) {
                return r && !r[w] && (r = gt(r)),
                    i && !i[w] && (i = gt(i, s)),
                    st(function(s, o, u, a) {
                        var f, l, c, h = [],
                            p = [],
                            d = o.length,
                            v = s || wt(t || "*", u.nodeType ? [u] : u, []),
                            m = e && (s || !t) ? mt(v, h, e, u, a) : v,
                            g = n ? i || (s ? e : d || r) ? [] : o : m;
                        n && n(m, g, u, a);
                        if (r) {
                            f = mt(g, p),
                                r(f, [], u, a),
                                l = f.length;
                            while (l--)
                                if (c = f[l])
                                    g[p[l]] = !(m[p[l]] = c)
                        }
                        if (s) {
                            if (i || e) {
                                if (i) {
                                    f = [],
                                        l = g.length;
                                    while (l--)
                                        (c = g[l]) && f.push(m[l] = c);
                                    i(null, g = [], f, a)
                                }
                                l = g.length;
                                while (l--)
                                    (c = g[l]) && (f = i ? P.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                            }
                        } else
                            g = mt(g === o ? g.splice(d, g.length) : g),
                            i ? i(null, o, g, a) : _.apply(o, g)
                    })
            }

            function yt(e) {
                var t, n, r, s = e.length,
                    o = i.relative[e[0].type],
                    u = o || i.relative[" "],
                    a = o ? 1 : 0,
                    l = dt(function(e) {
                        return e === t
                    }, u, !0),
                    c = dt(function(e) {
                        return P.call(t, e) > -1
                    }, u, !0),
                    h = [function(e, n, r) {
                        return !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
                    }];
                for (; a < s; a++)
                    if (n = i.relative[e[a].type])
                        h = [dt(vt(h), n)];
                    else {
                        n = i.filter[e[a].type].apply(null, e[a].matches);
                        if (n[w]) {
                            r = ++a;
                            for (; r < s; r++)
                                if (i.relative[e[r].type])
                                    break;
                            return gt(a > 1 && vt(h), a > 1 && pt(e.slice(0, a - 1)).replace(R, "$1"), n, a < r && yt(e.slice(a, r)), r < s && yt(e = e.slice(r)), r < s && pt(e))
                        }
                        h.push(n)
                    }
                return vt(h)
            }

            function bt(e, t) {
                var n = 0,
                    s = t.length > 0,
                    o = e.length > 0,
                    u = function(u, a, l, h, p) {
                        var d, v, m, g = [],
                            y = 0,
                            b = "0",
                            w = u && [],
                            E = p != null,
                            S = f,
                            T = u || o && i.find.TAG("*", p && a.parentNode || a),
                            N = x += S == null ? 1 : Math.E;
                        E && (f = a !== c && a,
                            r = n);
                        for (;
                            (d = T[b]) != null; b++) {
                            if (o && d) {
                                for (v = 0; m = e[v]; v++)
                                    if (m(d, a, l)) {
                                        h.push(d);
                                        break
                                    }
                                E && (x = N,
                                    r = ++n)
                            }
                            s && ((d = !m && d) && y--,
                                u && w.push(d))
                        }
                        y += b;
                        if (s && b !== y) {
                            for (v = 0; m = t[v]; v++)
                                m(w, g, a, l);
                            if (u) {
                                if (y > 0)
                                    while (b--)
                                        !w[b] && !g[b] && (g[b] = M.call(h));
                                g = mt(g)
                            }
                            _.apply(h, g),
                                E && !u && g.length > 0 && y + t.length > 1 && ut.uniqueSort(h)
                        }
                        return E && (x = N,
                                f = S),
                            w
                    };
                return s ? st(u) : u
            }

            function wt(e, t, n) {
                var r = 0,
                    i = t.length;
                for (; r < i; r++)
                    ut(e, t[r], n);
                return n
            }

            function Et(e, t, n, r) {
                var s, o, a, f, l, c = ht(e);
                if (!r && c.length === 1) {
                    o = c[0] = c[0].slice(0);
                    if (o.length > 2 && (a = o[0]).type === "ID" && t.nodeType === 9 && !p && i.relative[o[1].type]) {
                        t = i.find.ID(a.matches[0].replace(et, tt), t)[0];
                        if (!t)
                            return n;
                        e = e.slice(o.shift().value.length)
                    }
                    for (s = V.needsContext.test(e) ? -1 : o.length - 1; s >= 0; s--) {
                        a = o[s];
                        if (i.relative[f = a.type])
                            break;
                        if (l = i.find[f])
                            if (r = l(a.matches[0].replace(et, tt), $.test(o[0].type) && t.parentNode || t)) {
                                o.splice(s, 1),
                                    e = r.length && pt(o);
                                if (!e)
                                    return _.apply(n, D.call(r, 0)),
                                        n;
                                break
                            }
                    }
                }
                return u(e, c)(r, t, p, n, $.test(e)),
                    n
            }

            function St() {}
            var n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, b, w = "sizzle" + -(new Date),
                E = e.document,
                S = {},
                x = 0,
                T = 0,
                N = it(),
                C = it(),
                k = it(),
                L = typeof t,
                A = 1 << 31,
                O = [],
                M = O.pop,
                _ = O.push,
                D = O.slice,
                P = O.indexOf || function(e) {
                    var t = 0,
                        n = this.length;
                    for (; t < n; t++)
                        if (this[t] === e)
                            return t;
                    return -1
                },
                H = "[\\x20\\t\\r\\n\\f]",
                B = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                j = B.replace("w", "w#"),
                F = "([*^$|!~]?=)",
                I = "\\[" + H + "*(" + B + ")" + H + "*(?:" + F + H + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + j + ")|)|)" + H + "*\\]",
                q = ":(" + B + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + I.replace(3, 8) + ")*)|.*)\\)|)",
                R = new RegExp("^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$", "g"),
                U = new RegExp("^" + H + "*," + H + "*"),
                z = new RegExp("^" + H + "*([\\x20\\t\\r\\n\\f>+~])" + H + "*"),
                W = new RegExp(q),
                X = new RegExp("^" + j + "$"),
                V = {
                    ID: new RegExp("^#(" + B + ")"),
                    CLASS: new RegExp("^\\.(" + B + ")"),
                    NAME: new RegExp("^\\[name=['\"]?(" + B + ")['\"]?\\]"),
                    TAG: new RegExp("^(" + B.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + I),
                    PSEUDO: new RegExp("^" + q),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + H + "*(even|odd|(([+-]|)(\\d*)n|)" + H + "*(?:([+-]|)" + H + "*(\\d+)|))" + H + "*\\)|)", "i"),
                    needsContext: new RegExp("^" + H + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + H + "*((?:-\\d)?\\d*)" + H + "*\\)|)(?=[^-]|$)", "i")
                },
                $ = /[\x20\t\r\n\f]*[+~]/,
                J = /\{\s*\[native code\]\s*\}/,
                K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                Q = /^(?:input|select|textarea|button)$/i,
                G = /^h\d$/i,
                Y = /'|\\/g,
                Z = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                et = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
                tt = function(e, t) {
                    var n = "0x" + t - 65536;
                    return n !== n ? t : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, n & 1023 | 56320)
                };
            try {
                D.call(h.childNodes, 0)[0].nodeType
            } catch (nt) {
                D = function(e) {
                    var t, n = [];
                    for (; t = this[e]; e++)
                        n.push(t);
                    return n
                }
            }
            o = ut.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? t.nodeName !== "HTML" : !1
                },
                l = ut.setDocument = function(e) {
                    var n = e ? e.ownerDocument || e : E;
                    if (n === c || n.nodeType !== 9 || !n.documentElement)
                        return c;
                    c = n,
                        h = n.documentElement,
                        p = o(n),
                        S.tagNameNoComments = ot(function(e) {
                            return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
                        }),
                        S.attributes = ot(function(e) {
                            e.innerHTML = "<select></select>";
                            var t = typeof e.lastChild.getAttribute("multiple");
                            return t !== "boolean" && t !== "string"
                        }),
                        S.getByClassName = ot(function(e) {
                            return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e",
                                e.getElementsByClassName("e").length === 2)
                        }),
                        S.getByName = ot(function(e) {
                            e.id = w + 0,
                                e.innerHTML = "<a name='" + w + "'></a><div name='" + w + "'></div>",
                                h.insertBefore(e, h.firstChild);
                            var t = n.getElementsByName && n.getElementsByName(w).length === 2 + n.getElementsByName(w + 0).length;
                            return S.getIdNotName = !n.getElementById(w),
                                h.removeChild(e),
                                t
                        }),
                        i.attrHandle = ot(function(e) {
                            return e.innerHTML = "<a href='#'></a>",
                                e.firstChild && typeof e.firstChild.getAttribute !== L && e.firstChild.getAttribute("href") === "#"
                        }) ? {} : {
                            href: function(e) {
                                return e.getAttribute("href", 2)
                            },
                            type: function(e) {
                                return e.getAttribute("type")
                            }
                        },
                        S.getIdNotName ? (i.find.ID = function(e, t) {
                                if (typeof t.getElementById !== L && !p) {
                                    var n = t.getElementById(e);
                                    return n && n.parentNode ? [n] : []
                                }
                            },
                            i.filter.ID = function(e) {
                                var t = e.replace(et, tt);
                                return function(e) {
                                    return e.getAttribute("id") === t
                                }
                            }
                        ) : (i.find.ID = function(e, n) {
                                if (typeof n.getElementById !== L && !p) {
                                    var r = n.getElementById(e);
                                    return r ? r.id === e || typeof r.getAttributeNode !== L && r.getAttributeNode("id").value === e ? [r] : t : []
                                }
                            },
                            i.filter.ID = function(e) {
                                var t = e.replace(et, tt);
                                return function(e) {
                                    var n = typeof e.getAttributeNode !== L && e.getAttributeNode("id");
                                    return n && n.value === t
                                }
                            }
                        ),
                        i.find.TAG = S.tagNameNoComments ? function(e, t) {
                            if (typeof t.getElementsByTagName !== L)
                                return t.getElementsByTagName(e)
                        } :
                        function(e, t) {
                            var n, r = [],
                                i = 0,
                                s = t.getElementsByTagName(e);
                            if (e === "*") {
                                for (; n = s[i]; i++)
                                    n.nodeType === 1 && r.push(n);
                                return r
                            }
                            return s
                        },
                        i.find.NAME = S.getByName && function(e, t) {
                            if (typeof t.getElementsByName !== L)
                                return t.getElementsByName(name)
                        },
                        i.find.CLASS = S.getByClassName && function(e, t) {
                            if (typeof t.getElementsByClassName !== L && !p)
                                return t.getElementsByClassName(e)
                        },
                        v = [],
                        d = [":focus"];
                    if (S.qsa = rt(n.querySelectorAll))
                        ot(function(e) {
                            e.innerHTML = "<select><option selected=''></option></select>",
                                e.querySelectorAll("[selected]").length || d.push("\\[" + H + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
                                e.querySelectorAll(":checked").length || d.push(":checked")
                        }),
                        ot(function(e) {
                            e.innerHTML = "<input type='hidden' i=''/>",
                                e.querySelectorAll("[i^='']").length && d.push("[*^$]=" + H + "*(?:\"\"|'')"),
                                e.querySelectorAll(":enabled").length || d.push(":enabled", ":disabled"),
                                e.querySelectorAll("*,:x"),
                                d.push(",.*:")
                        });
                    return (S.matchesSelector = rt(m = h.matchesSelector || h.mozMatchesSelector || h.webkitMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ot(function(e) {
                            S.disconnectedMatch = m.call(e, "div"),
                                m.call(e, "[s!='']:x"),
                                v.push("!=", q)
                        }),
                        d = new RegExp(d.join("|")),
                        v = new RegExp(v.join("|")),
                        g = rt(h.contains) || h.compareDocumentPosition ? function(e, t) {
                            var n = e.nodeType === 9 ? e.documentElement : e,
                                r = t && t.parentNode;
                            return e === r || !!r && r.nodeType === 1 && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
                        } :
                        function(e, t) {
                            if (t)
                                while (t = t.parentNode)
                                    if (t === e)
                                        return !0;
                            return !1
                        },
                        b = h.compareDocumentPosition ? function(e, t) {
                            var r;
                            if (e === t)
                                return a = !0,
                                    0;
                            if (r = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t))
                                return r & 1 || e.parentNode && e.parentNode.nodeType === 11 ? e === n || g(E, e) ? -1 : t === n || g(E, t) ? 1 : 0 : r & 4 ? -1 : 1;
                            return e.compareDocumentPosition ? -1 : 1
                        } :
                        function(e, t) {
                            var r, i = 0,
                                s = e.parentNode,
                                o = t.parentNode,
                                u = [e],
                                f = [t];
                            if (e === t)
                                return a = !0,
                                    0;
                            if (e.sourceIndex && t.sourceIndex)
                                return (~t.sourceIndex || A) - (g(E, e) && ~e.sourceIndex || A);
                            if (!s || !o)
                                return e === n ? -1 : t === n ? 1 : s ? -1 : o ? 1 : 0;
                            if (s === o)
                                return at(e, t);
                            r = e;
                            while (r = r.parentNode)
                                u.unshift(r);
                            r = t;
                            while (r = r.parentNode)
                                f.unshift(r);
                            while (u[i] === f[i])
                                i++;
                            return i ? at(u[i], f[i]) : u[i] === E ? -1 : f[i] === E ? 1 : 0
                        },
                        a = !1, [0, 0].sort(b),
                        S.detectDuplicates = a,
                        c
                },
                ut.matches = function(e, t) {
                    return ut(e, null, null, t)
                },
                ut.matchesSelector = function(e, t) {
                    (e.ownerDocument || e) !== c && l(e),
                        t = t.replace(Z, "='$1']");
                    if (S.matchesSelector && !p && (!v || !v.test(t)) && !d.test(t))
                        try {
                            var n = m.call(e, t);
                            if (n || S.disconnectedMatch || e.document && e.document.nodeType !== 11)
                                return n
                        } catch (r) {}
                    return ut(t, c, null, [e]).length > 0
                },
                ut.contains = function(e, t) {
                    return (e.ownerDocument || e) !== c && l(e),
                        g(e, t)
                },
                ut.attr = function(e, t) {
                    var n;
                    return (e.ownerDocument || e) !== c && l(e),
                        p || (t = t.toLowerCase()),
                        (n = i.attrHandle[t]) ? n(e) : p || S.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t : n && n.specified ? n.value : null
                },
                ut.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                },
                ut.uniqueSort = function(e) {
                    var t, n = [],
                        r = 1,
                        i = 0;
                    a = !S.detectDuplicates,
                        e.sort(b);
                    if (a) {
                        for (; t = e[r]; r++)
                            t === e[r - 1] && (i = n.push(r));
                        while (i--)
                            e.splice(n[i], 1)
                    }
                    return e
                },
                s = ut.getText = function(e) {
                    var t, n = "",
                        r = 0,
                        i = e.nodeType;
                    if (!i)
                        for (; t = e[r]; r++)
                            n += s(t);
                    else if (i === 1 || i === 9 || i === 11) {
                        if (typeof e.textContent == "string")
                            return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)
                            n += s(e)
                    } else if (i === 3 || i === 4)
                        return e.nodeValue;
                    return n
                },
                i = ut.selectors = {
                    cacheLength: 50,
                    createPseudo: st,
                    match: V,
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(et, tt),
                                e[3] = (e[4] || e[5] || "").replace(et, tt),
                                e[2] === "~=" && (e[3] = " " + e[3] + " "),
                                e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(),
                                e[1].slice(0, 3) === "nth" ? (e[3] || ut.error(e[0]),
                                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")),
                                    e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && ut.error(e[0]),
                                e
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[5] && e[2];
                            return V.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && W.test(n) && (t = ht(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                                    e[2] = n.slice(0, t)),
                                e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            return e === "*" ? function() {
                                    return !0
                                } :
                                (e = e.replace(et, tt).toLowerCase(),
                                    function(t) {
                                        return t.nodeName && t.nodeName.toLowerCase() === e
                                    }
                                )
                        },
                        CLASS: function(e) {
                            var t = N[e + " "];
                            return t || (t = new RegExp("(^|" + H + ")" + e + "(" + H + "|$)")) && N(e, function(e) {
                                return t.test(e.className || typeof e.getAttribute !== L && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, t, n) {
                            return function(r) {
                                var i = ut.attr(r, e);
                                return i == null ? t === "!=" : t ? (i += "",
                                    t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.substr(i.length - n.length) === n : t === "~=" ? (" " + i + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.substr(0, n.length + 1) === n + "-" : !1) : !0
                            }
                        },
                        CHILD: function(e, t, n, r, i) {
                            var s = e.slice(0, 3) !== "nth",
                                o = e.slice(-4) !== "last",
                                u = t === "of-type";
                            return r === 1 && i === 0 ? function(e) {
                                    return !!e.parentNode
                                } :
                                function(t, n, a) {
                                    var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
                                        m = t.parentNode,
                                        g = u && t.nodeName.toLowerCase(),
                                        y = !a && !u;
                                    if (m) {
                                        if (s) {
                                            while (v) {
                                                c = t;
                                                while (c = c[v])
                                                    if (u ? c.nodeName.toLowerCase() === g : c.nodeType === 1)
                                                        return !1;
                                                d = v = e === "only" && !d && "nextSibling"
                                            }
                                            return !0
                                        }
                                        d = [o ? m.firstChild : m.lastChild];
                                        if (o && y) {
                                            l = m[w] || (m[w] = {}),
                                                f = l[e] || [],
                                                p = f[0] === x && f[1],
                                                h = f[0] === x && f[2],
                                                c = p && m.childNodes[p];
                                            while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                                if (c.nodeType === 1 && ++h && c === t) {
                                                    l[e] = [x, p, h];
                                                    break
                                                }
                                        } else if (y && (f = (t[w] || (t[w] = {}))[e]) && f[0] === x)
                                            h = f[1];
                                        else
                                            while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                                if ((u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++h) {
                                                    y && ((c[w] || (c[w] = {}))[e] = [x, h]);
                                                    if (c === t)
                                                        break
                                                }
                                        return h -= i,
                                            h === r || h % r === 0 && h / r >= 0
                                    }
                                }
                        },
                        PSEUDO: function(e, t) {
                            var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || ut.error("unsupported pseudo: " + e);
                            return r[w] ? r(t) : r.length > 1 ? (n = [e, e, "", t],
                                i.setFilters.hasOwnProperty(e.toLowerCase()) ? st(function(e, n) {
                                    var i, s = r(e, t),
                                        o = s.length;
                                    while (o--)
                                        i = P.call(e, s[o]),
                                        e[i] = !(n[i] = s[o])
                                }) : function(e) {
                                    return r(e, 0, n)
                                }
                            ) : r
                        }
                    },
                    pseudos: {
                        not: st(function(e) {
                            var t = [],
                                n = [],
                                r = u(e.replace(R, "$1"));
                            return r[w] ? st(function(e, t, n, i) {
                                var s, o = r(e, null, i, []),
                                    u = e.length;
                                while (u--)
                                    if (s = o[u])
                                        e[u] = !(t[u] = s)
                            }) : function(e, i, s) {
                                return t[0] = e,
                                    r(t, null, s, n), !n.pop()
                            }
                        }),
                        has: st(function(e) {
                            return function(t) {
                                return ut(e, t).length > 0
                            }
                        }),
                        contains: st(function(e) {
                            return function(t) {
                                return (t.textContent || t.innerText || s(t)).indexOf(e) > -1
                            }
                        }),
                        lang: st(function(e) {
                            return X.test(e || "") || ut.error("unsupported lang: " + e),
                                e = e.replace(et, tt).toLowerCase(),
                                function(t) {
                                    var n;
                                    do
                                        if (n = p ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang)
                                            return n = n.toLowerCase(),
                                                n === e || n.indexOf(e + "-") === 0;
                                    while ((t = t.parentNode) && t.nodeType === 1);
                                    return !1
                                }
                        }),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === h
                        },
                        focus: function(e) {
                            return e === c.activeElement && (!c.hasFocus || c.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function(e) {
                            return e.disabled === !1
                        },
                        disabled: function(e) {
                            return e.disabled === !0
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return t === "input" && !!e.checked || t === "option" && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex,
                                e.selected === !0
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeName > "@" || e.nodeType === 3 || e.nodeType === 4)
                                    return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !i.pseudos.empty(e)
                        },
                        header: function(e) {
                            return G.test(e.nodeName)
                        },
                        input: function(e) {
                            return Q.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return t === "input" && e.type === "button" || t === "button"
                        },
                        text: function(e) {
                            var t;
                            return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === e.type)
                        },
                        first: ct(function() {
                            return [0]
                        }),
                        last: ct(function(e, t) {
                            return [t - 1]
                        }),
                        eq: ct(function(e, t, n) {
                            return [n < 0 ? n + t : n]
                        }),
                        even: ct(function(e, t) {
                            var n = 0;
                            for (; n < t; n += 2)
                                e.push(n);
                            return e
                        }),
                        odd: ct(function(e, t) {
                            var n = 1;
                            for (; n < t; n += 2)
                                e.push(n);
                            return e
                        }),
                        lt: ct(function(e, t, n) {
                            var r = n < 0 ? n + t : n;
                            for (; --r >= 0;)
                                e.push(r);
                            return e
                        }),
                        gt: ct(function(e, t, n) {
                            var r = n < 0 ? n + t : n;
                            for (; ++r < t;)
                                e.push(r);
                            return e
                        })
                    }
                };
            for (n in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                })
                i.pseudos[n] = ft(n);
            for (n in {
                    submit: !0,
                    reset: !0
                })
                i.pseudos[n] = lt(n);
            u = ut.compile = function(e, t) {
                    var n, r = [],
                        i = [],
                        s = k[e + " "];
                    if (!s) {
                        t || (t = ht(e)),
                            n = t.length;
                        while (n--)
                            s = yt(t[n]),
                            s[w] ? r.push(s) : i.push(s);
                        s = k(e, bt(i, r))
                    }
                    return s
                },
                i.pseudos.nth = i.pseudos.eq,
                i.filters = St.prototype = i.pseudos,
                i.setFilters = new St,
                l(),
                ut.attr = y.attr,
                y.find = ut,
                y.expr = ut.selectors,
                y.expr[":"] = y.expr.pseudos,
                y.unique = ut.uniqueSort,
                y.text = ut.getText,
                y.isXMLDoc = ut.isXML,
                y.contains = ut.contains
        }
        (e);
    var it = /Until$/,
        st = /^(?:parents|prev(?:Until|All))/,
        ot = /^.[^:#\[\.,]*$/,
        ut = y.expr.match.needsContext,
        at = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    y.fn.extend({
            find: function(e) {
                var t, n, r;
                if (typeof e != "string")
                    return r = this,
                        this.pushStack(y(e).filter(function() {
                            for (t = 0; t < r.length; t++)
                                if (y.contains(r[t], this))
                                    return !0
                        }));
                n = [];
                for (t = 0; t < this.length; t++)
                    y.find(e, this[t], n);
                return n = this.pushStack(y.unique(n)),
                    n.selector = (this.selector ? this.selector + " " : "") + e,
                    n
            },
            has: function(e) {
                var t, n = y(e, this),
                    r = n.length;
                return this.filter(function() {
                    for (t = 0; t < r; t++)
                        if (y.contains(this, n[t]))
                            return !0
                })
            },
            not: function(e) {
                return this.pushStack(lt(this, e, !1))
            },
            filter: function(e) {
                return this.pushStack(lt(this, e, !0))
            },
            is: function(e) {
                return !!e && (typeof e == "string" ? ut.test(e) ? y(e, this.context).index(this[0]) >= 0 : y.filter(e, this).length > 0 : this.filter(e).length > 0)
            },
            closest: function(e, t) {
                var n, r = 0,
                    i = this.length,
                    s = [],
                    o = ut.test(e) || typeof e != "string" ? y(e, t || this.context) : 0;
                for (; r < i; r++) {
                    n = this[r];
                    while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
                        if (o ? o.index(n) > -1 : y.find.matchesSelector(n, e)) {
                            s.push(n);
                            break
                        }
                        n = n.parentNode
                    }
                }
                return this.pushStack(s.length > 1 ? y.unique(s) : s)
            },
            index: function(e) {
                return e ? typeof e == "string" ? y.inArray(this[0], y(e)) : y.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                var n = typeof e == "string" ? y(e, t) : y.makeArray(e && e.nodeType ? [e] : e),
                    r = y.merge(this.get(), n);
                return this.pushStack(y.unique(r))
            },
            addBack: function(e) {
                return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
            }
        }),
        y.fn.andSelf = y.fn.addBack,
        y.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && t.nodeType !== 11 ? t : null
            },
            parents: function(e) {
                return y.dir(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return y.dir(e, "parentNode", n)
            },
            next: function(e) {
                return ft(e, "nextSibling")
            },
            prev: function(e) {
                return ft(e, "previousSibling")
            },
            nextAll: function(e) {
                return y.dir(e, "nextSibling")
            },
            prevAll: function(e) {
                return y.dir(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return y.dir(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return y.dir(e, "previousSibling", n)
            },
            siblings: function(e) {
                return y.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return y.sibling(e.firstChild)
            },
            contents: function(e) {
                return y.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : y.merge([], e.childNodes)
            }
        }, function(e, t) {
            y.fn[e] = function(n, r) {
                var i = y.map(this, t, n);
                return it.test(e) || (r = n),
                    r && typeof r == "string" && (i = y.filter(r, i)),
                    i = this.length > 1 && !at[e] ? y.unique(i) : i,
                    this.length > 1 && st.test(e) && (i = i.reverse()),
                    this.pushStack(i)
            }
        }),
        y.extend({
            filter: function(e, t, n) {
                return n && (e = ":not(" + e + ")"),
                    t.length === 1 ? y.find.matchesSelector(t[0], e) ? [t[0]] : [] : y.find.matches(e, t)
            },
            dir: function(e, n, r) {
                var i = [],
                    s = e[n];
                while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !y(s).is(r)))
                    s.nodeType === 1 && i.push(s),
                    s = s[n];
                return i
            },
            sibling: function(e, t) {
                var n = [];
                for (; e; e = e.nextSibling)
                    e.nodeType === 1 && e !== t && n.push(e);
                return n
            }
        });
    var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        pt = / jQuery\d+="(?:null|\d+)"/g,
        dt = new RegExp("<(?:" + ht + ")[\\s/>]", "i"),
        vt = /^\s+/,
        mt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        gt = /<([\w:]+)/,
        yt = /<tbody/i,
        bt = /<|&#?\w+;/,
        wt = /<(?:script|style|link)/i,
        Et = /^(?:checkbox|radio)$/i,
        St = /checked\s*(?:[^=]|=\s*.checked.)/i,
        xt = /^$|\/(?:java|ecma)script/i,
        Tt = /^true\/(.*)/,
        Nt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Ct = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: y.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        kt = ct(i),
        Lt = kt.appendChild(i.createElement("div"));
    Ct.optgroup = Ct.option,
        Ct.tbody = Ct.tfoot = Ct.colgroup = Ct.caption = Ct.thead,
        Ct.th = Ct.td,
        y.fn.extend({
            text: function(e) {
                return y.access(this, function(e) {
                    return e === t ? y.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e))
                }, null, e, arguments.length)
            },
            wrapAll: function(e) {
                if (y.isFunction(e))
                    return this.each(function(t) {
                        y(this).wrapAll(e.call(this, t))
                    });
                if (this[0]) {
                    var t = y(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]),
                        t.map(function() {
                            var e = this;
                            while (e.firstChild && e.firstChild.nodeType === 1)
                                e = e.firstChild;
                            return e
                        }).append(this)
                }
                return this
            },
            wrapInner: function(e) {
                return y.isFunction(e) ? this.each(function(t) {
                    y(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = y(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = y.isFunction(e);
                return this.each(function(n) {
                    y(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    y.nodeName(this, "body") || y(this).replaceWith(this.childNodes)
                }).end()
            },
            append: function() {
                return this.domManip(arguments, !0, function(e) {
                    (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && this.appendChild(e)
                })
            },
            prepend: function() {
                return this.domManip(arguments, !0, function(e) {
                    (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && this.insertBefore(e, this.firstChild)
                })
            },
            before: function() {
                return this.domManip(arguments, !1, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return this.domManip(arguments, !1, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            remove: function(e, t) {
                var n, r = 0;
                for (;
                    (n = this[r]) != null; r++)
                    if (!e || y.filter(e, [n]).length > 0)
                        !t && n.nodeType === 1 && y.cleanData(Ht(n)),
                        n.parentNode && (t && y.contains(n.ownerDocument, n) && _t(Ht(n, "script")),
                            n.parentNode.removeChild(n));
                return this
            },
            empty: function() {
                var e, t = 0;
                for (;
                    (e = this[t]) != null; t++) {
                    e.nodeType === 1 && y.cleanData(Ht(e, !1));
                    while (e.firstChild)
                        e.removeChild(e.firstChild);
                    e.options && y.nodeName(e, "select") && (e.options.length = 0)
                }
                return this
            },
            clone: function(e, t) {
                return e = e == null ? !1 : e,
                    t = t == null ? e : t,
                    this.map(function() {
                        return y.clone(this, e, t)
                    })
            },
            html: function(e) {
                return y.access(this, function(e) {
                    var n = this[0] || {},
                        r = 0,
                        i = this.length;
                    if (e === t)
                        return n.nodeType === 1 ? n.innerHTML.replace(pt, "") : t;
                    if (typeof e == "string" && !wt.test(e) && (y.support.htmlSerialize || !dt.test(e)) && (y.support.leadingWhitespace || !vt.test(e)) && !Ct[(gt.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = e.replace(mt, "<$1></$2>");
                        try {
                            for (; r < i; r++)
                                n = this[r] || {},
                                n.nodeType === 1 && (y.cleanData(Ht(n, !1)),
                                    n.innerHTML = e);
                            n = 0
                        } catch (s) {}
                    }
                    n && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function(e) {
                var t = y.isFunction(e);
                return !t && typeof e != "string" && (e = y(e).not(this).detach()),
                    this.domManip([e], !0, function(e) {
                        var t = this.nextSibling,
                            n = this.parentNode;
                        if (n && this.nodeType === 1 || this.nodeType === 11)
                            y(this).remove(),
                            t ? t.parentNode.insertBefore(e, t) : n.appendChild(e)
                    })
            },
            detach: function(e) {
                return this.remove(e, !0)
            },
            domManip: function(e, n, r) {
                e = c.apply([], e);
                var i, s, o, u, a, f, l = 0,
                    h = this.length,
                    p = this,
                    d = h - 1,
                    v = e[0],
                    m = y.isFunction(v);
                if (m || !(h <= 1 || typeof v != "string" || y.support.checkClone || !St.test(v)))
                    return this.each(function(i) {
                        var s = p.eq(i);
                        m && (e[0] = v.call(this, i, n ? s.html() : t)),
                            s.domManip(e, n, r)
                    });
                if (h) {
                    i = y.buildFragment(e, this[0].ownerDocument, !1, this),
                        s = i.firstChild,
                        i.childNodes.length === 1 && (i = s);
                    if (s) {
                        n = n && y.nodeName(s, "tr"),
                            o = y.map(Ht(i, "script"), Ot),
                            u = o.length;
                        for (; l < h; l++)
                            a = i,
                            l !== d && (a = y.clone(a, !0, !0),
                                u && y.merge(o, Ht(a, "script"))),
                            r.call(n && y.nodeName(this[l], "table") ? At(this[l], "tbody") : this[l], a, l);
                        if (u) {
                            f = o[o.length - 1].ownerDocument,
                                y.map(o, Mt);
                            for (l = 0; l < u; l++)
                                a = o[l],
                                xt.test(a.type || "") && !y._data(a, "globalEval") && y.contains(f, a) && (a.src ? y.ajax({
                                    url: a.src,
                                    type: "GET",
                                    dataType: "script",
                                    async: !1,
                                    global: !1,
                                    "throws": !0
                                }) : y.globalEval((a.text || a.textContent || a.innerHTML || "").replace(Nt, "")))
                        }
                        i = s = null
                    }
                }
                return this
            }
        }),
        y.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            y.fn[e] = function(e) {
                var n, r = 0,
                    i = [],
                    s = y(e),
                    o = s.length - 1;
                for (; r <= o; r++)
                    n = r === o ? this : this.clone(!0),
                    y(s[r])[t](n),
                    h.apply(i, n.get());
                return this.pushStack(i)
            }
        }),
        y.extend({
            clone: function(e, t, n) {
                var r, i, s, o, u, a = y.contains(e.ownerDocument, e);
                y.support.html5Clone || y.isXMLDoc(e) || !dt.test("<" + e.nodeName + ">") ? u = e.cloneNode(!0) : (Lt.innerHTML = e.outerHTML,
                    Lt.removeChild(u = Lt.firstChild));
                if ((!y.support.noCloneEvent || !y.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !y.isXMLDoc(e)) {
                    r = Ht(u),
                        i = Ht(e);
                    for (o = 0;
                        (s = i[o]) != null; ++o)
                        r[o] && Pt(s, r[o])
                }
                if (t)
                    if (n) {
                        i = i || Ht(e),
                            r = r || Ht(u);
                        for (o = 0;
                            (s = i[o]) != null; o++)
                            Dt(s, r[o])
                    } else
                        Dt(e, u);
                return r = Ht(u, "script"),
                    r.length > 0 && _t(r, !a && Ht(e, "script")),
                    r = i = s = null,
                    u
            },
            buildFragment: function(e, t, n, r) {
                var i, s, o, u, a, f, l, c = e.length,
                    h = ct(t),
                    p = [],
                    d = 0;
                for (; d < c; d++) {
                    s = e[d];
                    if (s || s === 0)
                        if (y.type(s) === "object")
                            y.merge(p, s.nodeType ? [s] : s);
                        else if (!bt.test(s))
                        p.push(t.createTextNode(s));
                    else {
                        u = u || h.appendChild(t.createElement("div")),
                            o = (gt.exec(s) || ["", ""])[1].toLowerCase(),
                            a = Ct[o] || Ct._default,
                            u.innerHTML = a[1] + s.replace(mt, "<$1></$2>") + a[2],
                            l = a[0];
                        while (l--)
                            u = u.lastChild;
                        !y.support.leadingWhitespace && vt.test(s) && p.push(t.createTextNode(vt.exec(s)[0]));
                        if (!y.support.tbody) {
                            s = o === "table" && !yt.test(s) ? u.firstChild : a[1] === "<table>" && !yt.test(s) ? u : 0,
                                l = s && s.childNodes.length;
                            while (l--)
                                y.nodeName(f = s.childNodes[l], "tbody") && !f.childNodes.length && s.removeChild(f)
                        }
                        y.merge(p, u.childNodes),
                            u.textContent = "";
                        while (u.firstChild)
                            u.removeChild(u.firstChild);
                        u = h.lastChild
                    }
                }
                u && h.removeChild(u),
                    y.support.appendChecked || y.grep(Ht(p, "input"), Bt),
                    d = 0;
                while (s = p[d++]) {
                    if (r && y.inArray(s, r) !== -1)
                        continue;
                    i = y.contains(s.ownerDocument, s),
                        u = Ht(h.appendChild(s), "script"),
                        i && _t(u);
                    if (n) {
                        l = 0;
                        while (s = u[l++])
                            xt.test(s.type || "") && n.push(s)
                    }
                }
                return u = null,
                    h
            },
            cleanData: function(e, t) {
                var n, r, i, s, o = 0,
                    u = y.expando,
                    a = y.cache,
                    l = y.support.deleteExpando,
                    c = y.event.special;
                for (;
                    (i = e[o]) != null; o++)
                    if (t || y.acceptData(i)) {
                        r = i[u],
                            n = r && a[r];
                        if (n) {
                            if (n.events)
                                for (s in n.events)
                                    c[s] ? y.event.remove(i, s) : y.removeEvent(i, s, n.handle);
                            a[r] && (delete a[r],
                                l ? delete i[u] : typeof i.removeAttribute != "undefined" ? i.removeAttribute(u) : i[u] = null,
                                f.push(r))
                        }
                    }
            }
        });
    var jt, Ft, It, qt = /alpha\([^)]*\)/i,
        Rt = /opacity\s*=\s*([^)]*)/,
        Ut = /^(top|right|bottom|left)$/,
        zt = /^(none|table(?!-c[ea]).+)/,
        Wt = /^margin/,
        Xt = new RegExp("^(" + b + ")(.*)$", "i"),
        Vt = new RegExp("^(" + b + ")(?!px)[a-z%]+$", "i"),
        $t = new RegExp("^([+-])=(" + b + ")", "i"),
        Jt = {
            BODY: "block"
        },
        Kt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Qt = {
            letterSpacing: 0,
            fontWeight: 400
        },
        Gt = ["Top", "Right", "Bottom", "Left"],
        Yt = ["Webkit", "O", "Moz", "ms"];
    y.fn.extend({
            css: function(e, n) {
                return y.access(this, function(e, n, r) {
                    var i, s, o = {},
                        u = 0;
                    if (y.isArray(n)) {
                        i = Ft(e),
                            s = n.length;
                        for (; u < s; u++)
                            o[n[u]] = y.css(e, n[u], !1, i);
                        return o
                    }
                    return r !== t ? y.style(e, n, r) : y.css(e, n)
                }, e, n, arguments.length > 1)
            },
            show: function() {
                return tn(this, !0)
            },
            hide: function() {
                return tn(this)
            },
            toggle: function(e) {
                var t = typeof e == "boolean";
                return this.each(function() {
                    (t ? e : en(this)) ? y(this).show(): y(this).hide()
                })
            }
        }),
        y.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = jt(e, "opacity");
                            return n === "" ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": y.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(e, n, r, i) {
                if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style)
                    return;
                var s, o, u, a = y.camelCase(n),
                    f = e.style;
                n = y.cssProps[a] || (y.cssProps[a] = Zt(f, a)),
                    u = y.cssHooks[n] || y.cssHooks[a];
                if (r === t)
                    return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s : f[n];
                o = typeof r,
                    o === "string" && (s = $t.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(y.css(e, n)),
                        o = "number");
                if (r == null || o === "number" && isNaN(r))
                    return;
                o === "number" && !y.cssNumber[a] && (r += "px"), !y.support.clearCloneStyle && r === "" && n.indexOf("background") === 0 && (f[n] = "inherit");
                if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t)
                    try {
                        f[n] = r
                    } catch (l) {}
            },
            css: function(e, n, r, i) {
                var s, o, u, a = y.camelCase(n);
                return n = y.cssProps[a] || (y.cssProps[a] = Zt(e.style, a)),
                    u = y.cssHooks[n] || y.cssHooks[a],
                    u && "get" in u && (s = u.get(e, !0, r)),
                    s === t && (s = jt(e, n, i)),
                    s === "normal1" && n in Qt && (s = Qt[n]),
                    r ? (o = parseFloat(s),
                        r === !0 || y.isNumeric(o) ? o || 0 : s) : s
            },
            swap: function(e, t, n, r) {
                var i, s, o = {};
                for (s in t)
                    o[s] = e.style[s],
                    e.style[s] = t[s];
                i = n.apply(e, r || []);
                for (s in t)
                    e.style[s] = o[s];
                return i
            }
        }),
        e.getComputedStyle ? (Ft = function(t) {
                return e.getComputedStyle(t, null)
            },
            jt = function(e, n, r) {
                var i, s, o, u = r || Ft(e),
                    a = u ? u.getPropertyValue(n) || u[n] : t,
                    f = e.style;
                return u && (a === "" && !y.contains(e.ownerDocument, e) && (a = y.style(e, n)),
                        Vt.test(a) && Wt.test(n) && (i = f.width,
                            s = f.minWidth,
                            o = f.maxWidth,
                            f.minWidth = f.maxWidth = f.width = a,
                            a = u.width,
                            f.width = i,
                            f.minWidth = s,
                            f.maxWidth = o)),
                    a
            }
        ) : i.documentElement.currentStyle && (Ft = function(e) {
                return e.currentStyle
            },
            jt = function(e, n, r) {
                var i, s, o, u = r || Ft(e),
                    a = u ? u[n] : t,
                    f = e.style;
                return a == null && f && f[n] && (a = f[n]),
                    Vt.test(a) && !Ut.test(n) && (i = f.left,
                        s = e.runtimeStyle,
                        o = s && s.left,
                        o && (s.left = e.currentStyle.left),
                        f.left = n === "fontSize" ? "1em" : a,
                        a = f.pixelLeft + "px",
                        f.left = i,
                        o && (s.left = o)),
                    a === "" ? "auto" : a
            }
        ),
        y.each(["height", "width"], function(e, t) {
            y.cssHooks[t] = {
                get: function(e, n, r) {
                    if (n)
                        return e.offsetWidth === 0 && zt.test(y.css(e, "display")) ? y.swap(e, Kt, function() {
                            return sn(e, t, r)
                        }) : sn(e, t, r)
                },
                set: function(e, n, r) {
                    var i = r && Ft(e);
                    return nn(e, n, r ? rn(e, t, r, y.support.boxSizing && y.css(e, "boxSizing", !1, i) === "border-box", i) : 0)
                }
            }
        }),
        y.support.opacity || (y.cssHooks.opacity = {
            get: function(e, t) {
                return Rt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            },
            set: function(e, t) {
                var n = e.style,
                    r = e.currentStyle,
                    i = y.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                    s = r && r.filter || n.filter || "";
                n.zoom = 1;
                if ((t >= 1 || t === "") && y.trim(s.replace(qt, "")) === "" && n.removeAttribute) {
                    n.removeAttribute("filter");
                    if (t === "" || r && !r.filter)
                        return
                }
                n.filter = qt.test(s) ? s.replace(qt, i) : s + " " + i
            }
        }),
        y(function() {
            y.support.reliableMarginRight || (y.cssHooks.marginRight = {
                get: function(e, t) {
                    if (t)
                        return y.swap(e, {
                            display: "inline-block"
                        }, jt, [e, "marginRight"])
                }
            }), !y.support.pixelPosition && y.fn.position && y.each(["top", "left"], function(e, t) {
                y.cssHooks[t] = {
                    get: function(e, n) {
                        if (n)
                            return n = jt(e, t),
                                Vt.test(n) ? y(e).position()[t] + "px" : n
                    }
                }
            })
        }),
        y.expr && y.expr.filters && (y.expr.filters.hidden = function(e) {
                return e.offsetWidth === 0 && e.offsetHeight === 0 || !y.support.reliableHiddenOffsets && (e.style && e.style.display || y.css(e, "display")) === "none"
            },
            y.expr.filters.visible = function(e) {
                return !y.expr.filters.hidden(e)
            }
        ),
        y.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            y.cssHooks[e + t] = {
                    expand: function(n) {
                        var r = 0,
                            i = {},
                            s = typeof n == "string" ? n.split(" ") : [n];
                        for (; r < 4; r++)
                            i[e + Gt[r] + t] = s[r] || s[r - 2] || s[0];
                        return i
                    }
                },
                Wt.test(e) || (y.cssHooks[e + t].set = nn)
        });
    var an = /%20/g,
        fn = /\[\]$/,
        ln = /\r?\n/g,
        cn = /^(?:submit|button|image|reset)$/i,
        hn = /^(?:input|select|textarea|keygen)/i;
    y.fn.extend({
            serialize: function() {
                return y.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = y.prop(this, "elements");
                    return e ? y.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !y(this).is(":disabled") && hn.test(this.nodeName) && !cn.test(e) && (this.checked || !Et.test(e))
                }).map(function(e, t) {
                    var n = y(this).val();
                    return n == null ? null : y.isArray(n) ? y.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(ln, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(ln, "\r\n")
                    }
                }).get()
            }
        }),
        y.param = function(e, n) {
            var r, i = [],
                s = function(e, t) {
                    t = y.isFunction(t) ? t() : t == null ? "" : t,
                        i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            n === t && (n = y.ajaxSettings && y.ajaxSettings.traditional);
            if (y.isArray(e) || e.jquery && !y.isPlainObject(e))
                y.each(e, function() {
                    s(this.name, this.value)
                });
            else
                for (r in e)
                    pn(r, e[r], n, s);
            return i.join("&").replace(an, "+")
        };
    var dn, vn, mn = y.now(),
        gn = /\?/,
        yn = /#.*$/,
        bn = /([?&])_=[^&]*/,
        wn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        En = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Sn = /^(?:GET|HEAD)$/,
        xn = /^\/\//,
        Tn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Nn = y.fn.load,
        Cn = {},
        kn = {},
        Ln = "*/".concat("*");
    try {
        vn = s.href
    } catch (An) {
        vn = i.createElement("a"),
            vn.href = "",
            vn = vn.href
    }
    dn = Tn.exec(vn.toLowerCase()) || [],
        y.fn.load = function(e, n, r) {
            if (typeof e != "string" && Nn)
                return Nn.apply(this, arguments);
            var i, s, o, u = this,
                a = e.indexOf(" ");
            return a >= 0 && (i = e.slice(a, e.length),
                    e = e.slice(0, a)),
                y.isFunction(n) ? (r = n,
                    n = t) : n && typeof n == "object" && (s = "POST"),
                u.length > 0 && y.ajax({
                    url: e,
                    type: s,
                    dataType: "html",
                    data: n
                }).done(function(e) {
                    o = arguments,
                        u.html(i ? y("<div>").append(y.parseHTML(e)).find(i) : e)
                }).complete(r && function(e, t) {
                    u.each(r, o || [e.responseText, t, e])
                }),
                this
        },
        y.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            y.fn[t] = function(e) {
                return this.on(t, e)
            }
        }),
        y.each(["get", "post"], function(e, n) {
            y[n] = function(e, r, i, s) {
                return y.isFunction(r) && (s = s || i,
                        i = r,
                        r = t),
                    y.ajax({
                        url: e,
                        type: n,
                        dataType: s,
                        data: r,
                        success: i
                    })
            }
        }),
        y.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: vn,
                type: "GET",
                isLocal: En.test(dn[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Ln,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText"
                },
                converters: {
                    "* text": e.String,
                    "text html": !0,
                    "text json": y.parseJSON,
                    "text xml": y.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? _n(_n(e, y.ajaxSettings), t) : _n(y.ajaxSettings, e)
            },
            ajaxPrefilter: On(Cn),
            ajaxTransport: On(kn),
            ajax: function(e, n) {
                function N(e, n, o, a) {
                    var l, g, b, w, S, T = n;
                    if (E === 2)
                        return;
                    E = 2,
                        u && clearTimeout(u),
                        r = t,
                        s = a || "",
                        x.readyState = e > 0 ? 4 : 0,
                        o && (w = Dn(c, x, o));
                    if (e >= 200 && e < 300 || e === 304)
                        c.ifModified && (S = x.getResponseHeader("Last-Modified"),
                            S && (y.lastModified[i] = S),
                            S = x.getResponseHeader("etag"),
                            S && (y.etag[i] = S)),
                        e === 304 ? (l = !0,
                            T = "notmodified") : (l = Pn(c, w),
                            T = l.state,
                            g = l.data,
                            b = l.error,
                            l = !b);
                    else {
                        b = T;
                        if (e || !T)
                            T = "error",
                            e < 0 && (e = 0)
                    }
                    x.status = e,
                        x.statusText = (n || T) + "",
                        l ? d.resolveWith(h, [g, T, x]) : d.rejectWith(h, [x, T, b]),
                        x.statusCode(m),
                        m = t,
                        f && p.trigger(l ? "ajaxSuccess" : "ajaxError", [x, c, l ? g : b]),
                        v.fireWith(h, [x, T]),
                        f && (p.trigger("ajaxComplete", [x, c]),
                            --y.active || y.event.trigger("ajaxStop"))
                }
                typeof e == "object" && (n = e,
                        e = t),
                    n = n || {};
                var r, i, s, o, u, a, f, l, c = y.ajaxSetup({}, n),
                    h = c.context || c,
                    p = c.context && (h.nodeType || h.jquery) ? y(h) : y.event,
                    d = y.Deferred(),
                    v = y.Callbacks("once memory"),
                    m = c.statusCode || {},
                    g = {},
                    b = {},
                    E = 0,
                    S = "canceled",
                    x = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (E === 2) {
                                if (!o) {
                                    o = {};
                                    while (t = wn.exec(s))
                                        o[t[1].toLowerCase()] = t[2]
                                }
                                t = o[e.toLowerCase()]
                            }
                            return t == null ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return E === 2 ? s : null
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return E || (e = b[n] = b[n] || e,
                                    g[e] = t),
                                this
                        },
                        overrideMimeType: function(e) {
                            return E || (c.mimeType = e),
                                this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (E < 2)
                                    for (t in e)
                                        m[t] = [m[t], e[t]];
                                else
                                    x.always(e[x.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || S;
                            return r && r.abort(t),
                                N(0, t),
                                this
                        }
                    };
                d.promise(x).complete = v.add,
                    x.success = x.done,
                    x.error = x.fail,
                    c.url = ((e || c.url || vn) + "").replace(yn, "").replace(xn, dn[1] + "//"),
                    c.type = n.method || n.type || c.method || c.type,
                    c.dataTypes = y.trim(c.dataType || "*").toLowerCase().match(w) || [""],
                    c.crossDomain == null && (a = Tn.exec(c.url.toLowerCase()),
                        c.crossDomain = !(!a || a[1] === dn[1] && a[2] === dn[2] && (a[3] || (a[1] === "http:" ? 80 : 443)) == (dn[3] || (dn[1] === "http:" ? 80 : 443)))),
                    c.data && c.processData && typeof c.data != "string" && (c.data = y.param(c.data, c.traditional)),
                    Mn(Cn, c, n, x);
                if (E === 2)
                    return x;
                f = c.global,
                    f && y.active++ === 0 && y.event.trigger("ajaxStart"),
                    c.type = c.type.toUpperCase(),
                    c.hasContent = !Sn.test(c.type),
                    i = c.url,
                    c.hasContent || (c.data && (i = c.url += (gn.test(i) ? "&" : "?") + c.data,
                            delete c.data),
                        c.cache === !1 && (c.url = bn.test(i) ? i.replace(bn, "$1_=" + mn++) : i + (gn.test(i) ? "&" : "?") + "_=" + mn++)),
                    c.ifModified && (y.lastModified[i] && x.setRequestHeader("If-Modified-Since", y.lastModified[i]),
                        y.etag[i] && x.setRequestHeader("If-None-Match", y.etag[i])),
                    (c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType),
                    x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Ln + "; q=0.01" : "") : c.accepts["*"]);
                for (l in c.headers)
                    x.setRequestHeader(l, c.headers[l]);
                if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
                    S = "abort";
                    for (l in {
                            success: 1,
                            error: 1,
                            complete: 1
                        })
                        x[l](c[l]);
                    r = Mn(kn, c, n, x);
                    if (!r)
                        N(-1, "No Transport");
                    else {
                        x.readyState = 1,
                            f && p.trigger("ajaxSend", [x, c]),
                            c.async && c.timeout > 0 && (u = setTimeout(function() {
                                x.abort("timeout")
                            }, c.timeout));
                        try {
                            E = 1,
                                r.send(g, N)
                        } catch (T) {
                            if (!(E < 2))
                                throw T;
                            N(-1, T)
                        }
                    }
                    return x
                }
                return x.abort()
            },
            getScript: function(e, n) {
                return y.get(e, t, n, "script")
            },
            getJSON: function(e, t, n) {
                return y.get(e, t, n, "json")
            }
        }),
        y.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(e) {
                    return y.globalEval(e),
                        e
                }
            }
        }),
        y.ajaxPrefilter("script", function(e) {
            e.cache === t && (e.cache = !1),
                e.crossDomain && (e.type = "GET",
                    e.global = !1)
        }),
        y.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var n, r = i.head || y("head")[0] || i.documentElement;
                return {
                    send: function(t, s) {
                        n = i.createElement("script"),
                            n.async = !0,
                            e.scriptCharset && (n.charset = e.scriptCharset),
                            n.src = e.url,
                            n.onload = n.onreadystatechange = function(e, t) {
                                if (t || !n.readyState || /loaded|complete/.test(n.readyState))
                                    n.onload = n.onreadystatechange = null,
                                    n.parentNode && n.parentNode.removeChild(n),
                                    n = null,
                                    t || s(200, "success")
                            },
                            r.insertBefore(n, r.firstChild)
                    },
                    abort: function() {
                        n && n.onload(t, !0)
                    }
                }
            }
        });
    var Hn = [],
        Bn = /(=)\?(?=&|$)|\?\?/;
    y.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Hn.pop() || y.expando + "_" + mn++;
                return this[e] = !0,
                    e
            }
        }),
        y.ajaxPrefilter("json jsonp", function(n, r, i) {
            var s, o, u, a = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : typeof n.data == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data");
            if (a || n.dataTypes[0] === "jsonp")
                return s = n.jsonpCallback = y.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback,
                    a ? n[a] = n[a].replace(Bn, "$1" + s) : n.jsonp !== !1 && (n.url += (gn.test(n.url) ? "&" : "?") + n.jsonp + "=" + s),
                    n.converters["script json"] = function() {
                        return u || y.error(s + " was not called"),
                            u[0]
                    },
                    n.dataTypes[0] = "json",
                    o = e[s],
                    e[s] = function() {
                        u = arguments
                    },
                    i.always(function() {
                        e[s] = o,
                            n[s] && (n.jsonpCallback = r.jsonpCallback,
                                Hn.push(s)),
                            u && y.isFunction(o) && o(u[0]),
                            u = o = t
                    }),
                    "script"
        });
    var jn, Fn, In = 0,
        qn = e.ActiveXObject && function() {
            var e;
            for (e in jn)
                jn[e](t, !0)
        };
    y.ajaxSettings.xhr = e.ActiveXObject ? function() {
            return !this.isLocal && Rn() || Un()
        } :
        Rn,
        Fn = y.ajaxSettings.xhr(),
        y.support.cors = !!Fn && "withCredentials" in Fn,
        Fn = y.support.ajax = !!Fn,
        Fn && y.ajaxTransport(function(n) {
            if (!n.crossDomain || y.support.cors) {
                var r;
                return {
                    send: function(i, s) {
                        var o, u, a = n.xhr();
                        console.log(n.url);
                        n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);
                        if (n.xhrFields)
                            for (u in n.xhrFields)
                                a[u] = n.xhrFields[u];
                        n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (u in i)
                                a.setRequestHeader(u, i[u])
                        } catch (f) {}
                        a.send(n.hasContent && n.data || null),
                            r = function(e, i) {
                                var u, f, l, c, h;
                                try {
                                    if (r && (i || a.readyState === 4)) {
                                        r = t,
                                            o && (a.onreadystatechange = y.noop,
                                                qn && delete jn[o]);
                                        if (i)
                                            a.readyState !== 4 && a.abort();
                                        else {
                                            c = {},
                                                u = a.status,
                                                h = a.responseXML,
                                                l = a.getAllResponseHeaders(),
                                                h && h.documentElement && (c.xml = h),
                                                typeof a.responseText == "string" && (c.text = a.responseText);
                                            try {
                                                f = a.statusText
                                            } catch (p) {
                                                f = ""
                                            }!u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204)
                                        }
                                    }
                                } catch (d) {
                                    i || s(-1, d)
                                }
                                c && s(u, f, c, l)
                            },
                            n.async ? a.readyState === 4 ? setTimeout(r) : (o = ++In,
                                qn && (jn || (jn = {},
                                        y(e).unload(qn)),
                                    jn[o] = r),
                                a.onreadystatechange = r) : r()
                    },
                    abort: function() {
                        r && r(t, !0)
                    }
                }
            }
        });
    var zn, Wn, Xn = /^(?:toggle|show|hide)$/,
        Vn = new RegExp("^(?:([+-])=|)(" + b + ")([a-z%]*)$", "i"),
        $n = /queueHooks$/,
        Jn = [er],
        Kn = {
            "*": [function(e, t) {
                var n, r, i = this.createTween(e, t),
                    s = Vn.exec(t),
                    o = i.cur(),
                    u = +o || 0,
                    a = 1,
                    f = 20;
                if (s) {
                    n = +s[2],
                        r = s[3] || (y.cssNumber[e] ? "" : "px");
                    if (r !== "px" && u) {
                        u = y.css(i.elem, e, !0) || n || 1;
                        do
                            a = a || ".5",
                            u /= a,
                            y.style(i.elem, e, u + r);
                        while (a !== (a = i.cur() / o) && a !== 1 && --f)
                    }
                    i.unit = r,
                        i.start = u,
                        i.end = s[1] ? u + (s[1] + 1) * n : n
                }
                return i
            }]
        };
    y.Animation = y.extend(Yn, {
            tweener: function(e, t) {
                y.isFunction(e) ? (t = e,
                    e = ["*"]) : e = e.split(" ");
                var n, r = 0,
                    i = e.length;
                for (; r < i; r++)
                    n = e[r],
                    Kn[n] = Kn[n] || [],
                    Kn[n].unshift(t)
            },
            prefilter: function(e, t) {
                t ? Jn.unshift(e) : Jn.push(e)
            }
        }),
        y.Tween = tr,
        tr.prototype = {
            constructor: tr,
            init: function(e, t, n, r, i, s) {
                this.elem = e,
                    this.prop = n,
                    this.easing = i || "swing",
                    this.options = t,
                    this.start = this.now = this.cur(),
                    this.end = r,
                    this.unit = s || (y.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = tr.propHooks[this.prop];
                return e && e.get ? e.get(this) : tr.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = tr.propHooks[this.prop];
                return this.options.duration ? this.pos = t = y.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
                    this.now = (this.end - this.start) * t + this.start,
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    n && n.set ? n.set(this) : tr.propHooks._default.set(this),
                    this
            }
        },
        tr.prototype.init.prototype = tr.prototype,
        tr.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = y.css(e.elem, e.prop, "auto"), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
                },
                set: function(e) {
                    y.fx.step[e.prop] ? y.fx.step[e.prop](e) : e.elem.style && (e.elem.style[y.cssProps[e.prop]] != null || y.cssHooks[e.prop]) ? y.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        },
        tr.propHooks.scrollTop = tr.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        },
        y.each(["toggle", "show", "hide"], function(e, t) {
            var n = y.fn[t];
            y.fn[t] = function(e, r, i) {
                return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(nr(t, !0), e, r, i)
            }
        }),
        y.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(en).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var i = y.isEmptyObject(e),
                    s = y.speed(t, n, r),
                    o = function() {
                        var t = Yn(this, y.extend({}, e), s);
                        o.finish = function() {
                                t.stop(!0)
                            },
                            (i || y._data(this, "finish")) && t.stop(!0)
                    };
                return o.finish = o,
                    i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
            },
            stop: function(e, n, r) {
                var i = function(e) {
                    var t = e.stop;
                    delete e.stop,
                        t(r)
                };
                return typeof e != "string" && (r = n,
                        n = e,
                        e = t),
                    n && e !== !1 && this.queue(e || "fx", []),
                    this.each(function() {
                        var t = !0,
                            n = e != null && e + "queueHooks",
                            s = y.timers,
                            o = y._data(this);
                        if (n)
                            o[n] && o[n].stop && i(o[n]);
                        else
                            for (n in o)
                                o[n] && o[n].stop && $n.test(n) && i(o[n]);
                        for (n = s.length; n--;)
                            s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r),
                                t = !1,
                                s.splice(n, 1));
                        (t || !r) && y.dequeue(this, e)
                    })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"),
                    this.each(function() {
                        var t, n = y._data(this),
                            r = n[e + "queue"],
                            i = n[e + "queueHooks"],
                            s = y.timers,
                            o = r ? r.length : 0;
                        n.finish = !0,
                            y.queue(this, e, []),
                            i && i.cur && i.cur.finish && i.cur.finish.call(this);
                        for (t = s.length; t--;)
                            s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0),
                                s.splice(t, 1));
                        for (t = 0; t < o; t++)
                            r[t] && r[t].finish && r[t].finish.call(this);
                        delete n.finish
                    })
            }
        }),
        y.each({
            slideDown: nr("show"),
            slideUp: nr("hide"),
            slideToggle: nr("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            y.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }),
        y.speed = function(e, t, n) {
            var r = e && typeof e == "object" ? y.extend({}, e) : {
                complete: n || !n && t || y.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !y.isFunction(t) && t
            };
            r.duration = y.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in y.fx.speeds ? y.fx.speeds[r.duration] : y.fx.speeds._default;
            if (r.queue == null || r.queue === !0)
                r.queue = "fx";
            return r.old = r.complete,
                r.complete = function() {
                    y.isFunction(r.old) && r.old.call(this),
                        r.queue && y.dequeue(this, r.queue)
                },
                r
        },
        y.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        },
        y.timers = [],
        y.fx = tr.prototype.init,
        y.fx.tick = function() {
            var e, n = y.timers,
                r = 0;
            zn = y.now();
            for (; r < n.length; r++)
                e = n[r], !e() && n[r] === e && n.splice(r--, 1);
            n.length || y.fx.stop(),
                zn = t
        },
        y.fx.timer = function(e) {
            e() && y.timers.push(e) && y.fx.start()
        },
        y.fx.interval = 13,
        y.fx.start = function() {
            Wn || (Wn = setInterval(y.fx.tick, y.fx.interval))
        },
        y.fx.stop = function() {
            clearInterval(Wn),
                Wn = null
        },
        y.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        y.fx.step = {},
        y.expr && y.expr.filters && (y.expr.filters.animated = function(e) {
            return y.grep(y.timers, function(t) {
                return e === t.elem
            }).length
        }),
        y.fn.offset = function(e) {
            if (arguments.length)
                return e === t ? this : this.each(function(t) {
                    y.offset.setOffset(this, e, t)
                });
            var n, r, i = {
                    top: 0,
                    left: 0
                },
                s = this[0],
                o = s && s.ownerDocument;
            if (!o)
                return;
            return n = o.documentElement,
                y.contains(n, s) ? (typeof s.getBoundingClientRect != "undefined" && (i = s.getBoundingClientRect()),
                    r = rr(o), {
                        top: i.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
                        left: i.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
                    }) : i
        },
        y.offset = {
            setOffset: function(e, t, n) {
                var r = y.css(e, "position");
                r === "static" && (e.style.position = "relative");
                var i = y(e),
                    s = i.offset(),
                    o = y.css(e, "top"),
                    u = y.css(e, "left"),
                    a = (r === "absolute" || r === "fixed") && y.inArray("auto", [o, u]) > -1,
                    f = {},
                    l = {},
                    c, h;
                a ? (l = i.position(),
                        c = l.top,
                        h = l.left) : (c = parseFloat(o) || 0,
                        h = parseFloat(u) || 0),
                    y.isFunction(t) && (t = t.call(e, n, s)),
                    t.top != null && (f.top = t.top - s.top + c),
                    t.left != null && (f.left = t.left - s.left + h),
                    "using" in t ? t.using.call(e, f) : i.css(f)
            }
        },
        y.fn.extend({
            position: function() {
                if (!this[0])
                    return;
                var e, t, n = {
                        top: 0,
                        left: 0
                    },
                    r = this[0];
                return y.css(r, "position") === "fixed" ? t = r.getBoundingClientRect() : (e = this.offsetParent(),
                    t = this.offset(),
                    y.nodeName(e[0], "html") || (n = e.offset()),
                    n.top += y.css(e[0], "borderTopWidth", !0),
                    n.left += y.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - y.css(r, "marginTop", !0),
                    left: t.left - n.left - y.css(r, "marginLeft", !0)
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var e = this.offsetParent || i.documentElement;
                    while (e && !y.nodeName(e, "html") && y.css(e, "position") === "static")
                        e = e.offsetParent;
                    return e || i.documentElement
                })
            }
        }),
        y.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, n) {
            var r = /Y/.test(n);
            y.fn[e] = function(i) {
                return y.access(this, function(e, i, s) {
                    var o = rr(e);
                    if (s === t)
                        return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];
                    o ? o.scrollTo(r ? y(o).scrollLeft() : s, r ? s : y(o).scrollTop()) : e[i] = s
                }, e, i, arguments.length, null)
            }
        }),
        y.each({
            Height: "height",
            Width: "width"
        }, function(e, n) {
            y.each({
                padding: "inner" + e,
                content: n,
                "": "outer" + e
            }, function(r, i) {
                y.fn[i] = function(i, s) {
                    var o = arguments.length && (r || typeof i != "boolean"),
                        u = r || (i === !0 || s === !0 ? "margin" : "border");
                    return y.access(this, function(n, r, i) {
                        var s;
                        return y.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement,
                            Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? y.css(n, r, u) : y.style(n, r, i, u)
                    }, n, o ? i : t, o, null)
                }
            })
        }),
        e.jQuery = e.$ = y,
        typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
            return y
        })
})(window),





// jQuery库结束，利用requrieJS重定义库接口
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
    }),
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
                            t.documentHidden() ? t.onDeactivate() : t.onActivate()
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
    }),
    define("vec2", [], function() {
        var e = function(e, t) {
            var n = this;
            this.x = isNaN(e) ? n.x : e,
                this.y = isNaN(t) ? n.y : t
        };
        return e.constructor = e,
            e.prototype.x = 0,
            e.prototype.y = 0,
            e.prototype.equalsTo = function(e) {
                var t = this;
                return t.x == e.x && t.y == e.y
            },
            e.prototype.radian = function() {
                var e = this,
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
                var e = this,
                    t = 0;
                return e.x == 0 ? e.y > 0 ? t = Math.PI / 2 : e.y < 0 ? t = Math.PI / 2 * 3 : e.y == 0 && (t = 0) : (t = Math.atan(e.y / e.x),
                        e.x < 0 && e.y > 0 ? t += Math.PI : e.x < 0 && e.y < 0 ? t += Math.PI : e.x > 0 && e.y < 0 && (t += Math.PI * 2)),
                    t
            },
            e.prototype.angle2PI = function() {
                var e = this;
                return e.radian2PI() * (180 / Math.PI)
            },
            e.prototype.angle = function() {
                var e = this;
                return e.radian() * (180 / Math.PI)
            },
            e.prototype.multiple = function(e) {
                var t = this;
                t.x = t.x * e,
                    t.y = t.y * e
            },
            e.prototype.multipleWith = function(t) {
                var n = this;
                return new e(n.x * t, n.y * t)
            },
            e.prototype.multipleVec2 = function(e) {
                var t = this;
                t.x = t.x * e.x,
                    t.y = t.y * e.y
            },
            e.prototype.multipleWithVec2 = function(t) {
                var n = this;
                return new e(n.x * t.x, n.y * t.y)
            },
            e.prototype.add = function(t) {
                var n = this;
                return new e(n.x + t.x, n.y + t.y)
            },
            e.prototype.subtract = function(t) {
                var n = this;
                return new e(n.x - t.x, n.y - t.y)
            },
            e.prototype.normalize = function() {
                var e = this,
                    t = e.len();
                t > 0 && (e.x = e.x / t,
                    e.y = e.y / t)
            },
            e.prototype.normalization = function() {
                var t = this,
                    n = t.len(),
                    r = 0,
                    i = 0;
                return n > 0 && (r = t.x / n,
                        i = t.y / n),
                    new e(r, i)
            },
            e.prototype.len = function() {
                var e = this;
                return Math.sqrt(e.x * e.x + e.y * e.y)
            },
            e.prototype.distance = function(e) {
                var t = this;
                return Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y))
            },
            e.prototype.intersect = function(e) {
                var t = this;
                return e.y >= t.x && t.y >= e.x
            },
            e.prototype.contains = function(e) {
                var t = this;
                return e >= t.x && e <= t.y
            },
            e.prototype.clone = function() {
                var t = this;
                return new e(t.x, t.y)
            },
            e.prototype.toString = function() {
                var e = this;
                return "[x:" + e.x + ",y:" + e.y + "]"
            },
            e
    }),
    define("mat3", ["vec2"], function(e) {
        var t = function(e, t, n, r, i, s) {
            var o = this;
            o.a = isNaN(e) ? o.a : parseFloat(e),
                o.b = isNaN(t) ? o.b : parseFloat(t),
                o.c = isNaN(n) ? o.c : parseFloat(n),
                o.d = isNaN(r) ? o.d : parseFloat(r),
                o.tx = isNaN(i) ? o.tx : parseFloat(i),
                o.ty = isNaN(s) ? o.ty : parseFloat(s)
        };
        return t.rotateMat = function(e, n) {
                var r = new t;
                return r.a = Math.cos(e),
                    r.b = Math.sin(e),
                    r.c = -1 * r.b,
                    r.d = r.a,
                    r.tx = n.x - r.a * n.x - r.c * n.y,
                    r.ty = n.y - r.b * n.x - r.d * n.y,
                    r
            },
            t.mat3With3Points = function(e, n) {
                var r = ((n[0].x - n[1].x) * (e[1].y - e[2].y) - (n[1].x - n[2].x) * (e[0].y - e[1].y)) / ((e[0].x - e[1].x) * (e[1].y - e[2].y) - (e[1].x - e[2].x) * (e[0].y - e[1].y)),
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
                var r = this;
                r.concat(new t(e, 0, 0, n))
            },
            t.prototype.rotate = function(e) {
                var n = this,
                    r = e * (Math.PI / 180);
                n.concat(new t(Math.cos(r), Math.sin(r), Math.sin(r) * -1, Math.cos(r)))
            },
            t.prototype.move = function(e, n) {
                var r = this;
                r.concat(new t(1, 0, 0, 1, e, n))
            },
            t.prototype.concat = function(e) {
                var t = this,
                    n = t.concatWith(e);
                t.a = n.a,
                    t.b = n.b,
                    t.c = n.c,
                    t.d = n.d,
                    t.tx = n.tx,
                    t.ty = n.ty
            },
            t.prototype.concatWith = function(e) {
                var n = this,
                    r = n.a * e.a + n.b * e.c,
                    i = n.a * e.b + n.b * e.d,
                    s = n.c * e.a + n.d * e.c,
                    o = n.c * e.b + n.d * e.d,
                    u = n.tx * e.a + n.ty * e.c + e.tx,
                    a = n.tx * e.b + n.ty * e.d + e.ty;
                return new t(r, i, s, o, u, a)
            },
            t.prototype.transformPoint = function(t) {
                var n = this,
                    r = new e;
                return r.x = t.x * n.a + t.y * n.c + n.tx,
                    r.y = t.x * n.b + t.y * n.d + n.ty,
                    r
            },
            t.prototype.inversePoint = function(e) {
                var t = this,
                    n = t.inversion();
                return n.transformPoint(e)
            },
            t.prototype.determinant = function() {
                var e = this;
                return e.a * e.d - e.b * e.c
            },
            t.prototype.inversion = function() {
                var e = this,
                    t = e.clone();
                return t.inverse(),
                    t
            },
            t.prototype.inverse = function() {
                var e = this,
                    t = e.determinant();
                if (t === 0)
                    throw new Error("The matrix can not be inverse properly. " + e.toString());
                var n = 1 / t,
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
                var e = this,
                    n = e.d,
                    r = -1 * e.b,
                    i = -1 * e.c,
                    s = e.a,
                    o = e.c * e.ty - e.d * e.tx,
                    u = -1 * (e.a * e.ty - e.b * e.tx);
                return new t(n, r, i, s, o, u)
            },
            t.prototype.equalsTo = function(e) {
                var t = this,
                    n = !1;
                return e != null && (n = t.a == e.a && t.b == e.b && t.c == e.c && t.d == e.d && t.tx == e.tx && t.ty == e.ty),
                    n
            },
            t.prototype.clone = function() {
                var e = this;
                return new t(e.a, e.b, e.c, e.d, e.tx, e.ty)
            },
            t.prototype.toArray = function() {
                var e = this;
                return [e.a, e.b, e.c, e.d, e.tx, e.ty]
            },
            t.prototype.toString = function() {
                var e = this,
                    t = "a:" + e.a + "  " + "b:" + e.b;
                return t += " c:" + e.c + "  " + "d:" + e.d,
                    t += " tx:" + e.tx + "  " + "ty:" + e.ty,
                    t
            },
            t
    }),
    define("event", [], function() {
        var e = function(e, t) {
            var n = this;
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
                var n = this;
                return t = arguments.length > 0 ? t : n.target,
                    new e(t, n.type)
            },
            e
    }),
    define("touch_event", ["event"], function(e) {
        var t = function(t, n, r) {
            var i = this;
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
                var n = this;
                return e = arguments.length > 0 ? e : n.target,
                    new t(e, n.type, n.touches.slice(0))
            },
            t
    }),
    define("touch", [], function() {
        var e = function(e, t, n, r) {
            var i = this;
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
    }),
    define("text_align", [], function() {
        var e = function() {};
        return e.LEFT = "left",
            e.CENTER = "center",
            e.RIGHT = "right",
            e
    }),
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
    }),
    define("event_center", [], function() {
        var e = function(e, t, n, r) {
                var i = this;
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
                var t = this;
                t.handler.call(t.listener, e)
            },
            t.checkIfMatch = function(e, t, n, r) {
                var i = this,
                    s = !0;
                typeof e != "undefined" && e != null && (s = i.target === e),
                    s && typeof t != "undefined" && t != null && (s = i.listener === t);
                if (s && typeof n != "undefined") {
                    var o = !1;
                    for (var u = 0; u < n.length; u++) {
                        var a = n[u];
                        if (a == i.event) {
                            o = !0;
                            break
                        }
                    }
                    s = o
                }
                if (s && typeof r != "undefined") {
                    var f = !1;
                    for (var l = 0; l < r.length; l++) {
                        var c = r[l];
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
                var e = this;
                e.listener = null,
                    e.target = null,
                    e.event = null,
                    e.handler = null
            };
        var n = function() {};
        return n.listeners = [],
            n.addListener = function(t, r, i, s) {
                i = typeof i == "string" ? [i] : i,
                    s = typeof s == "function" ? [s] : s;
                for (var o = 0; o < i.length && o < s.length; o++) {
                    var u = i[o],
                        a = s[o],
                        f = new e(t, r, u, a);
                    n.listeners.push(f)
                }
            },
            n.removeListener = function(e, t, r, i) {
                r = typeof r == "string" ? [r] : r,
                    i = typeof i == "function" ? [i] : i;
                for (var s = n.listeners.length - 1; s >= 0; s--) {
                    var o = n.listeners[s];
                    o.checkIfMatch(e, t, r, i) && n.listeners.splice(s, 1)
                }
            },
            n.dispatchEvent = function(e) {
                var t = e.type,
                    r = e.target,
                    i = n.listeners.slice();
                for (var s = 0; s < i.length; s++) {
                    var o = i[s];
                    o != null && o != undefined && o.checkIfMatch(r, null, [t]) && o.execute(e)
                }
            },
            n
    }),
    define("rect", ["vec2"], function(e) {
        var t = function(e, t, n, r) {
            var i = this;
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
                var e = this;
                return e.x === 0 && e.y === 0 && e.width === 0 && e.height === 0
            },
            t.prototype.left = function(e) {
                var t = this;
                return arguments.length > 0 && (t.x = e),
                    t.x
            },
            t.prototype.right = function(e) {
                var t = this;
                return arguments.length > 0 && (t.width = e - t.x),
                    t.x + t.width
            },
            t.prototype.top = function(e) {
                var t = this;
                return arguments.length > 0 && (t.y = e),
                    t.y
            },
            t.prototype.bottom = function(e) {
                var t = this;
                return arguments.length > 0 && (t.height = e - t.y),
                    t.y + t.height
            },
            t.prototype.topLeft = function() {
                var t = this;
                return new e(t.x, t.y)
            },
            t.prototype.topRight = function() {
                var t = this;
                return new e(t.right(), t.top())
            },
            t.prototype.bottomRight = function() {
                var t = this;
                return new e(t.right(), t.bottom())
            },
            t.prototype.bottomLeft = function() {
                var t = this;
                return new e(t.left(), t.bottom())
            },
            t.prototype.equalsTo = function(e) {
                var t = this;
                return t.x == e.x && t.y == e.y && t.width == e.width && t.height == e.height
            },
            t.prototype.containsVec2 = function(e) {
                var t = this;
                return e.x >= t.left() && e.x <= t.right() && e.y >= t.top() && e.y <= t.bottom()
            },
            t.prototype.containsRect = function(e) {
                var t = this;
                return e.left() >= t.left() && e.right() <= t.right() && e.top() >= t.top() && e.bottom() <= t.bottom()
            },
            t.prototype.intersect = function(n) {
                var r = this,
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
                var e = this;
                e.x = Math.ceil(e.x),
                    e.y = Math.ceil(e.y),
                    e.width = Math.floor(e.width),
                    e.height = Math.floor(e.height)
            },
            t.prototype.expand = function() {
                var e = this;
                e.x = Math.floor(e.x),
                    e.y = Math.floor(e.y),
                    e.width = Math.ceil(e.width),
                    e.height = Math.ceil(e.height)
            },
            t.prototype.clone = function() {
                var e = this;
                return new t(e.x, e.y, e.width, e.height)
            },
            t.prototype.toString = function() {
                var e = this;
                return "[x:" + e.x + ",y:" + e.y + ",width:" + e.width + ",height:" + e.height + "]"
            },
            t
    }),
    define("paths", [], function() {
        var e = function() {};
        return e.prototype.delegate = null,
            e.prototype.rect = function(e) {
                var t = this,
                    n = [e.x, e.y, e.width, e.height];
                t.addCommand("R:" + n.join(","))
            },
            e.prototype.circle = function(e) {
                var t = this,
                    n = [e.center.x, e.center.y, e.radius, 0, Math.PI * 2];
                t.addCommand("A:" + n.join(","))
            },
            e.prototype.moveTo = function(e, t) {
                var n = this,
                    r = [e, t];
                n.addCommand("M:" + r.join(","))
            },
            e.prototype.lineTo = function(e, t) {
                var n = this,
                    r = [e, t];
                n.addCommand("L:" + r.join(","))
            },
            e.prototype.arc = function(e, t, n, r, i, s) {
                var o = this,
                    u = [];
                for (var a = 0; a < arguments.length; a++)
                    u.push(arguments[a]);
                u.length < 5 && (u[3] = 0,
                        u[4] = Math.PI * 2),
                    o.addCommand("A:" + u.join(","))
            },
            e.prototype.arcTo = function(e, t, n, r, i) {
                var s = this,
                    o = [e, t, n, r, i];
                s.addCommand("AT:" + o.join(","))
            },
            e.prototype.closePath = function() {
                var e = this;
                e.addCommand("C")
            },
            e.prototype._commands = null,
            e.prototype.commands = function() {
                var e = this;
                return e._commands == null && (e._commands = []),
                    e._commands
            },
            e.prototype.clearCommands = function() {
                var e = this;
                e._commands = [],
                    e.delegate != null && e.delegate.onPathChanged(e)
            },
            e.prototype.operationMap = function(e) {
                var t = null;
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
                var t = this,
                    n = e.split("|");
                for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                        s = i.split(":"),
                        o = t.operationMap(s[0]);
                    if (o != null) {
                        var u = s.length > 1 ? s[1].split(",") : [];
                        for (var a = 0; a < u.length; a++)
                            u[a] = parseFloat(u[a]);
                        var f = {
                            o: o,
                            p: u
                        };
                        t.commands().push(f)
                    }
                }
                t.delegate != null && t.delegate.onPathChanged(t)
            },
            e.prototype.clone = function() {
                var t = this,
                    n = new e;
                return n._commands = t.commands().slice(),
                    n
            },
            e
    }),
    define("string_util", [], function() {
        var e = function() {};
        return e.fillStringTo = function(e, t, n, r) {
                var i = e.slice(0);
                r = arguments.length >= 4 ? r : !0;
                while (i.length < n)
                    i = r ? t + i : i + t;
                return i
            },
            e
    }),
    define("color", ["string_util"], function(e) {
        var t = function(e) {
            var t = this;
            if (arguments.length >= 1) {
                var n = e.replace(/^#|^0x/, ""),
                    r = parseInt(n, 16);
                if (n.length != 6 && n.length != 8 || isNaN(r))
                    throw new Error("Invalid color value: " + e);
                var i, s, o, u;
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
                var s = new t;
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
                var r = e >> 16 & 255,
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
                var n = this;
                if (n.bit24String == null || n.bit24Updated === !1) {
                    var r = e.fillStringTo(n.r().toString(16), "0", 2).toUpperCase(),
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
                var n = this;
                if (n.bit32String == null || n.bit32Updated === !1) {
                    var r = e.fillStringTo(n.r().toString(16), "0", 2).toUpperCase(),
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
                var e = this;
                if (e.rgbString == null || e.rgbStringUpdated === !1) {
                    e.rgbStringUpdated = !0;
                    var t = Math.round(e.r()),
                        n = Math.round(e.g()),
                        r = Math.round(e.b());
                    e.rgbString = "rgb(" + t.toString(10) + "," + n.toString(10) + "," + r.toString() + ")"
                }
                return e.rgbString
            },
            t.prototype.rgbaString = null,
            t.prototype.rgbaStringUpdated = !1,
            t.prototype.toRGBAString = function() {
                var e = this;
                if (e.rgbaString == null || e.rgbaStringUpdated === !1) {
                    e.rgbaStringUpdated = !0;
                    var t = Math.round(e.r()),
                        n = Math.round(e.g()),
                        r = Math.round(e.b()),
                        i = Math.round(e.a() / 255 * 100) / 100;
                    e.rgbaString = "rgba(" + t.toString(10) + "," + n.toString(10) + "," + r.toString() + "," + i.toString() + ")"
                }
                return e.rgbaString
            },
            t.prototype._r = 0,
            t.prototype.r = function(e) {
                var t = this;
                return arguments.length > 0 && e != t._r && (t._r = Math.round(e),
                        t.bit24Updated = !1,
                        t.bit32Updated = !1,
                        t.rgbaStringUpdated = !1,
                        t.rgbStringUpdated = !1),
                    t._r
            },
            t.prototype._g = 0,
            t.prototype.g = function(e) {
                var t = this;
                return arguments.length > 0 && e != t._g && (t._g = Math.round(e),
                        t.bit24Updated = !1,
                        t.bit32Updated = !1,
                        t.rgbaStringUpdated = !1,
                        t.rgbStringUpdated = !1),
                    t._g
            },
            t.prototype._b = 0,
            t.prototype.b = function(e) {
                var t = this;
                return arguments.length > 0 && e != t._b && (t._b = Math.round(e),
                        t.bit24Updated = !1,
                        t.bit32Updated = !1,
                        t.rgbaStringUpdated = !1,
                        t.rgbStringUpdated = !1),
                    t._b
            },
            t.prototype._a = 0,
            t.prototype.a = function(e) {
                var t = this;
                return arguments.length > 0 && e != t._a && (t._a = Math.round(e),
                        t.bit24Updated = !1,
                        t.bit32Updated = !1,
                        t.rgbaStringUpdated = !1,
                        t.rgbStringUpdated = !1),
                    t._a
            },
            t.prototype.adjustSaturation = function(e) {
                var t = this,
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
                var t = this;
                return t.r() === e.r() && t.g() === e.g() && t.b() === e.b() && t.a() === e.a()
            },
            t.prototype.clone = function() {
                var e = this;
                return t.colorWithRGBA(e.r(), e.g(), e.b(), e.a())
            },
            t
    });
var Linear = function() {};
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
var Cubic = function() {};
Cubic.easeIn = function(e, t, n, r) {
        return n * (e /= r) * e * e + t
    },
    Cubic.easeOut = function(e, t, n, r) {
        return n * ((e = e / r - 1) * e * e + 1) + t
    },
    Cubic.easeInOut = function(e, t, n, r) {
        return (e /= r / 2) < 1 ? n / 2 * e * e * e + t : n / 2 * ((e -= 2) * e * e + 2) + t
    };
var Bounce = function() {};
Bounce.easeIn = function(e, t, n, r) {
        return n - Bounce.easeOut(r - e, 0, n, r) + t
    },
    Bounce.easeOut = function(e, t, n, r) {
        return (e /= r) < 1 / 2.75 ? n * 7.5625 * e * e + t : e < 2 / 2.75 ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : e < 2.5 / 2.75 ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
    },
    Bounce.easeInOut = function(e, t, n, r) {
        return e < r / 2 ? Bounce.easeIn(e * 2, 0, n, r) * .5 + t : Bounce.easeOut(e * 2 - r, 0, n, r) * .5 + n * .5 + t
    };
var Back = function() {};
Back.easeIn = function(e, t, n, r) {
        var i = 1.70158;
        return n * (e /= r) * e * ((i + 1) * e - i) + t
    },
    Back.easeOut = function(e, t, n, r) {
        var i = 1.70158;
        return n * ((e = e / r - 1) * e * ((i + 1) * e + i) + 1) + t
    },
    Back.easeInOut = function(e, t, n, r) {
        var i = 1.70158;
        return (e /= r / 2) < 1 ? n / 2 * e * e * (((i *= 1.525) + 1) * e - i) + t : n / 2 * ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) + t
    },
    define("easing", function() {}),
    define("animate", ["mat3", "color", "easing"], function(e, t) {
        var n = function(e, t, n, r, i, s) {
                var o = this;
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
                var t = this;
                t.startTS = e,
                    t.from = {};
                for (var n in t.to)
                    if (t.to.hasOwnProperty(n) && typeof t.target[n] == "function") {
                        var r = t.target[n],
                            i = r.call(t.target);
                        t.from[n] = i.clone ? i.clone() : i
                    }
            },
            r.update = function(n) {
                var r = this,
                    i = Math.min(n - r.startTS, r.duration),
                    s = r.easing(i, 0, 1, r.duration);
                for (var o in r.from)
                    if (r.from.hasOwnProperty(o)) {
                        var u = r.from[o],
                            a = r.to[o];
                        if (o == "matrix") {
                            var f = new e;
                            f.a = u.a + (a.a - u.a) * s,
                                f.b = u.b + (a.b - u.b) * s,
                                f.c = u.c + (a.c - u.c) * s,
                                f.d = u.d + (a.d - u.d) * s,
                                f.tx = u.tx + (a.tx - u.tx) * s,
                                f.ty = u.ty + (a.ty - u.ty) * s,
                                r.target.matrix(f)
                        } else if (o == "bgColor") {
                            var l = u.r() + (a.r() - u.r()) * s,
                                c = u.g() + (a.g() - u.g()) * s,
                                h = u.b() + (a.b() - u.b()) * s,
                                p = u.a() + (a.a() - u.a()) * s;
                            r.target.bgColor(t.colorWithRGBA(l, c, h, p))
                        } else if (isNaN(u) === !1 && isNaN(a) === !1) {
                            var d = u + (a - u) * s;
                            r.target[o](d)
                        }
                    }
                typeof r.onUpdate == "function" && r.onUpdate(r.target, s);
                var v = n - r.startTS >= r.duration;
                return v && typeof r.onComplete == "function" && r.onComplete(r.target),
                    v
            },
            r.jumpToEnd = function() {
                var e = this;
                e.update(e.startTS + e.duration)
            },
            n
    }),
    define("align_mode", [], function() {
        var e = function() {};
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
    }),
    define("scale_mode", ["mat3", "vec2", "align_mode"], function(e, t, n) {
        var r = function() {};
        return r.align = function(e, r, i, s, o) {
                var u = new t;
                return (o & n.LEFT) != 0 ? u.x = 0 : (o & n.CENTER) != 0 ? u.x = Math.round(i / 2 - e / 2) : (o & n.RIGHT) != 0 && (u.x = Math.round(i - e)),
                    (o & n.TOP) != 0 ? u.y = 0 : (o & n.MIDDLE) != 0 ? u.y = Math.round(s / 2 - r / 2) : (o & n.BOTTOM) != 0 && (u.y = Math.round(s - r)),
                    u
            },
            r.noScale = function(t, n, i, s, o) {
                var u = new e,
                    a = r.align(t, n, i, s, o);
                return u.tx = a.x,
                    u.ty = a.y,
                    u
            },
            r.showAll = function(t, n, i, s, o) {
                var u = Math.min(i / t, s / n),
                    a = Math.round(t * u),
                    f = Math.round(n * u),
                    l = new e;
                l.a = a / t,
                    l.d = f / n;
                var c = r.align(a, f, i, s, o);
                return l.tx = c.x,
                    l.ty = c.y,
                    l
            },
            r.noBorder = function(t, n, i, s, o) {
                var u = Math.max(i / t, s / n),
                    a = Math.round(t * u),
                    f = Math.round(n * u),
                    l = new e;
                l.a = a / t,
                    l.d = f / n;
                var c = r.align(a, f, i, s, o);
                return l.tx = c.x,
                    l.ty = c.y,
                    l
            },
            r.extraFit = function(t, n, r, i) {
                var s = new e;
                return s.a = r / t,
                    s.d = i / n,
                    s
            },
            r.fitWidth = function(t, n, i, s, o) {
                var u = i / t,
                    a = Math.round(t * u),
                    f = Math.round(n * u),
                    l = new e;
                l.a = a / t,
                    l.d = f / n;
                var c = r.align(a, f, i, s, o);
                return l.tx = c.x,
                    l.ty = c.y,
                    l
            },
            r.fitHeight = function(t, n, i, s, o) {
                var u = s / n,
                    a = Math.round(t * u),
                    f = Math.round(n * u),
                    l = new e;
                l.a = a / t,
                    l.d = f / n;
                var c = r.align(a, f, i, s, o);
                return l.tx = c.x,
                    l.ty = c.y,
                    l
            },
            r
    }),
    define("view", ["jquery", "mat3", "rect", "vec2", "paths", "animate", "color", "event", "event_center", "touch", "touch_event", "scale_mode", "align_mode"], function(e, t, n, r, i, s, o, u, a, f, l, c, h) {
        var p = function() {};
        return p.viewIndex = 0,
            p.issueViewName = function(e) {
                var t = e + "_" + p.viewIndex;
                return p.viewIndex += 1,
                    t
            },
            p.prototype.className = "AXEView",
            p.prototype.controller = null,
            p.prototype.dealloc = function() {
                var e = this;
                e._matrix = null,
                    e._mask = null,
                    e.remove(),
                    a.removeListener(e)
            },
            p.prototype.clone = function() {
                var e = this,
                    t = new p;
                return e.copyProperties(t),
                    t
            },
            p.prototype.copyProperties = function(e) {
                var t = this;
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
                var n = this;
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
                var r = e.find("> mask");
                if (r.length > 0) {
                    var s = new i;
                    s.addCommand(r.text()),
                        n.mask(s)
                } else
                    n.mask(null);
                var u = new t;
                if (e.is("[matrix]")) {
                    var a = e.attr("matrix").split(",");
                    u.a = parseFloat(a[0]),
                        u.b = parseFloat(a[1]),
                        u.c = parseFloat(a[2]),
                        u.d = parseFloat(a[3]),
                        u.tx = parseFloat(a[4]),
                        u.ty = parseFloat(a[5])
                } else {
                    var f = e.is("[scale-x]") ? parseFloat(e.attr("scale-x")) : 1,
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
                    var m = h[e.attr("align")];
                    n.alignMode(m)
                }
                if (e.is("[scale-mode]")) {
                    var g = e.attr("scale-mode");
                    typeof c[g] == "function" && n.scaleMode(c[g])
                }
                n.controller != null && n.controller.onViewUpdateFromXML(e)
            },
            p.prototype.cachedImage = null,
            p.prototype._name = null,
            p.prototype.name = function(e) {
                var t = this;
                return arguments.length > 0 && (t._name = e),
                    t._name == null && (t._name = p.issueViewName(t.className)),
                    t._name
            },
            p.prototype.pathname = function() {
                var e = this,
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
                var t = this;
                return arguments.length > 0 && e != t._needToRender && (t._needToRender = e),
                    t._needToRender
            },
            p.prototype._scaleMode = null,
            p.prototype.scaleMode = function(e) {
                var t = this;
                if (arguments.length > 0 && t._scaleMode != e) {
                    t._scaleMode = e;
                    var n = t.stage();
                    n != null && t.resize(n.stageWidth(), n.stageHeight())
                }
                return t._scaleMode
            },
            p.prototype._alignMode = null,
            p.prototype.alignMode = function(e) {
                var t = this;
                if (arguments.length > 0 && t._alignMode != e) {
                    t._alignMode = e;
                    var n = t.stage();
                    n != null && t.resize(n.stageWidth(), n.stageHeight())
                }
                return t._alignMode
            },
            p.prototype.x = function(e) {
                var t = this;
                if (arguments.length > 0) {
                    var n = t.matrix().clone();
                    n.tx = e,
                        t.matrix(n)
                }
                return t.matrix().tx
            },
            p.prototype.y = function(e) {
                var t = this;
                if (arguments.length > 0) {
                    var n = t.matrix().clone();
                    n.ty = e,
                        t.matrix(n)
                }
                return t.matrix().ty
            },
            p.prototype.scaleX = function(e) {
                var t = this,
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
                var t = this,
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
                var t = this,
                    n = 0;
                if (arguments.length > 0) {
                    n = e;
                    var r = e * (Math.PI / 180);
                    t.radian(r)
                } else
                    n = t.radian() * (180 / Math.PI);
                return n
            },
            p.prototype.radian = function(e) {
                var t = this,
                    n = t.matrix(),
                    r = Math.asin(n.b);
                n.b > 0 && n.a < 0 ? r = Math.PI - r : n.b < 0 && n.a < 0 ? r = Math.PI - r : n.b < 0 && n.a > 0 && (r = Math.PI * 2 + r);
                if (arguments.length > 0) {
                    var i = n.a / Math.cos(r);
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
                var n = this;
                return arguments.length > 0 && (n._matrix = e.clone(),
                        n.needToRender(!0)),
                    n._matrix == null && (n._matrix = new t),
                    n._matrix
            },
            p.prototype._width = 0,
            p.prototype.width = function(e) {
                var t = this;
                return isNaN(e) == 0 && t._width != e && (t._width = e,
                        t.needToRender(!0)),
                    t._width
            },
            p.prototype._height = 0,
            p.prototype.height = function(e) {
                var t = this;
                return isNaN(e) == 0 && t._height != e && (t._height = e,
                        t.needToRender(!0)),
                    t._height
            },
            p.prototype._alpha = 1,
            p.prototype.alpha = function(e) {
                var t = this;
                return arguments.length > 0 && t._alpha != e && (t._alpha = e,
                        t.needToRender(!0)),
                    t._alpha
            },
            p.prototype._saturation = 1,
            p.prototype.saturation = function(e) {
                var t = this;
                return isNaN(e) == 0 && (e = Math.max(0, Math.min(1, e)),
                        e != t._saturation && (t._saturation = e,
                            t.needToRender(!0))),
                    t._saturation
            },
            p.prototype._bgColor = null,
            p.prototype.bgColor = function(e) {
                var t = this;
                return arguments.length > 0 && (t._bgColor = Boolean(e) ? e.clone() : null,
                        t.needToRender(!0)),
                    t._bgColor
            },
            p.prototype._clip = !1,
            p.prototype.clip = function(e) {
                var t = this;
                return arguments.length > 0 && e != t._clip && (t._clip = e,
                        t.needToRender(!0)),
                    t._clip
            },
            p.prototype._mask = null,
            p.prototype.mask = function(e) {
                var t = this;
                return arguments.length > 0 && (t._mask = e,
                        t.needToRender(!0)),
                    t._mask
            },
            p.prototype._shadowOffsetX = 0,
            p.prototype.shadowOffsetX = function(e) {
                var t = this;
                return isNaN(parseFloat(e)) === !1 && parseFloat(e) != t._shadowOffsetX && (t._shadowOffsetX = parseFloat(e),
                        t.needToRender(!0)),
                    t._shadowOffsetX
            },
            p.prototype._shadowOffsetY = 0,
            p.prototype.shadowOffsetY = function(e) {
                var t = this;
                return isNaN(parseFloat(e)) === !1 && parseFloat(e) != t._shadowOffsetY && (t._shadowOffsetY = parseFloat(e),
                        t.needToRender(!0)),
                    t._shadowOffsetY
            },
            p.prototype._shadowColor = null,
            p.prototype.shadowColor = function(e) {
                var t = this;
                return arguments.length > 0 && typeof e == "object" && (t._shadowColor = e,
                        t.needToRender(!0)),
                    t._shadowColor
            },
            p.prototype._shadowBlur = 0,
            p.prototype.shadowBlur = function(e) {
                var t = this;
                return arguments.length > 0 && isNaN(parseInt(e, 10)) === !1 && parseInt(e, 10) != t._shadowBlur && (t._shadowBlur = e,
                        t.needToRender(!0)),
                    t._shadowBlur
            },
            p.prototype._blendMode = "source-over",
            p.prototype.blendMode = function(e) {
                var t = this;
                return typeof e == "string" && (t._blendMode = e,
                        t.needToRender(!0)),
                    t._blendMode
            },
            p.prototype._visible = !0,
            p.prototype.visible = function(e) {
                var t = this;
                return typeof e == "boolean" && e != t._visible && (t._visible = e,
                        t.needToRender(!0)),
                    t._visible
            },
            p.prototype._parent = null,
            p.prototype.parent = function(e) {
                var t = this;
                return arguments.length > 0 && (t._parent = e),
                    t._parent
            },
            p.prototype.remove = function() {
                var e = this;
                e.parent() != null && e.parent().removeSubView(e)
            },
            p.prototype._enabled = !0,
            p.prototype.enabled = function(e) {
                var t = this;
                return typeof e == "boolean" && e != t._enabled && (t._enabled = e,
                        t.lastEvent = null),
                    t._enabled
            },
            p.prototype.matrixTo = function(e) {
                var n = this,
                    r = null;
                if (arguments.length > 0) {
                    var i = e,
                        s = new t,
                        o = new t;
                    while (i != null && r == null) {
                        var u = n;
                        while (u != null) {
                            if (i == u) {
                                var a = o.inversion();
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
                var t = this,
                    i = new r(0, 0),
                    s = new r(t.width(), 0),
                    o = new r(0, t.height()),
                    u = new r(t.width(), t.height()),
                    a = arguments.length > 0 ? t.matrixTo(e) : t.matrixTo(),
                    f = null;
                if (a != null) {
                    var l = a.transformPoint(i),
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
                var t = this,
                    n = [],
                    i = t.matrixTo(e.target);
                for (var s = 0; s < e.touches.length; s++) {
                    var o = new r(e.touches[s].x, e.touches[s].y);
                    o = i.inversePoint(o);
                    var u = new f(o.x, o.y, e.touches[s].stageX, e.touches[s].stageY);
                    n.push(u)
                }
                return n
            },
            p.prototype.lastEvent = null,
            p.prototype.startEvent = null,
            p.prototype.triggerEvent = function(e) {
                var t = this,
                    n = !1;
                if (t.enabled() && t.visible()) {
                    var i = t.animating();
                    if (e.type == l.TOUCH_START) {
                        var s = t.rect(e.target),
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
                        var f = t.lastEvent,
                            c = t.startEvent;
                        t.lastEvent = null,
                            t.startEvent = null,
                            n = !0,
                            a.dispatchEvent(new l(t, e.type, [])),
                            f.type == l.TOUCH_START && a.dispatchEvent(new l(t, l.CLICK, f.touches));
                        if (f.type == l.TOUCH_MOVE && f.timeStamp - c.timeStamp < 500 && f.touches.length <= 1 && c.touches.length <= 1) {
                            var h = new r(c.touches[0].stageX, c.touches[0].stageY),
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
                var t = this;
                typeof e == "boolean" && (t._animating = e);
                var n = t._animating;
                return n === !1 && t.parent() != null && (n = t.parent().animating()),
                    n
            },
            p.prototype.animate = function(e, t, n, r, i) {
                var o = this;
                o.objAnimate = new s(o, e, t, n, r, i),
                    o.animateChangeFlag = !0
            },
            p.prototype.stopAnimation = function(e) {
                var t = this;
                t.objAnimate != null && (e = arguments.length >= 1 ? e : !1,
                    t._animating && e && t.objAnimate.jumpToEnd(),
                    t.animating(!1),
                    t.animateChangeFlag = !1,
                    t.objAnimate = null,
                    t.onAnimationStop())
            },
            p.prototype.onAnimationStart = function() {
                var e = this;
                e.controller != null && e.controller.onViewStartAnimate();
                var t = new u(e, u.ANIMATION_BEGIN);
                a.dispatchEvent(t)
            },
            p.prototype.onAnimationStop = function() {
                var e = this;
                e.controller != null && e.controller.onViewEndAnimate();
                var t = new u(e, u.ANIMATION_END);
                a.dispatchEvent(t)
            },
            p.prototype.onAdd = function(e) {
                var t = this;
                t.controller != null && t.controller.onViewAdded(e);
                var n = new u(t, u.ADDED);
                a.dispatchEvent(n)
            },
            p.prototype.removeFromStage = function() {
                var e = this;
                e.lastEvent = null,
                    e.startEvent = null,
                    e.controller != null && e.controller.onViewRemoveFromStage();
                var t = new u(e, u.REMOVE_FROM_STAGE);
                a.dispatchEvent(t)
            },
            p.prototype.onRemoveFromSuperView = function(e) {
                var t = this;
                t.lastEvent = null,
                    t.startEvent = null,
                    t.controller != null && t.controller.onViewRemoved(e);
                var n = new u(t, u.REMOVED);
                a.dispatchEvent(n),
                    t.removeFromStage()
            },
            p.prototype.stage = function() {
                var e = this;
                while (e != null && e.className != "AXEStage")
                    e = e.parent();
                return e
            },
            p.prototype.onStage = !1,
            p.prototype.onAddToStage = function() {
                var e = this;
                e.onStage = !0,
                    e.lastEvent = null,
                    e.startEvent = null,
                    e.controller != null && e.controller.onViewAddToStage();
                var t = new u(e, u.ADD_TO_STAGE);
                a.dispatchEvent(t);
                var n = e.stage();
                n != null && (e.onWindowOrientationChanged(n.orientation),
                    e.resize(n.stageWidth(), n.stageHeight()))
            },
            p.prototype.onWindowOrientationChanged = function(e) {
                var t = this;
                t.windowOrientationChange(e),
                    t.controller != null && t.controller.onWindowOrientationChanged(e)
            },
            p.prototype.windowOrientationChange = function(e) {},
            p.prototype._active = !0,
            p.prototype.active = function(e) {
                var t = this;
                return e != undefined && t._active != e && (t._active = e,
                        t._active ? (t.onActivate(),
                            t.controller != null && t.controller.onViewActivate()) : (t.onDeactivate(),
                            t.controller != null && t.controller.onViewDeactivate())),
                    t._active
            },
            p.prototype.onActivate = function() {},
            p.prototype.onDeactivate = function() {},
            p.prototype.resize = function(e, t) {
                var n = this;
                if (n.alignMode() != null && n.scaleMode() != null) {
                    var r = n.alignMode(),
                        i = n.scaleMode(),
                        s = i(n.width(), n.height(), e, t, r);
                    n.matrix(s)
                }
                n.controller != null && n.controller.onViewResize(e, t);
                var o = new u(n, u.RESIZE);
                a.dispatchEvent(o)
            },
            p.prototype.update = function(e, t) {
                var n = this;
                n.animateChangeFlag && (n.animateChangeFlag = !1,
                    n.objAnimate != null && (n.objAnimate.init(e),
                        n.animating(!0),
                        n.onAnimationStart()));
                if (n.objAnimate != null) {
                    var r = n.objAnimate.update(e);
                    r && (n.objAnimate = null,
                        n.animating(!1),
                        n.onAnimationStop())
                }
                n.controller != null && n.controller.onViewUpdated(e, t),
                    n.needToRender() && (n.cachedImage = null)
            },
            p
    }),
    define("view_factory", [], function() {
        var e = function() {};
        return e.ViewClasses = {},
            e.createViewByNodeName = function(t) {
                var n = null;
                if (e.ViewClasses.hasOwnProperty(t)) {
                    var r = e.ViewClasses[t];
                    n = new r
                }
                return n
            },
            e.addClass = function(t, n) {
                e.ViewClasses[t] = n
            },
            e
    }),
    define("view_container", ["view", "rect", "view_factory"], function(e, t, n) {
        var r = function() {};
        return r.prototype = new e,
            r.prototype.constructor = r,
            r.prototype.className = "AXEViewContainer",
            r.prototype.clone = function() {
                var e = this,
                    t = new r;
                return e.copyProperties(t),
                    t
            },
            r.prototype.copyProperties = function(t) {
                var n = this;
                e.prototype.copyProperties.call(n, t),
                    t.muted(n.muted()),
                    n.subViews().length > 0 && n.eachSubView(function(e, n) {
                        t.addSubView(n.clone())
                    })
            },
            r.prototype.dealloc = function() {
                var t = this,
                    n = t.subViews();
                for (var r = 0; r < n.length; r++) {
                    var i = n[r];
                    i.dealloc()
                }
                e.prototype.dealloc.call(t)
            },
            r.prototype.updatePropsFromXML = function(t) {
                var r = this;
                e.prototype.updatePropsFromXML.call(r, t),
                    t.is("[muted]") && r.muted(t.attr("muted") == "true");
                var i = t.find("> *");
                i.each(function(e, t) {
                    var i = $(t),
                        s = i[0].nodeName.toLowerCase(),
                        o = n.createViewByNodeName(s);
                    o != null && (o.updatePropsFromXML(i),
                        r.addSubView(o))
                })
            },
            r.prototype.needToRender = function(t) {
                var n = this,
                    r, i = n.subViews();
                if (arguments.length > 0)
                    r = e.prototype.needToRender.call(n, t);
                else {
                    r = e.prototype.needToRender.call(n);
                    if (r === !1)
                        for (var s = 0; s < i.length; s++) {
                            var o = i[s];
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
                var e = this;
                return e._subViews == null && (e._subViews = []),
                    e._subViews
            },
            r.prototype.addSubView = function(e) {
                var t = this;
                e.parent() != null && e.parent().moveSubView(e),
                    t.subViews().push(e),
                    t.afterSubViewAdded(e)
            },
            r.prototype.insertSubViewAt = function(e, t) {
                var n = this;
                e.parent() != null && e.parent().moveSubView(e);
                var r = n.subViews();
                t = Math.max(0, Math.min(r.length - 1, t)),
                    r.splice(t, 0, e),
                    n.afterSubViewAdded(e)
            },
            r.prototype.afterSubViewAdded = function(e) {
                var t = this;
                e.parent(t),
                    e.onAdd(t),
                    t.onStage && e.onAddToStage(),
                    e.active(t.active()),
                    t.needToRender(!0)
            },
            r.prototype.onAddToStage = function() {
                var t = this;
                e.prototype.onAddToStage.call(t);
                for (var n = 0; n < t.subViews().length; n++) {
                    var r = t.subViews()[n];
                    r.onAddToStage()
                }
            },
            r.prototype.empty = function() {
                var e = this,
                    t = e.subViews().slice(0);
                for (var n = 0; n < t.length; n++)
                    e.removeSubView(t[n])
            },
            r.prototype.moveSubView = function(e) {
                var t = this,
                    n = !1;
                if (e.parent() == t)
                    for (var r = 0; r < t.subViews().length; r++) {
                        var i = t.subViews()[r];
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
                var t = this,
                    n = t.moveSubView(e);
                n && e.onRemoveFromSuperView(t)
            },
            r.prototype.removeFromStage = function() {
                var t = this;
                e.prototype.removeFromStage.call(t),
                    t.eachSubView(function(e, t) {
                        t.removeFromStage()
                    })
            },
            r.prototype.indexOfSubView = function(e) {
                var t = this,
                    n = -1;
                for (var r = 0; r < t.subViews().length; r++) {
                    var i = t.subViews()[r];
                    if (i === e) {
                        n = r;
                        break
                    }
                }
                return n
            },
            r.prototype.subViewByIndex = function(e) {
                var t = this,
                    n = null;
                return e >= 0 && e < t.subViews().length && (n = t.subViews()[e]),
                    n
            },
            r.prototype.subViewByName = function(e) {
                var t = this,
                    n = null;
                for (var r = 0; r < t.subViews().length; r++) {
                    var i = t.subViews()[r];
                    if (i.name() == e) {
                        n = i;
                        break
                    }
                }
                return n
            },
            r.prototype.containsSubView = function(e) {
                var t = this,
                    n = !1;
                return t.eachSubView(function(t, r) {
                        return r == e ? (n = !0, !1) : !0
                    }),
                    n
            },
            r.prototype.visibleSubViews = function() {
                var e = this,
                    t = [],
                    n = e.rect(e);
                for (var r = 0; r < e.subViews().length; r++) {
                    var i = e.subViews()[r];
                    if (i.visible()) {
                        var s = i.rect(e);
                        (e.clip() === !1 || n.intersect(s).isEmpty() === !1) && t.push(i)
                    }
                }
                return t
            },
            r.prototype.eachSubView = function(e) {
                var t = this,
                    n = t.subViews().slice();
                for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                        s = e.call(null, r, i);
                    if (s === !1)
                        break
                }
            },
            r.prototype._muted = !1,
            r.prototype.muted = function(e) {
                var t = this;
                return typeof e == "boolean" && e != t._muted && (t._muted = e),
                    t._muted
            },
            r.prototype.triggerSubViewEvent = function(e) {
                var t = this,
                    n = !1,
                    r = t.subViews();
                for (var i = r.length - 1; i >= 0; i--) {
                    var s = r[i],
                        o = s.triggerEvent(e);
                    if (o) {
                        n = o;
                        break
                    }
                }
                return n
            },
            r.prototype.triggerEvent = function(t) {
                var n = this,
                    r = !1;
                return n.muted() ? n.enabled() && n.animating() === !1 && n.visible() && (r = n.triggerSubViewEvent(t)) : (r = e.prototype.triggerEvent.call(n, t),
                        r && n.triggerSubViewEvent(t)),
                    r
            },
            r.prototype.active = function(t) {
                var n = this,
                    r = e.prototype.active.call(n, t);
                return n.eachSubView(function(e, t) {
                        t.active(r)
                    }),
                    r
            },
            r.prototype.onWindowOrientationChanged = function(t) {
                var n = this;
                e.prototype.onWindowOrientationChanged.call(n, t),
                    n.eachSubView(function(e, n) {
                        n.onWindowOrientationChanged(t)
                    })
            },
            r.prototype.resize = function(t, n) {
                var r = this;
                e.prototype.resize.call(r, t, n),
                    r.eachSubView(function(e, r) {
                        r.resize(t, n)
                    })
            },
            r.prototype.onAnimationStart = function() {
                var t = this;
                e.prototype.onAnimationStart.call(t);
                var n = t.subViews();
                for (var r = 0; r < n.length; r++) {
                    var i = n[r];
                    i.onAnimationStart()
                }
            },
            r.prototype.onAnimationStop = function() {
                var t = this;
                e.prototype.onAnimationStop.call(t);
                var n = t.subViews();
                for (var r = 0; r < n.length; r++) {
                    var i = n[r];
                    i.onAnimationStop()
                }
            },
            r.prototype.update = function(t, n) {
                var r = this;
                e.prototype.update.call(r, t, n);
                if (r.cachedImage == null) {
                    var i = r.subViews();
                    for (var s = 0; s < i.length; s++) {
                        var o = i[s];
                        o.visible() && o.update(t, n)
                    }
                }
            },
            r
    }),
    define("orientation", [], function() {
        var e = function() {};
        return e.PORTRAIT = "portrait",
            e.LANDSCAPE = "landscape",
            e
    }),
    define("stage", ["jquery", "mat3", "view_container", "scale_mode", "align_mode", "orientation", "rect"], function(e, t, n, r, i, s, o) {
        var u = function() {};
        u.prototype = new n;
        var a = u.prototype;
        return a.constructor = u,
            a.className = "AXEStage",
            a.onStage = !0,
            a.clone = function() {
                var e = this,
                    t = new u;
                return e.copyProperties(t),
                    t
            },
            a.copyProperties = function(e) {
                var t = this;
                n.prototype.copyProperties.call(t, e),
                    e.ratio(t.ratio()),
                    e.alignMode(t.alignMode()),
                    e.scaleMode(t.scaleMode())
            },
            a.updatePropsFromXML = function(e) {
                var t = this;
                n.prototype.updatePropsFromXML.call(t, e),
                    e.is("[ratio]") ? t.ratio(parseFloat(e.attr("ratio"))) : window["devicePixelRatio"] != undefined && t.ratio(window.devicePixelRatio)
            },
            a.dealloc = function() {
                var e = this;
                e._alignMode = null,
                    e._scaleMode = null,
                    e._stageMatrix = null,
                    n.prototype.dealloc.call(e)
            },
            a.matrix = function() {
                var e = this;
                return n.prototype.matrix.call(e)
            },
            a.width = function(e) {
                var t = this,
                    r = 0;
                return arguments.length > 0 ? (r = n.prototype.width.call(t, e),
                        t.needResizeFlag = !0) : r = n.prototype.width.call(t),
                    r
            },
            a.height = function(e) {
                var t = this,
                    r = 0;
                return arguments.length > 0 ? (r = n.prototype.height.call(t, e),
                        t.needResizeFlag = !0) : r = n.prototype.height.call(t),
                    r
            },
            a.needResizeFlag = !1,
            a._alignMode = i.MIDDLE_CENTER,
            a.alignMode = function(e) {
                var t = this;
                return arguments.length > 0 && e != t.mode && (t._alignMode = e,
                        t.needResizeFlag = !0),
                    t._alignMode
            },
            a._scaleMode = r.showAll,
            a.scaleMode = function(e) {
                var t = this;
                return arguments.length > 0 && e != t._scaleMode && (t._scaleMode = e,
                        t.needResizeFlag = !0),
                    t._scaleMode
            },
            a._stageMatrix = new t,
            a.stageMatrix = function(e) {
                var t = this;
                return arguments.length > 0 && (t._stageMatrix = e,
                        t.needResizeFlag = !0),
                    t._stageMatrix
            },
            a._ratio = 2,
            a.ratio = function(e) {
                var t = this;
                return isNaN(e) === !1 && t._ratio != parseFloat(e) && (t._ratio = e,
                        t.needResizeFlag = !0),
                    t._ratio
            },
            a.orientation = null,
            a.windowWidth = 0,
            a.windowHeight = 0,
            a.resize = function(e, t) {
                var r = this;
                if (r.windowWidth != e || r.windowHeight != t) {
                    r.windowWidth = e,
                        r.windowHeight = t,
                        r.stageMatrix(r.scaleMode().call(null, r.width(), r.height(), r.stageWidth(), r.stageHeight(), r.alignMode())),
                        n.prototype.resize.call(r, r.stageWidth(), r.stageHeight());
                    var i = e > t ? s.LANDSCAPE : s.PORTRAIT;
                    i != r.orientation && (r.orientation = i,
                        r.onWindowOrientationChanged(i))
                }
            },
            a.stageWidth = function() {
                var e = this;
                return e.windowWidth * e.ratio()
            },
            a.stageHeight = function() {
                var e = this;
                return e.windowHeight * e.ratio()
            },
            u
    }),

    // canvas舞台的定义和事件


    define("assets_config", [], function() {
        var e = function() {};
        return e.baseURI = "./",
            e
    }),
    define("asset_types", [], function() {
        var e = function() {};
        return e.IMAGE = "image",
            e.TEXT = "text",
            e.JSON = "json",
            e.HTML = "html",
            e.XML = "xml",
            e.SOUND = "sound",
            e.AXE = "axe",
            e
    }),
    define("progress_event", ["event"], function(e) {
        var t = function(n, r) {
            var i = this;
            e.prototype.constructor.call(i, n, t.PROGRESS),
                i.percent = r
        };
        t.PROGRESS = "progress",
            t.prototype = new e;
        var n = t.prototype;
        return n.constructor = t,
            n.percent = 0,
            n.clone = function(e) {
                var n = this;
                return e = arguments.length > 0 ? e : n.target,
                    new t(e, n.percent)
            },
            t
    }),
    define("error_event", ["event"], function(e) {
        var t = function(n, r) {
            var i = this;
            e.prototype.constructor.call(i, n, t.ERROR),
                i.error = r
        };
        t.prototype = new e;
        var n = t.prototype;
        return n.constructor = t,
            t.ERROR = "error",
            n.error = null,
            n.clone = function(e) {
                var n = this;
                return e = arguments.length > 0 ? e : n.target,
                    new t(e, n.error)
            },
            t
    }),
    define("base64_js", [], function() {
        var e = {
            toByteArray: function(e) {},
            fromByteArray: function(e) {}
        };
        return function(e) {
                "use strict";

                function l(e) {
                    var t = e.charCodeAt(0);
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
                    var t, r, i, s, o, u;
                    if (e.length % 4 > 0)
                        throw new Error("Invalid string. Length must be a multiple of 4");
                    var a = e.length;
                    o = e.charAt(a - 2) === "=" ? 2 : e.charAt(a - 1) === "=" ? 1 : 0,
                        u = new n(e.length * 3 / 4 - o),
                        i = o > 0 ? e.length - 4 : e.length;
                    var f = 0;
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
                    var n, r = e.length % 3,
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
                var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
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
    }),
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
                            t == "success" ? n(e, t) : a.assetLoadError(t, "Unknown Error.");

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
                    n.attr("src", t.loadURL);
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
                            console.log(n, i)
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
                        var r = new o(e, e.loadPercent());
                        t.dispatchEvent(r)
                    },
                    r.onerror = function(t, n) {
                        e.assetLoadError(t, n)
                    },
                    r.send()
            },
            f
    }),
    define("url_util", ["jquery"], function(e) {
        var t = function() {};
        return t.origin = function() {
                var e = String(window.location.href),
                    t = /^http[s]?:\/\/[^\/]*\/{1}/,
                    n = null;
                return t.test(e) ? n = e.match(t)[0] : n = e + "/",
                    n
            },
            t.relativePath = function(e) {
                var n = t.cleanURL(),
                    r = n.split("/");
                r.pop();
                var i = e.split("/");
                for (var s = 0; s < i.length; s++) {
                    var o = i[s];
                    o == ".." ? r.pop() : o.length > 0 && o != "." && r.push(o)
                }
                var u = r.join("/");
                return u
            },
            t.cleanURL = function() {
                var e = String(window.location.href),
                    t = e.split("#");
                return t[0]
            },
            t.hash = function(e) {
                if (arguments.length > 0) {
                    var n = t.cleanURL();
                    window.location.href = n + "#" + encodeURIComponent(e)
                }
                var r = String(window.location.href),
                    i = r.split("#"),
                    s = null;
                return i.length > 1 && (s = decodeURIComponent(i[1])),
                    s
            },
            t.decodeParams = function(t) {
                var n = null;
                if (t != null) {
                    n = {};
                    var r = decodeURIComponent(t).split("&");
                    e.each(r, function(e, t) {
                        var r = t.split("=")[0],
                            i = decodeURIComponent(t.split("=")[1]);
                        n[r] = i
                    })
                }
                return n
            },
            t.encodeParams = function(e) {
                var t = "";
                if (e != null) {
                    var n = [];
                    for (var r in e)
                        if (e.hasOwnProperty(r)) {
                            var i = encodeURIComponent(e[r]);
                            n.push(r + "=" + i)
                        }
                    t = n.join("&")
                }
                return t
            },
            t.splitURLs = function(e) {
                var t = /\[\d+-\d+\]/,
                    n = e.match(t),
                    r = [];
                if (n != null) {
                    n = n[0];
                    var i = n.slice(1, n.length - 1).split("-"),
                        s = i[0],
                        o = i[1],
                        u = Math.max(s.length, o.length);
                    s = parseInt(s, 10),
                        o = parseInt(o, 10);
                    for (var a = s; a <= o; a++) {
                        var f = String(a);
                        while (f.length < u)
                            f = "0" + f;
                        var l = e.replace(t, f);
                        r.push(l)
                    }
                } else
                    r = [e];
                return r
            },
            t
    }),

    // 对各元素的解析加载



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
    }),
    // 图片bitmap模块
    define("bitmap", ["view", "assets_loader"], function(e, t) {
        var n = function() {};
        n.prototype = new e;
        var r = n.prototype;
        return r.className = "AXEBitmap",
            r.clone = function() {
                var e = this,
                    t = new n;
                return e.copyProperties(t),
                    t
            },
            r.copyProperties = function(t) {
                var n = this;
                e.prototype.copyProperties.call(n, t),
                    t.fixSize(n.fixSize()),
                    t.bitmap(n.bitmap())
            },
            r.dealloc = function() {
                var t = this;
                t._bitmap = null,
                    e.prototype.dealloc.call(t)
            },
            r.updatePropsFromXML = function(n) {
                var r = this;
                e.prototype.updatePropsFromXML.call(r, n),
                    r.fixSize(n.is("[width]") && n.is("[height]")),
                    n.is("[src]") && r.bitmap(t.asset(n.attr("src")))
            },
            r.updateSize = function() {
                var e = this;
                e.bitmap() != null && (e.fixSize() == 0 ? (e.width(e.bitmap().naturalWidth),
                    e.height(e.bitmap().naturalHeight)) : (e.bitmap().width = e.width(),
                    e.bitmap().height = e.height()))
            },
            r._fixSize = !1,
            r.fixSize = function(e) {
                var t = this;
                return arguments.length > 0 && e != t._fixSize && (t._fixSize = e,
                        t.updateSize(),
                        t.needToRender(!0)),
                    t._fixSize
            },
            r._bitmap = null,
            r.bitmap = function(e) {
                var t = this;
                return arguments.length > 0 && e != t._bitmap && (t._bitmap = e,
                        t.updateSize(),
                        t.needToRender(!0)),
                    t._bitmap
            },
            n
    }),
    define("shape", ["jquery", "view", "color", "paths"], function(e, t, n, r) {
        var i = function() {};
        return i.prototype = new t,
            i.prototype.constructor = i,
            i.prototype.className = "AXEShape",
            i.prototype.dealloc = function() {
                var e = this;
                e._paths = null,
                    e._strokeColor = null,
                    e._fillColor = null,
                    t.prototype.dealloc.call(e)
            },
            i.prototype.clone = function() {
                var e = this,
                    t = new i;
                return e.copyProperties(t),
                    t
            },
            i.prototype.copyProperties = function(e) {
                var n = this;
                t.prototype.copyProperties.call(n, e),
                    e.strokeSize(n.strokeSize()),
                    n.strokeColor() != null && e.strokeColor(n.strokeColor().clone()),
                    n.fillColor() != null && e.fillColor(n.fillColor().clone()),
                    n.paths() != null && (e._paths = n.paths().clone())
            },
            i.prototype.updatePropsFromXML = function(r) {
                var i = this;
                t.prototype.updatePropsFromXML.call(i, r),
                    r.is("[stroke-size]") && i.strokeSize(parseFloat(r.attr("stroke-size"))),
                    r.is("[stroke-color]") && i.strokeColor(n.colorWithString(r.attr("stroke-color"))),
                    r.is("[fill-color]") && i.fillColor(n.colorWithString(r.attr("fill-color")));
                var s = r.find("> path");
                if (s.length > 0) {
                    var o = e.trim(s.text());
                    i.paths().clearCommands(),
                        i.paths().addCommand(o)
                }
            },
            i.prototype._strokeSize = 1,
            i.prototype.strokeSize = function(e) {
                var t = this;
                return arguments.length > 0 && t._strokeSize != e && (t._strokeSize = e,
                        t.needToRender(!0)),
                    t._strokeSize
            },
            i.prototype._strokeColor = null,
            i.prototype.strokeColor = function(e) {
                var t = this;
                return arguments.length > 0 && (t._strokeColor = e,
                        t.needToRender(!0)),
                    t._strokeColor
            },
            i.prototype._fillColor = null,
            i.prototype.fillColor = function(e) {
                var t = this;
                return arguments.length > 0 && (t._fillColor = e,
                        t.needToRender(!0)),
                    t._fillColor
            },
            i.prototype._paths = null,
            i.prototype.paths = function() {
                var e = this;
                return e._paths == null && (e._paths = new r,
                        e._paths.delegate = e),
                    e._paths
            },
            i.prototype.onPathChanged = function(e) {
                var t = this;
                e == t.paths() && t.needToRender(!0)
            },
            i
    }),
    define("movie", ["view", "assets_loader", "url_util", "event", "event_center"], function(e, t, n, r, i) {
        var s = function(e, t, n, r) {
            var i = this;
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
                var e = this;
                e.action.apply(e.target, e.params)
            };
        var o = function() {};
        return o.prototype = new e,
            o.prototype.constructor = o,
            o.prototype.className = "AXEMovie",
            o.prototype.dealloc = function() {
                var t = this;
                t._frames = null,
                    e.prototype.dealloc.call(t)
            },
            o.prototype.clone = function() {
                var e = this,
                    t = new o;
                return e.copyProperties(t),
                    t
            },
            o.prototype.copyProperties = function(t) {
                var n = this;
                e.prototype.copyProperties.call(n, t),
                    t._frames = n.frames().slice(),
                    t.pauseWhenAnimating(n.pauseWhenAnimating()),
                    t.frameRate(n.frameRate()),
                    t.loop(n.loop()),
                    t.backToFirst(n.backToFirst());
                if (n.actions() != null) {
                    t._actions = {};
                    var r = n.actions();
                    for (var i in r)
                        r.hasOwnProperty(i) && (t._actions[i] = r[i])
                }
            },
            o.prototype.updatePropsFromXML = function(r) {
                var i = this;
                e.prototype.updatePropsFromXML.call(i, r);
                var s = r.find("> frame"),
                    o = i.frames();
                s.each(function(e, r) {
                        var i = $(r),
                            s = i.is("[repeat]") ? parseInt(i.attr("repeat"), 10) : 1;
                        for (var u = 0; u < s; u++) {
                            var a = i.text(),
                                f = n.splitURLs(a);
                            i.is("[reverse]") && (f = f.reverse());
                            for (var l = 0; l < f.length; l++) {
                                var c = f[l];
                                o.push(t.asset(c))
                            }
                        }
                    }),
                    r.is("[pause-when-animating]") && i.pauseWhenAnimating(r.attr("pause-when-animating") === "true"),
                    r.is("[fps]") && i.frameRate(parseFloat(r.attr("fps"))),
                    i.loop(r.is("[loop]") ? String(r.attr("loop")).toLowerCase() == "true" : !0),
                    i.backToFirst(r.is("[back]") ? String(r.attr("back")).toLowerCase() == "true" : !1);
                var u = r.find("> script");
                u.each(function(e, t) {
                    var n = $(t),
                        r = n.attr("frame").toLowerCase(),
                        s;
                    r == "first" ? s = 0 : r == "last" ? s = i.framesCount() - 1 : s = parseInt(r, 10);
                    if (isNaN(s))
                        return;
                    var o = n.attr("action"),
                        u = o.split(":"),
                        a = u[0],
                        f = i[a];
                    if (typeof f != "function")
                        return;
                    var l = [];
                    if (u.length > 1) {
                        l = u[1].split(",");
                        for (var c = 0; c < l.length; c++) {
                            var h = parseFloat(l[c]);
                            if (isNaN(h) === !1)
                                l[c] = h;
                            else if (l[c] == "true" || l[c] == "false")
                                l[c] = l[c] == "true"
                        }
                    }
                    i.addAction(s, f, l, i)
                });
                var a = r.is("[auto-play]") ? String(r.attr("auto-play")).toLowerCase() == "true" : !0;
                a ? i.goToAndPlay(0) : i.goToAndStop(0)
            },
            o.prototype._actions = null,
            o.prototype.actions = function() {
                var e = this;
                return e._actions == null && (e._actions = {}),
                    e._actions
            },
            o.prototype.frameActions = function(e) {
                var t = this,
                    n = String(e),
                    r = null;
                return t.actions().hasOwnProperty(n) && (r = t.actions()[n]),
                    r
            },
            o.prototype.addAction = function(e, t, n, r) {
                var i = this,
                    o = new s(e, t, n, r),
                    u = i.frameActions(e);
                return u == null && (u = [],
                        i.actions()[String(e)] = u),
                    u.push(o),
                    o
            },
            o.prototype.removeAction = function(e) {
                var t = this,
                    n = t.frameActions(e.frame);
                if (n != null)
                    for (var r = 0; r < n.length; r++)
                        if (n[r] == e) {
                            n.splice(r, 1);
                            break
                        }
            },
            o.prototype.removeFrameAction = function(e) {
                var t = this,
                    n = t.frameActions(e);
                n != null && delete t.actions()[String(e)]
            },
            o.prototype._backToFirst = !1,
            o.prototype.backToFirst = function(e) {
                var t = this;
                return arguments.length > 0 && (t._backToFirst = e),
                    t._backToFirst
            },
            o.prototype._loop = !0,
            o.prototype.loop = function(e) {
                var t = this;
                return arguments.length > 0 && (t._loop = e),
                    t._loop
            },
            o.prototype._finishAction = null,
            o.prototype.duration = function() {
                var e = this;
                return e.framesCount() / e.frameRate()
            },
            o.prototype.framesCount = function() {
                var e = this;
                return e.frames().length
            },
            o.prototype.addFramesByURL = function(e, r, i) {
                var s = this;
                i = isNaN(i) ? 1 : i,
                    r = typeof r == "boolean" ? r : !1;
                var o = s.frames();
                for (var u = 0; u < i; u++) {
                    var a = n.splitURLs(e);
                    r && (a = a.reverse());
                    for (var f = 0; f < a.length; f++) {
                        var l = a[f];
                        o.push(t.asset(l))
                    }
                }
            },
            o.prototype._frames = null,
            o.prototype.frames = function(e) {
                var t = this;
                return arguments.length > 0 && e != null && (t._frames = e.slice(),
                        t.needToRender(!0)),
                    t._frames == null && (t._frames = []),
                    t._frames
            },
            o.prototype._frameRate = 24,
            o.prototype.frameRate = function(e) {
                var t = this;
                return isNaN(e) === !1 && (t._frameRate = e,
                        t.needToRender(!0)),
                    t._frameRate
            },
            o.prototype.reverse = function() {
                var e = this,
                    t = e.frames();
                t.reverse(),
                    e.frames(t)
            },
            o.prototype.playing = !1,
            o.prototype.play = function() {
                var e = this;
                if (e.playing)
                    return;
                e.playing = !0
            },
            o.prototype.stop = function() {
                var e = this;
                e.playing && (e.playing = !1)
            },
            o.prototype.goToAndStop = function(e) {
                var t = this;
                t.stop(),
                    t._currentFrame = Math.max(0, Math.min(t.framesCount() - 1, e)),
                    t.needToRender(!0)
            },
            o.prototype.goToAndPlay = function(e) {
                var t = this;
                t.goToAndStop(e),
                    t.play(),
                    t.needToRender(!0)
            },
            o.prototype._currentFrame = 0,
            o.prototype.currentFrame = function() {
                var e = this;
                return Math.floor(e._currentFrame)
            },
            o.prototype._pauseWhenAnimating = !1,
            o.prototype.pauseWhenAnimating = function(e) {
                var t = this;
                return arguments.length > 0 && e != t._pauseWhenAnimating && (t._pauseWhenAnimating = e),
                    t._pauseWhenAnimating
            },
            o.prototype.update = function(t, n) {
                var s = this;
                e.prototype.update.call(s, t, n);
                if (s.playing && (s.pauseWhenAnimating() === !1 || s.animating() === !1)) {
                    var o = n * s.frameRate(),
                        u = Math.floor(s._currentFrame + o),
                        a = s.currentFrame(),
                        f = u - a,
                        l = s._currentFrame + o - u;
                    for (var c = 0; c < f; c++) {
                        var h = s.currentFrame(),
                            p = s.frameActions(h);
                        if (p != null)
                            for (var d = 0; d < p.length; d++)
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
    }),
    define("text_v_align", [], function() {
        var e = function() {};
        return e.TOP = "top",
            e.MIDDLE = "middle",
            e.BOTTOM = "bottom",
            e.ALPHABETIC = "alphabetic",
            e.IDEOGRAPHIC = "ideographic",
            e.HANGING = "hanging",
            e
    }),
    define("text", ["jquery", "view", "color", "text_align", "text_v_align"], function(e, t, n, r, i) {
        var s = function() {};
        s.prototype = new t;
        var o = s.prototype;
        return s.prototype.constructor = s,
            s.prototype.className = "AXEText",
            s.prototype.clone = function() {
                var e = this,
                    t = new s;
                return e.copyProperties(t),
                    t
            },
            s.prototype.copyProperties = function(e) {
                var n = this;
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
                var i = this;
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
                var t = this;
                return isNaN(e) == 0 && t._mergeLastLine != Math.abs(e) && (t._mergeLastLine = Math.abs(e),
                        t.needToRender(!0)),
                    t._mergeLastLine
            },
            s.prototype._lineHeight = 0,
            s.prototype.lineHeight = function(e) {
                var t = this;
                return arguments.length > 0 && e != t._lineHeight && (t._lineHeight = e,
                        t.needToRender(!0)),
                    t._lineHeight
            },
            s.prototype._wordWrap = !1,
            s.prototype.wordWrap = function(e) {
                var t = this;
                return arguments.length > 0 && e != t._wordWrap && (t._wordWrap = e,
                        t.needToRender(!0)),
                    t._wordWrap
            },
            s.prototype._color = null,
            s.prototype.color = function(e) {
                var t = this;
                return arguments.length > 0 && e != t._color && (t._color = e,
                        t.needToRender(!0)),
                    t._color
            },
            s.prototype._font = "sans-serif",
            s.prototype.font = function(e) {
                var t = this;
                return arguments.length > 0 && typeof e == "string" && t._font != e && (t._font = e,
                        t.needToRender(!0)),
                    null
            },
            s.prototype._size = 12,
            s.prototype.size = function(e) {
                var t = this;
                return arguments.length > 0 && isNaN(parseFloat(e)) === !1 && parseFloat(e) != t._size && (t._size = parseFloat(e),
                        t.needToRender(!0)),
                    t._size
            },
            s.prototype._style = null,
            s.prototype.style = function(e) {
                var t = this;
                return arguments.length > 0 && typeof e == "string" && e != t._style && (t._style = e,
                        t.needToRender(!0)),
                    t._style
            },
            s.prototype.textStyle = function() {
                var e = this,
                    t = [];
                return e._style != null && t.push(e._style),
                    e._size != null && t.push(e._size + "px"),
                    e._font != null && t.push(e._font),
                    t.join(" ")
            },
            s.prototype._textVAlign = i.ALPHABETIC,
            s.prototype.textVAlign = function(e) {
                var t = this;
                return arguments.length > 0 && typeof e == "string" && t._textVAlign != e && (t._textVAlign = e,
                        t.needToRender(!0)),
                    t._textVAlign
            },
            s.prototype._textAlign = r.LEFT,
            s.prototype.textAlign = function(e) {
                var t = this;
                return arguments.length > 0 && typeof e == "string" && e != t._textAlign && (t._textAlign = e,
                        t.needToRender(!0)),
                    t._textAlign
            },
            s.prototype._text = "",
            s.prototype.text = function(e) {
                var t = this;
                return arguments.length > 0 && t._text != e && (t._text = String(e),
                        t.needToRender(!0)),
                    t._text
            },
            s
    }),
    define("button_state", [], function() {
        var e = {};
        return e.NORMAL_STATE = 0,
            e.CLICK_STATE = 1,
            e
    }),
    define("button", ["view_container", "button_state", "event_center", "touch_event", "event"], function(e, t, n, r, i) {
        var s = function() {};
        s.prototype = new e;
        var o = s.prototype;
        return s.prototype.constructor = s,
            s.prototype.normalStateView = null,
            s.prototype.clickStateView = null,
            s.prototype.disableStateView = null,
            s.prototype.clone = function() {
                var e = this,
                    t = new s;
                return e.copyProperties(t),
                    t
            },
            s.prototype.copyProperties = function(t) {
                var n = this;
                e.prototype.copyProperties.call(n, t),
                    t.initButton(),
                    t.switchMode(n.switchMode())
            },
            s.prototype.dealloc = function() {
                var t = this;
                n.removeListener(t),
                    e.prototype.dealloc.call(t)
            },
            s.prototype.updatePropsFromXML = function(t) {
                var n = this;
                e.prototype.updatePropsFromXML.call(n, t),
                    n.initButton(),
                    t.is("[switch-mode]") && n.switchMode(t.attr("switch-mode") == "true")
            },
            s.prototype.initButton = function() {
                var e = this;
                e.normalStateView = e.subViewByName("normal"),
                    e.clickStateView = e.subViewByName("click"),
                    e.disableStateView = e.subViewByName("disable"),
                    e.updateButtonView(),
                    n.addListener(e, e, r.TOUCH_START, e.onButtonTouchStart),
                    n.addListener(e, e, r.TOUCH_END, e.onButtonTouchEnd)
            },
            s.prototype.onButtonTouchStart = function() {
                var e = this;
                e.switchMode() === !1 && e.buttonState(t.CLICK_STATE)
            },
            s.prototype.onButtonTouchEnd = function() {
                var e = this;
                e.switchMode() === !1 ? e.buttonState(t.NORMAL_STATE) : (e.buttonState() == t.NORMAL_STATE ? e.buttonState(t.CLICK_STATE) : e.buttonState(t.NORMAL_STATE),
                    n.dispatchEvent(new i(e, i.CHANGE)))
            },
            s.prototype._switchMode = !1,
            s.prototype.switchMode = function(e) {
                var n = this;
                return typeof e == "boolean" && e != n._switchMode && (n._switchMode = e,
                        n.buttonState(t.NORMAL_STATE)),
                    n._switchMode
            },
            s.prototype._buttonState = t.NORMAL_STATE,
            s.prototype.buttonState = function(e) {
                var t = this;
                return isNaN(e) === !1 && (t._buttonState = e,
                        t.updateButtonView()),
                    t._buttonState
            },
            s.prototype.enabled = function(t) {
                var n = this,
                    r = e.prototype.enabled.call(n, t);
                return typeof t == "boolean" && n.updateButtonView(),
                    r
            },
            s.prototype.updateButtonView = function() {
                var e = this;
                e.switchMode() ? (e.disableStateView != null && e.disableStateView.visible(!1),
                    e.normalStateView != null && e.normalStateView.visible(e.buttonState() == t.NORMAL_STATE),
                    e.clickStateView != null && e.clickStateView.visible(e.buttonState() == t.CLICK_STATE)) : (e.disableStateView != null && e.disableStateView.visible(e.enabled() == 0),
                    e.normalStateView != null && (e.enabled() ? e.normalStateView.visible(e.buttonState() == t.NORMAL_STATE) : e.normalStateView.visible(e.disableStateView == null)),
                    e.clickStateView != null && e.clickStateView.visible(e.enabled() && e.buttonState() == t.CLICK_STATE))
            },
            s
    }),
    define("motion_frame", ["mat3", "color", "easing"], function(Mat3, BBColor) {
        var AXEMotionFrame = function() {},
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
                var self = this;
                self.isBlank = $xml.is("[blank]"),
                    self.time = parseFloat($xml.attr("time")),
                    self.tween = $xml.is("[tween]") ? eval($xml.attr("tween")) : null,
                    $xml.is("[bg-color]") ? self.bgColor = BBColor.colorWithString($xml.attr("bg-color")) : self.bgColor = null,
                    $xml.is("[alpha]") && (self.alpha = parseFloat($xml.attr("alpha"))),
                    $xml.is("[frame]") ? self.frame = parseFloat($xml.attr("frame")) : self.frame = NaN;
                if ($xml.is("[rotate]")) {
                    var strRotation = $xml.attr("rotate").split(",");
                    self.rotation = {
                        x: parseFloat(strRotation[0]),
                        y: parseFloat(strRotation[1]),
                        rotation: parseFloat(strRotation[2]) * (Math.PI / 180)
                    }
                }
                var matrix = new Mat3;
                if ($xml.is("[matrix]")) {
                    var strMatrix = $xml.attr("matrix").split(",");
                    matrix.a = parseFloat(strMatrix[0]),
                        matrix.b = parseFloat(strMatrix[1]),
                        matrix.c = parseFloat(strMatrix[2]),
                        matrix.d = parseFloat(strMatrix[3]),
                        matrix.tx = parseFloat(strMatrix[4]),
                        matrix.ty = parseFloat(strMatrix[5])
                } else {
                    var scaleX = $xml.is("[scale-x]") ? parseFloat($xml.attr("scale-x")) : 1,
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
                var e = this,
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
                var e = this;
                e.matrix = null
            },
            AXEMotionFrame
    }),
    define("motion_layer", ["motion_frame", "mat3", "view_factory", "color", "vec2"], function(e, t, n, r, i) {
        var s = function() {},
            o = s.prototype;
        return o.constructor = s,
            o.contentView = null,
            o.updateFromXML = function(t) {
                var r = this,
                    i = t.find("> content > *");
                if (i.length > 0) {
                    var s = i[0].nodeName.toLowerCase();
                    r.contentView = n.createViewByNodeName(s),
                        r.contentView != null && r.contentView.updatePropsFromXML(i)
                } else
                    r.content = null;
                r.frames = [];
                var o = t.find("> frame");
                o.each(function(t, n) {
                    var i = $(n),
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
                var s = new i(e.width() / 2, e.height() / 2),
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
                var n = this,
                    s = null,
                    o = null;
                for (var u = n.frames.length - 1; u >= 0; u--) {
                    var a = n.frames[u];
                    if (a.time <= e) {
                        s = a,
                            u < n.frames.length - 1 && (o = n.frames[u + 1]);
                        break
                    }
                }
                var f = null;
                if (s != null && s.isBlank == 0) {
                    f = n.contentView;
                    if (s.tween == null || o == null)
                        f.alpha(s.alpha),
                        s.bgColor != null && f.bgColor(s.bgColor),
                        s.rotation != null ? f.matrix(n.calculateRotation(f, new i(s.x, s.y), s.rotation)) : f.matrix(s.matrix),
                        f.goToAndPlay != undefined && isNaN(s.frame) == 0 && (o != null && isNaN(o.frame) == 0 ? f.goToAndStop(s.frame) : f.goToAndPlay(s.frame));
                    else {
                        var l = o.time - s.time,
                            c = e - s.time;
                        if (s.bgColor != null && o.bgColor != null) {
                            var h = new r;
                            h.r(n.calculateValue(s.bgColor.r(), o.bgColor.r(), c, l, s.tween)),
                                h.g(n.calculateValue(s.bgColor.g(), o.bgColor.g(), c, l, s.tween)),
                                h.b(n.calculateValue(s.bgColor.b(), o.bgColor.b(), c, l, s.tween)),
                                h.a(n.calculateValue(s.bgColor.a(), o.bgColor.a(), c, l, s.tween)),
                                f.bgColor(h)
                        }
                        var p = n.calculateValue(s.alpha, o.alpha, c, l, s.tween);
                        f.alpha(p);
                        if (f.goToAndStop != undefined && isNaN(s.frame) == 0 && isNaN(o.frame) == 0) {
                            var d = Math.floor(n.calculateValue(s.frame, o.frame, c, l, s.tween));
                            f.goToAndStop(d)
                        }
                        if (s.rotation != null && o.rotation != null) {
                            var v = n.calculateValue(s.rotation.rotation, o.rotation.rotation, c, l, s.tween);
                            f.matrix(n.calculateRotation(f, new i(s.rotation.x, s.rotation.y), v))
                        } else {
                            var m = s.matrix,
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
                var e = this,
                    t = e.frames.slice(),
                    n = [];
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    n.push(i.time)
                }
                t = t.reverse();
                for (var s = 0; s < t.length; s++) {
                    var o = t[s];
                    o.time = n[s]
                }
                e.frames = t
            },
            o.clone = function() {
                var e = this,
                    t = new s;
                e.contentView != null && (t.contentView = e.contentView.clone()),
                    t.frames = [];
                for (var n = 0; n < e.frames.length; n++) {
                    var r = e.frames[n];
                    t.frames.push(r)
                }
                return t
            },
            o.dealloc = function() {
                var e = this;
                e.contentView.dealloc(),
                    e.contentView = null;
                for (var t = 0; t < e.frames.length; t++)
                    e.frames[t].dealloc();
                e.frames = null
            },
            s
    }),
    define("motion", ["jquery", "system", "view_container", "motion_layer", "event_center", "event"], function(e, t, n, r, i, s) {
        var o = function() {};
        o.prototype = new n;
        var u = o.prototype;
        return u.constructor = o,
            u.clone = function() {
                var e = this,
                    t = new o;
                return e.copyProperties(t),
                    t
            },
            u.copyProperties = function(e) {
                var t = this;
                n.prototype.copyProperties.call(t, e),
                    e.layers = [];
                for (var r = 0; r < t.layers.length; r++) {
                    var i = t.layers[r];
                    e.layers.push(i.clone())
                }
                e._duration = t.duration(),
                    e.loop(t.loop()),
                    e.currentTime(t.currentTime()),
                    e.updateFromTime(),
                    e.play()
            },
            u.updatePropsFromXML = function(t) {
                var i = this;
                n.prototype.updatePropsFromXML.call(i, t),
                    i.layers = [];
                var s = t.find("> layer");
                s.each(function(t, n) {
                        var s = e(n),
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
                var t = this,
                    n = null;
                for (var r = 0; r < t.layers.length; r++) {
                    var i = t.layers[r].contentView;
                    if (i.name() == e) {
                        n = i;
                        break
                    }
                }
                return n
            },
            u.isReverse = !1,
            u.reverse = function() {
                var e = this;
                for (var t = 0; t < e.layers.length; t++) {
                    var n = e.layers[t];
                    n.reverse()
                }
                e.currentTimeChanged = !0,
                    e.updateFromTime(),
                    e.isReverse = !e.isReverse
            },
            u._duration = 0,
            u.duration = function() {
                var e = this;
                return e._duration
            },
            u.currentTimeChanged = !0,
            u._currentTime = 0,
            u.currentTime = function(e) {
                var t = this;
                return isNaN(e) == 0 && t._currentTime != e && (t.loop() ? e -= Math.floor(e / t.duration()) * t.duration() : e = Math.min(t.duration(), Math.max(0, e)),
                        t._currentTime != e && (t._currentTime = e,
                            t.currentTimeChanged = !0,
                            t.updateFromTime())),
                    t._currentTime
            },
            u.isPlaying = !1,
            u.pause = function() {
                var e = this;
                e.isPlaying = !1
            },
            u.play = function(e) {
                var t = this;
                t.currentTime(e),
                    t.isPlaying = !0
            },
            u._loop = !1,
            u.loop = function(e) {
                var t = this;
                return typeof e == "boolean" && e != t._loop && (t._loop = e,
                        t.needToRender(!0)),
                    t._loop
            },
            u.updateFromTime = function() {
                var e = this;
                if (e.currentTimeChanged) {
                    e.currentTimeChanged = !1,
                        e.empty();
                    for (var t = 0; t < e.layers.length; t++) {
                        var n = e.layers[t].contentWithTime(e.currentTime());
                        n != null && e.addSubView(n)
                    }
                }
            },
            u.update = function(e, t) {
                var r = this;
                n.prototype.update.call(r, e, t);
                if (r.isPlaying) {
                    var o = r.currentTime() + t;
                    r.currentTime(r.currentTime() + t),
                        o >= r.duration() && (r.loop() == 0 && r.pause(),
                            i.dispatchEvent(new s(r, s.END)))
                }
            },
            u.dealloc = function() {
                var e = this;
                for (var t = 0; t < e.layers.length; t++)
                    e.layers[t].dealloc();
                i.removeListener(e),
                    n.prototype.dealloc.call(e)
            },
            o
    }),
    define("scroll_bar_style", [], function() {
        var e = {};
        return e.AUTO = 0,
            e.HIDDEN = 1,
            e.VISIBLE = 2,
            e
    }),
    define("circle", ["vec2"], function(e) {
        var t = function(t, n, r) {
            var i = this;
            t = arguments.length > 0 ? t : 0,
                n = arguments.length > 1 ? n : 0,
                i.center = new e(t, n),
                i.radius = arguments.length > 2 ? r : 0
        };
        return t.prototype.constructor = t,
            t.prototype.center = null,
            t.prototype.radius = 0,
            t.prototype.isEqualTo = function(e) {
                var t = this;
                return t.center.distance(e.center) == 0 && t.radius == e.radius
            },
            t.prototype.containsVec2 = function(e) {
                var t = this;
                return t.center.distance(e) >= t.radius
            },
            t.prototype.intersect = function(e) {
                var t = this;
                return t.center.distance(e.center) > t.radius + e.radius
            },
            t.prototype.clone = function() {
                var e = this;
                return new t(e.center.x, e.center.y, e.radius)
            },
            t.prototype.toString = function() {
                var e = this;
                return "[x:" + e.center.x + ", y:" + e.center.y + ", r:" + e.radius + "]"
            },
            t
    }),
    define("scroll_bar", ["view_container", "shape", "color", "circle", "rect"], function(e, t, n, r, i) {
        var s = function(e) {
            var t = this;
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
                var e = this;
                return e._barView == null && (e._barView = new t,
                        e._barView.fillColor(e.BAR_COLOR),
                        e.addSubView(e._barView)),
                    e._barView
            },
            s.prototype.contentSize = 0,
            s.prototype.viewSize = 0,
            s.prototype.updateSize = function() {
                var e = this;
                if (e.scrollView != null) {
                    var t = e.barView(),
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
                            var a = e.barView().paths();
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
                        var f = e.barView().paths();
                        f.clearCommands(),
                            f.circle(new r(e.BAR_SIZE / 2, e.BAR_SIZE / 2, e.BAR_SIZE / 2)),
                            f.circle(new r(u - e.BAR_SIZE / 2, e.BAR_SIZE / 2, e.BAR_SIZE / 2)),
                            f.rect(new i(e.BAR_SIZE / 2, 0, u - e.BAR_SIZE, e.BAR_SIZE))
                    }
                }
            },
            s.prototype.updatePotion = function() {
                var e = this;
                if (e.isVertical) {
                    var t = e.scrollView.offset().y;
                    t = Math.max(0, Math.min(t, e.scrollView.contentSize().y - e.scrollView.height())),
                        e.barView().y((e.height() - 2 * e.BAR_MARGIN) * (t / e.scrollView.contentSize().y))
                } else {
                    var n = e.scrollView.offset().x;
                    n = Math.max(0, Math.min(n, e.scrollView.contentSize().x - e.scrollView.width())),
                        e.barView().x((e.width() - 2 * e.BAR_MARGIN) * (n / e.scrollView.contentSize().x))
                }
            },
            s.prototype.hidden = !1,
            s.prototype.show = function() {
                var e = this;
                e.hidden && (e.hidden = !1,
                    e.stopAnimation(),
                    e.visible(!0),
                    e.alpha(1))
            },
            s.prototype.hide = function() {
                var e = this;
                e.hidden == 0 && (e.hidden = !0,
                    e.animate(.4, {
                        alpha: 0
                    }, Cubic.easeOut, null, function() {
                        e.visible(!1)
                    }))
            },
            s
    }),
    define("scroll_view", ["system", "view_container", "vec2", "scroll_bar_style", "scroll_bar", "event_center", "touch_event"], function(e, t, n, r, i, s, o) {
        var u = {};
        u.scrollBar = function(e, t) {
                return null
            },
            u.onScrollViewStartScroll = function(e) {},
            u.onScrollViewScrolling = function(e) {},
            u.onScrollViewEndScroll = function(e) {},
            u.onScrollViewStartEasing = function(e) {};
        var a = function() {
            var e = this;
            s.addListener(e, e, o.TOUCH_START, e.onViewScrollBegin)
        };
        return a.prototype = new t,
            a.prototype.constructor = a,
            a.prototype.scrolling = !1,
            a.prototype.delegate = null,
            a.prototype.dealloc = function() {
                var e = this;
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
                var e = this,
                    t = new a;
                return e.copyProperties(t),
                    t
            },
            a.prototype.copyProperties = function(e) {
                var n = this;
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
                var i = this;
                t.prototype.updatePropsFromXML.call(i, e),
                    i.clip(!0);
                var s = e.find("> content");
                s.length > 0 && i.contentView().updatePropsFromXML(s);
                if (e.is("[offset]")) {
                    var o = e.attr("offset").split(","),
                        u = new n(parseFloat(o[0]), parseFloat(o[1]));
                    i.offset(u)
                }
                if (e.is("[content-size]")) {
                    var a = e.attr("content-size").split(","),
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
                var i = this;
                t.prototype.update.call(i, e, r);
                if (i.lastOffset != null) {
                    var s = i.offset().clone();
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
                    var o = e - i.easingStartTs,
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
                var n = this;
                return isNaN(e) == 0 && e != n.width() && (t.prototype.width.call(n, e),
                        n.reloadData()),
                    t.prototype.width.call(n)
            },
            a.prototype.height = function(e) {
                var n = this;
                return isNaN(e) == 0 && e != n.height() && (t.prototype.height.call(n, e),
                        n.reloadData()),
                    t.prototype.height.call(n)
            },
            a.prototype._contentView = null,
            a.prototype.contentView = function() {
                var e = this;
                return e._contentView == null && (e._contentView = new t,
                        e._contentView.clip(!0),
                        e.insertSubViewAt(e._contentView, 0)),
                    e._contentView
            },
            a.prototype._offset = new n,
            a.prototype.offset = function(e) {
                var t = this;
                return Boolean(e) && e.equalsTo(t._offset) == 0 && (t._offset = e.clone(),
                        t.reloadData()),
                    t._offset
            },
            a.prototype._contentSize = new n,
            a.prototype.contentSize = function(e) {
                var t = this;
                return Boolean(e) && e.equalsTo(t._contentSize) == 0 && (t._contentSize = e.clone(),
                        t.reloadData()),
                    t._contentSize
            },
            a.prototype._bouncing = !0,
            a.prototype.bouncing = function(e) {
                var t = this;
                return typeof e == "boolean" && t._bouncing != e && (t._bouncing = e),
                    t._bouncing
            },
            a.prototype._easing = !0,
            a.prototype.easing = function(e) {
                var t = this;
                return typeof e == "boolean" && e == t._easing && (t._easing = e),
                    t._easing
            },
            a.prototype._paging = !1,
            a.prototype.paging = function(e) {
                var t = this;
                return typeof e == "boolean" && t._paging != e && (t._paging = e),
                    t._paging
            },
            a.prototype._hScrollBar = null,
            a.prototype.hScrollBar = function() {
                var e = this;
                return e._hScrollBar == null && (e.delegate != null && e.delegate.scrollBar != null && (e._hScrollBar = e.delegate.scrollBar(e, !1)),
                        e._hScrollBar == null && (e._hScrollBar = new i(!1)),
                        e._hScrollBar.scrollView = e,
                        e.addSubView(e._hScrollBar)),
                    e._hScrollBar
            },
            a.prototype._vScrollBar = null,
            a.prototype.vScrollBar = function() {
                var e = this;
                return e._vScrollBar == null && (e.delegate != null && e.delegate.scrollBar != null && (e._vScrollBar = e.delegate.scrollBar(e, !0)),
                        e._vScrollBar == null && (e._vScrollBar = new i(!0)),
                        e._vScrollBar.scrollView = e,
                        e.addSubView(e._vScrollBar)),
                    e._vScrollBar
            },
            a.prototype._lockHorizontal = !1,
            a.prototype.lockHorizontal = function(e) {
                var t = this;
                return typeof e == "boolean" && t._lockHorizontal != e && (t._lockHorizontal = e),
                    t._lockHorizontal
            },
            a.prototype._lockVertical = !1,
            a.prototype.lockVertical = function(e) {
                var t = this;
                return typeof e == "boolean" && t._lockVertical != e && (t._lockVertical = e),
                    t._lockVertical
            },
            a.prototype._scrollBarStyle = r.AUTO,
            a.prototype.scrollBarStyle = function(e) {
                var t = this;
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
                var e = this;
                e.needReload = !0
            },
            a.prototype.renderView = function() {
                var e = this;
                if (e.bouncing() == 0) {
                    var t = e.offset();
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
                var t = this;
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
                var t = this,
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
                var e = this,
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
                var e = this;
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
    }),
    define("table_view", ["scroll_view", "rect", "vec2"], function(e, t, n) {
        var r = {};
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
        var i = function() {
            var t = this;
            e.prototype.constructor.call(t)
        };
        return i.prototype = new e,
            i.constructor = i,
            i.prototype._dataSource = null,
            i.prototype.dataSource = function(e) {
                var t = this;
                return Boolean(e) && e != t._dataSource && (t._dataSource = e,
                        e.isVertical(t) ? (t.lockHorizontal(!0),
                            t.lockVertical(!1)) : (t.lockVertical(!0),
                            t.lockHorizontal(!1))),
                    t._dataSource
            },
            i.prototype.renderView = function() {
                var e = this;
                if (e._dataSource != null) {
                    if (e.bouncing() == 0) {
                        var t = e.offset();
                        t.x = Math.max(0, Math.min(e.contentSize().x - e.width(), t.x)),
                            t.y = Math.max(0, Math.min(e.contentSize().y - e.height(), t.y))
                    }
                    var n = e.contentView();
                    n.width(e.width()),
                        n.height(e.height());
                    var r;
                    e._dataSource.isVertical(e) ? r = e.renderVertical() : r = e.renderHorizontal();
                    var i = e.contentView().subViews().slice();
                    for (var s = 0; s < i.length; s++) {
                        var o = !0;
                        for (var u = 0; u < r.length; u++)
                            if (i[s] == r[u]) {
                                o = !1;
                                break
                            }
                        o && i[s].remove()
                    }
                    for (var a = 0; a < r.length; a++) {
                        var f = !0;
                        for (var l = 0; l < i.length; l++)
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
                var e = this,
                    t = new n(e.offset().y, e.offset().y + e.height()),
                    r = [],
                    i = 0;
                for (var s = 0; s < e.dataSource().cellCount(e); s++) {
                    var o = e.dataSource().cellSizeByIndex(e, s),
                        u = new n(i, i + o),
                        a = u.y < t.x || u.x > t.y;
                    if (a == 0) {
                        var f = e.dataSource().cellByIndex(e, s);
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
                var e = this,
                    t = new n(e.offset().x, e.offset().x + e.width()),
                    r = [],
                    i = 0;
                for (var s = 0; s < e.dataSource().cellCount(e); s++) {
                    var o = e.dataSource().cellSizeByIndex(e, s),
                        u = new n(i, i + o),
                        a = u.y < t.x || u.x > t.y;
                    if (a == 0) {
                        var f = e.dataSource().cellByIndex(e, s);
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
    }),
    define("spin_view", ["view_container", "mat3"], function(e, t) {
        var n = function() {};
        n.prototype = new e;
        var r = n.prototype;
        return r.constructor = n,
            r.clone = function() {
                var e = this,
                    t = new n;
                return e.copyProperties(t),
                    t
            },
            r.copyProperties = function(t) {
                var n = this;
                e.prototype.copyProperties.call(n, t),
                    t.originalMat = n.originalMat.clone(),
                    t.clockwise = n.clockwise,
                    t.aps(n.aps()),
                    t.angle(n.angle()),
                    n.playing ? t.play() : t.pause()
            },
            r.dealloc = function() {
                var t = this;
                e.prototype.dealloc.call(t),
                    t.originalMat = null
            },
            r.originalMat = null,
            r.updatePropsFromXML = function(t) {
                var n = this;
                e.prototype.updatePropsFromXML.call(n, t),
                    n.originalMat = n.matrix().clone(),
                    t.is("[clockwise]") ? n.clockwise = t.attr("clockwise") == "true" : n.clockwise = !0;
                if (t.is("[aps]")) {
                    var r = parseFloat(t.attr("aps"));
                    n.aps(r)
                }
                t.is("[auto-play]") ? n.playing = t.attr("auto-play") == "true" : n.playing = !0
            },
            r.playing = !1,
            r.clockwise = !0,
            r.play = function() {
                var e = this;
                e.playing = !0
            },
            r.pause = function() {
                var e = this;
                e.playing = !1
            },
            r.angleChanged = !1,
            r._angle = 0,
            r.angle = function(e) {
                var t = this;
                return typeof e == "number" && (e = e >= 0 ? e % 360 : 360 - Math.abs(e) % 360,
                        t._angle != e && (t._angle = e,
                            t.angleChanged = !0)),
                    t._angle
            },
            r._aps = 0,
            r.aps = function(e) {
                var t = this;
                return isNaN(e) == 0 && e != t._aps && (t._aps = e,
                        t.needToRender(!0)),
                    t._aps
            },
            r.update = function(n, r) {
                var i = this;
                e.prototype.update.call(i, n, r);
                if (i.playing) {
                    var s = r * i.aps();
                    i.angle(i.angle() + (i.clockwise ? 1 : -1) * s)
                }
                if (i.angleChanged) {
                    i.angleChanged = !1;
                    var o = i.angle() * (Math.PI / 180),
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
    }),
    define("axe", ["render_engine", "event_center", "event", "stage", "view_container", "view", "bitmap", "shape", "movie", "text", "button", "motion", "scroll_view", "table_view", "spin_view", "view_factory"], function(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v) {
        var m = function(m, g, y) {
                var b = this;
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
                var e = this;
                return e._renderEngine
            },
            m.prototype.initRenderEngine = function() {},
            m
    }),
    define("view_ctrl", ["jquery", "view_container", "assets_loader", "event_center", "event", "progress_event", "error_event"], function(e, t, n, r, i, s, o) {
        var u = function(e) {
            var t = this;
            typeof e == "object" && t.initWithView(e)
        };
        return u.prototype.constructor = u,
            u.prototype.inited = !1,
            u.prototype.prepared = !1,
            u.prototype._view = null,
            u.prototype.view = function(e) {
                var t = this;
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
                var e = this;
                return e._loadPercent
            },
            u.prototype.inited = !1,
            u.prototype.init = function() {
                var e = this;
                if (e.inited !== !1)
                    throw new Error("View controller has init already.");
                e.inited = !0,
                    e.prepared = !0,
                    e._loadPercent = 1,
                    e.onViewControllerPrepared()
            },
            u.prototype.initWithView = function(e) {
                var t = this;
                if (t.inited !== !1)
                    throw new Error("View controller has init already.");
                t.view(e),
                    t.init()
            },
            u.prototype.$viewXML = null,
            u.prototype.afterPrepared = function() {
                var e = this;
                e.inited = !0,
                    e.prepared = !0,
                    e._loadPercent = 1;
                if (e._view != null) {
                    e._view.updatePropsFromXML(e.$viewXML),
                        e.onViewControllerPrepared();
                    if (e._view.onStage) {
                        var t = e._view.stage();
                        e._view.resize(t.stageWidth(), t.stageHeight()),
                            e._view.onWindowOrientationChanged(t.orientation)
                    }
                } else
                    e.onViewControllerPrepared();
                r.dispatchEvent(new i(e, i.PREPARED))
            },
            u.prototype.initWithXML = function(t) {
                var n = this;
                if (n.inited !== !1)
                    throw new Error("View controller has init already.");
                n._loadPercent = 0,
                    n.inited = !0,
                    n.prepared = !1,
                    n.$viewXML = t;
                var r = n.$viewXML.find("asset");
                if (r.length <= 0)
                    n.afterPrepared();
                else {
                    var i = [];
                    r.each(function(t, n) {
                            i.push(e(n).text())
                        }),
                        n.loadAssets(i)
                }
            },
            u.prototype.initWithURL = function(t) {
                var s = this;
                if (s.inited !== !1)
                    throw new Error("View controller has init already.");
                var u = n.asset(t);
                if (u != null)
                    s.initWithXML(u);
                else {
                    s._loadPercent = 0,
                        s.inited = !0,
                        s.prepared = !1;
                    var a = new n;
                    r.addListener(a, s, [i.LOAD, o.ERROR], [function() {
                            s.$viewXML = n.asset(t);
                            var i = s.$viewXML.find("asset");
                            if (i.length <= 0)
                                s.afterPrepared();
                            else {
                                var o = [];
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
                var t = this;
                t.assets = e;
                var u = new n;
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
                var e = this;
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
    }),
    define("stage_ctrl", ["view_ctrl", "stage"], function(e, t) {
        var n = function() {};
        return n.prototype = new e,
            n.prototype.constructor = n,
            n.prototype.generateView = function() {
                return new t
            },
            n
    }),
    define("section_cell", ["view_ctrl", "event_center", "event"], function(e, t, n) {
        var r = function(e) {
            if (arguments.length > 0) {
                var t = this;
                t.initWithView(e)
            }
        };
        return r.prototype = new e,
            r.prototype.constructor = r,
            r.prototype.motionBox = null,
            r.prototype.kvMotion = null,
            r.prototype.motionLoading = !1,
            r.prototype.onViewControllerPrepared = function() {
                var e = this;
                e.motionBox = e.view().subViewByName("motion_box")
            },
            r.prototype.onViewAddToStage = function() {
                var e = this;
                e.prepared && e.motionBox != null && e.kvMotion == null && e.loadKVMotion()
            },
            r.prototype.loadKVMotion = function() {
                var e = this;
                if (e.motionLoading == 0) {
                    e.motionLoading = !0;
                    var r = e.createKVMotion();
                    r != null && (t.addListener(r, e, n.PREPARED, e.onKVMotionPrepared),
                        r.initialize())
                }
            },
            r.prototype.onKVMotionPrepared = function(e) {
                var t = this;
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
    }),
    define("kv_motion", ["view_ctrl"], function(e) {
        var t = function() {};
        return t.prototype = new e,
            t.prototype.constructor = t,
            t.prototype.initialize = function() {},
            t
    }),
    define("button_group", ["event_center", "touch_event", "button_state", "event"], function(e, t, n, r) {
        var i = function() {};
        return i.prototype.constructor = i,
            i.prototype.eachButton = function(e) {
                var t = this;
                for (var n = 0; n < t.buttons().length; n++) {
                    var r = t.buttons()[n];
                    if (e(n, r) === !1)
                        break
                }
            },
            i.prototype._buttons = null,
            i.prototype.buttons = function() {
                var e = this;
                return e._buttons == null && (e._buttons = []),
                    e._buttons
            },
            i.prototype.addButtons = function(r) {
                var i = this;
                for (var s = 0; s < r.length; s++) {
                    var o = r[s];
                    o.switchMode(!0),
                        o.buttonState(n.NORMAL_STATE),
                        e.addListener(o, i, t.TOUCH_END, i.onButtonTouchEnd),
                        i.buttons().push(o)
                }
            },
            i.prototype.onButtonTouchEnd = function(t) {
                var n = this,
                    i = t.target;
                n.selectButton(i),
                    e.dispatchEvent(new r(n, r.CHANGE))
            },
            i.prototype.enable = function() {
                var e = this;
                e.eachButton(function(t, n) {
                    n != e._selectedButton && n.enabled(!0)
                })
            },
            i.prototype.disable = function() {
                var e = this;
                e.eachButton(function(e, t) {
                    t.enabled(!1)
                })
            },
            i.prototype.selectedIndex = function() {
                var e = this;
                return e.indexOfButton(e._selectedButton)
            },
            i.prototype._selectedButton = null,
            i.prototype.selectedButton = function() {
                var e = this;
                return e._selectedButton
            },
            i.prototype.buttonByIndex = function(e) {
                var t = this,
                    n = null;
                return e >= 0 && e < t.buttons().length && (n = t.buttons()[e]),
                    n
            },
            i.prototype.indexOfButton = function(e) {
                var t = this,
                    n = -1;
                for (var r = 0; r < t.buttons().length; r++)
                    if (e == t.buttons()[r]) {
                        n = r;
                        break
                    }
                return n
            },
            i.prototype.cancelable = !1,
            i.prototype.selectButton = function(e) {
                var t = this;
                if (t.cancelable) {
                    t._selectedButton != null && t._selectedButton.buttonState(n.NORMAL_STATE);
                    var r = t._selectedButton;
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
                var t = this,
                    n = t.buttonByIndex(e);
                n != null && t.selectButton(n)
            },
            i.prototype.cancelSelect = function() {
                var e = this;
                e._selectedButton != null && (e._selectedButton.enabled(!0),
                    e._selectedButton.buttonState(n.NORMAL_STATE),
                    e._selectedButton = null)
            },
            i
    }),
    // 声音模块
    define("audio_ctrl", ["event_center", "event", "assets_loader"], function(e, t, n) {
        var r = function(e, t) {
            var n = this;
            if (arguments.length > 0)
                if (typeof e == "string") {
                    var r = document.createElement("audio");
                    r.src = e,
                        n.audio(r)
                } else
                    typeof e == "object" && n.audio(e);
            arguments.length > 1 && n.loop(t)
        };
        return r.audioByURL = function(e) {
                var t = n.asset(e);
                return new r(t)
            },
            r.prototype.constructor = r,
            r.prototype._audio = null,
            r.prototype.audio = function(e) {
                var t = this;
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
                var r = this,
                    i = n.type;
                i == "playing" ? (r._playing = !0,
                    e.dispatchEvent(new t(r, t.CHANGE))) : i == "pause" ? (r._playing = !1,
                    e.dispatchEvent(new t(r, t.CHANGE))) : i == "ended" && (r.loop() ? r.play(0) : e.dispatchEvent(new t(r, t.END)))
            },
            r.prototype._volume = 1,
            r.prototype.volume = function(e) {
                var t = this;
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
                var e = this;
                return e._playing
            },
            r.prototype._loop = !1,
            r.prototype.loop = function(e) {
                var t = this;
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
                var t = this;
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
                var e = this;
                if (e.audio() != null)
                    try {
                        e.audio().pause()
                    } catch (t) {}
            },
            r.prototype.dealloc = function() {
                var e = this;
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
    }),

    // xml各节点实例化，并实现文档的事件操作end

    define("head_kv", ["kv_motion", "button_group", "event_center", "event", "system", "vec2", "movie", "audio_ctrl"], function(e, t, n, r, i, s, o, u) {
        var a = function(e, t, n, r, i, s, o) {
            var u = this;
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
                var t = this;
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
                var t = this,
                    n = new s(t.x, t.y),
                    r = new s(e.x, e.y);
                return n.distance(r)
            },
            a.prototype.toNodes = null,
            a.prototype.addToNodes = function(e) {
                var t = this;
                for (var n = 0; n < arguments.length; n++)
                    t.toNodes.push(arguments[n])
            },
            a.prototype.getMotionFrames = function(e) {
                var t = this,
                    n = e[t.motionIndex],
                    r = n.frames().slice(t.beginFrame, t.endFrame + 1);
                return t.reversion && (r = r.reverse()),
                    r
            },
            a.prototype.reverse = function() {
                var e = this,
                    t = new a(e.name, e.motionIndex, e.beginFrame, e.endFrame, e.x, e.y, !e.reversion);
                return t.toNodes = e.toNodes.slice(),
                    t
            };
        var f = new a("DEF_LOOP", 0, 0, 14, 0, 0),
            l = new a("DEF_TRANSITION", 0, 15, 28, 0, 1),
            c = l.reverse(),
            h = new a("MC1_TRANSITION", 1, 0, 6, 0, 2),
            p = h.reverse(),
            d = new a("MC1_LOOP", 1, 7, 20, 0, 3);
        h.soundEffect("sounds/head_1.mp3");
        var v = new a("MC2_TRANSITION", 2, 0, 6, 1, 2),
            m = v.reverse(),
            g = new a("MC2_LOOP", 2, 7, 20, 1, 3);
        v.soundEffect("sounds/head_2.mp3");
        var y = new a("MC3_TRANSITION", 3, 0, 6, 2, 2),
            b = y.reverse(),
            w = new a("MC3_LOOP", 3, 7, 20, 2, 3);
        y.soundEffect("sounds/head_3.mp3");
        var E = new a("MC4_TRANSITION", 4, 0, 6, 3, 2),
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
        var T = [];
        T.push(f, l, c, d, h, p, g, v, m, w, y, b, x, E, S);
        var N = function() {};
        return N.prototype = new e,
            N.prototype.constructor = N,
            N.prototype.sounds = null,
            N.prototype.currentSound = null,
            N.prototype.initialize = function() {
                var e = this;
                e.initWithURL("views/head.xml"),
                    e.sounds = [],
                    e.sounds.push(new u("sounds/head_1.mp3", !1), new u("sounds/head_2.mp3", !1), new u("sounds/head_3.mp3", !1), new u("sounds/head_4.mp3", !1))
            },
            N.prototype.motionBox = null,
            N.prototype.motions = null,
            N.prototype.kvButtons = null,
            N.prototype.kvMovie = null,
            N.prototype.onViewControllerPrepared = function() {
                var e = this;
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
                var e = this;
                e.prepared && (e.actions = [],
                    e._currentNode = null,
                    e.currentNode(f),
                    e.kvButtons.cancelSelect())
            },
            N.prototype.onViewRemoveFromStage = function() {
                var e = this;
                e.prepared && e.currentSound != null && (e.currentSound.pause(),
                    e.currentSound = null)
            },
            N.prototype._currentNode = null,
            N.prototype.currentNode = function(e) {
                var t = this;
                if (Boolean(e)) {
                    var n = t._currentNode;
                    t._currentNode = e;
                    var r = null;
                    n != null && n.name == t._currentNode.name ? (r = t._currentNode.getMotionFrames(t.motions),
                            n.reversion == t._currentNode.reversion ? r = r.slice(t.kvMovie.currentFrame(), r.length) : r = r.slice(r.length - (t.kvMovie.currentFrame() - 1), r.length)) : r = t._currentNode.getMotionFrames(t.motions),
                        r.length <= 0 ? t.onKVMovieEnd() : (t.kvMovie.frames(r),
                            t.kvMovie.goToAndPlay(0))
                }
                return t._currentNode
            },
            N.prototype.actions = null,
            N.prototype.onKVMovieEnd = function() {
                var e = this,
                    t = null;
                if (e.actions.length > 0) {
                    t = e.actions.shift();
                    var n = t.soundEffect();
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
                var e = this;
                e.currentSound != null && (e.currentSound.pause(),
                    e.currentSound = null);
                var t = null;
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
                var n = this,
                    r = null,
                    i = e.toNodes.slice();
                while (r == null && i.length > 0) {
                    var s = null,
                        o = -1;
                    for (var u = 0; u < i.length; u++) {
                        var a = i[u];
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
                        var f = n.createPathFromNodes(s, t);
                        f != null && (r = [e].concat(f))
                    }
                }
                return r
            },
            N.prototype.createPathFromNodeName = function(e, t) {
                var n = this,
                    r = null;
                for (var i = 0; i < T.length; i++) {
                    var s = T[i];
                    if (s.name == e) {
                        var o = n.createPathFromNodes(s, t);
                        if (r == null || o.length < r.length)
                            r = o
                    }
                }
                return r
            },
            N
    }),
    define("section_head", ["section_cell", "head_kv"], function(e, t) {
        var n = function(t) {
            var n = this;
            e.prototype.constructor.call(n, t)
        };
        return n.prototype = new e,
            n.prototype.constructor = n,
            n.prototype.createKVMotion = function() {
                var e = this;
                return new t
            },
            n
    }),




    // 头部节点实例化


    define("star_kv", ["kv_motion", "event_center", "event", "touch_event", "audio_ctrl"], function(e, t, n, r, i) {
        var s = function(e) {
            var t = this;
            t.starName = e
        };
        return s.prototype = new e,
            s.constructor = s,
            s.prototype.starName = null,
            s.prototype.soundEffect = null,
            s.prototype.initialize = function() {
                var e = this;
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
                var e = this;
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
                var e = this;
                e.prepared && (e.isPlaying = !1,
                    e.btnStart.normalStateView.play(0),
                    e.normalBox.alpha(1),
                    e.normalBox.stopAnimation(),
                    e.view().empty(),
                    e.view().addSubView(e.normalBox))
            },
            s.prototype.onViewRemoveFromStage = function() {
                var e = this;
                e.prepared && e.soundEffect != null && e.soundEffect.pause()
            },
            s.prototype.isPlaying = !1,
            s.prototype.playMotion = function() {
                var e = this;
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
                var e = this;
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
                var e = this;
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
    }),



    // 四大导师的实例化
    define("section_naying", ["section_cell", "star_kv"], function(e, t) {
        var n = function(t) {
            var n = this;
            e.prototype.constructor.call(n, t)
        };
        return n.prototype = new e,
            n.prototype.constructor = n,
            n.prototype.createKVMotion = function() {
                var e = this;
                return new t("naying")
            },
            n
    }),
    // 那英实例化
    define("section_jay", ["section_cell", "star_kv"], function(e, t) {
        var n = function(t) {
            var n = this;
            e.prototype.constructor.call(n, t)
        };
        return n.prototype = new e,
            n.prototype.constructor = n,
            n.prototype.createKVMotion = function() {
                var e = this;
                return new t("jay")
            },
            n
    }),
    // 杰伦实例化
    define("section_wangfeng", ["section_cell", "star_kv"], function(e, t) {
        var n = function(t) {
            var n = this;
            e.prototype.constructor.call(n, t)
        };
        return n.prototype = new e,
            n.prototype.constructor = n,
            n.prototype.createKVMotion = function() {
                var e = this;
                return new t("wangfeng")
            },
            n
    }),
    // 汪峰实例化
    define("section_harlern", ["section_cell", "star_kv"], function(e, t) {
        var n = function(t) {
            var n = this;
            e.prototype.constructor.call(n, t)
        };
        return n.prototype = new e,
            n.prototype.constructor = n,
            n.prototype.createKVMotion = function() {
                var e = this;
                return new t("harlern")
            },
            n
    }),
    // 哈林实例化
    define("bottom_kv", ["kv_motion", "event_center", "touch_event", "event", "audio_ctrl"], function(e, t, n, r, i) {
        var s = function() {};
        return s.prototype = new e,
            s.prototype.constructor = s,
            s.prototype.soundEffect = null,
            s.prototype.initialize = function() {
                var e = this;
                e.initWithURL("views/bottom.xml"),
                    e.soundEffect = new i("sounds/bottom.mp3"),
                    e.soundEffect.loop(!1)
            },
            s.prototype.stars = null,
            s.prototype.voc = null,
            s.prototype.onViewControllerPrepared = function() {
                var e = this;
                e.stars = e.view().subViewByName("stars"),
                    e.voc = e.view().subViewByName("voc"),
                    t.addListener(e.view(), e, n.CLICK, function() {
                        e.isPlaying == 0 && e.play()
                    }),
                    t.addListener(e.voc, e, r.END, e.onVocREnd)
            },
            s.prototype.onViewAddToStage = function() {
                var e = this;
                e.prepared && (e.isPlaying = !1,
                    e.voc.goToAndPlay(0),
                    e.stars.goToAndStop(0))
            },
            s.prototype.onViewRemoveFromStage = function() {
                var e = this;
                e.prepared && (e.voc.stop(),
                    e.voc.stop(),
                    e.soundEffect.pause())
            },
            s.prototype.onViewUpdated = function() {
                var e = this;
                e.prepared && e.isPlaying == 0 && e.voc.currentFrame() == 15 && e.voc.goToAndPlay(0)
            },
            s.prototype.isPlaying = !1,
            s.prototype.play = function() {
                var e = this;
                e.isPlaying == 0 && (e.isPlaying = !0,
                    e.stars.goToAndPlay(0),
                    e.soundEffect.play(0))
            },
            s.prototype.onVocREnd = function() {
                var e = this;
                e.isPlaying = !1,
                    e.voc.goToAndPlay(0)
            },
            s
    }),
    // 底部实例化 
    define("section_bottom", ["section_cell", "bottom_kv"], function(e, t) {
        var n = function(t) {
            var n = this;
            e.prototype.constructor.call(n, t)
        };
        return n.prototype = new e,
            n.prototype.constructor = n,
            n.prototype.createKVMotion = function() {
                var e = this;
                return new t
            },
            n
    }),

    // stage舞台实例完

    require.config({
        paths: {
            jquery: "lib/jquery-1.9.0.min"
        }
    }),
    define("jquery.cookie", ["jquery"], function() {
        jQuery.cookie = function(e, t, n) {
            if (arguments.length > 1 && String(t) !== "[object Object]") {
                n = jQuery.extend({}, n);
                if (t === null || t === undefined)
                    n.expires = -1;
                if (typeof n.expires == "number") {
                    var r = n.expires,
                        i = n.expires = new Date;
                    i.setDate(i.getDate() + r)
                }
                return t = String(t),
                    document.cookie = [encodeURIComponent(e), "=", n.raw ? t : encodeURIComponent(t), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : ""].join("")
            }
            n = t || {};
            var s, o = n.raw ? function(e) {
                    return e
                } :
                decodeURIComponent;
            return (s = (new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)")).exec(document.cookie)) ? o(s[1]) : null
        }
    }),
    define("voc_constants", ["jquery", "jquery.cookie"], function(e, t) {
        var n = {};
        return n.READ_MORE = "http://evt.dianping.com/synthesislink/4483.html",

            n.pvCount = 0,
            n.likeCount = 0,
            n.isLiked = function() {
                var t = e.cookie("is_liked");
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
    }),
    define("section_footer", ["section_cell", "event_center", "touch_event", "event", "voc_constants", "button_state"], function(e, t, n, r, i, s) {
        var o = function(t) {
            var n = this;
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
                var o = this;
                e.prototype.onViewControllerPrepared.call(o),
                    o.btnWant = o.view().subViewByName("btn_want"),
                    o.btnSource = o.view().subViewByName("btn_source"),
                    o.txtPV = o.view().subViewByName("txt_pv");
                var u = i.pvCount;
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
                    var n = Math.floor(t / 100) / 10;
                    e.text(n + "K +")
                } else if (t >= 1e4) {
                    var r = Math.floor(t / 1e3) / 10;
                    e.text(r + "W +")
                }
            },
            o
    }),
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
    }),



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
    }),
    define("wechat_event", ["event"], function(e) {
        var t = function(t, n, r) {
            var i = this;
            i.message = r,
                e.prototype.constructor.call(i, t, n)
        };
        t.CANCEL_SHARING = "cancel_sharing",
            t.SUCCESS_SHARING = "success_sharing",
            t.WEICHAT_READY = "wechat_ready",
            t.prototype = new e;
        var n = t.prototype;
        return n.constructor = t,
            n.message = null,
            n.clone = function(e) {
                var n = this;
                return e = arguments.length > 0 ? e : n.target,
                    new t(e, n.type, n.message)
            },
            t
    }),
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
    }),




    // 页面实例化
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
    }),
    require.config({
        baseUrl: "./js",
        paths: typeof window["BungbaLibrary"] != "undefined" ? BungbaLibrary.lib() : {}
    });
var axe = null;
require(["jquery", "axe", "voice_of_china"], function(e, t, n) {
        e(document).ready(function() {
            axe = new t(n, "views/stage.xml")
        })
    }),
    define("main", function() {});




// 所用知识

// AMD模式的requireJS
// 逐帧图片使用Blob获取图片并二进制显示
// 把一个影片图片全合并在一张图上