
exports.up = function up(knex) {
  return knex.schema.raw(`
    CREATE OR REPLACE FUNCTION insert_exercise_date() RETURNS trigger AS $$
        DECLARE
            username varchar;
            exercise_name varchar;
        BEGIN

            -- Add username prefix to the first exercise
            username := (SELECT u.username FROM users u WHERE u.id = NEW.user_id);
            exercise_name = CONCAT(username, '''s exercise');
            INSERT INTO exercises (workout_id, name)
                VALUES (NEW.id, exercise_name);
            
            -- Add record to workout_dates
            INSERT INTO workout_dates (workout_id, date)
                VALUES (NEW.id, NEW.created);

            RETURN NEW;
        END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER trigger_workouts_insert
        AFTER INSERT ON workouts
        FOR EACH ROW EXECUTE PROCEDURE insert_exercise_date();
  `);
};

exports.down = function down(knex) {
  return knex.schema.raw(`
    DROP TRIGGER IF EXISTS trigger_workouts_insert ON workouts;
    DROP FUNCTION IF EXISTS insert_exercise_date;
  `);
};
