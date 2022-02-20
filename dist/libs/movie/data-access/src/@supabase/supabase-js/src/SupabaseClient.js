"use strict";
exports.default = void 0;
var swcHelpers = require("@swc/helpers");
var _constants = require("./lib/constants");
var _helpers = require("./lib/helpers");
var _supabaseAuthClient = require("./lib/SupabaseAuthClient");
var _supabaseQueryBuilder = require("./lib/SupabaseQueryBuilder");
var _storageJs = require("@supabase/storage-js");
var _postgrestJs = require("@supabase/postgrest-js");
var _realtimeJs = require("@supabase/realtime-js");
const DEFAULT_OPTIONS = {
    schema: 'public',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    multiTab: true,
    headers: _constants.DEFAULT_HEADERS
};
let SupabaseClient = class SupabaseClient {
    /**
   * Supabase Storage allows you to manage user-generated content, such as photos or videos.
   */ get storage() {
        return new _storageJs.SupabaseStorageClient(this.storageUrl, this._getAuthHeaders(), this.fetch);
    }
    /**
   * Perform a table operation.
   *
   * @param table The table name to operate on.
   */ from(table) {
        const url = `${this.restUrl}/${table}`;
        return new _supabaseQueryBuilder.SupabaseQueryBuilder(url, {
            headers: this._getAuthHeaders(),
            schema: this.schema,
            realtime: this.realtime,
            table,
            fetch: this.fetch
        });
    }
    /**
   * Perform a function call.
   *
   * @param fn  The function name to call.
   * @param params  The parameters to pass to the function call.
   * @param head   When set to true, no data will be returned.
   * @param count  Count algorithm to use to count rows in a table.
   *
   */ rpc(fn, params, { head =false , count =null  } = {}) {
        const rest = this._initPostgRESTClient();
        return rest.rpc(fn, params, {
            head,
            count
        });
    }
    /**
   * Closes and removes all subscriptions and returns a list of removed
   * subscriptions and their errors.
   */ async removeAllSubscriptions() {
        const allSubs = this.getSubscriptions().slice();
        const allSubPromises = allSubs.map((sub)=>this.removeSubscription(sub)
        );
        const allRemovedSubs = await Promise.all(allSubPromises);
        return allRemovedSubs.map(({ error  }, i)=>{
            return {
                data: {
                    subscription: allSubs[i]
                },
                error
            };
        });
    }
    /**
   * Closes and removes a subscription and returns the number of open subscriptions.
   *
   * @param subscription The subscription you want to close and remove.
   */ async removeSubscription(subscription) {
        const { error  } = await this._closeSubscription(subscription);
        const allSubs = this.getSubscriptions();
        const openSubCount = allSubs.filter((chan)=>chan.isJoined()
        ).length;
        if (allSubs.length === 0) await this.realtime.disconnect();
        return {
            data: {
                openSubscriptions: openSubCount
            },
            error
        };
    }
    async _closeSubscription(subscription) {
        let error = null;
        if (!subscription.isClosed()) {
            const { error: unsubError  } = await this._unsubscribeSubscription(subscription);
            error = unsubError;
        }
        this.realtime.remove(subscription);
        return {
            error
        };
    }
    _unsubscribeSubscription(subscription) {
        return new Promise((resolve)=>{
            subscription.unsubscribe().receive('ok', ()=>resolve({
                    error: null
                })
            ).receive('error', (error)=>resolve({
                    error
                })
            ).receive('timeout', ()=>resolve({
                    error: new Error('timed out')
                })
            );
        });
    }
    /**
   * Returns an array of all your subscriptions.
   */ getSubscriptions() {
        return this.realtime.channels;
    }
    _initSupabaseAuthClient({ autoRefreshToken , persistSession , detectSessionInUrl , localStorage , headers , fetch  }) {
        const authHeaders = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`
        };
        return new _supabaseAuthClient.SupabaseAuthClient({
            url: this.authUrl,
            headers: swcHelpers.objectSpread({}, headers, authHeaders),
            autoRefreshToken,
            persistSession,
            detectSessionInUrl,
            localStorage,
            fetch
        });
    }
    _initRealtimeClient(options) {
        return new _realtimeJs.RealtimeClient(this.realtimeUrl, swcHelpers.objectSpread({}, options, {
            params: swcHelpers.objectSpread({}, options === null || options === void 0 ? void 0 : options.params, {
                apikey: this.supabaseKey
            })
        }));
    }
    _initPostgRESTClient() {
        return new _postgrestJs.PostgrestClient(this.restUrl, {
            headers: this._getAuthHeaders(),
            schema: this.schema,
            fetch: this.fetch
        });
    }
    _getAuthHeaders() {
        var ref;
        const headers = this.headers;
        var ref1;
        const authBearer = (ref1 = (ref = this.auth.session()) === null || ref === void 0 ? void 0 : ref.access_token) !== null && ref1 !== void 0 ? ref1 : this.supabaseKey;
        headers['apikey'] = this.supabaseKey;
        headers['Authorization'] = `Bearer ${authBearer}`;
        return headers;
    }
    _listenForMultiTabEvents() {
        if (!this.multiTab || !(0, _helpers).isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
            return null;
        }
        try {
            return window === null || window === void 0 ? void 0 : window.addEventListener('storage', (e)=>{
                if (e.key === _constants.STORAGE_KEY) {
                    var ref, ref2;
                    const newSession = JSON.parse(String(e.newValue));
                    var ref3;
                    const accessToken = (ref3 = newSession === null || newSession === void 0 ? void 0 : (ref = newSession.currentSession) === null || ref === void 0 ? void 0 : ref.access_token) !== null && ref3 !== void 0 ? ref3 : undefined;
                    const previousAccessToken = (ref2 = this.auth.session()) === null || ref2 === void 0 ? void 0 : ref2.access_token;
                    if (!accessToken) {
                        this._handleTokenChanged('SIGNED_OUT', accessToken, 'STORAGE');
                    } else if (!previousAccessToken && accessToken) {
                        this._handleTokenChanged('SIGNED_IN', accessToken, 'STORAGE');
                    } else if (previousAccessToken !== accessToken) {
                        this._handleTokenChanged('TOKEN_REFRESHED', accessToken, 'STORAGE');
                    }
                }
            });
        } catch (error) {
            console.error('_listenForMultiTabEvents', error);
            return null;
        }
    }
    _listenForAuthEvents() {
        let { data  } = this.auth.onAuthStateChange((event, session)=>{
            this._handleTokenChanged(event, session === null || session === void 0 ? void 0 : session.access_token, 'CLIENT');
        });
        return data;
    }
    _handleTokenChanged(event, token, source) {
        if ((event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') && this.changedAccessToken !== token) {
            // Token has changed
            this.realtime.setAuth(token);
            // Ideally we should call this.auth.recoverSession() - need to make public
            // to trigger a "SIGNED_IN" event on this client.
            if (source == 'STORAGE') this.auth.setAuth(token);
            this.changedAccessToken = token;
        } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
            // Token is removed
            this.realtime.setAuth(this.supabaseKey);
            if (source == 'STORAGE') this.auth.signOut();
        }
    }
    /**
   * Create a new client for use in the browser.
   * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
   * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
   * @param options.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
   * @param options.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
   * @param options.persistSession Set to "true" if you want to automatically save the user session into local storage.
   * @param options.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
   * @param options.headers Any additional headers to send with each network request.
   * @param options.realtime Options passed along to realtime-js constructor.
   * @param options.multiTab Set to "false" if you want to disable multi-tab/window events.
   * @param options.fetch A custom fetch implementation.
   */ constructor(supabaseUrl, supabaseKey, options){
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        if (!supabaseUrl) throw new Error('supabaseUrl is required.');
        if (!supabaseKey) throw new Error('supabaseKey is required.');
        const _supabaseUrl = (0, _helpers).stripTrailingSlash(supabaseUrl);
        const settings = swcHelpers.objectSpread({}, DEFAULT_OPTIONS, options);
        this.restUrl = `${_supabaseUrl}/rest/v1`;
        this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace('http', 'ws');
        this.authUrl = `${_supabaseUrl}/auth/v1`;
        this.storageUrl = `${_supabaseUrl}/storage/v1`;
        this.schema = settings.schema;
        this.multiTab = settings.multiTab;
        this.fetch = settings.fetch;
        this.headers = swcHelpers.objectSpread({}, _constants.DEFAULT_HEADERS, options === null || options === void 0 ? void 0 : options.headers);
        this.auth = this._initSupabaseAuthClient(settings);
        this.realtime = this._initRealtimeClient(swcHelpers.objectSpread({
            headers: this.headers
        }, settings.realtime));
        this._listenForAuthEvents();
        this._listenForMultiTabEvents();
    // In the future we might allow the user to pass in a logger to receive these events.
    // this.realtime.onOpen(() => console.log('OPEN'))
    // this.realtime.onClose(() => console.log('CLOSED'))
    // this.realtime.onError((e: Error) => console.log('Socket error', e))
    }
};
exports.default = SupabaseClient;

//# sourceMappingURL=SupabaseClient.js.map