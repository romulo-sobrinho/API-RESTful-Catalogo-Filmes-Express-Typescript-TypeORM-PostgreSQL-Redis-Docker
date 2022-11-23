import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';
import redisCache from '@shared/cache/RedisCache';

interface IRequest {
  title: string;
  description: string;
  genre: string;
  url_image: string;
}

class CreateMovieService {
  public async execute({ title, description, genre, url_image }: IRequest): Promise<Movie> {
    const moviesRepository = getRepository(Movie);

    const movieExists = await moviesRepository.findOne({ title });

    if (movieExists) {
      throw new AppError('There is already a movie with this name.');
    }

    const movie = moviesRepository.create({
      title,
      description,
      genre,
      url_image
    })

    await redisCache.invalidate('api-movies-MOVIE_LIST');

    await moviesRepository.save(movie);

    return movie;
  }
}
export default CreateMovieService;
