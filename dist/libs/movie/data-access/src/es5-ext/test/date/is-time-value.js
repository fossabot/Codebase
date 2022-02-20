"use strict";
module.exports = function(t, a) {
    a(t("arar"), false, "String");
    a(t(12), true, "Number in range");
    a(t(true), true, "Boolean");
    a(t(new Date()), true, "Date");
    a(t({}), false, "Plain object");
    a(t(NaN), false, "NaN");
    a(t(Infinity), false, "Infinity");
    a(t(864000000000000000), false, "Beyond range");
    a(t(8640000000000000), true, "Below range");
    a(t(-864000000000000000), false, "Negative beyond range");
    a(t(-8640000000000000), true, "Negative below range");
};

//# sourceMappingURL=is-time-value.js.map