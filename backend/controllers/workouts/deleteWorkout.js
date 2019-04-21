const { ObjectId } = require('mongodb');


const deleteWorkout = async (req, res) => {
  const { db, body: { id } } = req;

  // Delete the requested document and send back the id
  const collection = db.collection('workouts');
  await collection.deleteOne({ _id: ObjectId(id) });
  return res.json({ id });
};

module.exports = deleteWorkout;
