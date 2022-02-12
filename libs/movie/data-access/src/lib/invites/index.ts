// import { sbClient } from '@core/utils';
import { getClient } from "../../utils";

import { v4 as uuid } from "uuid";

export enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}

const sbClient = getClient();

type Role = "ADMIN" | "USER";

export async function createInviteLink(
  userId: string,
  groupId: number,
  role: Role
): Promise<[string, any]> {
  const inviteId = uuid();
  const { error } = await sbClient
    .from("invites")
    .insert({ owner_id: userId, group_id: groupId, role, invite_id: inviteId });
  if (error) {
    await sbClient
      .from("invites")
      .delete()
      .eq("group_id", groupId)
      .eq("owner_id", userId);
    return createInviteLink(userId, groupId, role);
  }
  return [
    `${window.location.host}/app/invite/group?invite_id=${inviteId}`,
    error,
  ];
}

export async function getInviteInfo(inviteId: string) {
  const { data, error } = await sbClient
    .from("invites")
    .select()
    .eq("invite_id", inviteId)
    .maybeSingle();
  return [data, error];
}

export async function removeInvite(inviteId: string) {
  const { data, error } = await sbClient
    .from("invites")
    .delete()
    .eq("invite_id", inviteId);
  return [data, error];
}
