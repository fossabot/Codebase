import { HttpService } from '@nestjs/axios';
import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly movies;
    private readonly http;
    constructor(movies: MoviesService, http: HttpService);
    getAll(groupId: string, movieId: string): Promise<import(".prisma/client").Movie | import(".prisma/client").Movie[]>;
    createMovie(groupId: string, body: any): Promise<import(".prisma/client").Movie>;
    getPopularMovies(): Promise<any>;
    getYtVideo(movieId: string): Promise<any>;
}
