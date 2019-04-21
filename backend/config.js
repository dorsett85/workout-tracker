const { ENV, JWT_SECRET_KEY } = require('../.env.json');


// Define config for each environment
const development = {
  env: ENV,
  server: {
    port: 3000,
    jwtSecretKey: JWT_SECRET_KEY || 'privateKey'
  },
  db: {
    connectionString: 'mongodb://localhost:27017/workout-tracker'
  }
};

const production = {
  ...development,
  server: {
    port: 3001,
    jwtSecretKey: JWT_SECRET_KEY || 'privateKey'
  },
  db: {
    connectionString: 'mongodb://localhost:27017/workout-tracker'
  }
};

const config = {
  development,
  production
};

module.exports = config[ENV];
