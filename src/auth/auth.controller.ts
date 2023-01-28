import { Response, NextFunction } from 'express';
import { STATUS_CODE } from '../constants';
import { authService } from './auth.service';
import { LoginRequest } from './types/request.types';

export default class AuthController {

  static async login(req: LoginRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const {token, role} = await authService.login(req.body);
      res.status(STATUS_CODE.OK).json({
        token,
        role,
      });
    } catch (error) {
      next(error);
    }
  }
}
