"use strict";
var _postgrestJs = require("@supabase/postgrest-js");
var _supabaseRealtimeClient = require("./SupabaseRealtimeClient");
let SupabaseQueryBuilder = class SupabaseQueryBuilder extends _postgrestJs.PostgrestQueryBuilder {
    /**
   * Subscribe to realtime changes in your database.
   * @param event The database event which you would like to receive updates for, or you can use the special wildcard `*` to listen to all changes.
   * @param callback A callback that will handle the payload that is sent whenever your database changes.
   */ on(event, callback) {
        if (!this._realtime.isConnected()) {
            this._realtime.connect();
        }
        if (!this._subscription) {
            this._subscription = new _supabaseRealtimeClient.SupabaseRealtimeClient(this._realtime, this._headers, this._schema, this._table);
        }
        return this._subscription.on(event, callback);
    }
    constructor(url, { headers ={} , schema , realtime , table , fetch  }){
        super(url, {
            headers,
            schema,
            fetch
        });
        this._subscription = null;
        this._realtime = realtime;
        this._headers = headers;
        this._schema = schema;
        this._table = table;
    }
};
exports.SupabaseQueryBuilder = SupabaseQueryBuilder;

//# sourceMappingURL=SupabaseQueryBuilder.js.map