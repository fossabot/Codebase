"use strict";
var validRegExp = require("../../valid-reg-exp");
module.exports = function(string) {
    validRegExp(this);
    return String(string).search(this);
};

//# sourceMappingURL=shim.js.map