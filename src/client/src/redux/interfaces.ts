import { ICreateTodos } from "../api/interfaces";

export interface AppState {
    token: string;
    isLoading: boolean;
    isLogin: boolean;
    todos: ITodosSate;
  }

  export interface ITodosSate {
    todos: ICreateTodos[],
    amount: number,
  }
  