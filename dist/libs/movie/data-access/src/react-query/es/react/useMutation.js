"use strict";
exports.useMutation = useMutation;
var _extends = require("@babel/runtime/helpers/esm/extends");
var _react = require("react");
var _notifyManager = require("../core/notifyManager");
var _utils = require("../core/utils");
var _mutationObserver = require("../core/mutationObserver");
var _queryClientProvider = require("./QueryClientProvider");
var _utils1 = require("./utils");
function useMutation(arg1, arg2, arg3) {
    var mountedRef = _react.default.useRef(false);
    var _React$useState = _react.default.useState(0), forceUpdate = _React$useState[1];
    var options = (0, _utils).parseMutationArgs(arg1, arg2, arg3);
    var queryClient = (0, _queryClientProvider).useQueryClient();
    var obsRef = _react.default.useRef();
    if (!obsRef.current) {
        obsRef.current = new _mutationObserver.MutationObserver(queryClient, options);
    } else {
        obsRef.current.setOptions(options);
    }
    var currentResult = obsRef.current.getCurrentResult();
    _react.default.useEffect(function() {
        mountedRef.current = true;
        var unsubscribe = obsRef.current.subscribe(_notifyManager.notifyManager.batchCalls(function() {
            if (mountedRef.current) {
                forceUpdate(function(x) {
                    return x + 1;
                });
            }
        }));
        return function() {
            mountedRef.current = false;
            unsubscribe();
        };
    }, []);
    var mutate = _react.default.useCallback(function(variables, mutateOptions) {
        obsRef.current.mutate(variables, mutateOptions).catch(_utils.noop);
    }, []);
    if (currentResult.error && (0, _utils1).shouldThrowError(undefined, obsRef.current.options.useErrorBoundary, currentResult.error)) {
        throw currentResult.error;
    }
    return (0, _extends).default({}, currentResult, {
        mutate: mutate,
        mutateAsync: currentResult.mutate
    });
}

//# sourceMappingURL=useMutation.js.map