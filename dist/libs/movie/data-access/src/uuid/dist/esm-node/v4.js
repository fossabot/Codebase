"use strict";
exports.default = void 0;
var _rngJs = require("./rng.js");
var _stringifyJs = require("./stringify.js");
function v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random || (options.rng || _rngJs.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(let i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, _stringifyJs).default(rnds);
}
var _default = v4;
exports.default = _default;

//# sourceMappingURL=v4.js.map