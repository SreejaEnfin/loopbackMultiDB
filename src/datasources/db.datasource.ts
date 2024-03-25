import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

let config: object;
const postConfig = {
  name: 'postdemo',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'dbdemopost'
};


const mongoConfig = {
  name: 'mongo',
  connector: 'mongodb',
  url: '',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'multidbmongo',
  useNewUrlParser : true
};

// const config = {
//   name: process.env.NAME,
//   connector: process.env.CONNECTOR,
//   url: '',
//   host: process.env.HOST,
//   port: process.env.PORT,
//   user: process.env.DB_USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE
if (process.env.DB_NAME === 'postgres') {
  config = postConfig;
} else {
  config = mongoConfig;
}

// Output the selected config
console.log("configs", config);

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
