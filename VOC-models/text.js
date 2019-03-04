define("text", ["jquery", "view", "color", "text_align", "text_v_align"], function(e, t, n, r, i) {
    var s = function() {};
    s.prototype = new t;
    var o = s.prototype;
    return s.prototype.constructor = s,
        s.prototype.className = "AXEText",
        s.prototype.clone = function() {
            var e = this,
                t = new s;
            return e.copyProperties(t),
                t
        },
        s.prototype.copyProperties = function(e) {
            var n = this;
            t.prototype.copyProperties.call(n, e),
                n.color() != null && e.color(n.color()),
                n.font() != null && e.font(n.font()),
                e.lineHeight(n.lineHeight()),
                e.wordWrap(n.wordWrap()),
                e.size(n.size()),
                e.style(n.style()),
                e.textAlign(n.textAlign()),
                e.textVAlign(n.textVAlign()),
                e.text(n.text()),
                e.mergeLastLine(n.mergeLastLine())
        },
        s.prototype.updatePropsFromXML = function(r) {
            var i = this;
            t.prototype.updatePropsFromXML.call(i, r),
                r.is("[merge-last-line]") && i.mergeLastLine(parseInt(r.attr("merge-last-line"), 10)),
                r.is("[color]") && i.color(n.colorWithString(r.attr("color"))),
                r.is("[font]") && i.font(r.attr("font")),
                r.is("[size]") && i.size(parseFloat(r.attr("size"))),
                r.is("[style]") && i.style(r.attr("style")),
                r.is("[text-align]") && i.textAlign(r.attr("text-align")),
                r.is("[text-v-align]") && i.textVAlign(r.attr("text-v-align")),
                r.is("[word-wrap]") && i.wordWrap(r.attr("word-wrap") == "true"),
                r.is("[line-height]") && i.lineHeight(parseFloat(r.attr("line-height"))),
                i.text(e.trim(r.text()))
        },
        s.prototype._mergeLastLine = 0,
        s.prototype.mergeLastLine = function(e) {
            var t = this;
            return isNaN(e) == 0 && t._mergeLastLine != Math.abs(e) && (t._mergeLastLine = Math.abs(e),
                    t.needToRender(!0)),
                t._mergeLastLine
        },
        s.prototype._lineHeight = 0,
        s.prototype.lineHeight = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._lineHeight && (t._lineHeight = e,
                    t.needToRender(!0)),
                t._lineHeight
        },
        s.prototype._wordWrap = !1,
        s.prototype.wordWrap = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._wordWrap && (t._wordWrap = e,
                    t.needToRender(!0)),
                t._wordWrap
        },
        s.prototype._color = null,
        s.prototype.color = function(e) {
            var t = this;
            return arguments.length > 0 && e != t._color && (t._color = e,
                    t.needToRender(!0)),
                t._color
        },
        s.prototype._font = "sans-serif",
        s.prototype.font = function(e) {
            var t = this;
            return arguments.length > 0 && typeof e == "string" && t._font != e && (t._font = e,
                    t.needToRender(!0)),
                null
        },
        s.prototype._size = 12,
        s.prototype.size = function(e) {
            var t = this;
            return arguments.length > 0 && isNaN(parseFloat(e)) === !1 && parseFloat(e) != t._size && (t._size = parseFloat(e),
                    t.needToRender(!0)),
                t._size
        },
        s.prototype._style = null,
        s.prototype.style = function(e) {
            var t = this;
            return arguments.length > 0 && typeof e == "string" && e != t._style && (t._style = e,
                    t.needToRender(!0)),
                t._style
        },
        s.prototype.textStyle = function() {
            var e = this,
                t = [];
            return e._style != null && t.push(e._style),
                e._size != null && t.push(e._size + "px"),
                e._font != null && t.push(e._font),
                t.join(" ")
        },
        s.prototype._textVAlign = i.ALPHABETIC,
        s.prototype.textVAlign = function(e) {
            var t = this;
            return arguments.length > 0 && typeof e == "string" && t._textVAlign != e && (t._textVAlign = e,
                    t.needToRender(!0)),
                t._textVAlign
        },
        s.prototype._textAlign = r.LEFT,
        s.prototype.textAlign = function(e) {
            var t = this;
            return arguments.length > 0 && typeof e == "string" && e != t._textAlign && (t._textAlign = e,
                    t.needToRender(!0)),
                t._textAlign
        },
        s.prototype._text = "",
        s.prototype.text = function(e) {
            var t = this;
            return arguments.length > 0 && t._text != e && (t._text = String(e),
                    t.needToRender(!0)),
                t._text
        },
        s
})
