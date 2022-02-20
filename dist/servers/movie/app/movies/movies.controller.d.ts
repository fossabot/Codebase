import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly movies;
    constructor(movies: MoviesService);
    getAll(groupId: string): Promise<import(".prisma/client").Movie[]>;
    createMovie(groupId: string, body: any): Promise<import(".prisma/client").Movie>;
    getPopularMovies(): Promise<string[]>;
}
