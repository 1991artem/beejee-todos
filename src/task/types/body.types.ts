export type CreateTaskBody = {
  username: string,
  description?: string,
  email: string,
};

export type UpdateTaskBody = Partial<CreateTaskBody>;
