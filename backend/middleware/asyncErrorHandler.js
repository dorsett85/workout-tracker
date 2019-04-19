const { env } = require('../config');

const asyncErrorHandler = fn => (req, res, next) => (
  fn(req, res, next).catch((err) => {
    if (env !== 'development') { return next(err); }
    console.log(err);
    return res.status(500).json(err.stack);
  })
);

module.exports = asyncErrorHandler;
