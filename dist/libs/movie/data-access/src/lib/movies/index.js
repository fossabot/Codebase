"use strict";
exports.getMoviePreview = exports.getMovieFromId = exports.getMovieRecommendations = exports.getAllMovies = void 0;
var _axios = require("axios");
const getAllMovies = async ()=>{
    try {
        const { data: result  } = await _axios.default.get("/api/movies");
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
};
exports.getAllMovies = getAllMovies;
const getMovieRecommendations = async (groupId)=>{
    try {
        const { data: result  } = await _axios.default.get(`/api/groups/${groupId}/movies/recommendations`);
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
};
exports.getMovieRecommendations = getMovieRecommendations;
const getMovieFromId = async (movieId, groupId)=>{
    try {
        const { data: result  } = await _axios.default.get(`/api/groups/${groupId}/movies`, {
            params: {
                movie_id: movieId
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
};
exports.getMovieFromId = getMovieFromId;
const getMoviePreview = async (movieId, groupId)=>{
    try {
        const { data: result  } = await _axios.default.get(`/api/groups/${groupId}/movies/preview`, {
            params: {
                movie_id: movieId
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
};
exports.getMoviePreview = getMoviePreview;

//# sourceMappingURL=index.js.map