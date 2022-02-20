import { Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    Login(res: Response, req: any): Promise<{
        access_token: string;
    }>;
    test(body: any): Promise<import(".prisma/client").User>;
    status(): Promise<{
        status: string;
    }>;
    getUser(req: any): Promise<any>;
}
