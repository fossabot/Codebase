"use strict";
var _supabase = require("./supabase");
Object.keys(_supabase).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _supabase[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _supabase[key];
        }
    });
});

//# sourceMappingURL=index.js.map