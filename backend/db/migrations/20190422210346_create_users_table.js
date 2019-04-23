
exports.up = function up(knex) {
  return knex.schema.raw(`
    CREATE TABLE users (
      id serial primary key,
      username varchar not null unique,
      password varchar not null,
      created timestamp not null,
      last_login timestamp
    )
  `);
};

exports.down = function down(knex) {
  return knex.schema.dropTableIfExists('users');
};
