
exports.up = function up(knex) {
  return knex.schema.raw(`
    CREATE OR REPLACE FUNCTION insert_dates_into_workout_results() RETURNS TRIGGER AS $$
        BEGIN
            WITH wr AS (
                SELECT 
                    NEW.workout_id,
                    id AS exercise_id,
                    NEW.id AS date_id
                FROM exercises
                WHERE workout_id = NEW.workout_id
            )
            INSERT INTO workout_results (workout_id, exercise_id, date_id)
            SELECT * FROM wr;
            RETURN NEW;
        END;
    $$ LANGUAGE plpgsql;


    CREATE TRIGGER trigger_workout_dates_insert
        AFTER INSERT ON workout_dates
        FOR EACH ROW EXECUTE PROCEDURE insert_dates_into_workout_results();
  `);
};

exports.down = function down(knex) {
  return knex.schema.raw(`
    DROP TRIGGER IF EXISTS trigger_workout_dates_insert ON workout_dates;
    DROP FUNCTION IF EXISTS insert_dates_into_workout_results;
  `);
};
