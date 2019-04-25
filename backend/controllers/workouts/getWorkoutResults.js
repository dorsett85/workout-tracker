const knex = require('../../db/db');


const getWorkoutResults = async (req, res) => {
  const { user: { id: userId }, params: { id: workoutId } } = req;
  // const { rows } = await knex.raw(`
  //   SELECT id, name, created, last_completed AS lastCompleted 
  //   FROM workouts
  //   WHERE user_id = ?
  //   ORDER BY created DESC 
  // `, id);
  return res.json(workoutId);
};

module.exports = getWorkoutResults;
