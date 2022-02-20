"use strict";
exports.default = _toPrimitive;
var _typeofJs = require("./typeof.js");
function _toPrimitive(input, hint) {
    if ((0, _typeofJs).default(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if ((0, _typeofJs).default(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}

//# sourceMappingURL=toPrimitive.js.map