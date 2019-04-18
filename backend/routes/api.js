const router = require('express').Router();
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const initialLoad = require('../controllers/initialLoad');
const login = require('../controllers/login');
const register = require('../controllers/register');
const logout = require('../controllers/logout');


router.get('/initialLoad', asyncErrorHandler(initialLoad));
router.post('/login', asyncErrorHandler(login));
router.post('/register', asyncErrorHandler(register));
router.post('/logout', asyncErrorHandler(logout));

module.exports = router;
