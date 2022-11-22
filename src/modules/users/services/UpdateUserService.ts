import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userExists = await usersRepository.findByEmail(email);

    if (userExists && email !== user.email) {
      throw new AppError('There is already a user with this email.');
    }

    const hashedPassord = await hash(password, 8);

    user.name = name;
    user.email = email;
    user.password = hashedPassord;

    await usersRepository.save(user);

    return user;
  }
}
export default UpdateUserService;
