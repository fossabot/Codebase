"use strict";
exports.default = void 0;
var _crypto = require("crypto");
function md5(bytes) {
    if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
    } else if (typeof bytes === 'string') {
        bytes = Buffer.from(bytes, 'utf8');
    }
    return _crypto.default.createHash('md5').update(bytes).digest();
}
var _default = md5;
exports.default = _default;

//# sourceMappingURL=md5.js.map