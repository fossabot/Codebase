"use strict";
exports.default = _classPrivateFieldSet;
var _classApplyDescriptorSetJs = require("./classApplyDescriptorSet.js");
var _classExtractFieldDescriptorJs = require("./classExtractFieldDescriptor.js");
function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = (0, _classExtractFieldDescriptorJs).default(receiver, privateMap, "set");
    (0, _classApplyDescriptorSetJs).default(receiver, descriptor, value);
    return value;
}

//# sourceMappingURL=classPrivateFieldSet.js.map