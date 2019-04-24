const knex = require('../../db/db');


const deleteWorkout = async (req, res) => {
  const { body: { id } } = req;

  // Delete the requested document and send back the id
  await knex.raw('delete from workouts where id = ?', id);
  return res.json({ id });
};

module.exports = deleteWorkout;
