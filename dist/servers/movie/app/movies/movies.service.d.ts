import { PrismaService } from '../prisma/prisma.service';
export declare class MoviesService {
    private readonly db;
    constructor(db: PrismaService);
    getAll(groupId: string): Promise<import(".prisma/client").Movie[]>;
    create(movie: any, groupId: string): Promise<import(".prisma/client").Movie>;
    getById(movieId: string): Promise<import(".prisma/client").Movie>;
}
