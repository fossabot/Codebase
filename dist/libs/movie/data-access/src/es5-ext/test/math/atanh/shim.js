"use strict";
module.exports = function(t, a) {
    a(t({}), NaN, "NaN");
    a(t(-2), NaN, "Less than -1");
    a(t(2), NaN, "Greater than 1");
    a(t(-1), -Infinity, "-1");
    a(t(1), Infinity, "1");
    a(t(0), 0, "Zero");
    a(Math.round(t(0.5) * 1000000000000000), 549306144334055, "Other");
};

//# sourceMappingURL=shim.js.map