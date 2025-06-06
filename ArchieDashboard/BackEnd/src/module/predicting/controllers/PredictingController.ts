/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import axios from 'axios';
import ILogger from '../../../interfaces/ILogger';
import IPredictingService from '../interfaces/IPredictingService';
import IPredictingController from '../interfaces/IPredictingController';
import mapSizes from '../../../helpers/mappers/mapSizes';
import { ApiRequest } from '../../backupmetrics/types/Request/ApiRequest';
import { ApiRequestResult } from '../../backupmetrics/types/Request/ApiRequestResult';

@injectable()
export default class PredictingController implements IPredictingController {
  constructor(
    @inject('PredictingService')
    private predictingService: IPredictingService,
    @inject('Logger') private readonly Logger: ILogger
  ) {}

  async predict(request: ApiRequest): Promise<ApiRequestResult> {
    const url: string = `http://${request.headers.host ? request.headers.host : request.headers.origin ?? 'localhost:4000'}/api/v1/database/metrics`;
    let data = null;
    data = request.body.companies
      ? await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ companies: request.body.companies })
        })
      : await fetch(url);
    const months = request.body?.months ?? 6;
    data = await data.json();
    const mappedData = mapSizes(data.data.metrics);
    const predictedGB = await this.predictingService.predict(mappedData.GB, months);
    const predictedMFCP = await this.predictingService.predict(mappedData.MFCP, months);
    const predictedCO = await this.predictingService.predict(mappedData.CO, months);
    const predictedUS = await this.predictingService.predict(mappedData.US, months);
    const predictedACTUS = await this.predictingService.predict(mappedData.ACT_US, months);
    
    return {
      status: 200,
      data: {
        predictedGB,
        predictedMFCP,
        predictedCO,
        predictedUS,
        predictedACTUS
      }
    };
  }
}
