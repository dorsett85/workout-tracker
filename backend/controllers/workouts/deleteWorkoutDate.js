const knex = require('../../db/db');


module.exports = async function deleteWorkoutDate(req, res) {
  const { user: { id: userId }, body: { wdId } } = req;
  await knex.raw(`
    DELETE FROM workout_dates wd
    WHERE id = :wdId AND workout_id = (
        SELECT id
        FROM workouts
        WHERE id = wd.workout_id AND user_id = :userId
    );
  `, { wdId, userId });
  return res.json({ wdId });
};
