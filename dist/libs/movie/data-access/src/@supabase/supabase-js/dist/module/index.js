"use strict";
Object.defineProperty(exports, "SupabaseClient", {
    enumerable: true,
    get: function() {
        return _supabaseClient.default;
    }
});
var _exportNames = {
    SupabaseClient: true,
    createClient: true
};
exports.createClient = void 0;
var _supabaseClient = require("./SupabaseClient");
var _gotrueJs = require("@supabase/gotrue-js");
Object.keys(_gotrueJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _gotrueJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _gotrueJs[key];
        }
    });
});
var _realtimeJs = require("@supabase/realtime-js");
Object.keys(_realtimeJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _realtimeJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _realtimeJs[key];
        }
    });
});
/**
 * Creates a new Supabase Client.
 */ const createClient = (supabaseUrl, supabaseKey, options)=>{
    return new _supabaseClient.default(supabaseUrl, supabaseKey, options);
};
exports.createClient = createClient;

//# sourceMappingURL=index.js.map