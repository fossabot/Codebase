import { ApiMovieModel, DBGroupModel } from "../../types";
import { getClient } from "../../utils";
import axios, { Axios } from "axios";
const sbClient = getClient();

export const addMovieToGroup = async (
  movie: ApiMovieModel,
  groupId: DBGroupModel["id"]
) => {
  try {
    const id = movie.id;
    const { data: result } = await axios.post(`/api/groups/${groupId}/movies`, {
      ...movie,
      movie_id: id,
    });
    return [{}, null];
  } catch (e) {
    return [null, e];
  }
};

export const getGroupFromId = async (groupId: string) => {
  const { data: group } = await axios.get(`/api/groups/${groupId}`);
  return group;
};

export const getGroupIcon = (group: DBGroupModel): any => {
  if (group.group_icon) {
    const [bucket, ...pathArr] = group.group_icon.split("/");
    const path = pathArr.join("/");
    const res = sbClient.storage.from(bucket).getPublicUrl(path);
    return [res.data?.publicURL, res.error];
  } else {
    return [null, null];
  }
};

export const getGroupFromMember = async (userId: string) => {
  const { data, error } = await sbClient
    .from("group_members")
    .select()
    .eq("user_id", userId);
  if (data) {
    const result = data.map(async (value) => {
      const [gruop, error] = await getGroupFromId(value.group_id);
      return gruop;
    });
    const toReturn = await Promise.all(result);
    return [toReturn, error];
  } else {
    return [null, null];
  }
};

export const isMemberInGroup = async (
  userId: string,
  groupId: DBGroupModel["id"]
) => {
  const { data, error } = await sbClient
    .from("group_members")
    .select()
    .eq("user_id", userId)
    .eq("group_id", groupId)
    .maybeSingle();
  error ? console.log("ERROR", error) : null;
  return data ? true : false;
};

export const createGroup = async (groupName: DBGroupModel["name"]) => {
  try {
    const { data: result } = await axios.post(
      "/api/groups",
      {},
      { params: { name: groupName } }
    );
    return [result, null];
  } catch (e) {
    return [null, e];
  }
};

// export const getGroup = async ()  => {
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
