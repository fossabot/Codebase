"use strict";
exports.isPromise = isPromise;
exports.sleep = sleep;
exports.randomInt = randomInt;
exports.randomToken = randomToken;
exports.microSeconds = microSeconds;
exports.isNode = void 0;
function isPromise(obj) {
    if (obj && typeof obj.then === 'function') {
        return true;
    } else {
        return false;
    }
}
function sleep(time) {
    if (!time) time = 0;
    return new Promise((res)=>setTimeout(res, time)
    );
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomToken() {
    return Math.random().toString(36).substring(2);
}
let lastMs = 0;
let additional = 0;
function microSeconds() {
    const ms = new Date().getTime();
    if (ms === lastMs) {
        additional++;
        return ms * 1000 + additional;
    } else {
        lastMs = ms;
        additional = 0;
        return ms * 1000;
    }
}
const isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
exports.isNode = isNode;

//# sourceMappingURL=util.js.map