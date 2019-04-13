const router = require('express').Router();
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { db } = req;
  const { username, password } = req.body;
  const users = db.collection('users');

  // Check if username already exists
  let newUser = await users.find({ username }).toArray();
  if (newUser.length) {
    return res.status(403).json({
      message: 'User already exists'
    });
  }

  // Store the new user with a hashed password
  const hashPassword = await bcrypt.hash(password, 10);
  newUser = await users.insertOne({
    created: new Date(),
    username,
    password: hashPassword
  });
  return res.json(username);
});

module.exports = router;
