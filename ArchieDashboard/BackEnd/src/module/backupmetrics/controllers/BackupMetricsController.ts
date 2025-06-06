import { inject, injectable } from 'tsyringe';
import { IBackupMetricsService } from '../interfaces/IBackupMetricsService';
import IBackupMetricsController from '../interfaces/IBackupMetricsController';
import { ApiRequest } from '../types/Request/ApiRequest';
import { ApiRequestResult } from '../types/Request/ApiRequestResult';

@injectable()
export default class BackupMetricsController implements IBackupMetricsController {
  constructor(@inject('BackupMetricsService') private readonly backupMetricsService: IBackupMetricsService) {}

  async metrics(request: ApiRequest): Promise<ApiRequestResult> {
    try {
      const companies: string[] = request.body?.companies ?? [];
      let fromDate: number | undefined;
      let toDate: number | undefined;
      let dates: number[] | undefined;

      if (request.body.fromDate && request.body.toDate && !request.body.dates) {
        fromDate = request.body?.fromDate;
        toDate = request.body?.toDate;
      } else {
        const lastDate = await this.backupMetricsService.lastDate({
          companies
        });
        dates = [];
        for (let i = 0; i < 7; i += 1) {
          dates.push(Number(lastDate) - i * 30);
        }
      }

      if (request.body.dates) {
        dates = request.body?.dates;
      }

      const metrics = await this.backupMetricsService.metrics({
        companies,
        fromDate,
        toDate,
        dates
      });

      return {
        status: 200,
        data: metrics
      };
    } catch (error) {
      return {
        status: 503,
        data: 'There has been a errror. Please try again later.'
      };
    }
  }

  async statistics(request: ApiRequest): Promise<ApiRequestResult> {
    try {
      const companies: string[] = request.body?.companies ?? [];
      let fromDate: number;
      let toDate: number;
      let dates: number[] | undefined;

      if (request.body.dates) {
        dates = request.body?.dates;
      }

      if (request.body.fromDate && request.body.toDate && !request.body.dates) {
        fromDate = request.body?.fromDate;
        toDate = request.body?.toDate;
      } else {
        const lastDate = await this.backupMetricsService.lastDate({
          companies
        });
        fromDate = Number(lastDate) - 7;
        toDate = Number(lastDate);
      }

      const lastDate = await this.backupMetricsService.lastDate({
        companies
      });

      const length = await this.backupMetricsService.getLength({
        companies
      });

      const types = await this.backupMetricsService.getTypes({
        fromDate,
        toDate,
        companies,
        dates
      });

      return {
        status: 200,
        data: {
          Date: lastDate,
          Length: length,
          Types: types
        }
      };
    } catch (error) {
      return {
        status: 503,
        data: 'There has been a errror. Please try again later.'
      };
    }
  }

  async weekMetrics(request: ApiRequest): Promise<ApiRequestResult> {
    try {
      const companies: string[] = request.body?.companies ?? [];
      let fromDate: number;
      let toDate: number;
      let dates: number[] | undefined;

      if (request.body.dates) {
        dates = request.body?.dates;
      }

      if (request.body.fromDate && request.body.toDate && !request.body.dates) {
        fromDate = request.body?.fromDate;
        toDate = request.body?.toDate;
      } else {
        const lastDate = await this.backupMetricsService.lastDate({
          companies
        });
        fromDate = Number(lastDate) - 7;
        toDate = Number(lastDate);
      }

      const weekData = await this.backupMetricsService.weekMetrics({
        fromDate,
        toDate,
        companies,
        dates
      });

      return {
        status: 200,
        data: weekData
      };
    } catch (error) {
      return {
        status: 503,
        data: 'There has been a errror. Please try again later.'
      };
    }
  }

  async gridMetrics(): Promise<ApiRequestResult> {
    try {
      const grid = await this.backupMetricsService.gridMetrics();
      return {
        status: 200,
        data: grid
      };
    } catch (error) {
      return {
        status: 503,
        data: 'There has been a errror. Please try again later.'
      };
    }
  }

  async list(): Promise<ApiRequestResult> {
    try {
      const list = await this.backupMetricsService.list();
      return {
        status: 200,
        data: list
      };
    } catch (error) {
      return {
        status: 503,
        data: 'There has been a errror. Please try again later.'
      };
    }
  }
}
