"use strict";
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.supabase = t() : e.supabase = t();
}(self, function() {
    return (()=>{
        var e1 = {
            271: (e2, t2, r2)=>{
                "use strict";
                r2.r(t2), r2.d(t2, {
                    GoTrueApi: ()=>b
                    ,
                    GoTrueClient: ()=>T
                });
                var s1 = r2(98), n1 = r2.n(s1), i1 = function(e3, t3, r, s) {
                    return new (r || (r = Promise))(function(n, i) {
                        function o(e) {
                            try {
                                h(s.next(e));
                            } catch (e4) {
                                i(e4);
                            }
                        }
                        function a(e) {
                            try {
                                h(s.throw(e));
                            } catch (e5) {
                                i(e5);
                            }
                        }
                        function h(e6) {
                            var t;
                            e6.done ? n(e6.value) : (t = e6.value, t instanceof r ? t : new r(function(e) {
                                e(t);
                            })).then(o, a);
                        }
                        h((s = s.apply(e3, t3 || [])).next());
                    });
                };
                const o1 = (e)=>e.msg || e.message || e.error_description || e.error || JSON.stringify(e)
                ;
                function a1(e7 = n1(), t4, r3, s2, a) {
                    return i1(this, void 0, void 0, function*() {
                        return new Promise((n, i)=>{
                            e7(r3, ((e, t, r)=>{
                                const s = {
                                    method: e,
                                    headers: (null == t ? void 0 : t.headers) || {}
                                };
                                return "GET" === e || (s.headers = Object.assign({
                                    "Content-Type": "text/plain;charset=UTF-8"
                                }, null == t ? void 0 : t.headers), s.body = JSON.stringify(r)), s;
                            })(t4, s2, a)).then((e)=>{
                                if (!e.ok) throw e;
                                return (null == s2 ? void 0 : s2.noResolveJson) ? n : e.json();
                            }).then((e)=>n(e)
                            ).catch((e8)=>((e, t)=>{
                                    if ("function" != typeof e.json) return t(e);
                                    e.json().then((r)=>t({
                                            message: o1(r),
                                            status: (null == e ? void 0 : e.status) || 500
                                        })
                                    );
                                })(e8, i)
                            );
                        });
                    });
                }
                function h1(e, t, r) {
                    return i1(this, void 0, void 0, function*() {
                        return a1(e, "GET", t, r);
                    });
                }
                function c1(e, t, r, s) {
                    return i1(this, void 0, void 0, function*() {
                        return a1(e, "POST", t, s, r);
                    });
                }
                function u1(e, t, r, s) {
                    return i1(this, void 0, void 0, function*() {
                        return a1(e, "PUT", t, s, r);
                    });
                }
                const l = "supabase.auth.token", d = {
                    name: "sb:token",
                    lifetime: 28800,
                    domain: "",
                    path: "/",
                    sameSite: "lax"
                };
                function p(e9, t5, r4) {
                    const s3 = r4.map((t6)=>{
                        return r5 = t6, s4 = (function(e) {
                            if (!e || !e.headers || !e.headers.host) throw new Error('The "host" request header is not available');
                            const t = e.headers.host.indexOf(":") > -1 && e.headers.host.split(":")[0] || e.headers.host;
                            return !([
                                "localhost",
                                "127.0.0.1"
                            ].indexOf(t) > -1 || t.endsWith(".local"));
                        })(e9), (function(e, t, r) {
                            const s = r || {}, n = encodeURIComponent, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
                            if ("function" != typeof n) throw new TypeError("option encode is invalid");
                            if (!i.test(e)) throw new TypeError("argument name is invalid");
                            const o = n(t);
                            if (o && !i.test(o)) throw new TypeError("argument val is invalid");
                            let a = e + "=" + o;
                            if (null != s.maxAge) {
                                const e = s.maxAge - 0;
                                if (isNaN(e) || !isFinite(e)) throw new TypeError("option maxAge is invalid");
                                a += "; Max-Age=" + Math.floor(e);
                            }
                            if (s.domain) {
                                if (!i.test(s.domain)) throw new TypeError("option domain is invalid");
                                a += "; Domain=" + s.domain;
                            }
                            if (s.path) {
                                if (!i.test(s.path)) throw new TypeError("option path is invalid");
                                a += "; Path=" + s.path;
                            }
                            if (s.expires) {
                                if ("function" != typeof s.expires.toUTCString) throw new TypeError("option expires is invalid");
                                a += "; Expires=" + s.expires.toUTCString();
                            }
                            if (s.httpOnly && (a += "; HttpOnly"), s.secure && (a += "; Secure"), s.sameSite) switch("string" == typeof s.sameSite ? s.sameSite.toLowerCase() : s.sameSite){
                                case "lax":
                                    a += "; SameSite=Lax";
                                    break;
                                case "strict":
                                    a += "; SameSite=Strict";
                                    break;
                                case "none":
                                    a += "; SameSite=None";
                                    break;
                                default:
                                    throw new TypeError("option sameSite is invalid");
                            }
                            return a;
                        })(r5.name, r5.value, {
                            maxAge: r5.maxAge,
                            expires: new Date(Date.now() + 1000 * r5.maxAge),
                            httpOnly: !0,
                            secure: s4,
                            path: null !== (n3 = r5.path) && void 0 !== n3 ? n3 : "/",
                            domain: null !== (i2 = r5.domain) && void 0 !== i2 ? i2 : "",
                            sameSite: null !== (o2 = r5.sameSite) && void 0 !== o2 ? o2 : "lax"
                        });
                        var r5, s4, n3, i2, o2;
                    }), n2 = t5.getHeader("Set-Cookie");
                    n2 && (n2 instanceof Array ? Array.prototype.push.apply(s3, n2) : "string" == typeof n2 && s3.push(n2)), t5.setHeader("Set-Cookie", s3);
                }
                function f(e, t, r) {
                    p(e, t, [
                        r
                    ]);
                }
                function m(e) {
                    return Math.round(Date.now() / 1000) + e;
                }
                const v = ()=>"undefined" != typeof window
                ;
                function y(e, t) {
                    var r;
                    t || (t = (null === (r = null === window || void 0 === window ? void 0 : window.location) || void 0 === r ? void 0 : r.href) || ""), e = e.replace(/[\[\]]/g, "\\$&");
                    const s = new RegExp("[?&#]" + e + "(=([^&#]*)|&|#|$)").exec(t);
                    return s ? s[2] ? decodeURIComponent(s[2].replace(/\+/g, " ")) : "" : null;
                }
                var g = function(e10, t7, r, s) {
                    return new (r || (r = Promise))(function(n, i) {
                        function o(e) {
                            try {
                                h(s.next(e));
                            } catch (e11) {
                                i(e11);
                            }
                        }
                        function a(e) {
                            try {
                                h(s.throw(e));
                            } catch (e12) {
                                i(e12);
                            }
                        }
                        function h(e13) {
                            var t;
                            e13.done ? n(e13.value) : (t = e13.value, t instanceof r ? t : new r(function(e) {
                                e(t);
                            })).then(o, a);
                        }
                        h((s = s.apply(e10, t7 || [])).next());
                    });
                };
                let b = class b {
                    _createRequestHeaders(e) {
                        const t = Object.assign({}, this.headers);
                        return t.Authorization = `Bearer ${e}`, t;
                    }
                    cookieName() {
                        var e;
                        return null !== (e = this.cookieOptions.name) && void 0 !== e ? e : "";
                    }
                    getUrlForProvider(e, t) {
                        const r = [
                            `provider=${encodeURIComponent(e)}`
                        ];
                        return (null == t ? void 0 : t.redirectTo) && r.push(`redirect_to=${encodeURIComponent(t.redirectTo)}`), (null == t ? void 0 : t.scopes) && r.push(`scopes=${encodeURIComponent(t.scopes)}`), `${this.url}/authorize?${r.join("&")}`;
                    }
                    signUpWithEmail(e14, t, r = {}) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const s = Object.assign({}, this.headers);
                                let n = "";
                                r.redirectTo && (n = "?redirect_to=" + encodeURIComponent(r.redirectTo));
                                const i = yield c1(this.fetch, `${this.url}/signup${n}`, {
                                    email: e14,
                                    password: t,
                                    data: r.data,
                                    gotrue_meta_security: {
                                        hcaptcha_token: r.captchaToken
                                    }
                                }, {
                                    headers: s
                                }), o = Object.assign({}, i);
                                return o.expires_in && (o.expires_at = m(i.expires_in)), {
                                    data: o,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    signInWithEmail(e15, t, r = {}) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const s = Object.assign({}, this.headers);
                                let n = "?grant_type=password";
                                r.redirectTo && (n += "&redirect_to=" + encodeURIComponent(r.redirectTo));
                                const i = yield c1(this.fetch, `${this.url}/token${n}`, {
                                    email: e15,
                                    password: t
                                }, {
                                    headers: s
                                }), o = Object.assign({}, i);
                                return o.expires_in && (o.expires_at = m(i.expires_in)), {
                                    data: o,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    signUpWithPhone(e16, t, r = {}) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const s = Object.assign({}, this.headers), n = yield c1(this.fetch, `${this.url}/signup`, {
                                    phone: e16,
                                    password: t,
                                    data: r.data,
                                    gotrue_meta_security: {
                                        hcaptcha_token: r.captchaToken
                                    }
                                }, {
                                    headers: s
                                }), i = Object.assign({}, n);
                                return i.expires_in && (i.expires_at = m(n.expires_in)), {
                                    data: i,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    signInWithPhone(e17, t) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const r = Object.assign({}, this.headers), s = "?grant_type=password", n = yield c1(this.fetch, `${this.url}/token${s}`, {
                                    phone: e17,
                                    password: t
                                }, {
                                    headers: r
                                }), i = Object.assign({}, n);
                                return i.expires_in && (i.expires_at = m(n.expires_in)), {
                                    data: i,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    sendMagicLinkEmail(e18, t = {}) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const r = Object.assign({}, this.headers);
                                let s = "";
                                return t.redirectTo && (s += "?redirect_to=" + encodeURIComponent(t.redirectTo)), {
                                    data: yield c1(this.fetch, `${this.url}/magiclink${s}`, {
                                        email: e18,
                                        gotrue_meta_security: {
                                            hcaptcha_token: t.captchaToken
                                        }
                                    }, {
                                        headers: r
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    sendMobileOTP(e19, t = {}) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                let r = Object.assign({}, this.headers);
                                return {
                                    data: yield c1(this.fetch, `${this.url}/otp`, {
                                        phone: e19,
                                        gotrue_meta_security: {
                                            hcaptcha_token: t.captchaToken
                                        }
                                    }, {
                                        headers: r
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    signOut(e20) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                return yield c1(this.fetch, `${this.url}/logout`, {}, {
                                    headers: this._createRequestHeaders(e20),
                                    noResolveJson: !0
                                }), {
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    error: e
                                };
                            }
                        });
                    }
                    verifyMobileOTP(e21, t, r = {}) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const s = Object.assign({}, this.headers);
                                return {
                                    data: yield c1(this.fetch, `${this.url}/verify`, {
                                        phone: e21,
                                        token: t,
                                        type: "sms",
                                        redirect_to: r.redirectTo
                                    }, {
                                        headers: s
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    inviteUserByEmail(e22, t = {}) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const r = Object.assign({}, this.headers);
                                let s = "";
                                return t.redirectTo && (s += "?redirect_to=" + encodeURIComponent(t.redirectTo)), {
                                    data: yield c1(this.fetch, `${this.url}/invite${s}`, {
                                        email: e22,
                                        data: t.data
                                    }, {
                                        headers: r
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    resetPasswordForEmail(e23, t = {}) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const r = Object.assign({}, this.headers);
                                let s = "";
                                return t.redirectTo && (s += "?redirect_to=" + encodeURIComponent(t.redirectTo)), {
                                    data: yield c1(this.fetch, `${this.url}/recover${s}`, {
                                        email: e23,
                                        gotrue_meta_security: {
                                            hcaptcha_token: t.captchaToken
                                        }
                                    }, {
                                        headers: r
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    refreshAccessToken(e24) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const t = yield c1(this.fetch, `${this.url}/token?grant_type=refresh_token`, {
                                    refresh_token: e24
                                }, {
                                    headers: this.headers
                                }), r = Object.assign({}, t);
                                return r.expires_in && (r.expires_at = m(t.expires_in)), {
                                    data: r,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    setAuthCookie(e25, t8) {
                        var r6;
                        "POST" !== e25.method && (t8.setHeader("Allow", "POST"), t8.status(405).end("Method Not Allowed"));
                        const { event: s , session: n  } = e25.body;
                        if (!s) throw new Error("Auth event missing!");
                        if ("SIGNED_IN" === s) {
                            if (!n) throw new Error("Auth session missing!");
                            f(e25, t8, {
                                name: this.cookieName(),
                                value: n.access_token,
                                domain: this.cookieOptions.domain,
                                maxAge: null !== (r6 = this.cookieOptions.lifetime) && void 0 !== r6 ? r6 : 0,
                                path: this.cookieOptions.path,
                                sameSite: this.cookieOptions.sameSite
                            });
                        }
                        "SIGNED_OUT" === s && (function(e, t, r) {
                            f(e, t, {
                                name: r,
                                value: "",
                                maxAge: -1
                            });
                        })(e25, t8, this.cookieName()), t8.status(200).json({});
                    }
                    generateLink(e26, t, r = {}) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                return {
                                    data: yield c1(this.fetch, `${this.url}/admin/generate_link`, {
                                        type: e26,
                                        email: t,
                                        password: r.password,
                                        data: r.data,
                                        redirect_to: r.redirectTo
                                    }, {
                                        headers: this.headers
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    createUser(e27) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const t = yield c1(this.fetch, `${this.url}/admin/users`, e27, {
                                    headers: this.headers
                                });
                                return {
                                    user: t,
                                    data: t,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    user: null,
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    listUsers() {
                        return g(this, void 0, void 0, function*() {
                            try {
                                return {
                                    data: (yield h1(this.fetch, `${this.url}/admin/users`, {
                                        headers: this.headers
                                    })).users,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    getUserById(e28) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                return {
                                    data: yield h1(this.fetch, `${this.url}/admin/users/${e28}`, {
                                        headers: this.headers
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    getUserByCookie(e29) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                if (!e29.cookies) throw new Error("Not able to parse cookies! When using Express make sure the cookie-parser middleware is in use!");
                                const t = e29.cookies[this.cookieName()];
                                if (!t) throw new Error("No cookie found!");
                                const { user: r , error: s  } = yield this.getUser(t);
                                if (s) throw s;
                                return {
                                    token: t,
                                    user: r,
                                    data: r,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    token: null,
                                    user: null,
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    updateUserById(e30, t) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const r = yield u1(this.fetch, `${this.url}/admin/users/${e30}`, t, {
                                    headers: this.headers
                                });
                                return {
                                    user: r,
                                    data: r,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    user: null,
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    deleteUser(e31) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const t9 = yield function(e, t, r, s) {
                                    return i1(this, void 0, void 0, function*() {
                                        return a1(e, "DELETE", t, s, r);
                                    });
                                }(this.fetch, `${this.url}/admin/users/${e31}`, {}, {
                                    headers: this.headers
                                });
                                return {
                                    user: t9,
                                    data: t9,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    user: null,
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    getUser(e32) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const t = yield h1(this.fetch, `${this.url}/user`, {
                                    headers: this._createRequestHeaders(e32)
                                });
                                return {
                                    user: t,
                                    data: t,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    user: null,
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    updateUser(e33, t) {
                        return g(this, void 0, void 0, function*() {
                            try {
                                const r = yield u1(this.fetch, `${this.url}/user`, t, {
                                    headers: this._createRequestHeaders(e33)
                                });
                                return {
                                    user: r,
                                    data: r,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    user: null,
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    constructor({ url: e = "" , headers: t = {} , cookieOptions: r , fetch: s  }){
                        this.url = e, this.headers = t, this.cookieOptions = Object.assign(Object.assign({}, d), r), this.fetch = s;
                    }
                };
                var _ = function(e34, t11, r, s) {
                    return new (r || (r = Promise))(function(n, i) {
                        function o(e) {
                            try {
                                h(s.next(e));
                            } catch (e35) {
                                i(e35);
                            }
                        }
                        function a(e) {
                            try {
                                h(s.throw(e));
                            } catch (e36) {
                                i(e36);
                            }
                        }
                        function h(e37) {
                            var t;
                            e37.done ? n(e37.value) : (t = e37.value, t instanceof r ? t : new r(function(e) {
                                e(t);
                            })).then(o, a);
                        }
                        h((s = s.apply(e34, t11 || [])).next());
                    });
                };
                !function() {
                    if ("object" != typeof globalThis) try {
                        Object.defineProperty(Object.prototype, "__magic__", {
                            get: function() {
                                return this;
                            },
                            configurable: !0
                        }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
                    } catch (e) {
                        "undefined" != typeof self && (self.globalThis = self);
                    }
                }();
                const w = {
                    url: "http://localhost:9999",
                    autoRefreshToken: !0,
                    persistSession: !0,
                    detectSessionInUrl: !0,
                    multiTab: !0,
                    headers: {
                        "X-Client-Info": "gotrue-js/1.22.0"
                    }
                };
                let T = class T {
                    signUp({ email: e38 , password: t , phone: r  }, s = {}) {
                        return _(this, void 0, void 0, function*() {
                            try {
                                this._removeSession();
                                const { data: n , error: i  } = r && t ? yield this.api.signUpWithPhone(r, t, {
                                    data: s.data,
                                    captchaToken: s.captchaToken
                                }) : yield this.api.signUpWithEmail(e38, t, {
                                    redirectTo: s.redirectTo,
                                    data: s.data,
                                    captchaToken: s.captchaToken
                                });
                                if (i) throw i;
                                if (!n) throw "An error occurred on sign up.";
                                let o = null, a = null;
                                return n.access_token && (o = n, a = o.user, this._saveSession(o), this._notifyAllSubscribers("SIGNED_IN")), n.id && (a = n), {
                                    user: a,
                                    session: o,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    user: null,
                                    session: null,
                                    error: e
                                };
                            }
                        });
                    }
                    signIn({ email: e39 , phone: t12 , password: r , refreshToken: s , provider: n  }, i = {}) {
                        return _(this, void 0, void 0, function*() {
                            try {
                                if (this._removeSession(), e39 && !r) {
                                    const { error: t  } = yield this.api.sendMagicLinkEmail(e39, {
                                        redirectTo: i.redirectTo,
                                        captchaToken: i.captchaToken
                                    });
                                    return {
                                        user: null,
                                        session: null,
                                        error: t
                                    };
                                }
                                if (e39 && r) return this._handleEmailSignIn(e39, r, {
                                    redirectTo: i.redirectTo
                                });
                                if (t12 && !r) {
                                    const { error: e  } = yield this.api.sendMobileOTP(t12, {
                                        captchaToken: i.captchaToken
                                    });
                                    return {
                                        user: null,
                                        session: null,
                                        error: e
                                    };
                                }
                                if (t12 && r) return this._handlePhoneSignIn(t12, r);
                                if (s) {
                                    const { error: e  } = yield this._callRefreshToken(s);
                                    if (e) throw e;
                                    return {
                                        user: this.currentUser,
                                        session: this.currentSession,
                                        error: null
                                    };
                                }
                                if (n) return this._handleProviderSignIn(n, {
                                    redirectTo: i.redirectTo,
                                    scopes: i.scopes
                                });
                                throw new Error("You must provide either an email, phone number or a third-party provider.");
                            } catch (e) {
                                return {
                                    user: null,
                                    session: null,
                                    error: e
                                };
                            }
                        });
                    }
                    verifyOTP({ phone: e40 , token: t  }, r = {}) {
                        return _(this, void 0, void 0, function*() {
                            try {
                                this._removeSession();
                                const { data: s , error: n  } = yield this.api.verifyMobileOTP(e40, t, r);
                                if (n) throw n;
                                if (!s) throw "An error occurred on token verification.";
                                let i = null, o = null;
                                return s.access_token && (i = s, o = i.user, this._saveSession(i), this._notifyAllSubscribers("SIGNED_IN")), s.id && (o = s), {
                                    user: o,
                                    session: i,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    user: null,
                                    session: null,
                                    error: e
                                };
                            }
                        });
                    }
                    user() {
                        return this.currentUser;
                    }
                    session() {
                        return this.currentSession;
                    }
                    refreshSession() {
                        var e41;
                        return _(this, void 0, void 0, function*() {
                            try {
                                if (!(null === (e41 = this.currentSession) || void 0 === e41 ? void 0 : e41.access_token)) throw new Error("Not logged in.");
                                const { error: t  } = yield this._callRefreshToken();
                                if (t) throw t;
                                return {
                                    data: this.currentSession,
                                    user: this.currentUser,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    user: null,
                                    error: e
                                };
                            }
                        });
                    }
                    update(e42) {
                        var t;
                        return _(this, void 0, void 0, function*() {
                            try {
                                if (!(null === (t = this.currentSession) || void 0 === t ? void 0 : t.access_token)) throw new Error("Not logged in.");
                                const { user: r , error: s  } = yield this.api.updateUser(this.currentSession.access_token, e42);
                                if (s) throw s;
                                if (!r) throw Error("Invalid user data.");
                                const n = Object.assign(Object.assign({}, this.currentSession), {
                                    user: r
                                });
                                return this._saveSession(n), this._notifyAllSubscribers("USER_UPDATED"), {
                                    data: r,
                                    user: r,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    user: null,
                                    error: e
                                };
                            }
                        });
                    }
                    setSession(e43) {
                        return _(this, void 0, void 0, function*() {
                            try {
                                if (!e43) throw new Error("No current session.");
                                const { data: t , error: r  } = yield this.api.refreshAccessToken(e43);
                                return r ? {
                                    session: null,
                                    error: r
                                } : (this._saveSession(t), this._notifyAllSubscribers("SIGNED_IN"), {
                                    session: t,
                                    error: null
                                });
                            } catch (e) {
                                return {
                                    error: e,
                                    session: null
                                };
                            }
                        });
                    }
                    setAuth(e) {
                        return this.currentSession = Object.assign(Object.assign({}, this.currentSession), {
                            access_token: e,
                            token_type: "bearer",
                            user: null
                        }), this.currentSession;
                    }
                    getSessionFromUrl(e44) {
                        return _(this, void 0, void 0, function*() {
                            try {
                                if (!v()) throw new Error("No browser detected.");
                                const t = y("error_description");
                                if (t) throw new Error(t);
                                const r = y("provider_token"), s = y("access_token");
                                if (!s) throw new Error("No access_token detected.");
                                const n = y("expires_in");
                                if (!n) throw new Error("No expires_in detected.");
                                const i = y("refresh_token");
                                if (!i) throw new Error("No refresh_token detected.");
                                const o = y("token_type");
                                if (!o) throw new Error("No token_type detected.");
                                const a = Math.round(Date.now() / 1000) + parseInt(n), { user: h , error: c  } = yield this.api.getUser(s);
                                if (c) throw c;
                                const u = {
                                    provider_token: r,
                                    access_token: s,
                                    expires_in: parseInt(n),
                                    expires_at: a,
                                    refresh_token: i,
                                    token_type: o,
                                    user: h
                                };
                                if (null == e44 ? void 0 : e44.storeSession) {
                                    this._saveSession(u);
                                    const e = y("type");
                                    this._notifyAllSubscribers("SIGNED_IN"), "recovery" === e && this._notifyAllSubscribers("PASSWORD_RECOVERY");
                                }
                                return window.location.hash = "", {
                                    data: u,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    signOut() {
                        var e45;
                        return _(this, void 0, void 0, function*() {
                            const t = null === (e45 = this.currentSession) || void 0 === e45 ? void 0 : e45.access_token;
                            if (this._removeSession(), this._notifyAllSubscribers("SIGNED_OUT"), t) {
                                const { error: e  } = yield this.api.signOut(t);
                                if (e) return {
                                    error: e
                                };
                            }
                            return {
                                error: null
                            };
                        });
                    }
                    onAuthStateChange(e46) {
                        try {
                            const t13 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                                const t = 16 * Math.random() | 0;
                                return ("x" == e ? t : 3 & t | 8).toString(16);
                            }), r = {
                                id: t13,
                                callback: e46,
                                unsubscribe: ()=>{
                                    this.stateChangeEmitters.delete(t13);
                                }
                            };
                            return this.stateChangeEmitters.set(t13, r), {
                                data: r,
                                error: null
                            };
                        } catch (e) {
                            return {
                                data: null,
                                error: e
                            };
                        }
                    }
                    _handleEmailSignIn(e47, t, r = {}) {
                        var s, n;
                        return _(this, void 0, void 0, function*() {
                            try {
                                const { data: i , error: o  } = yield this.api.signInWithEmail(e47, t, {
                                    redirectTo: r.redirectTo
                                });
                                return o || !i ? {
                                    data: null,
                                    user: null,
                                    session: null,
                                    error: o
                                } : (((null === (s = null == i ? void 0 : i.user) || void 0 === s ? void 0 : s.confirmed_at) || (null === (n = null == i ? void 0 : i.user) || void 0 === n ? void 0 : n.email_confirmed_at)) && (this._saveSession(i), this._notifyAllSubscribers("SIGNED_IN")), {
                                    data: i,
                                    user: i.user,
                                    session: i,
                                    error: null
                                });
                            } catch (e) {
                                return {
                                    data: null,
                                    user: null,
                                    session: null,
                                    error: e
                                };
                            }
                        });
                    }
                    _handlePhoneSignIn(e48, t) {
                        var r;
                        return _(this, void 0, void 0, function*() {
                            try {
                                const { data: s , error: n  } = yield this.api.signInWithPhone(e48, t);
                                return n || !s ? {
                                    data: null,
                                    user: null,
                                    session: null,
                                    error: n
                                } : ((null === (r = null == s ? void 0 : s.user) || void 0 === r ? void 0 : r.phone_confirmed_at) && (this._saveSession(s), this._notifyAllSubscribers("SIGNED_IN")), {
                                    data: s,
                                    user: s.user,
                                    session: s,
                                    error: null
                                });
                            } catch (e) {
                                return {
                                    data: null,
                                    user: null,
                                    session: null,
                                    error: e
                                };
                            }
                        });
                    }
                    _handleProviderSignIn(e, t = {}) {
                        const r = this.api.getUrlForProvider(e, {
                            redirectTo: t.redirectTo,
                            scopes: t.scopes
                        });
                        try {
                            return v() && (window.location.href = r), {
                                provider: e,
                                url: r,
                                data: null,
                                session: null,
                                user: null,
                                error: null
                            };
                        } catch (t15) {
                            return r ? {
                                provider: e,
                                url: r,
                                data: null,
                                session: null,
                                user: null,
                                error: null
                            } : {
                                data: null,
                                user: null,
                                session: null,
                                error: t15
                            };
                        }
                    }
                    _recoverSession() {
                        var e;
                        try {
                            const t = v() && (null === (e = this.localStorage) || void 0 === e ? void 0 : e.getItem(l));
                            if (!t || "string" != typeof t) return null;
                            const r = JSON.parse(t), { currentSession: s , expiresAt: n  } = r;
                            n >= Math.round(Date.now() / 1000) && (null == s ? void 0 : s.user) && (this._saveSession(s), this._notifyAllSubscribers("SIGNED_IN"));
                        } catch (e49) {
                            console.log("error", e49);
                        }
                    }
                    _recoverAndRefresh() {
                        return _(this, void 0, void 0, function*() {
                            try {
                                const e = v() && (yield this.localStorage.getItem(l));
                                if (!e) return null;
                                const t = JSON.parse(e), { currentSession: r , expiresAt: s  } = t;
                                if (s < Math.round(Date.now() / 1000)) if (this.autoRefreshToken && r.refresh_token) {
                                    const { error: e  } = yield this._callRefreshToken(r.refresh_token);
                                    e && (console.log(e.message), yield this._removeSession());
                                } else this._removeSession();
                                else r && r.user ? (this._saveSession(r), this._notifyAllSubscribers("SIGNED_IN")) : (console.log("Current session is missing data."), this._removeSession());
                            } catch (e) {
                                return console.error(e), null;
                            }
                        });
                    }
                    _callRefreshToken(e50) {
                        var t16;
                        return void 0 === e50 && (e50 = null === (t16 = this.currentSession) || void 0 === t16 ? void 0 : t16.refresh_token), _(this, void 0, void 0, function*() {
                            try {
                                if (!e50) throw new Error("No current session.");
                                const { data: t , error: r  } = yield this.api.refreshAccessToken(e50);
                                if (r) throw r;
                                if (!t) throw Error("Invalid session data.");
                                return this._saveSession(t), this._notifyAllSubscribers("TOKEN_REFRESHED"), this._notifyAllSubscribers("SIGNED_IN"), {
                                    data: t,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    _notifyAllSubscribers(e) {
                        this.stateChangeEmitters.forEach((t)=>t.callback(e, this.currentSession)
                        );
                    }
                    _saveSession(e) {
                        this.currentSession = e, this.currentUser = e.user;
                        const t = e.expires_at;
                        if (t) {
                            const e = t - Math.round(Date.now() / 1000), r = e > 60 ? 60 : 0.5;
                            this._startAutoRefreshToken(1000 * (e - r));
                        }
                        this.persistSession && e.expires_at && this._persistSession(this.currentSession);
                    }
                    _persistSession(e) {
                        const t = {
                            currentSession: e,
                            expiresAt: e.expires_at
                        };
                        v() && this.localStorage.setItem(l, JSON.stringify(t));
                    }
                    _removeSession() {
                        return _(this, void 0, void 0, function*() {
                            this.currentSession = null, this.currentUser = null, this.refreshTokenTimer && clearTimeout(this.refreshTokenTimer), v() && (yield this.localStorage.removeItem(l));
                        });
                    }
                    _startAutoRefreshToken(e) {
                        this.refreshTokenTimer && clearTimeout(this.refreshTokenTimer), e <= 0 || !this.autoRefreshToken || (this.refreshTokenTimer = setTimeout(()=>this._callRefreshToken()
                        , e), "function" == typeof this.refreshTokenTimer.unref && this.refreshTokenTimer.unref());
                    }
                    _listenForMultiTabEvents() {
                        if (!this.multiTab || !v() || !(null === window || void 0 === window ? void 0 : window.addEventListener)) return !1;
                        try {
                            null === window || void 0 === window || window.addEventListener("storage", (e)=>{
                                var t;
                                if (e.key === l) {
                                    const r = JSON.parse(String(e.newValue));
                                    (null === (t = null == r ? void 0 : r.currentSession) || void 0 === t ? void 0 : t.access_token) ? (this._recoverAndRefresh(), this._notifyAllSubscribers("SIGNED_IN")) : (this._removeSession(), this._notifyAllSubscribers("SIGNED_OUT"));
                                }
                            });
                        } catch (e) {
                            console.error("_listenForMultiTabEvents", e);
                        }
                    }
                    constructor(e51){
                        this.stateChangeEmitters = new Map;
                        const t = Object.assign(Object.assign({}, w), e51);
                        this.currentUser = null, this.currentSession = null, this.autoRefreshToken = t.autoRefreshToken, this.persistSession = t.persistSession, this.multiTab = t.multiTab, this.localStorage = t.localStorage || globalThis.localStorage, this.api = new b({
                            url: t.url,
                            headers: t.headers,
                            cookieOptions: t.cookieOptions,
                            fetch: t.fetch
                        }), this._recoverSession(), this._recoverAndRefresh(), this._listenForMultiTabEvents(), t.detectSessionInUrl && v() && y("access_token") && this.getSessionFromUrl({
                            storeSession: !0
                        }).then(({ error: e  })=>{
                            e && console.error("Error getting session from URL.", e);
                        });
                    }
                };
            },
            501: (e52, t17, r7)=>{
                "use strict";
                r7.r(t17), r7.d(t17, {
                    PostgrestBuilder: ()=>i3
                    ,
                    PostgrestClient: ()=>l
                    ,
                    PostgrestFilterBuilder: ()=>a2
                    ,
                    PostgrestQueryBuilder: ()=>h2
                });
                var s5 = r7(98), n4 = r7.n(s5);
                let i3 = class i {
                    throwOnError() {
                        return this.shouldThrowOnError = !0, this;
                    }
                    then(e53, t18) {
                        void 0 === this.schema || ([
                            "GET",
                            "HEAD"
                        ].includes(this.method) ? this.headers["Accept-Profile"] = this.schema : this.headers["Content-Profile"] = this.schema), "GET" !== this.method && "HEAD" !== this.method && (this.headers["Content-Type"] = "application/json");
                        let r8 = this.fetch(this.url.toString(), {
                            method: this.method,
                            headers: this.headers,
                            body: JSON.stringify(this.body),
                            signal: this.signal
                        }).then((e54)=>{
                            return t19 = this, r9 = void 0, n5 = function*() {
                                var t, r, s;
                                let n = null, i = null, o = null;
                                if (e54.ok) {
                                    const n = null === (t = this.headers.Prefer) || void 0 === t ? void 0 : t.split(",").includes("return=minimal");
                                    if ("HEAD" !== this.method && !n) {
                                        const t = yield e54.text();
                                        t && (i = "text/csv" === this.headers.Accept ? t : JSON.parse(t));
                                    }
                                    const a = null === (r = this.headers.Prefer) || void 0 === r ? void 0 : r.match(/count=(exact|planned|estimated)/), h = null === (s = e54.headers.get("content-range")) || void 0 === s ? void 0 : s.split("/");
                                    a && h && h.length > 1 && (o = parseInt(h[1]));
                                } else {
                                    const t = yield e54.text();
                                    try {
                                        n = JSON.parse(t);
                                    } catch (e) {
                                        n = {
                                            message: t
                                        };
                                    }
                                    if (n && this.shouldThrowOnError) throw n;
                                }
                                return {
                                    error: n,
                                    data: i,
                                    count: o,
                                    status: e54.status,
                                    statusText: e54.statusText,
                                    body: i
                                };
                            }, new ((s6 = void 0) || (s6 = Promise))(function(e55, i) {
                                function o(e) {
                                    try {
                                        h(n5.next(e));
                                    } catch (e56) {
                                        i(e56);
                                    }
                                }
                                function a(e) {
                                    try {
                                        h(n5.throw(e));
                                    } catch (e57) {
                                        i(e57);
                                    }
                                }
                                function h(t) {
                                    var r;
                                    t.done ? e55(t.value) : (r = t.value, r instanceof s6 ? r : new s6(function(e) {
                                        e(r);
                                    })).then(o, a);
                                }
                                h((n5 = n5.apply(t19, r9 || [])).next());
                            });
                            var t19, r9, s6, n5;
                        });
                        return this.shouldThrowOnError || (r8 = r8.catch((e)=>({
                                error: {
                                    message: `FetchError: ${e.message}`,
                                    details: "",
                                    hint: "",
                                    code: e.code || ""
                                },
                                data: null,
                                body: null,
                                count: null,
                                status: 400,
                                statusText: "Bad Request"
                            })
                        )), r8.then(e53, t18);
                    }
                    constructor(e){
                        this.shouldThrowOnError = !1, Object.assign(this, e), this.fetch = e.fetch || n4();
                    }
                };
                let o3 = class o extends i3 {
                    select(e58 = "*") {
                        let t = !1;
                        const r = e58.split("").map((e)=>/\s/.test(e) && !t ? "" : ('"' === e && (t = !t), e)
                        ).join("");
                        return this.url.searchParams.set("select", r), this;
                    }
                    order(e, { ascending: t = !0 , nullsFirst: r = !1 , foreignTable: s  } = {}) {
                        const n = void 0 === s ? "order" : `${s}.order`, i = this.url.searchParams.get(n);
                        return this.url.searchParams.set(n, `${i ? `${i},` : ""}${e}.${t ? "asc" : "desc"}.${r ? "nullsfirst" : "nullslast"}`), this;
                    }
                    limit(e, { foreignTable: t  } = {}) {
                        const r = void 0 === t ? "limit" : `${t}.limit`;
                        return this.url.searchParams.set(r, `${e}`), this;
                    }
                    range(e, t, { foreignTable: r  } = {}) {
                        const s = void 0 === r ? "offset" : `${r}.offset`, n = void 0 === r ? "limit" : `${r}.limit`;
                        return this.url.searchParams.set(s, `${e}`), this.url.searchParams.set(n, "" + (t - e + 1)), this;
                    }
                    abortSignal(e) {
                        return this.signal = e, this;
                    }
                    single() {
                        return this.headers.Accept = "application/vnd.pgrst.object+json", this;
                    }
                    maybeSingle() {
                        this.headers.Accept = "application/vnd.pgrst.object+json";
                        const e59 = new o(this);
                        return e59.then = (e, t20)=>this.then((t)=>{
                                var r, s;
                                return (null === (s = null === (r = t.error) || void 0 === r ? void 0 : r.details) || void 0 === s ? void 0 : s.includes("Results contain 0 rows")) ? e({
                                    error: null,
                                    data: null,
                                    count: t.count,
                                    status: 200,
                                    statusText: "OK",
                                    body: null
                                }) : e(t);
                            }, t20)
                        , e59;
                    }
                    csv() {
                        return this.headers.Accept = "text/csv", this;
                    }
                };
                let a2 = class a extends o3 {
                    not(e, t, r) {
                        return this.url.searchParams.append(`${e}`, `not.${t}.${r}`), this;
                    }
                    or(e, { foreignTable: t  } = {}) {
                        const r = void 0 === t ? "or" : `${t}.or`;
                        return this.url.searchParams.append(r, `(${e})`), this;
                    }
                    eq(e, t) {
                        return this.url.searchParams.append(`${e}`, `eq.${t}`), this;
                    }
                    neq(e, t) {
                        return this.url.searchParams.append(`${e}`, `neq.${t}`), this;
                    }
                    gt(e, t) {
                        return this.url.searchParams.append(`${e}`, `gt.${t}`), this;
                    }
                    gte(e, t) {
                        return this.url.searchParams.append(`${e}`, `gte.${t}`), this;
                    }
                    lt(e, t) {
                        return this.url.searchParams.append(`${e}`, `lt.${t}`), this;
                    }
                    lte(e, t) {
                        return this.url.searchParams.append(`${e}`, `lte.${t}`), this;
                    }
                    like(e, t) {
                        return this.url.searchParams.append(`${e}`, `like.${t}`), this;
                    }
                    ilike(e, t) {
                        return this.url.searchParams.append(`${e}`, `ilike.${t}`), this;
                    }
                    is(e, t) {
                        return this.url.searchParams.append(`${e}`, `is.${t}`), this;
                    }
                    in(e60, t) {
                        const r = t.map((e)=>"string" == typeof e && new RegExp("[,()]").test(e) ? `"${e}"` : `${e}`
                        ).join(",");
                        return this.url.searchParams.append(`${e60}`, `in.(${r})`), this;
                    }
                    contains(e, t) {
                        return "string" == typeof t ? this.url.searchParams.append(`${e}`, `cs.${t}`) : Array.isArray(t) ? this.url.searchParams.append(`${e}`, `cs.{${t.join(",")}}`) : this.url.searchParams.append(`${e}`, `cs.${JSON.stringify(t)}`), this;
                    }
                    containedBy(e, t) {
                        return "string" == typeof t ? this.url.searchParams.append(`${e}`, `cd.${t}`) : Array.isArray(t) ? this.url.searchParams.append(`${e}`, `cd.{${t.join(",")}}`) : this.url.searchParams.append(`${e}`, `cd.${JSON.stringify(t)}`), this;
                    }
                    rangeLt(e, t) {
                        return this.url.searchParams.append(`${e}`, `sl.${t}`), this;
                    }
                    rangeGt(e, t) {
                        return this.url.searchParams.append(`${e}`, `sr.${t}`), this;
                    }
                    rangeGte(e, t) {
                        return this.url.searchParams.append(`${e}`, `nxl.${t}`), this;
                    }
                    rangeLte(e, t) {
                        return this.url.searchParams.append(`${e}`, `nxr.${t}`), this;
                    }
                    rangeAdjacent(e, t) {
                        return this.url.searchParams.append(`${e}`, `adj.${t}`), this;
                    }
                    overlaps(e, t) {
                        return "string" == typeof t ? this.url.searchParams.append(`${e}`, `ov.${t}`) : this.url.searchParams.append(`${e}`, `ov.{${t.join(",")}}`), this;
                    }
                    textSearch(e, t, { config: r , type: s = null  } = {}) {
                        let n = "";
                        "plain" === s ? n = "pl" : "phrase" === s ? n = "ph" : "websearch" === s && (n = "w");
                        const i = void 0 === r ? "" : `(${r})`;
                        return this.url.searchParams.append(`${e}`, `${n}fts${i}.${t}`), this;
                    }
                    fts(e, t, { config: r  } = {}) {
                        const s = void 0 === r ? "" : `(${r})`;
                        return this.url.searchParams.append(`${e}`, `fts${s}.${t}`), this;
                    }
                    plfts(e, t, { config: r  } = {}) {
                        const s = void 0 === r ? "" : `(${r})`;
                        return this.url.searchParams.append(`${e}`, `plfts${s}.${t}`), this;
                    }
                    phfts(e, t, { config: r  } = {}) {
                        const s = void 0 === r ? "" : `(${r})`;
                        return this.url.searchParams.append(`${e}`, `phfts${s}.${t}`), this;
                    }
                    wfts(e, t, { config: r  } = {}) {
                        const s = void 0 === r ? "" : `(${r})`;
                        return this.url.searchParams.append(`${e}`, `wfts${s}.${t}`), this;
                    }
                    filter(e, t, r) {
                        return this.url.searchParams.append(`${e}`, `${t}.${r}`), this;
                    }
                    match(e) {
                        return Object.keys(e).forEach((t)=>{
                            this.url.searchParams.append(`${t}`, `eq.${e[t]}`);
                        }), this;
                    }
                    constructor(){
                        super(...arguments), this.cs = this.contains, this.cd = this.containedBy, this.sl = this.rangeLt, this.sr = this.rangeGt, this.nxl = this.rangeGte, this.nxr = this.rangeLte, this.adj = this.rangeAdjacent, this.ov = this.overlaps;
                    }
                };
                let h2 = class h extends i3 {
                    select(e61 = "*", { head: t = !1 , count: r = null  } = {}) {
                        this.method = "GET";
                        let s = !1;
                        const n = e61.split("").map((e)=>/\s/.test(e) && !s ? "" : ('"' === e && (s = !s), e)
                        ).join("");
                        return this.url.searchParams.set("select", n), r && (this.headers.Prefer = `count=${r}`), t && (this.method = "HEAD"), new a2(this);
                    }
                    insert(e62, { upsert: t = !1 , onConflict: r , returning: s = "representation" , count: n = null  } = {}) {
                        this.method = "POST";
                        const i = [
                            `return=${s}`
                        ];
                        if (t && i.push("resolution=merge-duplicates"), t && void 0 !== r && this.url.searchParams.set("on_conflict", r), this.body = e62, n && i.push(`count=${n}`), this.headers.Prefer && i.unshift(this.headers.Prefer), this.headers.Prefer = i.join(","), Array.isArray(e62)) {
                            const t21 = e62.reduce((e, t)=>e.concat(Object.keys(t))
                            , []);
                            if (t21.length > 0) {
                                const e63 = [
                                    ...new Set(t21)
                                ].map((e)=>`"${e}"`
                                );
                                this.url.searchParams.set("columns", e63.join(","));
                            }
                        }
                        return new a2(this);
                    }
                    upsert(e, { onConflict: t , returning: r = "representation" , count: s = null , ignoreDuplicates: n = !1  } = {}) {
                        this.method = "POST";
                        const i = [
                            `resolution=${n ? "ignore" : "merge"}-duplicates`,
                            `return=${r}`
                        ];
                        return void 0 !== t && this.url.searchParams.set("on_conflict", t), this.body = e, s && i.push(`count=${s}`), this.headers.Prefer && i.unshift(this.headers.Prefer), this.headers.Prefer = i.join(","), new a2(this);
                    }
                    update(e, { returning: t = "representation" , count: r = null  } = {}) {
                        this.method = "PATCH";
                        const s = [
                            `return=${t}`
                        ];
                        return this.body = e, r && s.push(`count=${r}`), this.headers.Prefer && s.unshift(this.headers.Prefer), this.headers.Prefer = s.join(","), new a2(this);
                    }
                    delete({ returning: e = "representation" , count: t = null  } = {}) {
                        this.method = "DELETE";
                        const r = [
                            `return=${e}`
                        ];
                        return t && r.push(`count=${t}`), this.headers.Prefer && r.unshift(this.headers.Prefer), this.headers.Prefer = r.join(","), new a2(this);
                    }
                    constructor(e, { headers: t = {} , schema: r , fetch: s  } = {}){
                        super({
                            fetch: s
                        }), this.url = new URL(e), this.headers = Object.assign({}, t), this.schema = r;
                    }
                };
                let c = class c extends i3 {
                    rpc(e66, { head: t22 = !1 , count: r = null  } = {}) {
                        return t22 ? (this.method = "HEAD", e66 && Object.entries(e66).forEach(([e, t])=>{
                            this.url.searchParams.append(e, t);
                        })) : (this.method = "POST", this.body = e66), r && (void 0 !== this.headers.Prefer ? this.headers.Prefer += `,count=${r}` : this.headers.Prefer = `count=${r}`), new a2(this);
                    }
                    constructor(e, { headers: t = {} , schema: r , fetch: s  } = {}){
                        super({
                            fetch: s
                        }), this.url = new URL(e), this.headers = Object.assign({}, t), this.schema = r;
                    }
                };
                const u = {
                    "X-Client-Info": "postgrest-js/0.36.0"
                };
                let l = class l {
                    auth(e) {
                        return this.headers.Authorization = `Bearer ${e}`, this;
                    }
                    from(e) {
                        const t = `${this.url}/${e}`;
                        return new h2(t, {
                            headers: this.headers,
                            schema: this.schema,
                            fetch: this.fetch
                        });
                    }
                    rpc(e, t, { head: r = !1 , count: s = null  } = {}) {
                        const n = `${this.url}/rpc/${e}`;
                        return new c(n, {
                            headers: this.headers,
                            schema: this.schema,
                            fetch: this.fetch
                        }).rpc(t, {
                            head: r,
                            count: s
                        });
                    }
                    constructor(e, { headers: t = {} , schema: r , fetch: s  } = {}){
                        this.url = e, this.headers = Object.assign(Object.assign({}, u), t), this.schema = r, this.fetch = s;
                    }
                };
            },
            498: (e67, t23, r10)=>{
                "use strict";
                r10.r(t23), r10.d(t23, {
                    RealtimeClient: ()=>O
                    ,
                    RealtimeSubscription: ()=>w
                    ,
                    Transformers: ()=>n6
                });
                var s7, n6 = {};
                r10.r(n6), r10.d(n6, {
                    PostgresTypes: ()=>s7
                    ,
                    convertCell: ()=>a3
                    ,
                    convertChangeData: ()=>i4
                    ,
                    convertColumn: ()=>o4
                    ,
                    toArray: ()=>d
                    ,
                    toBoolean: ()=>c
                    ,
                    toJson: ()=>l
                    ,
                    toNumber: ()=>u
                    ,
                    toTimestampString: ()=>p
                }), (function(e) {
                    e.abstime = "abstime", e.bool = "bool", e.date = "date", e.daterange = "daterange", e.float4 = "float4", e.float8 = "float8", e.int2 = "int2", e.int4 = "int4", e.int4range = "int4range", e.int8 = "int8", e.int8range = "int8range", e.json = "json", e.jsonb = "jsonb", e.money = "money", e.numeric = "numeric", e.oid = "oid", e.reltime = "reltime", e.text = "text", e.time = "time", e.timestamp = "timestamp", e.timestamptz = "timestamptz", e.timetz = "timetz", e.tsrange = "tsrange", e.tstzrange = "tstzrange";
                })(s7 || (s7 = {}));
                const i4 = (e, t, r11 = {})=>{
                    var s8;
                    const n = null !== (s8 = r11.skipTypes) && void 0 !== s8 ? s8 : [];
                    return Object.keys(t).reduce((r, s)=>(r[s] = o4(s, e, t, n), r)
                    , {});
                }, o4 = (e, t24, r, s)=>{
                    const n = t24.find((t)=>t.name === e
                    ), i = null == n ? void 0 : n.type, o = r[e];
                    return i && !s.includes(i) ? a3(i, o) : h3(o);
                }, a3 = (e, t)=>{
                    if ("_" === e.charAt(0)) {
                        const r = e.slice(1, e.length);
                        return d(t, r);
                    }
                    switch(e){
                        case s7.bool:
                            return c(t);
                        case s7.float4:
                        case s7.float8:
                        case s7.int2:
                        case s7.int4:
                        case s7.int8:
                        case s7.numeric:
                        case s7.oid:
                            return u(t);
                        case s7.json:
                        case s7.jsonb:
                            return l(t);
                        case s7.timestamp:
                            return p(t);
                        case s7.abstime:
                        case s7.date:
                        case s7.daterange:
                        case s7.int4range:
                        case s7.int8range:
                        case s7.money:
                        case s7.reltime:
                        case s7.text:
                        case s7.time:
                        case s7.timestamptz:
                        case s7.timetz:
                        case s7.tsrange:
                        case s7.tstzrange:
                        default:
                            return h3(t);
                    }
                }, h3 = (e)=>e
                , c = (e)=>{
                    switch(e){
                        case "t":
                            return !0;
                        case "f":
                            return !1;
                        default:
                            return e;
                    }
                }, u = (e)=>{
                    if ("string" == typeof e) {
                        const t = parseFloat(e);
                        if (!Number.isNaN(t)) return t;
                    }
                    return e;
                }, l = (e)=>{
                    if ("string" == typeof e) try {
                        return JSON.parse(e);
                    } catch (t) {
                        return console.log(`JSON parse error: ${t}`), e;
                    }
                    return e;
                }, d = (e, t)=>{
                    if ("string" != typeof e) return e;
                    const r = e.length - 1, s = e[r];
                    if ("{" === e[0] && "}" === s) {
                        let s;
                        const n = e.slice(1, r);
                        try {
                            s = JSON.parse("[" + n + "]");
                        } catch (e68) {
                            s = n ? n.split(",") : [];
                        }
                        return s.map((e)=>a3(t, e)
                        );
                    }
                    return e;
                }, p = (e)=>"string" == typeof e ? e.replace(" ", "T") : e
                , f = {
                    "X-Client-Info": "realtime-js/1.3.5"
                };
                var m, v, y, g;
                !function(e) {
                    e[e.connecting = 0] = "connecting", e[e.open = 1] = "open", e[e.closing = 2] = "closing", e[e.closed = 3] = "closed";
                }(m || (m = {})), (function(e) {
                    e.closed = "closed", e.errored = "errored", e.joined = "joined", e.joining = "joining", e.leaving = "leaving";
                })(v || (v = {})), (function(e) {
                    e.close = "phx_close", e.error = "phx_error", e.join = "phx_join", e.reply = "phx_reply", e.leave = "phx_leave", e.access_token = "access_token";
                })(y || (y = {})), (function(e) {
                    e.websocket = "websocket";
                })(g || (g = {}));
                let b = class b {
                    reset() {
                        this.tries = 0, clearTimeout(this.timer);
                    }
                    scheduleTimeout() {
                        clearTimeout(this.timer), this.timer = setTimeout(()=>{
                            this.tries = this.tries + 1, this.callback();
                        }, this.timerCalc(this.tries + 1));
                    }
                    constructor(e, t){
                        this.callback = e, this.timerCalc = t, this.timer = void 0, this.tries = 0, this.callback = e, this.timerCalc = t;
                    }
                };
                let _ = class _ {
                    resend(e) {
                        this.timeout = e, this._cancelRefEvent(), this.ref = "", this.refEvent = null, this.receivedResp = null, this.sent = !1, this.send();
                    }
                    send() {
                        this._hasReceived("timeout") || (this.startTimeout(), this.sent = !0, this.channel.socket.push({
                            topic: this.channel.topic,
                            event: this.event,
                            payload: this.payload,
                            ref: this.ref
                        }));
                    }
                    updatePayload(e) {
                        this.payload = Object.assign(Object.assign({}, this.payload), e);
                    }
                    receive(e, t) {
                        var r;
                        return this._hasReceived(e) && t(null === (r = this.receivedResp) || void 0 === r ? void 0 : r.response), this.recHooks.push({
                            status: e,
                            callback: t
                        }), this;
                    }
                    startTimeout() {
                        this.timeoutTimer || (this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, (e)=>{
                            this._cancelRefEvent(), this._cancelTimeout(), this.receivedResp = e, this._matchReceive(e);
                        }), this.timeoutTimer = setTimeout(()=>{
                            this.trigger("timeout", {});
                        }, this.timeout));
                    }
                    trigger(e, t) {
                        this.refEvent && this.channel.trigger(this.refEvent, {
                            status: e,
                            response: t
                        });
                    }
                    destroy() {
                        this._cancelRefEvent(), this._cancelTimeout();
                    }
                    _cancelRefEvent() {
                        this.refEvent && this.channel.off(this.refEvent);
                    }
                    _cancelTimeout() {
                        clearTimeout(this.timeoutTimer), this.timeoutTimer = void 0;
                    }
                    _matchReceive({ status: e69 , response: t25  }) {
                        this.recHooks.filter((t)=>t.status === e69
                        ).forEach((e)=>e.callback(t25)
                        );
                    }
                    _hasReceived(e) {
                        return this.receivedResp && this.receivedResp.status === e;
                    }
                    constructor(e, t, r = {}, s = 10000){
                        this.channel = e, this.event = t, this.payload = r, this.timeout = s, this.sent = !1, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
                    }
                };
                let w = class w {
                    rejoinUntilConnected() {
                        this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this.rejoin();
                    }
                    subscribe(e = this.timeout) {
                        if (this.joinedOnce) throw "tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";
                        return this.joinedOnce = !0, this.rejoin(e), this.joinPush;
                    }
                    onClose(e) {
                        this.on(y.close, e);
                    }
                    onError(e) {
                        this.on(y.error, (t)=>e(t)
                        );
                    }
                    on(e, t) {
                        this.bindings.push({
                            event: e,
                            callback: t
                        });
                    }
                    off(e) {
                        this.bindings = this.bindings.filter((t)=>t.event !== e
                        );
                    }
                    canPush() {
                        return this.socket.isConnected() && this.isJoined();
                    }
                    push(e, t, r = this.timeout) {
                        if (!this.joinedOnce) throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
                        let s = new _(this, e, t, r);
                        return this.canPush() ? s.send() : (s.startTimeout(), this.pushBuffer.push(s)), s;
                    }
                    updateJoinPayload(e) {
                        this.joinPush.updatePayload(e);
                    }
                    unsubscribe(e = this.timeout) {
                        this.state = v.leaving;
                        let t = ()=>{
                            this.socket.log("channel", `leave ${this.topic}`), this.trigger(y.close, "leave", this.joinRef());
                        };
                        this.joinPush.destroy();
                        let r = new _(this, y.leave, {}, e);
                        return r.receive("ok", ()=>t()
                        ).receive("timeout", ()=>t()
                        ), r.send(), this.canPush() || r.trigger("ok", {}), r;
                    }
                    onMessage(e, t, r) {
                        return t;
                    }
                    isMember(e) {
                        return this.topic === e;
                    }
                    joinRef() {
                        return this.joinPush.ref;
                    }
                    rejoin(e = this.timeout) {
                        this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = v.joining, this.joinPush.resend(e));
                    }
                    trigger(e70, t, r12) {
                        let { close: s , error: n , leave: i , join: o  } = y;
                        if (r12 && [
                            s,
                            n,
                            i,
                            o
                        ].indexOf(e70) >= 0 && r12 !== this.joinRef()) return;
                        let a = this.onMessage(e70, t, r12);
                        if (t && !a) throw "channel onMessage callbacks must return the payload, modified or unmodified";
                        this.bindings.filter((r)=>"*" === r.event ? e70 === (null == t ? void 0 : t.type) : r.event === e70
                        ).map((e)=>e.callback(a, r12)
                        );
                    }
                    replyEventName(e) {
                        return `chan_reply_${e}`;
                    }
                    isClosed() {
                        return this.state === v.closed;
                    }
                    isErrored() {
                        return this.state === v.errored;
                    }
                    isJoined() {
                        return this.state === v.joined;
                    }
                    isJoining() {
                        return this.state === v.joining;
                    }
                    isLeaving() {
                        return this.state === v.leaving;
                    }
                    constructor(e71, t26 = {}, r){
                        this.topic = e71, this.params = t26, this.socket = r, this.bindings = [], this.state = v.closed, this.joinedOnce = !1, this.pushBuffer = [], this.timeout = this.socket.timeout, this.joinPush = new _(this, y.join, this.params, this.timeout), this.rejoinTimer = new b(()=>this.rejoinUntilConnected()
                        , this.socket.reconnectAfterMs), this.joinPush.receive("ok", ()=>{
                            this.state = v.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((e)=>e.send()
                            ), this.pushBuffer = [];
                        }), this.onClose(()=>{
                            this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`), this.state = v.closed, this.socket.remove(this);
                        }), this.onError((e)=>{
                            this.isLeaving() || this.isClosed() || (this.socket.log("channel", `error ${this.topic}`, e), this.state = v.errored, this.rejoinTimer.scheduleTimeout());
                        }), this.joinPush.receive("timeout", ()=>{
                            this.isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = v.errored, this.rejoinTimer.scheduleTimeout());
                        }), this.on(y.reply, (e, t)=>{
                            this.trigger(this.replyEventName(t), e);
                        });
                    }
                };
                var T = r10(840);
                let S = class S {
                    decode(e, t) {
                        return e.constructor === ArrayBuffer ? t(this._binaryDecode(e)) : t("string" == typeof e ? JSON.parse(e) : {});
                    }
                    _binaryDecode(e) {
                        const t = new DataView(e), r = new TextDecoder;
                        return this._decodeBroadcast(e, t, r);
                    }
                    _decodeBroadcast(e, t, r) {
                        const s = t.getUint8(1), n = t.getUint8(2);
                        let i = this.HEADER_LENGTH + 2;
                        const o = r.decode(e.slice(i, i + s));
                        i += s;
                        const a = r.decode(e.slice(i, i + n));
                        return i += n, {
                            ref: null,
                            topic: o,
                            event: a,
                            payload: JSON.parse(r.decode(e.slice(i, e.byteLength)))
                        };
                    }
                    constructor(){
                        this.HEADER_LENGTH = 1;
                    }
                };
                const E = ()=>{};
                let O = class O {
                    connect() {
                        this.conn || (this.conn = new this.transport(this.endPointURL(), [], null, this.headers), this.conn && (this.conn.binaryType = "arraybuffer", this.conn.onopen = ()=>this._onConnOpen()
                        , this.conn.onerror = (e)=>this._onConnError(e)
                        , this.conn.onmessage = (e)=>this.onConnMessage(e)
                        , this.conn.onclose = (e)=>this._onConnClose(e)
                        ));
                    }
                    disconnect(e72, t) {
                        return new Promise((r, s)=>{
                            try {
                                this.conn && (this.conn.onclose = function() {}, e72 ? this.conn.close(e72, t || "") : this.conn.close(), this.conn = null, this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.reconnectTimer.reset()), r({
                                    error: null,
                                    data: !0
                                });
                            } catch (e) {
                                r({
                                    error: e,
                                    data: !1
                                });
                            }
                        });
                    }
                    log(e, t, r) {
                        this.logger(e, t, r);
                    }
                    onOpen(e) {
                        this.stateChangeCallbacks.open.push(e);
                    }
                    onClose(e) {
                        this.stateChangeCallbacks.close.push(e);
                    }
                    onError(e) {
                        this.stateChangeCallbacks.error.push(e);
                    }
                    onMessage(e) {
                        this.stateChangeCallbacks.message.push(e);
                    }
                    connectionState() {
                        switch(this.conn && this.conn.readyState){
                            case m.connecting:
                                return "connecting";
                            case m.open:
                                return "open";
                            case m.closing:
                                return "closing";
                            default:
                                return "closed";
                        }
                    }
                    isConnected() {
                        return "open" === this.connectionState();
                    }
                    remove(e) {
                        this.channels = this.channels.filter((t)=>t.joinRef() !== e.joinRef()
                        );
                    }
                    channel(e, t = {}) {
                        let r = new w(e, t, this);
                        return this.channels.push(r), r;
                    }
                    push(e73) {
                        let { topic: t27 , event: r , payload: s , ref: n  } = e73, i = ()=>{
                            this.encode(e73, (e)=>{
                                var t;
                                null === (t = this.conn) || void 0 === t || t.send(e);
                            });
                        };
                        this.log("push", `${t27} ${r} (${n})`, s), this.isConnected() ? i() : this.sendBuffer.push(i);
                    }
                    onConnMessage(e74) {
                        this.decode(e74.data, (e75)=>{
                            let { topic: t28 , event: r , payload: s , ref: n  } = e75;
                            n && n === this.pendingHeartbeatRef ? this.pendingHeartbeatRef = null : r === (null == s ? void 0 : s.type) && this._resetHeartbeat(), this.log("receive", `${s.status || ""} ${t28} ${r} ${n && "(" + n + ")" || ""}`, s), this.channels.filter((e)=>e.isMember(t28)
                            ).forEach((e)=>e.trigger(r, s, n)
                            ), this.stateChangeCallbacks.message.forEach((t)=>t(e75)
                            );
                        });
                    }
                    endPointURL() {
                        return this._appendParams(this.endPoint, Object.assign({}, this.params, {
                            vsn: "1.0.0"
                        }));
                    }
                    makeRef() {
                        let e = this.ref + 1;
                        return e === this.ref ? this.ref = 0 : this.ref = e, this.ref.toString();
                    }
                    setAuth(e) {
                        this.accessToken = e;
                        try {
                            this.channels.forEach((t)=>{
                                e && t.updateJoinPayload({
                                    user_token: e
                                }), t.joinedOnce && t.isJoined() && t.push(y.access_token, {
                                    access_token: e
                                });
                            });
                        } catch (e76) {
                            console.log("setAuth error", e76);
                        }
                    }
                    leaveOpenTopic(e) {
                        let t29 = this.channels.find((t)=>t.topic === e && (t.isJoined() || t.isJoining())
                        );
                        t29 && (this.log("transport", `leaving duplicate topic "${e}"`), t29.unsubscribe());
                    }
                    _onConnOpen() {
                        this.log("transport", `connected to ${this.endPointURL()}`), this._flushSendBuffer(), this.reconnectTimer.reset(), this._resetHeartbeat(), this.stateChangeCallbacks.open.forEach((e)=>e()
                        );
                    }
                    _onConnClose(e) {
                        this.log("transport", "close", e), this._triggerChanError(), this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.reconnectTimer.scheduleTimeout(), this.stateChangeCallbacks.close.forEach((t)=>t(e)
                        );
                    }
                    _onConnError(e) {
                        this.log("transport", e.message), this._triggerChanError(), this.stateChangeCallbacks.error.forEach((t)=>t(e)
                        );
                    }
                    _triggerChanError() {
                        this.channels.forEach((e)=>e.trigger(y.error)
                        );
                    }
                    _appendParams(e, t) {
                        if (0 === Object.keys(t).length) return e;
                        const r = e.match(/\?/) ? "&" : "?";
                        return `${e}${r}${new URLSearchParams(t)}`;
                    }
                    _flushSendBuffer() {
                        this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e)=>e()
                        ), this.sendBuffer = []);
                    }
                    _resetHeartbeat() {
                        this.pendingHeartbeatRef = null, this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.heartbeatTimer = setInterval(()=>this._sendHeartbeat()
                        , this.heartbeatIntervalMs);
                    }
                    _sendHeartbeat() {
                        var e;
                        if (this.isConnected()) {
                            if (this.pendingHeartbeatRef) return this.pendingHeartbeatRef = null, this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), void (null === (e = this.conn) || void 0 === e || e.close(1000, "hearbeat timeout"));
                            this.pendingHeartbeatRef = this.makeRef(), this.push({
                                topic: "phoenix",
                                event: "heartbeat",
                                payload: {},
                                ref: this.pendingHeartbeatRef
                            }), this.setAuth(this.accessToken);
                        }
                    }
                    constructor(e77, t30){
                        this.accessToken = null, this.channels = [], this.endPoint = "", this.headers = f, this.params = {}, this.timeout = 10000, this.transport = T.w3cwebsocket, this.heartbeatIntervalMs = 30000, this.longpollerTimeout = 20000, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.ref = 0, this.logger = E, this.conn = null, this.sendBuffer = [], this.serializer = new S, this.stateChangeCallbacks = {
                            open: [],
                            close: [],
                            error: [],
                            message: []
                        }, this.endPoint = `${e77}/${g.websocket}`, (null == t30 ? void 0 : t30.params) && (this.params = t30.params), (null == t30 ? void 0 : t30.headers) && (this.headers = Object.assign(Object.assign({}, this.headers), t30.headers)), (null == t30 ? void 0 : t30.timeout) && (this.timeout = t30.timeout), (null == t30 ? void 0 : t30.logger) && (this.logger = t30.logger), (null == t30 ? void 0 : t30.transport) && (this.transport = t30.transport), (null == t30 ? void 0 : t30.heartbeatIntervalMs) && (this.heartbeatIntervalMs = t30.heartbeatIntervalMs), (null == t30 ? void 0 : t30.longpollerTimeout) && (this.longpollerTimeout = t30.longpollerTimeout), this.reconnectAfterMs = (null == t30 ? void 0 : t30.reconnectAfterMs) ? t30.reconnectAfterMs : (e)=>[
                                1000,
                                2000,
                                5000,
                                10000
                            ][e - 1] || 10000
                        , this.encode = (null == t30 ? void 0 : t30.encode) ? t30.encode : (e, t)=>t(JSON.stringify(e))
                        , this.decode = (null == t30 ? void 0 : t30.decode) ? t30.decode : this.serializer.decode.bind(this.serializer), this.reconnectTimer = new b(()=>{
                            return e78 = this, t31 = void 0, s = function*() {
                                yield this.disconnect(), this.connect();
                            }, new ((r = void 0) || (r = Promise))(function(n, i) {
                                function o(e) {
                                    try {
                                        h(s.next(e));
                                    } catch (e79) {
                                        i(e79);
                                    }
                                }
                                function a(e) {
                                    try {
                                        h(s.throw(e));
                                    } catch (e80) {
                                        i(e80);
                                    }
                                }
                                function h(e81) {
                                    var t;
                                    e81.done ? n(e81.value) : (t = e81.value, t instanceof r ? t : new r(function(e) {
                                        e(t);
                                    })).then(o, a);
                                }
                                h((s = s.apply(e78, t31 || [])).next());
                            });
                            var e78, t31, r, s;
                        }, this.reconnectAfterMs);
                    }
                };
            },
            122: (e82, t32, r13)=>{
                "use strict";
                r13.r(t32), r13.d(t32, {
                    SupabaseStorageClient: ()=>y
                });
                var s9 = r13(98), n7 = r13.n(s9), i5 = function(e83, t33, r, s) {
                    return new (r || (r = Promise))(function(n, i) {
                        function o(e) {
                            try {
                                h(s.next(e));
                            } catch (e84) {
                                i(e84);
                            }
                        }
                        function a(e) {
                            try {
                                h(s.throw(e));
                            } catch (e85) {
                                i(e85);
                            }
                        }
                        function h(e86) {
                            var t;
                            e86.done ? n(e86.value) : (t = e86.value, t instanceof r ? t : new r(function(e) {
                                e(t);
                            })).then(o, a);
                        }
                        h((s = s.apply(e83, t33 || [])).next());
                    });
                };
                const o5 = (e)=>e.msg || e.message || e.error_description || e.error || JSON.stringify(e)
                ;
                function a4(e87 = n7(), t34, r14, s10, a, h) {
                    return i5(this, void 0, void 0, function*() {
                        return new Promise((n8, i)=>{
                            e87(r14, ((e, t, r, s)=>{
                                const n = {
                                    method: e,
                                    headers: (null == t ? void 0 : t.headers) || {}
                                };
                                return "GET" === e ? n : (n.headers = Object.assign({
                                    "Content-Type": "application/json"
                                }, null == t ? void 0 : t.headers), n.body = JSON.stringify(s), Object.assign(Object.assign({}, n), r));
                            })(t34, s10, a, h)).then((e)=>{
                                if (!e.ok) throw e;
                                return (null == s10 ? void 0 : s10.noResolveJson) ? n8(e) : e.json();
                            }).then((e)=>n8(e)
                            ).catch((e88)=>((e, t)=>{
                                    if ("function" != typeof e.json) return t(e);
                                    e.json().then((r)=>t({
                                            message: o5(r),
                                            status: (null == e ? void 0 : e.status) || 500
                                        })
                                    );
                                })(e88, i)
                            );
                        });
                    });
                }
                function h4(e, t, r, s) {
                    return i5(this, void 0, void 0, function*() {
                        return a4(e, "GET", t, r, s);
                    });
                }
                function c2(e, t, r, s, n) {
                    return i5(this, void 0, void 0, function*() {
                        return a4(e, "POST", t, s, n, r);
                    });
                }
                function u2(e, t, r, s, n) {
                    return i5(this, void 0, void 0, function*() {
                        return a4(e, "DELETE", t, s, n, r);
                    });
                }
                const l = {
                    "X-Client-Info": "storage-js/0.0.0"
                };
                var d = function(e89, t35, r, s) {
                    return new (r || (r = Promise))(function(n, i) {
                        function o(e) {
                            try {
                                h(s.next(e));
                            } catch (e90) {
                                i(e90);
                            }
                        }
                        function a(e) {
                            try {
                                h(s.throw(e));
                            } catch (e91) {
                                i(e91);
                            }
                        }
                        function h(e92) {
                            var t;
                            e92.done ? n(e92.value) : (t = e92.value, t instanceof r ? t : new r(function(e) {
                                e(t);
                            })).then(o, a);
                        }
                        h((s = s.apply(e89, t35 || [])).next());
                    });
                }, p = function(e93, t36, r, s) {
                    return new (r || (r = Promise))(function(n, i) {
                        function o(e) {
                            try {
                                h(s.next(e));
                            } catch (e94) {
                                i(e94);
                            }
                        }
                        function a(e) {
                            try {
                                h(s.throw(e));
                            } catch (e95) {
                                i(e95);
                            }
                        }
                        function h(e96) {
                            var t;
                            e96.done ? n(e96.value) : (t = e96.value, t instanceof r ? t : new r(function(e) {
                                e(t);
                            })).then(o, a);
                        }
                        h((s = s.apply(e93, t36 || [])).next());
                    });
                };
                const f = {
                    limit: 100,
                    offset: 0,
                    sortBy: {
                        column: "name",
                        order: "asc"
                    }
                }, m = {
                    cacheControl: "3600",
                    contentType: "text/plain;charset=UTF-8",
                    upsert: !1
                };
                let v = class v {
                    uploadOrUpdate(e97, t, r, s) {
                        return p(this, void 0, void 0, function*() {
                            try {
                                let i;
                                const o = Object.assign(Object.assign({}, m), s), a = Object.assign(Object.assign({}, this.headers), "POST" === e97 && {
                                    "x-upsert": String(o.upsert)
                                });
                                "undefined" != typeof Blob && r instanceof Blob ? (i = new FormData, i.append("cacheControl", o.cacheControl), i.append("", r)) : "undefined" != typeof FormData && r instanceof FormData ? (i = r, i.append("cacheControl", o.cacheControl)) : (i = r, a["cache-control"] = `max-age=${o.cacheControl}`, a["content-type"] = o.contentType);
                                const h = this._removeEmptyFolders(t), c = this._getFinalPath(h), u = yield n7()(`${this.url}/object/${c}`, {
                                    method: e97,
                                    body: i,
                                    headers: a
                                });
                                return u.ok ? {
                                    data: {
                                        Key: c
                                    },
                                    error: null
                                } : {
                                    data: null,
                                    error: yield u.json()
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    upload(e, t, r) {
                        return p(this, void 0, void 0, function*() {
                            return this.uploadOrUpdate("POST", e, t, r);
                        });
                    }
                    update(e, t, r) {
                        return p(this, void 0, void 0, function*() {
                            return this.uploadOrUpdate("PUT", e, t, r);
                        });
                    }
                    move(e98, t) {
                        return p(this, void 0, void 0, function*() {
                            try {
                                return {
                                    data: yield c2(this.fetch, `${this.url}/object/move`, {
                                        bucketId: this.bucketId,
                                        sourceKey: e98,
                                        destinationKey: t
                                    }, {
                                        headers: this.headers
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    createSignedUrl(e99, t) {
                        return p(this, void 0, void 0, function*() {
                            try {
                                const r = this._getFinalPath(e99);
                                let s = yield c2(this.fetch, `${this.url}/object/sign/${r}`, {
                                    expiresIn: t
                                }, {
                                    headers: this.headers
                                });
                                const n = `${this.url}${s.signedURL}`;
                                return s = {
                                    signedURL: n
                                }, {
                                    data: s,
                                    error: null,
                                    signedURL: n
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e,
                                    signedURL: null
                                };
                            }
                        });
                    }
                    download(e100) {
                        return p(this, void 0, void 0, function*() {
                            try {
                                const t = this._getFinalPath(e100), r = yield h4(this.fetch, `${this.url}/object/${t}`, {
                                    headers: this.headers,
                                    noResolveJson: !0
                                });
                                return {
                                    data: yield r.blob(),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    getPublicUrl(e) {
                        try {
                            const t = this._getFinalPath(e), r = `${this.url}/object/public/${t}`;
                            return {
                                data: {
                                    publicURL: r
                                },
                                error: null,
                                publicURL: r
                            };
                        } catch (e101) {
                            return {
                                data: null,
                                error: e101,
                                publicURL: null
                            };
                        }
                    }
                    remove(e102) {
                        return p(this, void 0, void 0, function*() {
                            try {
                                return {
                                    data: yield u2(this.fetch, `${this.url}/object/${this.bucketId}`, {
                                        prefixes: e102
                                    }, {
                                        headers: this.headers
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    list(e103, t, r) {
                        return p(this, void 0, void 0, function*() {
                            try {
                                const s = Object.assign(Object.assign(Object.assign({}, f), t), {
                                    prefix: e103 || ""
                                });
                                return {
                                    data: yield c2(this.fetch, `${this.url}/object/list/${this.bucketId}`, s, {
                                        headers: this.headers
                                    }, r),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    _getFinalPath(e) {
                        return `${this.bucketId}/${e}`;
                    }
                    _removeEmptyFolders(e) {
                        return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
                    }
                    constructor(e, t = {}, r, s){
                        this.url = e, this.headers = t, this.bucketId = r, this.fetch = s;
                    }
                };
                let y = class y extends class _class {
                    listBuckets() {
                        return d(this, void 0, void 0, function*() {
                            try {
                                return {
                                    data: yield h4(this.fetch, `${this.url}/bucket`, {
                                        headers: this.headers
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    getBucket(e104) {
                        return d(this, void 0, void 0, function*() {
                            try {
                                return {
                                    data: yield h4(this.fetch, `${this.url}/bucket/${e104}`, {
                                        headers: this.headers
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    createBucket(e105, t = {
                        public: !1
                    }) {
                        return d(this, void 0, void 0, function*() {
                            try {
                                return {
                                    data: (yield c2(this.fetch, `${this.url}/bucket`, {
                                        id: e105,
                                        name: e105,
                                        public: t.public
                                    }, {
                                        headers: this.headers
                                    })).name,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    updateBucket(e106, t37) {
                        return d(this, void 0, void 0, function*() {
                            try {
                                const r15 = yield function(e, t, r, s, n) {
                                    return i5(this, void 0, void 0, function*() {
                                        return a4(e, "PUT", t, s, undefined, r);
                                    });
                                }(this.fetch, `${this.url}/bucket/${e106}`, {
                                    id: e106,
                                    name: e106,
                                    public: t37.public
                                }, {
                                    headers: this.headers
                                });
                                return {
                                    data: r15,
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    emptyBucket(e107) {
                        return d(this, void 0, void 0, function*() {
                            try {
                                return {
                                    data: yield c2(this.fetch, `${this.url}/bucket/${e107}/empty`, {}, {
                                        headers: this.headers
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    deleteBucket(e108) {
                        return d(this, void 0, void 0, function*() {
                            try {
                                return {
                                    data: yield u2(this.fetch, `${this.url}/bucket/${e108}`, {}, {
                                        headers: this.headers
                                    }),
                                    error: null
                                };
                            } catch (e) {
                                return {
                                    data: null,
                                    error: e
                                };
                            }
                        });
                    }
                    constructor(e, t = {}, r){
                        this.url = e, this.headers = Object.assign(Object.assign({}, l), t), this.fetch = r;
                    }
                } {
                    from(e) {
                        return new v(this.url, this.headers, e, this.fetch);
                    }
                    constructor(e, t = {}, r){
                        super(e, t, r);
                    }
                };
            },
            98: function(e109, t38) {
                var r17 = "undefined" != typeof self ? self : this, s11 = function() {
                    function e() {
                        this.fetch = !1, this.DOMException = r17.DOMException;
                    }
                    return e.prototype = r17, new e;
                }();
                !function(e110) {
                    !function(t39) {
                        var r18 = "URLSearchParams" in e110, s12 = "Symbol" in e110 && "iterator" in Symbol, n10 = "FileReader" in e110 && "Blob" in e110 && function() {
                            try {
                                return new Blob, !0;
                            } catch (e) {
                                return !1;
                            }
                        }(), i6 = "FormData" in e110, o6 = "ArrayBuffer" in e110;
                        if (o6) var a5 = [
                            "[object Int8Array]",
                            "[object Uint8Array]",
                            "[object Uint8ClampedArray]",
                            "[object Int16Array]",
                            "[object Uint16Array]",
                            "[object Int32Array]",
                            "[object Uint32Array]",
                            "[object Float32Array]",
                            "[object Float64Array]"
                        ], h5 = ArrayBuffer.isView || function(e) {
                            return e && a5.indexOf(Object.prototype.toString.call(e)) > -1;
                        };
                        function c(e) {
                            if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
                            return e.toLowerCase();
                        }
                        function u(e) {
                            return "string" != typeof e && (e = String(e)), e;
                        }
                        function l(e) {
                            var t40 = {
                                next: function() {
                                    var t = e.shift();
                                    return {
                                        done: void 0 === t,
                                        value: t
                                    };
                                }
                            };
                            return s12 && (t40[Symbol.iterator] = function() {
                                return t40;
                            }), t40;
                        }
                        function d(e111) {
                            this.map = {}, e111 instanceof d ? e111.forEach(function(e, t) {
                                this.append(t, e);
                            }, this) : Array.isArray(e111) ? e111.forEach(function(e) {
                                this.append(e[0], e[1]);
                            }, this) : e111 && Object.getOwnPropertyNames(e111).forEach(function(t) {
                                this.append(t, e111[t]);
                            }, this);
                        }
                        function p(e) {
                            if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
                            e.bodyUsed = !0;
                        }
                        function f(e) {
                            return new Promise(function(t, r) {
                                e.onload = function() {
                                    t(e.result);
                                }, e.onerror = function() {
                                    r(e.error);
                                };
                            });
                        }
                        function m(e) {
                            var t = new FileReader, r = f(t);
                            return t.readAsArrayBuffer(e), r;
                        }
                        function v(e) {
                            if (e.slice) return e.slice(0);
                            var t = new Uint8Array(e.byteLength);
                            return t.set(new Uint8Array(e)), t.buffer;
                        }
                        function y() {
                            return this.bodyUsed = !1, this._initBody = function(e) {
                                var t;
                                this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : n10 && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : i6 && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : r18 && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : o6 && n10 && (t = e) && DataView.prototype.isPrototypeOf(t) ? (this._bodyArrayBuffer = v(e.buffer), this._bodyInit = new Blob([
                                    this._bodyArrayBuffer
                                ])) : o6 && (ArrayBuffer.prototype.isPrototypeOf(e) || h5(e)) ? this._bodyArrayBuffer = v(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : r18 && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
                            }, n10 && (this.blob = function() {
                                var e = p(this);
                                if (e) return e;
                                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([
                                    this._bodyArrayBuffer
                                ]));
                                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                                return Promise.resolve(new Blob([
                                    this._bodyText
                                ]));
                            }, this.arrayBuffer = function() {
                                return this._bodyArrayBuffer ? p(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(m);
                            }), this.text = function() {
                                var e112, t41, r19, s13 = p(this);
                                if (s13) return s13;
                                if (this._bodyBlob) return e112 = this._bodyBlob, r19 = f(t41 = new FileReader), t41.readAsText(e112), r19;
                                if (this._bodyArrayBuffer) return Promise.resolve(function(e) {
                                    for(var t = new Uint8Array(e), r = new Array(t.length), s = 0; s < t.length; s++)r[s] = String.fromCharCode(t[s]);
                                    return r.join("");
                                }(this._bodyArrayBuffer));
                                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                                return Promise.resolve(this._bodyText);
                            }, i6 && (this.formData = function() {
                                return this.text().then(_);
                            }), this.json = function() {
                                return this.text().then(JSON.parse);
                            }, this;
                        }
                        d.prototype.append = function(e, t) {
                            e = c(e), t = u(t);
                            var r = this.map[e];
                            this.map[e] = r ? r + ", " + t : t;
                        }, d.prototype.delete = function(e) {
                            delete this.map[c(e)];
                        }, d.prototype.get = function(e) {
                            return e = c(e), this.has(e) ? this.map[e] : null;
                        }, d.prototype.has = function(e) {
                            return this.map.hasOwnProperty(c(e));
                        }, d.prototype.set = function(e, t) {
                            this.map[c(e)] = u(t);
                        }, d.prototype.forEach = function(e, t) {
                            for(var r in this.map)this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this);
                        }, d.prototype.keys = function() {
                            var e = [];
                            return this.forEach(function(t, r) {
                                e.push(r);
                            }), l(e);
                        }, d.prototype.values = function() {
                            var e = [];
                            return this.forEach(function(t) {
                                e.push(t);
                            }), l(e);
                        }, d.prototype.entries = function() {
                            var e = [];
                            return this.forEach(function(t, r) {
                                e.push([
                                    r,
                                    t
                                ]);
                            }), l(e);
                        }, s12 && (d.prototype[Symbol.iterator] = d.prototype.entries);
                        var g = [
                            "DELETE",
                            "GET",
                            "HEAD",
                            "OPTIONS",
                            "POST",
                            "PUT"
                        ];
                        function b(e, t) {
                            var r, s, n = (t = t || {}).body;
                            if (e instanceof b) {
                                if (e.bodyUsed) throw new TypeError("Already read");
                                this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new d(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, n || null == e._bodyInit || (n = e._bodyInit, e.bodyUsed = !0);
                            } else this.url = String(e);
                            if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new d(t.headers)), this.method = (s = (r = t.method || this.method || "GET").toUpperCase(), g.indexOf(s) > -1 ? s : r), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
                            this._initBody(n);
                        }
                        function _(e113) {
                            var t = new FormData;
                            return e113.trim().split("&").forEach(function(e) {
                                if (e) {
                                    var r = e.split("="), s = r.shift().replace(/\+/g, " "), n = r.join("=").replace(/\+/g, " ");
                                    t.append(decodeURIComponent(s), decodeURIComponent(n));
                                }
                            }), t;
                        }
                        function w(e, t) {
                            t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new d(t.headers), this.url = t.url || "", this._initBody(e);
                        }
                        b.prototype.clone = function() {
                            return new b(this, {
                                body: this._bodyInit
                            });
                        }, y.call(b.prototype), y.call(w.prototype), w.prototype.clone = function() {
                            return new w(this._bodyInit, {
                                status: this.status,
                                statusText: this.statusText,
                                headers: new d(this.headers),
                                url: this.url
                            });
                        }, w.error = function() {
                            var e = new w(null, {
                                status: 0,
                                statusText: ""
                            });
                            return e.type = "error", e;
                        };
                        var T = [
                            301,
                            302,
                            303,
                            307,
                            308
                        ];
                        w.redirect = function(e, t) {
                            if (-1 === T.indexOf(t)) throw new RangeError("Invalid status code");
                            return new w(null, {
                                status: t,
                                headers: {
                                    location: e
                                }
                            });
                        }, t39.DOMException = e110.DOMException;
                        try {
                            new t39.DOMException;
                        } catch (e114) {
                            t39.DOMException = function(e, t) {
                                this.message = e, this.name = t;
                                var r = Error(e);
                                this.stack = r.stack;
                            }, t39.DOMException.prototype = Object.create(Error.prototype), t39.DOMException.prototype.constructor = t39.DOMException;
                        }
                        function S(e115, r20) {
                            return new Promise(function(s14, i) {
                                var o = new b(e115, r20);
                                if (o.signal && o.signal.aborted) return i(new t39.DOMException("Aborted", "AbortError"));
                                var a = new XMLHttpRequest;
                                function h() {
                                    a.abort();
                                }
                                a.onload = function() {
                                    var e116, t, r21 = {
                                        status: a.status,
                                        statusText: a.statusText,
                                        headers: (e116 = a.getAllResponseHeaders() || "", t = new d, e116.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e) {
                                            var r = e.split(":"), s = r.shift().trim();
                                            if (s) {
                                                var n = r.join(":").trim();
                                                t.append(s, n);
                                            }
                                        }), t)
                                    };
                                    r21.url = "responseURL" in a ? a.responseURL : r21.headers.get("X-Request-URL");
                                    var n11 = "response" in a ? a.response : a.responseText;
                                    s14(new w(n11, r21));
                                }, a.onerror = function() {
                                    i(new TypeError("Network request failed"));
                                }, a.ontimeout = function() {
                                    i(new TypeError("Network request failed"));
                                }, a.onabort = function() {
                                    i(new t39.DOMException("Aborted", "AbortError"));
                                }, a.open(o.method, o.url, !0), "include" === o.credentials ? a.withCredentials = !0 : "omit" === o.credentials && (a.withCredentials = !1), "responseType" in a && n10 && (a.responseType = "blob"), o.headers.forEach(function(e, t) {
                                    a.setRequestHeader(t, e);
                                }), o.signal && (o.signal.addEventListener("abort", h), a.onreadystatechange = function() {
                                    4 === a.readyState && o.signal.removeEventListener("abort", h);
                                }), a.send(void 0 === o._bodyInit ? null : o._bodyInit);
                            });
                        }
                        S.polyfill = !0, e110.fetch || (e110.fetch = S, e110.Headers = d, e110.Request = b, e110.Response = w), t39.Headers = d, t39.Request = b, t39.Response = w, t39.fetch = S, Object.defineProperty(t39, "__esModule", {
                            value: !0
                        });
                    }({});
                }(s11), s11.fetch.ponyfill = !0, delete s11.fetch.polyfill;
                var n9 = s11;
                (t38 = n9.fetch).default = n9.fetch, t38.fetch = n9.fetch, t38.Headers = n9.Headers, t38.Request = n9.Request, t38.Response = n9.Response, e109.exports = t38;
            },
            284: (e)=>{
                var t = function() {
                    if ("object" == typeof self && self) return self;
                    if ("object" == typeof window && window) return window;
                    throw new Error("Unable to resolve global `this`");
                };
                e.exports = (function() {
                    if (this) return this;
                    if ("object" == typeof globalThis && globalThis) return globalThis;
                    try {
                        Object.defineProperty(Object.prototype, "__global__", {
                            get: function() {
                                return this;
                            },
                            configurable: !0
                        });
                    } catch (e) {
                        return t();
                    }
                    try {
                        return __global__ || t();
                    } finally{
                        delete Object.prototype.__global__;
                    }
                })();
            },
            296: function(e117, t42, r22) {
                "use strict";
                var s15 = this && this.__awaiter || function(e118, t43, r, s) {
                    return new (r || (r = Promise))(function(n, i) {
                        function o(e) {
                            try {
                                h(s.next(e));
                            } catch (e119) {
                                i(e119);
                            }
                        }
                        function a(e) {
                            try {
                                h(s.throw(e));
                            } catch (e120) {
                                i(e120);
                            }
                        }
                        function h(e121) {
                            var t;
                            e121.done ? n(e121.value) : (t = e121.value, t instanceof r ? t : new r(function(e) {
                                e(t);
                            })).then(o, a);
                        }
                        h((s = s.apply(e118, t43 || [])).next());
                    });
                };
                Object.defineProperty(t42, "__esModule", {
                    value: !0
                });
                const n12 = r22(678), i7 = r22(610), o7 = r22(283), a6 = r22(528), h6 = r22(122), c = r22(501), u = r22(498), l = {
                    schema: "public",
                    autoRefreshToken: !0,
                    persistSession: !0,
                    detectSessionInUrl: !0,
                    multiTab: !0,
                    headers: n12.DEFAULT_HEADERS
                };
                t42.default = class _class {
                    get storage() {
                        return new h6.SupabaseStorageClient(this.storageUrl, this._getAuthHeaders(), this.fetch);
                    }
                    from(e) {
                        const t = `${this.restUrl}/${e}`;
                        return new a6.SupabaseQueryBuilder(t, {
                            headers: this._getAuthHeaders(),
                            schema: this.schema,
                            realtime: this.realtime,
                            table: e,
                            fetch: this.fetch
                        });
                    }
                    rpc(e, t, { head: r = !1 , count: s = null  } = {}) {
                        return this._initPostgRESTClient().rpc(e, t, {
                            head: r,
                            count: s
                        });
                    }
                    removeAllSubscriptions() {
                        return s15(this, void 0, void 0, function*() {
                            const e122 = this.getSubscriptions().slice(), t44 = e122.map((e)=>this.removeSubscription(e)
                            );
                            return (yield Promise.all(t44)).map(({ error: t  }, r)=>({
                                    data: {
                                        subscription: e122[r]
                                    },
                                    error: t
                                })
                            );
                        });
                    }
                    removeSubscription(e123) {
                        return s15(this, void 0, void 0, function*() {
                            const { error: t  } = yield this._closeSubscription(e123), r = this.getSubscriptions(), s = r.filter((e)=>e.isJoined()
                            ).length;
                            return 0 === r.length && (yield this.realtime.disconnect()), {
                                data: {
                                    openSubscriptions: s
                                },
                                error: t
                            };
                        });
                    }
                    _closeSubscription(e) {
                        return s15(this, void 0, void 0, function*() {
                            let t = null;
                            if (!e.isClosed()) {
                                const { error: r  } = yield this._unsubscribeSubscription(e);
                                t = r;
                            }
                            return this.realtime.remove(e), {
                                error: t
                            };
                        });
                    }
                    _unsubscribeSubscription(e124) {
                        return new Promise((t)=>{
                            e124.unsubscribe().receive("ok", ()=>t({
                                    error: null
                                })
                            ).receive("error", (e)=>t({
                                    error: e
                                })
                            ).receive("timeout", ()=>t({
                                    error: new Error("timed out")
                                })
                            );
                        });
                    }
                    getSubscriptions() {
                        return this.realtime.channels;
                    }
                    _initSupabaseAuthClient({ autoRefreshToken: e , persistSession: t , detectSessionInUrl: r , localStorage: s , headers: n , fetch: i  }) {
                        const a = {
                            Authorization: `Bearer ${this.supabaseKey}`,
                            apikey: `${this.supabaseKey}`
                        };
                        return new o7.SupabaseAuthClient({
                            url: this.authUrl,
                            headers: Object.assign(Object.assign({}, n), a),
                            autoRefreshToken: e,
                            persistSession: t,
                            detectSessionInUrl: r,
                            localStorage: s,
                            fetch: i
                        });
                    }
                    _initRealtimeClient(e) {
                        return new u.RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, e), {
                            params: Object.assign(Object.assign({}, null == e ? void 0 : e.params), {
                                apikey: this.supabaseKey
                            })
                        }));
                    }
                    _initPostgRESTClient() {
                        return new c.PostgrestClient(this.restUrl, {
                            headers: this._getAuthHeaders(),
                            schema: this.schema,
                            fetch: this.fetch
                        });
                    }
                    _getAuthHeaders() {
                        var e, t;
                        const r = this.headers, s = null !== (t = null === (e = this.auth.session()) || void 0 === e ? void 0 : e.access_token) && void 0 !== t ? t : this.supabaseKey;
                        return r.apikey = this.supabaseKey, r.Authorization = `Bearer ${s}`, r;
                    }
                    _listenForMultiTabEvents() {
                        if (!this.multiTab || !i7.isBrowser() || !(null === window || void 0 === window ? void 0 : window.addEventListener)) return null;
                        try {
                            return null === window || void 0 === window ? void 0 : window.addEventListener("storage", (e)=>{
                                var t, r, s;
                                if (e.key === n12.STORAGE_KEY) {
                                    const n = JSON.parse(String(e.newValue)), i = null !== (r = null === (t = null == n ? void 0 : n.currentSession) || void 0 === t ? void 0 : t.access_token) && void 0 !== r ? r : void 0, o = null === (s = this.auth.session()) || void 0 === s ? void 0 : s.access_token;
                                    i ? !o && i ? this._handleTokenChanged("SIGNED_IN", i, "STORAGE") : o !== i && this._handleTokenChanged("TOKEN_REFRESHED", i, "STORAGE") : this._handleTokenChanged("SIGNED_OUT", i, "STORAGE");
                                }
                            });
                        } catch (e) {
                            return console.error("_listenForMultiTabEvents", e), null;
                        }
                    }
                    _listenForAuthEvents() {
                        let { data: e125  } = this.auth.onAuthStateChange((e, t)=>{
                            this._handleTokenChanged(e, null == t ? void 0 : t.access_token, "CLIENT");
                        });
                        return e125;
                    }
                    _handleTokenChanged(e, t, r) {
                        "TOKEN_REFRESHED" !== e && "SIGNED_IN" !== e || this.changedAccessToken === t ? "SIGNED_OUT" !== e && "USER_DELETED" !== e || (this.realtime.setAuth(this.supabaseKey), "STORAGE" == r && this.auth.signOut()) : (this.realtime.setAuth(t), "STORAGE" == r && this.auth.setAuth(t), this.changedAccessToken = t);
                    }
                    constructor(e, t, r){
                        if (this.supabaseUrl = e, this.supabaseKey = t, !e) throw new Error("supabaseUrl is required.");
                        if (!t) throw new Error("supabaseKey is required.");
                        const s = i7.stripTrailingSlash(e), o = Object.assign(Object.assign({}, l), r);
                        this.restUrl = `${s}/rest/v1`, this.realtimeUrl = `${s}/realtime/v1`.replace("http", "ws"), this.authUrl = `${s}/auth/v1`, this.storageUrl = `${s}/storage/v1`, this.schema = o.schema, this.multiTab = o.multiTab, this.fetch = o.fetch, this.headers = Object.assign(Object.assign({}, n12.DEFAULT_HEADERS), null == r ? void 0 : r.headers), this.auth = this._initSupabaseAuthClient(o), this.realtime = this._initRealtimeClient(Object.assign({
                            headers: this.headers
                        }, o.realtime)), this._listenForAuthEvents(), this._listenForMultiTabEvents();
                    }
                };
            },
            341: function(e126, t45, r23) {
                "use strict";
                var s16 = this && this.__createBinding || (Object.create ? function(e, t, r, s) {
                    void 0 === s && (s = r), Object.defineProperty(e, s, {
                        enumerable: !0,
                        get: function() {
                            return t[r];
                        }
                    });
                } : function(e, t, r, s) {
                    void 0 === s && (s = r), e[s] = t[r];
                }), n = this && this.__exportStar || function(e, t) {
                    for(var r in e)"default" === r || Object.prototype.hasOwnProperty.call(t, r) || s16(t, e, r);
                }, i = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                };
                Object.defineProperty(t45, "__esModule", {
                    value: !0
                }), t45.AuthSession = t45.AuthUser = t45.SupabaseRealtimePayload = t45.SupabaseClientOptions = t45.SupabaseClient = t45.createClient = t45.PostgrestError = t45.PostgrestMaybeSingleResponse = t45.PostgrestSingleResponse = t45.PostgrestResponse = void 0;
                const o = i(r23(296));
                t45.SupabaseClient = o.default;
                const a = r23(717);
                Object.defineProperty(t45, "SupabaseClientOptions", {
                    enumerable: !0,
                    get: function() {
                        return a.SupabaseClientOptions;
                    }
                }), Object.defineProperty(t45, "SupabaseRealtimePayload", {
                    enumerable: !0,
                    get: function() {
                        return a.SupabaseRealtimePayload;
                    }
                });
                const h = r23(271);
                Object.defineProperty(t45, "AuthUser", {
                    enumerable: !0,
                    get: function() {
                        return h.User;
                    }
                }), Object.defineProperty(t45, "AuthSession", {
                    enumerable: !0,
                    get: function() {
                        return h.Session;
                    }
                }), n(r23(271), t45);
                var c = r23(501);
                Object.defineProperty(t45, "PostgrestResponse", {
                    enumerable: !0,
                    get: function() {
                        return c.PostgrestResponse;
                    }
                }), Object.defineProperty(t45, "PostgrestSingleResponse", {
                    enumerable: !0,
                    get: function() {
                        return c.PostgrestSingleResponse;
                    }
                }), Object.defineProperty(t45, "PostgrestMaybeSingleResponse", {
                    enumerable: !0,
                    get: function() {
                        return c.PostgrestMaybeSingleResponse;
                    }
                }), Object.defineProperty(t45, "PostgrestError", {
                    enumerable: !0,
                    get: function() {
                        return c.PostgrestError;
                    }
                }), n(r23(498), t45), t45.createClient = (e, t, r)=>new o.default(e, t, r)
                ;
            },
            283: (e127, t, r)=>{
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.SupabaseAuthClient = void 0;
                const s = r(271);
                let n = class n extends s.GoTrueClient {
                    constructor(e){
                        super(e);
                    }
                };
                t.SupabaseAuthClient = n;
            },
            528: (e128, t46, r24)=>{
                "use strict";
                Object.defineProperty(t46, "__esModule", {
                    value: !0
                }), t46.SupabaseQueryBuilder = void 0;
                const s17 = r24(501), n13 = r24(308);
                let i8 = class i extends s17.PostgrestQueryBuilder {
                    on(e, t) {
                        return this._realtime.isConnected() || this._realtime.connect(), this._subscription || (this._subscription = new n13.SupabaseRealtimeClient(this._realtime, this._headers, this._schema, this._table)), this._subscription.on(e, t);
                    }
                    constructor(e, { headers: t = {} , schema: r , realtime: s , table: n , fetch: i  }){
                        super(e, {
                            headers: t,
                            schema: r,
                            fetch: i
                        }), this._subscription = null, this._realtime = s, this._headers = t, this._schema = r, this._table = n;
                    }
                };
                t46.SupabaseQueryBuilder = i8;
            },
            308: (e129, t47, r25)=>{
                "use strict";
                Object.defineProperty(t47, "__esModule", {
                    value: !0
                }), t47.SupabaseRealtimeClient = void 0;
                const s18 = r25(498);
                t47.SupabaseRealtimeClient = class _class {
                    getPayloadRecords(e) {
                        const t = {
                            new: {},
                            old: {}
                        };
                        return "INSERT" !== e.type && "UPDATE" !== e.type || (t.new = s18.Transformers.convertChangeData(e.columns, e.record)), "UPDATE" !== e.type && "DELETE" !== e.type || (t.old = s18.Transformers.convertChangeData(e.columns, e.old_record)), t;
                    }
                    on(e130, t) {
                        return this.subscription.on(e130, (e)=>{
                            let r = {
                                schema: e.schema,
                                table: e.table,
                                commit_timestamp: e.commit_timestamp,
                                eventType: e.type,
                                new: {},
                                old: {},
                                errors: e.errors
                            };
                            r = Object.assign(Object.assign({}, r), this.getPayloadRecords(e)), t(r);
                        }), this;
                    }
                    subscribe(e = ()=>{}) {
                        return this.subscription.onError((t)=>e("SUBSCRIPTION_ERROR", t)
                        ), this.subscription.onClose(()=>e("CLOSED")
                        ), this.subscription.subscribe().receive("ok", ()=>e("SUBSCRIBED")
                        ).receive("error", (t)=>e("SUBSCRIPTION_ERROR", t)
                        ).receive("timeout", ()=>e("RETRYING_AFTER_TIMEOUT")
                        ), this.subscription;
                    }
                    constructor(e, t, r, s){
                        const n = {}, i = "*" === s ? `realtime:${r}` : `realtime:${r}:${s}`, o = t.Authorization.split(" ")[1];
                        o && (n.user_token = o), this.subscription = e.channel(i, n);
                    }
                };
            },
            678: (e, t, r)=>{
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.STORAGE_KEY = t.DEFAULT_HEADERS = void 0;
                const s = r(506);
                t.DEFAULT_HEADERS = {
                    "X-Client-Info": `supabase-js/${s.version}`
                }, t.STORAGE_KEY = "supabase.auth.token";
            },
            610: (e131, t48)=>{
                "use strict";
                Object.defineProperty(t48, "__esModule", {
                    value: !0
                }), t48.isBrowser = t48.stripTrailingSlash = t48.uuid = void 0, t48.uuid = function() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                        var t = 16 * Math.random() | 0;
                        return ("x" == e ? t : 3 & t | 8).toString(16);
                    });
                }, t48.stripTrailingSlash = function(e) {
                    return e.replace(/\/$/, "");
                }, t48.isBrowser = ()=>"undefined" != typeof window
                ;
            },
            717: (e, t)=>{
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
            },
            506: (e, t)=>{
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.version = void 0, t.version = "0.0.0";
            },
            840: (e133, t49, r)=>{
                var s;
                if ("object" == typeof globalThis) s = globalThis;
                else try {
                    s = r(284);
                } catch (e132) {} finally{
                    if (s || "undefined" == typeof window || (s = window), !s) throw new Error("Could not determine global this");
                }
                var n = s.WebSocket || s.MozWebSocket, i = r(387);
                function o(e, t) {
                    return t ? new n(e, t) : new n(e);
                }
                n && [
                    "CONNECTING",
                    "OPEN",
                    "CLOSING",
                    "CLOSED"
                ].forEach(function(e) {
                    Object.defineProperty(o, e, {
                        get: function() {
                            return n[e];
                        }
                    });
                }), e133.exports = {
                    w3cwebsocket: n ? o : null,
                    version: i
                };
            },
            387: (e, t, r)=>{
                e.exports = r(794).version;
            },
            794: (e)=>{
                "use strict";
                e.exports = {
                    version: "1.0.34"
                };
            }
        }, t1 = {};
        function r1(s) {
            var n = t1[s];
            if (void 0 !== n) return n.exports;
            var i = t1[s] = {
                exports: {}
            };
            return e1[s].call(i.exports, i, i.exports, r1), i.exports;
        }
        return r1.n = (e)=>{
            var t = e && e.__esModule ? ()=>e.default
             : ()=>e
            ;
            return r1.d(t, {
                a: t
            }), t;
        }, r1.d = (e, t)=>{
            for(var s in t)r1.o(t, s) && !r1.o(e, s) && Object.defineProperty(e, s, {
                enumerable: !0,
                get: t[s]
            });
        }, r1.o = (e, t)=>Object.prototype.hasOwnProperty.call(e, t)
        , r1.r = (e)=>{
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }, r1(341);
    })();
});

//# sourceMappingURL=supabase.js.map