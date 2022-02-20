"use strict";
exports.default = _classStaticPrivateFieldSpecSet;
var _classApplyDescriptorSetJs = require("./classApplyDescriptorSet.js");
var _classCheckPrivateStaticAccessJs = require("./classCheckPrivateStaticAccess.js");
var _classCheckPrivateStaticFieldDescriptorJs = require("./classCheckPrivateStaticFieldDescriptor.js");
function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    (0, _classCheckPrivateStaticAccessJs).default(receiver, classConstructor);
    (0, _classCheckPrivateStaticFieldDescriptorJs).default(descriptor, "set");
    (0, _classApplyDescriptorSetJs).default(receiver, descriptor, value);
    return value;
}

//# sourceMappingURL=classStaticPrivateFieldSpecSet.js.map