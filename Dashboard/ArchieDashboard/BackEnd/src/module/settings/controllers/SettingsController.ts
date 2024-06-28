/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable, inject } from 'tsyringe';

import ISettingsController from '../interfaces/ISettingsController';
import { ApiRequestResult } from '../../backupmetrics/types/Request/ApiRequestResult';
import { ApiRequest } from '../../backupmetrics/types/Request/ApiRequest';
import ISettingsService from '../interfaces/ISettingsService';

@injectable()
export default class SettingsController implements ISettingsController {
  constructor(@inject('SettingsService') private readonly SettingsService: ISettingsService) {}

  async settingsById(request: ApiRequest): Promise<ApiRequestResult> {
    if (!request.params)
      return {
        status: 400,
        data: {
          errorMessage: 'Missing ID',
          success: false
        }
      };
    const { id } = request.params;
    return {
      data: Number(id[0])
    };
  }
}
