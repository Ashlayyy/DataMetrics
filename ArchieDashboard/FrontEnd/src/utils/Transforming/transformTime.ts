import { DateTime } from 'luxon';

export default function transformTime(BackupDate: number | string): any {
  const constantDate = DateTime.local(1899, 12, 30);
  const date = constantDate.plus({ days: Number(BackupDate) });
  return date.toISODate();
}
