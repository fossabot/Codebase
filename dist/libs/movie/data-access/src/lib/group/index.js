"use strict";
exports.createGroup = exports.isMemberInGroup = exports.getGroupFromMember = exports.getGroupIcon = exports.getGroupFromId = exports.addMovieToGroup = void 0;
var swcHelpers = require("@swc/helpers");
var _utils = require("../../utils");
var _axios = require("axios");
const sbClient = (0, _utils).getClient();
const addMovieToGroup = async (movie, groupId)=>{
    try {
        const id = movie.id;
        const { data: result  } = await _axios.default.post(`/api/groups/${groupId}/movies`, swcHelpers.objectSpread({}, movie, {
            movie_id: id
        }));
        return [
            {},
            null
        ];
    } catch (e) {
        return [
            null,
            e
        ];
    }
};
exports.addMovieToGroup = addMovieToGroup;
const getGroupFromId = async (groupId)=>{
    const { data: group  } = await _axios.default.get(`/api/groups/${groupId}`);
    return group;
};
exports.getGroupFromId = getGroupFromId;
const getGroupIcon = (group)=>{
    if (group.group_icon) {
        var ref;
        const [bucket, ...pathArr] = group.group_icon.split("/");
        const path = pathArr.join("/");
        const res = sbClient.storage.from(bucket).getPublicUrl(path);
        return [
            (ref = res.data) === null || ref === void 0 ? void 0 : ref.publicURL,
            res.error
        ];
    } else {
        return [
            null,
            null
        ];
    }
};
exports.getGroupIcon = getGroupIcon;
const getGroupFromMember = async (userId)=>{
    const { data , error  } = await sbClient.from("group_members").select().eq("user_id", userId);
    if (data) {
        const result = data.map(async (value)=>{
            const [gruop, error] = await getGroupFromId(value.group_id);
            return gruop;
        });
        const toReturn = await Promise.all(result);
        return [
            toReturn,
            error
        ];
    } else {
        return [
            null,
            null
        ];
    }
};
exports.getGroupFromMember = getGroupFromMember;
const isMemberInGroup = async (userId, groupId)=>{
    const { data , error  } = await sbClient.from("group_members").select().eq("user_id", userId).eq("group_id", groupId).maybeSingle();
    error ? console.log("ERROR", error) : null;
    return data ? true : false;
};
exports.isMemberInGroup = isMemberInGroup;
const createGroup = async (groupName)=>{
    try {
        const { data: result  } = await _axios.default.post("/api/groups", {}, {
            params: {
                name: groupName
            }
        });
        return [
            result,
            null
        ];
    } catch (e) {
        return [
            null,
            e
        ];
    }
}; // export const getGroup = async ()  => {
 //   try {
 //     const { data: result } = await axios.get(
 //       "/api/groups",
 //       {},
 //       { params: { name: groupName } }
 //     );
 //     return [result, null];
 //   } catch (e) {
 //     return [null, e];
 //   }
 // }
exports.createGroup = createGroup;

//# sourceMappingURL=index.js.map