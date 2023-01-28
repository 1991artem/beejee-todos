import { AppError } from '@errors';
import { STATUS_CODE } from '@constants';
import { Task } from './entity/task.entity';
import { TaskRepository } from './task.repository';
import { GetAllTaskResponse, QueryParams } from './types/task-types';
import { CreateTaskBody, UpdateTaskBody } from './types/body.types';
import { GetAllQueryParams } from './types/query.types';

export class TaskService {
  static createTask(taskDTO: CreateTaskBody): Promise<Task> {
    return TaskRepository.createTask(taskDTO);
  }

  static async getAllTasks(queryParams: Partial<GetAllQueryParams>): Promise<GetAllTaskResponse | undefined> {
    const { pagination, sort } = queryParams;
    const params: QueryParams = {
      limit: pagination?.limit ? Number(pagination?.limit) : undefined,
      offset: pagination?.offset ? Number(pagination?.offset) : undefined,
      field: sort?.field ? sort?.field.toLowerCase() : undefined,
    };
    const tasks: Task[] = await TaskRepository.getAllTasks( params);

    const allTasks: Task[] = await TaskRepository.getAllTasks({ limit: undefined, offset: undefined, field: undefined } );

    if (!tasks.length) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Tasks not found',
      );
    }
    const allTaskResponse: GetAllTaskResponse = {
      amount: allTasks.length,
      tasks: tasks,
    };
    return allTaskResponse;
  }

  static async deleteTaskById(id: string): Promise<void> {
    const task: Task | null = await TaskRepository.findOneById(Number(id));
    if (!task) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Task not found',
      );
    }
    await TaskRepository.deleteTask(task);
  }
  static async updateTaskById(id: string, updateBody: UpdateTaskBody): Promise<Task> {
    const task: Task | null = await TaskRepository.findOneById(Number(id));
    if (!task) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Task not found',
      );
    }
    if (updateBody.username === task.username) {
      throw new AppError(STATUS_CODE.BAD_REQUEST,
        'Name must be unique. Change name',
      );
    }
    const updatedTask: Task | null = await TaskRepository.updateTaskById(Number(id), updateBody);
    if (!updatedTask) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Task not updated',
      );
    }
    return updatedTask;
  }
}
