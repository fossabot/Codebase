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

export const getMovieFromId = async (movieId: string, groupId: string) => {
  try {
    const { data: result } = await axios.get(`/api/groups/${groupId}/movies`, {
      params: { movie_id: movieId },
    });
    return [result, null];
  } catch (e) {
    return [null, e];
  }
};

export const getMoviePreview = async (movieId: string, groupId: string) => {
  try {
    const { data: result } = await axios.get(
      `/api/groups/${groupId}/movies/preview`,
      {
        params: { movie_id: movieId },
      }
    );
    return [result, null];
  } catch (e) {
    return [null, e];
  }
};
