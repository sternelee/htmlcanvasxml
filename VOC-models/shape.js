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
})
