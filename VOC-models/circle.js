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
})
