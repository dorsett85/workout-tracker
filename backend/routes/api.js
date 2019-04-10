const router = require('express').Router();

router.get('/*', (req, res) => {
  console.log('got the db')
  console.log(Object.keys(req.db));
  res.send('adf');
});

module.exports = router;
