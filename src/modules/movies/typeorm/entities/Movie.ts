import { Column, UpdateDateColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IMovie } from '@modules/movies/domain/models/IMovie';

@Entity('movies')
class Movie implements IMovie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column()
  url_image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Movie;
