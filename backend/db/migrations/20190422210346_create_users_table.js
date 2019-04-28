
exports.up = function up(knex) {
  return knex.schema.raw(`
    CREATE TABLE users (
      id serial PRIMARY KEY,
      username varchar NOT NULL UNIQUE,
      password varchar NOT NULL,
      created timestamp NOT NULL,
      last_login timestamp
    )
  `);
};

exports.down = function down(knex) {
  return knex.schema.dropTableIfExists('users');
};
