"use strict";
exports.default = _toArray;
var _arrayWithHolesJs = require("./arrayWithHoles.js");
var _iterableToArrayJs = require("./iterableToArray.js");
var _unsupportedIterableToArrayJs = require("./unsupportedIterableToArray.js");
var _nonIterableRestJs = require("./nonIterableRest.js");
function _toArray(arr) {
    return (0, _arrayWithHolesJs).default(arr) || (0, _iterableToArrayJs).default(arr) || (0, _unsupportedIterableToArrayJs).default(arr) || (0, _nonIterableRestJs).default();
}

//# sourceMappingURL=toArray.js.map