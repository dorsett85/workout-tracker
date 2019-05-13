const knex = require('../../db/db');


module.exports = async function updateWorkoutResult(req, res) {
  const { user: { id: userId }, body: { wrId, wrValue } } = req;

  // Update value
  if (wrValue !== undefined) {
    const { rows: [{ exercise_id: exId }] } = await knex.raw(`
      UPDATE workout_results SET value = :wrValue
      WHERE id = :wrId
      RETURNING exercise_id
    `, { wrId, wrValue });
    return res.json({ wrId, exId, wrValue });
  }
  return res.status(400).json('Invalid body properties in request');
};
