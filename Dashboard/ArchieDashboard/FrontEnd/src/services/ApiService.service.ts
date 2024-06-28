import IApiService from '../interfaces/IApiService';
import Config from '../config/config';
import { ApiResult } from '../types/ApiResult';
import { MetricsFilter } from '../types/MetricsFilter';

export default class ApiService implements IApiService {
  async fetchApi(endpoint: string, options?: any, filter?: MetricsFilter | undefined): Promise<ApiResult> {
    const apiUrl = Config.apiUrl;
    const response =
      filter && filter !== undefined
        ? await fetch(`${apiUrl}${endpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(filter)
          })
        : await fetch(`${apiUrl}${endpoint}`, options ? options : undefined);
    const data = await response.json();
    return {
      data: data.data,
      status: data.status,
      headers: data.headers
    };
  }
}
