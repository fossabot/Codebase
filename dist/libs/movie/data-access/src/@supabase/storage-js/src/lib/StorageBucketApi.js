"use strict";
var swcHelpers = require("@swc/helpers");
var _fetch = require("./fetch");
var _constants = require("./constants");
let StorageBucketApi = class StorageBucketApi {
    /**
   * Retrieves the details of all Storage buckets within an existing product.
   */ async listBuckets() {
        try {
            const data = await (0, _fetch).get(this.fetch, `${this.url}/bucket`, {
                headers: this.headers
            });
            return {
                data,
                error: null
            };
        } catch (error) {
            return {
                data: null,
                error
            };
        }
    }
    /**
   * Retrieves the details of an existing Storage bucket.
   *
   * @param id The unique identifier of the bucket you would like to retrieve.
   */ async getBucket(id) {
        try {
            const data = await (0, _fetch).get(this.fetch, `${this.url}/bucket/${id}`, {
                headers: this.headers
            });
            return {
                data,
                error: null
            };
        } catch (error) {
            return {
                data: null,
                error
            };
        }
    }
    /**
   * Creates a new Storage bucket
   *
   * @param id A unique identifier for the bucket you are creating.
   * @returns newly created bucket id
   */ async createBucket(id, options = {
        public: false
    }) {
        try {
            const data = await (0, _fetch).post(this.fetch, `${this.url}/bucket`, {
                id,
                name: id,
                public: options.public
            }, {
                headers: this.headers
            });
            return {
                data: data.name,
                error: null
            };
        } catch (error) {
            return {
                data: null,
                error
            };
        }
    }
    /**
   * Updates a new Storage bucket
   *
   * @param id A unique identifier for the bucket you are creating.
   */ async updateBucket(id, options) {
        try {
            const data = await (0, _fetch).put(this.fetch, `${this.url}/bucket/${id}`, {
                id,
                name: id,
                public: options.public
            }, {
                headers: this.headers
            });
            return {
                data,
                error: null
            };
        } catch (error) {
            return {
                data: null,
                error
            };
        }
    }
    /**
   * Removes all objects inside a single bucket.
   *
   * @param id The unique identifier of the bucket you would like to empty.
   */ async emptyBucket(id) {
        try {
            const data = await (0, _fetch).post(this.fetch, `${this.url}/bucket/${id}/empty`, {}, {
                headers: this.headers
            });
            return {
                data,
                error: null
            };
        } catch (error) {
            return {
                data: null,
                error
            };
        }
    }
    /**
   * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
   * You must first `empty()` the bucket.
   *
   * @param id The unique identifier of the bucket you would like to delete.
   */ async deleteBucket(id) {
        try {
            const data = await (0, _fetch).remove(this.fetch, `${this.url}/bucket/${id}`, {}, {
                headers: this.headers
            });
            return {
                data,
                error: null
            };
        } catch (error) {
            return {
                data: null,
                error
            };
        }
    }
    constructor(url, headers = {}, fetch){
        this.url = url;
        this.headers = swcHelpers.extends({}, _constants.DEFAULT_HEADERS, headers);
        this.fetch = fetch;
    }
};
exports.StorageBucketApi = StorageBucketApi;

//# sourceMappingURL=StorageBucketApi.js.map