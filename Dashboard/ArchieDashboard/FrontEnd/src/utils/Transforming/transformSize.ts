import roundToDecimals from './roundToDecimals';

export default function transformSize(bytesToTransForm: number): number {
  return roundToDecimals(+bytesToTransForm / 1024 / 1024, 2);
}
