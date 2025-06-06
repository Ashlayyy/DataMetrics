import 'reflect-metadata';
import { Request, Response, Router } from 'express';
import { predictingController } from '../shared/container';
import checkMethods from '../middlewares/checkForMethods';
import mapRequest from '../helpers/mappers/requestmapper';

const router = Router();

router.all('/', checkMethods, async (req: Request, res: Response) => {
  const apiRequestResult = await predictingController.predict(mapRequest(req));
  res.json(apiRequestResult);
});

export default router;
