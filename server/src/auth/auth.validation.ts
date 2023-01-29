import { checkSchema } from 'express-validator';
import * as VALIDATION_SCHEMAS from './constants/validation.constants';

const login = checkSchema({
  name: VALIDATION_SCHEMAS.NAME,
  password: {
    isLength: {
      errorMessage: 'Password equired',
      options: { min: 1 },
    },
    trim: true,
    escape: true,
  },
});

export {
  login,
};
