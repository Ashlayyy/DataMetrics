import { DateTime } from 'luxon';

export default function calculateAmountOfDays(months: number): any {
  let totalDays = 0;
  let currentMonth = DateTime.local().startOf('month');
  for (let i = 0; i < months; i++) {
    totalDays += currentMonth.daysInMonth;
    currentMonth = currentMonth.plus({ months: 1 });
  }
  return totalDays;
}
