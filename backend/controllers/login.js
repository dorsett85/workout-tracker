const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { server: { jwtSecretKey } } = require('../config');


const login = async (req, res, next) => {
  const { db } = req;
  const { username, password } = req.body;
  const users = db.collection('users');

  // Check if user exists
  const user = await users.findOne({ username });
  if (!user) {
    return res.json({
      username: false
    });
  }

  // Check if the password matches
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.json({
      username,
      password: false
    });
  }

  // Now that the user passed validation, add a jwt token cookie and a user on the req object
  const { _id: id } = user;
  const token = jwt.sign({ id, username }, jwtSecretKey);
  res.cookie('jwtToken', token);
  return res.json({ id, username });
};

module.exports = login;
