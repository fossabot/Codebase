// Based on: https://github.com/mathiasbynens/String.prototype.codePointAt
// Thanks @mathiasbynens !
"use strict";
var toInteger = require("../../../number/to-integer"), validValue = require("../../../object/valid-value");
module.exports = function(pos) {
    var str = String(validValue(this)), length = str.length, first, second;
    pos = toInteger(pos);
    // Account for out-of-bounds indices:
    if (pos < 0 || pos >= length) return undefined;
    // Get the first code unit
    first = str.charCodeAt(pos);
    if (first >= 55296 && first <= 56319 && length > pos + 1) {
        second = str.charCodeAt(pos + 1);
        if (second >= 56320 && second <= 57343) {
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            return (first - 55296) * 1024 + second - 56320 + 65536;
        }
    }
    return first;
};

//# sourceMappingURL=shim.js.map