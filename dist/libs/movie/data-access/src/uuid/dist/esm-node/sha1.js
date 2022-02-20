"use strict";
exports.default = void 0;
var _crypto = require("crypto");
function sha1(bytes) {
    if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
    } else if (typeof bytes === 'string') {
        bytes = Buffer.from(bytes, 'utf8');
    }
    return _crypto.default.createHash('sha1').update(bytes).digest();
}
var _default = sha1;
exports.default = _default;

//# sourceMappingURL=sha1.js.map