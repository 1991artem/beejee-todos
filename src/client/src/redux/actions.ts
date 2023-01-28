import { IUserLogin, IQuery, ICreateTodos } from './../api/interfaces';
import { loginUser, logOutUser, setTodos, setUserRole } from "./slice";
import Api from '../api/Api';
import { ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { AppState, ITodoItem } from './interfaces';

export const init = (): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> => 
   async (dispatch) => {
        let error = '';
        try {
            const token = sessionStorage.getItem('token');
            const role = sessionStorage.getItem('role') === 'admin';
            if(token) {
                dispatch(loginUser(token));
                dispatch(setUserRole(role));
                const res = await Api.getAllTodos({
                    offset: 0,
                    limit: 3,
                    sort: 'username',
                }, token);
                const data = res?.data;
                if (res?.status === 401) {
                    dispatch(logOutUser());
                }
                if(data) {
                    dispatch(setTodos(data));
                }
            }
        } catch (e) {
          error = JSON.stringify(e);
        }
        return error;
}

export const loginUserAction = (data: IUserLogin): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> => 
   async (dispatch) => {
        let error = '';
        try {
            const { name, password } = data;
            const res = await Api.login({
                name,
                password
            })
            console.log(res);
            const token = res?.data?.token;
            const isAdmin = res?.data?.role === 'admin';
            if (token) {
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('role', res?.data?.role);
                dispatch(loginUser(token));
                dispatch(setUserRole(isAdmin));
            }
        } catch (e) {
          error = JSON.stringify(e);
        }
        return error;
}

export const loginOutUserAction = (): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> => 
   async (dispatch) => {
        let error = '';
        try {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            dispatch(logOutUser());
        } catch (e) {
          error = JSON.stringify(e);
        }
        return error;
}

export const createTodosAction = (data: ICreateTodos): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> => 
   async (dispatch, getState) => {
        let error = '';
        try {
            const {username, email, description} = data;
            const state = getState();
            const res = await Api.createTodos({
                username,
                email,
                description,
            }, state.app.token);
            if (res?.status === 401) {
                dispatch(logOutUser());
            }
            return res?.data?.message;
        } catch (e) {
          error = JSON.stringify(e);
        }
        return error;
}


export const getAllTodosAction = (data: IQuery): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> => 
   async (dispatch, getState) => {
        let error = '';
        try {
            const {offset, limit, sort} = data;
            const state = getState();
            const res = await Api.getAllTodos({
                offset,
                limit,
                sort,
            }, state.app.token);
            if (res?.status === 401) {
                dispatch(logOutUser());
            }
            const todos = res?.data;
            if(todos) {
                dispatch(setTodos(todos));
            }
        } catch (e) {
          error = JSON.stringify(e);
        }
        return error;
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
        let error = '';
        try {
            const {app: {todos, token}} = getState();
            const item = todos.todos.find(t => t.id === id);
            if (item) {
                const newItem = {
                    ...item,
                    isDone: !item.isDone,
                }
                const newTodosArray = getUpdateTodosArray(todos.todos, newItem);

                const res = await Api.updateTodoById(
                    id,
                    newItem,
                    token,
                 );
                if (res?.status === 401) {
                    dispatch(logOutUser());
                }
                if (res?.status === 200) {
                    dispatch(setTodos({
                        todos: newTodosArray,
                        amount: todos.amount
                    }))
                }
            }
        } catch (e) {
          error = JSON.stringify(e);
        }
        return error;
}

export const updateTodoAction = (id: number, body: Partial<ITodoItem>): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> => 
   async (dispatch, getState) => {
        let error = '';
        try {
            const {app: {todos, token}} = getState();
            const item = todos.todos.find(t => t.id === id);

            if (item) {
                const newItem = {
                    ...item,
                    ...body,
                }
                const newTodosArray = getUpdateTodosArray(todos.todos, newItem);

                const res = await Api.updateTodoById(
                    id,
                    newItem,
                    token,
                 );
                if (res?.status === 401) {
                    dispatch(logOutUser());
                }
                if (res?.status === 200) {
                    dispatch(setTodos({
                        todos: newTodosArray,
                        amount: todos.amount
                    }))
                }
            }
        } catch (e) {
          error = JSON.stringify(e);
        }
        return error;
}

