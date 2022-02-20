import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UseAuth } from '../decorators/guard';
import { MoviesService } from './movies.service';

@Controller('groups/:id/movies')
@UseAuth('jwt')
export class MoviesController {
  constructor(private readonly movies: MoviesService) {}

  @Get(['', 'all'])
  async getAll(@Param('id') groupId: string) {
    const movies = await this.movies.getAll(groupId);

    return movies;
  }

  @Post()
  async createMovie(@Param('id') groupId: string, @Body() body: any) {
    return await this.movies.create(body, groupId);
  }

  @Get('recommendations')
  @UseAuth('jwt')
  async getPopularMovies() {
    return ['fdjklfd', 'fdj'];
  }
}
