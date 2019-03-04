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
})
