define("event", [], function() {
    var e = function(e, t) {
        var n = this;
        arguments.length >= 2 && (n.target = e,
                n.type = t),
            n.timeStamp = (new Date).getTime()
    };
    return e.LOAD = "load",
        e.PREPARED = "prepared",
        e.UPDATE = "update",
        e.READY = "ready",
        e.ADDED = "added",
        e.ADD_TO_STAGE = "add_to_stage",
        e.REMOVED = "removed",
        e.REMOVE_FROM_STAGE = "remove_from_stage",
        e.ANIMATION_BEGIN = "animation_begin",
        e.ANIMATION_END = "animation_end",
        e.RESIZE = "resize",
        e.FINISH = "finish",
        e.END = "end",
        e.CHANGE = "change",
        e.prototype.constructor = e,
        e.prototype.type = null,
        e.prototype.target = null,
        e.prototype.timeStamp = 0,
        e.prototype.clone = function(t) {
            var n = this;
            return t = arguments.length > 0 ? t : n.target,
                new e(t, n.type)
        },
        e
})
