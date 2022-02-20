"use strict";
exports.version = exports.deprecation = void 0;
// Type definitions for websocket 1.0
// Project: https://github.com/theturtle32/WebSocket-Node
// Definitions by: Paul Loyd <https://github.com/loyd>,
//                 Kay Schecker <https://github.com/flynetworks>,
//                 Zhao Lei <https://github.com/zhaoleimxd>
//                 Sheng Chen <https://github.com/jdneo>,
//                 Matthew Peveler <https://github.com/MasterOdin>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2
/// <reference types="node" />
const events = require('events');
const http = require('http');
const https = require('https');
const net = require('net');
const url = require('url');
let server = class server extends events.EventEmitter {
};
exports.server = server;
let request = class request extends events.EventEmitter {
};
exports.request = request;
let connection = class connection extends events.EventEmitter {
};
exports.connection = connection;
let frame = class frame {
};
exports.frame = frame;
let client = class client extends events.EventEmitter {
};
exports.client = client;
let router = class router extends events.EventEmitter {
};
exports.router = router;
let w3cwebsocket = class w3cwebsocket {
};
exports.w3cwebsocket = w3cwebsocket;
const deprecation;
exports.deprecation = deprecation;
const version;
exports.version = version;

//# sourceMappingURL=index.d.js.map