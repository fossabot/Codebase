"use strict";
exports.default = _wrapNativeSuper;
var _getPrototypeOfJs = require("./getPrototypeOf.js");
var _setPrototypeOfJs = require("./setPrototypeOf.js");
var _isNativeFunctionJs = require("./isNativeFunction.js");
var _constructJs = require("./construct.js");
function _wrapNativeSuper(Class1) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    exports.default = _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !(0, _isNativeFunctionJs).default(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return (0, _constructJs).default(Class, arguments, (0, _getPrototypeOfJs).default(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return (0, _setPrototypeOfJs).default(Wrapper, Class);
    };
    return _wrapNativeSuper(Class1);
}

//# sourceMappingURL=wrapNativeSuper.js.map