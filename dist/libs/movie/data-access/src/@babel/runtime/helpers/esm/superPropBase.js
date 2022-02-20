"use strict";
exports.default = _superPropBase;
var _getPrototypeOfJs = require("./getPrototypeOf.js");
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = (0, _getPrototypeOfJs).default(object);
        if (object === null) break;
    }
    return object;
}

//# sourceMappingURL=superPropBase.js.map