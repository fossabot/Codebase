"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const API_KEYS_1 = require("../constants/API_KEYS");
const URLS_1 = require("../constants/URLS");
const guard_1 = require("../decorators/guard");
const movies_service_1 = require("./movies.service");
let MoviesController = class MoviesController {
    constructor(movies, http) {
        this.movies = movies;
        this.http = http;
    }
    async getAll(groupId, movieId) {
        if (groupId && !movieId) {
            const movies = await this.movies.getAll(groupId);
            return movies;
        }
        else if (movieId) {
            const movies = await this.movies.getById(movieId);
            console.log(movies);
            return movies;
        }
        console.log(movieId, groupId);
    }
    async createMovie(groupId, body) {
        return await this.movies.create(body, groupId);
    }
    async getPopularMovies() {
        const KEY = API_KEYS_1.API_KEY.MOVIE_DB;
        return this.http
            .get(`${URLS_1.URLS.TMDB}/movie/popular?api_key=${KEY}`)
            .pipe((0, rxjs_1.map)((v) => v.data));
    }
    async getYtVideo(movieId) {
        const KEY = API_KEYS_1.API_KEY.MOVIE_DB;
        console.log('tesing');
        console.log(`${URLS_1.URLS.TMDB}/movie/${movieId}/videos?api_key=${KEY}`);
        return this.http
            .get(`${URLS_1.URLS.TMDB}/movie/${movieId}/videos?api_key=${KEY}`)
            .pipe((0, rxjs_1.map)((v) => v.data));
    }
};
__decorate([
    (0, common_1.Get)(['', 'all']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('movie_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "createMovie", null);
__decorate([
    (0, common_1.Get)('recommendations'),
    (0, guard_1.UseAuth)('jwt'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getPopularMovies", null);
__decorate([
    (0, common_1.Get)('preview'),
    (0, guard_1.UseAuth)('jwt'),
    __param(0, (0, common_1.Query)('movie_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getYtVideo", null);
MoviesController = __decorate([
    (0, common_1.Controller)('groups/:id/movies'),
    (0, guard_1.UseAuth)('jwt'),
    __metadata("design:paramtypes", [movies_service_1.MoviesService,
        axios_1.HttpService])
], MoviesController);
exports.MoviesController = MoviesController;
//# sourceMappingURL=movies.controller.js.map