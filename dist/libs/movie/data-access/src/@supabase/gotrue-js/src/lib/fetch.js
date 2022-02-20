"use strict";
exports.get = get;
exports.post = post;
exports.put = put;
exports.remove = remove;
var swcHelpers = require("@swc/helpers");
var _crossFetch = require("cross-fetch");
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
    params.headers = swcHelpers.objectSpread({
        'Content-Type': 'text/plain;charset=UTF-8'
    }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return params;
};
async function _handleRequest(fetcher = _crossFetch.default, method, url, options, body) {
    return new Promise((resolve, reject)=>{
        fetcher(url, _getRequestParams(method, options, body)).then((result)=>{
            if (!result.ok) throw result;
            if (options === null || options === void 0 ? void 0 : options.noResolveJson) return resolve;
            return result.json();
        }).then((data)=>resolve(data)
        ).catch((error)=>handleError(error, reject)
        );
    });
}
async function get(fetcher, url, options) {
    return _handleRequest(fetcher, 'GET', url, options);
}
async function post(fetcher, url, body, options) {
    return _handleRequest(fetcher, 'POST', url, options, body);
}
async function put(fetcher, url, body, options) {
    return _handleRequest(fetcher, 'PUT', url, options, body);
}
async function remove(fetcher, url, body, options) {
    return _handleRequest(fetcher, 'DELETE', url, options, body);
}

//# sourceMappingURL=fetch.js.map