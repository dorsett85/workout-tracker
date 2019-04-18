const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { server: { jwtSecretKey } } = require('../config');


const initialLoad = async (req, res) => {
  const { db } = req;
  const { jwtToken } = req.cookies;
  const user = {
    id: '',
    username: 'Guest'
  };
  if (!jwtToken) { return res.json(user); }

  // Return request with guest as user if the token doesn't verify
  let id;
  try {
    const { _id } = await jwt.verify(jwtToken, jwtSecretKey);
    id = _id;
  } catch (err) {
    console.log(err);
    return res.json(user);
  }

  // Token is verified, send back associated user info from the database
  const users = db.collection('users');
  const { _id, username } = await users.findOne({ _id: ObjectId(id) });
  return res.send({
    id: _id,
    username
  });
};

module.exports = initialLoad;
