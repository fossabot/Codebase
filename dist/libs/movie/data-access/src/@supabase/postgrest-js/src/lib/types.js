"use strict";
var _crossFetch = require("cross-fetch");
let PostgrestBuilder = class PostgrestBuilder {
    /**
   * If there's an error with the query, throwOnError will reject the promise by
   * throwing the error instead of returning it as part of a successful response.
   *
   * {@link https://github.com/supabase/supabase-js/issues/92}
   */ throwOnError() {
        this.shouldThrowOnError = true;
        return this;
    }
    then(onfulfilled, onrejected) {
        // https://postgrest.org/en/stable/api.html#switching-schemas
        if (typeof this.schema === 'undefined') {
        // skip
        } else if ([
            'GET',
            'HEAD'
        ].includes(this.method)) {
            this.headers['Accept-Profile'] = this.schema;
        } else {
            this.headers['Content-Profile'] = this.schema;
        }
        if (this.method !== 'GET' && this.method !== 'HEAD') {
            this.headers['Content-Type'] = 'application/json';
        }
        let res1 = this.fetch(this.url.toString(), {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body),
            signal: this.signal
        }).then(async (res)=>{
            let error = null;
            let data = null;
            let count = null;
            if (res.ok) {
                var ref, ref1, ref2;
                const isReturnMinimal = (ref = this.headers['Prefer']) === null || ref === void 0 ? void 0 : ref.split(',').includes('return=minimal');
                if (this.method !== 'HEAD' && !isReturnMinimal) {
                    const text = await res.text();
                    if (!text) {
                    // discard `text`
                    } else if (this.headers['Accept'] === 'text/csv') {
                        data = text;
                    } else {
                        data = JSON.parse(text);
                    }
                }
                const countHeader = (ref1 = this.headers['Prefer']) === null || ref1 === void 0 ? void 0 : ref1.match(/count=(exact|planned|estimated)/);
                const contentRange = (ref2 = res.headers.get('content-range')) === null || ref2 === void 0 ? void 0 : ref2.split('/');
                if (countHeader && contentRange && contentRange.length > 1) {
                    count = parseInt(contentRange[1]);
                }
            } else {
                const body = await res.text();
                try {
                    error = JSON.parse(body);
                } catch (e) {
                    error = {
                        message: body
                    };
                }
                if (error && this.shouldThrowOnError) {
                    throw error;
                }
            }
            const postgrestResponse = {
                error,
                data,
                count,
                status: res.status,
                statusText: res.statusText,
                body: data
            };
            return postgrestResponse;
        });
        if (!this.shouldThrowOnError) {
            res1 = res1.catch((fetchError)=>({
                    error: {
                        message: `FetchError: ${fetchError.message}`,
                        details: '',
                        hint: '',
                        code: fetchError.code || ''
                    },
                    data: null,
                    body: null,
                    count: null,
                    status: 400,
                    statusText: 'Bad Request'
                })
            );
        }
        return res1.then(onfulfilled, onrejected);
    }
    constructor(builder){
        this.shouldThrowOnError = false;
        Object.assign(this, builder);
        this.fetch = builder.fetch || _crossFetch.default;
    }
};
exports.PostgrestBuilder = PostgrestBuilder;

//# sourceMappingURL=types.js.map