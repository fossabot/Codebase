"use strict";
Object.defineProperty(exports, "SupabaseStorageClient", {
    enumerable: true,
    get: function() {
        return _supabaseStorageClient.SupabaseStorageClient;
    }
});
var _exportNames = {
    SupabaseStorageClient: true
};
var _supabaseStorageClient = require("./SupabaseStorageClient");
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

//# sourceMappingURL=index.d.js.map