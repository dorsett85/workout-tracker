const knex = require('../../db/db');


const getWorkout = async (req, res) => {
  const { user: { id: userId }, params: { type, id: workoutId } } = req;

  // Return query based on type parameter
  if (type === 'all') {
    const { rows } = await knex.raw(`
      SELECT id, name, created, last_completed AS lastCompleted 
      FROM workouts
      WHERE user_id = ?
      ORDER BY created DESC 
    `, userId);
    return res.json(rows);
  }
  if (type === 'results') {
    return res.json('asdf');
  }
  return res.status(400).json('Invalid type parameter in request');
};

module.exports = getWorkout;
