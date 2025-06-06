import { Request, Response, NextFunction } from 'express';

export default function checkMethods(req: Request, res: Response, next: NextFunction) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).send({ error: 'Method Not Allowed' });
  } else {
    next();
  }
}
