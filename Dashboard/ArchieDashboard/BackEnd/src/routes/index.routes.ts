import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import BackupMetrics from './backupmetrics.routes';
import Predicting from './predicting.routes';
import Settings from './settings.routes';
import app from '../app';

import swaggerFile from '../../swagger.json';

app.use('/api/v1/database/metrics', BackupMetrics);
app.use('/api/v1/predict', Predicting);
app.use('/api/v1/settings', Settings);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;
