import { Strategy } from 'passport-local';
import { PrismaService } from 'src/app/prisma/prisma.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(email: string, passwrd: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
    }>;
}
export {};
