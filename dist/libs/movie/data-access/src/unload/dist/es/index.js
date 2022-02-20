"use strict";
exports.add = add;
exports.runAll = runAll;
exports.removeAll = removeAll;
exports.getSize = getSize;
exports.default = void 0;
var _detectNode = require("detect-node");
var _browserJs = require("./browser.js");
var _nodeJs = require("./node.js");
var USE_METHOD = _detectNode.default ? _nodeJs.default : _browserJs.default;
var LISTENERS = new Set();
var startedListening = false;
function startListening() {
    if (startedListening) return;
    startedListening = true;
    USE_METHOD.add(runAll);
}
function add(fn) {
    startListening();
    if (typeof fn !== 'function') throw new Error('Listener is no function');
    LISTENERS.add(fn);
    var addReturn = {
        remove: function remove() {
            return LISTENERS["delete"](fn);
        },
        run: function run() {
            LISTENERS["delete"](fn);
            return fn();
        }
    };
    return addReturn;
}
function runAll() {
    var promises = [];
    LISTENERS.forEach(function(fn) {
        promises.push(fn());
        LISTENERS["delete"](fn);
    });
    return Promise.all(promises);
}
function removeAll() {
    LISTENERS.clear();
}
function getSize() {
    return LISTENERS.size;
}
var _default = {
    add: add,
    runAll: runAll,
    removeAll: removeAll,
    getSize: getSize
};
exports.default = _default;

//# sourceMappingURL=index.js.map