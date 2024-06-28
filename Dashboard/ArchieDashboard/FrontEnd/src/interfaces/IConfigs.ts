export default interface IConfigs {
  charts: {
    totalGigabytes: any;
    totalUsers: any;
    averageGigabytes?: any;
    averageUsers?: any;
    percentageAverageGigabytes?: any;
    percentageAverageUsers?: any;
    types: any;
    growth: any;
    predicted: any;
    weekData: any;
  };
  config: {
    type: string;
    options: {
      scales: {
        x: {
          type: string;
          time: {
            unit: string;
          };
        };
      };
    };
  };
}
