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
    sort: string;
}