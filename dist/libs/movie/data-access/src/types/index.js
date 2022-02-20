"use strict";
var _exportNames = {};
var _groupModel = require("./group.model");
Object.keys(_groupModel).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _groupModel[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _groupModel[key];
        }
    });
});
var _movieModel = require("./movie.model");
Object.keys(_movieModel).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _movieModel[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _movieModel[key];
        }
    });
});

//# sourceMappingURL=index.js.map