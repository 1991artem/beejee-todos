import { Request } from 'express';
import { UserAuthBody } from './body.types';

export type LoginRequest = Request<unknown, unknown, UserAuthBody>;
