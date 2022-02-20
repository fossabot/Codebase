"use strict";
var _exportNames = {};
var _core = require("./core");
Object.keys(_core).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _core[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _core[key];
        }
    });
});
var _react = require("./react");
Object.keys(_react).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _react[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _react[key];
        }
    });
});

//# sourceMappingURL=index.d.js.map