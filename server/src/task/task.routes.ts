import { Application, Router } from 'express';
import { validatePayload, isAuth, checkRole } from '@middleware';
import * as validation from './task.validation';
import TaskController from './task.controller';

const router = Router();
router.post('/create', isAuth, checkRole(['admin']), validation.createTask, validatePayload, TaskController.createTask);
router.get('/all', validation.getAllTasks, validatePayload, TaskController.getAllTasks);
router.delete('/:id',isAuth, checkRole(['admin']), validation.deleteTaskById, validatePayload, TaskController.deleteTaskById);
router.patch('/:id', isAuth, checkRole(['admin']), validation.updateTaskById, validatePayload, TaskController.updateTaskById);

export function mountRouter(app: Application): void {
  app.use('/api/v1/task', router);
}
