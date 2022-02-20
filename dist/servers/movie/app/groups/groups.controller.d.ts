import { GroupsService } from './groups.service';
export declare class GroupsController {
    private readonly group;
    constructor(group: GroupsService);
    getAllGroups(req: any): Promise<{
        id: string;
        name: string;
    }[]>;
    getGroupById(id: string): Promise<import(".prisma/client").Group & {
        User: {
            id: string;
            email: string;
        };
        movie: import(".prisma/client").Movie[];
    }>;
    createGroup(name: any, req: any): Promise<import(".prisma/client").Group>;
}
