const router = require('express').Router();
const bcrypt = require('bcrypt');


router.post('/login', async (req, res) => {
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
  return res.json({
    id: user._id,
    username,
    password: passwordIsValid
  });
});

router.post('/register', async (req, res) => {
  const { db } = req;
  const { username, password } = req.body;
  const users = db.collection('users');

  // Check if username already exists
  let newUser = await users.findOne({ username });
  if (newUser) {
    return res.status(409).json({
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
  return res.json({
    id: newUser.insertedId,
    username
  });
});

module.exports = router;
