import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly db;
    private readonly jwt;
    constructor(db: PrismaService, jwt: JwtService);
    validateUser(userId: string): Promise<import(".prisma/client").User>;
    generateToken: (user: any) => string;
    createUser(email: string, password: string): Promise<import(".prisma/client").User>;
}
