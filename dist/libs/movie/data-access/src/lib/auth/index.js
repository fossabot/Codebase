"use strict";
exports.getUser = exports.checkAuth = exports.signIn = exports.signUp = void 0;
var _axios = require("axios");
const signUp = async (email, password)=>{
    return await _axios.default.post("/api/auth/signup", {
        email,
        password
    });
};
exports.signUp = signUp;
const signIn = async (email, password)=>{
    console.log({
        email,
        password
    });
    return await _axios.default.post("/api/auth/login", {
        email,
        password
    });
};
exports.signIn = signIn;
const checkAuth = async ()=>{
    try {
        const { data: result  } = await _axios.default.get("/api/auth/status");
        return result.status === "AUTHED";
    } catch (e) {
        return false;
    }
};
exports.checkAuth = checkAuth;
const getUser = async ()=>{
    const { data: result  } = await _axios.default.get("/api/auth/user");
    return result;
};
exports.getUser = getUser;

//# sourceMappingURL=index.js.map