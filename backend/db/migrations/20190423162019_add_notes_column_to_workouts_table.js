
exports.up = function up(knex) {
  return knex.schema.raw(`
    ALTER TABLE workouts
    ADD COLUMN notes TEXT
  `);
};

exports.down = function down(knex) {
  return knex.schema.raw(`
    ALTER TABLE workouts
    DROP COLUMN notes
  `);
};
