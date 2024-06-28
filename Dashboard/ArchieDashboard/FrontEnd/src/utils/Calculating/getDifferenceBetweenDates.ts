import { DateTime } from 'luxon';

export default function getDifferenceBetweenDates(date?: any) {
  let dateNow;
  if (date) {
    dateNow = DateTime.fromISO(`${date}`);
  } else {
    dateNow = DateTime.now();
  }
  const constantDate = DateTime.fromISO('1899-12-30');
  const diff = dateNow.diff(constantDate, 'days').days;
  return diff;
}
