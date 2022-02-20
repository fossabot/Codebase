import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UseAuth } from '../decorators/guard';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @UseAuth('local')
  async Login(@Res({ passthrough: true }) res: Response, @Req() req) {
    console.log('tesing');
    const token = this.auth.generateToken(req.user);
    res.cookie('access_token', token, { httpOnly: true });
    return { access_token: token };
  }

  @Post('signup')
  async test(@Body() body: any) {
    const { email, password } = body;
    console.log(body);
    const user = this.auth.createUser(email, password);

    return user;
  }

  @Get('status')
  @UseAuth('jwt')
  async status() {
    return { status: 'AUTHED' };
  }

  @Get('user')
  @UseAuth('jwt')
  async getUser(@Req() req: any) {
    console.log(req.user);
    return req.user;
  }
}
