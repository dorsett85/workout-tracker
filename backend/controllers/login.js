const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('../db/db');
const { server: { jwtSecretKey } } = require('../config');


const login = async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const { rows: [user] } = await knex.raw(`
    select id, username, password from users where username = ?
  `, username);
  if (!user) { return res.json({ username: false }); }

  // Check if the password matches
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.json({
      username,
      password: false
    });
  }

  // Now that the user passed validation, add a jwt token cookie and a user on the req object
  const { id } = user;
  const token = jwt.sign({ id, username }, jwtSecretKey);
  res.cookie('jwtToken', token);
  return res.json({ id, username });
};

module.exports = login;
