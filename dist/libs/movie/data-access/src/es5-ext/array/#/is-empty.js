"use strict";
var ensureArray = require("../../object/ensure-array"), firstIndex = require("./first-index");
module.exports = function() {
    return firstIndex.call(ensureArray(this)) === null;
};

//# sourceMappingURL=is-empty.js.map