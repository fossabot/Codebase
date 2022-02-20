// Thanks: https://github.com/monolithed/ECMAScript-6/blob/master/ES6.js
"use strict";
var log = Math.log;
module.exports = function(value) {
    if (isNaN(value)) return NaN;
    value = Number(value);
    if (value < -1) return NaN;
    if (value === -1) return -Infinity;
    if (value === 0) return value;
    if (value === Infinity) return Infinity;
    if (value > -0.00000001 && value < 0.00000001) return value - value * value / 2;
    return log(1 + value);
};

//# sourceMappingURL=shim.js.map