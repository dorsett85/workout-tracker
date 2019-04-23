const knex = require('knex');
const { db } = require('../config');

module.exports = knex(db);
