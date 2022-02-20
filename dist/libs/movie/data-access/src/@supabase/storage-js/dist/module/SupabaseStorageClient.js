"use strict";
var _lib = require("./lib");
let SupabaseStorageClient = class SupabaseStorageClient extends _lib.StorageBucketApi {
    /**
     * Perform file operation in a bucket.
     *
     * @param id The bucket id to operate on.
     */ from(id) {
        return new _lib.StorageFileApi(this.url, this.headers, id, this.fetch);
    }
    constructor(url, headers = {}, fetch){
        super(url, headers, fetch);
    }
} //# sourceMappingURL=SupabaseStorageClient.js.map
;
exports.SupabaseStorageClient = SupabaseStorageClient;

//# sourceMappingURL=SupabaseStorageClient.js.map