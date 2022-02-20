"use strict";
exports.default = void 0;
/* global WorkerGlobalScope */ function add(fn) {
    if (typeof WorkerGlobalScope === 'function' && self instanceof WorkerGlobalScope) {} else {
        /**
     * if we are on react-native, there is no window.addEventListener
     * @link https://github.com/pubkey/unload/issues/6
     */ if (typeof window.addEventListener !== 'function') return;
        /**
     * for normal browser-windows, we use the beforeunload-event
     */ window.addEventListener('beforeunload', function() {
            fn();
        }, true);
        /**
     * for iframes, we have to use the unload-event
     * @link https://stackoverflow.com/q/47533670/3443137
     */ window.addEventListener('unload', function() {
            fn();
        }, true);
    }
/**
   * TODO add fallback for safari-mobile
   * @link https://stackoverflow.com/a/26193516/3443137
   */ }
var _default = {
    add: add
};
exports.default = _default;

//# sourceMappingURL=browser.js.map