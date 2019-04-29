const router = require('express').Router();
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const checkAuthorization = require('../middleware/checkAuthorization');
const initialLoad = require('../controllers/initialLoad');

const login = require('../controllers/login');
const register = require('../controllers/register');
const logout = require('../controllers/logout');

const getWorkout = require('../controllers/workouts/getWorkout');
const createWorkout = require('../controllers/workouts/createWorkout');
const updateWorkout = require('../controllers/workouts/updateWorkout');
const deleteWorkout = require('../controllers/workouts/deleteWorkout');

const createWorkoutDate = require('../controllers/workouts/createWorkoutDate');
const updateWorkoutDate = require('../controllers/workouts/updateWorkoutDate');
const deleteWorkoutDate = require('../controllers/workouts/deleteWorkoutDate');

const createWorkoutExercise = require('../controllers/workouts/createWorkoutExercise');
const deleteWorkoutExercise = require('../controllers/workouts/deleteWorkoutExercise');

const updateWorkoutResult = require('../controllers/workouts/updateWorkoutResult');

// Initial get request run on page load/refresh
router.get('/initialLoad', asyncErrorHandler(initialLoad));

// User change routes
router.post('/login', asyncErrorHandler(login));
router.post('/register', asyncErrorHandler(register));
router.post('/logout', asyncErrorHandler(logout));

// Workout routes
router.use('/workout', checkAuthorization);
router.get('/workout/:type/:id?', asyncErrorHandler(getWorkout));
router.post('/workout', asyncErrorHandler(createWorkout));
router.put('/workout', asyncErrorHandler(updateWorkout));
router.delete('/workout', asyncErrorHandler(deleteWorkout));

// Workout date routes
router.post('/workout/date', asyncErrorHandler(createWorkoutDate));
router.put('/workout/date', asyncErrorHandler(updateWorkoutDate));
router.delete('/workout/date', asyncErrorHandler(deleteWorkoutDate));

// Workout exercise routes
router.post('/workout/exercise', asyncErrorHandler(createWorkoutExercise));
router.delete('/workout/exercise', asyncErrorHandler(deleteWorkoutExercise));

// Workouts results routes
router.put('/workout/results', asyncErrorHandler(updateWorkoutResult));


module.exports = router;
