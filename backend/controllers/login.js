const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { server: { jwtSecretKey } } = require('../config');


const login = async (req, res) => {
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
      password: passwordIsValid
    });
  }

  // Now that the user passed validation, add a jwt token cookie
  const { _id } = user;
  const token = jwt.sign({ _id, username }, jwtSecretKey);
  res.cookie('jwtToken', token);
  return res.json({
    id: _id,
    username,
    password: passwordIsValid
  });
};

module.exports = login;
