/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import app from './routes/index.routes';
import ILogger from './interfaces/ILogger';
import Logger from './helpers/logger';

@injectable()
export default class Server {
  Logger: any;

  constructor() {
    this.startServer();
  }

  startServer = async () => {
    this.Logger = new Logger();
    try {
      app.listen(4000, () => {
        this.Logger.info('Server is running on port 4000');
        this.Logger.info('Swagger API Docs running at /docs');
      });
    } catch (error: any) {
      this.Logger.error(error);
    }
  };
}

const server = new Server();
