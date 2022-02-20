"use strict";
exports.default = void 0;
var swcHelpers = require("@swc/helpers");
var _goTrueApi = require("./GoTrueApi");
var _helpers = require("./lib/helpers");
var _constants = require("./lib/constants");
var _polyfills = require("./lib/polyfills");
var ref;
(0, _polyfills // Make "globalThis" available
).polyfillGlobalThis();
const DEFAULT_OPTIONS = {
    url: _constants.GOTRUE_URL,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    multiTab: true,
    headers: _constants.DEFAULT_HEADERS
};
let GoTrueClient = class GoTrueClient {
    /**
   * Creates a new user.
   * @type UserCredentials
   * @param email The user's email address.
   * @param password The user's password.
   * @param phone The user's phone number.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param data Optional user metadata.
   */ async signUp({ email , password , phone  }, options = {}) {
        try {
            this._removeSession();
            const { data , error  } = phone && password ? await this.api.signUpWithPhone(phone, password, {
                data: options.data,
                captchaToken: options.captchaToken
            }) : await this.api.signUpWithEmail(email, password, {
                redirectTo: options.redirectTo,
                data: options.data,
                captchaToken: options.captchaToken
            });
            if (error) {
                throw error;
            }
            if (!data) {
                throw 'An error occurred on sign up.';
            }
            let session = null;
            let user = null;
            if (data.access_token) {
                session = data;
                user = session.user;
                this._saveSession(session);
                this._notifyAllSubscribers('SIGNED_IN');
            }
            if (data.id) {
                user = data;
            }
            return {
                user,
                session,
                error: null
            };
        } catch (e) {
            return {
                user: null,
                session: null,
                error: e
            };
        }
    }
    /**
   * Log in an existing user, or login via a third-party provider.
   * @type UserCredentials
   * @param email The user's email address.
   * @param password The user's password.
   * @param refreshToken A valid refresh token that was returned on login.
   * @param provider One of the providers supported by GoTrue.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param scopes A space-separated list of scopes granted to the OAuth application.
   */ async signIn({ email , phone , password , refreshToken , provider , oidc  }, options = {}) {
        try {
            this._removeSession();
            if (email && !password) {
                const { error  } = await this.api.sendMagicLinkEmail(email, {
                    redirectTo: options.redirectTo,
                    captchaToken: options.captchaToken
                });
                return {
                    user: null,
                    session: null,
                    error
                };
            }
            if (email && password) {
                return this._handleEmailSignIn(email, password, {
                    redirectTo: options.redirectTo
                });
            }
            if (phone && !password) {
                const { error  } = await this.api.sendMobileOTP(phone, {
                    captchaToken: options.captchaToken
                });
                return {
                    user: null,
                    session: null,
                    error
                };
            }
            if (phone && password) {
                return this._handlePhoneSignIn(phone, password);
            }
            if (refreshToken) {
                // currentSession and currentUser will be updated to latest on _callRefreshToken using the passed refreshToken
                const { error  } = await this._callRefreshToken(refreshToken);
                if (error) throw error;
                return {
                    user: this.currentUser,
                    session: this.currentSession,
                    error: null
                };
            }
            if (provider) {
                return this._handleProviderSignIn(provider, {
                    redirectTo: options.redirectTo,
                    scopes: options.scopes
                });
            }
            if (oidc) {
                return this._handleOpenIDConnectSignIn(oidc);
            }
            throw new Error(`You must provide either an email, phone number, a third-party provider or OpenID Connect.`);
        } catch (e) {
            return {
                user: null,
                session: null,
                error: e
            };
        }
    }
    /**
   * Log in a user given a User supplied OTP received via mobile.
   * @param phone The user's phone number.
   * @param token The user's password.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   */ async verifyOTP({ phone , token  }, options = {}) {
        try {
            this._removeSession();
            const { data , error  } = await this.api.verifyMobileOTP(phone, token, options);
            if (error) {
                throw error;
            }
            if (!data) {
                throw 'An error occurred on token verification.';
            }
            let session = null;
            let user = null;
            if (data.access_token) {
                session = data;
                user = session.user;
                this._saveSession(session);
                this._notifyAllSubscribers('SIGNED_IN');
            }
            if (data.id) {
                user = data;
            }
            return {
                user,
                session,
                error: null
            };
        } catch (e) {
            return {
                user: null,
                session: null,
                error: e
            };
        }
    }
    /**
   * Inside a browser context, `user()` will return the user data, if there is a logged in user.
   *
   * For server-side management, you can get a user through `auth.api.getUserByCookie()`
   */ user() {
        return this.currentUser;
    }
    /**
   * Returns the session data, if there is an active session.
   */ session() {
        return this.currentSession;
    }
    /**
   * Force refreshes the session including the user data in case it was updated in a different session.
   */ async refreshSession() {
        try {
            var ref1;
            if (!((ref1 = this.currentSession) === null || ref1 === void 0 ? void 0 : ref1.access_token)) throw new Error('Not logged in.');
            // currentSession and currentUser will be updated to latest on _callRefreshToken
            const { error  } = await this._callRefreshToken();
            if (error) throw error;
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
    }
    /**
   * Updates user data, if there is a logged in user.
   */ async update(attributes) {
        try {
            var ref2;
            if (!((ref2 = this.currentSession) === null || ref2 === void 0 ? void 0 : ref2.access_token)) throw new Error('Not logged in.');
            const { user , error  } = await this.api.updateUser(this.currentSession.access_token, attributes);
            if (error) throw error;
            if (!user) throw Error('Invalid user data.');
            const session = swcHelpers.objectSpread({}, this.currentSession, {
                user
            });
            this._saveSession(session);
            this._notifyAllSubscribers('USER_UPDATED');
            return {
                data: user,
                user,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                user: null,
                error: e
            };
        }
    }
    /**
   * Sets the session data from refresh_token and returns current Session and Error
   * @param refresh_token a JWT token
   */ async setSession(refresh_token) {
        try {
            if (!refresh_token) {
                throw new Error('No current session.');
            }
            const { data , error  } = await this.api.refreshAccessToken(refresh_token);
            if (error) {
                return {
                    session: null,
                    error: error
                };
            }
            this._saveSession(data);
            this._notifyAllSubscribers('SIGNED_IN');
            return {
                session: data,
                error: null
            };
        } catch (e) {
            return {
                error: e,
                session: null
            };
        }
    }
    /**
   * Overrides the JWT on the current client. The JWT will then be sent in all subsequent network requests.
   * @param access_token a jwt access token
   */ setAuth(access_token) {
        this.currentSession = swcHelpers.objectSpread({}, this.currentSession, {
            access_token,
            token_type: 'bearer',
            user: null
        });
        return this.currentSession;
    }
    /**
   * Gets the session data from a URL string
   * @param options.storeSession Optionally store the session in the browser
   */ async getSessionFromUrl(options) {
        try {
            if (!(0, _helpers).isBrowser()) throw new Error('No browser detected.');
            const error_description = (0, _helpers).getParameterByName('error_description');
            if (error_description) throw new Error(error_description);
            const provider_token = (0, _helpers).getParameterByName('provider_token');
            const access_token = (0, _helpers).getParameterByName('access_token');
            if (!access_token) throw new Error('No access_token detected.');
            const expires_in = (0, _helpers).getParameterByName('expires_in');
            if (!expires_in) throw new Error('No expires_in detected.');
            const refresh_token = (0, _helpers).getParameterByName('refresh_token');
            if (!refresh_token) throw new Error('No refresh_token detected.');
            const token_type = (0, _helpers).getParameterByName('token_type');
            if (!token_type) throw new Error('No token_type detected.');
            const timeNow = Math.round(Date.now() / 1000);
            const expires_at = timeNow + parseInt(expires_in);
            const { user , error  } = await this.api.getUser(access_token);
            if (error) throw error;
            const session = {
                provider_token,
                access_token,
                expires_in: parseInt(expires_in),
                expires_at,
                refresh_token,
                token_type,
                user: user
            };
            if (options === null || options === void 0 ? void 0 : options.storeSession) {
                this._saveSession(session);
                const recoveryMode = (0, _helpers).getParameterByName('type');
                this._notifyAllSubscribers('SIGNED_IN');
                if (recoveryMode === 'recovery') {
                    this._notifyAllSubscribers('PASSWORD_RECOVERY');
                }
            }
            // Remove tokens from URL
            window.location.hash = '';
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
   * Inside a browser context, `signOut()` will remove the logged in user from the browser session
   * and log them out - removing all items from localstorage and then trigger a "SIGNED_OUT" event.
   *
   * For server-side management, you can disable sessions by passing a JWT through to `auth.api.signOut(JWT: string)`
   */ async signOut() {
        var ref3;
        const accessToken = (ref3 = this.currentSession) === null || ref3 === void 0 ? void 0 : ref3.access_token;
        this._removeSession();
        this._notifyAllSubscribers('SIGNED_OUT');
        if (accessToken) {
            const { error  } = await this.api.signOut(accessToken);
            if (error) return {
                error
            };
        }
        return {
            error: null
        };
    }
    /**
   * Receive a notification every time an auth event happens.
   * @returns {Subscription} A subscription object which can be used to unsubscribe itself.
   */ onAuthStateChange(callback) {
        try {
            const id = (0, _helpers).uuid();
            const subscription = {
                id,
                callback,
                unsubscribe: ()=>{
                    this.stateChangeEmitters.delete(id);
                }
            };
            this.stateChangeEmitters.set(id, subscription);
            return {
                data: subscription,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                error: e
            };
        }
    }
    async _handleEmailSignIn(email, password, options = {}) {
        try {
            var ref5, ref4;
            const { data , error  } = await this.api.signInWithEmail(email, password, {
                redirectTo: options.redirectTo
            });
            if (error || !data) return {
                data: null,
                user: null,
                session: null,
                error
            };
            if ((data === null || data === void 0 ? void 0 : (ref5 = data.user) === null || ref5 === void 0 ? void 0 : ref5.confirmed_at) || (data === null || data === void 0 ? void 0 : (ref4 = data.user) === null || ref4 === void 0 ? void 0 : ref4.email_confirmed_at)) {
                this._saveSession(data);
                this._notifyAllSubscribers('SIGNED_IN');
            }
            return {
                data,
                user: data.user,
                session: data,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                user: null,
                session: null,
                error: e
            };
        }
    }
    async _handlePhoneSignIn(phone, password) {
        try {
            var ref6;
            const { data , error  } = await this.api.signInWithPhone(phone, password);
            if (error || !data) return {
                data: null,
                user: null,
                session: null,
                error
            };
            if (data === null || data === void 0 ? void 0 : (ref6 = data.user) === null || ref6 === void 0 ? void 0 : ref6.phone_confirmed_at) {
                this._saveSession(data);
                this._notifyAllSubscribers('SIGNED_IN');
            }
            return {
                data,
                user: data.user,
                session: data,
                error: null
            };
        } catch (e) {
            return {
                data: null,
                user: null,
                session: null,
                error: e
            };
        }
    }
    _handleProviderSignIn(provider, options = {}) {
        const url = this.api.getUrlForProvider(provider, {
            redirectTo: options.redirectTo,
            scopes: options.scopes
        });
        try {
            // try to open on the browser
            if ((0, _helpers).isBrowser()) {
                window.location.href = url;
            }
            return {
                provider,
                url,
                data: null,
                session: null,
                user: null,
                error: null
            };
        } catch (e) {
            // fallback to returning the URL
            if (url) return {
                provider,
                url,
                data: null,
                session: null,
                user: null,
                error: null
            };
            return {
                data: null,
                user: null,
                session: null,
                error: e
            };
        }
    }
    async _handleOpenIDConnectSignIn({ id_token , nonce , client_id , issuer , provider  }) {
        if (id_token && nonce && (client_id && issuer || provider)) {
            try {
                const { data , error  } = await this.api.signInWithOpenIDConnect({
                    id_token,
                    nonce,
                    client_id,
                    issuer,
                    provider
                });
                if (error || !data) return {
                    user: null,
                    session: null,
                    error
                };
                this._saveSession(data);
                this._notifyAllSubscribers('SIGNED_IN');
                return {
                    user: data.user,
                    session: data,
                    error: null
                };
            } catch (e) {
                return {
                    user: null,
                    session: null,
                    error: e
                };
            }
        }
        throw new Error(`You must provide a OpenID Connect provider with your id token and nonce.`);
    }
    /**
   * Attempts to get the session from LocalStorage
   * Note: this should never be async (even for React Native), as we need it to return immediately in the constructor.
   */ _recoverSession() {
        try {
            var ref7;
            const json = (0, _helpers).isBrowser() && ((ref7 = this.localStorage) === null || ref7 === void 0 ? void 0 : ref7.getItem(_constants.STORAGE_KEY));
            if (!json || typeof json !== 'string') {
                return null;
            }
            const data = JSON.parse(json);
            const { currentSession , expiresAt  } = data;
            const timeNow = Math.round(Date.now() / 1000);
            if (expiresAt >= timeNow && (currentSession === null || currentSession === void 0 ? void 0 : currentSession.user)) {
                this._saveSession(currentSession);
                this._notifyAllSubscribers('SIGNED_IN');
            }
        } catch (error) {
            console.log('error', error);
        }
    }
    /**
   * Recovers the session from LocalStorage and refreshes
   * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
   */ async _recoverAndRefresh() {
        try {
            const json = (0, _helpers).isBrowser() && await this.localStorage.getItem(_constants.STORAGE_KEY);
            if (!json) {
                return null;
            }
            const data = JSON.parse(json);
            const { currentSession , expiresAt  } = data;
            const timeNow = Math.round(Date.now() / 1000);
            if (expiresAt < timeNow) {
                if (this.autoRefreshToken && currentSession.refresh_token) {
                    const { error  } = await this._callRefreshToken(currentSession.refresh_token);
                    if (error) {
                        console.log(error.message);
                        await this._removeSession();
                    }
                } else {
                    this._removeSession();
                }
            } else if (!currentSession || !currentSession.user) {
                console.log('Current session is missing data.');
                this._removeSession();
            } else {
                // should be handled on _recoverSession method already
                // But we still need the code here to accommodate for AsyncStorage e.g. in React native
                this._saveSession(currentSession);
                this._notifyAllSubscribers('SIGNED_IN');
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    async _callRefreshToken(refresh_token = (ref = this.currentSession) === null || ref === void 0 ? void 0 : ref.refresh_token) {
        try {
            if (!refresh_token) {
                throw new Error('No current session.');
            }
            const { data , error  } = await this.api.refreshAccessToken(refresh_token);
            if (error) throw error;
            if (!data) throw Error('Invalid session data.');
            this._saveSession(data);
            this._notifyAllSubscribers('TOKEN_REFRESHED');
            this._notifyAllSubscribers('SIGNED_IN');
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
    _notifyAllSubscribers(event) {
        this.stateChangeEmitters.forEach((x)=>x.callback(event, this.currentSession)
        );
    }
    /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */ _saveSession(session) {
        this.currentSession = session;
        this.currentUser = session.user;
        const expiresAt = session.expires_at;
        if (expiresAt) {
            const timeNow = Math.round(Date.now() / 1000);
            const expiresIn = expiresAt - timeNow;
            const refreshDurationBeforeExpires = expiresIn > 60 ? 60 : 0.5;
            this._startAutoRefreshToken((expiresIn - refreshDurationBeforeExpires) * 1000);
        }
        // Do we need any extra check before persist session
        // access_token or user ?
        if (this.persistSession && session.expires_at) {
            this._persistSession(this.currentSession);
        }
    }
    _persistSession(currentSession) {
        const data = {
            currentSession,
            expiresAt: currentSession.expires_at
        };
        (0, _helpers).isBrowser() && this.localStorage.setItem(_constants.STORAGE_KEY, JSON.stringify(data));
    }
    async _removeSession() {
        this.currentSession = null;
        this.currentUser = null;
        if (this.refreshTokenTimer) clearTimeout(this.refreshTokenTimer);
        (0, _helpers).isBrowser() && await this.localStorage.removeItem(_constants.STORAGE_KEY);
    }
    /**
   * Clear and re-create refresh token timer
   * @param value time intervals in milliseconds
   */ _startAutoRefreshToken(value) {
        if (this.refreshTokenTimer) clearTimeout(this.refreshTokenTimer);
        if (value <= 0 || !this.autoRefreshToken) return;
        this.refreshTokenTimer = setTimeout(()=>this._callRefreshToken()
        , value);
        if (typeof this.refreshTokenTimer.unref === 'function') this.refreshTokenTimer.unref();
    }
    /**
   * Listens for changes to LocalStorage and updates the current session.
   */ _listenForMultiTabEvents() {
        if (!this.multiTab || !(0, _helpers).isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
            // console.debug('Auth multi-tab support is disabled.')
            return false;
        }
        try {
            window === null || window === void 0 ? void 0 : window.addEventListener('storage', (e)=>{
                if (e.key === _constants.STORAGE_KEY) {
                    var ref;
                    const newSession = JSON.parse(String(e.newValue));
                    if (newSession === null || newSession === void 0 ? void 0 : (ref = newSession.currentSession) === null || ref === void 0 ? void 0 : ref.access_token) {
                        this._recoverAndRefresh();
                        this._notifyAllSubscribers('SIGNED_IN');
                    } else {
                        this._removeSession();
                        this._notifyAllSubscribers('SIGNED_OUT');
                    }
                }
            });
        } catch (error) {
            console.error('_listenForMultiTabEvents', error);
        }
    }
    /**
   * Create a new client for use in the browser.
   * @param options.url The URL of the GoTrue server.
   * @param options.headers Any additional headers to send to the GoTrue server.
   * @param options.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
   * @param options.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
   * @param options.persistSession Set to "true" if you want to automatically save the user session into local storage.
   * @param options.localStorage Provide your own local storage implementation to use instead of the browser's local storage.
   * @param options.multiTab Set to "false" if you want to disable multi-tab/window events.
   * @param options.cookieOptions
   * @param options.fetch A custom fetch implementation.
   */ constructor(options){
        this.stateChangeEmitters = new Map();
        const settings = swcHelpers.objectSpread({}, DEFAULT_OPTIONS, options);
        this.currentUser = null;
        this.currentSession = null;
        this.autoRefreshToken = settings.autoRefreshToken;
        this.persistSession = settings.persistSession;
        this.multiTab = settings.multiTab;
        this.localStorage = settings.localStorage || globalThis.localStorage;
        this.api = new _goTrueApi.default({
            url: settings.url,
            headers: settings.headers,
            cookieOptions: settings.cookieOptions,
            fetch: settings.fetch
        });
        this._recoverSession();
        this._recoverAndRefresh();
        this._listenForMultiTabEvents();
        if (settings.detectSessionInUrl && (0, _helpers).isBrowser() && !!(0, _helpers).getParameterByName('access_token')) {
            // Handle the OAuth redirect
            this.getSessionFromUrl({
                storeSession: true
            }).then(({ error  })=>{
                if (error) {
                    console.error('Error getting session from URL.', error);
                }
            });
        }
    }
};
exports.default = GoTrueClient;

//# sourceMappingURL=GoTrueClient.js.map