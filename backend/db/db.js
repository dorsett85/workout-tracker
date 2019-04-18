const { MongoClient } = require('mongodb');
const { db: { connectionString } } = require('../config');


const dbConnect = async () => {
  try {
    const client = await MongoClient.connect(connectionString, { useNewUrlParser: true });
    return client.db(client.s.databaseName);
  } catch (err) {
    throw err;
  }
};

module.exports = dbConnect;
