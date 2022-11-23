import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';
import redisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
}

class DeleteMovieService {
  public async execute({ id }: IRequest): Promise<void> {
    const moviesRepository = getRepository(Movie);

    const movie = await moviesRepository.findOne(id);

    if(!movie) {
      throw new AppError('Movie not found.');
    }

    await redisCache.invalidate('api-movies-MOVIE_LIST');

    await moviesRepository.remove(movie);
  }
}
export default DeleteMovieService;
