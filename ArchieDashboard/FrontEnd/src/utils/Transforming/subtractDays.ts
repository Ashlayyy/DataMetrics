import { DateTime } from 'luxon';

//date - days
export default function subtractDays(daysToSubtract: number, date?: any) {
  let dateNow = DateTime.now();
  if (date) {
    dateNow = date;
  }
  const dateCalculated = dateNow.minus({ days: daysToSubtract });
  const time = dateCalculated.toISODate();
  return time;
}
