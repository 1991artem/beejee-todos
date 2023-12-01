import { IUserLogin, IQuery, ICreateTodos, SORT } from './../api/interfaces';
import { loginUser, logOutUser, setTodos, setUserRole } from "./slice";
import Api from '../api/Api';
import { ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { AppState, ITodoItem } from './interfaces';

const getErrorMessage = (e: any) => {
    if(e?.response?.data) {
        if (e?.response?.data.errors) {
            return e.response.data?.errors?.map((err: any) => err.msg).join(' ');
        }
        return e?.response?.data.message;
    }
    return e.message;
}

export const init = (): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> =>
    async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role') === 'admin';
            const res = await Api.getAllTodos({
                offset: 0,
                limit: 3,
                sort: SORT.NAME,
                type: 'DESC'
            });
            const data = res?.data;
            if (data) {
                dispatch(setTodos(data));
            }

            if (token) {
                dispatch(loginUser(token));
                dispatch(setUserRole(role));
            }
        } catch (e: any) {
            return getErrorMessage(e);
        }
    }

export const loginUserAction = (data: IUserLogin): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> =>
    async (dispatch) => {
        try {
            const { name, password } = data;
            const res = await Api.login({
                name,
                password
            })
            const token = res?.data?.token;
            const isAdmin = res?.data?.role === 'admin';
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('role', res?.data?.role);
                dispatch(loginUser(token));
                dispatch(setUserRole(isAdmin));
            }
        } catch (e: any) {
            return getErrorMessage(e);
        }
    }

export const logOutUserAction = (): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> =>
    async (dispatch) => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            dispatch(logOutUser());
        } catch (e: any) {
            return getErrorMessage(e);
        }
    }

export const createTodosAction = (data: ICreateTodos): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> =>
    async (dispatch, getState) => {
        try {
            const { username, email, description } = data;
            const state = getState();
            const res = await Api.createTodos({
                username,
                email,
                description,
            }, state.app.token);
            return res?.data?.message;
        } catch (e: any) {
            if (e.response?.status === 401) {
                dispatch(logOutUserAction());
            }
            return getErrorMessage(e);
        }
    }


export const getAllTodosAction = (data: IQuery): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> =>
    async (dispatch) => {
        try {
            const { offset, limit, sort, type } = data;
            const res = await Api.getAllTodos({
                offset,
                limit,
                sort,
                type
            });
            const todos = res?.data;
            if (todos) {
                dispatch(setTodos(todos));
            }
        } catch (e: any) {
            return getErrorMessage(e);
        }
    }

const getUpdateTodosArray = (array: ITodoItem[], item: ITodoItem) => {
    const idx = array.findIndex(t => t.id === item.id);
    return [
        ...array.slice(0, idx),
        item,
        ...array.slice(idx + 1, array.length),
    ]
}

export const checkedTodoAction = (id: number): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> =>
    async (dispatch, getState) => {
        try {
            const { app: { todos, token } } = getState();
            const item = todos.todos.find(t => t.id === id);
            console.log(item)
            if (item) {
                const newItem = {
                    ...item,
                    done: !item.done,
                }
                const newTodosArray = getUpdateTodosArray(todos.todos, newItem);

                const res = await Api.updateTodoById(
                    id,
                    newItem,
                    token,
                );
                if (res?.status === 200) {
                    dispatch(setTodos({
                        todos: newTodosArray,
                        amount: todos.amount
                    }))
                }
            }
        } catch (e: any) {
            if (e.response?.status === 401) {
                dispatch(logOutUserAction());
            }
            return getErrorMessage(e);
        }
    }

export const updateTodoAction = (id: number, body: Partial<ITodoItem>): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> =>
    async (dispatch, getState) => {
        try {
            const { app: { todos, token } } = getState();
            const item = todos.todos.find(t => t.id === id);

            if (item) {
                const newItem = {
                    ...item,
                    ...body,
                    updatedAt: new Date().toISOString(),
                }
                const newTodosArray = getUpdateTodosArray(todos.todos, newItem);

                const res = await Api.updateTodoById(
                    id,
                    newItem,
                    token,
                );
                if (res?.status === 200) {
                    dispatch(setTodos({
                        todos: newTodosArray,
                        amount: todos.amount
                    }))
                }
            }
        } catch (e: any) {
            if (e.response?.status === 401) {
                dispatch(logOutUserAction());
            }
            return getErrorMessage(e);
        }
    }

