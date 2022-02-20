"use strict";
exports.default = _temporalRef;
var _temporalUndefinedJs = require("./temporalUndefined.js");
var _tdzJs = require("./tdz.js");
function _temporalRef(val, name) {
    return val === _temporalUndefinedJs.default ? (0, _tdzJs).default(name) : val;
}

//# sourceMappingURL=temporalRef.js.map