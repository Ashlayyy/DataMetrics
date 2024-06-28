export default function calculatePercentage(oldNumber: any, nieuwNumber: any, mode?: any): any {
  if (oldNumber == nieuwNumber || oldNumber == 0 || nieuwNumber == 0) {
    return 0;
  } else {
    const number = (nieuwNumber / oldNumber) * 100 - (mode == '-' ? 100 : 0);
    if (isNaN(number) || number == Infinity || !isFinite(number)) return 0;
    const x = Math.pow(10, 1);
    return Math.round(number * x) / x;
  }
}
