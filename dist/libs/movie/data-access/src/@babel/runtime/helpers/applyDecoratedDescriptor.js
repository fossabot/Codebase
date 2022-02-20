"use strict";
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc1 = {};
    Object.keys(descriptor).forEach(function(key) {
        desc1[key] = descriptor[key];
    });
    desc1.enumerable = !!desc1.enumerable;
    desc1.configurable = !!desc1.configurable;
    if ('value' in desc1 || desc1.initializer) {
        desc1.writable = true;
    }
    desc1 = decorators.slice().reverse().reduce(function(desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc1);
    if (context && desc1.initializer !== void 0) {
        desc1.value = desc1.initializer ? desc1.initializer.call(context) : void 0;
        desc1.initializer = undefined;
    }
    if (desc1.initializer === void 0) {
        Object.defineProperty(target, property, desc1);
        desc1 = null;
    }
    return desc1;
}
module.exports = _applyDecoratedDescriptor, module.exports.__esModule = true, module.exports["default"] = module.exports;

//# sourceMappingURL=applyDecoratedDescriptor.js.map