"use strict";
Object.defineProperty(exports, "GoTrueApi", {
    enumerable: true,
    get: function() {
        return _goTrueApi.default;
    }
});
Object.defineProperty(exports, "GoTrueClient", {
    enumerable: true,
    get: function() {
        return _goTrueClient.default;
    }
});
var _exportNames = {
    GoTrueApi: true,
    GoTrueClient: true
};
var _goTrueApi = require("./GoTrueApi");
var _goTrueClient = require("./GoTrueClient");
var _types = require("./lib/types");
Object.keys(_types).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _types[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _types[key];
        }
    });
});

//# sourceMappingURL=index.js.map