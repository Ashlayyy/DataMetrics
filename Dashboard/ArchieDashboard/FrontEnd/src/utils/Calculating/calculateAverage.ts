export default function calculateAverage(total: number, amountOfDB: number, needMath: boolean = false): any {
  return needMath == true ? Math.round(total / amountOfDB) : total / amountOfDB;
}
