define("bottom_kv", ["kv_motion", "event_center", "touch_event", "event", "audio_ctrl"], function(e, t, n, r, i) {
    var s = function() {};
    return s.prototype = new e,
        s.prototype.constructor = s,
        s.prototype.soundEffect = null,
        s.prototype.initialize = function() {
            var e = this;
            e.initWithURL("views/bottom.xml"),
                e.soundEffect = new i("sounds/bottom.mp3"),
                e.soundEffect.loop(!1)
        },
        s.prototype.stars = null,
        s.prototype.voc = null,
        s.prototype.onViewControllerPrepared = function() {
            var e = this;
            e.stars = e.view().subViewByName("stars"),
                e.voc = e.view().subViewByName("voc"),
                t.addListener(e.view(), e, n.CLICK, function() {
                    e.isPlaying == 0 && e.play()
                }),
                t.addListener(e.voc, e, r.END, e.onVocREnd)
        },
        s.prototype.onViewAddToStage = function() {
            var e = this;
            e.prepared && (e.isPlaying = !1,
                e.voc.goToAndPlay(0),
                e.stars.goToAndStop(0))
        },
        s.prototype.onViewRemoveFromStage = function() {
            var e = this;
            e.prepared && (e.voc.stop(),
                e.voc.stop(),
                e.soundEffect.pause())
        },
        s.prototype.onViewUpdated = function() {
            var e = this;
            e.prepared && e.isPlaying == 0 && e.voc.currentFrame() == 15 && e.voc.goToAndPlay(0)
        },
        s.prototype.isPlaying = !1,
        s.prototype.play = function() {
            var e = this;
            e.isPlaying == 0 && (e.isPlaying = !0,
                e.stars.goToAndPlay(0),
                e.soundEffect.play(0))
        },
        s.prototype.onVocREnd = function() {
            var e = this;
            e.isPlaying = !1,
                e.voc.goToAndPlay(0)
        },
        s
})
