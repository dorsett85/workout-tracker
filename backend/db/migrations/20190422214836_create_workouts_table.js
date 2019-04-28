
exports.up = function up(knex) {
  return knex.schema.raw(`
    CREATE TABLE workouts (
      id serial PRIMARY KEY,
      user_id integer NOT NULL REFERENCES users(id),
      name varchar NOT NULL,
      created timestamp,
      last_completed timestamp,
      UNIQUE(user_id, name)
    )
  `);
};

exports.down = function down(knex) {
  return knex.schema.dropTableIfExists('workouts');
};
