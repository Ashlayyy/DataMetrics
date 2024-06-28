import { Dialect, Sequelize } from 'sequelize';
import { injectable, inject } from 'tsyringe';
import ILogger from '../interfaces/ILogger';
import config from '../config/Config';

require('dotenv').config();

const database: string =
  process?.env?.NODE_ENV === 'development' ? config.database.name : process?.env?.SQLDB_PROD_DATABASE ?? '';
const username: string =
  process?.env?.NODE_ENV === 'development' ? config.database.user : process?.env?.SQLDB_PROD_USER ?? '';
const password: string =
  process?.env?.NODE_ENV === 'development' && process?.env?.OVERRIDE !== 'active'
    ? config.database.password
    : process?.env?.SQLDB_PROD_PASS ?? '';
const host: string =
  process?.env?.NODE_ENV === 'development' ? config.database.host : process?.env?.SQLDB_PROD_HOST ?? '';
const dialect: any =
  process?.env?.NODE_ENV === 'development'
    ? config.database.dialect
    : (process?.env?.SQLDB_PROD_DIALECT as Dialect | undefined) ?? ('mssql' as Dialect | undefined);

@injectable()
class Database {
  sequelize: any;

  constructor(@inject('Logger') private readonly Logger: ILogger) {
    const sequelize = new Sequelize(database, username, password, {
      host,
      dialect: dialect as Dialect | undefined,
      pool: {
        max: 5,
        min: 2,
        acquire: 30000,
        idle: 10000
      },
      logging: this.Logger.info.bind(this.Logger)
    });

    this.sequelize = sequelize;

    this.authenticate();
  }

  async authenticate(): Promise<void> {
    try {
      await this.sequelize
        .authenticate()
        .then(() => {
          this.Logger.info('Connection has been established successfully.');
        })
        .catch((err: any) => {
          this.Logger.error(`Unable to connect to the database: ${String(err)}`);
        });
    } catch (err) {
      this.Logger.error(String(err));
    }
  }
}
export default Database;
