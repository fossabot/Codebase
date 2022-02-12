import { ApiMovieModel, DBGroupModel } from "../../types";
import { getClient } from "../../utils";

const sbClient = getClient();

export const addMovieToGroup = async (
  movie: ApiMovieModel,
  groupId: DBGroupModel["id"]
) => {
  const { data, error } = await sbClient
    .from("movies")
    .select()
    .eq("movie_id", movie["id"])
    .eq("group_id", groupId);
  if (!data?.length) {
    const insert = {
      backdrop_path: movie.backdrop_path,
      title: movie.title,
      overview: movie.overview,
      group_id: groupId,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      movie_id: movie.id,
      adult: movie.adult,
    };

    const { data, error } = await sbClient.from("movies").insert(insert);
    if (error) console.log(error);
    return [data, error];
  } else return [null, null];
};

export const getGroupFromId = async (groupId: DBGroupModel["id"]) => {
  const { data, error } = await sbClient
    .from("groups")
    .select("*")
    .eq("id", groupId)
    .maybeSingle();
  return [data, error];
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

export const createGroup = async (
  groupName: DBGroupModel["name"],
  userId: string,
  groupIcon?: string
) => {
  const { data, error } = await sbClient
    .from("groups")
    .insert({ name: groupName, owner_id: userId, group_icon: groupIcon });
  return [data, error];
};
