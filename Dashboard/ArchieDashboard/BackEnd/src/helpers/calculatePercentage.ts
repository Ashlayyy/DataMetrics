export default function calculatePercentage(oldNumber: number, newNumber: number): number {
  if (oldNumber === newNumber) return 0;
  const number = (newNumber / oldNumber) * 100;
  const x = 10 ** 1;
  return Math.round(number * x) / x;
}
