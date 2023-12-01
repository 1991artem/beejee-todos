import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppState, ITodosSate } from './interfaces'

const initialState: AppState = {
  token: '',
  isLoading: false,
  isLogin: false,
  isAdmin: false,
  todos: {
    todos: [],
    amount: 0
  },
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isLogin = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setUserRole: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload
    },
    logOutUser: (state) => {
      state.token = initialState.token;
      state.isLoading = initialState.isLoading;
      state.isLogin = initialState.isLogin;
    },

    setTodos: (state, action: PayloadAction<ITodosSate>) => {
      state.todos.todos = action.payload.todos
      state.todos.amount = action.payload.amount
    },
  },
})

export const { loginUser, logOutUser,  setLoading, setTodos, setUserRole} = appSlice.actions

export default appSlice