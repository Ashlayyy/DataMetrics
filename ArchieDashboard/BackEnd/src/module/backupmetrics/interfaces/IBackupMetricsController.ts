import { ApiRequest } from '../types/Request/ApiRequest';
import { ApiRequestResult } from '../types/Request/ApiRequestResult';

export default interface IBackupMetricsController {
  metrics(request: ApiRequest): Promise<ApiRequestResult>;
  statistics(request: ApiRequest): Promise<ApiRequestResult>;
  weekMetrics(request: ApiRequest): Promise<ApiRequestResult>;
  gridMetrics(request: ApiRequest): Promise<ApiRequestResult>;
  list(request: ApiRequest): Promise<ApiRequestResult>;
}
