"use strict";
module.exports = function() {
    var imul = Math.imul;
    if (typeof imul !== "function") return false;
    return imul(-1, 8) === -8;
};

//# sourceMappingURL=is-implemented.js.map