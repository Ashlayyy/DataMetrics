import { MetricsMapperResult } from '../../module/backupmetrics/types/Mappers/MetricsMapper';
import { ChartCoordinate } from '../../module/backupmetrics/types/Mappers/ChartCoordinate';

export default (data: MetricsMapperResult[]) => {
  const GB: ChartCoordinate[] = [];
  const MFCP: ChartCoordinate[] = [];
  const CO: ChartCoordinate[] = [];
  const US: ChartCoordinate[] = [];
  const ACT_US: ChartCoordinate[] = [];

  data.forEach((item: MetricsMapperResult) => {
    switch (item.Type) {
      case 'database_size':
        GB.push({
          x: new Date(String(item.BackupDate)).toISOString(),
          y: Number(item.IntData)
        });
        break;

      case 'mfcp_size':
        MFCP.push({
          x: new Date(String(item.BackupDate)).toISOString(),
          y: Number(item.IntData)
        });
        break;

      case 'corresp_size':
        CO.push({
          x: new Date(String(item.BackupDate)).toISOString(),
          y: Number(item.IntData)
        });
        break;
      case 'users':
        US.push({
          x: new Date(String(item.BackupDate)).toISOString(),
          y: Number(item.IntData)
        });
        break;
      case 'active_users':
        ACT_US.push({
          x: new Date(String(item.BackupDate)).toISOString(),
          y: Number(item.IntData)
        });
        break;

      default:
        break;
    }
  });

  for (let i = 0; i < GB.length; i += 1) {
    GB[i].y += MFCP[i].y;
  }

  return {
    GB,
    MFCP,
    CO,
    US,
    ACT_US
  };
};
