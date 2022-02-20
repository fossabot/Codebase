"use strict";
var setPrototypeOf = require("./setPrototypeOf.js");
var isNativeReflectConstruct = require("./isNativeReflectConstruct.js");
function _construct(Parent1, args1, Class1) {
    if (isNativeReflectConstruct()) {
        module.exports = _construct = Reflect.construct, module.exports.__esModule = true, module.exports["default"] = module.exports;
    } else {
        module.exports = _construct = function _construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) setPrototypeOf(instance, Class.prototype);
            return instance;
        }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
    return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

//# sourceMappingURL=construct.js.map