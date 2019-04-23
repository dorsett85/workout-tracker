const jwt = require('jsonwebtoken');
const knex = require('../db/db');
const { server: { jwtSecretKey } } = require('../config');


const initialLoad = async (req, res) => {
  const { jwtToken } = req.cookies;
  const user = {
    username: 'Guest'
  };
  if (!jwtToken) { return res.json(user); }

  // Return request with guest as user if the token doesn't verify
  let userId;
  try {
    ({ id: userId } = await jwt.verify(jwtToken, jwtSecretKey));
  } catch (err) {
    console.log(err);
    return res.json(user);
  }

  // Token is verified, send back associated user info from the database
  const { rows: [{ id, username }] } = await knex.raw(`
    select id, username from users where id = ?
  `, userId);
  return res.send({ id, username });
};

module.exports = initialLoad;
