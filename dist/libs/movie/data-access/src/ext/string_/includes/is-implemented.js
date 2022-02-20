"use strict";
var str = "razdwatrzy";
module.exports = function() {
    if (typeof str.includes !== "function") return false;
    return str.includes("dwa") === true && str.includes("foo") === false;
};

//# sourceMappingURL=is-implemented.js.map