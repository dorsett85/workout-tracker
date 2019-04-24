export const APP_LOADED = 'APP_LOADED';
export const CHANGE_USER = 'CHANGE_USER';
export const LOADING_USER = 'LOADING_USER';

export const SET_CREATING_WORKOUT = 'SET_CREATING_WORKOUT';
export const ADD_WORKOUTS = 'ADD_WORKOUTS';
export const EDIT_WORKOUT = 'EDIT_WORKOUT';
export const REMOVE_WORKOUTS = 'REMOVE_WORKOUTS';


const setAppLoaded = payload => (
  { type: APP_LOADED, payload }
);

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

const addWorkouts = payload => (
  { type: ADD_WORKOUTS, payload }
);

const editWorkout = payload => (
  { type: EDIT_WORKOUT, payload }
);

const removeWorkouts = payload => (
  { type: REMOVE_WORKOUTS, payload }
);

export {
  setAppLoaded,
  changeUser,
  loadingUser,
  setCreatingWorkout,
  addWorkouts,
  editWorkout,
  removeWorkouts,
};
