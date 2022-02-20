// Exports true if environment provides native `Symbol` implementation
"use strict";
var Symbol = require("ext/global-this").Symbol;
module.exports = typeof Symbol === "function" && typeof Symbol() === "symbol";

//# sourceMappingURL=is-native-implemented.js.map