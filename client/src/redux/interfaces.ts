import { ICreateTodos } from "../api/interfaces";

export interface AppState {
  token: string;
  isLoading: boolean;
  isLogin: boolean;
  isAdmin: boolean;
  todos: ITodosSate;
}

export interface ITodoItem extends ICreateTodos {
  done: boolean,
  id: number;
  updatedAt: string;
  createdAt: string;
}

export interface ITodosSate {
  todos: ITodoItem[],
  amount: number,
}

