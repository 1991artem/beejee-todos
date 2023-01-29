import { checkSchema } from 'express-validator';
import * as VALIDATION_SCHEMAS from './constants/validation.constants';

const createTask = checkSchema({ username: VALIDATION_SCHEMAS.USER_NAME, email: VALIDATION_SCHEMAS.EMAIL, description: VALIDATION_SCHEMAS.DESCRIPTION });

const updateTaskById = checkSchema({ id: VALIDATION_SCHEMAS.ID, username: VALIDATION_SCHEMAS.USER_NAME, email: VALIDATION_SCHEMAS.EMAIL, });

const getTaskById = checkSchema({ id: VALIDATION_SCHEMAS.ID });

const deleteTaskById = checkSchema({ id: VALIDATION_SCHEMAS.ID });

const getAllTasks = checkSchema({
  'pagination.[limit]': VALIDATION_SCHEMAS.LIMIT,
  'pagination.[offset]': VALIDATION_SCHEMAS.OFFSET,
  'sort.[field]': VALIDATION_SCHEMAS.FIELD,
  'sort.[type]': VALIDATION_SCHEMAS.TYPE,
});

export {
  createTask,
  updateTaskById,
  getAllTasks,
  getTaskById,
  deleteTaskById,
};
