const knex = require('../../db/db');


module.exports = async function updateWorkoutExercise(req, res) {
  const { user: { id: userId }, body: { id: workoutId, exId } } = req;
  console.log(workoutId, exId);

  // Update completed
  // if (completed !== undefined) {
  //   await knex.raw(`
  //     UPDATE workout_dates wd SET completed = :completed
  //     WHERE id = :wdId AND workout_id = (
  //         SELECT id
  //         FROM workouts
  //         WHERE id = wd.workout_id AND user_id = :userId
  //     );
  //   `, { completed, wdId, userId });
  //   return res.json(completed);
  // }
  return res.status(400).json('Invalid body properties in request');
};
