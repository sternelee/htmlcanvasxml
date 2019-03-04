define("motion_frame", ["mat3", "color", "easing"], function(Mat3, BBColor) {
    var AXEMotionFrame = function() {},
        pt = AXEMotionFrame.prototype;
    return pt.constructor = AXEMotionFrame,
        pt.time = 0,
        pt.tween = null,
        pt.isBlank = !1,
        pt.matrix = null,
        pt.alpha = 1,
        pt.bgColor = null,
        pt.frame = NaN,
        pt.rotation = null,
        pt.updateFromXML = function($xml) {
            var self = this;
            self.isBlank = $xml.is("[blank]"),
                self.time = parseFloat($xml.attr("time")),
                self.tween = $xml.is("[tween]") ? eval($xml.attr("tween")) : null,
                $xml.is("[bg-color]") ? self.bgColor = BBColor.colorWithString($xml.attr("bg-color")) : self.bgColor = null,
                $xml.is("[alpha]") && (self.alpha = parseFloat($xml.attr("alpha"))),
                $xml.is("[frame]") ? self.frame = parseFloat($xml.attr("frame")) : self.frame = NaN;
            if ($xml.is("[rotate]")) {
                var strRotation = $xml.attr("rotate").split(",");
                self.rotation = {
                    x: parseFloat(strRotation[0]),
                    y: parseFloat(strRotation[1]),
                    rotation: parseFloat(strRotation[2]) * (Math.PI / 180)
                }
            }
            var matrix = new Mat3;
            if ($xml.is("[matrix]")) {
                var strMatrix = $xml.attr("matrix").split(",");
                matrix.a = parseFloat(strMatrix[0]),
                    matrix.b = parseFloat(strMatrix[1]),
                    matrix.c = parseFloat(strMatrix[2]),
                    matrix.d = parseFloat(strMatrix[3]),
                    matrix.tx = parseFloat(strMatrix[4]),
                    matrix.ty = parseFloat(strMatrix[5])
            } else {
                var scaleX = $xml.is("[scale-x]") ? parseFloat($xml.attr("scale-x")) : 1,
                    scaleY = $xml.is("[scale-y]") ? parseFloat($xml.attr("scale-y")) : 1,
                    rotation = $xml.is("[rotation]") ? parseFloat($xml.attr("rotation")) * (Math.PI / 180) : 0,
                    x = $xml.is("[x]") ? parseFloat($xml.attr("x")) : 0,
                    y = $xml.is("[y]") ? parseFloat($xml.attr("y")) : 0;
                matrix.a = scaleX * Math.cos(rotation),
                    matrix.b = Math.sin(rotation),
                    matrix.c = -1 * Math.sin(rotation),
                    matrix.d = scaleY * Math.cos(rotation),
                    matrix.tx = x,
                    matrix.ty = y
            }
            self.matrix = matrix
        },
        pt.clone = function() {
            var e = this,
                t = new AXEMotionFrame;
            return t.time = e.time,
                t.frame = e.frame,
                t.tween = e.tween,
                t.alpha = e.alpha,
                t.isBlank = e.isBlank,
                e.matrix != null && (t.matrix = e.matrix.clone()),
                t
        },
        pt.dealloc = function() {
            var e = this;
            e.matrix = null
        },
        AXEMotionFrame
})
