const knex = require('../../db/db');


const getWorkout = async (req, res) => {
  const { user: { id: userId }, params: { type, id: workoutId } } = req;

  // Return query based on type parameter
  if (type === 'all') {
    const { rows } = await knex.raw(`
      SELECT id, name, created, last_completed AS lastcompleted, notes
      FROM workouts
      WHERE user_id = ?
      ORDER BY created DESC 
    `, userId);
    return res.json(rows);
  }
  if (type === 'results') {
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
      WHERE wr.workout_id = (
          SELECT w.id
          FROM workouts AS w
          WHERE w.id = :workoutId AND w.user_id = :userId
      )
      ORDER BY date;
    `, { workoutId, userId });
    return res.json(rows);
  }
  return res.status(400).json('Invalid type parameter in request');
};

module.exports = getWorkout;
