"use strict";
var __importDefault = (void 0) && (void 0).__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const types_1 = require("./types");
const PostgrestFilterBuilder_1 = __importDefault(require("./PostgrestFilterBuilder"));
let PostgrestRpcBuilder = class PostgrestRpcBuilder extends types_1.PostgrestBuilder {
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
        return new PostgrestFilterBuilder_1.default(this);
    }
    constructor(url, { headers ={} , schema , fetch ,  } = {}){
        super({
            fetch
        });
        this.url = new URL(url);
        this.headers = Object.assign({}, headers);
        this.schema = schema;
    }
};
exports.default = PostgrestRpcBuilder; //# sourceMappingURL=PostgrestRpcBuilder.js.map

//# sourceMappingURL=PostgrestRpcBuilder.js.map