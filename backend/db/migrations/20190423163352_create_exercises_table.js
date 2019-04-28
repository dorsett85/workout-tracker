
exports.up = function up(knex) {
  return knex.schema.raw(`
    CREATE TABLE exercises (
      id serial PRIMARY KEY,
      workout_id integer NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
      name varchar NOT NULL,
      units varchar,
      notes varchar,
      UNIQUE(workout_id, name)
    )
  `);
};

exports.down = function down(knex) {
  return knex.schema.raw(`
    DROP TABLE exercises
  `);
};
