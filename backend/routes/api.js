const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { server: { jwtSecretKey } } = require('../../config');


router.get('/login', async (req, res) => {
  try {
    const { db } = req;
    const { jwtToken } = req.cookies;
    const user = {
      id: '',
      username: 'Guest'
    };
    if (!jwtToken) { return res.json(user); }

    // Return request with guest as user if the token doesn't verify
    let id;
    try {
      const { _id } = await jwt.verify(jwtToken, jwtSecretKey);
      id = _id;
    } catch (err) {
      console.log(err);
      return res.json(user);
    }

    // Token is verified, send back associated user info from the database
    const users = db.collection('users');
    const { _id, username } = await users.findOne({ _id: ObjectId(id) });
    return res.send({
      id: _id,
      username
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

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
  if (!passwordIsValid) {
    return res.json({
      username,
      password: passwordIsValid
    });
  }

  // Now that the user passed validation, add a jwt token cookie
  const { _id } = user;
  const token = jwt.sign({ _id, username }, jwtSecretKey);
  res.cookie('jwtToken', token);
  return res.json({
    id: _id,
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
  const { insertedId } = newUser;

  // Now that the user is in the database, add a jwt token cookie
  const token = jwt.sign({ _id: insertedId, username }, jwtSecretKey);
  res.cookie('jwtToken', token);
  return res.json({
    id: insertedId,
    username
  });
});

router.post('/logout', async (req, res) => {
  try {
    const { id, username } = req.body;
    /**
     * TODO
     * Tag user as logged out and add timestamp for last logged in
     */

    // Remove the jwtToken cookie and send back the guest user
    res.clearCookie('jwtToken');
    return res.json({
      id: '',
      username: 'Guest'
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
