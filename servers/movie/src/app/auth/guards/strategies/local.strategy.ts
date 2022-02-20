import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { PrismaService } from 'src/app/prisma/prisma.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, passwrd: string) {
    console.log('fdsjl');
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password: passwrd,
      },
    });

    if (!user) throw new UnauthorizedException();
    console.log(email, passwrd);
    const { password, ...result } = user;

    return result;
  }
}
