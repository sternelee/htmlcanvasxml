var Back = function() {};
Back.easeIn = function(e, t, n, r) {
        var i = 1.70158;
        return n * (e /= r) * e * ((i + 1) * e - i) + t
    },
    Back.easeOut = function(e, t, n, r) {
        var i = 1.70158;
        return n * ((e = e / r - 1) * e * ((i + 1) * e + i) + 1) + t
    },
    Back.easeInOut = function(e, t, n, r) {
        var i = 1.70158;
        return (e /= r / 2) < 1 ? n / 2 * e * e * (((i *= 1.525) + 1) * e - i) + t : n / 2 * ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) + t
    }
