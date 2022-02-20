"use strict";
!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.supabase = e() : t.supabase = e();
}(self, function() {
    return t1 = {
        98: function(t2, e2) {
            var r1 = "undefined" != typeof self ? self : this, n1 = function() {
                function t() {
                    this.fetch = !1, this.DOMException = r1.DOMException;
                }
                return t.prototype = r1, new t;
            }();
            !function(t3) {
                !function(e3) {
                    var r2 = "URLSearchParams" in t3, n2 = "Symbol" in t3 && "iterator" in Symbol, o2 = "FileReader" in t3 && "Blob" in t3 && function() {
                        try {
                            return new Blob, !0;
                        } catch (t) {
                            return !1;
                        }
                    }(), i1 = "FormData" in t3, s1 = "ArrayBuffer" in t3;
                    if (s1) var a1 = [
                        "[object Int8Array]",
                        "[object Uint8Array]",
                        "[object Uint8ClampedArray]",
                        "[object Int16Array]",
                        "[object Uint16Array]",
                        "[object Int32Array]",
                        "[object Uint32Array]",
                        "[object Float32Array]",
                        "[object Float64Array]"
                    ], u1 = ArrayBuffer.isView || function(t) {
                        return t && a1.indexOf(Object.prototype.toString.call(t)) > -1;
                    };
                    function c(t) {
                        if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
                        return t.toLowerCase();
                    }
                    function h(t) {
                        return "string" != typeof t && (t = String(t)), t;
                    }
                    function d(t) {
                        var e4 = {
                            next: function() {
                                var e = t.shift();
                                return {
                                    done: void 0 === e,
                                    value: e
                                };
                            }
                        };
                        return n2 && (e4[Symbol.iterator] = function() {
                            return e4;
                        }), e4;
                    }
                    function l(t4) {
                        this.map = {}, t4 instanceof l ? t4.forEach(function(t, e) {
                            this.append(e, t);
                        }, this) : Array.isArray(t4) ? t4.forEach(function(t) {
                            this.append(t[0], t[1]);
                        }, this) : t4 && Object.getOwnPropertyNames(t4).forEach(function(e) {
                            this.append(e, t4[e]);
                        }, this);
                    }
                    function f(t) {
                        if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
                        t.bodyUsed = !0;
                    }
                    function p(t) {
                        return new Promise(function(e, r) {
                            t.onload = function() {
                                e(t.result);
                            }, t.onerror = function() {
                                r(t.error);
                            };
                        });
                    }
                    function y(t) {
                        var e = new FileReader, r = p(e);
                        return e.readAsArrayBuffer(t), r;
                    }
                    function b(t) {
                        if (t.slice) return t.slice(0);
                        var e = new Uint8Array(t.byteLength);
                        return e.set(new Uint8Array(t)), e.buffer;
                    }
                    function v() {
                        return this.bodyUsed = !1, this._initBody = function(t) {
                            var e;
                            this._bodyInit = t, t ? "string" == typeof t ? this._bodyText = t : o2 && Blob.prototype.isPrototypeOf(t) ? this._bodyBlob = t : i1 && FormData.prototype.isPrototypeOf(t) ? this._bodyFormData = t : r2 && URLSearchParams.prototype.isPrototypeOf(t) ? this._bodyText = t.toString() : s1 && o2 && (e = t) && DataView.prototype.isPrototypeOf(e) ? (this._bodyArrayBuffer = b(t.buffer), this._bodyInit = new Blob([
                                this._bodyArrayBuffer
                            ])) : s1 && (ArrayBuffer.prototype.isPrototypeOf(t) || u1(t)) ? this._bodyArrayBuffer = b(t) : this._bodyText = t = Object.prototype.toString.call(t) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : r2 && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
                        }, o2 && (this.blob = function() {
                            var t = f(this);
                            if (t) return t;
                            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                            if (this._bodyArrayBuffer) return Promise.resolve(new Blob([
                                this._bodyArrayBuffer
                            ]));
                            if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                            return Promise.resolve(new Blob([
                                this._bodyText
                            ]));
                        }, this.arrayBuffer = function() {
                            return this._bodyArrayBuffer ? f(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(y);
                        }), this.text = function() {
                            var t5, e5, r3, n3 = f(this);
                            if (n3) return n3;
                            if (this._bodyBlob) return t5 = this._bodyBlob, r3 = p(e5 = new FileReader), e5.readAsText(t5), r3;
                            if (this._bodyArrayBuffer) return Promise.resolve(function(t) {
                                for(var e = new Uint8Array(t), r = new Array(e.length), n = 0; n < e.length; n++)r[n] = String.fromCharCode(e[n]);
                                return r.join("");
                            }(this._bodyArrayBuffer));
                            if (this._bodyFormData) throw new Error("could not read FormData body as text");
                            return Promise.resolve(this._bodyText);
                        }, i1 && (this.formData = function() {
                            return this.text().then(_);
                        }), this.json = function() {
                            return this.text().then(JSON.parse);
                        }, this;
                    }
                    l.prototype.append = function(t, e) {
                        t = c(t), e = h(e);
                        var r = this.map[t];
                        this.map[t] = r ? r + ", " + e : e;
                    }, l.prototype.delete = function(t) {
                        delete this.map[c(t)];
                    }, l.prototype.get = function(t) {
                        return t = c(t), this.has(t) ? this.map[t] : null;
                    }, l.prototype.has = function(t) {
                        return this.map.hasOwnProperty(c(t));
                    }, l.prototype.set = function(t, e) {
                        this.map[c(t)] = h(e);
                    }, l.prototype.forEach = function(t, e) {
                        for(var r in this.map)this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this);
                    }, l.prototype.keys = function() {
                        var t = [];
                        return this.forEach(function(e, r) {
                            t.push(r);
                        }), d(t);
                    }, l.prototype.values = function() {
                        var t = [];
                        return this.forEach(function(e) {
                            t.push(e);
                        }), d(t);
                    }, l.prototype.entries = function() {
                        var t = [];
                        return this.forEach(function(e, r) {
                            t.push([
                                r,
                                e
                            ]);
                        }), d(t);
                    }, n2 && (l.prototype[Symbol.iterator] = l.prototype.entries);
                    var m = [
                        "DELETE",
                        "GET",
                        "HEAD",
                        "OPTIONS",
                        "POST",
                        "PUT"
                    ];
                    function g(t, e) {
                        var r, n, o = (e = e || {}).body;
                        if (t instanceof g) {
                            if (t.bodyUsed) throw new TypeError("Already read");
                            this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new l(t.headers)), this.method = t.method, this.mode = t.mode, this.signal = t.signal, o || null == t._bodyInit || (o = t._bodyInit, t.bodyUsed = !0);
                        } else this.url = String(t);
                        if (this.credentials = e.credentials || this.credentials || "same-origin", !e.headers && this.headers || (this.headers = new l(e.headers)), this.method = (n = (r = e.method || this.method || "GET").toUpperCase(), m.indexOf(n) > -1 ? n : r), this.mode = e.mode || this.mode || null, this.signal = e.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && o) throw new TypeError("Body not allowed for GET or HEAD requests");
                        this._initBody(o);
                    }
                    function _(t6) {
                        var e = new FormData;
                        return t6.trim().split("&").forEach(function(t) {
                            if (t) {
                                var r = t.split("="), n = r.shift().replace(/\+/g, " "), o = r.join("=").replace(/\+/g, " ");
                                e.append(decodeURIComponent(n), decodeURIComponent(o));
                            }
                        }), e;
                    }
                    function w(t, e) {
                        e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new l(e.headers), this.url = e.url || "", this._initBody(t);
                    }
                    g.prototype.clone = function() {
                        return new g(this, {
                            body: this._bodyInit
                        });
                    }, v.call(g.prototype), v.call(w.prototype), w.prototype.clone = function() {
                        return new w(this._bodyInit, {
                            status: this.status,
                            statusText: this.statusText,
                            headers: new l(this.headers),
                            url: this.url
                        });
                    }, w.error = function() {
                        var t = new w(null, {
                            status: 0,
                            statusText: ""
                        });
                        return t.type = "error", t;
                    };
                    var O = [
                        301,
                        302,
                        303,
                        307,
                        308
                    ];
                    w.redirect = function(t, e) {
                        if (-1 === O.indexOf(e)) throw new RangeError("Invalid status code");
                        return new w(null, {
                            status: e,
                            headers: {
                                location: t
                            }
                        });
                    }, e3.DOMException = t3.DOMException;
                    try {
                        new e3.DOMException;
                    } catch (t7) {
                        e3.DOMException = function(t, e) {
                            this.message = t, this.name = e;
                            var r = Error(t);
                            this.stack = r.stack;
                        }, e3.DOMException.prototype = Object.create(Error.prototype), e3.DOMException.prototype.constructor = e3.DOMException;
                    }
                    function j(t8, r4) {
                        return new Promise(function(n4, i) {
                            var s = new g(t8, r4);
                            if (s.signal && s.signal.aborted) return i(new e3.DOMException("Aborted", "AbortError"));
                            var a = new XMLHttpRequest;
                            function u() {
                                a.abort();
                            }
                            a.onload = function() {
                                var t9, e, r5 = {
                                    status: a.status,
                                    statusText: a.statusText,
                                    headers: (t9 = a.getAllResponseHeaders() || "", e = new l, t9.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(t) {
                                        var r = t.split(":"), n = r.shift().trim();
                                        if (n) {
                                            var o = r.join(":").trim();
                                            e.append(n, o);
                                        }
                                    }), e)
                                };
                                r5.url = "responseURL" in a ? a.responseURL : r5.headers.get("X-Request-URL");
                                var o3 = "response" in a ? a.response : a.responseText;
                                n4(new w(o3, r5));
                            }, a.onerror = function() {
                                i(new TypeError("Network request failed"));
                            }, a.ontimeout = function() {
                                i(new TypeError("Network request failed"));
                            }, a.onabort = function() {
                                i(new e3.DOMException("Aborted", "AbortError"));
                            }, a.open(s.method, s.url, !0), "include" === s.credentials ? a.withCredentials = !0 : "omit" === s.credentials && (a.withCredentials = !1), "responseType" in a && o2 && (a.responseType = "blob"), s.headers.forEach(function(t, e) {
                                a.setRequestHeader(e, t);
                            }), s.signal && (s.signal.addEventListener("abort", u), a.onreadystatechange = function() {
                                4 === a.readyState && s.signal.removeEventListener("abort", u);
                            }), a.send(void 0 === s._bodyInit ? null : s._bodyInit);
                        });
                    }
                    j.polyfill = !0, t3.fetch || (t3.fetch = j, t3.Headers = l, t3.Request = g, t3.Response = w), e3.Headers = l, e3.Request = g, e3.Response = w, e3.fetch = j, Object.defineProperty(e3, "__esModule", {
                        value: !0
                    });
                }({});
            }(n1), n1.fetch.ponyfill = !0, delete n1.fetch.polyfill;
            var o1 = n1;
            (e2 = o1.fetch).default = o1.fetch, e2.fetch = o1.fetch, e2.Headers = o1.Headers, e2.Request = o1.Request, e2.Response = o1.Response, t2.exports = e2;
        },
        215: (t10, e6, r6)=>{
            "use strict";
            Object.defineProperty(e6, "__esModule", {
                value: !0
            }), e6.SupabaseStorageClient = void 0;
            const n = r6(965);
            let o = class o extends n.StorageBucketApi {
                from(t) {
                    return new n.StorageFileApi(this.url, this.headers, t, this.fetch);
                }
                constructor(t, e = {}, r){
                    super(t, e, r);
                }
            };
            e6.SupabaseStorageClient = o;
        },
        341: function(t11, e7, r7) {
            "use strict";
            var n5 = this && this.__createBinding || (Object.create ? function(t, e, r, n) {
                void 0 === n && (n = r), Object.defineProperty(t, n, {
                    enumerable: !0,
                    get: function() {
                        return e[r];
                    }
                });
            } : function(t, e, r, n) {
                void 0 === n && (n = r), t[n] = e[r];
            }), o = this && this.__exportStar || function(t, e) {
                for(var r in t)"default" === r || Object.prototype.hasOwnProperty.call(e, r) || n5(e, t, r);
            };
            Object.defineProperty(e7, "__esModule", {
                value: !0
            }), e7.SupabaseStorageClient = void 0;
            const i = r7(215);
            Object.defineProperty(e7, "SupabaseStorageClient", {
                enumerable: !0,
                get: function() {
                    return i.SupabaseStorageClient;
                }
            }), o(r7(717), e7);
        },
        150: function(t12, e8, r8) {
            "use strict";
            var n6 = this && this.__awaiter || function(t13, e9, r, n) {
                return new (r || (r = Promise))(function(o, i) {
                    function s(t) {
                        try {
                            u(n.next(t));
                        } catch (t14) {
                            i(t14);
                        }
                    }
                    function a(t) {
                        try {
                            u(n.throw(t));
                        } catch (t15) {
                            i(t15);
                        }
                    }
                    function u(t16) {
                        var e;
                        t16.done ? o(t16.value) : (e = t16.value, e instanceof r ? e : new r(function(t) {
                            t(e);
                        })).then(s, a);
                    }
                    u((n = n.apply(t13, e9 || [])).next());
                });
            };
            Object.defineProperty(e8, "__esModule", {
                value: !0
            }), e8.StorageBucketApi = void 0;
            const o4 = r8(716), i2 = r8(678);
            e8.StorageBucketApi = class _class {
                listBuckets() {
                    return n6(this, void 0, void 0, function*() {
                        try {
                            return {
                                data: yield o4.get(this.fetch, `${this.url}/bucket`, {
                                    headers: this.headers
                                }),
                                error: null
                            };
                        } catch (t) {
                            return {
                                data: null,
                                error: t
                            };
                        }
                    });
                }
                getBucket(t17) {
                    return n6(this, void 0, void 0, function*() {
                        try {
                            return {
                                data: yield o4.get(this.fetch, `${this.url}/bucket/${t17}`, {
                                    headers: this.headers
                                }),
                                error: null
                            };
                        } catch (t) {
                            return {
                                data: null,
                                error: t
                            };
                        }
                    });
                }
                createBucket(t18, e = {
                    public: !1
                }) {
                    return n6(this, void 0, void 0, function*() {
                        try {
                            return {
                                data: (yield o4.post(this.fetch, `${this.url}/bucket`, {
                                    id: t18,
                                    name: t18,
                                    public: e.public
                                }, {
                                    headers: this.headers
                                })).name,
                                error: null
                            };
                        } catch (t) {
                            return {
                                data: null,
                                error: t
                            };
                        }
                    });
                }
                updateBucket(t19, e) {
                    return n6(this, void 0, void 0, function*() {
                        try {
                            return {
                                data: yield o4.put(this.fetch, `${this.url}/bucket/${t19}`, {
                                    id: t19,
                                    name: t19,
                                    public: e.public
                                }, {
                                    headers: this.headers
                                }),
                                error: null
                            };
                        } catch (t) {
                            return {
                                data: null,
                                error: t
                            };
                        }
                    });
                }
                emptyBucket(t20) {
                    return n6(this, void 0, void 0, function*() {
                        try {
                            return {
                                data: yield o4.post(this.fetch, `${this.url}/bucket/${t20}/empty`, {}, {
                                    headers: this.headers
                                }),
                                error: null
                            };
                        } catch (t) {
                            return {
                                data: null,
                                error: t
                            };
                        }
                    });
                }
                deleteBucket(t21) {
                    return n6(this, void 0, void 0, function*() {
                        try {
                            return {
                                data: yield o4.remove(this.fetch, `${this.url}/bucket/${t21}`, {}, {
                                    headers: this.headers
                                }),
                                error: null
                            };
                        } catch (t) {
                            return {
                                data: null,
                                error: t
                            };
                        }
                    });
                }
                constructor(t, e = {}, r){
                    this.url = t, this.headers = Object.assign(Object.assign({}, i2.DEFAULT_HEADERS), e), this.fetch = r;
                }
            };
        },
        948: function(t22, e10, r9) {
            "use strict";
            var n7 = this && this.__awaiter || function(t23, e11, r, n) {
                return new (r || (r = Promise))(function(o, i) {
                    function s(t) {
                        try {
                            u(n.next(t));
                        } catch (t24) {
                            i(t24);
                        }
                    }
                    function a(t) {
                        try {
                            u(n.throw(t));
                        } catch (t25) {
                            i(t25);
                        }
                    }
                    function u(t26) {
                        var e;
                        t26.done ? o(t26.value) : (e = t26.value, e instanceof r ? e : new r(function(t) {
                            t(e);
                        })).then(s, a);
                    }
                    u((n = n.apply(t23, e11 || [])).next());
                });
            }, o5 = this && this.__importDefault || function(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            };
            Object.defineProperty(e10, "__esModule", {
                value: !0
            }), e10.StorageFileApi = void 0;
            const i3 = r9(716), s2 = o5(r9(98)), a2 = {
                limit: 100,
                offset: 0,
                sortBy: {
                    column: "name",
                    order: "asc"
                }
            }, u2 = {
                cacheControl: "3600",
                contentType: "text/plain;charset=UTF-8",
                upsert: !1
            };
            e10.StorageFileApi = class _class {
                uploadOrUpdate(t27, e, r, o) {
                    return n7(this, void 0, void 0, function*() {
                        try {
                            let n;
                            const i = Object.assign(Object.assign({}, u2), o), a = Object.assign(Object.assign({}, this.headers), "POST" === t27 && {
                                "x-upsert": String(i.upsert)
                            });
                            "undefined" != typeof Blob && r instanceof Blob ? (n = new FormData, n.append("cacheControl", i.cacheControl), n.append("", r)) : "undefined" != typeof FormData && r instanceof FormData ? (n = r, n.append("cacheControl", i.cacheControl)) : (n = r, a["cache-control"] = `max-age=${i.cacheControl}`, a["content-type"] = i.contentType);
                            const c = this._removeEmptyFolders(e), h = this._getFinalPath(c), d = yield s2.default(`${this.url}/object/${h}`, {
                                method: t27,
                                body: n,
                                headers: a
                            });
                            return d.ok ? {
                                data: {
                                    Key: h
                                },
                                error: null
                            } : {
                                data: null,
                                error: yield d.json()
                            };
                        } catch (t) {
                            return {
                                data: null,
                                error: t
                            };
                        }
                    });
                }
                upload(t, e, r) {
                    return n7(this, void 0, void 0, function*() {
                        return this.uploadOrUpdate("POST", t, e, r);
                    });
                }
                update(t, e, r) {
                    return n7(this, void 0, void 0, function*() {
                        return this.uploadOrUpdate("PUT", t, e, r);
                    });
                }
                move(t28, e) {
                    return n7(this, void 0, void 0, function*() {
                        try {
                            return {
                                data: yield i3.post(this.fetch, `${this.url}/object/move`, {
                                    bucketId: this.bucketId,
                                    sourceKey: t28,
                                    destinationKey: e
                                }, {
                                    headers: this.headers
                                }),
                                error: null
                            };
                        } catch (t) {
                            return {
                                data: null,
                                error: t
                            };
                        }
                    });
                }
                createSignedUrl(t29, e) {
                    return n7(this, void 0, void 0, function*() {
                        try {
                            const r = this._getFinalPath(t29);
                            let n = yield i3.post(this.fetch, `${this.url}/object/sign/${r}`, {
                                expiresIn: e
                            }, {
                                headers: this.headers
                            });
                            const o = `${this.url}${n.signedURL}`;
                            return n = {
                                signedURL: o
                            }, {
                                data: n,
                                error: null,
                                signedURL: o
                            };
                        } catch (t) {
                            return {
                                data: null,
                                error: t,
                                signedURL: null
                            };
                        }
                    });
                }
                download(t30) {
                    return n7(this, void 0, void 0, function*() {
                        try {
                            const e = this._getFinalPath(t30), r = yield i3.get(this.fetch, `${this.url}/object/${e}`, {
                                headers: this.headers,
                                noResolveJson: !0
                            });
                            return {
                                data: yield r.blob(),
                                error: null
                            };
                        } catch (t) {
                            return {
                                data: null,
                                error: t
                            };
                        }
                    });
                }
                getPublicUrl(t) {
                    try {
                        const e = this._getFinalPath(t), r = `${this.url}/object/public/${e}`;
                        return {
                            data: {
                                publicURL: r
                            },
                            error: null,
                            publicURL: r
                        };
                    } catch (t31) {
                        return {
                            data: null,
                            error: t31,
                            publicURL: null
                        };
                    }
                }
                remove(t32) {
                    return n7(this, void 0, void 0, function*() {
                        try {
                            return {
                                data: yield i3.remove(this.fetch, `${this.url}/object/${this.bucketId}`, {
                                    prefixes: t32
                                }, {
                                    headers: this.headers
                                }),
                                error: null
                            };
                        } catch (t) {
                            return {
                                data: null,
                                error: t
                            };
                        }
                    });
                }
                list(t33, e, r) {
                    return n7(this, void 0, void 0, function*() {
                        try {
                            const n = Object.assign(Object.assign(Object.assign({}, a2), e), {
                                prefix: t33 || ""
                            });
                            return {
                                data: yield i3.post(this.fetch, `${this.url}/object/list/${this.bucketId}`, n, {
                                    headers: this.headers
                                }, r),
                                error: null
                            };
                        } catch (t) {
                            return {
                                data: null,
                                error: t
                            };
                        }
                    });
                }
                _getFinalPath(t) {
                    return `${this.bucketId}/${t}`;
                }
                _removeEmptyFolders(t) {
                    return t.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
                }
                constructor(t, e = {}, r, n){
                    this.url = t, this.headers = e, this.bucketId = r, this.fetch = n;
                }
            };
        },
        678: (t, e, r)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.DEFAULT_HEADERS = void 0;
            const n = r(506);
            e.DEFAULT_HEADERS = {
                "X-Client-Info": `storage-js/${n.version}`
            };
        },
        716: function(t34, e12, r10) {
            "use strict";
            var n8 = this && this.__awaiter || function(t35, e13, r, n) {
                return new (r || (r = Promise))(function(o, i) {
                    function s(t) {
                        try {
                            u(n.next(t));
                        } catch (t36) {
                            i(t36);
                        }
                    }
                    function a(t) {
                        try {
                            u(n.throw(t));
                        } catch (t37) {
                            i(t37);
                        }
                    }
                    function u(t38) {
                        var e;
                        t38.done ? o(t38.value) : (e = t38.value, e instanceof r ? e : new r(function(t) {
                            t(e);
                        })).then(s, a);
                    }
                    u((n = n.apply(t35, e13 || [])).next());
                });
            }, o6 = this && this.__importDefault || function(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            };
            Object.defineProperty(e12, "__esModule", {
                value: !0
            }), e12.remove = e12.put = e12.post = e12.get = void 0;
            const i4 = o6(r10(98)), s3 = (t)=>t.msg || t.message || t.error_description || t.error || JSON.stringify(t)
            ;
            function a3(t39 = i4.default, e14, r11, o7, a, u) {
                return n8(this, void 0, void 0, function*() {
                    return new Promise((n9, i)=>{
                        t39(r11, ((t, e, r, n)=>{
                            const o = {
                                method: t,
                                headers: (null == e ? void 0 : e.headers) || {}
                            };
                            return "GET" === t ? o : (o.headers = Object.assign({
                                "Content-Type": "application/json"
                            }, null == e ? void 0 : e.headers), o.body = JSON.stringify(n), Object.assign(Object.assign({}, o), r));
                        })(e14, o7, a, u)).then((t)=>{
                            if (!t.ok) throw t;
                            return (null == o7 ? void 0 : o7.noResolveJson) ? n9(t) : t.json();
                        }).then((t)=>n9(t)
                        ).catch((t40)=>((t, e)=>{
                                if ("function" != typeof t.json) return e(t);
                                t.json().then((r)=>e({
                                        message: s3(r),
                                        status: (null == t ? void 0 : t.status) || 500
                                    })
                                );
                            })(t40, i)
                        );
                    });
                });
            }
            e12.get = function(t, e, r, o) {
                return n8(this, void 0, void 0, function*() {
                    return a3(t, "GET", e, r, o);
                });
            }, e12.post = function(t, e, r, o, i) {
                return n8(this, void 0, void 0, function*() {
                    return a3(t, "POST", e, o, i, r);
                });
            }, e12.put = function(t, e, r, o, i) {
                return n8(this, void 0, void 0, function*() {
                    return a3(t, "PUT", e, o, i, r);
                });
            }, e12.remove = function(t, e, r, o, i) {
                return n8(this, void 0, void 0, function*() {
                    return a3(t, "DELETE", e, o, i, r);
                });
            };
        },
        965: function(t41, e15, r12) {
            "use strict";
            var n10 = this && this.__createBinding || (Object.create ? function(t, e, r, n) {
                void 0 === n && (n = r), Object.defineProperty(t, n, {
                    enumerable: !0,
                    get: function() {
                        return e[r];
                    }
                });
            } : function(t, e, r, n) {
                void 0 === n && (n = r), t[n] = e[r];
            }), o = this && this.__exportStar || function(t, e) {
                for(var r in t)"default" === r || Object.prototype.hasOwnProperty.call(e, r) || n10(e, t, r);
            };
            Object.defineProperty(e15, "__esModule", {
                value: !0
            }), o(r12(150), e15), o(r12(948), e15), o(r12(717), e15), o(r12(678), e15);
        },
        717: (t, e)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
        },
        506: (t, e)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.version = void 0, e.version = "0.0.0";
        }
    }, e1 = {}, (function r(n) {
        var o = e1[n];
        if (void 0 !== o) return o.exports;
        var i = e1[n] = {
            exports: {}
        };
        return t1[n].call(i.exports, i, i.exports, r), i.exports;
    })(341);
    var t1, e1;
});

//# sourceMappingURL=supabase.js.map