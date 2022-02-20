"use strict";
exports.getClient = void 0;
var _supabaseJs = require("@supabase/supabase-js");
const getClient = ()=>(0, _supabaseJs).createClient(process.env['NX_SUPA_KEY'], process.env['NX_SUPA_URL'], {
        persistSession: true,
        autoRefreshToken: true
    })
;
exports.getClient = getClient;

//# sourceMappingURL=supabase.js.map