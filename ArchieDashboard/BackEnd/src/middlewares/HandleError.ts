import { Request, Response, NextFunction } from 'express';
import Logger from '../helpers/logger';

export default function HandleError(error: any, _req: Request, res: Response, next: NextFunction) {
  if (error instanceof SyntaxError) {
    res.status(400).send({ error: 'Syntax Error' });
  } else if (error instanceof Error) {
    const logger = new Logger();
    logger.info(String(error));
    res.status(500).send({
      error: 'An error has occurred check logs for more details'
    });
  } else {
    next();
  }
}
