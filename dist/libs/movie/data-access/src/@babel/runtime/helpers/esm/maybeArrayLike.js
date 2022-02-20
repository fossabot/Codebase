"use strict";
exports.default = _maybeArrayLike;
var _arrayLikeToArrayJs = require("./arrayLikeToArray.js");
function _maybeArrayLike(next, arr, i) {
    if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
        var len = arr.length;
        return (0, _arrayLikeToArrayJs).default(arr, i !== void 0 && i < len ? i : len);
    }
    return next(arr, i);
}

//# sourceMappingURL=maybeArrayLike.js.map