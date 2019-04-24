const knex = require('../../db/db');


const getWorkout = async (req, res) => {
  const { user: { id } } = req;
  const { rows } = await knex.raw(`
    SELECT id, name, created, last_completed AS lastCompleted 
    FROM workouts
    WHERE user_id = ?
    ORDER BY created DESC 
  `, id);
  return res.json(rows);
};

module.exports = getWorkout;
