import { SizeMapperResult } from '../../module/backupmetrics/types/Mappers/MapSizes';
import { MetricsMapperResult } from '../../module/backupmetrics/types/Mappers/MetricsMapper';

export default (data?: MetricsMapperResult[]): SizeMapperResult => {
  const GB: number[] = [];
  const MFCP: number[] = [];
  const CO: number[] = [];
  const US: number[] = [];
  const ACT_US: number[] = [];

  data?.forEach((company: MetricsMapperResult) => {
    switch (company.Type) {
      case 'database_size':
        GB.push(Number(company.IntData));
        break;
      case 'mfcp_size':
        MFCP.push(Number(company.IntData));
        break;
      case 'corresp_size':
        CO.push(Number(company.IntData));
        break;
      case 'users':
        US.push(Number(company.IntData));
        break;
      case 'active_users':
        ACT_US.push(Number(company.IntData));
        break;
      default:
        break;
    }
  });
  return {
    GB,
    MFCP,
    CO,
    US,
    ACT_US
  };
};
