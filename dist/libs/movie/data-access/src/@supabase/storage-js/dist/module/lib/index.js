"use strict";
var _exportNames = {};
var _storageBucketApi = require("./StorageBucketApi");
Object.keys(_storageBucketApi).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _storageBucketApi[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _storageBucketApi[key];
        }
    });
});
var _storageFileApi = require("./StorageFileApi");
Object.keys(_storageFileApi).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _storageFileApi[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _storageFileApi[key];
        }
    });
});
var _types = require("./types");
Object.keys(_types).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _types[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _types[key];
        }
    });
});
var _constants = require("./constants");
Object.keys(_constants).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _constants[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _constants[key];
        }
    });
});

//# sourceMappingURL=index.js.map