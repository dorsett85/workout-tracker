const knex = require('../../db/db');


module.exports = async function updateWorkoutExercise(req, res) {
  const { user: { id: userId }, body: { exId, exName, exNotes } } = req;

  // Update name
  if (exName !== undefined) {
    try {
      await knex.raw(`
        UPDATE exercises ex SET name = :exName
        WHERE id = :exId;
      `, { exId, exName });
    } catch (err) {
      // Error for duplicate name
      if (err.code === '23505') { return res.json(null); }
      throw err;
    }
    return res.json(exId);
  }

  // Update notes
  if (exNotes !== undefined) {
    await knex.raw(`
        UPDATE exercises ex SET notes = :exNotes
        WHERE id = :exId;
      `, { exId, exNotes });
    return res.json(exId);
  }
  return res.status(400).json('Invalid body properties in request');
};
