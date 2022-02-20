"use strict";
exports.default = _wrapRegExp;
var _typeofJs = require("./typeof.js");
var _setPrototypeOfJs = require("./setPrototypeOf.js");
var _inheritsJs = require("./inherits.js");
function _wrapRegExp() {
    exports.default = _wrapRegExp = function _wrapRegExp(re, groups) {
        return new BabelRegExp(re, void 0, groups);
    };
    var _super = RegExp.prototype, _groups = new WeakMap();
    function BabelRegExp(re, flags, groups) {
        var _this = new RegExp(re, flags);
        return _groups.set(_this, groups || _groups.get(re)), (0, _setPrototypeOfJs).default(_this, BabelRegExp.prototype);
    }
    function buildGroups(result, re) {
        var g = _groups.get(re);
        return Object.keys(g).reduce(function(groups, name) {
            return groups[name] = result[g[name]], groups;
        }, Object.create(null));
    }
    return (0, _inheritsJs).default(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function(str) {
        var result = _super.exec.call(this, str);
        return result && (result.groups = buildGroups(result, this)), result;
    }, BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
        if ("string" == typeof substitution) {
            var groups = _groups.get(this);
            return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function(_, name) {
                return "$" + groups[name];
            }));
        }
        if ("function" == typeof substitution) {
            var _this = this;
            return _super[Symbol.replace].call(this, str, function() {
                var args = arguments;
                return "object" != (0, _typeofJs).default(args[args.length - 1]) && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args);
            });
        }
        return _super[Symbol.replace].call(this, str, substitution);
    }, _wrapRegExp.apply(this, arguments);
}

//# sourceMappingURL=wrapRegExp.js.map