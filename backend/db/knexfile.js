const { db, env } = require('../config');


module.exports = {
  [env]: db
};
