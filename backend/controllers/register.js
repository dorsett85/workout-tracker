const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('../db/db');
const { server: { jwtSecretKey } } = require('../config');


const register = async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const newUser = await knex.raw('select * from users where username = ?', username);
  if (newUser.rows.length) {
    return res.status(409).json({
      message: 'User already exists'
    });
  }

  // Store the new user with a hashed password
  const hashPassword = await bcrypt.hash(password, 10);
  const { rows: [{ id }] } = await knex.raw(`
    insert into users (username, password, created)
    values (:username, :password, :created)
    returning id, username
  `, { username, password: hashPassword, created: new Date() });

  // Now that the user is in the database, add a jwt token cookie
  const token = jwt.sign({ id, username }, jwtSecretKey);
  res.cookie('jwtToken', token);
  return res.json({ id, username });
};

module.exports = register;
