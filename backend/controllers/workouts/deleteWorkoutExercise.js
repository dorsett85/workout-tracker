const knex = require('../../db/db');


module.exports = async function deleteWorkout(req, res) {
  const { user: { id: userId }, body: { id: workoutId, exId } } = req;

  await knex.raw(`
    DELETE FROM exercises
    WHERE id = ?;
  `, exId);

  // Get new data to add to the workout editor table
  const { rows } = await knex.raw(`
    SELECT 
        ex.id AS exid,
        ex."name" AS name,
        ex.notes AS exnotes,
        ex.units AS units,
        wd.id AS wdid,
        wd.date AS date,
        wd.notes AS wdnotes,
        wd.completed AS completed,
        wr.id AS wrid,
        wr."value" AS value,
        wr.notes AS wrnotes
    FROM workout_results wr
        INNER JOIN workout_dates wd
            ON wr.date_id = wd.id
        INNER JOIN exercises ex
            ON wr.exercise_id = ex.id
    WHERE wr.workout_id = ?
    ORDER BY date;
  `, workoutId);
  return res.json(rows);
};
