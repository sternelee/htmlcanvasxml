var s = [];
function pic2buf(pic) {
    var l = pic.length;
    var xhr = new XMLHttpRequest();
    xhr.open("get", pic, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function (t) {
        if (this.status == 200) {
            var n = t.currentTarget,
                r = n.response,
                v = new Uint8Array(r),
                q = v.length,
                a = new ArrayBuffer(l * 4 + 4 + 4 + q),
                d = new DataView(a),
                t = d.byteLength;
            var m = 0;
            d.setUint32(0, l, !1);
            m += 4;
            for (var i = 0; i < l; i++) {
                var c = pic.charCodeAt(i);
                d.setUint32(m, c, !1);
                m += 4;
            }
            d.setUint32(m, q, !1);
            m += 4;
            for (var j = 0; j < q; j++) {
                d.setUint8(m, v[j], !1);
                m += 1;
            }
            s.push(a);
            console.log(s);
        }
    };
    xhr.send();
}

// 从 arraybuffer 中解析出图片信息
function buf2pic(buf) {
    var v = new DataView(buf);
    var s = 0;
    var o = [];
    var f = [];
    while (s < v.byteLength) {
        var l = v.getUint32(s, !1);
        s += 4;
        var c = "";
        for (var h = 0; h < l; h++) {
            var p = v.getUint32(s, !1);
            s += 4,
                c += String.fromCharCode(p);
        }
        o.push(c);
        var d = v.getUint32(s, !1);
        s += 4;
        var u = new Uint8Array(buf, s, d);
        s += d;
        f.push(u);
    }
    return {
        o,
        f
    };
}

var pic = "images/head_kv/背景图.jpg";
pic2buf(pic);