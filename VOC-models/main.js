require.config({
    baseUrl: "./js",
    paths: typeof window["BungbaLibrary"] != "undefined" ? BungbaLibrary.lib() : {}
});
var axe = null;
require(["jquery", "axe", "voice_of_china"], function(e, t, n) {
        e(document).ready(function() {
            axe = new t(n, "views/stage.xml")
        })
    }),
    define("main", function() {});
