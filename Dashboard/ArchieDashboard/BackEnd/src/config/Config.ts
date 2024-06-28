import IConfig from '../types/IConfig';

const config: IConfig = {
  request: {
    rateLimit: {
      window: 15 * 60 * 1000,
      max: 150000
    },
    slowDown: {
      window: 15 * 60 * 1000,
      delayAfter: 100,
      delayMs: 100
    }
  },
  database: {
    user: 'sa',
    password: '',
    host: 'localhost',
    name: 'CloudMetrics',
    dialect: 'mssql'
  },
  logging: {
    level: 'info'
  }
};

export default config;
