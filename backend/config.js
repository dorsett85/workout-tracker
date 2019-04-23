const { ENV, DB_CONNECTION, JWT_SECRET_KEY } = require('../.env.json');


// Define config for each environment
process.env.NODE_ENV = ENV;
const development = {
  env: ENV,
  server: {
    port: 3000,
    jwtSecretKey: JWT_SECRET_KEY || 'privateKey'
  },
  db: {
    client: 'pg',
    connection: DB_CONNECTION,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

const production = {
  ...development,
  server: {
    port: 3001,
    jwtSecretKey: JWT_SECRET_KEY || 'privateKey'
  },
  db: {
    client: 'pg',
    connection: DB_CONNECTION,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

const config = {
  development,
  production
};

module.exports = config[ENV];
