function findOutliers(data: number[]) {
  // Sort the data
  const sortedData = [...data].sort((a, b) => a - b);

  // Calculate the quartiles
  const q1 = sortedData[Math.floor(sortedData.length / 4)];
  const q3 = sortedData[Math.floor(sortedData.length * (3 / 4))];

  // Calculate the interquartile range
  const iqr = q3 - q1;

  // Any number less than this is a suspected outlier
  const lowerBound = q1 - 1.5 * iqr;

  // Any number greater than this is a suspected outlier
  const upperBound = q3 + 1.5 * iqr;

  // Filter the data to find outliers
  const outliers = sortedData.filter((x) => x < lowerBound || x > upperBound);

  return outliers;
}

export default findOutliers;
