const { DB_HOST } = require('./.env.json');

const env = process.env.NODE_ENV || 'development';


// Define config for each environment
const development = {
  server: {
    port: 3000
  },
  db: {
    connectionString: 'mongodb://localhost:27017/workout-tracker'
  }
};

const production = {
  ...development,
  db: {
    connectionString: 'mongodb://localhost:27017/workout-tracker'
  }
};

const config = {
  development,
  production
};

module.exports = config[env];
