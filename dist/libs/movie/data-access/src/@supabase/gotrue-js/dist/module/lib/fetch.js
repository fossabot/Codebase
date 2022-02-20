"use strict";
exports.get = get;
exports.post = post;
exports.put = put;
exports.remove = remove;
var _crossFetch = require("cross-fetch");
var __awaiter = (void 0) && (void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const _getErrorMessage = (err)=>err.msg || err.message || err.error_description || err.error || JSON.stringify(err)
;
const handleError = (error, reject)=>{
    if (typeof error.json !== 'function') {
        return reject(error);
    }
    error.json().then((err)=>{
        return reject({
            message: _getErrorMessage(err),
            status: (error === null || error === void 0 ? void 0 : error.status) || 500
        });
    });
};
const _getRequestParams = (method, options, body)=>{
    const params = {
        method,
        headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
    };
    if (method === 'GET') {
        return params;
    }
    params.headers = Object.assign({
        'Content-Type': 'text/plain;charset=UTF-8'
    }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return params;
};
function _handleRequest(fetcher = _crossFetch.default, method, url, options, body) {
    return __awaiter(this, void 0, void 0, function*() {
        return new Promise((resolve, reject)=>{
            fetcher(url, _getRequestParams(method, options, body)).then((result)=>{
                if (!result.ok) throw result;
                if (options === null || options === void 0 ? void 0 : options.noResolveJson) return resolve;
                return result.json();
            }).then((data)=>resolve(data)
            ).catch((error)=>handleError(error, reject)
            );
        });
    });
}
function get(fetcher, url, options) {
    return __awaiter(this, void 0, void 0, function*() {
        return _handleRequest(fetcher, 'GET', url, options);
    });
}
function post(fetcher, url, body, options) {
    return __awaiter(this, void 0, void 0, function*() {
        return _handleRequest(fetcher, 'POST', url, options, body);
    });
}
function put(fetcher, url, body, options) {
    return __awaiter(this, void 0, void 0, function*() {
        return _handleRequest(fetcher, 'PUT', url, options, body);
    });
}
function remove(fetcher, url, body, options) {
    return __awaiter(this, void 0, void 0, function*() {
        return _handleRequest(fetcher, 'DELETE', url, options, body);
    });
} //# sourceMappingURL=fetch.js.map

//# sourceMappingURL=fetch.js.map