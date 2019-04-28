const knex = require('../../db/db');


const createWorkout = async (req, res) => {
  const { user: { id }, body: { name } } = req;

  // Create and insert new workout
  console.log(name);
  let newWorkout;
  try {
    newWorkout = await knex.raw(`
      insert into workouts (user_id, name, created)
      values (:id, :name, :created)
      returning id, name, created
    `, { id, name, created: new Date() });
  } catch (err) {
    // Safely send back workout with missing id
    if (err.code === '23505') { return res.json({ id: '' }); }
    throw err;
  }

  // Return the new workout
  const { rows: [workout] } = newWorkout;
  return res.json(workout);
};

module.exports = createWorkout;
