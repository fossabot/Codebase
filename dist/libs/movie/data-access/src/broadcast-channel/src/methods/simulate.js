"use strict";
exports.create = create;
exports.close = close;
exports.postMessage = postMessage;
exports.onMessage = onMessage;
exports.canBeUsed = canBeUsed;
exports.averageResponseTime = averageResponseTime;
exports.default = exports.type = exports.microSeconds = void 0;
var _util = require("../util");
const microSeconds = _util.microSeconds;
exports.microSeconds = microSeconds;
const type = 'simulate';
exports.type = type;
const SIMULATE_CHANNELS = new Set();
function create(channelName) {
    const state = {
        name: channelName,
        messagesCallback: null
    };
    SIMULATE_CHANNELS.add(state);
    return state;
}
function close(channelState) {
    SIMULATE_CHANNELS.delete(channelState);
}
function postMessage(channelState, messageJson) {
    return new Promise((res)=>setTimeout(()=>{
            const channelArray = Array.from(SIMULATE_CHANNELS);
            channelArray.filter((channel)=>channel.name === channelState.name
            ).filter((channel)=>channel !== channelState
            ).filter((channel)=>!!channel.messagesCallback
            ).forEach((channel)=>channel.messagesCallback(messageJson)
            );
            res();
        }, 5)
    );
}
function onMessage(channelState, fn) {
    channelState.messagesCallback = fn;
}
function canBeUsed() {
    return true;
}
function averageResponseTime() {
    return 5;
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

//# sourceMappingURL=simulate.js.map