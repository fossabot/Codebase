"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.COOKIE_OPTIONS = exports.STORAGE_KEY = exports.EXPIRY_MARGIN = exports.DEFAULT_HEADERS = exports.AUDIENCE = exports.GOTRUE_URL = void 0;
const version_1 = require("./version");
exports.GOTRUE_URL = 'http://localhost:9999';
exports.AUDIENCE = '';
exports.DEFAULT_HEADERS = {
    'X-Client-Info': `gotrue-js/${version_1.version}`
};
exports.EXPIRY_MARGIN = 60 * 1000;
exports.STORAGE_KEY = 'supabase.auth.token';
exports.COOKIE_OPTIONS = {
    name: 'sb',
    lifetime: 60 * 60 * 8,
    domain: '',
    path: '/',
    sameSite: 'lax'
}; //# sourceMappingURL=constants.js.map

//# sourceMappingURL=constants.js.map