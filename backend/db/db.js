const { MongoClient } = require('mongodb');
const { db: { connectionString } } = require('../../config');


const dbConnect = async () => {
  try {
    return MongoClient.connect(connectionString, { useNewUrlParser: true });
  } catch (err) {
    return err;
  }
};

module.exports = dbConnect;
