import { ParamSchema } from 'express-validator';

const ID: ParamSchema = {
  in: ['params'],
  trim: true,
  isInt: true,
  escape: true,
  errorMessage: 'ID is invalid',
};

const LIMIT: ParamSchema = {
  in: 'query',
  trim: true,
  escape: true,
  isInt: {
    options: {
      min: 0,
    },
  },
  optional: true,
  errorMessage: 'Pagination params is invalid',
};

const OFFSET: ParamSchema = {
  in: 'query',
  trim: true,
  escape: true,
  isInt: {
    options: {
      min: 0,
    },
  },
  optional: true,
  errorMessage: 'Pagination params is invalid',
};

const FIELD: ParamSchema = {
  in: 'query',
  toLowerCase: true,
  isIn: {
    options: [['email', 'username', 'isdone']],
  },
  trim: true,
  escape: true,
  optional: true,
  errorMessage: 'Sort params is invalid',
};

const EMAIL: ParamSchema = {
  normalizeEmail: {
    options: { gmail_remove_dots: true, all_lowercase: true },
  },
  isEmail: {
    errorMessage: 'Please enter a valid email address',
  },
  trim: true,
  escape: true,
};

const USER_NAME: ParamSchema = {
  notEmpty: true,
  trim: true,
  escape: true,
  optional: true,
  errorMessage: 'Name required',
};

const DESCRIPTION: ParamSchema = {
  trim: true,
  escape: true,
  optional: true,
};

export { ID, LIMIT, FIELD, OFFSET, USER_NAME, DESCRIPTION, EMAIL };
