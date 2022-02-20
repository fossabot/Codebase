"use strict";
var _exportNames = {};
var _broadcastChannel = require("./broadcast-channel");
Object.keys(_broadcastChannel).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _broadcastChannel[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _broadcastChannel[key];
        }
    });
});
var _leaderElection = require("./leader-election");
Object.keys(_leaderElection).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _leaderElection[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _leaderElection[key];
        }
    });
});

//# sourceMappingURL=index.d.js.map