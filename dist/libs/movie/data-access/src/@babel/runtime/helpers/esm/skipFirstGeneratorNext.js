"use strict";
exports.default = _skipFirstGeneratorNext;
function _skipFirstGeneratorNext(fn) {
    return function() {
        var it = fn.apply(this, arguments);
        it.next();
        return it;
    };
}

//# sourceMappingURL=skipFirstGeneratorNext.js.map