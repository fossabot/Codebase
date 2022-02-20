"use strict";
exports.getMovieRecommendations = exports.getAllMovies = void 0;
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

//# sourceMappingURL=index.js.map