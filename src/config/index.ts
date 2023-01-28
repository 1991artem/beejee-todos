import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { Task } from 'task/entity/task.entity';
import { User } from 'user/entity/user.entity';

dotenv.config();

const user = process.env.DB_USER;
const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT || 5432;

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT secret not specified');
}

const TOKEN_LIFETIME = process.env.TOKEN_LIFETIME;
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
    PORT: 4500,
    DB,
    JWT_SECRET,
    TOKEN_LIFETIME,
  },
};
