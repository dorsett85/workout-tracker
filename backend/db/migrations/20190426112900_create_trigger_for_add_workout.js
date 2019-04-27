
exports.up = function up(knex) {
  return knex.schema.raw(`
    CREATE FUNCTION init_workout_results() RETURNS trigger AS $$
        DECLARE
            username varchar;
            exercise_name varchar;
        BEGIN
            username := (SELECT u.username FROM users u WHERE u.id = NEW.user_id);
            exercise_name = CONCAT(username, '''s exercise');
            WITH exercise AS (
                -- Add record to exercises
                INSERT INTO exercises (workout_id, name)
                    VALUES (NEW.id, exercise_name)
                    RETURNING id
            ), date AS (
              -- Add record to workout_dates
              INSERT INTO workout_dates (workout_id, date)
                  VALUES (NEW.id, NEW.created)
                  RETURNING id 
            )

            -- ADD id's from newly created records to the results table
            INSERT INTO workout_results (exercise_id, date_id)
                VALUES (
                    (SELECT id FROM exercise),
                    (SELECT id FROM date)
                ); 

            RETURN NEW;
        END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER init_workout_results_trigger AFTER INSERT ON workouts
        FOR EACH ROW EXECUTE PROCEDURE init_workout_results();
  `);
};

exports.down = function down(knex) {
  return knex.schema.raw(`
    DROP TRIGGER init_workout_results_trigger ON workouts;
    DROP FUNCTION init_workout_results();
  `);
};
