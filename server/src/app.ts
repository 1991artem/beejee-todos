/* eslint-disable no-console */
import * as express from 'express';
import { urlencoded, json } from 'express';
import * as cors from 'cors';
import { processNotFoundEndpoint, errorHandler } from '@middleware';
import { mountRouter as mountAuthRouter } from '@auth';
import { mountRouter as mountTaskRouter } from '@task';
import { config } from 'config';
import { AppDataSource } from './data-source';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
mountAuthRouter(app);
mountTaskRouter(app);

app.use(processNotFoundEndpoint);
app.use(errorHandler);

const init = async (): Promise<void> => {
  try {
    const PORT: number = config.DEV.PORT;
    await AppDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`---listening port ${PORT}---`);
    });
    console.info('Successfully connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

init();
