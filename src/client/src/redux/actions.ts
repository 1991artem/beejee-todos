import { IUserLogin, IQuery, ICreateTodos } from './../api/interfaces';
import { loginUser, logOutUser, setTodos } from "./slice";
import Api from '../api/Api';
import { ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { AppState } from './interfaces';

export const init = (): ThunkAction<Promise<string>, { app: AppState; }, undefined, AnyAction> => 
   async (dispatch) => {
        let error = '';
        try {
            const token = sessionStorage.getItem('token');
            if(token) {
                dispatch(loginUser(token));
                const res = await Api.getAllTodos({
                    offset: 0,
                    limit: 3,
                    sort: 'username',
                }, token);
                const todos = res?.data?.tasks;
                if (res?.status === 401) {
                    dispatch(logOutUser());
                }
                if(todos) {
                    dispatch(setTodos(todos));
                }
                console.log(res);
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
            if (token) {
                sessionStorage.setItem('token', token);
                dispatch(loginUser(token));
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
            const todos = res?.data?.tasks;
            if(todos) {
                dispatch(setTodos(todos));
            }
        } catch (e) {
          error = JSON.stringify(e);
        }
        return error;
}

