const jwt = require('jsonwebtoken');
const { server: { jwtSecretKey } } = require('../config');

const checkAuthorization = (req, res, next) => {
  const { jwtToken } = req.cookies;
  if (!jwtToken) { return res.sendStatus(401); }
  return jwt.verify(jwtToken, jwtSecretKey, (err, { id, username }) => {
    if (err) { return res.sendStatusCode(401); }

    // Attach verified user to the req object
    req.user = { id, username };
    return next();
  });
};

module.exports = checkAuthorization;
