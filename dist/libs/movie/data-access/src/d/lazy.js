"use strict";
var isPlainFunction = require("type/plain-function/is"), ensureValue = require("type/value/ensure"), isValue = require("type/value/is"), map = require("es5-ext/object/map"), contains = require("es5-ext/string/#/contains");
var call = Function.prototype.call, defineProperty = Object.defineProperty, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, getPrototypeOf = Object.getPrototypeOf, hasOwnProperty = Object.prototype.hasOwnProperty, cacheDesc = {
    configurable: false,
    enumerable: false,
    writable: false,
    value: null
}, define;
define = function(name, options) {
    var value1, dgs, cacheName, desc, writable = false, resolvable, flat;
    options = Object(ensureValue(options));
    cacheName = options.cacheName;
    flat = options.flat;
    if (!isValue(cacheName)) cacheName = name;
    delete options.cacheName;
    value1 = options.value;
    resolvable = isPlainFunction(value1);
    delete options.value;
    dgs = {
        configurable: Boolean(options.configurable),
        enumerable: Boolean(options.enumerable)
    };
    if (name !== cacheName) {
        dgs.get = function() {
            if (hasOwnProperty.call(this, cacheName)) return this[cacheName];
            cacheDesc.value = resolvable ? call.call(value1, this, options) : value1;
            cacheDesc.writable = writable;
            defineProperty(this, cacheName, cacheDesc);
            cacheDesc.value = null;
            if (desc) defineProperty(this, name, desc);
            return this[cacheName];
        };
    } else if (!flat) {
        dgs.get = function self() {
            var ownDesc;
            if (hasOwnProperty.call(this, name)) {
                ownDesc = getOwnPropertyDescriptor(this, name);
                // It happens in Safari, that getter is still called after property
                // was defined with a value, following workarounds that
                // While in IE11 it may happen that here ownDesc is undefined (go figure)
                if (ownDesc) {
                    if (ownDesc.hasOwnProperty("value")) return ownDesc.value;
                    if (typeof ownDesc.get === "function" && ownDesc.get !== self) {
                        return ownDesc.get.call(this);
                    }
                    return value1;
                }
            }
            desc.value = resolvable ? call.call(value1, this, options) : value1;
            defineProperty(this, name, desc);
            desc.value = null;
            return this[name];
        };
    } else {
        dgs.get = function self() {
            var base = this, ownDesc;
            if (hasOwnProperty.call(this, name)) {
                // It happens in Safari, that getter is still called after property
                // was defined with a value, following workarounds that
                ownDesc = getOwnPropertyDescriptor(this, name);
                if (ownDesc.hasOwnProperty("value")) return ownDesc.value;
                if (typeof ownDesc.get === "function" && ownDesc.get !== self) {
                    return ownDesc.get.call(this);
                }
            }
            while(!hasOwnProperty.call(base, name))base = getPrototypeOf(base);
            desc.value = resolvable ? call.call(value1, base, options) : value1;
            defineProperty(base, name, desc);
            desc.value = null;
            return base[name];
        };
    }
    dgs.set = function(value) {
        if (hasOwnProperty.call(this, name)) {
            throw new TypeError("Cannot assign to lazy defined '" + name + "' property of " + this);
        }
        dgs.get.call(this);
        this[cacheName] = value;
    };
    if (options.desc) {
        desc = {
            configurable: contains.call(options.desc, "c"),
            enumerable: contains.call(options.desc, "e")
        };
        if (cacheName === name) {
            desc.writable = contains.call(options.desc, "w");
            desc.value = null;
        } else {
            writable = contains.call(options.desc, "w");
            desc.get = dgs.get;
            desc.set = dgs.set;
        }
        delete options.desc;
    } else if (cacheName === name) {
        desc = {
            configurable: Boolean(options.configurable),
            enumerable: Boolean(options.enumerable),
            writable: Boolean(options.writable),
            value: null
        };
    }
    delete options.configurable;
    delete options.enumerable;
    delete options.writable;
    return dgs;
};
module.exports = function(props) {
    return map(props, function(desc, name) {
        return define(name, desc);
    });
};

//# sourceMappingURL=lazy.js.map