/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { DateTime } from 'luxon';
import IPredictingService from '../interfaces/IPredictingService';
import ILinearRegressionService from '../interfaces/ILinearRegressionService';
import calculateAmountOfDays from '../../../helpers/calculateMonths';

@injectable()
export default class PredictingService implements IPredictingService {
  constructor(
    @inject('LinearRegressionService')
    private LinearRegressionService: ILinearRegressionService
  ) {}

  async predict(data: any[], months: number): Promise<{ predictedData: number[]; dateArray: number[] | string[] }> {
    const predictedData = [];
    const dateArray = [];
    const trainingData = [];
    const reversedData = [...data];
    reversedData.reverse();
    const skipDays = calculateAmountOfDays(months) / 12.5;
    const trainingDays = data.map((_, index) => index + 1);
    for (let i = 0; i < reversedData.length; i += 1) {
      trainingData.push([trainingDays[i], reversedData[i]]);
    }
    this.LinearRegressionService.data = trainingData;
    this.LinearRegressionService.train();
    let today = DateTime.local()
      .plus({ days: Math.round(skipDays) })
      .startOf('day');
    let currentDate = DateTime.local().startOf('day');

    for (let i = 0; i < calculateAmountOfDays(months); i += 1) {
      currentDate = currentDate.plus({ days: 1 });
      if (currentDate.toISODate() === today.toISODate()) {
        predictedData.push(Math.round(this.LinearRegressionService.predict(i + skipDays)));
        dateArray.push(currentDate.toISODate());
        today = today.plus({ month: 1 });
      }
    }
    return {
      predictedData,
      dateArray
    };
  }

  calculatePerformanceMetrics() {
    return this.LinearRegressionService.calculatePerformanceMetrics();
  }
}
