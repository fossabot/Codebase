"use strict";
var _devtools = require("./devtools");
Object.keys(_devtools).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _devtools[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _devtools[key];
        }
    });
});

//# sourceMappingURL=index.js.map