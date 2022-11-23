import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if(!user) {
      throw new AppError('User not found.');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-movies-USER_LIST');

    await usersRepository.remove(user);
  }
}
export default DeleteUserService;
