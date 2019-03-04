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
})
