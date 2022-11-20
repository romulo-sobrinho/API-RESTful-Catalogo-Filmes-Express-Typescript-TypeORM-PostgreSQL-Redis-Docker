import { EntityRepository, Repository } from 'typeorm';
import Movie from '../entities/Movie';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  public async findByTitle(title: string): Promise<Movie | undefined> {
    const movie = this.findOne({
      where: {
        title,
      },
    });
    return movie;
  }
}

export default MoviesRepository;
