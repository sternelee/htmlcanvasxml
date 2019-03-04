define("star_kv", ["kv_motion", "event_center", "event", "touch_event", "audio_ctrl"], function(e, t, n, r, i) {
    var s = function(e) {
        var t = this;
        t.starName = e
    };
    return s.prototype = new e,
        s.constructor = s,
        s.prototype.starName = null,
        s.prototype.soundEffect = null,
        s.prototype.initialize = function() {
            var e = this;
            e.starName != null && (e.soundEffect = new i("sounds/" + e.starName + ".mp3"),
                e.soundEffect.loop(!1),
                e.initWithURL("views/" + e.starName + ".xml"))
        },
        s.prototype.playBox = null,
        s.prototype.huMovie = null,
        s.prototype.gfMovie = null,
        s.prototype.btnBack = null,
        s.prototype.normalBox = null,
        s.prototype.btnStart = null,
        s.prototype.onViewControllerPrepared = function() {
            var e = this;
            e.playBox = e.view().subViewByName("play_box"),
                e.huMovie = e.playBox.subViewByName("hu_movie"),
                e.gfMovie = e.playBox.subViewByName("gf_movie"),
                e.btnBack = e.playBox.subViewByName("btn_back"),
                e.normalBox = e.view().subViewByName("normal_box"),
                e.btnStart = e.normalBox.subViewByName("btn_start"),
                t.addListener(e.btnStart, e, r.CLICK, e.playMotion),
                t.addListener(e.btnBack, e, r.CLICK, e.stopMotion),
                t.addListener(e.huMovie, e, n.END, e.onHUMovieEnd)
        },
        s.prototype.onViewAddToStage = function() {
            var e = this;
            e.prepared && (e.isPlaying = !1,
                e.btnStart.normalStateView.play(0),
                e.normalBox.alpha(1),
                e.normalBox.stopAnimation(),
                e.view().empty(),
                e.view().addSubView(e.normalBox))
        },
        s.prototype.onViewRemoveFromStage = function() {
            var e = this;
            e.prepared && e.soundEffect != null && e.soundEffect.pause()
        },
        s.prototype.isPlaying = !1,
        s.prototype.playMotion = function() {
            var e = this;
            e.isPlaying == 0 && (e.isPlaying = !0,
                e.btnBack.stopAnimation(),
                e.btnBack.visible(!1),
                e.huMovie.goToAndStop(0),
                e.gfMovie.goToAndStop(0),
                e.gfMovie.stopAnimation(),
                e.gfMovie.visible(!1),
                e.view().insertSubViewAt(e.playBox, 0),
                e.btnStart.normalStateView.currentTime(0),
                e.btnStart.normalStateView.pause(),
                e.normalBox.animate(1, {
                    alpha: 0
                }, Cubic.easeIn, null, function() {
                    e.soundEffect != null && e.soundEffect.play(0),
                        e.normalBox.remove(),
                        e.huMovie.play()
                }))
        },
        s.prototype.stopMotion = function() {
            var e = this;
            e.isPlaying && (e.isPlaying = !1,
                e.btnBack.normalStateView.currentTime(0),
                e.btnBack.normalStateView.pause(),
                e.normalBox.alpha(0),
                e.view().addSubView(e.normalBox),
                e.normalBox.animate(1, {
                    alpha: 1
                }, Cubic.easeOut, null, function() {
                    e.btnStart.normalStateView.play(0),
                        e.playBox.remove()
                }),
                e.soundEffect != null && e.soundEffect.pause())
        },
        s.prototype.onHUMovieEnd = function() {
            var e = this;
            e.gfMovie.alpha(0),
                e.gfMovie.visible(!0),
                e.gfMovie.animate(.5, {
                    alpha: 1
                }, Cubic.easeOut, null, function() {
                    e.gfMovie.play(),
                        setTimeout(function() {
                            e.btnBack.alpha(0),
                                e.btnBack.visible(!0),
                                e.btnBack.normalStateView.currentTime(0),
                                e.btnBack.normalStateView.pause(),
                                e.btnBack.animate(.5, {
                                    alpha: 1
                                }, Cubic.easeOut, null, function() {
                                    e.btnBack.normalStateView.play(0)
                                })
                        }, 2400)
                })
        },
        s
})
