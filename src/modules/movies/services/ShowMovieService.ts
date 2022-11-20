import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';

interface IRequest {
  id: string;
}

class ShowMovieService {
  public async execute({ id }: IRequest): Promise<Movie> {
    const moviesRepository = getRepository(Movie);

    const movie = await moviesRepository.findOne(id);

    if(!movie) {
      throw new AppError('Movie not found.');
    }

    return movie;
  }
}
export default ShowMovieService;
