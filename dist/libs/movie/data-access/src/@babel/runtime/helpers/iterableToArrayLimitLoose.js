"use strict";
function _iterableToArrayLimitLoose(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
    if (_i == null) return;
    var _arr = [];
    for(_i = _i.call(arr), _step; !(_step = _i.next()).done;){
        _arr.push(_step.value);
        if (i && _arr.length === i) break;
    }
    return _arr;
}
module.exports = _iterableToArrayLimitLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;

//# sourceMappingURL=iterableToArrayLimitLoose.js.map