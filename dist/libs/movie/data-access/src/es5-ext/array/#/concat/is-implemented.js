"use strict";
var SubArray = require("../../_sub-array-dummy-safe");
module.exports = function() {
    return new SubArray().concat("foo") instanceof SubArray;
};

//# sourceMappingURL=is-implemented.js.map