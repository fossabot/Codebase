import { Module } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { PrismaModule } from './prisma/prisma.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    PassportModule,
    AuthModule,
    GroupsModule,
    PrismaModule,
    MoviesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
