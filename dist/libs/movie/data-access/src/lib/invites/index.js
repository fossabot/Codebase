"use strict";
exports.createInviteLink = createInviteLink;
exports.getInviteInfo = getInviteInfo;
exports.removeInvite = removeInvite;
exports.ROLE = void 0;
var _utils = require("../../utils");
var _uuid = require("uuid");
var ROLE;
exports.ROLE = ROLE;
(function(ROLE) {
    ROLE["ADMIN"] = "ADMIN";
    ROLE["USER"] = "USER";
})(ROLE || (exports.ROLE = ROLE = {}));
const sbClient = (0, _utils).getClient();
async function createInviteLink(userId, groupId, role) {
    const inviteId = (0, _uuid).v4();
    const { error  } = await sbClient.from("invites").insert({
        owner_id: userId,
        group_id: groupId,
        role,
        invite_id: inviteId
    });
    if (error) {
        await sbClient.from("invites").delete().eq("group_id", groupId).eq("owner_id", userId);
        return createInviteLink(userId, groupId, role);
    }
    return [
        `${window.location.host}/app/invite/group?invite_id=${inviteId}`,
        error, 
    ];
}
async function getInviteInfo(inviteId) {
    const { data , error  } = await sbClient.from("invites").select().eq("invite_id", inviteId).maybeSingle();
    return [
        data,
        error
    ];
}
async function removeInvite(inviteId) {
    const { data , error  } = await sbClient.from("invites").delete().eq("invite_id", inviteId);
    return [
        data,
        error
    ];
}

//# sourceMappingURL=index.js.map