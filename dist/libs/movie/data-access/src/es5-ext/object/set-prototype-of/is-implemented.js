"use strict";
var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};
module.exports = function() {
    var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
    if (typeof setPrototypeOf !== "function") return false;
    return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
};

//# sourceMappingURL=is-implemented.js.map