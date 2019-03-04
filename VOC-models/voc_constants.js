define("voc_constants", ["jquery", "jquery.cookie"], function(e, t) {
    var n = {};
    return n.READ_MORE = "http://evt.dianping.com/synthesislink/4483.html",

        n.pvCount = 0,
        n.likeCount = 0,
        n.isLiked = function() {
            var t = e.cookie("is_liked");
            return t == "is_liked"
        },
        n.like = function() {
            e.cookie("is_liked", "is_liked"),
                n.likeCount += 1,
                e.get("http://voc.bungba.com/dev/php/voc/like.php", {
                    ts: Date.now()
                })
        },
        n
})
