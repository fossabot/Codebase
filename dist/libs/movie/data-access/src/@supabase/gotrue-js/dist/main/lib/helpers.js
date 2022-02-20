"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getParameterByName = exports.isBrowser = exports.uuid = exports.expiresAt = void 0;
function expiresAt(expiresIn) {
    const timeNow = Math.round(Date.now() / 1000);
    return timeNow + expiresIn;
}
exports.expiresAt = expiresAt;
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 3 | 8;
        return v.toString(16);
    });
}
exports.uuid = uuid;
const isBrowser = ()=>typeof window !== 'undefined'
;
exports.isBrowser = isBrowser;
function getParameterByName(name, url) {
    var _a;
    if (!url) url = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.href) || '';
    // eslint-disable-next-line no-useless-escape
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&#]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
exports.getParameterByName = getParameterByName; //# sourceMappingURL=helpers.js.map

//# sourceMappingURL=helpers.js.map