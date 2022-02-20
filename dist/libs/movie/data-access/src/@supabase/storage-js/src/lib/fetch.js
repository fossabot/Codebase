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
            status: (error == null ? void 0 : error.status) || 500
        });
    });
};
const _getRequestParams = (method, options, parameters, body)=>{
    const params = {
        method,
        headers: (options == null ? void 0 : options.headers) || {}
    };
    if (method === 'GET') {
        return params;
    }
    params.headers = swcHelpers.extends({
        'Content-Type': 'application/json'
    }, options == null ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return swcHelpers.extends({}, params, parameters);
};
async function _handleRequest(fetcher = _crossFetch.default, method, url, options, parameters, body) {
    return new Promise((resolve, reject)=>{
        fetcher(url, _getRequestParams(method, options, parameters, body)).then((result)=>{
            if (!result.ok) throw result;
            if (options == null ? void 0 : options.noResolveJson) return resolve(result);
            return result.json();
        }).then((data)=>resolve(data)
        ).catch((error)=>handleError(error, reject)
        );
    });
}
async function get(fetcher, url, options, parameters) {
    return _handleRequest(fetcher, 'GET', url, options, parameters);
}
async function post(fetcher, url, body, options, parameters) {
    return _handleRequest(fetcher, 'POST', url, options, parameters, body);
}
async function put(fetcher, url, body, options, parameters) {
    return _handleRequest(fetcher, 'PUT', url, options, parameters, body);
}
async function remove(fetcher, url, body, options, parameters) {
    return _handleRequest(fetcher, 'DELETE', url, options, parameters, body);
}

//# sourceMappingURL=fetch.js.map