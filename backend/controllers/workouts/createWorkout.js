const { ObjectId } = require('mongodb');


const createWorkout = async (req, res) => {
  console.log(req.user);
  const { db } = req;
  const { id, username } = req.body;
  return res.json('asdf');
};

module.exports = createWorkout;
