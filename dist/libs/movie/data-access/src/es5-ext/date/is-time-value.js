"use strict";
module.exports = function(value) {
    try {
        value = Number(value);
    } catch (e) {
        return false;
    }
    if (isNaN(value)) return false;
    if (Math.abs(value) > 8640000000000000) return false;
    return true;
};

//# sourceMappingURL=is-time-value.js.map