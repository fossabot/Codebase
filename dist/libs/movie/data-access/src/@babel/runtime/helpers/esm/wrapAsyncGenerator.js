"use strict";
exports.default = _wrapAsyncGenerator;
var _asyncGeneratorJs = require("./AsyncGenerator.js");
function _wrapAsyncGenerator(fn) {
    return function() {
        return new _asyncGeneratorJs.default(fn.apply(this, arguments));
    };
}

//# sourceMappingURL=wrapAsyncGenerator.js.map