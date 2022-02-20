"use strict";
exports.InfiniteQueryObserver = void 0;
var _extends = require("@babel/runtime/helpers/esm/extends");
var _inheritsLoose = require("@babel/runtime/helpers/esm/inheritsLoose");
var _queryObserver = require("./queryObserver");
var _infiniteQueryBehavior = require("./infiniteQueryBehavior");
var InfiniteQueryObserver = /*#__PURE__*/ function(_QueryObserver) {
    (0, _inheritsLoose).default(InfiniteQueryObserver1, _QueryObserver);
    // Type override
    // Type override
    // Type override
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    function InfiniteQueryObserver1(client, options) {
        return _QueryObserver.call(this, client, options) || this;
    }
    var _proto = InfiniteQueryObserver1.prototype;
    _proto.bindMethods = function bindMethods() {
        _QueryObserver.prototype.bindMethods.call(this);
        this.fetchNextPage = this.fetchNextPage.bind(this);
        this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
    };
    _proto.setOptions = function setOptions(options, notifyOptions) {
        _QueryObserver.prototype.setOptions.call(this, (0, _extends).default({}, options, {
            behavior: (0, _infiniteQueryBehavior).infiniteQueryBehavior()
        }), notifyOptions);
    };
    _proto.getOptimisticResult = function getOptimisticResult(options) {
        options.behavior = (0, _infiniteQueryBehavior).infiniteQueryBehavior();
        return _QueryObserver.prototype.getOptimisticResult.call(this, options);
    };
    _proto.fetchNextPage = function fetchNextPage(options) {
        var _options$cancelRefetc;
        return this.fetch({
            // TODO consider removing `?? true` in future breaking change, to be consistent with `refetch` API (see https://github.com/tannerlinsley/react-query/issues/2617)
            cancelRefetch: (_options$cancelRefetc = options == null ? void 0 : options.cancelRefetch) != null ? _options$cancelRefetc : true,
            throwOnError: options == null ? void 0 : options.throwOnError,
            meta: {
                fetchMore: {
                    direction: 'forward',
                    pageParam: options == null ? void 0 : options.pageParam
                }
            }
        });
    };
    _proto.fetchPreviousPage = function fetchPreviousPage(options) {
        var _options$cancelRefetc2;
        return this.fetch({
            // TODO consider removing `?? true` in future breaking change, to be consistent with `refetch` API (see https://github.com/tannerlinsley/react-query/issues/2617)
            cancelRefetch: (_options$cancelRefetc2 = options == null ? void 0 : options.cancelRefetch) != null ? _options$cancelRefetc2 : true,
            throwOnError: options == null ? void 0 : options.throwOnError,
            meta: {
                fetchMore: {
                    direction: 'backward',
                    pageParam: options == null ? void 0 : options.pageParam
                }
            }
        });
    };
    _proto.createResult = function createResult(query, options) {
        var _state$data, _state$data2, _state$fetchMeta, _state$fetchMeta$fetc, _state$fetchMeta2, _state$fetchMeta2$fet;
        var state = query.state;
        var result = _QueryObserver.prototype.createResult.call(this, query, options);
        return (0, _extends).default({}, result, {
            fetchNextPage: this.fetchNextPage,
            fetchPreviousPage: this.fetchPreviousPage,
            hasNextPage: (0, _infiniteQueryBehavior).hasNextPage(options, (_state$data = state.data) == null ? void 0 : _state$data.pages),
            hasPreviousPage: (0, _infiniteQueryBehavior).hasPreviousPage(options, (_state$data2 = state.data) == null ? void 0 : _state$data2.pages),
            isFetchingNextPage: state.isFetching && ((_state$fetchMeta = state.fetchMeta) == null ? void 0 : (_state$fetchMeta$fetc = _state$fetchMeta.fetchMore) == null ? void 0 : _state$fetchMeta$fetc.direction) === 'forward',
            isFetchingPreviousPage: state.isFetching && ((_state$fetchMeta2 = state.fetchMeta) == null ? void 0 : (_state$fetchMeta2$fet = _state$fetchMeta2.fetchMore) == null ? void 0 : _state$fetchMeta2$fet.direction) === 'backward'
        });
    };
    return InfiniteQueryObserver1;
}(_queryObserver.QueryObserver);
exports.InfiniteQueryObserver = InfiniteQueryObserver;

//# sourceMappingURL=infiniteQueryObserver.js.map