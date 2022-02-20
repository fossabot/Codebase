"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TRANSPORTS = exports.CHANNEL_EVENTS = exports.CHANNEL_STATES = exports.SOCKET_STATES = exports.WS_CLOSE_NORMAL = exports.DEFAULT_TIMEOUT = exports.VSN = exports.DEFAULT_HEADERS = void 0;
const version_1 = require("./version");
exports.DEFAULT_HEADERS = {
    'X-Client-Info': `realtime-js/${version_1.version}`
};
exports.VSN = '1.0.0';
exports.DEFAULT_TIMEOUT = 10000;
exports.WS_CLOSE_NORMAL = 1000;
var SOCKET_STATES;
(function(SOCKET_STATES1) {
    SOCKET_STATES1[SOCKET_STATES1["connecting"] = 0] = "connecting";
    SOCKET_STATES1[SOCKET_STATES1["open"] = 1] = "open";
    SOCKET_STATES1[SOCKET_STATES1["closing"] = 2] = "closing";
    SOCKET_STATES1[SOCKET_STATES1["closed"] = 3] = "closed";
})(SOCKET_STATES = exports.SOCKET_STATES || (exports.SOCKET_STATES = {}));
var CHANNEL_STATES;
(function(CHANNEL_STATES1) {
    CHANNEL_STATES1["closed"] = "closed";
    CHANNEL_STATES1["errored"] = "errored";
    CHANNEL_STATES1["joined"] = "joined";
    CHANNEL_STATES1["joining"] = "joining";
    CHANNEL_STATES1["leaving"] = "leaving";
})(CHANNEL_STATES = exports.CHANNEL_STATES || (exports.CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
(function(CHANNEL_EVENTS1) {
    CHANNEL_EVENTS1["close"] = "phx_close";
    CHANNEL_EVENTS1["error"] = "phx_error";
    CHANNEL_EVENTS1["join"] = "phx_join";
    CHANNEL_EVENTS1["reply"] = "phx_reply";
    CHANNEL_EVENTS1["leave"] = "phx_leave";
    CHANNEL_EVENTS1["access_token"] = "access_token";
})(CHANNEL_EVENTS = exports.CHANNEL_EVENTS || (exports.CHANNEL_EVENTS = {}));
var TRANSPORTS;
(function(TRANSPORTS1) {
    TRANSPORTS1["websocket"] = "websocket";
})(TRANSPORTS = exports.TRANSPORTS || (exports.TRANSPORTS = {})); //# sourceMappingURL=constants.js.map

//# sourceMappingURL=constants.js.map