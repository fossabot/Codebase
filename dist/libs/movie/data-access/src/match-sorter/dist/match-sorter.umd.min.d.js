"use strict";
var _index = require("../dist/index");
Object.keys(_index).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _index[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _index[key];
        }
    });
});

//# sourceMappingURL=match-sorter.umd.min.d.js.map