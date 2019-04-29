const knex = require('../../db/db');


module.exports = async function deleteWorkout(req, res) {
  const { user: { id: userId }, body: { id } } = req;
  await knex.raw(`
    DELETE FROM workouts
    WHERE id = :id AND user_id = :userId
  `, { id, userId });
  return res.json({ id });
};
