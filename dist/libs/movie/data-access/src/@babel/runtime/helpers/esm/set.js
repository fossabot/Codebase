"use strict";
exports.default = _set;
var _superPropBaseJs = require("./superPropBase.js");
var _definePropertyJs = require("./defineProperty.js");
function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
        throw new Error('failed to set property');
    }
    return value;
}
function set(target1, property1, value1, receiver1) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
        set = Reflect.set;
    } else {
        set = function set(target, property, value, receiver) {
            var base = (0, _superPropBaseJs).default(target, property);
            var desc;
            if (base) {
                desc = Object.getOwnPropertyDescriptor(base, property);
                if (desc.set) {
                    desc.set.call(receiver, value);
                    return true;
                } else if (!desc.writable) {
                    return false;
                }
            }
            desc = Object.getOwnPropertyDescriptor(receiver, property);
            if (desc) {
                if (!desc.writable) {
                    return false;
                }
                desc.value = value;
                Object.defineProperty(receiver, property, desc);
            } else {
                (0, _definePropertyJs).default(receiver, property, value);
            }
            return true;
        };
    }
    return set(target1, property1, value1, receiver1);
}

//# sourceMappingURL=set.js.map