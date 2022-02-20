"use strict";
exports.uuid = uuid;
exports.stripTrailingSlash = stripTrailingSlash;
exports.isBrowser = void 0;
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 3 | 8;
        return v.toString(16);
    });
}
function stripTrailingSlash(url) {
    return url.replace(/\/$/, '');
}
const isBrowser = ()=>typeof window !== 'undefined'
; //# sourceMappingURL=helpers.js.map
exports.isBrowser = isBrowser;

//# sourceMappingURL=helpers.js.map