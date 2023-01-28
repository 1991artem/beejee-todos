import { ITodoItem } from './../redux/interfaces';
import fetch from './axios';
import { ICreateTodos, IQuery, IUserLogin } from './interfaces';

export default class Api {

    static setToken(token: string) {
        return {
            headers: { Authorization: `Bearer ${token}` }
        };
    }

    static async login(body: IUserLogin) {
        return fetch.post('auth/login', body).catch((error) => {
            console.warn(error);
          });
    }

    static async createTodos(body: ICreateTodos, token: string) {
        return fetch.post('/task/create', body, Api.setToken(token)).catch((error) => {
            console.warn(error);
          });
    }

    static async getAllTodos(params: IQuery, token: string){
        const {offset = 0, limit = 3, sort = 'username'} = params;

        const query = `?pagination[limit]=${limit}&pagination[offset]=${offset}&sort[field]=${sort}`;
        return fetch.get(`/task/all${query}`, Api.setToken(token)).catch((error) => {
            console.warn(error);
          });
    }

    static async updateTodoById(id: number, body: Partial<ITodoItem>, token: string){
        return fetch.patch(`/task/${id}`, body, Api.setToken(token)).catch((error) => {
            console.warn(error);
          });
    }

    static async deleteTodoById() {

    }

    static async getTodoById(){

    }
}
