"use strict";
exports.getLocalStorage = getLocalStorage;
exports.storageKey = storageKey;
exports.postMessage = postMessage;
exports.addStorageEventListener = addStorageEventListener;
exports.removeStorageEventListener = removeStorageEventListener;
exports.create = create;
exports.close = close;
exports.onMessage = onMessage;
exports.canBeUsed = canBeUsed;
exports.averageResponseTime = averageResponseTime;
exports.default = exports.type = exports.microSeconds = void 0;
var _obliviousSet = require("oblivious-set");
var _options = require("../options");
var _util = require("../util");
const microSeconds = _util.microSeconds;
exports.microSeconds = microSeconds;
const KEY_PREFIX = 'pubkey.broadcastChannel-';
const type = 'localstorage';
exports.type = type;
function getLocalStorage() {
    let localStorage;
    if (typeof window === 'undefined') return null;
    try {
        localStorage = window.localStorage;
        localStorage = window['ie8-eventlistener/storage'] || window.localStorage;
    } catch (e) {
    // New versions of Firefox throw a Security exception
    // if cookies are disabled. See
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1028153
    }
    return localStorage;
}
function storageKey(channelName) {
    return KEY_PREFIX + channelName;
}
function postMessage(channelState, messageJson) {
    return new Promise((res)=>{
        (0, _util).sleep().then(()=>{
            const key = storageKey(channelState.channelName);
            const writeObj = {
                token: (0, _util).randomToken(),
                time: new Date().getTime(),
                data: messageJson,
                uuid: channelState.uuid
            };
            const value = JSON.stringify(writeObj);
            getLocalStorage().setItem(key, value);
            /**
             * StorageEvent does not fire the 'storage' event
             * in the window that changes the state of the local storage.
             * So we fire it manually
             */ const ev = document.createEvent('Event');
            ev.initEvent('storage', true, true);
            ev.key = key;
            ev.newValue = value;
            window.dispatchEvent(ev);
            res();
        });
    });
}
function addStorageEventListener(channelName, fn) {
    const key = storageKey(channelName);
    const listener = (ev)=>{
        if (ev.key === key) {
            fn(JSON.parse(ev.newValue));
        }
    };
    window.addEventListener('storage', listener);
    return listener;
}
function removeStorageEventListener(listener) {
    window.removeEventListener('storage', listener);
}
function create(channelName, options) {
    options = (0, _options).fillOptionsWithDefaults(options);
    if (!canBeUsed()) {
        throw new Error('BroadcastChannel: localstorage cannot be used');
    }
    const uuid = (0, _util).randomToken();
    /**
     * eMIs
     * contains all messages that have been emitted before
     * @type {ObliviousSet}
     */ const eMIs = new _obliviousSet.ObliviousSet(options.localstorage.removeTimeout);
    const state = {
        channelName,
        uuid,
        eMIs
    };
    state.listener = addStorageEventListener(channelName, (msgObj)=>{
        if (!state.messagesCallback) return; // no listener
        if (msgObj.uuid === uuid) return; // own message
        if (!msgObj.token || eMIs.has(msgObj.token)) return; // already emitted
        if (msgObj.data.time && msgObj.data.time < state.messagesCallbackTime) return; // too old
        eMIs.add(msgObj.token);
        state.messagesCallback(msgObj.data);
    });
    return state;
}
function close(channelState) {
    removeStorageEventListener(channelState.listener);
}
function onMessage(channelState, fn, time) {
    channelState.messagesCallbackTime = time;
    channelState.messagesCallback = fn;
}
function canBeUsed() {
    if (_util.isNode) return false;
    const ls = getLocalStorage();
    if (!ls) return false;
    try {
        const key = '__broadcastchannel_check';
        ls.setItem(key, 'works');
        ls.removeItem(key);
    } catch (e) {
        // Safari 10 in private mode will not allow write access to local
        // storage and fail with a QuotaExceededError. See
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API#Private_Browsing_Incognito_modes
        return false;
    }
    return true;
}
function averageResponseTime() {
    const defaultTime = 120;
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
        // safari is much slower so this time is higher
        return defaultTime * 2;
    }
    return defaultTime;
}
var _default = {
    create,
    close,
    onMessage,
    postMessage,
    canBeUsed,
    type,
    averageResponseTime,
    microSeconds
};
exports.default = _default;

//# sourceMappingURL=localstorage.js.map