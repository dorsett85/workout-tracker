module.exports = function checkAjaxRequest(req, res, next) {
  return req.xhr ? res.sendStatus(404) : next();
};
