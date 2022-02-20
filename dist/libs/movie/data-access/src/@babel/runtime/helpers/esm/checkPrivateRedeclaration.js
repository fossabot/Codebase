"use strict";
exports.default = _checkPrivateRedeclaration;
function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}

//# sourceMappingURL=checkPrivateRedeclaration.js.map