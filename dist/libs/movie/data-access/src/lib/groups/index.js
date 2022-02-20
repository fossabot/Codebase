"use strict";
exports.getAllGroups = void 0;
var _axios = require("axios");
const getAllGroups = async ()=>{
    return await _axios.default.get("/api/groups/all");
};
exports.getAllGroups = getAllGroups;

//# sourceMappingURL=index.js.map