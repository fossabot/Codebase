import { getClient } from "../../utils";

const sbClient = getClient();

export const getGroupsFromUid = async (userId: string) => {
  const { data, error } = await sbClient
    .from("groups")
    .select("*")
    .eq("owner_id", userId);
  return [data, error];
};
