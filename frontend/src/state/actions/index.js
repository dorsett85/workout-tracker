export const APP_LOADED = 'APP_LOADED';
export const CHANGE_USER = 'CHANGE_USER';
export const LOADING_USER = 'LOADING_USER';

export const SET_CREATING_WORKOUT = 'SET_CREATING_WORKOUT';
export const SET_EDITING_WORKOUT_ID = 'SET_EDITING_WORKOUT_ID';
export const SET_FETCHING_WORKOUTS = 'SET_FETCHING_WORKOUTS';
export const SET_LAST_COMPLETED_WORKOUT_DATE = 'SET_LAST_COMPLETED_WORKOUT_DATE';
export const ADD_WORKOUTS = 'ADD_WORKOUTS';
export const REMOVE_WORKOUTS = 'REMOVE_WORKOUTS';


// App actions
const setAppLoaded = payload => (
  { type: APP_LOADED, payload }
);

// User actions
const changeUser = payload => (
  { type: CHANGE_USER, payload }
);

const loadingUser = payload => (
  { type: LOADING_USER, payload }
);

// Workout actions
const setCreatingWorkout = payload => (
  { type: SET_CREATING_WORKOUT, payload }
);

const setEditingWorkoutId = payload => (
  { type: SET_EDITING_WORKOUT_ID, payload }
);

const setFetchingWorkouts = payload => (
  { type: SET_FETCHING_WORKOUTS, payload }
);

const setLastCompletedWorkoutDate = payload => (
  { type: SET_LAST_COMPLETED_WORKOUT_DATE, payload }
);

const addWorkouts = payload => (
  { type: ADD_WORKOUTS, payload }
);

const removeWorkouts = payload => (
  { type: REMOVE_WORKOUTS, payload }
);

export {
  setAppLoaded,
  changeUser,
  loadingUser,
  setCreatingWorkout,
  setEditingWorkoutId,
  setFetchingWorkouts,
  setLastCompletedWorkoutDate,
  addWorkouts,
  removeWorkouts,
};
