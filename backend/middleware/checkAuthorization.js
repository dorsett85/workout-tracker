const jwt = require('jsonwebtoken');
const { server: { jwtSecretKey } } = require('../../config');

const checkAuthorization = (req, res, next) => {
  const { jwtToken } = req.cookies;
  if (!jwtToken) { return res.sendStatus(401); }
  return jwt.verify(jwtToken, jwtSecretKey, (err) => {
    if (err) { return res.sendStatusCode(401); }
    return next();
  });
};

module.exports = checkAuthorization;
