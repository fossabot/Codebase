"use strict";
exports.default = _classPrivateMethodGet;
function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
}

//# sourceMappingURL=classPrivateMethodGet.js.map