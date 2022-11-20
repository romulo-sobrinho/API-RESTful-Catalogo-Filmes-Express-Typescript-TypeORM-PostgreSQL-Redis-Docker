import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';

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

    await moviesRepository.remove(movie);
  }
}
export default DeleteMovieService;
