import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private readonly db: PrismaService) {}

  async getAll(groupId: string) {
    const { movie } = await this.db.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        movie: true,
      },
    });
    return movie;
  }

  async create(movie, groupId: string) {
    const {
      overview,
      backdrop_path,
      title,
      poster_path,
      release_date,
      movie_id,
      adult,
    } = movie;
    try {
      return await this.db.movie.create({
        data: {
          title,
          overview,
          backdrop_path,
          poster_path,
          release_date,
          movie_id,
          adult,
          groupId,
        },
      });
    } catch {
      throw new HttpException({ error: 'MOVIE_EXISTS' }, 409);
    }
  }
}
