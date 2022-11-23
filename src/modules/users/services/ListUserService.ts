import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const redisCache = new RedisCache();

    let users = await redisCache.recover<User[]>('api-movies-USER_LIST');

    if(!users) {
      users = await usersRepository.find();

      await redisCache.save('api-movies-USER_LIST', JSON.stringify(users));
    }

    return users;
  }
}
export default ListUserService;
