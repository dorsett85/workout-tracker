const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { server: { jwtSecretKey } } = require('../config');


const register = async (req, res) => {
  const { db } = req;
  const { username, password } = req.body;
  const users = db.collection('users');

  // Check if username already exists
  let newUser = await users.findOne({ username });
  if (newUser) {
    return res.status(409).json({
      message: 'User already exists'
    });
  }

  // Store the new user with a hashed password
  const hashPassword = await bcrypt.hash(password, 10);
  newUser = await users.insertOne({
    created: new Date(),
    username,
    password: hashPassword
  });
  const { insertedId } = newUser;

  // Now that the user is in the database, add a jwt token cookie
  const token = jwt.sign({ _id: insertedId, username }, jwtSecretKey);
  res.cookie('jwtToken', token);
  return res.json({
    id: insertedId,
    username
  });
};

module.exports = register;
