import 'chartjs-adapter-luxon';
import transformSize from '../Transforming/transformSize';

export default class GraphHandler {
  charts: any = {
    totalGigabytes: {},
    totalUsers: {},
    averageGigabytes: {},
    averageUsers: {},
    growth: {},
    predicted: {},
    weekData: {},
    types: {}
  };
  dataGrowth: any = {};
  config = {};
  translationNeeded: boolean;
  translate: any;

  //TODO Needs to be strongly typed
  constructor(
    totalGB: any,
    totalUsers: any,
    averageGB: any,
    averageUsers: any,
    growth: any,
    predicted: any,
    WeekDataArray: Array<number>,
    TypeArray: Array<number>,
    translationNeeded?: boolean,
    translate?: any
  ) {
    this.translate = translate;
    this.translationNeeded = translationNeeded || false;
    this.createLineCharts(totalGB, totalUsers, averageGB, averageUsers, growth, predicted);
    this.createBarChart(WeekDataArray);
    this.createPieCharts(TypeArray);
    this.createConfig();
  }

  async createLineCharts(
    totalGB: any,
    totalUsers: any,
    averageGB: any,
    averageUsers: any,
    growth: any,
    predicted: any
  ) {
    this.charts.totalGigabytes = {
      datasets: [
        {
          label: this.translate('total.Gigabytes.lineOne'),
          data: totalGB.GB,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        },
        {
          label: this.translate('total.Gigabytes.lineTwo'),
          data: totalGB.CO,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        }
      ],
      responsive: true,
      maintainAspectRatio: false
    };

    this.charts.totalUsers = {
      datasets: [
        {
          label: this.translate('total.Users.lineOne'),
          data: totalUsers[0],
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        },
        {
          label: this.translate('total.Users.lineTwo'),
          data: totalUsers[1],
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        }
      ],
      responsive: true,
      maintainAspectRatio: false
    };

    this.charts.averageGigabytes = {
      datasets: [
        {
          label: this.translationNeeded
            ? this.translate('averageCompany.Gigabytes.lineOne')
            : this.translate('average.Gigabytes.lineOne'),
          data: averageGB,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        }
      ],
      responsive: true,
      maintainAspectRatio: false
    };

    this.charts.averageUsers = {
      datasets: [
        {
          label: this.translationNeeded
            ? this.translate('averageCompany.Users.lineOne')
            : this.translate('average.Users.lineOne'),
          data: averageUsers[0],
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        },
        {
          label: this.translationNeeded
            ? this.translate('averageCompany.Users.lineTwo')
            : this.translate('average.Users.lineTwo'),
          data: averageUsers[1],
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        }
      ],
      responsive: true,
      maintainAspectRatio: false
    };

    this.charts.growth = {
      datasets: [
        {
          label: this.translate('growth.types.1'),
          data: growth.GB,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        }
      ],
      responsive: true,
      maintainAspectRatio: false
    };

    this.dataGrowth = [
      {
        label: this.translate('growth.types.1'),
        data: growth.GB,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0
      },
      {
        label: this.translate('growth.types.2'),
        data: growth.MFCP,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0
      },
      {
        label: this.translate('growth.types.3'),
        data: growth.Corresp,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0
      },
      {
        label: this.translate('growth.types.4'),
        data: growth.Users,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0
      }
    ];

    this.charts.predicted = {
      labels: predicted.predictedGB.dateArray,
      datasets: [
        {
          label: this.translate('predicted.types.1'),
          data: predicted.predictedGB.predictedData,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        },
        {
          label: this.translate('predicted.types.2'),
          data: predicted.predictedMFCP.predictedData,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        },
        {
          label: this.translate('predicted.types.3'),
          data: predicted.predictedCO.predictedData,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        },
        {
          label: this.translate('predicted.types.4'),
          data: predicted.predictedUS.predictedData,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        }
      ],
      responsive: true,
      maintainAspectRatio: false
    };
  }

  async createBarChart(WeekDataArray: Array<any>) {
    this.charts.weekData = {
      labels: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'],
      datasets: [
        {
          label: this.translate('growth.types.1'),
          data: WeekDataArray.map((item: any) => {
            if (item.Type === 'database_size') return transformSize(item.IntData);
            else return;
          }).filter((item) => item !== undefined && item !== null),
          fill: true,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        },
        {
          label: this.translate('growth.types.2'),
          data: WeekDataArray.map((item: any) => {
            if (item.Type === 'mfcp_size') return transformSize(item.IntData);
            else return;
          }).filter((item) => item !== undefined && item !== null),
          fill: true,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        },
        {
          label: this.translate('growth.types.3'),
          data: WeekDataArray.map((item: any) => {
            if (item.Type === 'corresp_size') return transformSize(item.IntData);
            else return;
          }).filter((item) => item !== undefined && item !== null),
          fill: true,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        },
        {
          label: this.translate('growth.types.4'),
          data: WeekDataArray.map((item: any) => {
            if (item.Type === 'users') return item.IntData;
            else return;
          }).filter((item) => item !== undefined && item !== null),
          fill: true,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        },
        {
          label: this.translate('growth.types.5'),
          data: WeekDataArray.map((item: any) => {
            if (item.Type === 'active_users') return item.IntData;
            else return;
          }).filter((item) => item !== undefined && item !== null),
          fill: true,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        }
      ],
      responsive: true,
      maintainAspectRatio: false
    };
  }

  async createPieCharts(TypeArray: Array<any>) {
    const labelArray = TypeArray.map((type) =>
      type.Type === 'mfcp_size'
        ? (type.Type = 'MFCP')
        : type.Type.replace('_', ' ').split(' ')[0].split('')[0].toUpperCase() +
          type.Type.replace('_', ' ').split(' ')[0].slice(1)
    );
    this.charts.types = {
      labels: labelArray,
      datasets: [
        {
          data: TypeArray.map((type) => type.Amount),
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4
        }
      ]
    };
  }

  async createConfig() {
    this.config = {
      interaction: {
        intersect: false,
        mode: 'index'
      },
      scales: {
        y: {
          beginAtZero: false,
          stacked: true
        },
        x: {
          type: 'time',
          time: {
            unit: 'day'
          },
          adapters: {
            date: {
              locale: 'nl'
            }
          }
        }
      },
      plugins: {
        tooltip: {
          position: 'nearest'
        }
      }
    };
  }
}
