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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MoviesService = class MoviesService {
    constructor(db) {
        this.db = db;
    }
    async getAll(groupId) {
        const { movie } = await this.db.group.findUnique({
            where: {
                id: groupId,
            },
            include: {
                movie: true,
            },
        });
        return movie;
    }
    async create(movie, groupId) {
        const { overview, backdrop_path, title, poster_path, release_date, movie_id, adult, } = movie;
        try {
            console.log(movie_id);
            return await this.db.movie.create({
                data: {
                    title,
                    overview,
                    backdrop_path,
                    poster_path,
                    release_date,
                    movie_id,
                    adult,
                    group: {
                        connect: {
                            id: groupId,
                        },
                    },
                },
            });
        }
        catch (e) {
            console.log('ERRROR');
            throw new common_1.HttpException({ error: 'MOVIE_EXISTS' }, 409);
        }
    }
    async getById(movieId) {
        const data = await this.db.movie.findUnique({
            where: {
                id: movieId,
            },
        });
        return data;
    }
};
MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MoviesService);
exports.MoviesService = MoviesService;
//# sourceMappingURL=movies.service.js.map