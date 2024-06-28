import { MetricsFilter } from '../types/MetricsFilter';
import { ApiResult } from '../types/ApiResult';

export default interface IApiService {
  fetchApi(endpoint: string, filter: MetricsFilter): Promise<ApiResult>;
}
