export interface IUserLogin {
    name: string;
    password: string;
}

export interface ICreateTodos {
    username: string;
    email: string;
    description: string;
}

export interface IQuery {
    offset: number;
    limit: number;
    sort: SORT;
}

export enum SORT {
    NAME ='username',
    STATUS = 'isDone',
    EMAIL = 'email'
}