import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService],
  imports: [HttpModule],
})
export class MoviesModule {}
