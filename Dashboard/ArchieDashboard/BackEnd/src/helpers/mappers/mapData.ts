import mapChart from './mapChart';
import { transformSize, transformTime } from '../transform';
import {
  MetricsResultModel,
  ChartMapperResult,
  MetricsMapperResult,
  MetricsFormat
} from '../../module/backupmetrics/types/Mappers/MetricsMapper';

export default function mapData(data: MetricsFormat[]): MetricsResultModel {
  const metricsMapperResult: MetricsMapperResult[] = data.map((item: MetricsFormat) => {
    const result: MetricsMapperResult = {
      Source: item.dataValues.Source,
      Type: item.dataValues.Type,
      IntData:
        item.dataValues.Type !== 'users' && item.dataValues.Type !== 'active_users'
          ? transformSize(Number(item.dataValues.IntData))
          : Number(item.dataValues.IntData),
      BackupDate: transformTime(Number(item.dataValues.BackupDate))
    };

    return result;
  });
  const chartData: ChartMapperResult = mapChart(metricsMapperResult);
  return {
    metrics: metricsMapperResult,
    chartData
  };
}
