import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import { limiter, slower } from './middlewares/rateLimit';
import HandleError from './middlewares/HandleError';
import morganFormat from './helpers/morganFormat';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(HandleError);

const corsOptions = {
  origin: '*',
  credentials: true
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(helmet());
app.disable('x-powered-by');
app.use(limiter);
app.use(slower);
app.use(cors(corsOptions));

app.use(morgan(morganFormat()));

export default app;
