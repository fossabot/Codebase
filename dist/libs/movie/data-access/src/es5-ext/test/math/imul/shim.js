"use strict";
module.exports = function(t, a) {
    a(t(), 0, "No arguments");
    a(t(0, 0), 0, "Zeros");
    a(t(2, 4), 8, "#1");
    a(t(-1, 8), -8, "#2");
    a(t(4294967294, 5), -10, "#3");
};

//# sourceMappingURL=shim.js.map