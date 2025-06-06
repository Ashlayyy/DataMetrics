import { DateTime } from 'luxon';

export default function differenceTwoDates(date: string) {
  const constantDate = DateTime.local(1899, 12, 30);
  const formattedDate = `${date.split('-')[2]}-${Number(date.split('-')[1]) < 10 ? `0${date.split('-')[1]}` : date.split('-')[1]}-${Number(date.split('-')[0]) < 10 ? `0${date.split('-')[0]}` : date.split('-')[0]}`;
  const dateToCompare = DateTime.fromISO(formattedDate);
  const difference = dateToCompare.diff(constantDate, 'days').days;
  return difference;
}
