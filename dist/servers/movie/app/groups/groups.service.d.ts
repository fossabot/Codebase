import { PrismaService } from '../prisma/prisma.service';
export declare class GroupsService {
    private readonly db;
    constructor(db: PrismaService);
    getGroupFromUser(userId: string): Promise<void>;
    getAll(userId: string): Promise<{
        id: string;
        name: string;
    }[]>;
    getById(id: string): Promise<import(".prisma/client").Group & {
        User: {
            id: string;
            email: string;
        };
        movie: import(".prisma/client").Movie[];
    }>;
    createGroup(name: string, ownerId: string): Promise<import(".prisma/client").Group>;
}
