"use strict";
exports.default = _inherits;
var _setPrototypeOfJs = require("./setPrototypeOf.js");
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    Object.defineProperty(subClass, "prototype", {
        writable: false
    });
    if (superClass) (0, _setPrototypeOfJs).default(subClass, superClass);
}

//# sourceMappingURL=inherits.js.map