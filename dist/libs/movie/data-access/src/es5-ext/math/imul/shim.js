/* eslint no-bitwise: "off" */ // Thanks: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
//         /Global_Objects/Math/imul
"use strict";
module.exports = function(val1, val2) {
    var xh = val1 >>> 16 & 65535, xl = val1 & 65535, yh = val2 >>> 16 & 65535, yl = val2 & 65535;
    // The shift by 0 fixes the sign on the high part
    // the final |0 converts the unsigned value into a signed value
    return xl * yl + (xh * yl + xl * yh << 16 >>> 0) | 0;
};

//# sourceMappingURL=shim.js.map