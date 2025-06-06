import { MetricsFilter } from '@/types/MetricsFilter';
import IMetricsService from '../interfaces/IMetricsService';
import { ChartCoordinate } from '../types/chartCoordinate';
import roundToDecimals from '../utils/Transforming/roundToDecimals';
import apiService from './ApiService.service';

export default class MetricsService implements IMetricsService {
  constructor(private ApiService: apiService = new apiService()) {}

  statistics = async (filter?: MetricsFilter) => {
    try {
      const response = await this.ApiService.fetchApi('/database/metrics/statistics', '', filter ? filter : undefined);
      if (!response) throw new Error('No response');
      if (response.status !== 200) throw new Error(`${response.status} - ${response.data}`);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  metrics = async (filter?: MetricsFilter) => {
    try {
      const response = await this.ApiService.fetchApi('/database/metrics', '', filter ? filter : undefined);
      if (!response) throw new Error('No response');
      if (response.status !== 200) throw new Error(`${response.status} - ${response.data}`);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  weekMetrics = async (filter?: MetricsFilter) => {
    try {
      const response = await this.ApiService.fetchApi('/database/metrics/week', '', filter ? filter : undefined);
      if (!response) throw new Error('No response');
      if (response.status !== 200) throw new Error(`${response.status} - ${response.data}`);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  gridMetrics = async () => {
    try {
      const response = await this.ApiService.fetchApi('/database/metrics/grid');
      if (!response) throw new Error('No response');
      if (response.status !== 200) throw new Error(`${response.status} - ${response.data}`);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  predictionMetrics = async (filter?: MetricsFilter) => {
    try {
      const response = await this.ApiService.fetchApi('/predict', '', filter ? filter : undefined);
      if (!response) throw new Error('No response');
      if (response.status !== 200) throw new Error(`${response.status} - ${response.data}`);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  averageMetrics = async (data: ChartCoordinate[], length: number) => {
    const average = [];
    for (const item of data) {
      const typedItem: ChartCoordinate = item;
      average.push({ x: typedItem.x, y: roundToDecimals(typedItem.y / length, 2) });
    }
    return average;
  };

  closeToLimit = async (): Promise<number> => {
    try {
      const response = await this.ApiService.fetchApi('/database/metrics', { cache: 'no-store' });
      if (!response) throw new Error('No response');
      if (response.headers['x-ratelimit-remaining'] < 25) {
        return 1;
      } else if (response.headers['x-ratelimit-remaining'] <= 5) {
        return 2;
      } else {
        return 0;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
