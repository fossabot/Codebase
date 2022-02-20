"use strict";
exports.default = _slicedToArray;
var _arrayWithHolesJs = require("./arrayWithHoles.js");
var _iterableToArrayLimitJs = require("./iterableToArrayLimit.js");
var _unsupportedIterableToArrayJs = require("./unsupportedIterableToArray.js");
var _nonIterableRestJs = require("./nonIterableRest.js");
function _slicedToArray(arr, i) {
    return (0, _arrayWithHolesJs).default(arr) || (0, _iterableToArrayLimitJs).default(arr, i) || (0, _unsupportedIterableToArrayJs).default(arr, i) || (0, _nonIterableRestJs).default();
}

//# sourceMappingURL=slicedToArray.js.map