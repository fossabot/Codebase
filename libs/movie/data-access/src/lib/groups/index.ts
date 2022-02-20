import axios from "axios";

export const getAllGroups = async () => {
  return await axios.get("/api/groups/all");
};
