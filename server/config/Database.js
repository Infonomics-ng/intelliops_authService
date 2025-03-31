import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const environment = process.env.NODE_ENV || 'local'

let dbConfig

switch (environment) {
  case 'development':
    dbConfig = {
      dbName: process.env.DB_NAME_DEV,
      dbUser: process.env.DB_USER_DEV,
      dbPassword: process.env.DB_PASSWORD_DEV,
      dbHost: process.env.DB_HOST_DEV,
      dbPort: process.env.DB_PORT_DEV
    }
    break

  case 'corporate':
    dbConfig = {
      dbName: process.env.DB_NAME_CORPORATE,
      dbUser: process.env.DB_USER_CORPORATE,
      dbPassword: process.env.DB_PASSWORD_CORPORATE,
      dbHost: process.env.DB_HOST_CORPORATE,
      dbPort: process.env.DB_PORT_CORPORATE
    }
    break

  case 'connect':
    dbConfig = {
      dbName: process.env.DB_NAME_CONNECT,
      dbUser: process.env.DB_USER_CONNECT,
      dbPassword: process.env.DB_PASSWORD_CONNECT,
      dbHost: process.env.DB_HOST_CONNECT,
      dbPort: process.env.DB_PORT_CONNECT
    }
    break

  case 'testserver':
    dbConfig = {
      dbName: process.env.DB_NAME_TESTSERVER,
      dbUser: process.env.DB_USER_TESTSERVER,
      dbPassword: process.env.DB_PASSWORD_TESTSERVER,
      dbHost: process.env.DB_HOST_TESTSERVER,
      dbPort: process.env.DB_PORT_TESTSERVER
    }
    break

  default:
    dbConfig = {
      dbName: process.env.DB_NAME_LOCAL,
      dbUser: process.env.DB_USER_LOCAL,
      dbPassword: process.env.DB_PASSWORD_LOCAL,
      dbHost: process.env.DB_HOST_LOCAL,
      dbPort: process.env.DB_PORT_LOCAL
    }
    break
}

const db = new Sequelize(
  dbConfig.dbName,
  dbConfig.dbUser,
  dbConfig.dbPassword,
  {
    dialect: 'mysql',
    host: dbConfig.dbHost,
    port: dbConfig.dbPort,
    logging: false
  }
)

const IFSoracleDB = new Sequelize(
  process.env.ORACLE_DB_NAME,
  process.env.ORACLE_DB_USER,
  process.env.ORACLE_DB_PASSWORD,
  {
    dialect: 'oracle',
    host: process.env.ORACLE_DB_HOST,
    port: process.env.ORACLE_DB_PORT,
    dialectOptions: {
      connectString: `${process.env.ORACLE_DB_HOST}:${process.env.ORACLE_DB_PORT}/${process.env.ORACLE_DB_NAME}`
    }
  }
)

const OraPpsDB = new Sequelize(
  process.env.ORAPP_DB_NAME,
  process.env.ORAPP_DB_USER,
  process.env.ORAPP_DB_PASSWORD,
  {
    dialect: 'oracle',
    host: process.env.ORAPP_DB_HOST,
    port: process.env.ORAPP_DB_PORT,
    dialectOptions: {
      connectString: `${process.env.ORAPP_DB_HOST}:${process.env.ORAPP_DB_PORT}/${process.env.ORAPP_DB_NAME}`
    }
  }
)

const DB_IMPLEMENTATION = process.env.DB_IMPLEMENTATION

export { DB_IMPLEMENTATION, db as default, IFSoracleDB, OraPpsDB }

