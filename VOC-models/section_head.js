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
})
