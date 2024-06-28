import { ApiResult } from '../types/ApiResult';
import { ChartCoordinate } from '../types/chartCoordinate';
import { MetricsFilter } from '../types/MetricsFilter';

export default interface MetricsService {
  statistics(filter?: MetricsFilter): Promise<ApiResult>;
  metrics(filter?: MetricsFilter): Promise<ApiResult>;
  weekMetrics(filter?: MetricsFilter): Promise<ApiResult>;
  gridMetrics(): Promise<ApiResult>;
  predictionMetrics(filter?: MetricsFilter): Promise<ApiResult>;
  averageMetrics(data: ChartCoordinate[], length: number): Promise<ChartCoordinate[]>;
  closeToLimit(): Promise<number>;
}
