export type CreateTaskBody = {
  username: string,
  description?: string,
  email: string,
  isDone: boolean,
};

export type UpdateTaskBody = Partial<CreateTaskBody>;
