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
})
