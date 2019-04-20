const { ObjectId } = require('mongodb');


const createWorkout = async (req, res) => {
  const { db, user: { id }, body: { name } } = req;
  const collection = db.collection('users');

  // Create and insert new workout
  const doc = {
    _id: new ObjectId(),
    name,
    createdDate: new Date()
  };
  const updatedDoc = await collection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $push: { workouts: doc } },
    {
      projection: {
        workouts: { $slice: -1 }
      }
    }
  );

  // Return the new workout
  const { _id, ...workout } = updatedDoc.value.workouts[0];
  return res.json({
    id: _id,
    name: workout.name,
    createdDate: workout.createdDate
  });
};

module.exports = createWorkout;
