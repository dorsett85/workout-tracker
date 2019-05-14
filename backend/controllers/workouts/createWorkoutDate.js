const knex = require('../../db/db');


module.exports = async function createWorkoutDate(req, res) {
  const { user: { id: userId }, body: { id: workoutId } } = req;

  // Insert new workout date
  const { rows: [{ id: wdId }] } = await knex.raw(`
    INSERT INTO workout_dates (workout_id, date)
        VALUES (?, NOW())
        RETURNING id;
  `, workoutId);

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
    WHERE wr.date_id = ?
    ORDER BY date;
  `, wdId);
  return res.json(rows);
};
