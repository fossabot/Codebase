"use strict";
exports.default = _classPrivateFieldInitSpec;
var _checkPrivateRedeclarationJs = require("./checkPrivateRedeclaration.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) {
    (0, _checkPrivateRedeclarationJs).default(obj, privateMap);
    privateMap.set(obj, value);
}

//# sourceMappingURL=classPrivateFieldInitSpec.js.map