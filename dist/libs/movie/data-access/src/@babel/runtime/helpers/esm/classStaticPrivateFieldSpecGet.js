"use strict";
exports.default = _classStaticPrivateFieldSpecGet;
var _classApplyDescriptorGetJs = require("./classApplyDescriptorGet.js");
var _classCheckPrivateStaticAccessJs = require("./classCheckPrivateStaticAccess.js");
var _classCheckPrivateStaticFieldDescriptorJs = require("./classCheckPrivateStaticFieldDescriptor.js");
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    (0, _classCheckPrivateStaticAccessJs).default(receiver, classConstructor);
    (0, _classCheckPrivateStaticFieldDescriptorJs).default(descriptor, "get");
    return (0, _classApplyDescriptorGetJs).default(receiver, descriptor);
}

//# sourceMappingURL=classStaticPrivateFieldSpecGet.js.map