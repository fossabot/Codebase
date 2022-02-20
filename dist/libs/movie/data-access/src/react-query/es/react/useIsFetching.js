"use strict";
exports.useIsFetching = useIsFetching;
var _react = require("react");
var _notifyManager = require("../core/notifyManager");
var _utils = require("../core/utils");
var _queryClientProvider = require("./QueryClientProvider");
function useIsFetching(arg1, arg2) {
    var mountedRef = _react.default.useRef(false);
    var queryClient = (0, _queryClientProvider).useQueryClient();
    var _parseFilterArgs = (0, _utils).parseFilterArgs(arg1, arg2), filters = _parseFilterArgs[0];
    var _React$useState = _react.default.useState(queryClient.isFetching(filters)), isFetching = _React$useState[0], setIsFetching = _React$useState[1];
    var filtersRef = _react.default.useRef(filters);
    filtersRef.current = filters;
    var isFetchingRef = _react.default.useRef(isFetching);
    isFetchingRef.current = isFetching;
    _react.default.useEffect(function() {
        mountedRef.current = true;
        var unsubscribe = queryClient.getQueryCache().subscribe(_notifyManager.notifyManager.batchCalls(function() {
            if (mountedRef.current) {
                var newIsFetching = queryClient.isFetching(filtersRef.current);
                if (isFetchingRef.current !== newIsFetching) {
                    setIsFetching(newIsFetching);
                }
            }
        }));
        return function() {
            mountedRef.current = false;
            unsubscribe();
        };
    }, [
        queryClient
    ]);
    return isFetching;
}

//# sourceMappingURL=useIsFetching.js.map