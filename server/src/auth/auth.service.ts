import { USER_ROLE } from './../user/constants/user.constants';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User, UserRepository } from '@user';
import { AppError } from '@errors';
import { STATUS_CODE } from '@constants';
import { config } from 'config';
import { UserAuthBody } from './types/body.types';

class AuthService {

  async login(userDTO: UserAuthBody): Promise<{token: string, role: USER_ROLE}> {
    const { name, password } = userDTO;
    const user: User | null = await UserRepository.findOneByName(name);
    if (!user) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'User not found',
      );
    }
    const isMatch: boolean = await compare(password, user.password);
    if (!isMatch) {
      throw new AppError(STATUS_CODE.UNAUTHORIZED,
        'Authentification failed. Check your email/password.',
      );
    }
    const token: string = this.getJtwToken(user.id, user.role);
    return {
      token,
      role: user.role,
    };
  }

  getJtwToken(id: number, role: string): string {
    return sign({ id, role }, config.DEV.JWT_SECRET, {
      expiresIn: config.DEV.TOKEN_LIFETIME,
    });
  }
}

export const authService = new AuthService();