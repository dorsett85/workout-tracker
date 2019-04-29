const knex = require('../../db/db');


const createWorkout = async (req, res) => {
  const { user: { id }, body: { name } } = req;

  // Create and insert new workout
  let newWorkout;
  try {
    newWorkout = await knex.raw(`
      insert into workouts (user_id, name, created)
      values (:id, :name, :created)
      returning id, name, created
    `, { id, name, created: new Date() });
  } catch (err) {
    // Error for duplicate name
    if (err.code === '23505') { return res.json(null); }
    throw err;
  }

  // Return the new workout
  const { rows } = newWorkout;
  console.log(rows);
  return res.json(rows);
};

module.exports = createWorkout;
