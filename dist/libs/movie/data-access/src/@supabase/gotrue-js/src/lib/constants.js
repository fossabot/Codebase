"use strict";
exports.COOKIE_OPTIONS = exports.STORAGE_KEY = exports.EXPIRY_MARGIN = exports.DEFAULT_HEADERS = exports.AUDIENCE = exports.GOTRUE_URL = void 0;
var _version = require("./version");
const GOTRUE_URL = 'http://localhost:9999';
exports.GOTRUE_URL = GOTRUE_URL;
const AUDIENCE = '';
exports.AUDIENCE = AUDIENCE;
const DEFAULT_HEADERS = {
    'X-Client-Info': `gotrue-js/${_version.version}`
};
exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
const EXPIRY_MARGIN = 60 * 1000;
exports.EXPIRY_MARGIN = EXPIRY_MARGIN;
const STORAGE_KEY = 'supabase.auth.token';
exports.STORAGE_KEY = STORAGE_KEY;
const COOKIE_OPTIONS = {
    name: 'sb',
    lifetime: 60 * 60 * 8,
    domain: '',
    path: '/',
    sameSite: 'lax'
};
exports.COOKIE_OPTIONS = COOKIE_OPTIONS;

//# sourceMappingURL=constants.js.map