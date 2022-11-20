import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';

interface IRequest {
  id: string;
  title: string;
  description: string;
  genre: string;
  url_image: string;
}

class UpdateMovieService {
  public async execute({ id, title, description, genre, url_image }: IRequest): Promise<Movie> {
    const moviesRepository = getRepository(Movie);

    const movie = await moviesRepository.findOne(id);

    if (!movie) {
      throw new AppError('Movie not found.');
    }

    const movieExists = await moviesRepository.findOne({ title });

    if (movieExists && title !== movie.title) {
      throw new AppError('There is already a movie with this name.');
    }

    movie.title = title;
    movie.description = description;
    movie.genre = genre;
    movie.url_image = url_image;

    await moviesRepository.save(movie);

    return movie;
  }
}
export default UpdateMovieService;
