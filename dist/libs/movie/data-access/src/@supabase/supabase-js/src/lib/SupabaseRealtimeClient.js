"use strict";
var swcHelpers = require("@swc/helpers");
var _realtimeJs = require("@supabase/realtime-js");
let SupabaseRealtimeClient = class SupabaseRealtimeClient {
    getPayloadRecords(payload) {
        const records = {
            new: {},
            old: {}
        };
        if (payload.type === 'INSERT' || payload.type === 'UPDATE') {
            records.new = _realtimeJs.Transformers.convertChangeData(payload.columns, payload.record);
        }
        if (payload.type === 'UPDATE' || payload.type === 'DELETE') {
            records.old = _realtimeJs.Transformers.convertChangeData(payload.columns, payload.old_record);
        }
        return records;
    }
    /**
   * The event you want to listen to.
   *
   * @param event The event
   * @param callback A callback function that is called whenever the event occurs.
   */ on(event, callback) {
        this.subscription.on(event, (payload)=>{
            let enrichedPayload = {
                schema: payload.schema,
                table: payload.table,
                commit_timestamp: payload.commit_timestamp,
                eventType: payload.type,
                new: {},
                old: {},
                errors: payload.errors
            };
            enrichedPayload = swcHelpers.extends({}, enrichedPayload, this.getPayloadRecords(payload));
            callback(enrichedPayload);
        });
        return this;
    }
    /**
   * Enables the subscription.
   */ subscribe(callback = ()=>{}) {
        this.subscription.onError((e)=>callback('SUBSCRIPTION_ERROR', e)
        );
        this.subscription.onClose(()=>callback('CLOSED')
        );
        this.subscription.subscribe().receive('ok', ()=>callback('SUBSCRIBED')
        ).receive('error', (e)=>callback('SUBSCRIPTION_ERROR', e)
        ).receive('timeout', ()=>callback('RETRYING_AFTER_TIMEOUT')
        );
        return this.subscription;
    }
    constructor(socket, headers, schema, tableName){
        const chanParams = {};
        const topic = tableName === '*' ? `realtime:${schema}` : `realtime:${schema}:${tableName}`;
        const userToken = headers['Authorization'].split(' ')[1];
        if (userToken) {
            chanParams['user_token'] = userToken;
        }
        this.subscription = socket.channel(topic, chanParams);
    }
};
exports.SupabaseRealtimeClient = SupabaseRealtimeClient;

//# sourceMappingURL=SupabaseRealtimeClient.js.map