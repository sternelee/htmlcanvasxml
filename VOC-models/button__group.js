define("button_group", ["event_center", "touch_event", "button_state", "event"], function(e, t, n, r) {
    var i = function() {};
    return i.prototype.constructor = i,
        i.prototype.eachButton = function(e) {
            var t = this;
            for (var n = 0; n < t.buttons().length; n++) {
                var r = t.buttons()[n];
                if (e(n, r) === !1)
                    break
            }
        },
        i.prototype._buttons = null,
        i.prototype.buttons = function() {
            var e = this;
            return e._buttons == null && (e._buttons = []),
                e._buttons
        },
        i.prototype.addButtons = function(r) {
            var i = this;
            for (var s = 0; s < r.length; s++) {
                var o = r[s];
                o.switchMode(!0),
                    o.buttonState(n.NORMAL_STATE),
                    e.addListener(o, i, t.TOUCH_END, i.onButtonTouchEnd),
                    i.buttons().push(o)
            }
        },
        i.prototype.onButtonTouchEnd = function(t) {
            var n = this,
                i = t.target;
            n.selectButton(i),
                e.dispatchEvent(new r(n, r.CHANGE))
        },
        i.prototype.enable = function() {
            var e = this;
            e.eachButton(function(t, n) {
                n != e._selectedButton && n.enabled(!0)
            })
        },
        i.prototype.disable = function() {
            var e = this;
            e.eachButton(function(e, t) {
                t.enabled(!1)
            })
        },
        i.prototype.selectedIndex = function() {
            var e = this;
            return e.indexOfButton(e._selectedButton)
        },
        i.prototype._selectedButton = null,
        i.prototype.selectedButton = function() {
            var e = this;
            return e._selectedButton
        },
        i.prototype.buttonByIndex = function(e) {
            var t = this,
                n = null;
            return e >= 0 && e < t.buttons().length && (n = t.buttons()[e]),
                n
        },
        i.prototype.indexOfButton = function(e) {
            var t = this,
                n = -1;
            for (var r = 0; r < t.buttons().length; r++)
                if (e == t.buttons()[r]) {
                    n = r;
                    break
                }
            return n
        },
        i.prototype.cancelable = !1,
        i.prototype.selectButton = function(e) {
            var t = this;
            if (t.cancelable) {
                t._selectedButton != null && t._selectedButton.buttonState(n.NORMAL_STATE);
                var r = t._selectedButton;
                t._selectedButton = null,
                    r != e && (e.buttonState(n.CLICK_STATE),
                        t._selectedButton = e)
            } else
                t._selectedButton != null && t._selectedButton != e && (t._selectedButton.enabled(!0),
                    t._selectedButton.buttonState(n.NORMAL_STATE)),
                e.buttonState(n.CLICK_STATE),
                e.enabled(!1),
                t._selectedButton = e
        },
        i.prototype.selectButtonByIndex = function(e) {
            var t = this,
                n = t.buttonByIndex(e);
            n != null && t.selectButton(n)
        },
        i.prototype.cancelSelect = function() {
            var e = this;
            e._selectedButton != null && (e._selectedButton.enabled(!0),
                e._selectedButton.buttonState(n.NORMAL_STATE),
                e._selectedButton = null)
        },
        i
})
