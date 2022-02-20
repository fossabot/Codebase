import axios from "axios";

export const getAllMovies = async () => {
  try {
    const { data: result } = await axios.get("/api/movies");
    return [result, null];
  } catch (e) {
    return [null, e];
  }
};

export const getMovieRecommendations = async (groupId: string) => {
  try {
    const { data: result } = await axios.get(
      `/api/groups/${groupId}/movies/recommendations`
    );
    return [result, null];
  } catch (e) {
    return [null, e];
  }
};
