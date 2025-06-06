export default interface ILinearRegression {
  data: number[][];
  coefficients: { a: number; b: number };
  calculateCoefficients(): void;
  predict(x: number): number;
  train(): void;
  calculatePerformanceMetrics(): void;
}
