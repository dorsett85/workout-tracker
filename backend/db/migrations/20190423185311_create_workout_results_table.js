
exports.up = function up(knex) {
  return knex.schema.raw(`
    CREATE TABLE workout_results (
      id serial PRIMARY KEY,
      workout_id integer NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
      exercise_id integer NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
      date_id integer NOT NULL REFERENCES workout_dates(id) ON DELETE CASCADE,
      value varchar,
      notes varchar
    )
  `);
};

exports.down = function down(knex) {
  return knex.schema.raw(`
    DROP TABLE workout_results
  `);
};
