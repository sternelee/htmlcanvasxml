var Bounce = function() {};
Bounce.easeIn = function(e, t, n, r) {
        return n - Bounce.easeOut(r - e, 0, n, r) + t
    },
    Bounce.easeOut = function(e, t, n, r) {
        return (e /= r) < 1 / 2.75 ? n * 7.5625 * e * e + t : e < 2 / 2.75 ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : e < 2.5 / 2.75 ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
    },
    Bounce.easeInOut = function(e, t, n, r) {
        return e < r / 2 ? Bounce.easeIn(e * 2, 0, n, r) * .5 + t : Bounce.easeOut(e * 2 - r, 0, n, r) * .5 + n * .5 + t
    };
