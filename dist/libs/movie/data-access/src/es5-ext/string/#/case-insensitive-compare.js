"use strict";
var toLowerCase = String.prototype.toLowerCase;
module.exports = function(other) {
    return toLowerCase.call(this).localeCompare(toLowerCase.call(String(other)));
};

//# sourceMappingURL=case-insensitive-compare.js.map