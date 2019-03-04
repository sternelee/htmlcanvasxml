define("align_mode", [], function() {
    var e = function() {};
    return e.CENTER = parseInt("1", 2),
        e.MIDDLE = parseInt("10", 2),
        e.TOP = parseInt("100", 2),
        e.BOTTOM = parseInt("1000", 2),
        e.LEFT = parseInt("10000", 2),
        e.RIGHT = parseInt("100000", 2),
        e.MIDDLE_LEFT = e.MIDDLE | e.LEFT,
        e.MIDDLE_CENTER = e.MIDDLE | e.CENTER,
        e.MIDDLE_RIGHT = e.MIDDLE | e.RIGHT,
        e.TOP_LEFT = e.TOP | e.LEFT,
        e.TOP_CENTER = e.TOP | e.CENTER,
        e.TOP_RIGHT = e.TOP | e.RIGHT,
        e.BOTTOM_LEFT = e.BOTTOM | e.LEFT,
        e.BOTTOM_CENTER = e.BOTTOM | e.CENTER,
        e.BOTTOM_RIGHT = e.BOTTOM | e.RIGHT,
        e
})
