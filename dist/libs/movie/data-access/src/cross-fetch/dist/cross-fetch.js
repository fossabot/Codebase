"use strict";
!function(t1) {
    !function(e1) {
        var r1 = "URLSearchParams" in t1, o1 = "Symbol" in t1 && "iterator" in Symbol, n1 = "FileReader" in t1 && "Blob" in t1 && function() {
            try {
                return new Blob, !0;
            } catch (t) {
                return !1;
            }
        }(), i1 = "FormData" in t1, s1 = "ArrayBuffer" in t1;
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
        ], h1 = ArrayBuffer.isView || function(t) {
            return t && a1.indexOf(Object.prototype.toString.call(t)) > -1;
        };
        function u(t) {
            if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
            return t.toLowerCase();
        }
        function d(t) {
            return "string" != typeof t && (t = String(t)), t;
        }
        function f(t) {
            var e2 = {
                next: function() {
                    var e = t.shift();
                    return {
                        done: void 0 === e,
                        value: e
                    };
                }
            };
            return o1 && (e2[Symbol.iterator] = function() {
                return e2;
            }), e2;
        }
        function c(t2) {
            this.map = {}, t2 instanceof c ? t2.forEach(function(t, e) {
                this.append(e, t);
            }, this) : Array.isArray(t2) ? t2.forEach(function(t) {
                this.append(t[0], t[1]);
            }, this) : t2 && Object.getOwnPropertyNames(t2).forEach(function(e) {
                this.append(e, t2[e]);
            }, this);
        }
        function p(t) {
            if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
            t.bodyUsed = !0;
        }
        function y(t) {
            return new Promise(function(e, r) {
                t.onload = function() {
                    e(t.result);
                }, t.onerror = function() {
                    r(t.error);
                };
            });
        }
        function l(t) {
            var e = new FileReader, r = y(e);
            return e.readAsArrayBuffer(t), r;
        }
        function b(t) {
            if (t.slice) return t.slice(0);
            var e = new Uint8Array(t.byteLength);
            return e.set(new Uint8Array(t)), e.buffer;
        }
        function m() {
            return this.bodyUsed = !1, this._initBody = function(t) {
                var e;
                this._bodyInit = t, t ? "string" == typeof t ? this._bodyText = t : n1 && Blob.prototype.isPrototypeOf(t) ? this._bodyBlob = t : i1 && FormData.prototype.isPrototypeOf(t) ? this._bodyFormData = t : r1 && URLSearchParams.prototype.isPrototypeOf(t) ? this._bodyText = t.toString() : s1 && n1 && (e = t) && DataView.prototype.isPrototypeOf(e) ? (this._bodyArrayBuffer = b(t.buffer), this._bodyInit = new Blob([
                    this._bodyArrayBuffer
                ])) : s1 && (ArrayBuffer.prototype.isPrototypeOf(t) || h1(t)) ? this._bodyArrayBuffer = b(t) : this._bodyText = t = Object.prototype.toString.call(t) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : r1 && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
            }, n1 && (this.blob = function() {
                var t = p(this);
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
                return this._bodyArrayBuffer ? p(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(l);
            }), this.text = function() {
                var t3, e3, r2, o2 = p(this);
                if (o2) return o2;
                if (this._bodyBlob) return t3 = this._bodyBlob, e3 = new FileReader, r2 = y(e3), e3.readAsText(t3), r2;
                if (this._bodyArrayBuffer) return Promise.resolve(function(t) {
                    for(var e = new Uint8Array(t), r = new Array(e.length), o = 0; o < e.length; o++)r[o] = String.fromCharCode(e[o]);
                    return r.join("");
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText);
            }, i1 && (this.formData = function() {
                return this.text().then(E);
            }), this.json = function() {
                return this.text().then(JSON.parse);
            }, this;
        }
        c.prototype.append = function(t, e) {
            t = u(t), e = d(e);
            var r = this.map[t];
            this.map[t] = r ? r + ", " + e : e;
        }, c.prototype.delete = function(t) {
            delete this.map[u(t)];
        }, c.prototype.get = function(t) {
            return t = u(t), this.has(t) ? this.map[t] : null;
        }, c.prototype.has = function(t) {
            return this.map.hasOwnProperty(u(t));
        }, c.prototype.set = function(t, e) {
            this.map[u(t)] = d(e);
        }, c.prototype.forEach = function(t, e) {
            for(var r in this.map)this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this);
        }, c.prototype.keys = function() {
            var t = [];
            return this.forEach(function(e, r) {
                t.push(r);
            }), f(t);
        }, c.prototype.values = function() {
            var t = [];
            return this.forEach(function(e) {
                t.push(e);
            }), f(t);
        }, c.prototype.entries = function() {
            var t = [];
            return this.forEach(function(e, r) {
                t.push([
                    r,
                    e
                ]);
            }), f(t);
        }, o1 && (c.prototype[Symbol.iterator] = c.prototype.entries);
        var w = [
            "DELETE",
            "GET",
            "HEAD",
            "OPTIONS",
            "POST",
            "PUT"
        ];
        function v(t, e) {
            var r, o, n = (e = e || {}).body;
            if (t instanceof v) {
                if (t.bodyUsed) throw new TypeError("Already read");
                this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new c(t.headers)), this.method = t.method, this.mode = t.mode, this.signal = t.signal, n || null == t._bodyInit || (n = t._bodyInit, t.bodyUsed = !0);
            } else this.url = String(t);
            if (this.credentials = e.credentials || this.credentials || "same-origin", !e.headers && this.headers || (this.headers = new c(e.headers)), this.method = (r = e.method || this.method || "GET", o = r.toUpperCase(), w.indexOf(o) > -1 ? o : r), this.mode = e.mode || this.mode || null, this.signal = e.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(n);
        }
        function E(t4) {
            var e = new FormData;
            return t4.trim().split("&").forEach(function(t) {
                if (t) {
                    var r = t.split("="), o = r.shift().replace(/\+/g, " "), n = r.join("=").replace(/\+/g, " ");
                    e.append(decodeURIComponent(o), decodeURIComponent(n));
                }
            }), e;
        }
        function A(t, e) {
            e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new c(e.headers), this.url = e.url || "", this._initBody(t);
        }
        v.prototype.clone = function() {
            return new v(this, {
                body: this._bodyInit
            });
        }, m.call(v.prototype), m.call(A.prototype), A.prototype.clone = function() {
            return new A(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new c(this.headers),
                url: this.url
            });
        }, A.error = function() {
            var t = new A(null, {
                status: 0,
                statusText: ""
            });
            return t.type = "error", t;
        };
        var _ = [
            301,
            302,
            303,
            307,
            308
        ];
        A.redirect = function(t, e) {
            if (-1 === _.indexOf(e)) throw new RangeError("Invalid status code");
            return new A(null, {
                status: e,
                headers: {
                    location: t
                }
            });
        }, e1.DOMException = t1.DOMException;
        try {
            new e1.DOMException;
        } catch (t5) {
            e1.DOMException = function(t, e) {
                this.message = t, this.name = e;
                var r = Error(t);
                this.stack = r.stack;
            }, e1.DOMException.prototype = Object.create(Error.prototype), e1.DOMException.prototype.constructor = e1.DOMException;
        }
        function g(t6, r3) {
            return new Promise(function(o3, i) {
                var s = new v(t6, r3);
                if (s.signal && s.signal.aborted) return i(new e1.DOMException("Aborted", "AbortError"));
                var a = new XMLHttpRequest;
                function h() {
                    a.abort();
                }
                a.onload = function() {
                    var t7, e, r4 = {
                        status: a.status,
                        statusText: a.statusText,
                        headers: (t7 = a.getAllResponseHeaders() || "", e = new c, t7.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(t) {
                            var r = t.split(":"), o = r.shift().trim();
                            if (o) {
                                var n = r.join(":").trim();
                                e.append(o, n);
                            }
                        }), e)
                    };
                    r4.url = "responseURL" in a ? a.responseURL : r4.headers.get("X-Request-URL");
                    var n2 = "response" in a ? a.response : a.responseText;
                    o3(new A(n2, r4));
                }, a.onerror = function() {
                    i(new TypeError("Network request failed"));
                }, a.ontimeout = function() {
                    i(new TypeError("Network request failed"));
                }, a.onabort = function() {
                    i(new e1.DOMException("Aborted", "AbortError"));
                }, a.open(s.method, s.url, !0), "include" === s.credentials ? a.withCredentials = !0 : "omit" === s.credentials && (a.withCredentials = !1), "responseType" in a && n1 && (a.responseType = "blob"), s.headers.forEach(function(t, e) {
                    a.setRequestHeader(e, t);
                }), s.signal && (s.signal.addEventListener("abort", h), a.onreadystatechange = function() {
                    4 === a.readyState && s.signal.removeEventListener("abort", h);
                }), a.send(void 0 === s._bodyInit ? null : s._bodyInit);
            });
        }
        g.polyfill = !0, t1.fetch || (t1.fetch = g, t1.Headers = c, t1.Request = v, t1.Response = A), e1.Headers = c, e1.Request = v, e1.Response = A, e1.fetch = g, Object.defineProperty(e1, "__esModule", {
            value: !0
        });
    }({});
}("undefined" != typeof self ? self : void 0); //# sourceMappingURL=cross-fetch.js.map

//# sourceMappingURL=cross-fetch.js.map