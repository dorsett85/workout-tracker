
exports.up = function up(knex) {
  return knex.schema.raw(`
    CREATE TABLE workout_dates (
      id serial PRIMARY KEY,
      workout_id integer NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
      date timestamp NOT NULL,
      notes varchar,
      completed bool DEFAULT FALSE
    )
  `);
};

exports.down = function down(knex) {
  return knex.schema.raw(`
    DROP TABLE workout_dates
  `);
};
