import { getRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';
import redisCache from '@shared/cache/RedisCache';

class ListMovieService {
  public async execute(): Promise<Movie[]> {
    const moviesRepository = getRepository(Movie);

    let movies = await redisCache.recover<Movie[]>('api-movies-MOVIE_LIST');

    if(!movies) {
      movies = await moviesRepository.find();

      await redisCache.save('api-movies-MOVIE_LIST', JSON.stringify(movies));
    }

    return movies;
  }
}
export default ListMovieService;
