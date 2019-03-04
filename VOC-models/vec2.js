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
})
