import 'reflect-metadata';

import { Request, Response, Router } from 'express';
import apicache from 'apicache';
import { backupMetricsController } from '../shared/container';
import checkMethods from '../middlewares/checkForMethods';
import mapRequest from '../helpers/mappers/requestmapper';

apicache.options({
  headerBlacklist: ['x-ratelimit-remaining'],
  respectCacheControl: true
});
const cache = apicache.middleware;
const getMethodsCache = cache('30 minutes', (req: Request, res: Response) => {
  if (res.statusCode === 200 && req.method === 'GET') {
    return true;
  }
  return false;
});

const router = Router();

router.all('/', checkMethods, getMethodsCache, async (req: Request, res: Response) => {
  const apiRequestResult = await backupMetricsController.metrics(mapRequest(req));
  res.json({
    ...apiRequestResult,
    headers: res.getHeaders()
  });
});

router.all('/statistics', checkMethods, getMethodsCache, async (req: Request, res: Response) => {
  const apiRequestResult = await backupMetricsController.statistics(mapRequest(req));
  res.json({
    ...apiRequestResult,
    headers: res.getHeaders()
  });
});

router.all('/week', checkMethods, getMethodsCache, async (req: Request, res: Response) => {
  const apiRequestResult = await backupMetricsController.weekMetrics(mapRequest(req));
  res.json({
    ...apiRequestResult,
    headers: res.getHeaders()
  });
});

router.get('/grid', getMethodsCache, async (req: Request, res: Response) => {
  const apiRequestResult = await backupMetricsController.gridMetrics(mapRequest(req));
  res.json({
    ...apiRequestResult,
    headers: res.getHeaders()
  });
});

router.get('/list', getMethodsCache, async (req: Request, res: Response) => {
  const apiRequestResult = await backupMetricsController.list(mapRequest(req));
  res.json({
    ...apiRequestResult,
    headers: res.getHeaders()
  });
});

export default router;
