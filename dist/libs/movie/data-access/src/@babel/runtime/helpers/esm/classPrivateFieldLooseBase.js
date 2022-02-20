"use strict";
exports.default = _classPrivateFieldBase;
function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
        throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
}

//# sourceMappingURL=classPrivateFieldLooseBase.js.map