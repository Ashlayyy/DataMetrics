export default function roundToDecimals(number: number, decibelsNumbers: number): any {
  const x = Math.pow(10, decibelsNumbers);
  return Math.round(number * x) / x;
}
