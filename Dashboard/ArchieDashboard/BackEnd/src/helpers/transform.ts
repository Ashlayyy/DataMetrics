import { DateTime } from 'luxon';
import roundToDecimals from './roundToDecimals';

export function transformSize(kiloBytes: number, decimals?: number) {
  return roundToDecimals(+kiloBytes / 1024 / 1024, decimals || 2);
}

export function transformTime(BackupDate: number): string | null {
  const constantDate = DateTime.local(1899, 12, 30);
  const date = constantDate.plus({ days: BackupDate });
  return date.toISODate();
}
