import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from '../../erros/AppError';
import routes from './routes';
import uploadConfig from '../../../config/upload';

import '../typeorm';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(
  (err: Error, resquest: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'eror',
        message: err.message,
      });
    }
    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);
// eslint-disable-next-line @typescript-eslint/no-empty-function
app.listen(3333, () => {});
