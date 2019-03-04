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
})
