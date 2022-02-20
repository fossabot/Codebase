import { Strategy } from 'passport-jwt';
import { AuthService } from 'src/app/auth/auth.service';
import { PrismaService } from 'src/app/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prisma;
    private readonly auth;
    constructor(prisma: PrismaService, auth: AuthService);
    validate(payload: any): Promise<{
        id: string;
        email: string;
        createdAt: Date;
    }>;
}
export {};
