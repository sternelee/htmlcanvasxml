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
})
