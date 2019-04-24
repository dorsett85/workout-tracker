
exports.up = function up(knex) {
  return knex.schema.raw(`
    CREATE TABLE workout_results (
      id serial PRIMARY KEY,
      workout_id integer REFERENCES workouts(id) NOT NULL,
      exercise_id integer REFERENCES exercises(id) NOT NULL,
      date_id integer REFERENCES workout_dates(id) NOT NULL,
      value varchar
    )
  `);
};

exports.down = function down(knex) {
  return knex.schema.raw(`
    DROP TABLE workout_results
  `);
};
