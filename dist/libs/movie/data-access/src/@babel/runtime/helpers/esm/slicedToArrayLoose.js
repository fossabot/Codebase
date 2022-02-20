"use strict";
exports.default = _slicedToArrayLoose;
var _arrayWithHolesJs = require("./arrayWithHoles.js");
var _iterableToArrayLimitLooseJs = require("./iterableToArrayLimitLoose.js");
var _unsupportedIterableToArrayJs = require("./unsupportedIterableToArray.js");
var _nonIterableRestJs = require("./nonIterableRest.js");
function _slicedToArrayLoose(arr, i) {
    return (0, _arrayWithHolesJs).default(arr) || (0, _iterableToArrayLimitLooseJs).default(arr, i) || (0, _unsupportedIterableToArrayJs).default(arr, i) || (0, _nonIterableRestJs).default();
}

//# sourceMappingURL=slicedToArrayLoose.js.map