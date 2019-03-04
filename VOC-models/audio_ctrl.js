define("audio_ctrl", ["event_center", "event", "assets_loader"], function(e, t, n) {
    var r = function(e, t) {
        var n = this;
        if (arguments.length > 0)
            if (typeof e == "string") {
                var r = document.createElement("audio");
                r.src = e,
                    n.audio(r)
            } else
                typeof e == "object" && n.audio(e);
        arguments.length > 1 && n.loop(t)
    };
    return r.audioByURL = function(e) {
            var t = n.asset(e);
            return new r(t)
        },
        r.prototype.constructor = r,
        r.prototype._audio = null,
        r.prototype.audio = function(e) {
            var t = this;
            if (typeof e == "object" && t._audio != e) {
                t._audio != null && (t.pause(),
                        t._audio = null,
                        t._audio.removeEventListener("playing", t),
                        t._audio.removeEventListener("pause", t),
                        t._audio.removeEventListener("ended", t)),
                    t._audio = e;
                try {
                    t._audio.loop = t.loop()
                } catch (n) {}
                try {
                    t._audio.volume = t._volume
                } catch (n) {}
                t._audio.addEventListener("playing", t),
                    t._audio.addEventListener("pause", t),
                    t._audio.addEventListener("ended", t)
            }
            return t._audio
        },
        r.prototype.handleEvent = function(n) {
            var r = this,
                i = n.type;
            i == "playing" ? (r._playing = !0,
                e.dispatchEvent(new t(r, t.CHANGE))) : i == "pause" ? (r._playing = !1,
                e.dispatchEvent(new t(r, t.CHANGE))) : i == "ended" && (r.loop() ? r.play(0) : e.dispatchEvent(new t(r, t.END)))
        },
        r.prototype._volume = 1,
        r.prototype.volume = function(e) {
            var t = this;
            if (isNaN(e) === !1 && t._volume != e) {
                t._volume = e;
                if (t.audio() != null)
                    try {
                        t.audio().volume = t._volume
                    } catch (n) {}
            }
            return t._volume
        },
        r.prototype._playing = !1,
        r.prototype.playing = function() {
            var e = this;
            return e._playing
        },
        r.prototype._loop = !1,
        r.prototype.loop = function(e) {
            var t = this;
            if (typeof e == "boolean" && e != t._loop) {
                t._loop = e;
                if (t.audio() != null)
                    try {
                        t.audio().loop = t._loop
                    } catch (n) {}
            }
            return t._loop
        },
        r.prototype.play = function(e) {
            var t = this;
            if (t.audio() != null) {
                if (isNaN(e) === !1)
                    try {
                        t.audio().currentTime = e
                    } catch (n) {}
                try {
                    t.audio().play()
                } catch (n) {}
            }
        },
        r.prototype.pause = function() {
            var e = this;
            if (e.audio() != null)
                try {
                    e.audio().pause()
                } catch (t) {}
        },
        r.prototype.dealloc = function() {
            var e = this;
            e._audio != null && (e.pause(),
                e._audio = null,
                e._audio.removeEventListener("playing", e),
                e._audio.removeEventListener("pause", e),
                e._audio.removeEventListener("ended", e),
                e._audio = null,
                e._playing = !1,
                e._loop = !1,
                e._volume = 1)
        },
        r
})
