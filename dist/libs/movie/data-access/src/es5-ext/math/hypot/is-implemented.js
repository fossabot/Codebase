"use strict";
module.exports = function() {
    var hypot = Math.hypot;
    if (typeof hypot !== "function") return false;
    return hypot(3, 4) === 5;
};

//# sourceMappingURL=is-implemented.js.map