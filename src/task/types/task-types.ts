import { Task } from '../entity/task.entity';

export type QueryParams = {
  limit: number | undefined;
  offset: number | undefined;
  field: string | undefined;
};

export type GetAllTaskResponse = {
  amount: number,
  tasks: Task[]
};
