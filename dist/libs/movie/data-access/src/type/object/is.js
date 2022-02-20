"use strict";
var isValue = require("../value/is");
// prettier-ignore
var possibleTypes = {
    "object": true,
    "function": true,
    "undefined": true
};
module.exports = function(value) {
    if (!isValue(value)) return false;
    return hasOwnProperty.call(possibleTypes, typeof value);
};

//# sourceMappingURL=is.js.map