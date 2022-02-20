"use strict";
exports.default = _possibleConstructorReturn;
var _typeofJs = require("./typeof.js");
var _assertThisInitializedJs = require("./assertThisInitialized.js");
function _possibleConstructorReturn(self, call) {
    if (call && ((0, _typeofJs).default(call) === "object" || typeof call === "function")) {
        return call;
    } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
    }
    return (0, _assertThisInitializedJs).default(self);
}

//# sourceMappingURL=possibleConstructorReturn.js.map