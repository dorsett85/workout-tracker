const knex = require('../../db/db');


const getWorkout = async (req, res) => {
  const { user: { id } } = req;
  const { rows } = await knex.raw(`
    SELECT id, name, created, last_completed as lastCompleted from workouts where user_id = ?
  `, id);
  return res.json(rows);
};

module.exports = getWorkout;
