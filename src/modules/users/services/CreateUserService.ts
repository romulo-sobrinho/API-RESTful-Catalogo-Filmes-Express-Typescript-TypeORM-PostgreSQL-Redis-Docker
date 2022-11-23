import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import redisCache from '@shared/cache/RedisCache';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassord = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassord
    })

    await redisCache.invalidate('api-movies-USER_LIST');

    await usersRepository.save(user);

    return user;
  }
}
export default CreateUserService;
