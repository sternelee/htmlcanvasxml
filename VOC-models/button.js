define("button", ["view_container", "button_state", "event_center", "touch_event", "event"], function(e, t, n, r, i) {
    var s = function() {};
    s.prototype = new e;
    var o = s.prototype;
    return s.prototype.constructor = s,
        s.prototype.normalStateView = null,
        s.prototype.clickStateView = null,
        s.prototype.disableStateView = null,
        s.prototype.clone = function() {
            var e = this,
                t = new s;
            return e.copyProperties(t),
                t
        },
        s.prototype.copyProperties = function(t) {
            var n = this;
            e.prototype.copyProperties.call(n, t),
                t.initButton(),
                t.switchMode(n.switchMode())
        },
        s.prototype.dealloc = function() {
            var t = this;
            n.removeListener(t),
                e.prototype.dealloc.call(t)
        },
        s.prototype.updatePropsFromXML = function(t) {
            var n = this;
            e.prototype.updatePropsFromXML.call(n, t),
                n.initButton(),
                t.is("[switch-mode]") && n.switchMode(t.attr("switch-mode") == "true")
        },
        s.prototype.initButton = function() {
            var e = this;
            e.normalStateView = e.subViewByName("normal"),
                e.clickStateView = e.subViewByName("click"),
                e.disableStateView = e.subViewByName("disable"),
                e.updateButtonView(),
                n.addListener(e, e, r.TOUCH_START, e.onButtonTouchStart),
                n.addListener(e, e, r.TOUCH_END, e.onButtonTouchEnd)
        },
        s.prototype.onButtonTouchStart = function() {
            var e = this;
            e.switchMode() === !1 && e.buttonState(t.CLICK_STATE)
        },
        s.prototype.onButtonTouchEnd = function() {
            var e = this;
            e.switchMode() === !1 ? e.buttonState(t.NORMAL_STATE) : (e.buttonState() == t.NORMAL_STATE ? e.buttonState(t.CLICK_STATE) : e.buttonState(t.NORMAL_STATE),
                n.dispatchEvent(new i(e, i.CHANGE)))
        },
        s.prototype._switchMode = !1,
        s.prototype.switchMode = function(e) {
            var n = this;
            return typeof e == "boolean" && e != n._switchMode && (n._switchMode = e,
                    n.buttonState(t.NORMAL_STATE)),
                n._switchMode
        },
        s.prototype._buttonState = t.NORMAL_STATE,
        s.prototype.buttonState = function(e) {
            var t = this;
            return isNaN(e) === !1 && (t._buttonState = e,
                    t.updateButtonView()),
                t._buttonState
        },
        s.prototype.enabled = function(t) {
            var n = this,
                r = e.prototype.enabled.call(n, t);
            return typeof t == "boolean" && n.updateButtonView(),
                r
        },
        s.prototype.updateButtonView = function() {
            var e = this;
            e.switchMode() ? (e.disableStateView != null && e.disableStateView.visible(!1),
                e.normalStateView != null && e.normalStateView.visible(e.buttonState() == t.NORMAL_STATE),
                e.clickStateView != null && e.clickStateView.visible(e.buttonState() == t.CLICK_STATE)) : (e.disableStateView != null && e.disableStateView.visible(e.enabled() == 0),
                e.normalStateView != null && (e.enabled() ? e.normalStateView.visible(e.buttonState() == t.NORMAL_STATE) : e.normalStateView.visible(e.disableStateView == null)),
                e.clickStateView != null && e.clickStateView.visible(e.enabled() && e.buttonState() == t.CLICK_STATE))
        },
        s
})
