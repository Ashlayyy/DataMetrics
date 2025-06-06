import { GridItem } from '../types/GridItem';
import { BackupMetricsServiceFilter } from '../types/BackupMetricsServiceFilter';
import { MetricsResultModel } from '../types/Mappers/MetricsMapper';

export interface IBackupMetricsService {
  metrics(filter: BackupMetricsServiceFilter): Promise<MetricsResultModel>;
  lastDate(filter: BackupMetricsServiceFilter): Promise<number>;
  getLength(filter: BackupMetricsServiceFilter): Promise<number>;
  getTypes(filter: BackupMetricsServiceFilter): Promise<{ Type: string; Amount: number }[]>;
  weekMetrics(filter: BackupMetricsServiceFilter): Promise<any[]>;
  gridMetrics(): Promise<GridItem[]>;
  list(): Promise<string[]>;
}
