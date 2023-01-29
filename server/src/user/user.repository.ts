import { UserAuthBody } from 'auth/types/body.types';
import { AppDataSource } from '../data-source';
import { User } from './entity/user.entity';

export class UserRepository {
  private static _usersRepository = AppDataSource.getRepository(User);
  static async findOneByName(name: string): Promise<User | null> {
    const user: User | null = await this._usersRepository.findOneBy({
      name,
    });
    return user;
  }

  static async createUser(authParams: UserAuthBody): Promise<User> {
    const user: User = this._usersRepository.create(authParams);
    await this._usersRepository.save(user);
    return user;
  }
}
