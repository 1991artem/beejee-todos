import * as dotenv from 'dotenv';
import { Task } from 'task/entity/task.entity';
import { DataSourceOptions } from 'typeorm';
import { User } from 'user/entity/user.entity';

dotenv.config();

const user = 'postgres';
const host = 'todos-app-db.internal';
const database = 'postgres';
const password = 'z63Kevnn9yXFsJl';
const port = process.env.DB_PORT || 5432;

const JWT_SECRET = '1991';
if (!JWT_SECRET) {
  throw new Error('JWT secret not specified');
}

const TOKEN_LIFETIME = '1h';
if (!TOKEN_LIFETIME) {
  throw new Error('TOKEN_LIFETIME not set');
}

if (!user) {
  throw new Error('DB_USER not set');
}
if (!database) {
  throw new Error('DB_NAME not set');
}
if (!password) {
  throw new Error('DB_PASSWORD not set');
}

const DB: DataSourceOptions = {
  type: 'postgres',
  host: host,
  port: Number(port),
  username: user,
  password: password,
  database: database,
  synchronize: true,
  logging: false,
  entities: [User, Task],
};

export const config = {
  DEV: {
    PORT: 8080,
    DB,
    JWT_SECRET,
    TOKEN_LIFETIME,
  },
};
