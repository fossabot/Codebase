"use strict";
Object.defineProperty(exports, "CancelledError", {
    enumerable: true,
    get: function() {
        return _retryer.CancelledError;
    }
});
Object.defineProperty(exports, "QueryCache", {
    enumerable: true,
    get: function() {
        return _queryCache.QueryCache;
    }
});
Object.defineProperty(exports, "QueryClient", {
    enumerable: true,
    get: function() {
        return _queryClient.QueryClient;
    }
});
Object.defineProperty(exports, "QueryObserver", {
    enumerable: true,
    get: function() {
        return _queryObserver.QueryObserver;
    }
});
Object.defineProperty(exports, "QueriesObserver", {
    enumerable: true,
    get: function() {
        return _queriesObserver.QueriesObserver;
    }
});
Object.defineProperty(exports, "InfiniteQueryObserver", {
    enumerable: true,
    get: function() {
        return _infiniteQueryObserver.InfiniteQueryObserver;
    }
});
Object.defineProperty(exports, "MutationCache", {
    enumerable: true,
    get: function() {
        return _mutationCache.MutationCache;
    }
});
Object.defineProperty(exports, "MutationObserver", {
    enumerable: true,
    get: function() {
        return _mutationObserver.MutationObserver;
    }
});
Object.defineProperty(exports, "setLogger", {
    enumerable: true,
    get: function() {
        return _logger.setLogger;
    }
});
Object.defineProperty(exports, "notifyManager", {
    enumerable: true,
    get: function() {
        return _notifyManager.notifyManager;
    }
});
Object.defineProperty(exports, "focusManager", {
    enumerable: true,
    get: function() {
        return _focusManager.focusManager;
    }
});
Object.defineProperty(exports, "onlineManager", {
    enumerable: true,
    get: function() {
        return _onlineManager.onlineManager;
    }
});
Object.defineProperty(exports, "hashQueryKey", {
    enumerable: true,
    get: function() {
        return _utils.hashQueryKey;
    }
});
Object.defineProperty(exports, "isError", {
    enumerable: true,
    get: function() {
        return _utils.isError;
    }
});
Object.defineProperty(exports, "isCancelledError", {
    enumerable: true,
    get: function() {
        return _retryer.isCancelledError;
    }
});
Object.defineProperty(exports, "dehydrate", {
    enumerable: true,
    get: function() {
        return _hydration.dehydrate;
    }
});
Object.defineProperty(exports, "hydrate", {
    enumerable: true,
    get: function() {
        return _hydration.hydrate;
    }
});
var _exportNames = {
    CancelledError: true,
    QueryCache: true,
    QueryClient: true,
    QueryObserver: true,
    QueriesObserver: true,
    InfiniteQueryObserver: true,
    MutationCache: true,
    MutationObserver: true,
    setLogger: true,
    notifyManager: true,
    focusManager: true,
    onlineManager: true,
    hashQueryKey: true,
    isError: true,
    isCancelledError: true,
    dehydrate: true,
    hydrate: true,
    Query: true,
    Mutation: true,
    Logger: true,
    DehydrateOptions: true,
    DehydratedState: true,
    HydrateOptions: true,
    ShouldDehydrateMutationFunction: true,
    ShouldDehydrateQueryFunction: true
};
Object.defineProperty(exports, "Query", {
    enumerable: true,
    get: function() {
        return _query.Query;
    }
});
Object.defineProperty(exports, "Mutation", {
    enumerable: true,
    get: function() {
        return _mutation.Mutation;
    }
});
Object.defineProperty(exports, "Logger", {
    enumerable: true,
    get: function() {
        return _logger.Logger;
    }
});
Object.defineProperty(exports, "DehydrateOptions", {
    enumerable: true,
    get: function() {
        return _hydration.DehydrateOptions;
    }
});
Object.defineProperty(exports, "DehydratedState", {
    enumerable: true,
    get: function() {
        return _hydration.DehydratedState;
    }
});
Object.defineProperty(exports, "HydrateOptions", {
    enumerable: true,
    get: function() {
        return _hydration.HydrateOptions;
    }
});
Object.defineProperty(exports, "ShouldDehydrateMutationFunction", {
    enumerable: true,
    get: function() {
        return _hydration.ShouldDehydrateMutationFunction;
    }
});
Object.defineProperty(exports, "ShouldDehydrateQueryFunction", {
    enumerable: true,
    get: function() {
        return _hydration.ShouldDehydrateQueryFunction;
    }
});
var _retryer = require("./retryer");
var _queryCache = require("./queryCache");
var _queryClient = require("./queryClient");
var _queryObserver = require("./queryObserver");
var _queriesObserver = require("./queriesObserver");
var _infiniteQueryObserver = require("./infiniteQueryObserver");
var _mutationCache = require("./mutationCache");
var _mutationObserver = require("./mutationObserver");
var _logger = require("./logger");
var _notifyManager = require("./notifyManager");
var _focusManager = require("./focusManager");
var _onlineManager = require("./onlineManager");
var _utils = require("./utils");
var _hydration = require("./hydration");
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
var _query = require("./query");
var _mutation = require("./mutation");

//# sourceMappingURL=index.d.js.map