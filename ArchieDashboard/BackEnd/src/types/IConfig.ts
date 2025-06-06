interface IConfig {
  request: {
    rateLimit: {
      window: number;
      max: number;
    };
    slowDown: {
      window: number;
      delayAfter: number;
      delayMs: number;
    };
  };
  database: {
    user: string;
    password: string;
    host: string;
    name: string;
    dialect: string;
  };
  logging: {
    level: string;
  };
}

export default IConfig;
