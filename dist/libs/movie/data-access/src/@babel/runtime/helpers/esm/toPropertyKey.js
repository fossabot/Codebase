"use strict";
exports.default = _toPropertyKey;
var _typeofJs = require("./typeof.js");
var _toPrimitiveJs = require("./toPrimitive.js");
function _toPropertyKey(arg) {
    var key = (0, _toPrimitiveJs).default(arg, "string");
    return (0, _typeofJs).default(key) === "symbol" ? key : String(key);
}

//# sourceMappingURL=toPropertyKey.js.map