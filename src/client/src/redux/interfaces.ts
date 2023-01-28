import { ICreateTodos } from "../api/interfaces";

export interface AppState {
  token: string;
  isLoading: boolean;
  isLogin: boolean;
  isAdmin: boolean;
  todos: ITodosSate;
}

export interface ITodoItem extends ICreateTodos {
  isDone: boolean,
  id: number;
}

export interface ITodosSate {
  todos: ITodoItem[],
  amount: number,
}

