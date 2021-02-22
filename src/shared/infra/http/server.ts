import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from '@shared/infra/http/middlewares/RateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';
import trim from './middlewares/trim';
import { COOKIE_NAME, SESSION_SECRET, __PROD__ } from '@config/app';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(
  session({
    name: COOKIE_NAME,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
      httpOnly: false,
      secure: __PROD__, // cookie only works, in https
      sameSite: 'lax',
    },
    saveUninitialized: false,
    secret: SESSION_SECRET!,
    resave: false,
  }),
);
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(trim);

app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line
  console.log('⚡️ Server started on port 3333!');
});
