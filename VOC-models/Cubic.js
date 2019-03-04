var Cubic = function() {};
Cubic.easeIn = function(e, t, n, r) {
        return n * (e /= r) * e * e + t
    },
    Cubic.easeOut = function(e, t, n, r) {
        return n * ((e = e / r - 1) * e * e + 1) + t
    },
    Cubic.easeInOut = function(e, t, n, r) {
        return (e /= r / 2) < 1 ? n / 2 * e * e * e + t : n / 2 * ((e -= 2) * e * e + 2) + t
    };
