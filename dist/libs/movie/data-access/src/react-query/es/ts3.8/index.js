"use strict";
Object.defineProperty(exports, "useQueries", {
    enumerable: true,
    get: function() {
        return _useQueries.useQueries;
    }
});
var _exportNames = {
    useQueries: true
};
var _useQueries = require("./useQueries");
var _ = require("..");
Object.keys(_).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _[key];
        }
    });
});

//# sourceMappingURL=index.js.map