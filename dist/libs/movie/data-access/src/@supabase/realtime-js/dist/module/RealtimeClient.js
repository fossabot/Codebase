"use strict";
exports.default = void 0;
var _constants = require("./lib/constants");
var _timer = require("./lib/timer");
var _realtimeSubscription = require("./RealtimeSubscription");
var _websocket = require("websocket");
var _serializer = require("./lib/serializer");
var __awaiter = (void 0) && (void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const noop = ()=>{};
let RealtimeClient = class RealtimeClient {
    /**
     * Connects the socket.
     */ connect() {
        if (this.conn) {
            return;
        }
        this.conn = new this.transport(this.endPointURL(), [], null, this.headers);
        if (this.conn) {
            // this.conn.timeout = this.longpollerTimeout // TYPE ERROR
            this.conn.binaryType = 'arraybuffer';
            this.conn.onopen = ()=>this._onConnOpen()
            ;
            this.conn.onerror = (error)=>this._onConnError(error)
            ;
            this.conn.onmessage = (event)=>this.onConnMessage(event)
            ;
            this.conn.onclose = (event)=>this._onConnClose(event)
            ;
        }
    }
    /**
     * Disconnects the socket.
     *
     * @param code A numeric status code to send on disconnect.
     * @param reason A custom reason for the disconnect.
     */ disconnect(code, reason) {
        return new Promise((resolve, _reject)=>{
            try {
                if (this.conn) {
                    this.conn.onclose = function() {}; // noop
                    if (code) {
                        this.conn.close(code, reason || '');
                    } else {
                        this.conn.close();
                    }
                    this.conn = null;
                    // remove open handles
                    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
                    this.reconnectTimer.reset();
                }
                resolve({
                    error: null,
                    data: true
                });
            } catch (error) {
                resolve({
                    error: error,
                    data: false
                });
            }
        });
    }
    /**
     * Logs the message. Override `this.logger` for specialized logging.
     */ log(kind, msg, data) {
        this.logger(kind, msg, data);
    }
    /**
     * Registers a callback for connection state change event.
     * @param callback A function to be called when the event occurs.
     *
     * @example
     *    socket.onOpen(() => console.log("Socket opened."))
     */ onOpen(callback) {
        this.stateChangeCallbacks.open.push(callback);
    }
    /**
     * Registers a callbacks for connection state change events.
     * @param callback A function to be called when the event occurs.
     *
     * @example
     *    socket.onOpen(() => console.log("Socket closed."))
     */ onClose(callback) {
        this.stateChangeCallbacks.close.push(callback);
    }
    /**
     * Registers a callback for connection state change events.
     * @param callback A function to be called when the event occurs.
     *
     * @example
     *    socket.onOpen((error) => console.log("An error occurred"))
     */ onError(callback) {
        this.stateChangeCallbacks.error.push(callback);
    }
    /**
     * Calls a function any time a message is received.
     * @param callback A function to be called when the event occurs.
     *
     * @example
     *    socket.onMessage((message) => console.log(message))
     */ onMessage(callback) {
        this.stateChangeCallbacks.message.push(callback);
    }
    /**
     * Returns the current state of the socket.
     */ connectionState() {
        switch(this.conn && this.conn.readyState){
            case _constants.SOCKET_STATES.connecting:
                return 'connecting';
            case _constants.SOCKET_STATES.open:
                return 'open';
            case _constants.SOCKET_STATES.closing:
                return 'closing';
            default:
                return 'closed';
        }
    }
    /**
     * Retuns `true` is the connection is open.
     */ isConnected() {
        return this.connectionState() === 'open';
    }
    /**
     * Removes a subscription from the socket.
     *
     * @param channel An open subscription.
     */ remove(channel) {
        this.channels = this.channels.filter((c)=>c.joinRef() !== channel.joinRef()
        );
    }
    channel(topic, chanParams = {}) {
        let chan = new _realtimeSubscription.default(topic, chanParams, this);
        this.channels.push(chan);
        return chan;
    }
    push(data) {
        let { topic , event , payload , ref  } = data;
        let callback = ()=>{
            this.encode(data, (result)=>{
                var _a;
                (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
            });
        };
        this.log('push', `${topic} ${event} (${ref})`, payload);
        if (this.isConnected()) {
            callback();
        } else {
            this.sendBuffer.push(callback);
        }
    }
    onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg)=>{
            let { topic , event , payload , ref  } = msg;
            if (ref && ref === this.pendingHeartbeatRef) {
                this.pendingHeartbeatRef = null;
            } else if (event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
                this._resetHeartbeat();
            }
            this.log('receive', `${payload.status || ''} ${topic} ${event} ${ref && '(' + ref + ')' || ''}`, payload);
            this.channels.filter((channel)=>channel.isMember(topic)
            ).forEach((channel)=>channel.trigger(event, payload, ref)
            );
            this.stateChangeCallbacks.message.forEach((callback)=>callback(msg)
            );
        });
    }
    /**
     * Returns the URL of the websocket.
     */ endPointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, {
            vsn: _constants.VSN
        }));
    }
    /**
     * Return the next message ref, accounting for overflows
     */ makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) {
            this.ref = 0;
        } else {
            this.ref = newRef;
        }
        return this.ref.toString();
    }
    /**
     * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
     *
     * @param token A JWT string.
     */ setAuth(token) {
        this.accessToken = token;
        try {
            this.channels.forEach((channel)=>{
                token && channel.updateJoinPayload({
                    user_token: token
                });
                if (channel.joinedOnce && channel.isJoined()) {
                    channel.push(_constants.CHANNEL_EVENTS.access_token, {
                        access_token: token
                    });
                }
            });
        } catch (error) {
            console.log('setAuth error', error);
        }
    }
    leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c)=>c.topic === topic && (c.isJoined() || c.isJoining())
        );
        if (dupChannel) {
            this.log('transport', `leaving duplicate topic "${topic}"`);
            dupChannel.unsubscribe();
        }
    }
    _onConnOpen() {
        this.log('transport', `connected to ${this.endPointURL()}`);
        this._flushSendBuffer();
        this.reconnectTimer.reset();
        this._resetHeartbeat();
        this.stateChangeCallbacks.open.forEach((callback)=>callback()
        );
    }
    _onConnClose(event) {
        this.log('transport', 'close', event);
        this._triggerChanError();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.reconnectTimer.scheduleTimeout();
        this.stateChangeCallbacks.close.forEach((callback)=>callback(event)
        );
    }
    _onConnError(error) {
        this.log('transport', error.message);
        this._triggerChanError();
        this.stateChangeCallbacks.error.forEach((callback)=>callback(error)
        );
    }
    _triggerChanError() {
        this.channels.forEach((channel)=>channel.trigger(_constants.CHANNEL_EVENTS.error)
        );
    }
    _appendParams(url, params) {
        if (Object.keys(params).length === 0) {
            return url;
        }
        const prefix = url.match(/\?/) ? '&' : '?';
        const query = new URLSearchParams(params);
        return `${url}${prefix}${query}`;
    }
    _flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
            this.sendBuffer.forEach((callback)=>callback()
            );
            this.sendBuffer = [];
        }
    }
    _resetHeartbeat() {
        this.pendingHeartbeatRef = null;
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(()=>this._sendHeartbeat()
        , this.heartbeatIntervalMs);
    }
    _sendHeartbeat() {
        var _a;
        if (!this.isConnected()) {
            return;
        }
        if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null;
            this.log('transport', 'heartbeat timeout. Attempting to re-establish connection');
            (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(_constants.WS_CLOSE_NORMAL, 'hearbeat timeout');
            return;
        }
        this.pendingHeartbeatRef = this.makeRef();
        this.push({
            topic: 'phoenix',
            event: 'heartbeat',
            payload: {},
            ref: this.pendingHeartbeatRef
        });
        this.setAuth(this.accessToken);
    }
    /**
     * Initializes the Socket
     *
     * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
     * @param options.transport The Websocket Transport, for example WebSocket.
     * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
     * @param options.params The optional params to pass when connecting.
     * @param options.headers The optional headers to pass when connecting.
     * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
     * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
     * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
     * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
     * @param options.longpollerTimeout The maximum timeout of a long poll AJAX request. Defaults to 20s (double the server long poll timer).
     * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
     */ constructor(endPoint, options){
        this.accessToken = null;
        this.channels = [];
        this.endPoint = '';
        this.headers = _constants.DEFAULT_HEADERS;
        this.params = {};
        this.timeout = _constants.DEFAULT_TIMEOUT;
        this.transport = _websocket.w3cwebsocket;
        this.heartbeatIntervalMs = 30000;
        this.longpollerTimeout = 20000;
        this.heartbeatTimer = undefined;
        this.pendingHeartbeatRef = null;
        this.ref = 0;
        this.logger = noop;
        this.conn = null;
        this.sendBuffer = [];
        this.serializer = new _serializer.default();
        this.stateChangeCallbacks = {
            open: [],
            close: [],
            error: [],
            message: []
        };
        this.endPoint = `${endPoint}/${_constants.TRANSPORTS.websocket}`;
        if (options === null || options === void 0 ? void 0 : options.params) this.params = options.params;
        if (options === null || options === void 0 ? void 0 : options.headers) this.headers = Object.assign(Object.assign({}, this.headers), options.headers);
        if (options === null || options === void 0 ? void 0 : options.timeout) this.timeout = options.timeout;
        if (options === null || options === void 0 ? void 0 : options.logger) this.logger = options.logger;
        if (options === null || options === void 0 ? void 0 : options.transport) this.transport = options.transport;
        if (options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) this.heartbeatIntervalMs = options.heartbeatIntervalMs;
        if (options === null || options === void 0 ? void 0 : options.longpollerTimeout) this.longpollerTimeout = options.longpollerTimeout;
        this.reconnectAfterMs = (options === null || options === void 0 ? void 0 : options.reconnectAfterMs) ? options.reconnectAfterMs : (tries)=>{
            return [
                1000,
                2000,
                5000,
                10000
            ][tries - 1] || 10000;
        };
        this.encode = (options === null || options === void 0 ? void 0 : options.encode) ? options.encode : (payload, callback)=>{
            return callback(JSON.stringify(payload));
        };
        this.decode = (options === null || options === void 0 ? void 0 : options.decode) ? options.decode : this.serializer.decode.bind(this.serializer);
        this.reconnectTimer = new _timer.default(()=>__awaiter(this, void 0, void 0, function*() {
                yield this.disconnect();
                this.connect();
            })
        , this.reconnectAfterMs);
    }
} //# sourceMappingURL=RealtimeClient.js.map
;
exports.default = RealtimeClient;

//# sourceMappingURL=RealtimeClient.js.map