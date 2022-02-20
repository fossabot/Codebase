// Thanks: https://github.com/monolithed/ECMAScript-6
"use strict";
var exp = Math.exp;
module.exports = function(value) {
    if (isNaN(value)) return NaN;
    value = Number(value);
    if (value === 0) return value;
    if (value === Infinity) return Infinity;
    if (value === -Infinity) return -1;
    if (value > -0.000001 && value < 0.000001) return value + value * value / 2;
    return exp(value) - 1;
};

//# sourceMappingURL=shim.js.map