const router = require('express').Router();
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const checkAuthorization = require('../middleware/checkAuthorization');
const initialLoad = require('../controllers/initialLoad');
const login = require('../controllers/login');
const register = require('../controllers/register');
const logout = require('../controllers/logout');
const getWorkout = require('../controllers/workouts/getWorkout');
const createWorkout = require('../controllers/workouts/createWorkout');


// Initial get request run on page load/refresh
router.get('/initialLoad', asyncErrorHandler(initialLoad));

// User change routes
router.post('/login', asyncErrorHandler(login));
router.post('/register', asyncErrorHandler(register));
router.post('/logout', asyncErrorHandler(logout));

// User workout routes
router.use('/workout', checkAuthorization);
router.get('/workout', asyncErrorHandler(getWorkout));
router.get('/workout/:id', asyncErrorHandler(getWorkout));
router.post('/workout', asyncErrorHandler(createWorkout));
router.put('/workout');
router.delete('/workout');

module.exports = router;
