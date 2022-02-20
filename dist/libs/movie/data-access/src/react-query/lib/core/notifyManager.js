"use strict";
exports.__esModule = true;
exports.notifyManager = exports.NotifyManager = void 0;
var _utils = require("./utils");
// CLASS
var NotifyManager = /*#__PURE__*/ function() {
    function NotifyManager1() {
        this.queue = [];
        this.transactions = 0;
        this.notifyFn = function(callback) {
            callback();
        };
        this.batchNotifyFn = function(callback) {
            callback();
        };
    }
    var _proto = NotifyManager1.prototype;
    _proto.batch = function batch(callback) {
        var result;
        this.transactions++;
        try {
            result = callback();
        } finally{
            this.transactions--;
            if (!this.transactions) {
                this.flush();
            }
        }
        return result;
    };
    _proto.schedule = function schedule(callback) {
        var _this = this;
        if (this.transactions) {
            this.queue.push(callback);
        } else {
            (0, _utils.scheduleMicrotask)(function() {
                _this.notifyFn(callback);
            });
        }
    };
    _proto.batchCalls = function batchCalls(callback) {
        var _this2 = this;
        return function() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            _this2.schedule(function() {
                callback.apply(void 0, args);
            });
        };
    };
    _proto.flush = function flush() {
        var _this3 = this;
        var queue = this.queue;
        this.queue = [];
        if (queue.length) {
            (0, _utils.scheduleMicrotask)(function() {
                _this3.batchNotifyFn(function() {
                    queue.forEach(function(callback) {
                        _this3.notifyFn(callback);
                    });
                });
            });
        }
    };
    _proto.setNotifyFunction = function setNotifyFunction(fn) {
        this.notifyFn = fn;
    };
    _proto.setBatchNotifyFunction = function setBatchNotifyFunction(fn) {
        this.batchNotifyFn = fn;
    };
    return NotifyManager1;
}(); // SINGLETON
exports.NotifyManager = NotifyManager;
var notifyManager = new NotifyManager();
exports.notifyManager = notifyManager;

//# sourceMappingURL=notifyManager.js.map