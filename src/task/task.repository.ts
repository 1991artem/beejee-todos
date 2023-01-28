import { AppDataSource } from '../data-source';
import { CreateTaskBody, UpdateTaskBody } from './types/body.types';
import { Task } from './entity/task.entity';
import { QueryParams } from './types/task-types';

export class TaskRepository {
  private static _tasksRepository = AppDataSource.getRepository(Task);

  static async findOneById(id: number): Promise<Task | null> {
    const task: Task | null = await this._tasksRepository.findOneBy({
      id,
    });
    return task;
  }

  static async createTask(taskDTO: CreateTaskBody): Promise<Task> {
    const task: Task = this._tasksRepository.create({ ...taskDTO });
    await this._tasksRepository.save(task);
    return task;
  }

  static async getAllTasks(params: QueryParams): Promise<[Task[], number]> {
    const { limit, offset, field } = params;
    const tasks = await this._tasksRepository.findAndCount({
      order: field ?
        {
          [field]: 'desc',
        }
        : undefined,
      take: limit,
      skip: offset,
      cache: true,
    });

    return tasks;
  }

  static async updateTaskById(id: number, updateBody: UpdateTaskBody): Promise<Task | null> {
    const updateResult = await this._tasksRepository
      .createQueryBuilder()
      .update(Task)
      .returning('*')
      .updateEntity(true)
      .set({ ...updateBody })
      .where( { id })
      .execute();

    const [updatedTask] = updateResult.raw as Task[];
    if (!updatedTask) {
      return null;
    }
    return updatedTask;
  }
  static async deleteTask(task: Task): Promise<void> {
    await this._tasksRepository.remove(task);
  }
}
