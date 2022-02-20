"use strict";
exports.expiresAt = expiresAt;
exports.uuid = uuid;
exports.getParameterByName = getParameterByName;
exports.isBrowser = void 0;
function expiresAt(expiresIn) {
    const timeNow = Math.round(Date.now() / 1000);
    return timeNow + expiresIn;
}
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 3 | 8;
        return v.toString(16);
    });
}
const isBrowser = ()=>typeof window !== 'undefined'
;
exports.isBrowser = isBrowser;
function getParameterByName(name, url) {
    var ref;
    if (!url) url = (window === null || window === void 0 ? void 0 : (ref = window.location) === null || ref === void 0 ? void 0 : ref.href) || '';
    // eslint-disable-next-line no-useless-escape
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&#]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//# sourceMappingURL=helpers.js.map