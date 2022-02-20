"use strict";
var _exportNames = {};
var _auth = require("./lib/auth");
Object.keys(_auth).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _auth[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _auth[key];
        }
    });
});
var _group = require("./lib/group");
Object.keys(_group).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _group[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _group[key];
        }
    });
});
var _groups = require("./lib/groups");
Object.keys(_groups).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _groups[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _groups[key];
        }
    });
});
var _invites = require("./lib/invites");
Object.keys(_invites).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _invites[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _invites[key];
        }
    });
});
var _movies = require("./lib/movies");
Object.keys(_movies).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _movies[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _movies[key];
        }
    });
});

//# sourceMappingURL=index.js.map