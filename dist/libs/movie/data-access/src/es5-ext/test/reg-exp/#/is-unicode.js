"use strict";
module.exports = function(t, a) {
    var re;
    a(t.call(/raz/), false, "Normal");
    a(t.call(/raz/g), false, "Global");
    try {
        // eslint-disable-next-line no-invalid-regexp
        re = new RegExp("raz", "u");
    } catch (ignore) {}
    if (!re) return;
    a(t.call(re), true, "Unicode");
};

//# sourceMappingURL=is-unicode.js.map