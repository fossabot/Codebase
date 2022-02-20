"use strict";
exports.TRANSPORTS = exports.CHANNEL_EVENTS = exports.CHANNEL_STATES = exports.SOCKET_STATES = exports.WS_CLOSE_NORMAL = exports.DEFAULT_TIMEOUT = exports.VSN = exports.DEFAULT_HEADERS = void 0;
var _version = require("./version");
const DEFAULT_HEADERS = {
    'X-Client-Info': `realtime-js/${_version.version}`
};
exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
const VSN = '1.0.0';
exports.VSN = VSN;
const DEFAULT_TIMEOUT = 10000;
exports.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
const WS_CLOSE_NORMAL = 1000;
exports.WS_CLOSE_NORMAL = WS_CLOSE_NORMAL;
var SOCKET_STATES;
exports.SOCKET_STATES = SOCKET_STATES;
(function(SOCKET_STATES) {
    SOCKET_STATES[SOCKET_STATES["connecting"] = 0] = "connecting";
    SOCKET_STATES[SOCKET_STATES["open"] = 1] = "open";
    SOCKET_STATES[SOCKET_STATES["closing"] = 2] = "closing";
    SOCKET_STATES[SOCKET_STATES["closed"] = 3] = "closed";
})(SOCKET_STATES || (exports.SOCKET_STATES = SOCKET_STATES = {}));
var CHANNEL_STATES;
exports.CHANNEL_STATES = CHANNEL_STATES;
(function(CHANNEL_STATES) {
    CHANNEL_STATES["closed"] = "closed";
    CHANNEL_STATES["errored"] = "errored";
    CHANNEL_STATES["joined"] = "joined";
    CHANNEL_STATES["joining"] = "joining";
    CHANNEL_STATES["leaving"] = "leaving";
})(CHANNEL_STATES || (exports.CHANNEL_STATES = CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
exports.CHANNEL_EVENTS = CHANNEL_EVENTS;
(function(CHANNEL_EVENTS) {
    CHANNEL_EVENTS["close"] = 'phx_close';
    CHANNEL_EVENTS["error"] = 'phx_error';
    CHANNEL_EVENTS["join"] = 'phx_join';
    CHANNEL_EVENTS["reply"] = 'phx_reply';
    CHANNEL_EVENTS["leave"] = 'phx_leave';
    CHANNEL_EVENTS["access_token"] = 'access_token';
})(CHANNEL_EVENTS || (exports.CHANNEL_EVENTS = CHANNEL_EVENTS = {}));
var TRANSPORTS;
exports.TRANSPORTS = TRANSPORTS;
(function(TRANSPORTS) {
    TRANSPORTS["websocket"] = "websocket";
})(TRANSPORTS || (exports.TRANSPORTS = TRANSPORTS = {}));

//# sourceMappingURL=constants.js.map