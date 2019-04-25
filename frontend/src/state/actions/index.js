export const APP_LOADED = 'APP_LOADED';
export const CHANGE_USER = 'CHANGE_USER';
export const LOADING_USER = 'LOADING_USER';

export const SET_CREATING_WORKOUT = 'SET_CREATING_WORKOUT';
export const SET_CURRENT_WORKOUT = 'SET_CURRENT_WORKOUT';
export const SET_FETCHING_WORKOUTS = 'SET_FETCHING_WORKOUTS';
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

const setCurrentWorkout = payload => (
  { type: SET_CURRENT_WORKOUT, payload }
);

const setFetchingWorkouts = payload => (
  { type: SET_FETCHING_WORKOUTS, payload }
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
  setCurrentWorkout,
  setFetchingWorkouts,
  addWorkouts,
  removeWorkouts,
};
