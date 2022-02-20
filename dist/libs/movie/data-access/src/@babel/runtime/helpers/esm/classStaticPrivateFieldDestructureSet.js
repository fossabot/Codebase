"use strict";
exports.default = _classStaticPrivateFieldDestructureSet;
var _classApplyDescriptorDestructureSetJs = require("./classApplyDescriptorDestructureSet.js");
var _classCheckPrivateStaticAccessJs = require("./classCheckPrivateStaticAccess.js");
var _classCheckPrivateStaticFieldDescriptorJs = require("./classCheckPrivateStaticFieldDescriptor.js");
function _classStaticPrivateFieldDestructureSet(receiver, classConstructor, descriptor) {
    (0, _classCheckPrivateStaticAccessJs).default(receiver, classConstructor);
    (0, _classCheckPrivateStaticFieldDescriptorJs).default(descriptor, "set");
    return (0, _classApplyDescriptorDestructureSetJs).default(receiver, descriptor);
}

//# sourceMappingURL=classStaticPrivateFieldDestructureSet.js.map