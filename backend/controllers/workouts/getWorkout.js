const { ObjectId } = require('mongodb');


const getWorkout = async (req, res) => {
  const { user, db } = req;
  const collection = db.collection('workouts');
  const workouts = await collection.aggregate([
    { $match: { userId: ObjectId(user.id) } },
    { $project: { _id: 0, id: '$_id', name: 1, createdDate: 1 } },
    { $sort: { createdDate: -1 } }
  ]).toArray();
  return res.json(workouts);
};

module.exports = getWorkout;
