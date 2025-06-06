import { Router } from 'express';
import mapRequest from '../helpers/mappers/requestmapper';
import { settingsController } from '../shared/container';

const router = Router();

router.get('/:id', async (req, res) => {
  const apiRequestResult = await settingsController.settingsById(mapRequest(req));
  res.json({
    ...apiRequestResult,
    headers: res.getHeaders()
  });
});

router.post('/:id', async (req, res) => {
  const apiRequestResult = await settingsController.settingsById(mapRequest(req));
  res.json({
    ...apiRequestResult,
    headers: res.getHeaders()
  });
});

router.patch('/:id', async (req, res) => {
  const apiRequestResult = await settingsController.settingsById(mapRequest(req));
  res.json({
    ...apiRequestResult,
    headers: res.getHeaders()
  });
});

router.put('/:id', async (req, res) => {
  const apiRequestResult = await settingsController.settingsById(mapRequest(req));
  res.json({
    ...apiRequestResult,
    headers: res.getHeaders()
  });
});

router.delete('/:id', async (req, res) => {
  const apiRequestResult = await settingsController.settingsById(mapRequest(req));
  res.json({
    ...apiRequestResult,
    headers: res.getHeaders()
  });
});

export default router;
