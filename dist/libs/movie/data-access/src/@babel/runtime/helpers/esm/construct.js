"use strict";
exports.default = _construct;
var _setPrototypeOfJs = require("./setPrototypeOf.js");
var _isNativeReflectConstructJs = require("./isNativeReflectConstruct.js");
function _construct(Parent1, args1, Class1) {
    if ((0, _isNativeReflectConstructJs).default()) {
        exports.default = _construct = Reflect.construct;
    } else {
        exports.default = _construct = function _construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) (0, _setPrototypeOfJs).default(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
}

//# sourceMappingURL=construct.js.map