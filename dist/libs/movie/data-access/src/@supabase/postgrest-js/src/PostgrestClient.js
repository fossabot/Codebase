"use strict";
exports.default = void 0;
var swcHelpers = require("@swc/helpers");
var _postgrestQueryBuilder = require("./lib/PostgrestQueryBuilder");
var _postgrestRpcBuilder = require("./lib/PostgrestRpcBuilder");
var _constants = require("./lib/constants");
let PostgrestClient = class PostgrestClient {
    /**
   * Authenticates the request with JWT.
   *
   * @param token  The JWT token to use.
   */ auth(token) {
        this.headers['Authorization'] = `Bearer ${token}`;
        return this;
    }
    /**
   * Perform a table operation.
   *
   * @param table  The table name to operate on.
   */ from(table) {
        const url = `${this.url}/${table}`;
        return new _postgrestQueryBuilder.default(url, {
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch
        });
    }
    /**
   * Perform a function call.
   *
   * @param fn  The function name to call.
   * @param params  The parameters to pass to the function call.
   * @param head  When set to true, no data will be returned.
   * @param count  Count algorithm to use to count rows in a table.
   */ rpc(fn, params, { head =false , count =null  } = {}) {
        const url = `${this.url}/rpc/${fn}`;
        return new _postgrestRpcBuilder.default(url, {
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch
        }).rpc(params, {
            head,
            count
        });
    }
    /**
   * Creates a PostgREST client.
   *
   * @param url  URL of the PostgREST endpoint.
   * @param headers  Custom headers.
   * @param schema  Postgres schema to switch to.
   */ constructor(url, { headers ={} , schema , fetch  } = {}){
        this.url = url;
        this.headers = swcHelpers.extends({}, _constants.DEFAULT_HEADERS, headers);
        this.schema = schema;
        this.fetch = fetch;
    }
};
exports.default = PostgrestClient;

//# sourceMappingURL=PostgrestClient.js.map