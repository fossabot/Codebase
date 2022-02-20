import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const UseAuth = (...args: any[]) => UseGuards(AuthGuard(...args));
