import { ParamSchema } from 'express-validator';

const NAME: ParamSchema = {
  notEmpty: true,
  trim: true,
  escape: true,
  optional: true,
  errorMessage: 'Name required',
};

export { NAME };
