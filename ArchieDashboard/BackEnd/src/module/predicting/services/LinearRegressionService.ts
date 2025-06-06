/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable, inject } from 'tsyringe';
import ILogger from '../../../interfaces/ILogger';
import ILinearRegressionService from '../interfaces/ILinearRegressionService';

@injectable()
export default class LinearRegressionService implements ILinearRegressionService {
  data: [number, number][] = [];

  coefficients: { a: number; b: number };

  constructor(@inject('Logger') private readonly Logger: ILogger) {
    this.coefficients = { a: 0, b: 0 };
  }

  calculateCoefficients(): void {
    const n = this.data.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    for (let i = 0; i < n; i++) {
      const [x, y] = this.data[i];
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
    }

    this.coefficients.b = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    this.coefficients.a = (sumY - this.coefficients.b * sumX) / n;
  }

  train(): void {
    this.calculateCoefficients();
  }

  predict(x: number): number {
    return this.coefficients.a + this.coefficients.b * x;
  }

  calculatePerformanceMetrics(): { mse: number; rmse: number; rSquared: number } {
    let sumSquaredResiduals = 0;
    let sumSquaredTotal = 0;
    let sumY = 0;

    this.data.forEach(([x, y]) => {
      const predictedY = this.predict(x);
      sumSquaredResiduals += (y - predictedY) ** 2;
      sumY += y;
    });

    const meanY = sumY / this.data.length;

    this.data.forEach(([_, y]) => {
      sumSquaredTotal += (y - meanY) ** 2;
    });

    const mse = sumSquaredResiduals / this.data.length;
    const rmse = Math.sqrt(mse);
    const rSquared = 1 - sumSquaredResiduals / sumSquaredTotal;

    return { mse, rmse, rSquared };
  }
}
