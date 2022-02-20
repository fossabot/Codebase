"use strict";
exports.default = void 0;
var _types = require("./types");
var _postgrestFilterBuilder = require("./PostgrestFilterBuilder");
let PostgrestRpcBuilder = class PostgrestRpcBuilder extends _types.PostgrestBuilder {
    /**
     * Perform a function call.
     */ rpc(params, { head =false , count =null ,  } = {}) {
        if (head) {
            this.method = 'HEAD';
            if (params) {
                Object.entries(params).forEach(([name, value])=>{
                    this.url.searchParams.append(name, value);
                });
            }
        } else {
            this.method = 'POST';
            this.body = params;
        }
        if (count) {
            if (this.headers['Prefer'] !== undefined) this.headers['Prefer'] += `,count=${count}`;
            else this.headers['Prefer'] = `count=${count}`;
        }
        return new _postgrestFilterBuilder.default(this);
    }
    constructor(url, { headers ={} , schema , fetch ,  } = {}){
        super({
            fetch
        });
        this.url = new URL(url);
        this.headers = Object.assign({}, headers);
        this.schema = schema;
    }
} //# sourceMappingURL=PostgrestRpcBuilder.js.map
;
exports.default = PostgrestRpcBuilder;

//# sourceMappingURL=PostgrestRpcBuilder.js.map