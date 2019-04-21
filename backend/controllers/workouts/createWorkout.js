const { ObjectId } = require('mongodb');


const createWorkout = async (req, res) => {
  const { db, user: { id }, body: { name } } = req;

  // Create and insert new workout
  const collection = db.collection('workouts');
  let insertedDoc;
  try {
    insertedDoc = await collection.insertOne({
      name,
      userId: ObjectId(id),
      createdDate: new Date()
    });
  } catch (err) {
    // Safely send back workout with missing id
    if (err.code === 11000) { return res.json({ id: '' }); }
    throw err;
  }

  // Return the new workout
  const { _id, ...workout } = insertedDoc.ops[0];
  return res.json({
    id: _id,
    name: workout.name,
    createdDate: workout.createdDate
  });
};

module.exports = createWorkout;
