import { Request } from 'express';
import { ApiRequest } from '../../module/backupmetrics/types/Request/ApiRequest';

export default function mapRequest(request: Request): ApiRequest {
  return {
    body: request.body,
    params: request.params,
    headers: request.headers
  };
}
