"use strict";
module.exports = function() {
    var fromCodePoint = String.fromCodePoint;
    if (typeof fromCodePoint !== "function") return false;
    return fromCodePoint(119558, 97, 119559) === "\ud834\udf06a\ud834\udf07";
};

//# sourceMappingURL=is-implemented.js.map