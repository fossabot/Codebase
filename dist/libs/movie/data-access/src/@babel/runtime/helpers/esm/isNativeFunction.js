"use strict";
exports.default = _isNativeFunction;
function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

//# sourceMappingURL=isNativeFunction.js.map