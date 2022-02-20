"use strict";
exports.default = _createSuper;
var _getPrototypeOfJs = require("./getPrototypeOf.js");
var _isNativeReflectConstructJs = require("./isNativeReflectConstruct.js");
var _possibleConstructorReturnJs = require("./possibleConstructorReturn.js");
function _createSuper(Derived) {
    var hasNativeReflectConstruct = (0, _isNativeReflectConstructJs).default();
    return function _createSuperInternal() {
        var Super = (0, _getPrototypeOfJs).default(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = (0, _getPrototypeOfJs).default(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return (0, _possibleConstructorReturnJs).default(this, result);
    };
}

//# sourceMappingURL=createSuper.js.map