"use strict";
Object.defineProperty(exports, "QueryClientProvider", {
    enumerable: true,
    get: function() {
        return _queryClientProvider.QueryClientProvider;
    }
});
Object.defineProperty(exports, "useQueryClient", {
    enumerable: true,
    get: function() {
        return _queryClientProvider.useQueryClient;
    }
});
Object.defineProperty(exports, "QueryErrorResetBoundary", {
    enumerable: true,
    get: function() {
        return _queryErrorResetBoundary.QueryErrorResetBoundary;
    }
});
Object.defineProperty(exports, "useQueryErrorResetBoundary", {
    enumerable: true,
    get: function() {
        return _queryErrorResetBoundary.useQueryErrorResetBoundary;
    }
});
Object.defineProperty(exports, "useIsFetching", {
    enumerable: true,
    get: function() {
        return _useIsFetching.useIsFetching;
    }
});
Object.defineProperty(exports, "useIsMutating", {
    enumerable: true,
    get: function() {
        return _useIsMutating.useIsMutating;
    }
});
Object.defineProperty(exports, "useMutation", {
    enumerable: true,
    get: function() {
        return _useMutation.useMutation;
    }
});
Object.defineProperty(exports, "useQuery", {
    enumerable: true,
    get: function() {
        return _useQuery.useQuery;
    }
});
Object.defineProperty(exports, "useQueries", {
    enumerable: true,
    get: function() {
        return _useQueries.useQueries;
    }
});
Object.defineProperty(exports, "useInfiniteQuery", {
    enumerable: true,
    get: function() {
        return _useInfiniteQuery.useInfiniteQuery;
    }
});
Object.defineProperty(exports, "useHydrate", {
    enumerable: true,
    get: function() {
        return _hydrate.useHydrate;
    }
});
Object.defineProperty(exports, "Hydrate", {
    enumerable: true,
    get: function() {
        return _hydrate.Hydrate;
    }
});
var _exportNames = {
    QueryClientProvider: true,
    useQueryClient: true,
    QueryErrorResetBoundary: true,
    useQueryErrorResetBoundary: true,
    useIsFetching: true,
    useIsMutating: true,
    useMutation: true,
    useQuery: true,
    useQueries: true,
    useInfiniteQuery: true,
    useHydrate: true,
    Hydrate: true,
    QueryClientProviderProps: true,
    QueryErrorResetBoundaryProps: true,
    HydrateProps: true,
    QueriesOptions: true,
    QueriesResults: true
};
Object.defineProperty(exports, "QueryClientProviderProps", {
    enumerable: true,
    get: function() {
        return _queryClientProvider.QueryClientProviderProps;
    }
});
Object.defineProperty(exports, "QueryErrorResetBoundaryProps", {
    enumerable: true,
    get: function() {
        return _queryErrorResetBoundary.QueryErrorResetBoundaryProps;
    }
});
Object.defineProperty(exports, "HydrateProps", {
    enumerable: true,
    get: function() {
        return _hydrate.HydrateProps;
    }
});
Object.defineProperty(exports, "QueriesOptions", {
    enumerable: true,
    get: function() {
        return _useQueries.QueriesOptions;
    }
});
Object.defineProperty(exports, "QueriesResults", {
    enumerable: true,
    get: function() {
        return _useQueries.QueriesResults;
    }
});
require("./setBatchUpdatesFn");
require("./setLogger");
var _queryClientProvider = require("./QueryClientProvider");
var _queryErrorResetBoundary = require("./QueryErrorResetBoundary");
var _useIsFetching = require("./useIsFetching");
var _useIsMutating = require("./useIsMutating");
var _useMutation = require("./useMutation");
var _useQuery = require("./useQuery");
var _useQueries = require("./useQueries");
var _useInfiniteQuery = require("./useInfiniteQuery");
var _hydrate = require("./Hydrate");
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

//# sourceMappingURL=index.d.js.map