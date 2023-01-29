import { ITodoItem } from './../redux/interfaces';
import fetch from './axios';
import { ICreateTodos, IQuery, IUserLogin, SORT } from './interfaces';

export default class Api {

    static setToken(token: string) {
        return {
            headers: { Authorization: `Bearer ${token}` }
        };
    }

    static async login(body: IUserLogin) {
        return fetch.post('auth/login', body);
    }

    static async createTodos(body: ICreateTodos, token: string) {
        return fetch.post('/task/create', body, Api.setToken(token));
    }

    static async getAllTodos(params: IQuery){
        const {offset = 0, limit = 3, sort = SORT.NAME, type = 'DESC'} = params;

        const query = `?pagination[limit]=${limit}&pagination[offset]=${offset}&sort[field]=${sort}&sort[type]=${type}`;
        return fetch.get(`/task/all${query}`);
    }

    static async updateTodoById(id: number, body: Partial<ITodoItem>, token: string){
        return fetch.patch(`/task/${id}`, body, Api.setToken(token));
    }
}
