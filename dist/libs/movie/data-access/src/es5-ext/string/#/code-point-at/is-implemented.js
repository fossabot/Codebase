"use strict";
var str = "abc\uD834\uDF06def";
module.exports = function() {
    if (typeof str.codePointAt !== "function") return false;
    return str.codePointAt(3) === 119558;
};

//# sourceMappingURL=is-implemented.js.map