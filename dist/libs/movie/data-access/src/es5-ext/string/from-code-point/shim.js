// Based on:
// http://norbertlindenberg.com/2012/05/ecmascript-supplementary-characters/
// and:
// https://github.com/mathiasbynens/String.fromCodePoint/blob/master
// /fromcodepoint.js
"use strict";
var floor = Math.floor, fromCharCode = String.fromCharCode;
// eslint-disable-next-line no-unused-vars
module.exports = function(codePoint1 /*, …codePoints*/ ) {
    var chars = [], length = arguments.length, i, codePoint, result = "";
    for(i = 0; i < length; ++i){
        codePoint = Number(arguments[i]);
        if (!isFinite(codePoint) || codePoint < 0 || codePoint > 1114111 || floor(codePoint) !== codePoint) {
            throw new RangeError("Invalid code point " + codePoint);
        }
        if (codePoint < 65536) {
            chars.push(codePoint);
        } else {
            codePoint -= 65536;
            // eslint-disable-next-line no-bitwise
            chars.push((codePoint >> 10) + 55296, codePoint % 1024 + 56320);
        }
        if (i + 1 !== length && chars.length <= 16384) continue;
        result += fromCharCode.apply(null, chars);
        chars.length = 0;
    }
    return result;
};

//# sourceMappingURL=shim.js.map