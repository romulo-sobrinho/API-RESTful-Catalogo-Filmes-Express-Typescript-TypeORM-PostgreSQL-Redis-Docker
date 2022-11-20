import { getRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';

class ListMovieService {
  public async execute(): Promise<Movie[]> {
    const moviesRepository = getRepository(Movie);

    const movies = await moviesRepository.find();

    return movies;
  }
}
export default ListMovieService;
