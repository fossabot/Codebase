"use strict";
exports.default = void 0;
var swcHelpers = require("@swc/helpers");
var _fetch = require("./lib/fetch");
var _constants = require("./lib/constants");
var _cookies = require("./lib/cookies");
var _helpers = require("./lib/helpers");
let GoTrueApi = class GoTrueApi {
    /**
   * Create a temporary object with all configured headers and
   * adds the Authorization token to be used on request methods
   * @param jwt A valid, logged-in JWT.
   */ _createRequestHeaders(jwt) {
        const headers = swcHelpers.objectSpread({}, this.headers);
        headers['Authorization'] = `Bearer ${jwt}`;
        return headers;
    }
    cookieName() {
        var _name;
        return (_name = this.cookieOptions.name) !== null && _name !== void 0 ? _name : '';
    }
    /**
   * Generates the relevant login URL for a third-party provider.
   * @param provider One of the providers supported by GoTrue.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param scopes A space-separated list of scopes granted to the OAuth application.
   */ getUrlForProvider(provider, options) {
        const urlParams = [
            `provider=${encodeURIComponent(provider)}`
        ];
        if (options === null || options === void 0 ? void 0 : options.redirectTo) {
            urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
        }
        if (options === null || options === void 0 ? void 0 : options.scopes) {
            urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
        }
        return `${this.url}/authorize?${urlParams.join('&')}`;
    }
    /**
   * Creates a new user using their email address.
   * @param email The email address of the user.
   * @param password The password of the user.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param data Optional user metadata.
   *
   * @returns A logged-in session if the server has "autoconfirm" ON
   * @returns A user if the server has "autoconfirm" OFF
   */ async signUpWithEmail(email, password, options = {}) {
        try {
            const headers = swcHelpers.objectSpread({}, this.headers);
            let queryString = '';
            if (options.redirectTo) {
                queryString = '?redirect_to=' + encodeURIComponent(options.redirectTo);
            }
            const data = await (0, _fetch).post(this.fetch, `${this.url}/signup${queryString}`, {
                email,
                password,
                data: options.data,
                gotrue_meta_security: {
                    hcaptcha_token: options.captchaToken
                }
            }, {
                headers
            });
            const session = swcHelpers.objectSpread({}, data);
            if (session.expires_in) session.expires_at = (0, _helpers).expiresAt(data.expires_in);
            return {
                data: session,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Logs in an existing user using their email address.
   * @param email The email address of the user.
   * @param password The password of the user.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   */ async signInWithEmail(email, password, options = {}) {
        try {
            const headers = swcHelpers.objectSpread({}, this.headers);
            let queryString = '?grant_type=password';
            if (options.redirectTo) {
                queryString += '&redirect_to=' + encodeURIComponent(options.redirectTo);
            }
            const data = await (0, _fetch).post(this.fetch, `${this.url}/token${queryString}`, {
                email,
                password
            }, {
                headers
            });
            const session = swcHelpers.objectSpread({}, data);
            if (session.expires_in) session.expires_at = (0, _helpers).expiresAt(data.expires_in);
            return {
                data: session,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Signs up a new user using their phone number and a password.
   * @param phone The phone number of the user.
   * @param password The password of the user.
   * @param data Optional user metadata.
   */ async signUpWithPhone(phone, password, options = {}) {
        try {
            const headers = swcHelpers.objectSpread({}, this.headers);
            const data = await (0, _fetch).post(this.fetch, `${this.url}/signup`, {
                phone,
                password,
                data: options.data,
                gotrue_meta_security: {
                    hcaptcha_token: options.captchaToken
                }
            }, {
                headers
            });
            const session = swcHelpers.objectSpread({}, data);
            if (session.expires_in) session.expires_at = (0, _helpers).expiresAt(data.expires_in);
            return {
                data: session,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Logs in an existing user using their phone number and password.
   * @param phone The phone number of the user.
   * @param password The password of the user.
   */ async signInWithPhone(phone, password) {
        try {
            const headers = swcHelpers.objectSpread({}, this.headers);
            const queryString = '?grant_type=password';
            const data = await (0, _fetch).post(this.fetch, `${this.url}/token${queryString}`, {
                phone,
                password
            }, {
                headers
            });
            const session = swcHelpers.objectSpread({}, data);
            if (session.expires_in) session.expires_at = (0, _helpers).expiresAt(data.expires_in);
            return {
                data: session,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Logs in an OpenID Connect user using their id_token.
   * @param id_token The IDToken of the user.
   * @param nonce The nonce of the user. The nonce is a random value generated by the developer (= yourself) before the initial grant is started. You should check the OpenID Connect specification for details. https://openid.net/developers/specs/
   * @param provider The provider of the user.
   * @param client_id The clientID of the user.
   * @param issuer The issuer of the user.
   */ async signInWithOpenIDConnect({ id_token , nonce , client_id , issuer , provider  }) {
        try {
            const headers = swcHelpers.objectSpread({}, this.headers);
            const queryString = '?grant_type=id_token';
            const data = await (0, _fetch).post(this.fetch, `${this.url}/token${queryString}`, {
                id_token,
                nonce,
                client_id,
                issuer,
                provider
            }, {
                headers
            });
            const session = swcHelpers.objectSpread({}, data);
            if (session.expires_in) session.expires_at = (0, _helpers).expiresAt(data.expires_in);
            return {
                data: session,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Sends a magic login link to an email address.
   * @param email The email address of the user.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   */ async sendMagicLinkEmail(email, options = {}) {
        try {
            const headers = swcHelpers.objectSpread({}, this.headers);
            let queryString = '';
            if (options.redirectTo) {
                queryString += '?redirect_to=' + encodeURIComponent(options.redirectTo);
            }
            const data = await (0, _fetch).post(this.fetch, `${this.url}/magiclink${queryString}`, {
                email,
                gotrue_meta_security: {
                    hcaptcha_token: options.captchaToken
                }
            }, {
                headers
            });
            return {
                data,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Sends a mobile OTP via SMS. Will register the account if it doesn't already exist
   * @param phone The user's phone number WITH international prefix
   */ async sendMobileOTP(phone, options = {}) {
        try {
            let headers = swcHelpers.objectSpread({}, this.headers);
            const data = await (0, _fetch).post(this.fetch, `${this.url}/otp`, {
                phone,
                gotrue_meta_security: {
                    hcaptcha_token: options.captchaToken
                }
            }, {
                headers
            });
            return {
                data,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Removes a logged-in session.
   * @param jwt A valid, logged-in JWT.
   */ async signOut(jwt) {
        try {
            await (0, _fetch).post(this.fetch, `${this.url}/logout`, {}, {
                headers: this._createRequestHeaders(jwt),
                noResolveJson: true
            });
            return {
                error: null
            };
        } catch (e) {
            return {
                error: e
            };
        }
    }
    /**
   * Send User supplied Mobile OTP to be verified
   * @param phone The user's phone number WITH international prefix
   * @param token token that user was sent to their mobile phone
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   */ async verifyMobileOTP(phone, token, options = {}) {
        try {
            const headers = swcHelpers.objectSpread({}, this.headers);
            const data = await (0, _fetch).post(this.fetch, `${this.url}/verify`, {
                phone,
                token,
                type: 'sms',
                redirect_to: options.redirectTo
            }, {
                headers
            });
            return {
                data,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Sends an invite link to an email address.
   * @param email The email address of the user.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param data Optional user metadata
   */ async inviteUserByEmail(email, options = {}) {
        try {
            const headers = swcHelpers.objectSpread({}, this.headers);
            let queryString = '';
            if (options.redirectTo) {
                queryString += '?redirect_to=' + encodeURIComponent(options.redirectTo);
            }
            const data = await (0, _fetch).post(this.fetch, `${this.url}/invite${queryString}`, {
                email,
                data: options.data
            }, {
                headers
            });
            return {
                data,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Sends a reset request to an email address.
   * @param email The email address of the user.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   */ async resetPasswordForEmail(email, options = {}) {
        try {
            const headers = swcHelpers.objectSpread({}, this.headers);
            let queryString = '';
            if (options.redirectTo) {
                queryString += '?redirect_to=' + encodeURIComponent(options.redirectTo);
            }
            const data = await (0, _fetch).post(this.fetch, `${this.url}/recover${queryString}`, {
                email,
                gotrue_meta_security: {
                    hcaptcha_token: options.captchaToken
                }
            }, {
                headers
            });
            return {
                data,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Generates a new JWT.
   * @param refreshToken A valid refresh token that was returned on login.
   */ async refreshAccessToken(refreshToken) {
        try {
            const data = await (0, _fetch).post(this.fetch, `${this.url}/token?grant_type=refresh_token`, {
                refresh_token: refreshToken
            }, {
                headers: this.headers
            });
            const session = swcHelpers.objectSpread({}, data);
            if (session.expires_in) session.expires_at = (0, _helpers).expiresAt(data.expires_in);
            return {
                data: session,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Set/delete the auth cookie based on the AuthChangeEvent.
   * Works for Next.js & Express (requires cookie-parser middleware).
   * @param req The request object.
   * @param res The response object.
   */ setAuthCookie(req, res) {
        if (req.method !== 'POST') {
            res.setHeader('Allow', 'POST');
            res.status(405).end('Method Not Allowed');
        }
        const { event , session  } = req.body;
        if (!event) throw new Error('Auth event missing!');
        if (event === 'SIGNED_IN') {
            if (!session) throw new Error('Auth session missing!');
            var _lifetime;
            (0, _cookies).setCookies(req, res, [
                {
                    key: 'access-token',
                    value: session.access_token
                },
                {
                    key: 'refresh-token',
                    value: session.refresh_token
                }, 
            ].map((token)=>({
                    name: `${this.cookieName()}-${token.key}`,
                    value: token.value,
                    domain: this.cookieOptions.domain,
                    maxAge: (_lifetime = this.cookieOptions.lifetime) !== null && _lifetime !== void 0 ? _lifetime : 0,
                    path: this.cookieOptions.path,
                    sameSite: this.cookieOptions.sameSite
                })
            ));
        }
        if (event === 'SIGNED_OUT') {
            (0, _cookies).setCookies(req, res, [
                'access-token',
                'refresh-token'
            ].map((key)=>({
                    name: `${this.cookieName()}-${key}`,
                    value: '',
                    maxAge: -1
                })
            ));
        }
        res.status(200).json({});
    }
    /**
   * Deletes the Auth Cookies and redirects to the
   * @param req The request object.
   * @param res The response object.
   * @param options Optionally specify a `redirectTo` URL in the options.
   */ deleteAuthCookie(req, res, { redirectTo ='/'  }) {
        (0, _cookies).setCookies(req, res, [
            'access-token',
            'refresh-token'
        ].map((key)=>({
                name: `${this.cookieName()}-${key}`,
                value: '',
                maxAge: -1
            })
        ));
        return res.redirect(307, redirectTo);
    }
    /**
   * Helper method to generate the Auth Cookie string for you in case you can't use `setAuthCookie`.
   * @param req The request object.
   * @param res The response object.
   * @returns The Cookie string that needs to be set as the value for the `Set-Cookie` header.
   */ getAuthCookieString(req, res) {
        if (req.method !== 'POST') {
            res.setHeader('Allow', 'POST');
            res.status(405).end('Method Not Allowed');
        }
        const { event , session  } = req.body;
        if (!event) throw new Error('Auth event missing!');
        if (event === 'SIGNED_IN') {
            if (!session) throw new Error('Auth session missing!');
            var _lifetime;
            return (0, _cookies).getCookieString(req, res, [
                {
                    key: 'access-token',
                    value: session.access_token
                },
                {
                    key: 'refresh-token',
                    value: session.refresh_token
                }, 
            ].map((token)=>({
                    name: `${this.cookieName()}-${token.key}`,
                    value: token.value,
                    domain: this.cookieOptions.domain,
                    maxAge: (_lifetime = this.cookieOptions.lifetime) !== null && _lifetime !== void 0 ? _lifetime : 0,
                    path: this.cookieOptions.path,
                    sameSite: this.cookieOptions.sameSite
                })
            ));
        }
        if (event === 'SIGNED_OUT') {
            return (0, _cookies).getCookieString(req, res, [
                'access-token',
                'refresh-token'
            ].map((key)=>({
                    name: `${this.cookieName()}-${key}`,
                    value: '',
                    maxAge: -1
                })
            ));
        }
        return res.getHeader('Set-Cookie');
    }
    /**
   * Generates links to be sent via email or other.
   * @param type The link type ("signup" or "magiclink" or "recovery" or "invite").
   * @param email The user's email.
   * @param password User password. For signup only.
   * @param data Optional user metadata. For signup only.
   * @param redirectTo The link type ("signup" or "magiclink" or "recovery" or "invite").
   */ async generateLink(type, email, options = {}) {
        try {
            const data = await (0, _fetch).post(this.fetch, `${this.url}/admin/generate_link`, {
                type,
                email,
                password: options.password,
                data: options.data,
                redirect_to: options.redirectTo
            }, {
                headers: this.headers
            });
            return {
                data,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    // User Admin API
    /**
   * Creates a new user.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   *
   * @param attributes The data you want to create the user with.
   */ async createUser(attributes) {
        try {
            const data = await (0, _fetch).post(this.fetch, `${this.url}/admin/users`, attributes, {
                headers: this.headers
            });
            return {
                user: data,
                data,
                error: null
            };
        } catch (e) {
            return {
                user: null,
                data: null,
                error: e
            };
        }
    }
    /**
   * Get a list of users.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */ async listUsers() {
        try {
            const data = await (0, _fetch).get(this.fetch, `${this.url}/admin/users`, {
                headers: this.headers
            });
            return {
                data: data.users,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Get user by id.
   *
   * @param uid The user's unique identifier
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */ async getUserById(uid) {
        try {
            const data = await (0, _fetch).get(this.fetch, `${this.url}/admin/users/${uid}`, {
                headers: this.headers
            });
            return {
                data,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    /**
   * Get user by reading the cookie from the request.
   * Works for Next.js & Express (requires cookie-parser middleware).
   */ async getUserByCookie(req, res) {
        try {
            if (!req.cookies) {
                throw new Error('Not able to parse cookies! When using Express make sure the cookie-parser middleware is in use!');
            }
            const access_token = req.cookies[`${this.cookieName()}-access-token`];
            const refresh_token = req.cookies[`${this.cookieName()}-refresh-token`];
            if (!access_token) {
                throw new Error('No cookie found!');
            }
            const { user , error: getUserError  } = await this.getUser(access_token);
            if (getUserError) {
                if (!refresh_token) throw new Error('No refresh_token cookie found!');
                if (!res) throw new Error('You need to pass the res object to automatically refresh the session!');
                const { data , error  } = await this.refreshAccessToken(refresh_token);
                if (error) {
                    throw error;
                } else if (data) {
                    var _lifetime;
                    (0, _cookies).setCookies(req, res, [
                        {
                            key: 'access-token',
                            value: data.access_token
                        },
                        {
                            key: 'refresh-token',
                            value: data.refresh_token
                        }, 
                    ].map((token)=>({
                            name: `${this.cookieName()}-${token.key}`,
                            value: token.value,
                            domain: this.cookieOptions.domain,
                            maxAge: (_lifetime = this.cookieOptions.lifetime) !== null && _lifetime !== void 0 ? _lifetime : 0,
                            path: this.cookieOptions.path,
                            sameSite: this.cookieOptions.sameSite
                        })
                    ));
                    return {
                        token: data.access_token,
                        user: data.user,
                        data: data.user,
                        error: null
                    };
                }
            }
            return {
                token: access_token,
                user: user,
                data: user,
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
    }
    /**
   * Updates the user data.
   *
   * @param attributes The data you want to update.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */ async updateUserById(uid, attributes) {
        try {
            this //
            ;
            const data = await (0, _fetch).put(this.fetch, `${this.url}/admin/users/${uid}`, attributes, {
                headers: this.headers
            });
            return {
                user: data,
                data,
                error: null
            };
        } catch (e) {
            return {
                user: null,
                data: null,
                error: e
            };
        }
    }
    /**
   * Delete a user. Requires a `service_role` key.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   *
   * @param uid The user uid you want to remove.
   */ async deleteUser(uid) {
        try {
            const data = await (0, _fetch).remove(this.fetch, `${this.url}/admin/users/${uid}`, {}, {
                headers: this.headers
            });
            return {
                user: data,
                data,
                error: null
            };
        } catch (e) {
            return {
                user: null,
                data: null,
                error: e
            };
        }
    }
    /**
   * Gets the current user details.
   *
   * This method is called by the GoTrueClient `update` where
   * the jwt is set to this.currentSession.access_token
   * and therefore, acts like getting the currently authenticated used
   *
   * @param jwt A valid, logged-in JWT. Typically, the access_token for the currentSession
   */ async getUser(jwt) {
        try {
            const data = await (0, _fetch).get(this.fetch, `${this.url}/user`, {
                headers: this._createRequestHeaders(jwt)
            });
            return {
                user: data,
                data,
                error: null
            };
        } catch (e) {
            return {
                user: null,
                data: null,
                error: e
            };
        }
    }
    /**
   * Updates the user data.
   * @param jwt A valid, logged-in JWT.
   * @param attributes The data you want to update.
   */ async updateUser(jwt, attributes) {
        try {
            const data = await (0, _fetch).put(this.fetch, `${this.url}/user`, attributes, {
                headers: this._createRequestHeaders(jwt)
            });
            return {
                user: data,
                data,
                error: null
            };
        } catch (e) {
            return {
                user: null,
                data: null,
                error: e
            };
        }
    }
    constructor({ url ='' , headers ={} , cookieOptions , fetch  }){
        this.url = url;
        this.headers = headers;
        this.cookieOptions = swcHelpers.objectSpread({}, _constants.COOKIE_OPTIONS, cookieOptions);
        this.fetch = fetch;
    }
};
exports.default = GoTrueApi;

//# sourceMappingURL=GoTrueApi.js.map