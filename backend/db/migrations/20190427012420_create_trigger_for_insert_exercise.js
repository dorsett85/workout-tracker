
exports.up = function up(knex) {
  return knex.schema.raw(`
    CREATE OR REPLACE FUNCTION insert_exercises_into_workout_results() RETURNS TRIGGER AS $$
        BEGIN
            WITH wr AS (
                SELECT 
                    NEW.workout_id,
                    NEW.id AS exercise_id,
                    id AS date_id
                FROM workout_dates
            )
            INSERT INTO workout_results (workout_id, exercise_id, date_id)
            SELECT * FROM wr;
            RETURN NEW;
        END;
    $$ LANGUAGE plpgsql;


    CREATE TRIGGER trigger_exercises_insert
        AFTER INSERT ON exercises
        FOR EACH ROW EXECUTE PROCEDURE insert_exercises_into_workout_results();
  `);
};

exports.down = function down(knex) {
  return knex.schema.raw(`
    DROP TRIGGER IF EXISTS trigger_exercises_insert ON exercises;
    DROP FUNCTION IF EXISTS insert_exercises_into_workout_results;
  `);
};
