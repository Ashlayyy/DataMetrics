export default function roundToDecimals(number: number, amountOfDecibels: number) {
  const x = 10 ** amountOfDecibels;
  return Math.round(number * x) / x;
}
