const knex = require('../../db/db');


module.exports = async function updateWorkout(req, res) {
  const { user: { id: userId }, body: { id, workoutName, workoutNotes, lastCompleted } } = req;

  // Update name
  if (workoutName !== undefined) {
    try {
      await knex.raw(`
        UPDATE workouts SET name = :workoutName
            WHERE id = :id
      `, { id, workoutName });
    } catch (err) {
      // Error for duplicate name
      if (err.code === '23505') { return res.json(null); }
      throw err;
    }
    return res.json(id);
  }

  // Update notes
  if (workoutNotes !== undefined) {
    await knex.raw(`
      UPDATE workouts SET notes = :workoutNotes
          WHERE id = :id
    `, { id, workoutNotes });
    return res.json(id);
  }

  // Update last completed
  if (lastCompleted !== undefined) {
    const { wdId } = req.body;

    // Get the workout id as we will still need it if the next query returns no results
    const { rows: [{ workout_id: workoutId }] } = await knex.raw(`
      SELECT workout_id
      FROM workout_dates
      WHERE id = ?
    `, wdId);

    // Get the latest completed workout date
    const { rows: [row] } = await knex.raw(`
      SELECT date 
      FROM workout_dates wd
      WHERE completed = true AND workout_id = :workoutId
      ORDER BY date DESC
      LIMIT 1;
    `, { wdId, workoutId });

    // Update the workout table with the new last completed date
    const newLastCompleted = row ? row.date : null;
    await knex.raw(`
      UPDATE workouts SET last_completed = :newLastCompleted
      WHERE id = :workoutId
    `, { newLastCompleted, workoutId });

    return res.json({
      workoutId,
      lastCompleted: newLastCompleted
    });
  }
  return res.status(400).json('Invalid body properties in request');
};
