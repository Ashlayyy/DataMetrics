import { ChartCoordinate } from './ChartCoordinate';

export type ChartMapperResult = {
  GB: ChartCoordinate[];
  MFCP: ChartCoordinate[];
  CO: ChartCoordinate[];
  US: ChartCoordinate[];
  ACT_US: ChartCoordinate[];
};

export type MetricsFormat = {
  dataValues: {
    Source: string;
    Type: string;
    IntData: number;
    BackupDate: number;
  };
};

export type MetricsMapperResult = {
  Source?: string;
  IntData: number;
  BackupDate: Date | string | number | null;
  Type: string;
};

export type MetricsResultModel = {
  metrics: MetricsMapperResult[];
  chartData: ChartMapperResult;
};

export type MetricsTypeResultModel = {
  Type: string;
  Amount: number;
};

export type WeekMetricsResultModel = {
  IntData: number;
  BackupDate: number;
  Type: string;
};
