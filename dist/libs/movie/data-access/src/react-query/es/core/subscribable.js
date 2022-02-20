"use strict";
exports.Subscribable = void 0;
var Subscribable = /*#__PURE__*/ function() {
    function Subscribable1() {
        this.listeners = [];
    }
    var _proto = Subscribable1.prototype;
    _proto.subscribe = function subscribe(listener) {
        var _this = this;
        var callback = listener || function() {
            return undefined;
        };
        this.listeners.push(callback);
        this.onSubscribe();
        return function() {
            _this.listeners = _this.listeners.filter(function(x) {
                return x !== callback;
            });
            _this.onUnsubscribe();
        };
    };
    _proto.hasListeners = function hasListeners() {
        return this.listeners.length > 0;
    };
    _proto.onSubscribe = function onSubscribe() {};
    _proto.onUnsubscribe = function onUnsubscribe() {};
    return Subscribable1;
}();
exports.Subscribable = Subscribable;

//# sourceMappingURL=subscribable.js.map