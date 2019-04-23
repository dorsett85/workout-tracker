
exports.up = function up(knex) {
  return knex.schema.raw(`
    CREATE TABLE workouts (
      id serial primary key,
      user_id integer references users(id),
      name varchar not null,
      created timestamp,
      last_completed timestamp,
      unique(user_id, name)
    )
  `);
};

exports.down = function down(knex) {
  return knex.schema.dropTableIfExists('workouts');
};
