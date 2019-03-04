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
})
