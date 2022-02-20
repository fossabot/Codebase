"use strict";
exports.default = void 0;
var _regexJs = require("./regex.js");
function validate(uuid) {
    return typeof uuid === 'string' && _regexJs.default.test(uuid);
}
var _default = validate;
exports.default = _default;

//# sourceMappingURL=validate.js.map