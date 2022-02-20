"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SupabaseStorageClient = void 0;
const lib_1 = require("./lib");
let SupabaseStorageClient = class SupabaseStorageClient extends lib_1.StorageBucketApi {
    /**
     * Perform file operation in a bucket.
     *
     * @param id The bucket id to operate on.
     */ from(id) {
        return new lib_1.StorageFileApi(this.url, this.headers, id, this.fetch);
    }
    constructor(url, headers = {}, fetch){
        super(url, headers, fetch);
    }
};
exports.SupabaseStorageClient = SupabaseStorageClient; //# sourceMappingURL=SupabaseStorageClient.js.map

//# sourceMappingURL=SupabaseStorageClient.js.map