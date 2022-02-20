"use strict";
Object.defineProperty(exports, "SupabaseClient", {
    enumerable: true,
    get: function() {
        return _supabaseClient.default;
    }
});
Object.defineProperty(exports, "SupabaseClientOptions", {
    enumerable: true,
    get: function() {
        return _types.SupabaseClientOptions;
    }
});
Object.defineProperty(exports, "SupabaseRealtimePayload", {
    enumerable: true,
    get: function() {
        return _types.SupabaseRealtimePayload;
    }
});
Object.defineProperty(exports, "AuthUser", {
    enumerable: true,
    get: function() {
        return _gotrueJs.User;
    }
});
Object.defineProperty(exports, "AuthSession", {
    enumerable: true,
    get: function() {
        return _gotrueJs.Session;
    }
});
var _exportNames = {
    SupabaseClient: true,
    SupabaseClientOptions: true,
    SupabaseRealtimePayload: true,
    AuthUser: true,
    AuthSession: true,
    PostgrestResponse: true,
    PostgrestSingleResponse: true,
    PostgrestMaybeSingleResponse: true,
    PostgrestError: true,
    createClient: true
};
Object.defineProperty(exports, "PostgrestResponse", {
    enumerable: true,
    get: function() {
        return _postgrestJs.PostgrestResponse;
    }
});
Object.defineProperty(exports, "PostgrestSingleResponse", {
    enumerable: true,
    get: function() {
        return _postgrestJs.PostgrestSingleResponse;
    }
});
Object.defineProperty(exports, "PostgrestMaybeSingleResponse", {
    enumerable: true,
    get: function() {
        return _postgrestJs.PostgrestMaybeSingleResponse;
    }
});
Object.defineProperty(exports, "PostgrestError", {
    enumerable: true,
    get: function() {
        return _postgrestJs.PostgrestError;
    }
});
exports.createClient = void 0;
var _supabaseClient = require("./SupabaseClient");
var _types = require("./lib/types");
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
var _postgrestJs = require("@supabase/postgrest-js");
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
exports.createClient = createClient;

//# sourceMappingURL=index.d.js.map