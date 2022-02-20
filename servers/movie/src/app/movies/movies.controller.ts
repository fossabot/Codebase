import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { map } from 'rxjs';
import { API_KEY } from '../constants/API_KEYS';
import { URLS } from '../constants/URLS';
import { UseAuth } from '../decorators/guard';
import { MoviesService } from './movies.service';

@Controller('groups/:id/movies')
@UseAuth('jwt')
export class MoviesController {
  constructor(
    private readonly movies: MoviesService,
    private readonly http: HttpService,
  ) {}

  @Get(['', 'all'])
  async getAll(
    @Param('id') groupId: string,
    @Query('movie_id') movieId: string,
  ) {
    if (groupId && !movieId) {
      const movies = await this.movies.getAll(groupId);
      return movies;
    } else if (movieId) {
      const movies = await this.movies.getById(movieId);
      console.log(movies);
      return movies;
    }
    console.log(movieId, groupId);
  }

  @Post()
  async createMovie(@Param('id') groupId: string, @Body() body: any) {
    return await this.movies.create(body, groupId);
  }

  @Get('recommendations')
  @UseAuth('jwt')
  async getPopularMovies(): Promise<any> {
    const KEY = API_KEY.MOVIE_DB;
    return this.http
      .get(`${URLS.TMDB}/movie/popular?api_key=${KEY}`)
      .pipe(map((v) => v.data));
  }

  @Get('preview')
  @UseAuth('jwt')
  async getYtVideo(@Query('movie_id') movieId: string): Promise<any> {
    const KEY = API_KEY.MOVIE_DB;
    console.log('tesing');
    console.log(`${URLS.TMDB}/movie/${movieId}/videos?api_key=${KEY}`);
    return this.http
      .get(`${URLS.TMDB}/movie/${movieId}/videos?api_key=${KEY}`)
      .pipe(map((v) => v.data));
  }
}
