"use strict";
exports.default = void 0;
var _validateJs = require("./validate.js");
function version(uuid) {
    if (!(0, _validateJs).default(uuid)) {
        throw TypeError('Invalid UUID');
    }
    return parseInt(uuid.substr(14, 1), 16);
}
var _default = version;
exports.default = _default;

//# sourceMappingURL=version.js.map